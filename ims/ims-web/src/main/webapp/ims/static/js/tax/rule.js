function setActionAndRule(Object_actions, Auditing_rules, TotalList, pageid, curobj, curobjnum) {
    setObjectAction(Object_actions, pageid, curobj, curobjnum);
    setRuleValue(Auditing_rules, TotalList, pageid);
}


function getObjectDesignName(obj) {
    return   obj.name.substring(obj.name.indexOf('_') + 1, obj.name.length);
}

function getObjectDesignId(obj) {
    return  obj.id.substring(obj.id.indexOf('_') + 1, obj.id.length);
}

function replaceVar(rule, curobjname, curobjid, curobjnum) {
    rule = rule.replace('CUROBJ_NAME', '\'' + curobjname + '\'');
    rule = rule.replace('CUROBJ_ID', '\'' + curobjid + '\'');
    rule = rule.replace('CUROBJ_NUMBER', '\'' + (curobjnum == null ? "" : curobjnum) + '\'');
    return rule;
}

function setObjectAction(Object_actions, pageid, CUROBJ, curobjnum) {
    var curobjname = '';
    var curobjid = '';
    if (CUROBJ != null) {
        var curobjname = getObjectDesignName(CUROBJ);
        var curobjid = getObjectDesignId(CUROBJ);
    }
    for (var i = 0; i < Object_actions.length; i++) {
        if (Object_actions[i][1] == null || Object_actions[i][1].hasOwnProperty(curobjname)) {
            var scripttext = replaceVar(Object_actions[i][0], curobjname, curobjid, curobjnum);
            var scripttexts = loadAction(scripttext, pageid);
            if ((scripttexts == null || scripttexts.length == 0 ) && Object_actions[i][2] != null) {
                scripttext = replaceVar(Object_actions[i][2], curobjname, curobjid, curobjnum);
                scripttexts = loadAction(scripttext, pageid);
            }
            if (scripttexts != null) {
                for (var j = 0; j < scripttexts.length; j++) {
                    try {
                        eval(scripttexts[j]);
                    }
                    catch(e) {
                        if (e.name != 'Error') {
                            alert(scripttexts[j] + ' error:' + e.message);
                        }
                    }
                }
            }
        }
    }
}

function getArrayActionValue(rule, pageid) {
    if (rule == null) return null;
    var osts = rule.split("^");
    var result = "";
    for (var j = 0; j < osts.length; j++) {
        if (j % 2 == 1) {
            var obs = osts[j].split(':');
            var ostsobjs = document.getElementsByName(pageid + obs[0]);
            var num = parseInt(obs[1]);
            if (ostsobjs != null && ostsobjs.length > num && num >= 0) {
                if (ostsobjs[num].disabled) return null;
                if (ostsobjs[num].id != null) {
                    result = result + getElementScriptStr(ostsobjs[num].id);
                }
                else {
                    result = result + getElementScriptStr(ostsobjs[num].name);
                }
            }
            else {
                //result = result + '0';
                return null;
            }
        } else {
            result = result + osts[j];
        }
    }
    return result;
}
//
//function getOtherActionValue(rule, curnum, pageid) {
//    if (rule == null) return null;
//    var osts = rule.split("~");
//    var result = "";
//    for (var j = 0; j < osts.length; j++) {
//        if (j % 2 == 1) {
//            var obs = osts[j].split(':');
//            var offnum = parseInt(obs[1]);
//            var num = offnum + curnum;
//            var ostsobjs = document.getElementsByName(pageid + obs[0]);
//            if (ostsobjs != null && num >= 0 && num < ostsobjs.length) {
//                if (ostsobjs[num].disabled) return null;
//                if (ostsobjs[num].id != null) {
//                    result = result + getElementScriptStr(ostsobjs[num].id);
//                }
//                else {
//                    result = result + getElementScriptStr(ostsobjs[num].name);
//                }
//            }
//            else {
//                return null;
//            }
//        } else {
//            result = result + osts[j];
//        }
//    }
//    return result;
//}

function LoadOtherActionValue(rule, name, curnum, pageid) {
    if (rule == null) return null;
    var osts = rule.split("~");
    var result = "";
    for (var j = 0; j < osts.length; j++) {
        if (j % 2 == 1) {
            var index = osts[j].indexOf("$");
            if (name == null || index >= 0 && name == osts[j].substring(0, index)) {
                var obs = osts[j].split(':');
                var offnum = parseInt(obs[1]);
                var num = offnum + curnum;
                var ostsobjs = document.getElementsByName(pageid + obs[0]);
                if (ostsobjs != null && num >= 0 && num < ostsobjs.length) {
                    if (ostsobjs[num].disabled) return null;
                    if (ostsobjs[num].id != null) {
                        result = result + getElementScriptStr(ostsobjs[num].id);
                    }
                    else {
                        result = result + getElementScriptStr(ostsobjs[num].name);
                    }
                }
                else {
                    return null;
                }
            }
            else {
                result = result + "~" + osts[j] + "~";
            }
        } else {
            result = result + osts[j];
        }
    }
    return result;
}

function getNameAndCount(rule, pageid) {
    var osts = rule.split('@');
    for (var j = 0; j < osts.length; j++) {
        if (j % 2 == 1) {
            if (osts[j].indexOf('$') >= 0) {
                var obj = document.getElementsByName(pageid + osts[j]);
                if (obj != null) {
                    if (obj.length > 0 && obj[obj.length - 1].id.indexOf("$total") >= 0) {
                        return new Array(osts[j].substring(0, osts[j].indexOf('$')), obj.length - 1);
                    }
                    else {
                        return new Array(osts[j].substring(0, osts[j].indexOf('$')), obj.length);
                    }
                }
                else {
                    return new Array(null, 0);
                }
            }
        }
    }
    return new Array(null, 1);
}

function loadAllAction(rule, pageid) {
    if (rule.indexOf('@') < 0) {
        return new Array(rule);
    }
    var allresults = new Array();
    var m = 0;
    var count = getNameAndCount(rule, pageid);
    if (count[1] == 0) return null;
    for (var i = 0; i < count[1]; i++) {
        var result = LoadOtherActionValue(rule, count[0], i, pageid);
        result = loadActionValue(result, count[0], i, pageid);
        if (result != null) {
            var results = loadAllAction(result, pageid);
            for (var j = 0; j < results.length; j++) {
                allresults[m] = results[j];
                m++;
            }
        }
    }
    return allresults;
}

function loadAction(rule, pageid) {
    if (rule == null) return null;
    var result = rule;
    result = getArrayActionValue(result, pageid);
    var results = loadAllAction(rule, pageid);
    return results;
}

function loadActionValue(rule, name, num, pageid) {
    if (rule == null) return null;
    var osts = rule.split("@");
    var result = "";
    for (var j = 0; j < osts.length; j++) {
        if (j % 2 == 1) {
            var index = osts[j].indexOf("$");
            if (name == null || index >= 0 && name == osts[j].substring(0, index)) {
                var ostsobjs = document.getElementsByName(pageid + osts[j]);
                if (ostsobjs != null && ostsobjs.length > 1) {
                    var listobj = document.getElementById(pageid + osts[j] + num);
                    if (listobj == null) {
                        listobj = document.getElementById(pageid + osts[j] + "$total");
                        if (listobj != null) {
                            result = result + getElementScriptStr(pageid + osts[j] + "$total");
                        }
                        else {
                            return null;
                        }
                    }
                    else {
                        result = result + getElementScriptStr(pageid + osts[j] + num);
                    }
                }
                else if (ostsobjs != null && ostsobjs.length == 1) {
                    if (ostsobjs[0].id != null) {
                        result = result + getElementScriptStr(ostsobjs[0].id);
                    }
                    else {
                        result = result + getElementScriptStr(ostsobjs[0].name);
                    }
                }
                else {
                    return null;
                }
            }
            else {
                result = result + "@" + osts[j] + "@";
            }
        } else {
            result = result + osts[j];
        }
    }
    return result;
}
//
//function getActionValue(rule, num, pageid) {
//    var osts = rule.split("@");
//    var result = "";
//    for (var j = 0; j < osts.length; j++) {
//        if (j % 2 == 1) {
//            var ostsobjs = document.getElementsByName(pageid + osts[j]);
//            if (ostsobjs != null && ostsobjs.length > 1) {
//                var listobj = document.getElementById(pageid + osts[j] + num);
//                if (listobj == null) {
//                    listobj = document.getElementById(pageid + osts[j] + "$total");
//                    if (listobj != null) {
//                        result = result + getElementScriptStr(pageid + osts[j] + "$total");
//                    }
//                    else {
//                        return "";
//                    }
//                }
//                else {
//                    result = result + getElementScriptStr(pageid + osts[j] + num);
//                }
//            }
//            else if (ostsobjs != null && ostsobjs.length == 1) {
//                if (ostsobjs[0].id != null) {
//                    result = result + getElementScriptStr(ostsobjs[0].id);
//                }
//                else {
//                    result = result + getElementScriptStr(ostsobjs[0].name);
//                }
//            }
//            else {
//                result = result + '';
//            }
//        } else {
//            result = result + osts[j];
//        }
//    }
//    return result;
//
//}


function getRuleArrayValue(rule, pageid) {
    var osts = rule.split("^");
    var result = "";
    for (var j = 0; j < osts.length; j++) {
        if (j % 2 == 1) {
            var obs = osts[j].split(':');
            var ostsobjs = document.getElementsByName(pageid + obs[0]);
            var num = parseInt(obs[1]);
            if (ostsobjs != null && ostsobjs.length > num && num >= 0) {
                if (ostsobjs[num].disabled) return null;
                result = result + ostsobjs[num].value;
            }
            else {
                //result = result + '0';
                return null;
            }
        } else {
            result = result + osts[j];
        }
    }
    return result;
}

function getRuleSum(rule, pageid) {
    var osts = rule.split("#");
    var result = "";
    for (var j = 0; j < osts.length; j++) {
        if (j % 2 == 1) {
            var ostsobjs = document.getElementsByName(pageid + osts[j]);
            if (ostsobjs != null && ostsobjs.length > 1) {
                var ostsobjsvalue = "";
                for (var m = 0; m < ostsobjs.length; m++) {
                    if (!ostsobjs[m].disabled) {
                        if (ostsobjsvalue != "") {
                            ostsobjsvalue = ostsobjsvalue + '+';
                        }
                        ostsobjsvalue = ostsobjsvalue + ostsobjs[m].value;
                    }
                }
                if (ostsobjsvalue == "") {
                    result = result + '0';
                }
                else {
                    result = result + '(' + ostsobjsvalue + ')';
                }
            }
            else if (ostsobjs != null && ostsobjs.length == 1) {
                //alert(ostsobjs[0].name)
                result = result + ostsobjs[0].value;
            }
            else {
                result = result + '0';
            }
        } else {
            result = result + osts[j];
        }
    }
    return result;
}

function getRuleValue(rule, num, pageid) {
    if (rule == null) return null;
    var osts = rule.split('@');
    var result = "";
    for (var j = 0; j < osts.length; j++) {
        if (j % 2 == 1) {
            var ostsobjs = document.getElementsByName(pageid + osts[j]);
            if (ostsobjs != null && num >= 0 && num < ostsobjs.length) {
                result = result + ostsobjs[num].value;
            }
            else {
                return null;
            }
        } else {
            result = result + osts[j];
        }
    }
    result = result.replace('--', '+').replace('+-', '-');
    return result;

}

function getOtherRuleValue(rule, curnum, pageid) {
    if (rule == null) return null;
    var osts = rule.split('~');
    var result = "";
    for (var j = 0; j < osts.length; j++) {
        if (j % 2 == 1) {
            var obs = osts[j].split(':');
            var ostsobjs = document.getElementsByName(pageid + obs[0]);
            var offnum = parseInt(obs[1]);
            var num = offnum + curnum;
            if (ostsobjs != null && num >= 0 && num < ostsobjs.length) {
                if (ostsobjs[num].disabled) return null;
                result = result + ostsobjs[num].value;
            }
            else {
                return null;
            }
        } else {
            result = result + osts[j];
        }
    }
    return result;

}

function getElementScriptStr(id) {
    return "document.getElementById('" + id + "')";
}

function getCount(rule, pageid) {
    var osts = rule.split('@');
    for (var j = 0; j < osts.length; j++) {
        if (j % 2 == 1) {
            if (osts[j].indexOf('$') >= 0) {
                var obj = document.getElementsByName(pageid + osts[j]);
                if (obj != null) {
                    if (obj.length > 0 && obj[obj.length - 1].id.indexOf("$total") >= 0) {
                        return  obj.length - 1;
                    }
                    else {
                        return obj.length;
                    }
                }
                else {
                    return 0;
                }
            }
        }
    }
    return 1;
}


function getSetObject(rule, pageid) {
    if (rule.indexOf('^') >= 0) {
        var osts = rule.split("^");
        if (osts.length == 3 && osts[0] == '' && osts[2] == '') {
            var obs = osts[1].split(':');
            var ostsobjs = document.getElementsByName(pageid + obs[0]);
            var num = parseInt(obs[1]);
            if (ostsobjs != null && ostsobjs.length > num && num >= 0) {
                return new Array(ostsobjs[num]);
            }
            else {
                //result = result + '0';
                return null;
            }
        }
    }
    else {
        var osts = rule.split('@');
        if (osts.length == 3 && osts[0] == '' && osts[2] == '') {
            //alert(osts[1])
            return document.getElementsByName(pageid + osts[1]);
        }
        else {
            return null;
        }
    }
    return null;
}


function setRuleValue(Auditing_rules, TotalList, pageid) {
    for (var i = 0; i < Auditing_rules.length; i++) {
        var rule = Auditing_rules[i][0];
        rule = getRuleSum(rule, pageid);
        //var count = getCount(rule);
        var rules = rule.split(":=");
        if (rules.length == 2) {
            var objs = getSetObject(rules[0], pageid);
            //alert(objname);
            if (objs != null) {
                //if (count > 1) {
                for (var j = 0; j < objs.length; j++) {
                    //var obj = document.getElementById(objname + j);
                    //if (obj != null) {
                    var rulestr = getRuleArrayValue(rules[1], pageid);
                    rulestr = getOtherRuleValue(rulestr, j, pageid);
                    rulestr = getRuleValue(rulestr, j, pageid);
                    if (rulestr != null) {
                        try {
                            eval('objs[j].value=FormatNumber(' + rulestr + ',' + Auditing_rules[i][2] + ')');
                        }
                        catch(e) {
                            alert("审核语句出错：" + rule);
                        }
                    }
                    //}
                    //  }
                }
                //                    else {
                //                        var obj = document.getElementsByName(objname);
                //                        if (obj != null && obj.length > 0)
                //                            eval('obj[0].value=FormatNumber(' + getRuleValue(rules[1], 0) + ','+Auditing_rules[i][2]+')');
                //                    }
            }
        }
    }
    setListTotal(TotalList, pageid);
}


function setListTotal(listtotalrules, pageid) {
    for (var i = 0; i < listtotalrules.length; i++) {
        if (listtotalrules[2] == "@SUM@") {
            var total = 0;
            eval('var objnum=' + pageid + listtotalrules[1] + 'num');
            for (var j = 0; j < objnum; j++) {
                total = total + parseFloat(document.getElementById(pageid + listtotalrules[1] + j).value);
            }
            document.getElementById(pageid + '$' + 'total').value = FormatNumber(total, 2);
        }
        else if (listtotalrules[2] == "@MAX@") {
            var total = 0;
            eval('var objnum=' + pageid + listtotalrules[1] + 'num');
            if (parseFloat(document.getElementById(pageid + listtotalrules[1] + j).value) > total) {
                total = document.getElementById(pageid + listtotalrules[1] + j).value
            }
            document.getElementById(pageid + '$' + 'total').value = FormatNumber(total, 2);
        }
        else if (listtotalrules[2] == "@MIN@") {
            var total = 0;
            eval('var objnum=' + pageid + listtotalrules[1] + 'num');
            if (parseFloat(document.getElementById(pageid + listtotalrules[1] + j).value) < total) {
                total = document.getElementById(pageid + listtotalrules[1] + j).value
            }
            document.getElementById(pageid + '$' + 'total').value = FormatNumber(total, 2);

        }
        else if (listtotalrules[2] == "@AVE@") {
            var total = 0;
            eval('var objnum=' + pageid + listtotalrules[1] + 'num');
            for (var j = 0; j < objnum; j++) {
                total = total + parseFloat(document.getElementById(pageid + listtotalrules[1] + j).value);
            }
            document.getElementById(pageid + '$' + 'total').value = FormatNumber(total / objnum, 2);
        }
    }
}


function addItemvalue(addlist, num, mode, istotal) {
    if (addlist != null) {
        for (var i = 0; i < addlist.length; i++) {
            var item = document.getElementById(addlist[i][0] + num);
            var items;
            if (addlist[i][2] == null) {
                items = document.getElementsByName(item.name);
            }
            else {
                items = document.getElementsByName(addlist[i][2]);
            }
            if (items != null && items.length > 1) {
                if (mode == 'top') {
                    if (istotal) {
                        if (items.length > 2) {
                            item.value = parseInt(items[1].value) - addlist[i][1];
                        }
                    }
                    else {
                        item.value = parseInt(items[1].value) - addlist[i][1];
                    }
                }
                else {
                    if (istotal) {
                        if (items.length > 2) {
                            item.value = parseInt(items[items.length - 3].value) + addlist[i][1];
                        }
                    }
                    else {
                        item.value = parseInt(items[items.length - 2].value) + addlist[i][1];
                    }
                }
            }
        }
    }
}