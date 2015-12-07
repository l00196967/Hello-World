/**
 * @class Selector
 * @author wenhan.wwh
 * 选择器，[查看例子请点击这里](http://cute.alisec.org/selector.html)
 *
 *      KISSY.use('cute/selector/',function(S,Selector){
 *          new Selector({
 *              target:'#selector',
 *              url:'selector.json',
 *              params:{},
 *              data:[
 *                  {
 *                      "id": 1,
 *                      "name": "张三",
 *                      "department": "软件部"
 *                  },
 *                  {
 *                      "id": 2,
 *                      "name": "李四",
 *                      "department": "行政部"
 *                  }
 *              ],
 *              ioConfig:{
 *                  type:'get'
 *              },
 *              valueTpl:'{{id}}',
 *              displayTpl:[
 *                  '{{name}}',
 *                  '{{name}}{{@if department}} - {{department}}{{/if}}'
 *              ]
 *          });
 *      });
 */
KISSY.add('cute/selector/index', function (S, Node, Sizzle, Base, XTemplate, IO, Overlay, UA, Util, Scrollbar, Tpl) {
    'use strict';
    var $ = Node.all;

    function Selector(config) {
        var self = this;
        if (S.isString(config)) {
            config = {
                target: config
            };
        }
        Util.alias(config, 'data', 'value');
        Selector.superclass.constructor.call(self, config);
        var events = self.get('events');
        S.each(events, function (eventFn, eventName) {
            self.on(eventName, eventFn);
        });
        self.set('initConfig', config || {});
        self.init();
        self.fire('create');
    }

    S.extend(Selector, Base, {
        /**
         * 初始化XTemplate模板。
         * @private
         */
        initTpl: function () {
            var self = this;
            var tplFns = self.get('tplFns');
            S.each(tplFns, function (value, key) {
                XTemplate.addSubTpl(key, value);
            });
            var valueTpl = self.get('valueTpl');
            var displayTpl = self.get('displayTpl');
            var config = {
                subTpls: {
                    valueTpl: valueTpl,
                    tag_displayTpl: displayTpl[0],
                    item_displayTpl: displayTpl[1]
                }
            };
            var selectorTpl = self.get('selectorTpl') || Tpl.selector;
            self.selectorTpl = new XTemplate(selectorTpl, config);
            self.listTpl = new XTemplate(Tpl.list, config);
            self.itemsTpl = new XTemplate(Tpl.items, config);
            var tagTpl = self.get('tagTpl') || Tpl.tag;
            self.tagTpl = new XTemplate(tagTpl, {
                subTpls: {
                    valueTpl: '{{id}}',
                    tag_displayTpl: '{{text}}'
                }
            });
            var tagsTpl = Tpl.tags.replace('_tagTpl', tagTpl);
            self.tagsTpl = new XTemplate(tagsTpl, config);
            self.linkerTagTpl = new XTemplate(tagTpl, config);
            self.valueTpl = new XTemplate(valueTpl);
            self.noDataTpl = new XTemplate(Tpl.noData);
            self.messageTpl = new XTemplate(Tpl.message);
        },
        /**
         * 控件渲染方法。
         * @private
         */
        renderUI: function () {
            var self = this;
            var targetEl = self.targetEl;
            var proxyEl = self.proxyEl;
            var placeholder = null;
            if (proxyEl) {
                placeholder = proxyEl.attr('placeholder');
            }
            placeholder = placeholder || self.get('placeholder');
            targetEl.html(self.selectorTpl.render({
                selectorInputId: S.guid('selectorInput_'),
                placeholder: placeholder
            }));
            self.setProxyValue(self.getValue());
            self.listEl = $(self.listTpl.render({
                linkerText: self.get('linkerText')
            })).appendTo(document.body);
        },
        fireValueChange: function (oldValue, newValue, noValidate) {
            var self = this;
            var separator = self.get('separator');
            if (oldValue.join(separator) != newValue.join(separator)) {
                self.doValueChange(oldValue, newValue, noValidate);
                self.fire('valueChange', {
                    oldValue: oldValue,
                    newValue: newValue
                });
            }
        },
        /**
         * 设值。
         * @param {Array} data 标签数据
         * @param {Boolean} noValidate 不验证
         */
        setData: function (data, noValidate) {
            var self = this;
            var disabled = self.get('disabled');
            var tplData = {
                tags: data,
                _name: self.get('name'),
                disabled: disabled
            };
            var oldValue = self.getValue(true);
            self.clearTags(true, true);
            var inputEl = self.inputEl;
            $(self.tagsTpl.render(tplData)).insertBefore(inputEl);
            var newValue = self.getValue(true);
            var targetEl = self.targetEl;
            var tagsMap = self.get('tagsMap');
            targetEl.all('.tag').each(function (tagEl) {
                tagsMap[tagEl.one('.value-field').val()] = tagEl;
            });
            self.fireValueChange(oldValue, newValue, noValidate);
        },
        isReadOnly: function () {
            var self = this;
            var targetEl = self.targetEl;
            return targetEl.hasClass('readonly');
        },
        /**
         * 设置只读。
         * @private
         * @param {Boolean} readOnly
         */
        setReadOnly: function (readOnly) {
            var self = this;
            var targetEl = self.targetEl;
            if (readOnly) {
                targetEl.addClass('readonly');
            } else {
                targetEl.removeClass('readonly');
            }
        },
        /**
         * 刷新只读状态。
         * @private
         */
        refreshReadOnly: function (value) {
            var self = this;
            var multiSelect = self.get('multiSelect');
            if (multiSelect) {
                self.setReadOnly(false);
            } else {
                value = value || self.getValue(true);
                if (value.length) {
                    self.setReadOnly(true);
                } else {
                    self.setReadOnly(false);
                }
            }
        },
        refreshPlaceholder: function (value) {
            var self = this;
            var targetEl = self.targetEl;
            var placeholderEl = self.placeholderEl;
            var result = null;
            if (targetEl.hasClass('focus') || self.get('disabled') || self.isReadOnly()) {
                placeholderEl.hide();
                result = 'hide';
            } else {
                value = value || self.getValue(true);
                if (value.length || self.inputEl.val()) {
                    placeholderEl.hide();
                    result = 'hide';
                } else {
                    placeholderEl.show();
                    result = 'show';
                }
            }
            return result;
        },
        /**
         * 取值。
         * @param {Array} returnArr
         * @return {String|Array} 值
         */
        getValue: function (returnArr) {
            var self = this;
            var targetEl = self.targetEl;
            var valueArr = [];
            targetEl.all('.value-field').each(function (el) {
                valueArr.push(el.val());
            });
            if (returnArr) {
                return valueArr;
            } else {
                var separator = self.get('separator');
                return valueArr.join(separator);
            }
        },
        listItemContained: function (value, valueArr) {
            return S.inArray(value, valueArr);
        },

        // TODO 支持根据用户提供的关键字过滤数据
        getFilterData: function (data) {
            var self = this;
            var keywords = self.inputEl.val();
            if (!keywords || keywords.length === 0) {
                return data;
            }
            var items = [];
            var displayTpl = self.get('displayTpl')[1];
            var tplInstance = new XTemplate(displayTpl);
            for (var i = 0, len = data.length; i < len; i++) {
                var tempItem = data[i];
                var disableStr = tempItem.name;
                if (displayTpl) {
                    disableStr = tplInstance.render(tempItem);
                }
                if (disableStr && disableStr.indexOf(keywords) !== -1) {
                    items.push(tempItem);
                }
            }
            return items;
        },
        /**
         * 显示浮层。
         * @param {Array} data 数据
         * @private
         */
        showList: function (data) {
            var self = this;
            var disabled = self.get('disabled');
            if (disabled) {
                return;
            }
            var listEl = self.listEl;
            var itemsWrapperEl = self.itemsWrapperEl;
            var itemsEl = self.itemsEl;
            var inputEl = self.inputEl;
            if (data) {
                if (data.length) {
                    data = S.clone(data);
                    var valueArr = self.getValue(true);
                    S.each(data, function (aData) {
                        var value = S.unEscapeHTML(self.valueTpl.render(aData));
                        if (self.listItemContained(value, valueArr)) {
                            aData.disabled = true;
                        }
                    });

                    var tempItems = data;
                    var isFilter = self.get('isFilter');
                    if (isFilter) {
                        tempItems = self.getFilterData(data);
                    }
                    itemsEl.html(self.itemsTpl.render({
                        items: tempItems
                    }));
                    var text = S.escapeHTML(inputEl.val());
                    var redMark = self.get('redMark');
                    if (redMark) {
                        itemsEl.all('.selector-item').each(function (el) {
                            if (el.hasClass('disabled')) {
                                return;
                            }
                            var itemText = el.one('script[type="template/item"]').html();
                            el.html(itemText.replace(new RegExp(text.replace(/\\/g, '\\\\'), 'g'), '<span style="color:#db524b;">' + text + '</span>'));
                        });
                    }
                } else {
                    itemsEl.html(self.noDataTpl.render({
                        message: self.get('noDataMessage')
                    }));
                }
            } else {
                itemsEl.html('');
            }
            itemsWrapperEl.scrollTop(0);
            var position = inputEl.offset();
            listEl.css({
                left: position.left,
                top: position.top + inputEl.outerHeight()
            });
            self.get('scrollbar').refresh();
            self.fire('showList');
        },
        /**
         * 隐藏浮层。
         * @private
         */
        hideList: function () {
            var self = this;
            var listEl = self.listEl;
            listEl.css({
                left: -10000,
                top: -10000
            });
            self.get('scrollbar').refresh();
            self.fire('hideList');
        },
        /**
         * 验证选择器。
         */
        validate: function () {
            var self = this;
            var proxyEl = self.proxyEl;
            if (proxyEl) {
                var auth = self.get('auth');
                if (!auth) {
                    var widget = $(proxyEl[0].form).data('widget');
                    if (widget) {
                        auth = widget.get('auth');
                    }
                }
                if (auth) {
                    var authField = auth.getField(proxyEl.attr("name"));
                    authField && authField.test();
                }
            }
        },
        addTag: function (id, text, noValidate) {
            var self = this;
            var tagsMap = self.get('tagsMap');
            if (tagsMap[id + '']) {
                return;
            }
            var inputEl = self.inputEl;
            var oldValue = self.getValue(true);
            var tagEl = $(self.tagTpl.render({
                id: id,
                text: text,
                _name: self.get('name'),
                disabled: self.get('disabled')
            })).insertBefore(inputEl);
            var newValue = self.getValue(true);
            tagsMap[id + ''] = tagEl;
            self.fireValueChange(oldValue, newValue, noValidate);
            self.fire('addTag');
        },
        removeTag: function (tag, noValidate) {
            var self = this;
            if (S.isString(tag) || S.isNumber(tag)) {
                var targetEl = self.targetEl;
                var inputEl = targetEl.one('.value-field[value="' + tag + '"]');
                if (inputEl) {
                    tag = inputEl.parent('.tag');
                } else {
                    tag = null;
                }
            }
            if (tag) {
                var id = tag.one('.value-field').val();
                var oldValue = self.getValue(true);
                tag.remove();
                var newValue = self.getValue(true);
                var tagsMap = self.get('tagsMap');
                delete tagsMap[id + ''];
                self.fireValueChange(oldValue, newValue, noValidate);
            }
        },
        removeLastTag: function (noValidate) {
            var self = this;
            var targetEl = self.targetEl;
            var lastTag = targetEl.one('.tag:last');
            if (lastTag) {
                self.removeTag(lastTag, noValidate);
            }
        },
        clearTags: function (noValidate, silent) {
            var self = this;
            var targetEl = self.targetEl;
            var oldValue = self.getValue(true);
            targetEl.all('.tag').remove();
            var newValue = [];
            self.set('tagsMap', {});
            if (!silent) {
                self.fireValueChange(oldValue, newValue, noValidate);
            }
        },
        refreshInputWidth: function () {
            var self = this;
            var targetEl = self.targetEl;
            var inputEl = self.inputEl;
            var width = Util.getTextWidth(inputEl.val()) + 4;
            var maxWidth = targetEl.width() - 4;
            var inputMinWidth = self.get('inputMinWidth');
            if (width < inputMinWidth) {
                width = inputMinWidth;
            } else if (width > maxWidth) {
                width = maxWidth;
            }
            inputEl.width(width);
        },
        bindLinkerEvent: function () {
            var self = this;
            var linkerFn = self.get('linkerFn');
            if (linkerFn) {
                var linkerEl = self.linkerEl;
                linkerEl.on('click', linkerFn);
            }
        },
        bindTargetEvent: function () {
            var self = this;
            var targetEl = self.targetEl;
            var inputEl = self.inputEl;
            targetEl.on('click', function (e) {
                var disabled = self.get('disabled');
                if (disabled) {
                    return;
                }
                var eventTargetDom = e.target;
                var eventTargetEl = $(eventTargetDom);
                if (eventTargetDom == targetEl[0]) {
                    inputEl[0].focus();
                } else if (eventTargetEl.hasClass('icon-close')) {
                    self.removeTag(eventTargetEl.parent('.tag'));
                }
            });
            targetEl.on('dblclick', function (e) {
                var disabled = self.get('disabled');
                if (disabled) {
                    return;
                }
                inputEl[0].select();
            });
            targetEl.on('mousedown', function () {
                targetEl.data('mousedown', true);
            });
            targetEl.on('mouseup', function () {
                targetEl.data('mousedown', false);
            });
        },
        bindListEvent: function () {
            var self = this;
            var listEl = self.listEl;
            var inputEl = self.inputEl;
            listEl.on('click', function (e) {
                e.stopPropagation();
            });
            listEl.delegate('click', '.selector-item', function (e) {
                var itemEl = $(e.currentTarget);
                if (itemEl.hasClass('disabled')) {
                    return;
                }
                var id = itemEl.attr('_value');
                var text = itemEl.attr('_tag');
                self.clickListItem(id, text);
                self.hideList();
                inputEl[0].focus();
            });
        },
        bindInputEvent: function () {
            var self = this;
            var targetEl = self.targetEl;
            var inputEl = self.inputEl;
            var inputFn = function () {
                self.refreshInputWidth();
            };
            if (UA.ie <= 8) {
                inputEl.on('keydown', S.buffer(inputFn, 0));
            } else {
                inputEl.on('input', inputFn);
            }
            inputFn = function () {
                var io = self.io;
                io && io.abort();
                var blankQuery = self.get('blankQuery');
                var text = this.value;
                if (!text && !blankQuery) {
                    self.hideList();
                    return;
                }
                self.showList();
                var successFn = function (json, status) {
                    if (status) {
                        var dataHandler = self.get('dataHandler');
                        if (dataHandler) {
                            json = dataHandler.call(self, json);
                        }
                    }
                    json = json || {};
                    var data = null;
                    if (S.isArray(json)) {
                        data = json;
                    } else {
                        data = json.data || [];
                    }
                    self.results[text] = data;
                    self.showList(data);
                };
                var result = null;
                if (self.get('bufferData')) {
                    result = self.results[text];
                }
                if (result) {
                    successFn(result);
                } else {
                    var params = self.get('params') || {};
                    params[self.get('textParamName')] = text;
                    self.io = new IO(S.mix({
                        cache: false,
                        serializeArray: false,
                        type: 'post',
                        url: self.get('url'),
                        data: params,
                        dataType: 'json',
                        success: successFn,
                        complete: S.noop
                    }, self.get('ioConfig')));
                }
            };
            var autoQuery = self.get('autoQuery');
            if (autoQuery) {
                inputEl.on(UA.ie <= 8 ? 'keydown' : 'input', S.buffer(inputFn, 500));
            } else {
                var queryKeyCodes = self.get('queryKeyCodes');
                if (queryKeyCodes && queryKeyCodes.length) {
                    inputEl.on('keyup', function (e) {
                        var keyCode = e.keyCode;
                        if (S.inArray(keyCode, queryKeyCodes)) {
                            inputFn.call(this);
                        }
                    });
                }
            }
            inputEl.on('focus', function () {
                targetEl.addClass('focus');
                self.refreshPlaceholder();
                var blankQuery = self.get('blankQuery');
                if (blankQuery) {
                    inputFn.call(this);
                }
            });
            inputEl.on('blur', function () {
                targetEl.removeClass('focus');
                if (!targetEl.data('mousedown')) {
                    self.refreshPlaceholder();
                }
            });
            inputEl.on('keydown', function (e) {
                var keyCode = e.keyCode;
                if (keyCode == 8 && !this.value) {
                    self.removeLastTag();
                    self.hideList();
                }
            });
        },
        setProxyValue: function (value) {
            var self = this;
            var proxyEl = self.proxyEl;
            proxyEl && proxyEl.val(
                    S.isArray(value) ? value.join(self.get('separator')) : value
            );
        },
        doValueChange: function (oldValue, newValue, noValidate) {
            var self = this;
            self.setProxyValue(newValue);
            noValidate || self.validate();
            self.refreshReadOnly(newValue);
            self.refreshPlaceholder(newValue);
        },
        bindSelfEvent: function () {
            var self = this;
            self.on('hideList', self.hideListEvent);
        },
        bindOtherEvent: function () {
            var self = this;
            var targetEl = self.targetEl;
            var inputEl = self.inputEl;
            $(document).on('click', function (e) {
                var eventTargetDom = e.target;
                if (eventTargetDom == targetEl[0] || eventTargetDom == inputEl[0]) {
                    return;
                }
                self.hideList();
                self.refreshPlaceholder();
                targetEl.data('mousedown', false);
            });
            $(window).on('resize', S.buffer(function () {
                self.hideList();
            }, 10));
        },
        clickListItem: function (id, text) {
            var self = this;
            self.addTag(id, text);
        },
        clearInput: function () {
            var self = this;
            var inputEl = self.inputEl;
            var inputMinWidth = self.get('inputMinWidth');
            inputEl.val('');
            inputEl.width(inputMinWidth);
            self.refreshPlaceholder();
        },
        hideListEvent: function () {
            var self = this;
            self.clearInput();
        },
        /**
         * 控件事件绑定方法。
         * @private
         */
        bindUI: function () {
            var self = this;
            self.bindLinkerEvent();
            self.bindTargetEvent();
            self.bindListEvent();
            self.bindInputEvent();
            self.bindSelfEvent();
            self.bindOtherEvent();
        },
        /**
         * 显示错误消息。
         * @param {String} message 错误消息
         * @private
         */
        showMessage: function (message) {
            var self = this;
            var targetEl = self.targetEl;
            var messageOverlay = new Overlay({
                content: self.messageTpl.render({
                    message: message
                }),
                elStyle: {
                    background: "white",
                    border: "#ccc"
                }
            });
            messageOverlay.set("align", {
                node: targetEl,
                points: ['tc', 'bc'],
                offset: [0, 0]
            });
            messageOverlay.show();
            setTimeout(function () {
                messageOverlay.set("effect", {
                    effect: "fade",
                    duration: 0.5
                });
                messageOverlay.hide();
            }, 1000);
        },
        /**
         * 设置链接相关属性。
         * @private
         */
        setLinkerAttrs: function () {
            var self = this;
            var initConfig = self.get('initConfig');
            var bufferData;
            if ('bufferData' in initConfig) {
                bufferData = initConfig.bufferData;
            } else {
                bufferData = false;
            }
            var attrs = {
                bufferData: bufferData,
                noDataMessage: initConfig.noDataMessage || '未找到此人',
                linkerText: initConfig.linkerText || '创建空白人物档案',
                linkerFn: initConfig.linkerFn || function (e) {
                    var linkerIo = self.linkerIo;
                    linkerIo && linkerIo.abort();
                    var linkerUrl = self.get('linkerUrl');
                    if (linkerUrl) {
                        var inputEl = self.inputEl;
                        var text = inputEl.val();
                        self.linkerIo = new IO(S.mix({
                            cache: false,
                            serializeArray: false,
                            type: 'post',
                            url: linkerUrl,
                            data: S.mix({
                                text: text
                            }, self.get('linkerParams')),
                            dataType: 'json',
                            success: function (json) {
                                json = json || {};
                                if (json.success) {
                                    var data = json.data;
                                    if (data) {
                                        data._name = self.get('name');
                                        data.disabled = self.get('disabled');
                                        var oldValue = self.getValue(true);
                                        var tagEl = $(self.linkerTagTpl.render(data)).insertBefore(inputEl);
                                        var newValue = self.getValue(true);
                                        var tagsMap = self.get('tagsMap');
                                        tagsMap[tagEl.one('.value-field').val()] = tagEl;
                                        self.fireValueChange(oldValue, newValue);
                                    }
                                } else {
                                    var message = json.message || '创建失败！';
                                    self.showMessage(message);
                                }
                            },
                            complete: S.noop
                        }, self.get('linkerIoConfig')));
                    }
                }
            };
            S.each(attrs, function (value, key) {
                self.set(key, value);
            });
        },
        /**
         * 初始化自定义滚动条。
         * @private
         */
        initScrollbar: function () {
            var self = this;
            self.set('scrollbar', new Scrollbar({
                target: self.itemsWrapperEl
            }));
        },
        /**
         * 初始化变量。
         * @private
         */
        initVar: function () {
            var self = this;
            var targetEl = self.targetEl;
            var listEl = self.listEl;
            S.mix(self, {
                itemsWrapperEl: listEl.all('.selector-itemsWrapper'),
                itemsEl: listEl.all('.selector-items'),
                inputEl: targetEl.all('.selector-input'),
                placeholderEl: targetEl.all('.selector-placeholder'),
                linkerEl: listEl.all('.selector-linker'),
                results: {},
                io: null,
                linkerIo: null
            });
        },
        /**
         * 启用控件。
         */
        enable: function () {
            var self = this;
            var targetEl = self.targetEl;
            var proxyEl = self.proxyEl;
            targetEl.all('.value-field').removeAttr('disabled');
            targetEl.removeAttr('disabled');
            proxyEl && proxyEl.removeAttr('disabled');
            self.set('disabled', false);
        },
        /**
         * 禁用控件。
         */
        disable: function () {
            var self = this;
            var targetEl = self.targetEl;
            var proxyEl = self.proxyEl;
            targetEl.all('.value-field').attr('disabled', 'disabled');
            targetEl.attr('disabled', 'disabled');
            proxyEl && proxyEl.attr('disabled', 'disabled');
            self.set('disabled', true);
            self.hideList();
        },
        /**
         * 控件初始化方法。
         * @private
         */
        init: function () {
            var self = this;
            var targetEl = self.get('target');
            if (!targetEl.hasClass('selector')) {
                targetEl.addClass('selector');
            }
            var disabled = targetEl.prop('disabled') || self.get('disabled');
            self.set('disabled', disabled);
            if (targetEl.length) {
                var targetDom = targetEl[0];
                var tagName = targetDom.tagName.toLowerCase();
                if (tagName == 'input' && targetEl.attr('type') == 'text' || tagName == 'textarea') {
                    if (!self.targetTpl) {
                        self.targetTpl = new XTemplate(Tpl.target);
                    }
                    var newEl = $(self.targetTpl.render({
                        disabled: disabled,
                        cls: self.get('cls')
                    }));
                    newEl.insertBefore(targetEl.css({
                        display: 'none'
                    }));
                    self.proxyEl = targetEl;
                    targetEl = newEl;
                    self.set('target', targetEl);
                }
            }
            self.targetEl = targetEl;
            if (self.get('linkerUrl')) {
                self.setLinkerAttrs();
            }
            self.initTpl();
            self.renderUI();
            self.initVar();
            self.bindUI();
            self.initScrollbar();
            var data = self.get('data');
            if (data && data.length) {
                self.setData(data);
            }
        },
        /**
         * 控件销毁方法。
         * @private
         */
        destroy: function () {
            //todo destroy
        }
    }, {
        ATTRS: {
            /**
             * 初始化选择器的Node对象。
             * @cfg {String|Node} target
             *      <br/>如：
             *
             *      target:'#selector'
             */
            /**
             * 初始化选择器的Node对象。
             * @property {Node} target
             */
            target: {
                value: null,
                setter: function (v) {
                    return $(v);
                }
            },
            /**
             * 取值的模板。默认值为'{{id}}'。
             * @cfg {String} valueTpl
             *      <br/>如：
             *
             *      valueTpl:'{{id}}'
             */
            /**
             * 取值的模板。
             * @property {String} valueTpl
             */
            valueTpl: {
                value: '{{id}}'
            },
            /**
             * 显示文本的模板。默认值为['{{text}}','{{text}}']。第一个为标签文本，第二个为下拉选项文本。
             * @cfg {String|Array} displayTpl
             *      <br/>如：
             *
             *      displayTpl:['{{text}}','{{text}}']
             */
            /**
             * 显示文本的模板。
             * @property {Array} displayTpl
             */
            displayTpl: {
                value: ['{{text}}', '{{text}}'],
                setter: function (v) {
                    if (S.isArray(v)) {
                        return v;
                    } else {
                        return [v, v];
                    }
                }
            },
            /**
             * 根据输入值作为参数去请求下拉数据的url地址。
             * @cfg {String} url
             *      <br/>如：
             *
             *      url:'/xxx/xxx.json'
             */
            /**
             * 根据输入值作为参数去请求下拉数据的url地址。
             * @property {String} url
             */
            url: {
                value: ''
            },
            /**
             * ajax请求参数。
             * @cfg {Object} params
             *      <br/>如：
             *
             *      params:{
             *          name:'wenhan.wwh'
             *      }
             */
            /**
             * ajax请求参数。
             * @property {Object} params
             */
            params: {
                value: {}
            },
            /**
             * 初始数据。
             * @cfg {Array} data
             *      <br/>如：
             *
             *      data:[
             *          {
             *              "id": 1,
             *              "name": "张三",
             *              "department": "软件部"
             *          },
             *          {
             *              "id": 2,
             *              "name": "李四",
             *              "department": "行政部"
             *          }
             *      ]
             */
            /**
             * 初始数据。
             * @property {Array} data
             */
            data: {
                value: []
            },
            /**
             * 表单字段名，用于表单提交。
             * @cfg {String} name
             *      <br/>如：
             *
             *      name:'selector'
             */
            /**
             * 表单字段名，用于表单提交。
             * @property {String} name
             */
            name: {
                valueFn: function () {
                    return S.guid('name_');
                }
            },
            /**
             * ajax配置对象，可覆盖默认配置。
             * @cfg {Object} ioConfig
             *      <br/>如：
             *
             *      ioConfig:{
             *          type:'get'
             *      }
             */
            /**
             * ajax配置对象，可覆盖默认配置。
             * @property {Object} ioConfig
             */
            ioConfig: {
                value: {}
            },
            /**
             * 查询结果为空时显示的文本。
             * @cfg {String} noDataMessage
             *      <br/>如：
             *
             *      noDataMessage:'无数据'
             */
            /**
             * 查询结果为空时显示的文本。
             * @property {String} noDataMessage
             */
            noDataMessage: {
                value: '无数据'
            },
            linkerText: {
                value: ''
            },
            linkerFn: {
                value: S.noop
            },
            linkerUrl: {
                value: ''
            },
            linkerParams: {
                value: {}
            },
            linkerIoConfig: {
                value: {}
            },
            scrollbar: {
                value: null
            },
            bufferData: {
                value: true
            },
            tplFns: {
                value: {}
            },
            /**
             * 是否禁用。
             * @cfg {Boolean} disabled
             *      <br/>如：
             *
             *      disabled:true
             */
            /**
             * 是否禁用。
             * @property {Boolean} disabled
             */
            disabled: {
                value: false
            },
            /**
             * Auth表单验证实例对象。
             * @cfg {Auth} auth
             */
            /**
             * Auth表单验证实例对象。
             * @property {Auth} auth
             */
            auth: {
                value: null
            },
            /**
             * 是否可多选。
             * @cfg {Boolean} multiSelect
             *      <br/>如：
             *
             *      multiSelect:false
             */
            /**
             * 是否可多选。
             * @property {Boolean} multiSelect
             */
            multiSelect: {
                value: true
            },
            /**
             * 查询时输入值的参数名。
             * @cfg {String} textParamName
             *      <br/>如：
             *
             *      textParamName:'text'
             */
            /**
             * 查询时输入值的参数名。
             * @property {String} textParamName
             */
            textParamName: {
                value: 'text'
            },
            /**
             * 是否自动查询。
             * @cfg {Boolean} autoQuery
             *      <br/>如：
             *
             *      autoQuery:false
             */
            /**
             * 是否自动查询。
             * @property {Boolean} autoQuery
             */
            autoQuery: {
                value: true
            },
            /**
             * 如果autoQuery设置为false，则键盘敲击哪些按键可触发查询。默认值为[13]，即回车键。
             * @cfg {Array} queryKeyCodes
             *      <br/>如：
             *
             *      queryKeyCodes:[13]
             */
            /**
             * 如果autoQuery设置为false，则键盘敲击哪些按键可触发查询。
             * @property {Array} queryKeyCodes
             */
            queryKeyCodes: {
                value: [13]
            },
            tagsMap: {
                value: {}
            },
            cls: {
                value: ''
            },
            inputMinWidth: {
                value: 36
            },
            placeholder: {
                value: ''
            },
            dataHandler: {
                value: null
            },
            events: {
                value: {}
            },
            redMark: {
                value: true
            },
            blankQuery: {
                value: false
            },
            selectorTpl: {
                value: null
            },
            tagTpl: {
                value: null
            },
            separator: {
                value: ','
            }
        }
    });
    S.augment(Selector, {
        setValue: Selector.prototype.setData
    });
    return Selector;
}, {
    requires: [
        'node', 'sizzle', 'base', 'xtemplate', 'ajax', 'overlay', 'ua',
        'cute/util/', 'cute/scrollbar/', 'cute/selector/tpl',
        'cute/util/statistic'
    ]
});
KISSY.add('cute/selector/tpl', function (S) {
    'use strict';
    return {
        target: '<div class="selector{{#if cls}} {{cls}}{{/if}}"{{#if disabled}} disabled="disabled"{{/if}}></div>',
        tag: [
            '<div class="tag tag-2">',
                '{{{include "tag_displayTpl"}}}',
                '<div class="icon-close icon-e613"></div>',
                '<input class="value-field" type="hidden" name="{{_name}}" value="{{{include "valueTpl"}}}"{{#if disabled}} disabled="disabled"{{/if}}/>',
            '</div>'
        ].join(''),
        tags: [
            '{{#each tags}}',
                '_tagTpl',
            '{{/each}}'
        ].join(''),
        selector: [
            '<input id="{{selectorInputId}}" type="text" class="selector-input" style="width:36px;"/>',
            '<label for="{{selectorInputId}}" class="selector-placeholder text-ellipsis">{{placeholder}}</label>'
        ].join(''),
        list: [
            '<div class="cute-list selector-list">',
                '<div class="list-itemsWrapper selector-itemsWrapper scrollbar">',
                    '<ul class="list-items selector-items"></ul>',
                '</div>',
                '<div class="list-linkerWrapper selector-linkerWrapper"{{#if linkerText}} style="display:block;"{{/if}}>',
                    '<a class="list-linker selector-linker" href="javascript:;">{{linkerText}}</a>',
                '</div>',
            '</div>'
        ].join(''),
        items: [
            '{{#each items}}',
                '<li class="list-item selector-item{{#if disabled}} disabled{{/if}}"',
                        ' _value="{{{include "valueTpl"}}}" _tag="{{{include "tag_displayTpl"}}}">',
                    '<script type="template/item">',
                        '{{{include "item_displayTpl"}}}',
                    '</script>',
                    '{{{include "item_displayTpl"}}}',
                '</li>',
            '{{/each}}'
        ].join(''),
        noData: [
            '<li class="list-item selector-item disabled">{{message}}</li>'
        ].join(''),
        message: [
            '<div class="tip tip-error" style="padding:4px 4px 4px 24px;background-position:-788px -413px">',
                '<p style="margin:0;">{{message}}</p>',
            '</div>'
        ].join('')
    };
}, {
    requires: []
});