;
(function ($) {

    function format(source, params) {
        if (arguments.length == 1)
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.format.apply(this, args);
            };
        if (arguments.length > 2 && params.constructor != Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor != Array) {
            params = [ params ];
        }
        $.each(params, function (i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
        });
        return source;
    }


    function contains(aList, index) {
        var re = false;
        if (aList.calculate_key.indexOf(index) > -1) {
            re = true;
        }
        return re;
    }

    function valifloat(field) {
        if (isNaN(field.value)) ok = "no"; else ok = "yes";
        if (ok == "yes") {
            if (parseFloat(field.value)) {
                ok = "yes"
            }
            else ok = "no";
        }
        if (ok == "yes") {
            while ((field.value.substring(0, 1) == 0) && (field.value.length > 1) && (field.value.substring(1, 2) != '.')) {
                field.value = field.value.substring(1, field.value.length)
            }
        }
        if (ok == "no") {
            if (field.value == 0) {
                ok = "yes";
                field.value = 0;
            }
        }
        if (ok == "no") {
            showMsg(field.id + "_f", "非法数字！(<font color='blue'>" + field.value + "</font>)", -1);
            field.focus();
            return false;
        }
        else {
            removeMsg(field.id + "_f");
            return true;
        }
    }

    function valiint(field) {
        if (valifloat(field)) {
            var destNum = Math.round(field.value * 100) / 100;
            field.value = destNum;
            destNum = "" + destNum;
            if (destNum.indexOf(".") > -1) {
                showMsg(field.id + "_i", "提示信息:只能入整数或零??.00！(<font color='blue'>" + field.value + "</font>)", -1);
                field.focus();
                return false;
            } else {
                if (Math.abs(field.value) > 2000000) {
                    showMsg(field.id + "_i", "提示信息:不能大于2000000或小于-2000000！(<font color='blue'>" + field.value + "</font>)", -1);
                    field.focus();
                    return false;
                } else {
                    removeMsg(field.id + "_i");
                    return true;
                }
            }
        }
    }

    function valifloatformat(field) {
        if (isNaN(field.value)) ok = "no"; else ok = "yes";
        if (ok == "yes") {
            if (parseFloat(field.value)) {
                ok = "yes"
            }
            else ok = "no";
        }
        if (ok == "yes") {
            while ((field.value.substring(0, 1) == 0) && (field.value.length > 1) && (field.value.substring(1, 2) != '.')) {
                field.value = field.value.substring(1, field.value.length)
            }
        }
        if (ok == "no") {
            if (field.value == 0) {
                ok = "yes";
                field.value = 0;
            }
        }
        if (ok == "no") {
            showMsg(field.id + "_fl", "非法数字！(<font color='blue'>" + field.value + "</font>)", -1);
            // field.value = 0;
            field.focus();
            return false;
        }
        else {
            removeMsg(field.id + "_fl");
            field.value = formatnumber(field.value);
            return true;
        }
    }


// 四舍五人保留两位小数
    function formatnumber(n) {
        var num, intPart, dotPart, allPart, dotPos, destNum;
        // 小数点位置
        dotPos = String(n).indexOf(".");
        // 整数，不处理
        if (dotPos == -1)
            destNum = n;
        // 有小数
        else {
            // 整数部分(含小数点)
            intPart = String(n).substring(0, dotPos + 1);
            // 小数部分
            dotPart = String(n).substring(dotPos + 1);
            // 小数位数小于2，不处理
            if (dotPart.length <= 2)
                destNum = n;
            // 小数位数大于等于3
            else {

                var tmp0, tmp1, tmp2, tmp3;
                // 小数点后第一位数
                tmp0 = String(dotPart).charAt(0);
                // 小数点后第二位数
                tmp1 = String(dotPart).charAt(1);
                // 小数点后第三位数
                tmp2 = String(dotPart).charAt(2);
                // 小数点后第三位数为5
                if (tmp2 == 5) {
                    // 小数点后第二位数为奇数1,3,5,7，round函数自动进位
                    if (tmp1 == 5) {
                        // alert('n:'+n);
                        // alert(Math.round(n*100)) ;
                        tmp1 = Number(tmp1) + Number(1);
                        destNum = intPart + tmp0 + tmp1;
                        // destNum=Math.round(n*100)/100+0.01;
                        // alert('destNum:'+destNum) ;
                    }
                    // 小数点后第二位数为偶数0,2,4,6,8，用以下方法进位
                    else if (tmp1 == 9) {
                        // 小数点后第二位数加1
                        if (tmp0 == 9) {
                            // 整数与小数合并
                            destNum = Number(intPart) + Number(1);
                        }
                        else {
                            tmp0 = Number(tmp0) + Number(1);
                            // 整数与小数合并
                            destNum = intPart + tmp0;
                        }
                    }
                    else {
                        // 小数点后第二位数加1
                        tmp1 = Number(tmp1) + Number(1);
                        // 整数与小数合并
                        destNum = intPart + tmp0 + tmp1;
                    }
                }
                // 小数点后第三位数不为5，round函数自动进位
                else
                    destNum = Math.round(n * 100) / 100;
            }
        }
        return(destNum);
    }

// 四舍五人保留四位小数
    function formatnumber_4(n) {
        destNum = Math.round(n * 10000) / 10000;
        return(destNum);
    }

// 四舍五人保留六位小数
    function formatnumber_6(n) {
        destNum = Math.round(n * 1000000) / 1000000;
        return(destNum);
    }

    function _formatnumber(f, v) {
        if (!f) {
            f = 2;
        }

        v = new Number(v).toFixed(10);

        if (f == 2) {
            return new Number(formatnumber(v));
        }
        if (f == 4) {
            return new Number(formatnumber_4(v));
        }
        if (f == 6) {
            return new Number(formatnumber_6(v));
        }
        return new Number(v);
    }

    function report_e() {
        this.value = 0;
        this.p = [];
        this.calculate_key = "";
        this.itype = "float";
        this.required = true;
        this.valifloatformat = 2;
        this.showMsgTime = -1;
        this.onchange = false;
    }

    function report_j() {
        this.call = false;
        this.call_ys = "";
        this.id = "";
    }


    // 浮点数加法运算
    function FloatAdd(arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        return (arg1 * m + arg2 * m) / m
    }

    // 浮点数减法运算
    function FloatSub(arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        // 动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }

    // 浮点数乘法运算
    function FloatMul(arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {
        }
        try {
            m += s2.split(".")[1].length
        } catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    }


    // 浮点数除法运算
    function FloatDiv(arg1, arg2) {
        var t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length
        } catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length
        } catch (e) {
        }
        with (Math) {
            r1 = Number(arg1.toString().replace(".", ""))
            r2 = Number(arg2.toString().replace(".", ""))
            return (r1 / r2) * pow(10, t2 - t1);
        }
    }

    // 插件的定义
    $.extend({
        calculate_t:function (options) {
            if (this.p) {
                return;
            }

            var p = $.extend(true, {
                calculateModel:[]
            }, options || {});

            this.p = p;
            $('input').each(function () {
                if (this.id.trim() != "") {
// try {
                    if (this.type == "text") {
                        $(this).blur(function () {
                            var e = eval(this.id + "_ca");
                            switch (e.itype.toLowerCase()) {
                                case "int":
                                    if (!valiint(this)) return;
                                    this.value = parseInt(this.value);
                                    eval("v_" + this.id.trim() + "=parseInt(this.value)");
                                    break;
                                case "string":
                                    eval("v_" + this.id.trim() + "=this.value");
                                    break;
                                default:
                                    if (!valifloat(this)) return;
                                    this.value = _formatnumber(e.valifloatformat, this.value)
                                    eval("v_" + this.id.trim() + "=parseFloat(this.value)");
                                    break;
                            }
                            for (i = 0; i < e.p.length; i++) {
                                var _p = e.p[i];
                                p_calculate(_p, e.valifloatformat, e.showMsgTime, true, this.id.trim(), j_lj);
                            }
                        })
                    }
                    eval(this.id.trim() + "_ca=new report_e()");
                    switch (this.itype) {
                        case "int":
                            eval("v_" + this.id.trim() + "=parseInt(this.value)");
                            break;
                        case "string":
                            eval("v_" + this.id.trim() + "=this.value");
                            break;
                        default:
                            eval("v_" + this.id.trim() + "=parseFloat(this.value)");
                            break;
                    }

                    var y = [];
                    y.push(this.id.trim());
                    for (i = 0; i < p.calculateModel.length; i++) {

                        if (p.calculateModel[i].index == this.id.trim()) {
                            if (p.calculateModel[i].itype)
                                eval(this.id.trim() + "_ca.itype=p.calculateModel[i].itype");
                            if (p.calculateModel[i].required)
                                eval(this.id.trim() + "_ca.required=p.calculateModel[i].required");
                            if (p.calculateModel[i].valifloatformat)
                                eval(this.id.trim() + "_ca.valifloatformat=p.calculateModel[i].valifloatformat");
                            if (p.calculateModel[i].showMsgTime)
                                eval(this.id.trim() + "_ca.showMsgTime=p.calculateModel[i].showMsgTime");
                            if (p.calculateModel[i].onchange)
                                eval(this.id.trim() + "_ca.onchange=p.calculateModel[i].onchange");
                        }
                        if (!p.calculateModel[i].gs) continue;

                        var _key = eval(this.id.trim() + "_ca");
                        for (j = 0; j < y.length; j++) {
                            if (p.calculateModel[i].gs.indexOf(y[j]) > -1 || p.calculateModel[i].index == y[j]) {
                                if (_key.calculate_key.indexOf(p.calculateModel[i].index) == -1) {
                                    eval(this.id.trim() + "_ca.p.push(p.calculateModel[i])");
                                    eval(this.id.trim() + "_ca.calculate_key=" + this.id.trim() + "_ca.calculate_key+','+p.calculateModel[i].index");
                                    if (p.calculateModel[i].index != y[j]) {
                                        y.push(p.calculateModel[i].index);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            })
            return this;
        }
    })

    // 插件的定义
    $.extend({
        calculate:function (options) {
            if (this.p) {
                return;
            }

            var p = $.extend(true, {
                calculateModel:[]
            }, options || {});
            var j_lj = [];
            var j_onchange = [];
            this.j_lj = j_lj;
            this.j_onchange = j_onchange;
            this.p = p;
            $('input').each(function () {
                if (this.id.trim() != "") {
                    if (this.type == "text") {
                        $(this).blur(function () {
                            // return ;
                            var _id = this.id.trim();
                            var e = eval(_id + "_ca");

                            switch (e.itype.toLowerCase()) {
                                case "int":
                                    if (!valiint(this)) return;
                                    if (eval("v_" + this.id.trim() + "!=parseInt(this.value)")) {
                                        try {
                                            eval("v_change_" + this.id.trim() + "_tc=true");
                                        } catch (e) {
                                        }
                                    }
                                    eval("v_" + this.id.trim() + "=parseInt(this.value)");
                                    break;
                                case "string":
                                    eval("v_" + this.id.trim() + "=this.value");
                                    break;
                                default:
                                    if (!valifloat(this)) return;
                                    this.value = _formatnumber(e.valifloatformat, this.value)

                                    if (eval("v_" + this.id.trim() + "!=parseFloat(this.value)")) {
                                        try {
                                            eval("v_change_" + this.id.trim() + "_tc=true");
                                        } catch (e) {
                                        }
                                    }
                                    eval("v_" + this.id.trim() + "=parseFloat(this.value)");
                                    break;
                            }
                            // alert(2+this.id.trim());
                            // removeMsgAll();

                            for (i = 0; i < p.calculateModel.length; i++) {
                                var _p = p.calculateModel[i];
                                // "*=" 情况下 _p.index.trim() == _id
								// removeMsg(_p.index + "_tj")
                                if (_p.gs && _p.gs.trim().substr(0, 2) == "*=" && _p.index.trim() != _id) {
                                    continue;
                                }
                                if (_p.showMsgTime > 0 && _p.index.trim() != _id) {
                                    p_calculate(_p, _p.valifloatformat, 0, true, _id, j_lj);
                                } else {
                                    p_calculate(_p, _p.valifloatformat, _p.showMsgTime, true, _id, j_lj);
                                }
                            }
                            for (i = 0; i < j_onchange.length; i++) {
                                eval(j_onchange[i] + "=false");
                            }
                        });
                    }
                    eval(this.id.trim() + "_ca=new report_e()");
                    switch (this.itype) {
                        case "int":
                            eval("v_" + this.id.trim() + "=parseInt(this.value)");
                            break;
                        case "string":
                            eval("v_" + this.id.trim() + "=this.value");
                            break;
                        default:
                            eval("v_" + this.id.trim() + "=parseFloat(this.value)");
                            break;
                    }

                }
            })


            for (i = 0; i < p.calculateModel.length; i++) {
                if (p.calculateModel[i].itype)
                    eval(p.calculateModel[i].index.trim() + "_ca.itype=p.calculateModel[i].itype");
                if (p.calculateModel[i].required)
                    eval(p.calculateModel[i].index.trim() + "_ca.required=p.calculateModel[i].required");
                if (p.calculateModel[i].valifloatformat)
                    eval(p.calculateModel[i].index.trim() + "_ca.valifloatformat=p.calculateModel[i].valifloatformat");
                if (p.calculateModel[i].showMsgTime)
                    eval(p.calculateModel[i].index.trim() + "_ca.showMsgTime=p.calculateModel[i].showMsgTime");
                if (p.calculateModel[i].onchange)
                    eval(p.calculateModel[i].index.trim() + "_ca.onchange=p.calculateModel[i].onchange");
                if (p.calculateModel[i].gs && p.calculateModel[i].gs.trim().substr(0, 2) == "+=") {
                    if (p.calculateModel[i].gs_ys) {
                        var _j = new report_j();
                        _j.id = p.calculateModel[i].index;
                        _j.call_ys = p.calculateModel[i].gs_ys;
                        j_lj.push(_j);
                    }
                }
                if (p.calculateModel[i].onchange) {
                    j_onchange.push("v_change_" + p.calculateModel[i].index + "_tc");
                    eval("v_change_" + p.calculateModel[i].index + "_tc=false");
                }
            }

            return this;
        }


    })

    function showMsg(key, msg, t) {
        removeMsg(key);
        if (t == 0) return;
        var data = $("#" + key + "_Error").html();
        if (data != null) return;
        var _tr = document.createElement("tr");
        _tr.id = key + "_Error";
        var _td = document.createElement("td");
        if (t > 0) {
            _td.style.color = "blue";
            msg = "提醒：" + msg
        } else
            _td.style.color = "#ff0000";
        _td.className = "tf9";
        _tr.appendChild(_td);
        $("#FormError").append(_tr);
        $("#" + key + "_Error>td").html(msg);
        $("#toolTip").show();
        if (t > 0) {
            window.setTimeout("$.calculate.removeMsg('" + key + "')", t);
        }
// $("#FormError").hide();
    }

    function removeMsg(key) {
        $("#" + key + "_Error").remove();
        if ($("#FormError tr").length == 0) {
            $("#toolTip").hide();
        }
    }

    $.calculate.removeMsg = function (key) {
        $("#" + key + "_Error").remove();
        if ($("#FormError tr").length == 0) {
            $("#toolTip").hide();
        }
    }

    function removeMsgAll() {
        $("#FormError").empty()
        if ($("#FormError tr").length == 0) {
            $("#toolTip").hide();
        }
    }

    function p_calculate(_p, _valifloatformat, _showMsgTime, _p_set, _id, j_lj) {
        if (!_p.gs) return;
        if (!_p_set && _showMsgTime > 0)
            _showMsgTime = 0;
        var _gs = _p.gs.trim();
        var key = _gs.substr(0, 3);
        if (key.toLowerCase() == "if ") {
            key = "if"
        } else {
            switch (_gs.substr(0, 2)) {
                case "<=":
                case ">=":
                case "*=":
                case "+=":
                    key = _gs.substr(0, 2);
                    break;
                case "< ":
                case "> ":
                    key = _gs.substr(0, 1);
                    break;
                default:
                    key = _gs.substr(0, 1);
                    break;
            }

        }

        var _js = true;
        ls = 0;
        switch (key) {
            case "=":
                ls = eval(_gs.substr(1));
                ls = _formatnumber(_valifloatformat, ls);
                break;
            case "+=":
                ls = eval(_gs.substr(2));
                ls = _formatnumber(_valifloatformat, ls);

                if (_p.index == _id)
                    _js = false;
                if (!_p_set)
                    _js = false;
// if (_js) {
// _js = false;
// for (j = 0; j < j_lj.length; j++) {
// if (j_lj[j].id == _p.index && j_lj[j].call) {
// _js = true;
// j_lj[j].call = false;
// }
// }
// }
                break;

            case "*=":
                removeMsg(_p.index + "_tj");
                if (_p_set) return;
                ls = eval(_gs.substr(2));
                ls = _formatnumber(_valifloatformat, ls);
                _js = false;
                if (Math.abs($("#" + _p.index).val() - ls) > _p.abs_ce) {
                    showMsg(_p.index + "_tj", format(_p.msg, ["<font color='blue'>" + $("#" + _p.index).val() + "</font>", "<font color='blue'>" + ls + "</font>"]), -1);
                }

                break;
            case "if":
                var gs0 = _gs.substr(3);
                var gs_tj = gs0.split("then")[0];
                var gs1 = gs0.split("then")[1];
                var gs2 = gs1.split("else");
                var gs_true = "";
                var gs_false = "";
                if (gs2.length == 1) {
                    gs_true = gs2[0].split("end")[0];
                } else {
                    if (gs2.length == 2) {
                        gs_true = gs2[0];
                        gs_false = gs2[1].split("end")[0];
                    } else {
                        alert();
                    }
                }

                removeMsg(_p.index);
                if (eval(gs_tj)) {
                    if (gs_true.indexOf("--showMsg--") > -1) {
                        showMsg(_p.index, format(_p.msg, []), _showMsgTime);
                        _js = false;
                    } else {
                        ls = eval(gs_true);
                        ls = _formatnumber(_valifloatformat, ls);
                    }
                } else {
                    if (gs_false == "") {
                        return
                    }
                    if (gs_false.indexOf("--showMsg--") > -1) {
                        showMsg(_p.index, format(_p.msg, []), _showMsgTime);
                        _js = false;
                    } else {
                        ls = eval(gs_false);
                        ls = _formatnumber(_valifloatformat, ls);
                    }
                }
                break;
            case "<=":
                ls = eval(_gs.substr(2));
                ls = _formatnumber(_valifloatformat, ls);

                if (($("#" + _p.index).val() - ls) > _p.abs_ce) {
                    showMsg(_p.index, format(_p.msg, ["<font color='blue'>" + $("#" + _p.index).val() + "</font>", "<font color='blue'>" + ls + "</font>"]), _showMsgTime);
                } else {
                    removeMsg(_p.index);
                }

                _js = false;
                break;
            case ">=":
                ls = eval(_gs.substr(2));
                ls = _formatnumber(_valifloatformat, ls);
                if (($("#" + _p.index).val() - ls) < _p.abs_ce) {
                    showMsg(_p.index, format(_p.msg, ["<font color='blue'>" + $("#" + _p.index).val() + "</font>", "<font color='blue'>" + ls + "</font>"]), _showMsgTime);
                } else {
                    removeMsg(_p.index);
                }
                _js = false;
                break;
            case "<":
                ls = eval(_gs.substr(2));
                ls = _formatnumber(_valifloatformat, ls);
                if (($("#" + _p.index).val() - ls) >= _p.abs_ce) {
                    showMsg(_p.index, format(_p.msg, ["<font color='blue'>" + $("#" + _p.index).val() + "</font>", "<font color='blue'>" + ls + "</font>"]), _showMsgTime);
                } else {
                    removeMsg(_p.index);
                }
                _js = false;
                break;
            case ">":
                ls = eval(_gs.substr(2));
                ls = _formatnumber(_valifloatformat, ls);
                if (($("#" + _p.index).val() - ls) <= _p.abs_ce) {
                    showMsg(_p.index, format(_p.msg, ["<font color='blue'>" + $("#" + _p.index).val() + "</font>", "<font color='blue'>" + ls + "</font>"]), _showMsgTime);
                } else {
                    removeMsg(_p.index);
                }
                _js = false;
                break;

        }
        if (_p_set) {
            if (_js) {

                if (Math.abs($("#" + _p.index).val() - ls) > _p.abs_ce) {
                    if (_p.index == _id)
                        showMsg(_p.index, format(_p.msg, ["<font color='blue'>" + $("#" + _p.index).val() + "</font>", "<font color='blue'>" + ls + "</font>"]), 5000);
                    eval("v_" + _p.index + "=ls");
                    $("#" + _p.index).val(ls);
                    if (_p.onchange) {
                        eval("v_change_" + _p.index + "_tc=true");
                    }

                    // removeMsg(_p.index);
// for (j = 0; j < j_lj.length; j++) {
// if (j_lj[j].call_ys.indexOf(_p.index) > -1) {
// j_lj[j].call = true;
// }
// }
                    removeMsg(_p.index + "_tj");
                }
            }
        } else {
            if (_js) {
                if (Math.abs($("#" + _p.index).val() - ls) > _p.abs_ce) {
                    showMsg(_p.index, format(_p.msg, ["<font color='blue'>" + $("#" + _p.index).val() + "</font>", "<font color='blue'>" + ls + "</font>"]), -1);
                } else {
                    removeMsg(_p.index);
                }
            }
        }

    }

    $.calculate.val = function (key, v) {
        eval("v_" + key + "=v");
        $("#" + key).val(v);
        // $("#" + key).blur();
    }


    $.calculate.callBlur = function (key) {
        $("#" + key).blur();
    }

    $.calculate.setBlur = function (it, a) {
        for (i = 0; i < it.length; i++) {
            var key = a[i];
            $("#" + key).blur(function () {
                // return ;
                var _id = this.id.trim();
                var e = eval(_id + "_ca");
                switch (e.itype.toLowerCase()) {
                    case "int":
                        if (!valiint(this)) return;
                        eval("v_" + this.id.trim() + "=parseInt(this.value)");
                        break;
                    case "string":
                        eval("v_" + this.id.trim() + "=this.value");
                        break;
                    default:
                        if (!valifloat(this)) return;
                        this.value = _formatnumber(e.valifloatformat, this.value)
                        eval("v_" + this.id.trim() + "=parseFloat(this.value)");
                        break;
                }
                for (i = 0; i < it.p.calculateModel.length; i++) {
                    var _p = it.p.calculateModel[i];
                    if (_p.gs && _p.gs.trim().substr(0, 2) == "+=") {
                        continue;
                    }
                    if (_p.showMsgTime > 0 && _p.index.trim() != _id) {
                        p_calculate(_p, _p.valifloatformat, 0, true, _id, "");
                    } else {
                        p_calculate(_p, _p.valifloatformat, _p.showMsgTime, true, _id, "");
                    }
                }
            });
        }
    }

    $.calculate.setUnbind = function (it, type) {
        for (i = 0; i < it.length; i++) {
            var key = it[i].id;
            $("#" + key).unbind(type)
// $("#" + key).blur(function() {
// return false;
// });
        }
    }

    $.calculate.callCalculate = function (it) {
        removeMsgAll();
        for (i = 0; i < it.p.calculateModel.length; i++) {
            var _p = it.p.calculateModel[i];
            p_calculate(_p, _p.valifloatformat, _p.showMsgTime, true, "");
        }
    }

    $.calculate.check = function (it) {
        removeMsgAll();
        for (i = 0; i < it.p.calculateModel.length; i++) {
            var _p = it.p.calculateModel[i];
            p_calculate(_p, _p.valifloatformat, _p.showMsgTime, false, "", "");
        }
        if ($("#FormError tr").length == 0) {
            return true;
        }

        return false;
    }

})(jQuery);