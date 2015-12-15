function caltb(tabid) {
	this.tabid = tabid;
	this.rules = null;
	this.rulesY = null;
	this.rulesID = null;
	this.empty = null;
	this.type = "0";
	this.negative = false;
	this.isQfw = false;
	this.calPageTips = "";
	this.pageTipsFlag = "0";
	this.pasteEnable = true;
	this.emptyArr = null;
	this.setRules = function(rules) {
		this.rules = rules;
	}
	this.setRulesY = function(rulesY) {
		this.rulesY = rulesY;
	}
	this.setRulesID = function(rulesID) {
		this.rulesID = rulesID;
	}
	this.setEmpty = function(empty) {
		this.empty = empty;
	}
	this.customrules = function() {
	};
	this.customrulesEnd = function() {
	};
	this.setEmptyArr = function(emptyArr) {
		this.emptyArr = emptyArr;
	};
}

function initCalTable(calT) {
	for (var j = 0; j < $(calT.tabid).getElementsByTagName("input").length; j++) {
		if ($(calT.tabid).getElementsByTagName("input")[j].getAttribute("cal") == "true") {
			if ($(calT.tabid).getElementsByTagName("input")[j]
					.getAttribute("exception") == undefined) {
				$(calT.tabid).getElementsByTagName("input")[j].onchange = function() {
					if (trim(this.value) != "") {
						if (this.getAttribute("negative") == "false") {
							if (parseFloat(this.value) < 0) {
								this.value = "";
							}
						}
						if (calT.negative == false
								&& this.getAttribute("negative") != "true") {
							if (parseFloat(this.value) < 0) {
								this.value = "";
							}
						}
					}
					if (this.calObj != undefined) {
						caltbF(eval(this.calObj));
					} else {
						caltbF(calT);
					}
				}
			}
			$(calT.tabid).getElementsByTagName("input")[j].style.imeMode = "disabled";
			$(calT.tabid).getElementsByTagName("input")[j].onkeydown = function() {
				caltbTab();
			}
			$(calT.tabid).getElementsByTagName("input")[j].onkeypress = function() {
				caltbFilterChar(calT);
			}

			if (calT.pasteEnable==false) {
				$(calT.tabid).getElementsByTagName("input")[j].onpaste = function() {
					return false;
				}
			} else {
				$(calT.tabid).getElementsByTagName("input")[j].onpaste = function() {
					this.value = caltbSetformat(this);
				}
			}
			$(calT.tabid).getElementsByTagName("input")[j].value = sciToNumber($(calT.tabid)
					.getElementsByTagName("input")[j].value);
			$(calT.tabid).getElementsByTagName("input")[j].value = caltbSetformat($(calT.tabid)
					.getElementsByTagName("input")[j]);
		}
		if ($ES("pageTips").length != 0) {
			if ($ES("pageTips")[0].value != "" && calT.calPageTips == "") {
				calT.calPageTips = eval("(" + $ES("pageTips")[0].value + ")").tips;
			}
			if (calT.pageTipsFlag == "0") {
				for (var i = 0; i < calT.calPageTips.length; i++) {
					if (calT.calPageTips[i].hc == $(calT.tabid)
							.getElementsByTagName("input")[j]
							.getAttribute("hc")
							&& calT.calPageTips[i].lh == $(calT.tabid)
									.getElementsByTagName("input")[j]
									.getAttribute("lh")) {
						$(calT.tabid).getElementsByTagName("input")[j].title = calT.calPageTips[i].tsxxnr;
					}
				}
			} else {
				if ($(calT.tabid).getElementsByTagName("input")[j].readOnly == true) {
					$(calT.tabid).getElementsByTagName("input")[j].onmouseover = function() {
						for (var i = 0; i < calT.calPageTips.length; i++) {
							if (calT.calPageTips[i].hc == this
									.getAttribute("hc")
									&& calT.calPageTips[i].lh == this
											.getAttribute("lh")) {
								$("pageTipsDiv").innerHTML = calT.calPageTips[i].tsxxnr;
							}
						}
					}
				} else {
					$(calT.tabid).getElementsByTagName("input")[j].onfocus = function() {
						for (var i = 0; i < calT.calPageTips.length; i++) {
							if (calT.calPageTips[i].hc == this
									.getAttribute("hc")
									&& calT.calPageTips[i].lh == this
											.getAttribute("lh")) {
								$("pageTipsDiv").innerHTML = calT.calPageTips[i].tsxxnr;
							}
						}
					}
				}
			}
		}
	}
}

function caltbF(calT) {
	switch (calT.type) {
		case "0" :
			runRulesForName(calT);
			break;
		case "1" :
			runRulesForID(calT);
			break;
		case "2" :
			runRulesForName(calT);
			runRulesForID(calT);
			break;
		default :
			runRulesForName(calT);
			break;
	}
}

function caltbTab() {
	var type;
	type = document.activeElement.type;
	if (type == "select-one") {
		if ((event.keyCode != 38) && (event.keyCode != 40)) {
			window.event.keyCode = 9;
		}
	} else {
		if (event.keyCode == 13) {
			window.event.keyCode = 9;
		}
	}
}

function runRulesForName(calT) {
	calT.customrules();
	if (window.event != null && window.event.srcElement != null) {
		window.event.srcElement.value = caltbSetformat(window.event.srcElement);
	}
	if (calT.rules != null) {
		for (var i = 0; i < calT.rules.length; i++) {
			var temp = calT.rules[i].split(" ");
			if (temp.length == 1) {
				var exeFun = temp[0] + "()";
				eval(exeFun);
				continue;
			}
			var setObj = $ES(temp[0]);
			for (var j = 0; j < 2; j++) {
				temp.splice(0, 1);
			}
			for (var n = 0; n < setObj.length; n++) {
				var evalStr = "setObj[" + n + "].value= ";
				var cal = false;
				for (var m = 0; m < temp.length; m++) {
					if (temp[m] != "+" && temp[m] != "-" && temp[m] != "*"
							&& temp[m] != "/" && temp[m] != "%"
							&& temp[m] != "(" && temp[m] != ")"
							&& caltbCheckFloat(temp[m]) == false) {

						var tempObj = eval("$ES('" + temp[m] + "')[" + n + "]");
						// 2013-06-05 yangxi
						// 如果发现某个计算字段没有获取到对应值则取第0个
						if (tempObj == null || typeof(tempObj) == "undefined") {
							tempObj = eval("$ES('" + temp[m] + "')[0]");
							if (caltbTrim(tempObj.value).empty()) {
								evalStr = evalStr + "parseFloat(0.00)";
							} else {
								cal = true;
								$ES(temp[m])[0].value = sciToNumber($ES(temp[m])[0].value);
								$ES(temp[m])[0].value = caltbSetformat($ES(temp[m])[0]);
								evalStr = evalStr + "parseFloat($ES('"
										+ temp[m] + "')[0].value)";
							}
						} else {
							if (caltbTrim(tempObj.value).empty()) {
								evalStr = evalStr + "parseFloat(0.00)";
							} else {
								cal = true;
								$ES(temp[m])[n].value = sciToNumber($ES(temp[m])[n].value);
								$ES(temp[m])[n].value = caltbSetformat($ES(temp[m])[n]);
								evalStr = evalStr + "parseFloat($ES('"
										+ temp[m] + "')[" + n + "].value)";
							}
						}
					} else {
						evalStr = evalStr + " " + temp[m] + " ";
					}
				}
				if (cal) {
					eval(evalStr);
					setObj[n].value = caltbSetformat(setObj[n]);
					if (!calT.negative
							|| setObj[n].getAttribute("negative") == "false") {
						if (setObj[n].getAttribute("negative") != "true") {
							if (setObj[n].value.indexOf("-") == 0) {
								setObj[n].value = "0";
							}
						}
					}
					if (calT.empty != null) {
						if (parseFloat(setObj[n].value) < 1
								&& parseFloat(setObj[n].value) > 0) {
							for (var p = 0; p < calT.empty.length; p++) {
								if (calT.empty[p] == setObj[n].name
										|| calT.empty[p] == setObj[n].id) {
									setObj[n].value = "0";
									break;
								}
							}
						}
					}
				} else {
					setObj[n].value = "";
				}
			}
		}
	}

	if (calT.rulesY != null) {
		for (var i = 0; i < calT.rulesY.length; i++) {
			var temp = calT.rulesY[i].split(" ");
			if (temp.length == 1) {
				var exeFun = temp[0] + "()";
				eval(exeFun);
				continue;
			}
			// 防止页面没有写ID，改成根据NAME取值 2013-10-13 by yangxi
			// var setObj = $(temp[0]);
			var setObj = $ES(temp[0])[0];
			if (setObj == null || typeof(setObj) == "undefined") {
				break;
			}
			for (var j = 0; j < 2; j++) {
				temp.splice(0, 1);
			}
			var evalStr = "setObj.value= ";
			var cal = false;
			for (var m = 0; m < temp.length; m++) {
				if (temp[m] != "+" && temp[m] != "-" && temp[m] != "*"
						&& temp[m] != "/" && temp[m] != "%" && temp[m] != "("
						&& temp[m] != ")") {
					var tempObjArr = eval("$ES('" + temp[m] + "')");
					var eSum = 0;
					for (var n = 0; n < tempObjArr.length; n++) {
						var tempObj = tempObjArr[n];
						if (!caltbTrim(tempObj.value).empty()) {
							cal = true;
							tempObj.value = sciToNumber(tempObj.value);
							tempObj.value = caltbSetformat(tempObj);
							eSum = eSum + parseFloat(tempObj.value);
						}
					}
					evalStr = evalStr + eSum;
				} else {
					evalStr = evalStr + " " + temp[m] + " ";
				}
			}
			if (cal) {
				eval(evalStr);
				setObj.value = caltbSetformat(setObj);
				if (!calT.negative
						|| setObj.getAttribute("negative") == "false") {
					if (setObj.getAttribute("negative") != "true") {
						if (setObj.value.indexOf("-") == 0) {
							setObj.value = "0";
						}
					}
				}
				if (calT.empty != null) {
					if (parseFloat(setObj.value) < 1
							&& parseFloat(setObj.value) > 0) {
						for (var p = 0; p < calT.empty.length; p++) {
							if (calT.empty[p] == setObj.name
									|| calT.empty[p] == setObj.id) {
								setObj.value = "0";
								break;
							}
						}
					}
				}
			} else {
				setObj.value = "";
			}
		}
	}
	calT.customrulesEnd();
	if (calT.emptyArr != null) {
		var sum = 0;
		for (var n = 0; n < calT.emptyArr.length; n++) {
			sum = parseFloat($ES(calT.emptyArr[n])[0].value) + parseFloat(sum);
		}
		if (sum < 1 && sum > 0) {
			for (var n = 0; n < calT.emptyArr.length; n++) {
				$ES(calT.emptyArr[n])[0].value = 0;
				$ES(calT.emptyArr[n])[0].value = caltbSetformat($ES(calT.emptyArr[n])[0]);
			}
		}
	}
}

function runRulesForID(calT) {
	calT.customrules();
	if (window.event != null && window.event.srcElement != null) {
		window.event.srcElement.value = caltbSetformat(window.event.srcElement);
	}
	if (calT.rulesID != null) {
		for (var i = 0; i < calT.rulesID.length; i++) {
			var temp = calT.rulesID[i].split(" ");
			if (temp.length == 1) {
				var exeFun = temp[0] + "()";
				eval(exeFun);
				continue;
			}
			var setObj = $(temp[0]);
			for (var j = 0; j < 2; j++) {
				temp.splice(0, 1);
			}
			var evalStr = "setObj.value= ";
			var cal = false;
			if (temp.length == 1 && temp[0].indexOf("zdy") != -1) {
				evalStr = evalStr + " " + temp[0] + " ";
				cal = true;
			} else {
				for (var m = 0; m < temp.length; m++) {
					if (temp[m] != "+" && temp[m] != "-" && temp[m] != "*"
							&& temp[m] != "/" && temp[m] != "%"
							&& temp[m] != "(" && temp[m] != ")"
							&& caltbCheckFloat(temp[m]) == false) {
						var tempObj = eval("$('" + temp[m] + "')");
						if (caltbTrim(tempObj.value).empty()) {
							evalStr = evalStr + "parseFloat(0.00)";
						} else {
							cal = true;
							$(temp[m]).value = sciToNumber($F(temp[m]));
							$(temp[m]).value = caltbSetformat($(temp[m]));
							evalStr = evalStr + "parseFloat($('" + temp[m]
									+ "').value)";
						}
					} else {
						evalStr = evalStr + " " + temp[m] + " ";
					}
				}
			}
			if (cal) {
				eval(evalStr.replace(/zdy/g, ""));
				setObj.value = caltbSetformat(setObj);
				if (!calT.negative
						|| setObj.getAttribute("negative") == "false") {
					if (setObj.getAttribute("negative") != "true") {
						if (setObj.value.indexOf("-") == 0) {
							setObj.value = "0";
						}
					}
				}
				if (calT.empty != null) {
					if (parseFloat(setObj.value) < 1
							&& parseFloat(setObj.value) > 0) {
						for (var p = 0; p < calT.empty.length; p++) {
							if (calT.empty[p] == setObj.name
									|| calT.empty[p] == setObj.id) {
								setObj.value = "0";
								break;
							}
						}
					}
				}
			} else {
				setObj.value = "";
			}
		}
		calT.customrulesEnd();
	}

	if (calT.emptyArr != null) {
		var sum = 0;
		for (var n = 0; n < calT.emptyArr.length; n++) {
			sum = parseFloat($(calT.emptyArr[n]).value) + parseFloat(sum);
		}
		if (sum < 1 && sum > 0) {
			for (var n = 0; n < calT.emptyArr.length; n++) {
				$(calT.emptyArr[n]).value = 0;
				$(calT.emptyArr[n]).value = caltbSetformat($(calT.emptyArr[n]));
			}
		}
	}
}

function caltbIsexist(s) {
	try {
		eval(s);
	} catch (e) {
		return false;
	}
	return true;
}

function caltbFilterChar(calT) {
	if (window.event.srcElement.getAttribute("integer") == "true") {
		if (window.event.keyCode == 46) {
			window.event.keyCode = 0;
			return;
		}
	}
	if (window.event.srcElement.getAttribute("cal") == "true") {
		if (window.event.keyCode == 45 && calT.negative == false
				&& window.event.srcElement.getAttribute("negative") != "true") {
			window.event.keyCode = 0;
			return;
		}
		if (window.event.keyCode == 45
				&& window.event.srcElement.getAttribute("negative") == "false") {
			window.event.keyCode = 0;
			return;
		}
		if (calT.pasteEnable == false) {
			if (window.event.keyCode == 45
					&& window.event.srcElement.value.length > 0) {
				window.event.keyCode = 0;
				return;
			}
		}
		if (!(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))
				|| (window.event.keyCode == 13) || (window.event.keyCode == 46) || (window.event.keyCode == 45))) {
			window.event.keyCode = 0;
			return;
		}
		if (window.event.keyCode == 46
				&& window.event.srcElement.value.indexOf(".") > 0) {
			window.event.keyCode = 0;
			return;
		}
		if (calT.pasteEnable == false) {
			if (window.event.keyCode == 45
					&& window.event.srcElement.value.indexOf("-") > -1) {
				window.event.keyCode = 0;
				return;
			}
		}
		if (window.event.keyCode == 46 && window.event.srcElement.value == "") {
			window.event.keyCode = 0;
			return;
		}
	}
}

function caltbCheckFloat(obj) {
	if (typeof(obj) == "object") {
		if (/^(\+|-)?\d+($|\.\d+$)/.test(caltbTrim(obj.value))
				&& caltbCheckFloatIn(obj.value)) {
			return true;
		}
	} else {
		if (/^(\+|-)?\d+($|\.\d+$)/.test(caltbTrim(obj))
				&& caltbCheckFloatIn(obj)) {
			return true;
		}
	}
	return false;
}

function caltbCheckFloatIn(str) {
	var n = eval("$ES(str).length");
	if (n == 0) {
		return true;
	}
	if (str.indexOf(".") < 0) {
		if (str.length > 0) {
			if (str.substr(0, 1) == "0") {
				return false;
			}
		}
	}
	return true;
}

function caltbCheckEnglish(str) {
	if (/^[A-Za-z]+$/.test(validatorTrim(str))) {
		return true;
	}
	return false;
}

function caltbSetformat(obj) {
	if (obj.getAttribute("cal") == undefined) {
		return obj.value;
	}
	if (caltbCheckFloat(obj) == false) {
		if (obj.value.indexOf("e") == -1 && obj.value.indexOf("E") == -1) {
			return "";
		}
	}
	switch (obj.getAttribute("cal")) {
		case "true" :
			if (obj.getAttribute("format") != undefined) {
				if (parseInt(obj.getAttribute("format")) < 1) {
					if (obj.value.indexOf(".") != -1) {
						return (parseFloat(obj.value.substr(0, obj.value
										.indexOf("."))));
					} else {
						return obj.value;
					}
				}
			}
			var format = obj.getAttribute("format") || 2;
			return caltbNumloop(obj.value, parseInt(format));
		default :
			return obj.value;
	}
}

function caltbNumloop(num, n) {
	if (num == 0) {
		num = "0";
	}
	if (num == "") {
		return "";
	}
	num = (parseFloat(num) * 100) / 100;
	num = num.toString();
	if (num.indexOf(".") == "-1") {
		num = num + ".";
		for (var i = 0; i < n; i++) {
			num = num + "0";
		}
	} else if (num.split(".")[1] == "") {
		for (var i = 0; i < n; i++) {
			num = num + "0";
		}
	} else if (num.split(".")[1].length > n) {
		var num2xx = parseFloat(num).toFixed(n);
		num = Math.round(parseFloat(num) * Math.pow(10, parseInt(n)))
				/ Math.pow(10, parseFloat(n));
		if (parseFloat(num) > num2xx) {
			return num;
		} else {
			return num2xx;
		}
	} else if (num.split(".")[1].length < n) {
		var tn = parseInt(n - num.split(".")[1].length);
		for (var i = 0; i < tn; i++) {
			num = num + "0";
		}
	}
	return num;
}

function caltbTrim(mystring) {
	try {
		var temp_string = mystring;
		while (temp_string.substring(0, 1) == " ")
			temp_string = temp_string.substring(1);
		while (temp_string
				.substring(temp_string.length - 1, temp_string.length) == " ")
			temp_string = temp_string.substring(0, temp_string.length - 1);
		return temp_string;
	} catch (e) {
		alert(e.message);
		return "";
	}
}

function runOnlyRuleForArr(temp, em) {
	if (temp.split(" ").length == 1) {
		var exeFun = temp + "()";
		eval(exeFun);
		return;
	}
	runOnlyRule(temp.split(" "), em);
}

function runOnlyRule(temp, em) {
	var setObj = $ES(temp[0]);
	for (var j = 0; j < 2; j++) {
		temp.splice(0, 1);
	}
	for (var n = 0; n < setObj.length; n++) {
		var evalStr = "setObj[" + n + "].value= ";
		var cal = false;
		for (var m = 0; m < temp.length; m++) {
			if (temp[m] != "+" && temp[m] != "-" && temp[m] != "*"
					&& temp[m] != "/" && temp[m] != "%" && temp[m] != "("
					&& temp[m] != ")" && caltbCheckFloat(temp[m]) == false) {
				var tempObj = eval("$ES('" + temp[m] + "')[" + n + "]");
				if (caltbTrim(tempObj.value).empty()) {
					evalStr = evalStr + "parseFloat(0.00)";
				} else {
					cal = true;
					$ES(temp[m])[n].value = sciToNumber($ES(temp[m])[n].value);
					$ES(temp[m])[n].value = caltbSetformat($ES(temp[m])[n]);
					evalStr = evalStr + "parseFloat($ES('" + temp[m] + "')["
							+ n + "].value)";
				}
			} else {
				evalStr = evalStr + " " + temp[m] + " ";
			}
		}
		if (cal) {
			eval(evalStr);
			setObj[n].value = caltbSetformat(setObj[n]);
			if (setObj[n].getAttribute("negative") == "false") {
				if (setObj[n].value.indexOf("-") == 0) {
					setObj[n].value = "0";
				}
			}
			if (em == true) {
				if (parseFloat(setObj[n].value) < 1
						&& parseFloat(setObj[n].value) > 0) {
					setObj[n].value = "0";
				}
			}
		} else {
			setObj[n].value = "";
		}
	}
}

function runOnlyRuleYForArr(temp, em) {
	if (temp.split(" ").length == 1) {
		var exeFun = temp + "()";
		eval(exeFun);
		return;
	}
	runOnlyRuleY(temp.split(" "), em);
}

function runOnlyRuleY(temp, em) {
	var setObj = $(temp[0]);
	for (var j = 0; j < 2; j++) {
		temp.splice(0, 1);
	}
	var evalStr = "setObj.value= ";
	var cal = false;
	for (var m = 0; m < temp.length; m++) {
		if (temp[m] != "+" && temp[m] != "-" && temp[m] != "*"
				&& temp[m] != "/" && temp[m] != "%" && temp[m] != "("
				&& temp[m] != ")") {
			var tempObjArr = eval("$ES('" + temp[m] + "')");
			var eSum = 0;
			for (var n = 0; n < tempObjArr.length; n++) {
				var tempObj = tempObjArr[n];
				if (!caltbTrim(tempObj.value).empty()) {
					cal = true;
					tempObj.value = sciToNumber(tempObj.value);
					tempObj.value = caltbSetformat(tempObj);
					eSum = eSum + parseFloat(tempObj.value);
				}
			}
			evalStr = evalStr + eSum;
		} else {
			evalStr = evalStr + " " + temp[m] + " ";
		}
	}
	if (cal) {
		eval(evalStr);
		setObj.value = caltbSetformat(setObj);
		if (setObj.getAttribute("negative") == "false") {
			if (setObj.value.indexOf("-") == 0) {
				setObj.value = "0";
			}
		}
		if (em == true) {
			if (parseFloat(setObj.value) < 1 && parseFloat(setObj.value) > 0) {
				setObj.value = "0";
			}
		}
	} else {
		setObj.value = "";
	}
}

function sciToNumber(str) {
	if (str.indexOf("E") != -1) {
		str = str.split("E")[0]
				* Math.pow(10, str.substr(str.indexOf("E") + 1, str.length));
	}
	return str;
}

function calNum3du(num) {
	num = num + "";
	var re = /(-?\d+)(\d{3})/
	while (re.test(num)) {
		num = num.replace(re, "$1,$2")
	}
	return num;
}

function calReNum(num) {
	return num.replace(/,/gi, '');
}

function dcmAdd(arg1, arg2) {
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
	m = Math.pow(10, Math.max(r1, r2));
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m + arg2 * m) / m).toFixed(n);
}

function dcmSbt(arg1, arg2) {
	return dcmAdd(arg1, -arg2);
}

function dcmMul(arg1, arg2) {
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {
	}
	try {
		m += s2.split(".")[1].length
	} catch (e) {
	}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
			/ Math.pow(10, m);
}

function dcmDiv(arg1, arg2) {
	return dcmMul(arg1, 1 / arg2);
}