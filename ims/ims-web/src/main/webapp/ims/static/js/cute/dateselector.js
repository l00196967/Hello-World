/**
 * @class DateSelector
 * @author wenhan.wwh
 * 日期选择器，[查看例子请点击这里](http://cute.alisec.org/dateselector.html)
 *
 *      KISSY.use('cute/dateselector/',function(S,DateSelector){
 *          new DateSelector({
 *              target:'#dateSelect',
 *              value:'2014-07-22 12:12:12,2014-07-22 22:22:22',
 *              showTime:true
 *          });
 *      });
 */
KISSY.add('cute/dateselector/index', function (S, Node, Sizzle, Base, XTemplate, Util, Calendar, Auth, Tpl) {
    'use strict';
    var $ = Node.all;
    var numbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

    function DateSelector(config) {
        var self = this;
        config = config || {};
        if (S.isString(config)) {
            config = {
                target: config
            };
        }
        Util.alias(config, 'data', 'tags');
        var aroundDays = config.aroundDays;
        if (aroundDays) {
            var aroundText = config.aroundText;
            if (!aroundText) {
                var dayNumber = numbers[aroundDays] || aroundDays;
                config.aroundText = '前后' + dayNumber + '天';
            }
        }
        DateSelector.superclass.constructor.call(self, config);
        var events = self.get('events');
        S.each(events, function (eventFn, eventName) {
            self.on(eventName, eventFn);
        });
        self.init();
        self.fire('create');
    }

    S.extend(DateSelector, Base, {
        /**
         * 初始化XTemplate模板。
         * @private
         */
        initTpl: function () {
            var self = this;
            self.dateselectorTpl = new XTemplate(Tpl.dateselector);
            self.listTpl = new XTemplate(Tpl.list);
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
            var name = self.get('name');
            targetEl.html(self.dateselectorTpl.render({
                placeholder: placeholder,
                startDateName: name[0],
                endDateName: name[1],
                aroundDateName: name[2],
                disabled: self.get('disabled')
            }));
            var msgWrapperId = self.msgWrapperId = S.guid('msgWrapper_');
            self.listEl = $(self.listTpl.render({
                data: self.get('data'),
                msgWrapperId: msgWrapperId,
                align: self.get('align'),
                aroundDays: self.get('aroundDays'),
                aroundText: self.get('aroundText')
            })).appendTo(document.body);
        },
        /**
         * 控件事件绑定方法。
         * @private
         */
        bindUI: function () {
            var self = this;
            var targetEl = self.targetEl;
            targetEl.on('click', function (e) {
                var disabled = self.get('disabled');
                if (disabled) {
                    return;
                }
                if (self.get('popup')) {
                    self.hideList();
                } else {
                    self.showList();
                }
            });
            $(document).on('click', function (e) {
                var eventTargetDom = e.target;
                var eventTargetEl = $(eventTargetDom);
                var id = targetEl.attr('id');
                if (!id) {
                    id = S.guid('dateSelector_');
                    targetEl.attr('id', id);
                }
                var targetDom = targetEl[0];
                if (eventTargetDom == targetDom || eventTargetEl.parent('#' + id)) {
                    return;
                }
                self.hideList();
            });
            var listEl = self.listEl;
            var cals = self.getCals();
            listEl.on('click', function (e) {
                S.each(cals, function (cal) {
                    cal.hide();
                });
                e.stopPropagation();
            });
            var tagEls = self.tagEls;
            tagEls.on('click', function (e) {
                var el = $(this);
                el.addClass('active').siblings().removeClass('active');
                var key = el.attr('_key');
                var keys = key.split('_');
                self.setValue({
                    day: keys[0],
                    offset: keys[1]
                });
                self.hideList();
            });
            var customCalendarEls = self.customCalendarEls;
            customCalendarEls.each(function (calendarEl, index) {
                calendarEl.on('click', function (e) {
                    cals[index ? 0 : 1].hide();
                    cals[2].hide();
                    e.stopPropagation();
                });
            });
            var aroundCalendarEl = self.aroundCalendarEl;
            aroundCalendarEl.on('click', function (e) {
                cals[0].hide();
                cals[1].hide();
                e.stopPropagation();
            });
            var customConfirmBtnEl = self.customConfirmBtnEl;
            customConfirmBtnEl.on('click', function () {
                var auth = self.customFormAuth;
                auth.test().then(function () {
                    var customCalendarEls = self.customCalendarEls;
                    var startDate = Calendar.parseDate(customCalendarEls[0].value);
                    var endDate = Calendar.parseDate(customCalendarEls[1].value);
                    self.setValue([startDate, endDate]);
                    self.hideList();
                });
            });
            var aroundConfirmBtnEl = self.aroundConfirmBtnEl;
            aroundConfirmBtnEl.on('click', function () {
                var auth = self.aroundFormAuth;
                auth.test().then(function () {
                    var aroundCalendarEl = self.aroundCalendarEl;
                    var aroundDate = Calendar.parseDate(aroundCalendarEl[0].value);
                    var aroundDays = self.get('aroundDays');
                    var aroundDateTime = aroundDate.getTime();
                    var aroundDaysTime = aroundDays * 24 * 60 * 60 * 1000;
                    var startDate = new Date(aroundDateTime - aroundDaysTime);
                    var endDate = new Date(aroundDateTime + aroundDaysTime);
                    self.setValue([startDate, endDate, aroundDate]);
                    self.hideList();
                });
            });
            /*S.each(cals,function(cal){
             cal.con.on('click',function(e){
             e.stopPropagation();
             });
             });*/
            var customFormEl = self.customFormEl;
            customFormEl.on('submit', function () {
                return false;
            });
            var aroundFormEl = self.aroundFormEl;
            aroundFormEl.on('submit', function () {
                return false;
            });
            $(window).on('resize', S.buffer(function () {
                self.hideList();
            }, 10));
        },
        /**
         * 初始化变量。
         * @private
         */
        initVar: function () {
            var self = this;
            var targetEl = self.targetEl;
            var listEl = self.listEl;
            var customWrapperEl = listEl.one('.custom-wrapper');
            var aroundWrapperEl = listEl.one('.around-wrapper');
            S.mix(self, {
                inputEl: targetEl.one('.selector-input'),
                startDateEl: targetEl.one('.startDate-field'),
                endDateEl: targetEl.one('.endDate-field'),
                aroundDateEl: targetEl.one('.aroundDate-field'),
                //iconEl:targetEl.all('.icon-calendar'),
                customConfirmBtnEl: customWrapperEl.one('.confirmBtn'),
                customFormEl: customWrapperEl.one('.form'),
                customCalendarEls: customWrapperEl.all('.calendar'),
                aroundConfirmBtnEl: aroundWrapperEl.one('.confirmBtn'),
                aroundFormEl: aroundWrapperEl.one('.form'),
                aroundCalendarEl: aroundWrapperEl.one('.calendar'),
                tagEls: listEl.all('.tag'),
                dates: {},
                dateTexts: {},
                dateLabels: {}
            });
        },
        relocateList: function () {
            var self = this;
            var targetEl = self.targetEl;
            var listEl = self.listEl;
            var position = targetEl.offset();
            var left = null;
            var align = self.get('align');
            if (align == 'left') {
                left = position.left;
            } else {
                left = position.left - listEl.outerWidth() + targetEl.outerWidth();
            }
            listEl.css({
                left: left,
                top: position.top + targetEl.outerHeight() + 4
            });
        },
        /**
         * 显示浮层。
         * @private
         */
        showList: function () {
            var self = this;
            var disabled = self.get('disabled');
            if (disabled) {
                return;
            }
            var startDateEl = self.startDateEl;
            var endDateEl = self.endDateEl;
            var aroundDateEl = self.aroundDateEl;
            var startDate = Calendar.parseDate(startDateEl.val());
            var endDate = Calendar.parseDate(endDateEl.val());
            var aroundDate = Calendar.parseDate(aroundDateEl.val());
            self.setValue([startDate, endDate, aroundDate], true, true);
            var targetEl = self.targetEl;
            targetEl.addClass('focus');
            self.relocateList();
            //防止显示浮层之后浏览器出现滚动条导致定位有偏差,重新再调用一次
            self.relocateList();
            self.set('popup', true);
        },
        /**
         * 隐藏浮层。
         * @private
         */
        hideList: function () {
            var self = this;
            var targetEl = self.targetEl;
            targetEl.removeClass('focus');
            var listEl = self.listEl;
            listEl.css({
                left: -10000,
                top: -10000
            });
            var cals = self.getCals();
            S.each(cals, function (cal) {
                cal.hide();
            });
            var tagEls = self.tagEls;
            tagEls.removeClass('active');
            var customCalendarEls = self.customCalendarEls;
            customCalendarEls.each(function (calendarEl) {
                calendarEl.val('');
            });
            $('#' + self.msgWrapperId).hide();
            self.set('popup', false);
        },
        /**
         * 初始化Auth表单验证框架。
         * @private
         */
        initAuths: function () {
            var self = this;

            var customFormEl = self.customFormEl;
            var auth = self.customFormAuth = new Auth(customFormEl, {
                submitTest: false
            });
            auth.register("_date_validator", Calendar.dateValidator);
            auth.render();

            var aroundFormEl = self.aroundFormEl;
            auth = self.aroundFormAuth = new Auth(aroundFormEl, {
                submitTest: false
            });
            auth.register("_date_validator", Calendar.dateValidator);
            auth.render();
        },
        /**
         * 验证日期选择器。
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
        /**
         * 给控件设值。
         * @param {String|Array} value 值
         * @param {Boolean} noValidate 是否不验证
         */
        setValue: function (value, noValidate, /*是否是显示浮层的时候调用*/isShowList) {
            var self = this;
            if (S.isObject(value)) {
                value = self.dates[value.day + '_' + (value.offset || 0)] || [];
            } else if (S.isNumber(value)) {
                value = self.dates[value + '_0'] || [];
            } else {
                var valueArr = Util.getArray(value);
                var startDate = Calendar.parseDate(valueArr[0]);
                var endDate = Calendar.parseDate(valueArr[1]);
                var aroundDate = Calendar.parseDate(valueArr[2]);
                value = [startDate, endDate, aroundDate];
            }
            var startDate = value[0];
            var endDate = value[1];
            var aroundDate = value[2];
            var showTime = self.get('showTime');
            var startDateText = Calendar.formatDate(startDate, showTime);
            var endDateText = Calendar.formatDate(endDate, showTime);
            var aroundDateText = Calendar.formatDate(aroundDate, true);
            var key = null;
            S.each(self.dateTexts, function (value, aKey) {
                if (value[0] == startDateText && value[1] == endDateText) {
                    key = aKey;
                    return false;
                }
            });
            var inputEl = self.inputEl;
            var tagEls = self.tagEls;
            var startDateEl = self.startDateEl;
            var endDateEl = self.endDateEl;
            var customCalendarEls = self.customCalendarEls;
            if (key) {
                tagEls.each(function (tagEl) {
                    if (tagEl.attr('_key') == key) {
                        tagEl.addClass("active").siblings().removeClass("active");
                        var inputElValue = null, proxyValue = null;
                        if (!startDateText && !endDateText) {
                            inputElValue = self.dateLabels[key] || '';
                            proxyValue = '';
                        } else {
                            inputElValue = startDateText + ' 至 ' + endDateText;
                            proxyValue = startDateText + ',' + endDateText;
                        }
                        isShowList || inputEl.val(inputElValue);
                        var proxyEl = self.proxyEl;
                        proxyEl && proxyEl.val(proxyValue);
                        if (!noValidate) {
                            self.validate();
                        }
                        startDateEl.val(startDateText);
                        endDateEl.val(endDateText);
                        customCalendarEls.item(0).val(startDateText);
                        customCalendarEls.item(1).val(endDateText);
                        return false;
                    }
                });
            } else {
                tagEls.removeClass("active");
                var inputElValue = null, proxyValue = null;
                if (!startDateText && !endDateText) {
                    inputElValue = '';
                    proxyValue = '';
                } else {
                    inputElValue = startDateText + ' 至 ' + endDateText;
                    proxyValue = startDateText + ',' + endDateText;
                }
                inputEl.val(inputElValue);
                var proxyEl = self.proxyEl;
                proxyEl && proxyEl.val(proxyValue);
                if (!noValidate) {
                    self.validate();
                }
                startDateEl.val(startDateText);
                endDateEl.val(endDateText);
                customCalendarEls.item(0).val(startDateText);
                customCalendarEls.item(1).val(endDateText);
            }
            var aroundDateEl = self.aroundDateEl;
            aroundDateEl.val(aroundDateText);
            var aroundCalendarEl = self.aroundCalendarEl;
            aroundCalendarEl.val(aroundDateText);
            isShowList || self.fire('setValue', {
                value: self.getValue()
            });
        },
        getValue: function () {
            var self = this;
            var startDateEl = self.startDateEl;
            var endDateEl = self.endDateEl;
            var aroundDateEl = self.aroundDateEl;
            return [
                startDateEl.val(),
                endDateEl.val(),
                aroundDateEl.val()
            ];
        },
        /**
         * 初始化日历控件。
         * @private
         */
        initCalendars: function () {
            var self = this;
            var customCalendarEls = self.customCalendarEls;
            var aroundCalendarEl = self.aroundCalendarEl;
            var minDate = self.get('minDate');
            var maxDate = self.get('maxDate');
            self.customCalendar = new Calendar({
                target: customCalendarEls[0],
                auth: self.customFormAuth,
                showTime: self.get('showTime'),
                range: self.get('range'),
                rangeMessage: self.get('rangeMessage'),
                minDate: minDate,
                maxDate: maxDate,
                align: self.get('align')
            });
            var aroundDays = self.get('aroundDays');
            var aroundMinDate = null, aroundMaxDate = null;
            minDate = Calendar.parseDate(minDate[0]);
            maxDate = Calendar.parseDate(maxDate[1]);
            if (minDate) {
                aroundMinDate = new Date(minDate.getTime() + aroundDays * 24 * 60 * 60 * 1000);
            }
            if (maxDate) {
                aroundMaxDate = new Date(maxDate.getTime() - aroundDays * 24 * 60 * 60 * 1000);
            }
            var aroundCalendarConfig = {
                target: aroundCalendarEl,
                auth: self.aroundFormAuth,
                showTime: true,
                minDate: aroundMinDate,
                maxDate: aroundMaxDate,
                align: self.get('align')
            };
            self.aroundCalendar = new Calendar(aroundCalendarConfig);
        },
        getCals: function () {
            var self = this;
            var customCalendar = self.customCalendar;
            var aroundCalendar = self.aroundCalendar;
            var cals = S.clone(customCalendar.get('cals'));
            Array.prototype.push.apply(cals, aroundCalendar.get('cals'));
            return cals;
        },
        /**
         * 初始化日期数据。
         * @private
         */
        initDates: function () {
            var self = this;
            var nowDate = new Date();
            var nowTime = nowDate.getTime();
            var dates = self.dates;
            var dateTexts = self.dateTexts;
            var dateLabels = self.dateLabels;
            var showTime = self.get('showTime');
            S.each(self.get('data'), function (data) {
                var day = parseFloat(data.day);
                var startDate = null;
                var endDate = null;
                var offset = 0;
                if (!isNaN(day) && day) {
                    var dayOffset = null;
                    var rangeTimeSuffix = self.get('rangeTimeSuffix');
                    if (showTime && rangeTimeSuffix != '00:00:00') {
                        dayOffset = 0;
                    } else {
                        dayOffset = 1;
                    }
                    startDate = new Date(nowTime + (dayOffset - day) * 24 * 60 * 60 * 1000);
                    endDate = nowDate;
                    offset = parseFloat(data.offset);
                    if (isNaN(offset)) {
                        offset = 0;
                    } else if (offset) {
                        startDate = new Date(startDate.getTime() + offset * 24 * 60 * 60 * 1000);
                        endDate = new Date(endDate.getTime() + offset * 24 * 60 * 60 * 1000);
                    }
                    if (showTime) {
                        var startTimeSuffix = null;
                        var endTimeSuffix = null;
                        startTimeSuffix = endTimeSuffix = rangeTimeSuffix;
                        if (rangeTimeSuffix == '00:00:00') {
                            endTimeSuffix = '23:59:59';
                        }
                        startDate = Calendar.parseDate(Calendar.formatDate(startDate) + ' ' + startTimeSuffix);
                        endDate = Calendar.parseDate(Calendar.formatDate(endDate) + ' ' + endTimeSuffix);
                    }
                }
                dates[day + '_' + offset] = [startDate, endDate];
                dateTexts[day + '_' + offset] = [Calendar.formatDate(startDate, showTime), Calendar.formatDate(endDate, showTime)];
                dateLabels[day + '_' + offset] = data.text;
            });
        },
        /**
         * 启用控件。
         */
        enable: function () {
            var self = this;
            var startDateEl = self.startDateEl,
                    endDateEl = self.endDateEl,
                    targetEl = self.targetEl,
                    proxyEl = self.proxyEl;
            startDateEl.removeAttr('disabled');
            endDateEl.removeAttr('disabled');
            targetEl.removeAttr('disabled');
            proxyEl.removeAttr('disabled');
            self.set('disabled', false);
        },
        /**
         * 禁用控件。
         */
        disable: function () {
            var self = this;
            var startDateEl = self.startDateEl,
                    endDateEl = self.endDateEl,
                    targetEl = self.targetEl,
                    proxyEl = self.proxyEl;
            startDateEl.attr('disabled', 'disabled');
            endDateEl.attr('disabled', 'disabled');
            targetEl.attr('disabled', 'disabled');
            proxyEl.attr('disabled', 'disabled');
            self.hideList();
            self.set('disabled', true);
        },
        filterData: function () {
            var self = this;
            var range = self.get('range');
            var data = self.get('data');
            if (!range || !data) {
                return;
            }
            self.set('data', S.filter(data, function (aData) {
                if (aData.day <= range) {
                    return true;
                }
            }));
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
            if (!targetEl.hasClass('date-selector')) {
                targetEl.addClass('date-selector');
            }
            var disabled = targetEl.prop('disabled') || self.get('disabled');
            self.set('disabled', disabled);
            if (targetEl.length) {
                var targetDom = targetEl[0];
                var tagName = targetDom.tagName.toLowerCase();
                if (tagName == 'input' && targetEl.attr('type') == 'text') {
                    if (!self.targetTpl) {
                        self.targetTpl = new XTemplate(Tpl.target);
                    }
                    var newEl = $(self.targetTpl.render({
                        disabled: disabled
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
            self.filterData();
            self.initTpl();
            self.renderUI();
            self.initVar();
            self.initAuths();
            self.initCalendars();
            self.bindUI();
            self.initDates();
            self.setValue(self.get('value'), true);
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
             * 初始化日期选择器的Node对象。
             * @cfg {String|Node} target
             *      <br/>如：
             *
             *      target:'#dateSelector'
             */
            /**
             * 初始化日期选择器的Node对象。
             * @property {Node} target
             */
            target: {
                value: null,
                setter: function (v) {
                    return $(v);
                }
            },
            /**
             * 控件没有值时候的提示文本。
             * @cfg {String} placeholder
             *      <br/>如：
             *
             *      placeholder:'请选择开始和结束时间'
             */
            /**
             * 控件没有值时候的提示文本。
             * @property {String} placeholder
             */
            placeholder: {
                value: ''
            },
            /**
             * 表单提交时的参数名。
             * @cfg {String|Array} name
             *      <br/>如：
             *
             *      name:'startDate,endDate'
             */
            /**
             * 表单提交时的参数名。
             * @property {Array} name
             */
            name: {
                valueFn: function () {
                    return [
                        S.guid('startDateName_'),
                        S.guid('endDateName_'),
                        S.guid('aroundDateName_')
                    ];
                },
                setter: function (v) {
                    var nameArr = Util.getArray(v);
                    if (!nameArr[0]) {
                        nameArr[0] = S.guid('startDateName_');
                    }
                    if (!nameArr[1]) {
                        nameArr[1] = S.guid('endDateName_');
                    }
                    if (!nameArr[2]) {
                        nameArr[2] = S.guid('aroundDateName_');
                    }
                    return nameArr;
                }
            },
            /**
             * 初始值。
             * @cfg {String|Array} value
             *      <br/>如：
             *
             *      value:'2014-01-01,2014-12-31'
             */
            /**
             * 初始值。
             * @property {Array} value
             */
            value: {
                value: [],
                setter: function (v) {
                    if (!S.isNumber(v)) {
                        v = Util.getArray(v);
                    }
                    return v;
                }
            },
            /**
             * 快速选择标签的数据。
             * @cfg {Array} data
             *      <br/>如：
             *
             *      data:[
             *          {day:1,text:'今天'},
             *          {day:7,text:'最近7天'},
             *          {day:14,text:'最近14天'},
             *          {day:30,text:'最近1个月'},
             *          {day:90,text:'最近3个月'},
             *          {day:0,text:'全部'}
             *      ]
             */
            /**
             * 快速选择标签的数据。
             * @property {Array} data
             */
            data: {
                value: [
                    {day: 1, text: '今天'},
                    {day: 7, text: '最近7天'},
                    {day: 14, text: '最近14天'},
                    {day: 30, text: '最近1个月'},
                    {day: 90, text: '最近3个月'},
                    {day: 0, text: '全部'}
                ]
            },
            /**
             * 浮层是否已弹出。
             * @property {Boolean} popup
             */
            popup: {
                value: false
            },
            /**
             * 是否显示时分秒。
             * @cfg {Boolean} showTime
             *      <br/>如：
             *
             *      showTime:true
             */
            /**
             * 是否显示时分秒。
             * @property {Boolean} showTime
             */
            showTime: {
                value: false
            },
            /**
             * 日期区间范围。单位为天。
             * @cfg {Number} range
             *      <br/>如：
             *
             *      range:30
             */
            /**
             * 日期区间范围。单位为天。
             * @property {Number} range
             */
            range: {
                value: null
            },
            rangeMessage: {
                value: null
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
            minDate: {
                value: []
            },
            maxDate: {
                value: []
            },
            align: {
                value: 'right'
            },
            aroundDays: {
                value: 0
            },
            aroundText: {
                value: ''
            },
            rangeTimeSuffix: {
                value: '00:00:00'
            },
            events: {
                value: {}
            }
        }
    });
    return DateSelector;
}, {
    requires: [
        'node', 'sizzle', 'base', 'xtemplate',
        'cute/util/', 'cute/calendar/', 'cute/auth/', 'cute/dateselector/tpl',
        'cute/util/statistic'
    ]
});
KISSY.add('cute/dateselector/tpl', function (S) {
    'use strict';
    return {
        target:'<div class="selector date-selector"{{#if disabled}} disabled="disabled"{{/if}}></div>',
        dateselector:[
            '<input placeholder="{{placeholder}}" type="text" readonly="readonly" class="selector-input date-selector-input"/>',
            '<input type="hidden" name="{{startDateName}}" value="{{startDateVal}}" class="startDate-field"{{#if disabled}} disabled="disabled"{{/if}}/>',
            '<input type="hidden" name="{{endDateName}}" value="{{endDateVal}}" class="endDate-field"{{#if disabled}} disabled="disabled"{{/if}}/>',
            '<input type="hidden" name="{{aroundDateName}}" class="aroundDate-field" value="{{aroundDateValue}}"{{#if disabled}} disabled="disabled"{{/if}}/>',
            '<div class="icon-calendar icon-e614"></div>'
        ].join(''),
        doublecalendar : [
            '<div class="cute-list selector-list date-selector-list align-{{align}}" style="width: 500px;">',
                '<div class="triangle"></div>',
                '<div class="triangle-masker"></div>',
                '<div class="tag-wrapper">',
                    '{{#each data}}',
                        '<div class="tag tag-1" _key="{{day}}_{{@if offset}}{{offset}}{{else}}0{{/if}}">{{text}}<div class="icon-tag"></div></div>',
                    '{{/each}}',
                '</div>',
                '<div class="custom-wrapper">',
                    '<div class="start-container">',
                        '<div class="start-title" style="position: relative;bottom:4px;">开始时间</div>',
                        '<div class="start-calendar"></div>',
                        '<button class="btn btn-s btn-weak confirmBtn" name="doublecalendar-confirm" style="position: relative;left:175px;">确定</button>',
                    '</div>',
                    '<div class="end-container">',
                        '<div class="end-title" style="position: relative;bottom:4px;">结束时间</div>',
                        '<div class="end-calendar"></div>',
                        '<button class="btn btn-s btn-weak confirmBtn" name="doublecalendar-cancel" style="position: relative;left:-6px;">取消</button>',
                        '<span class="auth-msg auth-error" style="display:none;color: #e42a2a;"></span>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''),
        calendarTpl : [ '<div class="ks-cal-call ks-clearfix ks-cal-call-multi-1 align-right">',
                         '<div class="ks-cal-box">',
                             '<div class="ks-cal-hd">',
                                 '<a href="javascript:;" class="ks-prev-year  icon-e616"></a>',
                                 '<a href="javascript:;" class="ks-prev-month  icon-e60d"></a>',
                                 '<a href="javascript:;" class="ks-title">2015年5月</a>',
                                 '<a href="javascript:;" class="ks-next-month  icon-e60f"></a>',
                                 '<a href="javascript:;" class="ks-next-year  icon-e615"></a>',
                             '</div>',
                             '<div class="ks-cal-bd">',
                                 '<div class="ks-whd">',
                                     '<span>日</span>',
                                     '<span>一</span>',
                                     '<span>二</span>',
                                     '<span>三',
                                     '</span>',
                                     '<span>四',
                                     '</span>',
                                     '<span>五',
                                     '</span>',
                                     '<span>六',
                                     '</span>',
                                 '</div>',
                                 '<div class="ks-dbd ks-clearfix">',
                                     '<a href="javascript:;" class="ks-null">0',
                                     '</a>',
                                     '<a href="javascript:;" class="ks-null">0',
                                     '</a>',
                                     '<a href="javascript:;" class="ks-null">0',
                                     '</a>',
                                     '<a href="javascript:;" class="ks-null">0',
                                     '</a>',
                                     '<a href="javascript:;" class="ks-null">0',
                                     '</a>',
                                     '<a href="javascript:;">1',
                                     '</a>',
                                     '<a href="javascript:;">2',
                                     '</a>',
                                     '<a href="javascript:;">3',
                                     '</a>',
                                     '<a href="javascript:;">4',
                                     '</a>',
                                     '<a href="javascript:;">5',
                                     '</a>',
                                     '<a href="javascript:;">6',
                                     '</a>',
                                     '<a href="javascript:;">7',
                                     '</a>',
                                     '<a href="javascript:;">8',
                                     '</a>',
                                     '<a href="javascript:;">9',
                                     '</a>',
                                     '<a href="javascript:;">10',
                                     '</a>',
                                     '<a href="javascript:;">11',
                                     '</a>',
                                     '<a href="javascript:;">12',
                                     '</a>',
                                     '<a href="javascript:;">13',
                                     '</a>',
                                     '<a href="javascript:;">14',
                                     '</a>',
                                     '<a href="javascript:;">15',
                                     '</a>',
                                     '<a href="javascript:;">16',
                                     '</a>',
                                     '<a href="javascript:;">17',
                                     '</a>',
                                     '<a href="javascript:;">18',
                                     '</a>',
                                     '<a href="javascript:;">19',
                                     '</a>',
                                     '<a class="ks-selected ks-today" href="javascript:;">20',
                                     '</a>',
                                     '<a href="javascript:;">21',
                                     '</a>',
                                     '<a href="javascript:;">22',
                                     '</a>',
                                     '<a href="javascript:;">23',
                                     '</a>',
                                     '<a href="javascript:;">24',
                                     '</a>',
                                     '<a href="javascript:;">25',
                                     '</a>',
                                     '<a href="javascript:;">26',
                                     '</a>',
                                     '<a href="javascript:;">27',
                                     '</a>',
                                     '<a href="javascript:;">28',
                                     '</a>',
                                     '<a href="javascript:;">29',
                                     '</a>',
                                     '<a href="javascript:;">30',
                                     '</a>',
                                     '<a href="javascript:;">31',
                                     '</a>',
                                     '<div style="clear:both;">',
                                     '</div>',
                                 '</div>',
                             '</div>',
                             '<div class="ks-setime-mask hidden">',
                             '</div>',
                             '<div class="ks-setime hidden">',
                             '</div>',
                             '<div class="hidden">',
                                 '<a href="#" class="ks-cal-notLimited ">不限',
                                 '</a>',
                             '</div>',
                             '<div class="ks-multi-select hidden">',
                                 '<button class="ks-multi-select-btn">确定',
                                 '</button>',
                             '</div>',
                             '<div class="ks-cal-ft ">',
                                 '<div class="ks-cal-time">',
                                     '<span class="ks-cal-time-detail">时间：',
                                     '</span>',
                                     '<span class="h">00',
                                     '</span>:',
                                     '<span class="m">00',
                                     '</span>:',
                                     '<span class="s">00',
                                     '</span>',
                                     '<!--{{arrow-->',
                                     '<div class="cta">',
                                         '<button class="u">',
                                         '</button>',
                                         '<button class="d">',
                                         '</button>',
                                     '</div>',
                                     '<!--arrow}}-->',
                                 '</div>',
                                 '<button class="ct-ok btn btn-s btn-weak">确定',
                                 '</button>',
                             '</div>',
                             '<div class="ks-selectime-mask hidden">',
                             '</div>',
                             '<div class="ks-selectime hidden">',
                             '</div>',
                         '</div>',
                         '<!--#ks-cal-box-->',
                     '</div>'].join(""),
        list:[
            '<div class="cute-list selector-list date-selector-list align-{{align}}">',
                '<div class="triangle"></div>',
                '<div class="triangle-masker"></div>',
                '<div class="around-wrapper{{^if aroundDays}} display-none{{/if}}">',
                    '<form method="post" class="form" autocomplete="off">',
                        '<div class="row margin-bottom-0">',
                            '<div class="span around-date-wrapper">',
                                '<input ',
                                    'name="aroundDate" type="text" class="text calendar" ',
                                    'placeholder="" auth-event="keydown" _date_validator ',
                                    'required ',
                                    '_auto_init="false"',
                                '/>',
                            '</div>',
                            '<div class="span around-button-wrapper">',
                                '<input type="button" class="btn btn-s btn-weak confirmBtn" value="{{aroundText}}"/>',
                            '</div>',
                        '</div>',
                    '</form>',
                '</div>',
                '<div class="tag-wrapper">',
                    '{{#each data}}',
                        '<div class="tag tag-1" _key="{{day}}_{{@if offset}}{{offset}}{{else}}0{{/if}}">{{text}}<div class="icon-tag"></div></div>',
                    '{{/each}}',
                '</div>',
                '<div class="custom-wrapper">',
                    '<form method="post" class="form" autocomplete="off">',
                        '<div class="row form-title">',
                            '<div class="span span12">',
                                '自定义区间',
                            '</div>',
                        '</div>',
                        '<div class="row margin-bottom-0 custom-row">',
                            '<div class="span custom-date-wrapper">',
                                '<div class="span span6 interval-date-start">',
                                    '<input ',
                                        'name="startDate" type="text" class="text calendar" ',
                                        'placeholder="开始时间" auth-event="keydown" _date_validator ',
                                        'msg-wrapper="#{{msgWrapperId}}" _date_required ',
                                        '_auto_init="false"',
                                    '/>',
                                    '<div id="{{msgWrapperId}}" class="msg-nowrap"></div>',
                                '</div>',
                                '<div class="span interval-date-separator"></div>',
                                '<div class="span span6 interval-date-end">',
                                    '<input ',
                                        'name="endDate" type="text" class="text calendar" ',
                                        'placeholder="结束时间" auth-event="keydown" _date_validator ',
                                        'msg-wrapper="#{{msgWrapperId}}" _date_required ',
                                        '_auto_init="false"',
                                    '/>',
                                '</div>',
                            '</div>',
                            '<div class="span custom-button-wrapper">',
                                '<input type="button" class="btn btn-s btn-weak confirmBtn" value="确定"/>',
                            '</div>',
                        '</div>',
                    '</form>',
                '</div>',
            '</div>'
        ].join('')
    };
},{
    requires:[]
});