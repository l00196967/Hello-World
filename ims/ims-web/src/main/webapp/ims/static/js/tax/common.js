function onkeydowns() {
	try {
		if (event.keyCode == 13) {

			if (document.activeElement.type == "password"
					|| document.activeElement.type == "text"
					|| document.activeElement.type == "select-one"
					|| document.activeElement.type == "checkbox"
					|| document.activeElement.type == "radio")

			{
				event.keyCode = 9;
				// changeElementColor();
			}

		}
	} catch (Exception) {
	}
}

function checkit(checkbox, list, checkmode) {
	if (checkbox.checked) {

		if (list.length == 0)
			return;
		var checks = document.getElementsByName(document
				.getElementById(list[0]).name);
		var first;
		var last;
		if (checks != null) {
			for (var i = 0; i < checks.length; i++) {
				if (!checks[i].disabled) {
					break;
				} else {
					first = checks[i];
				}

			}
			for (var i = checks.length - 1; i >= 0; i--) {
				if (!checks[i].disabled) {
					break;
				} else {
					last = checks[i];
				}
			}
		}
		if (checkmode == 1) {
			if (document.getElementById(list[0]) == last) {
				for (var i = 0; i < list.length; ++i) {
					var obj = document.getElementById(list[i]);
					obj.disabled = false;
				}
			} else {
				alert("杩欎竴琛屼笉鑳借繕鍘燂紝蹇呴』鍏堣繕鍘熷厛鍒犻櫎鐨勮娆�")
				checkbox.checked = false;
			}
		} else if (checkmode == 2) {
			if (document.getElementById(list[0]) == first) {
				for (var i = 0; i < list.length; ++i) {
					var obj = document.getElementById(list[i]);
					obj.disabled = false;
				}
			} else {
				alert("杩欎竴琛屼笉鑳借繕鍘燂紝蹇呴』鍏堣繕鍘熷厛鍒犻櫎鐨勮娆�")
				checkbox.checked = false;
			}
		} else if (checkmode == 3) {
			if (document.getElementById(list[0]) == last
					|| document.getElementById(list[0]) == first) {
				for (var i = 0; i < list.length; ++i) {
					var obj = document.getElementById(list[i]);
					obj.disabled = false;
				}
			} else {
				alert("杩欎竴琛屼笉鑳借繕鍘燂紝蹇呴』鍏堣繕鍘熷厛鍒犻櫎鐨勮娆�")
				checkbox.checked = false;
				;
			}
		} else {
			for (var i = 0; i < list.length; ++i) {
				var obj = document.getElementById(list[i]);
				obj.disabled = false;
			}
		}
	} else {
		if (list.length == 0)
			return;
		var checks = document.getElementsByName(document
				.getElementById(list[0]).name);
		var first;
		var last;
		if (checks != null) {
			for (var i = 0; i < checks.length; i++) {
				if (!checks[i].disabled) {
					first = checks[i];
					break;
				}
			}
			for (var i = checks.length - 1; i >= 0; i--) {
				if (!checks[i].disabled) {
					last = checks[i];
					break;
				}
			}
		}
		if (checkmode == 1) {
			if (document.getElementById(list[0]) == last) {
				for (var i = 0; i < list.length; ++i) {
					var obj = document.getElementById(list[i]);
					obj.disabled = true;
				}
			} else {
				alert("杩欎竴琛屼笉鑳藉垹闄わ紝蹇呴』鍏堝垹闄ゆ柊鍔犵殑琛屾")
				checkbox.checked = true;
			}
		} else if (checkmode == 2) {
			if (document.getElementById(list[0]) == first) {
				for (var i = 0; i < list.length; ++i) {
					var obj = document.getElementById(list[i]);
					obj.disabled = true;
				}
			} else {
				alert("杩欎竴琛屼笉鑳藉垹闄わ紝蹇呴』鍏堝垹闄ゆ柊鍔犵殑琛屾")
				checkbox.checked = true;
			}
		} else if (checkmode == 3) {
			if (document.getElementById(list[0]) == last
					|| document.getElementById(list[0]) == first) {
				for (var i = 0; i < list.length; ++i) {
					var obj = document.getElementById(list[i]);
					obj.disabled = true;
				}
			} else {
				alert("杩欎竴琛屼笉鑳藉垹闄わ紝蹇呴』鍏堝垹闄ゆ柊鍔犵殑琛屾")
				checkbox.checked = true;
				;
			}
		} else {
			for (var i = 0; i < list.length; ++i) {
				var obj = document.getElementById(list[i]);
				obj.disabled = true;
			}
		}
	}
}

function deleteit(checkboxid, list, trid) {
	for (var i = 0; i < list.length; ++i) {
		var obj = document.getElementById(list[i]);
		obj.disabled = true;
	}
	var objTr = document.getElementById(trid);
	if (objTr != null) {
		objTr.style.display = 'none';
	}
}

function changed(select, value, obj1, obj2) {
	var obj_select = document.getElementById(select);
	var obj_1 = document.getElementById(obj1);
	var obj_2 = document.getElementById(obj2);
	if (obj_select != null && obj1 != null && obj2 != null) {
		if (obj_select.value == value) {
			obj_1.style.display = 'block';
			obj_2.style.display = 'none';
			obj_1.disabled = false;
			obj_2.disabled = true;
		} else {
			obj_1.style.display = 'none';
			obj_2.style.display = 'block';
			obj_1.disabled = true;
			obj_2.disabled = false;
		}
	}
}

function clearData(first, last, checkname, trname, list) {
	for (var i = first; i <= last; ++i) {
		var objCheck = document.getElementById(checkname + i);
		if (objCheck != null && objCheck.type == 'checkbox') {
			objCheck.checked = false;
			objCheck.disabled = true;
		}
		for (var j = 0; j < list.length; ++j) {
			var obj = document.getElementById(list[j] + i);
			if (obj != null) {
				obj.disabled = true;
			}
		}
		var objTr = document.getElementById(trname + i);
		if (objTr != null) {
			objTr.style.display = 'none';
		}
	}
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/g, "");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/g, "");
}

/*******************************************************************************
 * FUNCTION: isDate checks a valid date PARAMETERS: theStr AS String CALLS:
 * isBetween, isInt RETURNS: TRUE if theStr is a valid date otherwise false.
 ******************************************************************************/
function isSssq(theStr) {
	if (theStr == null || theStr.length != 6) {
		return (false);
	} else {
		var y = theStr.substring(0, 4);
		var m = theStr.substring(4, 6);
		if (isInt(m) == false || isInt(y) == false) {
			return (false);
		} else if (!isBetween(m, 1, 12)) {
			return (false);
		}
		return (true);
	}
}

/*******************************************************************************
 * FUNCTION: isBetween PARAMETERS: val AS any value lo AS Lower limit to check
 * hi AS Higher limit to check CALLS: NOTHING RETURNS: TRUE if val is between lo
 * and hi both inclusive, otherwise false.
 ******************************************************************************/
function isBetween(val, lo, hi) {
	if ((val < lo) || (val > hi)) {
		return (false);
	} else {
		return (true);
	}
}

/*******************************************************************************
 * FUNCTION: isDate checks a valid date PARAMETERS: theStr AS String CALLS:
 * isBetween, isInt RETURNS: TRUE if theStr is a valid date otherwise false.
 ******************************************************************************/
function isDateStr(theStr) {
	var the1st = theStr.indexOf('-');
	var the2nd = theStr.lastIndexOf('-');
	if (the1st == the2nd) {
		return (false);
	} else {
		var y = theStr.substring(0, the1st);
		var m = theStr.substring(the1st + 1, the2nd);
		var d = theStr.substring(the2nd + 1, theStr.length);
		var maxDays = 31;
		if (isInt(m) == false || isInt(d) == false || isInt(y) == false) {
			return (false);
		} else if (y.length < 4) {
			return (false);
		} else if (!isBetween(m, 1, 12)) {
			return (false);
		} else if (m == 4 || m == 6 || m == 9 || m == 11)
			maxDays = 30;
		else if (m == 2) {
			if (y % 4 > 0)
				maxDays = 28;
			else if (y % 100 == 0 && y % 400 > 0)
				maxDays = 28;
			else
				maxDays = 29;
		}
		if (isBetween(d, 1, maxDays) == false) {
			return (false);
		} else {
			return (true);
		}
	}
}
/*******************************************************************************
 * FUNCTION: Compare Date! Which is the latest! PARAMETERS: lessDate,moreDate AS
 * String CALLS: isDate,isBetween RETURNS: TRUE if lessDate<moreDate
 ******************************************************************************/
function isComdate(lessDate, moreDate) {
	if (!isDate(lessDate)) {
		return (false);
	}
	if (!isDate(moreDate)) {
		return (false);
	}
	var less1st = lessDate.indexOf('-');
	var less2nd = lessDate.lastIndexOf('-');
	var more1st = moreDate.indexOf('-');
	var more2nd = moreDate.lastIndexOf('-');
	var lessy = lessDate.substring(0, less1st);
	var lessm = lessDate.substring(less1st + 1, less2nd);
	var lessd = lessDate.substring(less2nd + 1, lessDate.length);
	var morey = moreDate.substring(0, more1st);
	var morem = moreDate.substring(more1st + 1, more2nd);
	var mored = moreDate.substring(more2nd + 1, moreDate.length);
	var Date1 = new Date(lessy, lessm, lessd);
	var Date2 = new Date(morey, morem, mored);
	if (Date1 > Date2) {
		return (false);
	}
	return (true);

}

/*******************************************************************************
 * FUNCTION isEmpty checks if the parameter is empty or null PARAMETER str AS
 * String
 ******************************************************************************/
function isEmpty(str) {
	if ((str == null) || (str.length == 0))
		return true;
	else
		return (false);
}

/*******************************************************************************
 * FUNCTION isAllEmpty checks if all the character is empty or null PARAMETER
 * str AS String
 ******************************************************************************/
function isAllEmpty(str) {
	if ((str == null) || (str.length == 0))
		return true;
	else {
		for (var i = 0; i < str.length; i++) {
			if (str.substring(i, i + 1) != " ")
				return false;
		}
		return true
	}
}

/*******************************************************************************
 * FUNCTION: isInt PARAMETER: theStr AS String RETURNS: TRUE if the passed
 * parameter is an integer, otherwise FALSE CALLS: isDigit
 ******************************************************************************/
function isInt(theStr) {
	var flag = true;
	if (isEmpty(theStr)) {
		flag = false;
	} else {
		for (var i = 0; i < theStr.length; i++) {
			if (i == 0) {
				if (!isDigit(theStr.substring(i, i + 1))
						&& '-' != theStr.substring(i, i + 1)) {
					flag = false;
					break;
				}
			} else if (isDigit(theStr.substring(i, i + 1)) == false) {
				flag = false;
				break;
			}
		}
	}
	return (flag);
}

/*******************************************************************************
 * FUNCTION: isReal PARAMETER: heStr AS String decLen AS Integer (how many
 * digits after period) RETURNS: TRUE if theStr is a float, otherwise FALSE
 * CALLS: isInt
 ******************************************************************************/
function isReal(theStr, decLen) {
	var dot1st = theStr.indexOf('.');
	var dot2nd = theStr.lastIndexOf('.');
	var OK = true;
	if (isEmpty(theStr))
		return false;

	if (dot1st == -1) {
		if (!isInt(theStr))
			return (false);
		else
			return (true);
	} else if (dot1st != dot2nd)
		return (false);
	else if (dot1st == 0)
		return (false);
	else {
		var intPart = theStr.substring(0, dot1st);
		var decPart = theStr.substring(dot2nd + 1);

		if (decPart.length > decLen)
			return (false);
		else if (!isInt(intPart) || !isInt(decPart))
			return (false);
		else if (isEmpty(decPart))
			return (false);
		else
			return (true);
	}
}

function isFloat(theStr) {
	var dot1st = theStr.indexOf('.');
	var dot2nd = theStr.lastIndexOf('.');
	var OK = true;
	if (isEmpty(theStr))
		return false;

	if (dot1st == -1) {
		if (!isInt(theStr))
			return (false);
		else
			return (true);
	} else if (dot1st != dot2nd)
		return (false);
	// else if (dot1st == 0) return (false);
	else {
		var intPart = theStr.substring(0, dot1st);
		var decPart = theStr.substring(dot2nd + 1);

		// if (decPart.length > decLen) return(false);
		if (!isInt(intPart) && !isEmpty(intPart) || !isInt(decPart))
			return (false);
		else if (isEmpty(decPart))
			return (false);
		else
			return (true);
	}
}

/*******************************************************************************
 * FUNCTION: isEmail PARAMETER: String (Email Address) RETURNS: TRUE if the
 * String is a valid Email address FALSE if the passed string is not a valid
 * Email Address EMAIL FORMAT: AnyName@EmailServer e.g; webmaster@hotmail.com @ sign
 * can appear only once in the email address.
 ******************************************************************************/
function isEmail(theStr) {
	var atIndex = theStr.indexOf('@');
	var dotIndex = theStr.indexOf('.', atIndex);
	var flag = true;
	theSub = theStr.substring(0, dotIndex + 1)

	if ((atIndex < 1) || (atIndex != theStr.lastIndexOf('@'))
			|| (dotIndex < atIndex + 2) || (theStr.length <= theSub.length)) {
		return (false);
	} else {
		return (true);
	}
}
/*******************************************************************************
 * FUNCTION: newWindow PARAMETERS: doc -> Document to open in the new window
 * hite -> Height of the new window wide -> Width of the new window bars ->
 * 1-Scroll bars = YES 0-Scroll Bars = NO resize -> 1-Resizable = YES
 * 0-Resizable = NO CALLS: NONE RETURNS: New window instance
 ******************************************************************************/
function newWindow(doc, wide, hite, bars, resize) {
	var opt = "toolbar=0,location=0,directories=0,status=0,menubar=0,";
	var l = Math.floor((screen.width - wide) / 2);
	var t = Math.floor((screen.height - hite) / 2);
	opt += ("scrollbars=" + bars + ",");
	opt += ("resizable=" + resize + ",");
	opt += ("width=" + wide + ",");
	opt += ("height=" + hite + ",");
	opt += ("top=" + t + ",");
	opt += ("left=" + l);
	winHandle = window.open(doc, '', opt);
	return;
}

function isDigit(s) {
	var patrn = /^[0-9]{1,20}$/;
	if (!patrn.exec(s))
		return false
	return true
}

function isCorporationCode(s) {
	var patrn = /^(\d){15}$/;
	if (!patrn.exec(s))
		return false
	return true
}

function isRegisterUserName(s) {
	var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9._]){4,19}$/;
	if (!patrn.exec(s))
		return false
	return true
}

function isPasswd(s) {
	var patrn = /^[a-zA-Z0-9]{6,15}$/;
	if (!patrn.exec(s))
		return false
	return true
}

function isAvoirdupois(s) {
	var patrn = /^[1-9]{1}[0-9]{0,2}$/;
	var patrn2 = /^[1-9]{1}$/;
	var intPart = s.indexOf('.');
	var decPart = s.lastIndexOf('.');
	if (intPart == -1 && patrn.exec(s) && eval(s) >= 2 && eval(s) <= 200)
		return true
	if (intPart != decPart || intPart == 0 || intPart + 2 != s.length)
		return false
	if (!patrn.exec(s.substring(0, intPart))
			|| !patrn2.exec(s.substring(decPart + 1)))
		return false
	if (eval(s) < 2 || eval(s) > 200)
		return false
	return true
}

function isTel(s) {
	var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
	if (!patrn.exec(s))
		return false
	return true
}

function isMobile(s) {
	var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
	if (!patrn.exec(s))
		return false
	return true
}

function isAreaCode(s) {
	var patrn = /^(\d){6}$/;
	if (!patrn.exec(s))
		return false
	return true
}

function isPostalCode(s) {
	var patrn = /^[1-9]{1}(\d){5}$/;
	if (!patrn.exec(s))
		return false
	return true
}

function isIP(s) {
	var patrn = /^[0-9.]{1,20}$/;
	if (!patrn.exec(s))
		return false
	return true
}

function isPage(s) {
	var patrn = /^[1-9]{1}[0-9]{0,2}$/;
	if (!patrn.exec(s))
		return false
	return true
}

function vErr(o, s) {
	alert(s);
	if (o)
		o.focus();
	return false;
}

function chkRadio(o) {
	for (i = 0; i < o.length; i++) {
		if (o[i].checked)
			return true;
	}
	return false;
}

function isChinese(s) {
	if (s.trim() == "")
		return true;
	var reg = /[^\u4E00-\u9FA5]/g;
	if (reg.test(s)) {
		return false;
	}
	return true;
}

function isNoChinese(s) {
	if (s.trim() == "")
		return true;
	var reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
	if (reg.test(s)) {
		return false;
	}
	return true;
}

function getconfirm(str, url) {
	if (confirm(str)) {
		location = url;
	}
}

function confirm_check(str, action, is, form) {
	if (is) {
		form.action = action;
		if (confirm(str))
			form.submit()
	}
}

function radio_check(radio_id) {
	var radioobj = eval("document.all." + radio_id);
	var flag = false;
	for (var i = 0; i < radioobj.length; i++) {
		if (radioobj[i].checked) {
			flag = true;
			break;
		}
	}
	if (!flag && radioobj.length > 0) {
		radioobj[0].checked = true;
	}
}

function radio_select(radio_id, input_enable, input_disable) {
	var radio_obj = eval("document.all." + radio_id);
	var input_enable_obj = eval("document.all." + input_enable);
	var input_disable_obj = eval("document.all." + input_disable);
	if (radio_obj != undefined && radio_obj.type == "radio") {
		if (radio_obj.checked == true) {
			if (input_enable_obj != undefined)
				input_enable_obj.disabled = false;
			if (input_disable_obj != undefined)
				input_disable_obj.disabled = true;
		}
	}
}
function check_select(check_id, input_enable, input_disable) {
	var check_obj = eval("document.all." + check_id);
	var input_enable_obj = eval("document.all." + input_enable);
	var input_disable_obj = eval("document.all." + input_disable);
	if (check_obj != undefined && check_obj.type == "checkbox") {
		if (check_obj.checked == false) {
			if (input_enable_obj != undefined) {
				if (input_enable == "txt_fdl_begin") {
					input_enable_obj.value = -10000;
				} else {
					input_enable_obj.value = 0;
				}
				input_enable_obj.disabled = true;
			}
			if (input_disable_obj != undefined) {
				input_disable_obj.value = 0;
				input_disable_obj.disabled = true;
			}
		} else {
			if (input_enable_obj != undefined)
				input_enable_obj.disabled = false;
			if (input_disable_obj != undefined)
				input_disable_obj.disabled = false;
		}
	}
}

function select_all(formName, elementName) {
	var obj = eval("document." + formName + "." + elementName);
	if (obj != null) {
		obj.checked = true;
		// if (obj.length){
		for (var i = 0; i < obj.length; i++)
			obj[i].checked = true;
		// }else{
		// obj.checked=true;
		// }
	}
}

function unselect_all(formName, elementName) {
	var obj = eval("document." + formName + "." + elementName);
	if (obj != null) {
		obj.checked = false;
		// if (obj.length){
		for (var i = 0; i < obj.length; i++)
			obj[i].checked = false;
		// }else{
		// obj.checked.checked=false;
		// }
	}
}

function equal_form(left_list, compare, right_list, nAfterDot) {
	if (compare == "=") {
		if (getListValue(left_list, nAfterDot) == getListValue(right_list,
				nAfterDot)) {
			return true
		} else {
			return false
		}
	} else if (compare == ">") {
		if (getListValue(left_list, nAfterDot) > getListValue(right_list,
				nAfterDot)) {
			return true
		} else {
			return false
		}
	} else if (compare == ">=") {
		if (getListValue(left_list, nAfterDot) >= getListValue(right_list,
				nAfterDot)) {
			return true
		} else {
			return false
		}
	} else if (compare == "<") {
		if (getListValue(left_list, nAfterDot) < getListValue(right_list,
				nAfterDot)) {
			return true
		} else {
			return false
		}
	} else if (compare == "<=") {
		if (getListValue(left_list, nAfterDot) <= getListValue(right_list,
				nAfterDot)) {
			return true
		} else {
			return false
		}
	} else if (compare == "<>") {
		if (getListValue(left_list, nAfterDot) != getListValue(right_list,
				nAfterDot)) {
			return true
		} else {
			return false
		}
	}
	return false
}

function getListValue(list, nAfterDot) {
	var result = 0.00;
	for (var i = 0; i < list.length; i++) {
		if (i == 0) {
			result = parseFloat(list[i]);
		} else if (i % 2 == 0) {
			if (list[i - 1] == "+") {
				result = result + parseFloat(list[i]);
			} else if (list[i - 1] == "-") {
				result = result - parseFloat(list[i]);
			} else if (list[i - 1] == "*") {
				result = result * parseFloat(list[i]);
			} else if (list[i - 1] == "/") {
				result = result / parseFloat(list[i]);
			}
		}
	}
	return parseFloat(FormatNumber(result, nAfterDot));
}

function setObjValue(obj, list, nAfterDot) {
	var obj = document.getElementById(obj);
	if (obj != null) {
		obj.value = getListValue(list, nAfterDot);
	}
}

function strformat(object) {
	// if (isEmpty(object.value)) {
	// alert("杩欎釜杈撳叆妗嗕笉鑳戒负绌哄€�");
	// object.value = " ";
	// }
}

function intformat(object) {
	if (!isInt(object.value)) {
		alert("杩欎釜杈撳叆妗嗗繀椤讳负鏁存暟");
		object.value = "0";
	}
}

function floatformat(object) {
	if (!isFloat(object.value)) {
		alert("杩欎釜杈撳叆妗嗗繀椤讳负鏁板瓧");
		object.value = "0";
	}
}

function dateformat(object) {
	// if (!isDateStr(object.value)) {
	// alert("杩欎釜杈撳叆妗嗗繀椤讳负鏃ユ湡鍨媦yyy-mm-dd");
	// object.value = "1990-01-01";
	// }
}

function FormatNumber(srcStr, nAfterDot) {
	var resultStr, nTen;
	if ("NaN" == srcStr || "" == srcStr)
		return "0"
	try {
		srcStr = "" + srcStr + "";
		strLen = srcStr.length;
		dotPos = srcStr.indexOf(".", 0);
		if (dotPos == -1) {
			resultStr = srcStr + ".";
			for (i = 0; i < nAfterDot; i++) {
				resultStr = resultStr + "0";
			}
		} else {
			if ((strLen - dotPos - 1) >= nAfterDot) {
				nAfter = dotPos + nAfterDot + 1;
				nTen = 1;
				for (j = 0; j < nAfterDot; j++) {
					nTen = nTen * 10;
				}
				resultStr = Math.round(parseFloat(srcStr) * nTen) / nTen;
			} else {
				resultStr = srcStr;
				for (i = 0; i < (nAfterDot - strLen + dotPos + 1); i++) {
					resultStr = resultStr + "0";
				}

			}
		}
	} catch (Exception) {
		return "0";
	}
	return resultStr;
}

function replaceAll(streng, soeg, erstat) {
	var st = streng;
	if (soeg.length == 0)
		return st;
	var idx = st.indexOf(soeg);
	while (idx >= 0) {
		st = st.substring(0, idx) + erstat + st.substr(idx + soeg.length);
		idx = st.indexOf(soeg);
	}
	return st;
}

var ifsigol = new Array('==', '>=', '<=', '>', '<');

function CheckDetailObject(object, type, note) {
	var result = "";
	var obj = document.getElementsByName(object);
	if (obj == null) {
		return "";
	}
	for (var i = 0; i < obj.length; i++) {
		if (type == 'CheckObjAny') {
			if (!obj[i].disabled && isEmpty(obj[i].value)) {
				result = result + '\''
						+ (note == null || '' == note ? object : note)
						+ (obj.length < 2 ? '' : '[第' + (i + 1) + '行]')
						+ '\'不能为空\r\n';
			}
		} else if (type == 'CheckObjDate') {
			if (!obj[i].disabled && !isDateStr(obj[i].value)) {
				result = result + '\''
						+ (note == null || '' == note ? object : note)
						+ (obj.length < 2 ? '' : '[第' + (i + 1) + '行]')
						+ '\'必须为日期型\r\n';
			}
		} else if (type == 'CheckObjInt') {
			if (!obj[i].disabled && !isInt(obj[i].value)) {
				result = result + '\''
						+ (note == null || '' == note ? object : note)
						+ (obj.length < 2 ? '' : '[第' + (i + 1) + '行]')
						+ '\'必须为整数\r\n';
			}
		} else if (type == 'CheckObjFloat') {
			if (!obj[i].disabled && !isFloat(obj[i].value)) {
				result = result + '\''
						+ (note == null || '' == note ? object : note)
						+ (obj.length < 2 ? '' : '[第' + (i + 1) + '行]')
						+ '\'必须为数字\r\n';
			}
		}
	}
	return result;
}

function CheckObject(checkobjectlist) {
	var result = "";
	for (var i = 0; i < checkobjectlist.length; i++) {
		result = result
				+ CheckDetailObject(checkobjectlist[i][0],
						checkobjectlist[i][1], checkobjectlist[i][2]);
	}
	return result;
}

function Checkall(checkobjectlist, Auditing_rules, pageid) {
	var msg;
	msg = '';
	var err_msg = "************************数 据 提 交 审 核 信 息************************\r\n\r\n";
	msg = msg + CheckObject(checkobjectlist);
	// 审核调查内容
	for (var i = 0; i < Auditing_rules.length; i++) {
		var rule = Auditing_rules[i][0];
		rule = getRuleSum(rule);
		var rules = rule.split(":=");
		var count = getCount(rule);
		if (rules.length == 2) {
			if (count > 1) {
				for (var j = 0; j < count; j++) {
					var rulestr1 = getRuleArrayValue(rules[0], pageid);
					rulestr1 = getOtherRuleValue(rulestr1, j, pageid);
					rulestr1 = getRuleValue(rulestr1, j, pageid);
					var rulestr2 = getRuleArrayValue(rules[1], pageid);
					rulestr2 = getOtherRuleValue(rulestr2, j, pageid);
					rulestr2 = getRuleValue(rulestr2, j, pageid);
					if (rulestr1 != null && rulestr2 != null) {
						eval('if(!(FormatNumber('
								+ rulestr1
								+ ','
								+ Auditing_rules[i][2]
								+ ')==FormatNumber('
								+ rulestr2
								+ ','
								+ Auditing_rules[i][2]
								+ '))){msg=msg+\'第\'+(j+1)+\'行不符合：\'+Auditing_rules[i][1]+\'\\r\\n\'}');
					}
				}
			} else {
				var rulestr1 = getRuleArrayValue(rules[0], pageid);
				rulestr1 = getOtherRuleValue(rulestr1, 0, pageid);
				rulestr1 = getRuleValue(rulestr1, 0, pageid);
				var rulestr2 = getRuleArrayValue(rules[1], pageid);
				rulestr2 = getOtherRuleValue(rulestr2, 0, pageid);
				rulestr2 = getRuleValue(rulestr2, 0, pageid);
				if (rulestr1 != null && rulestr2 != null) {
					eval('if(!(FormatNumber('
							+ rulestr1
							+ ','
							+ Auditing_rules[i][2]
							+ ')==FormatNumber('
							+ rulestr2
							+ ','
							+ Auditing_rules[i][2]
							+ '))){msg=msg+\'不符合：\'+Auditing_rules[i][1]+\'\\r\\n\'}');
				}
			}
		} else {
			var ishavedo = false;
			for (var m = 0; m < ifsigol.length; m++) {
				var erules = rule.split(ifsigol[m]);
				if (erules.length == 2 && erules[1].indexOf("?") < 0
						&& erules[1].indexOf("&&") < 0
						&& erules[0].indexOf("&&") < 0
						&& erules[1].indexOf("||") < 0
						&& erules[0].indexOf("||") < 0) {
					if (count > 1) {
						for (var j = 0; j < count; j++) {
							var rulestr1 = getRuleArrayValue(erules[0], pageid);
							rulestr1 = getOtherRuleValue(rulestr1, j, pageid);
							rulestr1 = getRuleValue(rulestr1, j, pageid);
							var rulestr2 = getRuleArrayValue(erules[1], pageid);
							rulestr2 = getOtherRuleValue(rulestr2, j, pageid);
							rulestr2 = getRuleValue(rulestr2, j, pageid);
							if (rulestr1 != null && rulestr2 != null) {
								eval('if(!(FormatNumber('
										+ rulestr1
										+ ','
										+ Auditing_rules[i][2]
										+ ')-0'
										+ ifsigol[m]
										+ 'FormatNumber('
										+ rulestr2
										+ ','
										+ Auditing_rules[i][2]
										+ ')-0)){msg=msg+\'第\'+(j+1)+\'行不符合：\'+Auditing_rules[i][1]+\'\\r\\n\'}');
							}
						}
					} else {
						var rulestr1 = getRuleArrayValue(erules[0], pageid);
						rulestr1 = getOtherRuleValue(rulestr1, 0, pageid);
						rulestr1 = getRuleValue(rulestr1, 0, pageid);
						var rulestr2 = getRuleArrayValue(erules[1], pageid);
						rulestr2 = getOtherRuleValue(rulestr2, 0, pageid);
						rulestr2 = getRuleValue(rulestr2, 0, pageid);
						if (rulestr1 != null && rulestr2 != null) {
							eval('if(!(FormatNumber('
									+ rulestr1
									+ ','
									+ Auditing_rules[i][2]
									+ ')-0'
									+ ifsigol[m]
									+ 'FormatNumber('
									+ rulestr2
									+ ','
									+ Auditing_rules[i][2]
									+ ')-0)){msg=msg+\'不符合：\'+Auditing_rules[i][1]+\'\\r\\n\'}');
						}
					}
					ishavedo = true;
					break;
				}
			}
			if (!ishavedo) {
				if (count > 1) {
					for (var j = 0; j < count; j++) {
						var rulestr1 = getRuleArrayValue(rule, pageid);
						rulestr1 = getOtherRuleValue(rulestr1, j, pageid);
						rulestr1 = getRuleValue(rulestr1, j, pageid);
						if (rulestr1 != null) {
							eval('if(!('
									+ rulestr1
									+ ')){msg=msg+\'第\'+(j+1)+\'行不符合：\'+Auditing_rules[i][1]+\'\\r\\n\'}');
						}
					}
				} else {
					var rulestr1 = getRuleArrayValue(rule, pageid);
					rulestr1 = getOtherRuleValue(rulestr1, 0, pageid);
					rulestr1 = getRuleValue(rulestr1, 0, pageid);
					if (rulestr1 != null) {
						eval('if(!('
								+ rulestr1
								+ ')){msg=msg+\'不符合：\'+Auditing_rules[i][1]+\'\\r\\n\'}');
					}
					// msn=msg+("不符合"+Auditing_rules[i][1]+"\r\n")
				}
			}
		}
		// var rules = rule.split("==");
		// if (rules.length == 2) {
		// if (count > 1) {
		// for (var j = 0; j < count; j++) {
		// eval('var left=' + getRuleValue(rules[0], j));
		// eval('var right=' + getRuleValue(rules[1], j));
		// if (!(left == right)) {
		// msg = msg + ('第' + (j + 1) + '行不符合' + Auditing_rules[i][1] + '\r\n');
		//
		// }
		// }
		// }
		// else {
		// eval('var left=' + getRuleValue(rules[0], 0));
		// eval('var right=' + getRuleValue(rules[1], 0));
		// if (!(left == right)) {
		// msg = msg + ('不符合' + Auditing_rules[i][1] + '\r\n');
		// }
		// }
		// }
		// else if (rule.split("<=").length == 2) {
		//
		// }
		// else if (rule.split(">=").length == 2) {
		//
		// }
		// else if (rule.split("=").length == 2) {
		//
		// }
		// else if (rule.split(">").length == 2) {
		//
		// }
		// else if (rule.split("<").length == 2) {
		//
		// }
	}
	if (msg.length > 1) {
		msg = err_msg + msg;
		alert(msg);
		return false;
	}
	return true;
}

// JavaScript Document

function ifchecked(form, formName, elementName) {
	// 获得选择的check列表对象
	var checkIdObj = eval("document." + formName + "." + elementName);
	// 判断对象是否为空
	if (checkIdObj == null) {
		return;
	}
	// 如果check列表对象多于一个
	if (checkIdObj.length) {
		for (i = 0; i < checkIdObj.length; i++) {
			if (checkIdObj[i].checked) {
				form.submit();
				return;
			}
		}
	} else {
		if (checkIdObj.checked) {
			form.submit();
			return;
		}
	}
}

function select_all(formName, elementName) {
	var obj = eval("document." + formName + "." + elementName);
	if (obj != null) {
		obj.checked = true;
		// if (obj.length){
		for (var i = 0; i < obj.length; i++)
			obj[i].checked = true;
		// }else{
		// obj.checked=true;
		// }
	}
}

function unselect_all(formName, elementName) {
	var obj = eval("document." + formName + "." + elementName);
	if (obj != null) {
		obj.checked = false;
		// if (obj.length){
		for (var i = 0; i < obj.length; i++)
			obj[i].checked = false;
		// }else{
		// obj.checked.checked=false;
		// }
	}
}

function getstrings(check, formName) {
	var strings = "";
	var checkObj = eval("document." + formName + "." + check);
	if (checkObj != null) {
		if (checkObj.checked == true)
			strings = checkObj.value;
		for (var i = 0; i < checkObj.length; i++) {
			if (checkObj[i].checked == true) {
				if (strings == "" || strings == checkObj.value) {
					strings = checkObj[i].value;
				} else {
					strings = strings + "," + checkObj[i].value;
				}
			}
		}
	}
	return strings;
}

function Pzyjks_submit_check(check, formName) {
	var strings = "";
	var m = 0;
	var checkObj = eval("document." + formName + "." + check);
	if (checkObj != null) {
		if (checkObj.checked == true)
			strings = checkObj.value;
		for (var i = 0; i < checkObj.length; i++) {
			if (checkObj[i].checked == true) {
				if (strings == "" || strings == checkObj.value) {
					strings = checkObj[i].value;
				} else {
					strings = strings + "," + checkObj[i].value;
				}
				m = m + 1;
			}
		}
	}
	if (strings != '') {
		if (m > 99) {
			alert("批量提交不能超过99条！");
			strings = '';
		} else {
			return strings;
		}
	}
}

function checkfphm_012(action) {
	if (document.all.bz.value == '23' && document.all.xxsl.value != '0.13') {
		alert('税率不合法！');
		return false;
	} else {
		{
			SaveIntoCookie();
			if (action == '1') {
				// alert('1');
				check_012_blank('nssb_report012_save.do?save=1',
						validateNssb_report012Form(nssb_report012Form),
						'nssb_report012Form');
			} else {
				// alert('2');
				check('nssb_report012_save.do?save=1&report_type=2',
						validateNssb_report012Form(nssb_report012Form),
						nssb_report012Form);
			}
		}
	}
}

function checkreport331() {
	// alert();
	if (parseFloat(document.all.xse_4.value) == 0
			&& parseFloat(document.all.xxse_4.value) == 0
			&& parseFloat(document.all.jxse_4.value) == 0
			&& parseFloat(document.all.xse_5.value) == 0
			&& parseFloat(document.all.xxse_5.value) == 0
			&& parseFloat(document.all.jxse_5.value) == 0
			&& parseFloat(document.all.xse_6.value) == 0
			&& parseFloat(document.all.xxse_6.value) == 0
			&& parseFloat(document.all.jxse_6.value) == 0
			&& parseFloat(document.all.xse_7.value) == 0
			&& parseFloat(document.all.xxse_7.value) == 0
			&& parseFloat(document.all.jxse_7.value) == 0
			&& parseFloat(document.all.xse_8.value) == 0
			&& parseFloat(document.all.xxse_8.value) == 0
			&& parseFloat(document.all.jxse_8.value) == 0
			&& parseFloat(document.all.xse_9.value) == 0
			&& parseFloat(document.all.xxse_9.value) == 0
			&& parseFloat(document.all.jxse_9.value) == 0
			&& parseFloat(document.all.xse_10.value) == 0
			&& parseFloat(document.all.xxse_10.value) == 0
			&& parseFloat(document.all.jxse_10.value) == 0
			&& parseFloat(document.all.xse_11.value) == 0
			&& parseFloat(document.all.xxse_11.value) == 0
			&& parseFloat(document.all.jxse_11.value) == 0) {
		if (confirm('第4-11行全为零，是否正确?')) {
			check('/newtax/nssb_report331_save.do?save=1',
					validateNssb_report331Form(nssb_report331Form),
					nssb_report331Form);
		} else {
			// return false;
		}
	} else { // alert('1');
		check('/newtax/nssb_report331_save.do?save=1',
				validateNssb_report331Form(nssb_report331Form),
				nssb_report331Form);
	}
}

function checkreport365() {
	// alert();
	if (parseFloat(document.all.a1.value) == 0
			&& parseFloat(document.all.a2.value) == 0
			&& parseFloat(document.all.a3.value) == 0
			&& parseFloat(document.all.a4.value) == 0
			&& parseFloat(document.all.a5.value) == 0
			&& parseFloat(document.all.a6.value) == 0
			&& parseFloat(document.all.a7.value) == 0
			&& parseFloat(document.all.a8.value) == 0
			&& parseFloat(document.all.a9.value) == 0
			&& parseFloat(document.all.a10.value) == 0
			&& parseFloat(document.all.a11.value) == 0
			&& parseFloat(document.all.a12.value) == 0
			&& parseFloat(document.all.a13.value) == 0
			&& parseFloat(document.all.a14.value) == 0
			&& parseFloat(document.all.a15.value) == 0
			&& parseFloat(document.all.a16.value) == 0
			&& parseFloat(document.all.a17.value) == 0
			&& parseFloat(document.all.a18.value) == 0
			&& parseFloat(document.all.a19.value) == 0
			&& parseFloat(document.all.a20.value) == 0
			&& parseFloat(document.all.a21.value) == 0
			&& parseFloat(document.all.a22.value) == 0
			&& parseFloat(document.all.a23.value) == 0
			&& parseFloat(document.all.a24.value) == 0
			&& parseFloat(document.all.a25.value) == 0
			&& parseFloat(document.all.a26.value) == 0
			&& parseFloat(document.all.a27.value) == 0
			&& parseFloat(document.all.a28.value) == 0
			&& parseFloat(document.all.a29.value) == 0
			&& parseFloat(document.all.a30.value) == 0
			&& parseFloat(document.all.a31.value) == 0
			&& parseFloat(document.all.a32.value) == 0
			&& parseFloat(document.all.a33.value) == 0
			&& parseFloat(document.all.a34.value) == 0
			&& parseFloat(document.all.a35.value) == 0
			&& parseFloat(document.all.a36.value) == 0
			&& parseFloat(document.all.a37.value) == 0
			&& parseFloat(document.all.a38.value) == 0
			&& parseFloat(document.all.a39.value) == 0
			&& parseFloat(document.all.a40.value) == 0
			&& parseFloat(document.all.a41.value) == 0
			&& parseFloat(document.all.a42.value) == 0
			&& parseFloat(document.all.a43.value) == 0
			&& parseFloat(document.all.a44.value) == 0
			&& parseFloat(document.all.a45.value) == 0
			&& parseFloat(document.all.a46.value) == 0
			&& parseFloat(document.all.a47.value) == 0
			&& parseFloat(document.all.a48.value) == 0
			&& parseFloat(document.all.a49.value) == 0
			&& parseFloat(document.all.a50.value) == 0
			&& parseFloat(document.all.a51.value) == 0
			&& parseFloat(document.all.a52.value) == 0
			&& parseFloat(document.all.a53.value) == 0
			&& parseFloat(document.all.a54.value) == 0
			&& parseFloat(document.all.a55.value) == 0
			&& parseFloat(document.all.a56.value) == 0
			&& parseFloat(document.all.a57.value) == 0
			&& parseFloat(document.all.a58.value) == 0
			&& parseFloat(document.all.a59.value) == 0
			&& parseFloat(document.all.a60.value) == 0
			&& parseFloat(document.all.a61.value) == 0
			&& parseFloat(document.all.a62.value) == 0
			&& parseFloat(document.all.a63.value) == 0
			&& parseFloat(document.all.a64.value) == 0
			&& parseFloat(document.all.a65.value) == 0
			&& parseFloat(document.all.a66.value) == 0
			&& parseFloat(document.all.a67.value) == 0
			&& parseFloat(document.all.a68.value) == 0
			&& parseFloat(document.all.a69.value) == 0
			&& parseFloat(document.all.a70.value) == 0
			&& parseFloat(document.all.a71.value) == 0
			&& parseFloat(document.all.a72.value) == 0
			&& parseFloat(document.all.a73.value) == 0
			&& parseFloat(document.all.a74.value) == 0
			&& parseFloat(document.all.a75.value) == 0
			&& parseFloat(document.all.a76.value) == 0
			&& parseFloat(document.all.a77.value) == 0
			&& parseFloat(document.all.a78.value) == 0
			&& parseFloat(document.all.a79.value) == 0
			&& parseFloat(document.all.a80.value) == 0
			&& parseFloat(document.all.a81.value) == 0
			&& parseFloat(document.all.a82.value) == 0
			&& parseFloat(document.all.a83.value) == 0
			&& parseFloat(document.all.a84.value) == 0
			&& parseFloat(document.all.a85.value) == 0
			&& parseFloat(document.all.a86.value) == 0
			&& parseFloat(document.all.a87.value) == 0
			&& parseFloat(document.all.a88.value) == 0
			&& parseFloat(document.all.a89.value) == 0
			&& parseFloat(document.all.a90.value) == 0
			&& parseFloat(document.all.a91.value) == 0
			&& parseFloat(document.all.a92.value) == 0
			&& parseFloat(document.all.a93.value) == 0
			&& parseFloat(document.all.a94.value) == 0
			&& parseFloat(document.all.a95.value) == 0
			&& parseFloat(document.all.a96.value) == 0
			&& parseFloat(document.all.a97.value) == 0
			&& parseFloat(document.all.a98.value) == 0
			&& parseFloat(document.all.a99.value) == 0
			&& parseFloat(document.all.a100.value) == 0
			&& parseFloat(document.all.a101.value) == 0
			&& parseFloat(document.all.a102.value) == 0
			&& parseFloat(document.all.a103.value) == 0
			&& parseFloat(document.all.a104.value) == 0) {
		if (confirm('第1-104项全为零，是否正确?')) {
			check('/newtax/nssb_report365_save.do?save=1',
					validateNssb_report365Form(nssb_report365Form),
					nssb_report365Form);
		} else {
			// return false;
		}
	} else { // alert('1');
		check('/newtax/nssb_report365_save.do?save=1',
				validateNssb_report365Form(nssb_report365Form),
				nssb_report365Form);
	}
}

function check_012_blank(action, is, form) {
	if (is) {
		// [ 2011.09.23 lshen 使用UTF8编码，否则会乱码
		retrieveURL_UTF8('/newtax/nssb_report012_save.do?save=1&report_type=2',
				'nssb_report012Form')
		// 2011.09.23 lshen 使用UTF8编码，否则会乱码]
		// retrieveURL('/newtax/nssb_report012_save.do?save=1&report_type=2','nssb_report012Form')
		var nextfphm = parseInt(document.all.fphm.value, 10) + 1;
		nextfphm = '' + nextfphm;
		while (nextfphm.length < 10) {
			nextfphm = '0' + nextfphm;
		}
		document.all.fphm.value = '';
		document.all.xssr.value = 0.00;
		document.all.jsyn.value = 0.00;
		document.all.bz.select();
	}
}

function checkfphm_013(action) {
	// if (document.all.fphm.value.substring(0,1)!='0'
	// &&document.all.fphm.value.length>0 ){ alert('发票号码首位应该是零！')}

	// else {
	if (document.all.bz.value == '01') {
		alert('不能录入增值税专用发票！');
		return;
	}
	// if (document.all.fpzl.value=="9999" && document.all.bz.value!="04" &&
	// document.all.bz.value!="07" && document.all.bz.value!="15" &&
	// document.all.bz.value!="18" && document.all.bz.value!="16" &&
	// document.all.bz.value!="20") {
	// alert("无效发票字轨号！请重新输入！");
	// document.getElementById("fpzl").focus();
	// return ;
	// }
	SaveIntoCookie();
	if (action == '1') {
		check_013_blank("/newtax/nssb_report013_save.do?save=1",
				validateNssb_report013Form(nssb_report013Form),
				"nssb_report013Form");
	} else {
		check('/newtax/nssb_report013_save.do?save=1&report_type=2',
				validateNssb_report013Form(nssb_report013Form),
				nssb_report013Form);
	}
	// }
}

/** 打开定制窗口* */
function openwin(t_url, option) {
	if (option == 'report013_save') {
		window
				.open(
						t_url,
						"report013_save",
						"status=no,height=1, width=1, toolbar=no, menubar=no, location=no, resizable=no, top=-500, left=-500")
	}
	if (option == 'report012_save') {
		window
				.open(
						t_url,
						"report012_save",
						"status=no,height=1, width=1, toolbar=no, menubar=no, location=no, resizable=no, top=-500, left=-500")
	}
}

function check_013_blank(action, is, form) {
	// form.action=action;
	if (is) {
		// lshen 20101230 乱码主要问题是name=value(getFormAsString_UTF8) 需用UTF8编码
		retrieveURL_UTF8('/newtax/nssb_report013_save.do?save=1&report_type=2',
				'nssb_report013Form')
		// 管一兵修改于２０１０１２０２ ,改用ＪＱＵＥＲＹ 的ＡＪＡＸ
		// jpost('/newtax/nssb_report013_save.do?save=1&report_type=2','nssb_report013Form');

		if (document.all.fphm.value == '') {
			var nextfphm = '';
		} else {
			var nextfphm = parseInt(document.all.fphm.value, 10) + 1;
			nextfphm = '' + nextfphm;
			while (nextfphm.length < 10) {
				nextfphm = '0' + nextfphm;
			}
		}
		document.all.fphm.value = nextfphm;
		document.all.jzhm.value = nextfphm;
		document.all.je.value = 0.00;
		document.all.xssr.value = 0.00;
		document.all.jsyn.value = 0.00;
		document.all.bz.select();
	}
}
function check_410_blank(action, is, form) {
	// form.action=action;
	if (is) {
		retrieveURL('/newtax/nssb_report410_save.do?save=1',
				'nssb_report410Form')
		if (document.all.fphm.value == '') {
			var nextfphm = '';
		} else {
			var nextfphm = parseInt(document.all.fphm.value, 10) + 1;
			nextfphm = '' + nextfphm;
			while (nextfphm.length < 10) {
				nextfphm = '0' + nextfphm;
			}
		}
		document.all.fphm.value = nextfphm;
		document.all.dj.value = 0.00;
		document.all.xssl.value = 0.00;
		document.all.xse.value = 0.00;
		document.all.cpmc.select();
	}
}

function check_397_blank(action, is, form) {
	if (is) {
		retrieveURL('/newtax/nssb_report397_save.do?save=1',
				'nssb_report397Form')
		document.all.chxm.value = '';
		document.all.cked.value = 0.00;
		document.all.chxm.select();
	}
}

function check(action, is, form) {
	form.action = action;
	if (is) {
		document.activeElement.style.display = "none"
		form.submit()
	}
}

function check_105(action, is, form) {
	$("#tj_a").hide();
	$("#tj_b").show();
	form.action = action;
	if (is) {
		document.activeElement.style.display = "none"
		form.submit()
	} else {
		$("#tj_b").hide();
		$("#tj_a").show();
	}
}

function nssb_Submit(sssq_key, sssq_value) {
	if (confirm("请在申报前检查数据是否正确，比如累计数，应交税金，确认吗?")) {
		var result = false;
		var m = document.all.sbbzid.value;
		for (var i = 0; i < m; i++) {
			obj_sbbz = eval("document.all.sbbz" + i);
			if (obj_sbbz.checked == true) {
				result = true
			}
		}
		if (result == false) {
			alert("请选择申报税种！有疑问请查看左面“常见问题解答”第16问！");
		} else {
			check('/newtax/nssb_Submit.do?force_sb=0&' + sssq_key + '='
					+ sssq_value, true, NssbMainForm);
		}
	}
}

// 检查断判税率
function get_sdssl() {
	if (document.all.gdsl.value == "false") {
		if (parseFloat(document.all.jsyj.value) < 0) {
			document.all.xxsl.value = "0.00";
		}
		if (parseFloat(document.all.jsyj.value) >= 0
				&& parseFloat(document.all.jsyj.value) <= 30000) {
			document.all.xxsl.value = "0.18";
		}
		if (parseFloat(document.all.jsyj.value) > 30000
				&& parseFloat(document.all.jsyj.value) <= 100000) {
			document.all.xxsl.value = "0.27";
		}
		if (parseFloat(document.all.jsyj.value) > 100000) {
			document.all.xxsl.value = "0.33";
		}
	}
}

// 检查判断企业所得税年度税率
function get_ndsdssl() {
	if (document.all.gdsl.value == "false") {
		sdsjzrq = document.all.jzrq.value;
		sdsmonth = sdsjzrq.substr(5, 2);
		sdsmonthFloat = parseFloat(sdsmonth);
		var sdsvalue = parseFloat(document.all.jsyj.value) * 12 / sdsmonthFloat;
		if (sdsvalue < 0) {
			document.all.xxsl.value = "0.00";
		}
		if (sdsvalue >= 0 && sdsvalue <= 30000) {
			document.all.xxsl.value = "0.18";
		}
		if (sdsvalue > 30000 && sdsvalue <= 100000) {
			document.all.xxsl.value = "0.27";
		}
		if (sdsvalue > 100000) {
			document.all.xxsl.value = "0.33";
		}
	}
}

function get_sdssl_bf() {
	if (document.all.gdsl.value == "false") {
		if (document.all.jzsq_m.value == "03") {
			if (parseFloat(document.all.jsyj.value) * 4 < 0) {
				document.all.xxsl.value = "0.00";
			}
			if (parseFloat(document.all.jsyj.value) * 4 >= 0
					&& parseFloat(document.all.jsyj.value) * 4 <= 30000) {
				document.all.xxsl.value = "0.18";
			}
			if (parseFloat(document.all.jsyj.value) * 4 > 30000
					&& parseFloat(document.all.jsyj.value) * 4 <= 100000) {
				document.all.xxsl.value = "0.27";
			}
			if (parseFloat(document.all.jsyj.value) * 4 > 100000) {
				document.all.xxsl.value = "0.33";
			}
		}
		if (document.all.jzsq_m.value == "06") {
			if (parseFloat(document.all.jsyj.value) * 2 < 0) {
				document.all.xxsl.value = "0.00";
			}
			if (parseFloat(document.all.jsyj.value) * 2 >= 0
					&& parseFloat(document.all.jsyj.value) * 2 <= 30000) {
				document.all.xxsl.value = "0.18";
			}
			if (parseFloat(document.all.jsyj.value) * 2 > 30000
					&& parseFloat(document.all.jsyj.value) * 2 <= 100000) {
				document.all.xxsl.value = "0.27";
			}
			if (parseFloat(document.all.jsyj.value) * 2 > 100000) {
				document.all.xxsl.value = "0.33";
			}
		}
		if (document.all.jzsq_m.value == "09") {
			if (parseFloat(document.all.jsyj.value) / 3 * 4 < 0) {
				document.all.xxsl.value = "0.00";
			}
			if (parseFloat(document.all.jsyj.value) / 3 * 4 >= 0
					&& parseFloat(document.all.jsyj.value) / 3 * 4 <= 30000) {
				document.all.xxsl.value = "0.18";
			}
			if (parseFloat(document.all.jsyj.value) / 3 * 4 > 30000
					&& parseFloat(document.all.jsyj.value) / 3 * 4 <= 100000) {
				document.all.xxsl.value = "0.27";
			}
			if (parseFloat(document.all.jsyj.value) / 3 * 4 > 100000) {
				document.all.xxsl.value = "0.33";
			}
		}
		if (document.all.jzsq_m.value == "12") {
			if (parseFloat(document.all.jsyj.value) < 0) {
				document.all.xxsl.value = "0.00";
			}
			if (parseFloat(document.all.jsyj.value) >= 0
					&& parseFloat(document.all.jsyj.value) <= 30000) {
				document.all.xxsl.value = "0.18";
			}
			if (parseFloat(document.all.jsyj.value) > 30000
					&& parseFloat(document.all.jsyj.value) <= 100000) {
				document.all.xxsl.value = "0.27";
			}
			if (parseFloat(document.all.jsyj.value) > 100000) {
				document.all.xxsl.value = "0.33";
			}
		}
		if (document.all.jzsq_m.value == "13") {
			if (parseFloat(document.all.jsyj.value) < 0) {
				document.all.xxsl.value = "0.00";
			}
			if (parseFloat(document.all.jsyj.value) >= 0
					&& parseFloat(document.all.jsyj.value) <= 30000) {
				document.all.xxsl.value = "0.18";
			}
			if (parseFloat(document.all.jsyj.value) > 30000
					&& parseFloat(document.all.jsyj.value) <= 100000) {
				document.all.xxsl.value = "0.27";
			}
			if (parseFloat(document.all.jsyj.value) > 100000) {
				document.all.xxsl.value = "0.33";
			}
		}
	}
}

// 根据开始号码，份数，得到截止号码
function getjzhm(kshm, jzhm, fs) {
	obj_qshm = eval("document.all." + kshm);
	obj_fs = eval("document.all." + fs);
	obj_jzhm = eval("document.all." + jzhm);
	if (obj_fs.value != "0" && obj_fs.value != "" && obj_qshm.value != "") {
		var qshm_length = obj_qshm.value.length;
		var qshm_value = obj_qshm.value;
		while ((qshm_value.substring(0, 1) == 0) && (qshm_value.length > 1)
				&& (qshm_value.substring(1, 2) != '.')) {
			qshm_value = qshm_value.substring(1, qshm_value.length)
		}
		;
		var jzhm_value = parseInt(qshm_value) + parseInt(obj_fs.value) - 1;
		var reslut = "" + jzhm_value;
		// alert(reslut.length) ;
		// alert(qshm_length) ;
		while (reslut.length < qshm_length) {
			// alert(reslut.length) ;
			// alert(qshm_length) ;
			reslut = '0' + reslut;
		}
		obj_jzhm.value = reslut;
	}

}
//
// function printckzyts(sqdhm, bbbm) {
// if (bbbm == "01") {
// printDparam(sqdhm, sqdhm, "wssp_ckzyts_jsfb", "ckzytssqqybm",
// "ckzytsjsfb_sqdhm");
// }
// if (bbbm == "02") {
// print(sqdhm, "ckzyts_sq", "ckzytssqqybm");
// }
// if (bbbm == "03") {
// print(sqdhm, "Wssp_ckzyts_sqll", "sqdhmsqII");
// }
// if (bbbm == "04") {
// print(sqdhm, "tdssqs", "sqdhmtds");
// }
// }

// function print(sqdhm, reportName, reprotParam) {
// var url;
// if (sqdhm != "") {
// url =
// "http://www.jssz-n-tax.gov.cn/jinfonet/runReport.jsp?jrs.cmd=jrs.web_vw&jrs.catalog=/tax/tax.cat&jrs.report="
// + reportName + ".cls&jrs.result_type=2&jrs.param$" + reprotParam + "=" +
// sqdhm +
// "&jrs.applet_type=0&jrs.isjrsapltpg=false&jrs.is_multi_f&jrs.authorization=YWRtaW46YWRtaW4%3D";
//
// window.open(url, 'newwindow', 'height=600, width=800, top=0, left=0,
// toolbar=no, menubar=no, scrollbars=no,center=yes,resizable=yes,location=no,
// status=no');
// }
// }
//
// function printDparam(sqdhm, zzzh, reportName, reprotParam, reprotParam1) {
// var url;
// url =
// "http://www.jssz-n-tax.gov.cn/jinfonet/runReport.jsp?jrs.cmd=jrs.web_vw&jrs.catalog=/tax/tax.cat&jrs.report="
// + reportName + ".cls&jrs.result_type=2&jrs.param$" + reprotParam + "=" +
// sqdhm + "&jrs.param$" + reprotParam1 + "=" + zzzh +
// "&jrs.applet_type=0&jrs.isjrsapltpg=false&jrs.is_multi_f&jrs.authorization=YWRtaW46YWRtaW4%3D";
//
// window.open(url, 'newwindow', 'height=600, width=800, top=0, left=0,
// toolbar=no, menubar=no, scrollbars=no,center=yes,resizable=yes,location=no,
// status=no');
// }
//
//
// function printDparam3(reportName, reprotParam, reprotParam1, reprotParam2,
// reportValue, reportValue1, reportValue2) {
// var url;
// url =
// "http://www.jssz-n-tax.gov.cn/jinfonet/runReport.jsp?jrs.cmd=jrs.web_vw&jrs.catalog=/tax/tax.cat&jrs.report="
// + reportName + ".cls&jrs.result_type=2&jrs.param$" + reprotParam + "=" +
// reportValue + "&jrs.param$" + reprotParam1 + "=" + reportValue1 +
// "&jrs.param$" + reprotParam2 + "=" + reportValue2 +
// "&jrs.applet_type=0&jrs.isjrsapltpg=false&jrs.is_multi_f&jrs.authorization=YWRtaW46YWRtaW4%3D";
//
// window.showModalDialog(url, "",
// "dialogWidth:800px;dialogHeight:600px;dialogTop:20px;dialogLeft:50px;edge:Raised;center:yes;resizable:yes;status:no;help:no;");
// }
//
// function printDparam5(reportName, reprotParam, reprotParam1, reprotParam2,
// reprotParam3, reprotParam4, reportValue, reportValue1, reportValue2,
// reportValue3, reportValue4) {
// var url;
// url =
// "http://www.jssz-n-tax.gov.cn/jinfonet/runReport.jsp?jrs.cmd=jrs.web_vw&jrs.catalog=/tax/tax.cat&jrs.report="
// + reportName + ".cls&jrs.result_type=2&jrs.param$" + reprotParam + "=" +
// reportValue + "&jrs.param$" + reprotParam1 + "=" + reportValue1 +
// "&jrs.param$" + reprotParam2 + "=" + reportValue2 + "&jrs.param$" +
// reprotParam3 + "=" + reportValue3 + "&jrs.param$" + reprotParam4 + "=" +
// reportValue4 +
// "&jrs.applet_type=0&jrs.isjrsapltpg=false&jrs.is_multi_f&jrs.authorization=YWRtaW46YWRtaW4%3D";
//
// window.showModalDialog(url, "",
// "dialogWidth:800px;dialogHeight:600px;dialogTop:20px;dialogLeft:50px;edge:Raised;center:yes;resizable:yes;status:no;help:no;");
// }

function printnssb(url) {
	window
			.open(
					url,
					'newwindow',
					'height=600, width=800, top=0, left=0, toolbar=no, menubar=no, scrollbars=no,center=yes,resizable=yes,location=no, status=no');
}

function printwssp(sqdhm, sqdbm) {
	url = "/newtax/wssp_report_print.do?sqdbm=" + sqdbm + "&sqdhm=" + sqdhm;
	window
			.open(
					url,
					'newwindow',
					'height=600, width=800, top=0, left=0, toolbar=no, menubar=no, scrollbars=no,center=yes,resizable=yes,location=no, status=no');
}

function downpdf(pdffile) {
	var url;
	url = "http://www.jssz-n-tax.gov.cn/xls/" + pdffile + ".pdf";
	window
			.open(
					url,
					"print",
					"Width:800px;Height:600px;Top:20px;Left:50px;edge:Raised;center:yes;resizable:yes;status:no;help:no;");
}

function handleEnter(field, event) {
	var keyCode = event.keyCode ? event.keyCode : event.which ? event.which
			: event.charCode;
	if (keyCode == 13) {
		var i;
		var m;
		for (i = 0; i < field.form.elements.length; i++)
			if (field == field.form.elements[i])
				break;
		for (m = i + 1; m < field.form.elements.length; m++) {
			if (!field.form.elements[m].disabled) {
				break;
			}
		}
		// if (field.form.elements[i+1].disabled) {
		// i=i+1;}}
		m = m % field.form.elements.length;
		field.form.elements[m].focus();
		return false;
	} else
		return true;
}

function changepassword() {
	vReturnValue = window.showModalDialog("../changepassword.htm",
			"dialogWidth=100px;dialogHeight=20px;", "resizable=yes",
			"dialogWidth=80px;dialogHeight=40px;");
}

function onkeydowns() {
	try {
		if (event.keyCode == 13) {

			if (document.activeElement.type == "password"
					|| document.activeElement.type == "text"
					|| document.activeElement.type == "select-one"
					|| document.activeElement.type == "checkbox"
					|| document.activeElement.type == "radio") {
				event.keyCode = 9;
				// changeElementColor();
			}

		}
	} catch (Exception) {
	}
}

function onkeydowns_nssb() {
	try {
		if (event.keyCode == 13) {

			if (document.activeElement.type == "text"
					|| document.activeElement.type == "select-one"
					|| document.activeElement.type == "checkbox"
					|| document.activeElement.type == "radio"
					|| document.activeElement.type == "button") {
				event.keyCode = 9;
				// changeElementColor();
			}

		}
	} catch (Exception) {
	}
}

function MM_findObj(n, d) { // v4.01
	var p, i, x;
	if (!d)
		d = document;
	if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
		d = parent.frames[n.substring(p + 1)].document;
		n = n.substring(0, p);
	}
	if (!(x = d[n]) && d.all)
		x = d.all[n];
	for (i = 0; !x && i < d.forms.length; i++)
		x = d.forms[i][n];
	for (i = 0; !x && d.layers && i < d.layers.length; i++)
		x = MM_findObj(n, d.layers[i].document);
	if (!x && d.getElementById)
		x = d.getElementById(n);
	return x;
}

function MM_showHideLayers() { // v3.0
	var i, p, v, obj, args = MM_showHideLayers.arguments;
	for (i = 0; i < (args.length - 2); i += 3)
		if ((obj = MM_findObj(args[i])) != null) {
			v = args[i + 2];
			if (obj.style) {
				obj = obj.style;
				v = (v == 'show') ? 'visible' : (v = 'hide') ? 'hidden' : v;
			}
			obj.visibility = v;
		}
}

function mousein(td) {
	if (td.id == "td1")
		td.bgColor = "#FF7818";
	else if (td.id == "td2")
		td.bgColor = "#A8A8A8"
	if (td.id == "td3")
		td.bgColor = "#000000"
		// td2.bgColor="black";
}

function mouseout(td) {
	if (td.id == "td1")
		td.bgColor = "#0077777";
	else if (td.id == "td2")
		td.bgColor = ""
	if (td.id == "td3")
		td.bgColor = "#2798A0"
		// td2.bgColor="white";
}

function getconfirm(str, url) {
	if (confirm(str)) {
		location = url;
	}
}

function getconfirmAjax(str, url) {
	if (confirm(str)) {
		GoAjax(url);
	}
}
function wssp_showreceipt(gznr, pzjg, sprq) {
	var url;
	url = "/newtax/WEB-INF/jsp/old/wssp/receiptinfo.jsp?gznr=" + gznr
			+ "&pzjg=" + pzjg + "&sprq=" + sprq;
	window
			.showModalDialog(
					url,
					"",
					"dialogWidth:600px;dialogHeight:400px;center:yes;edge:Raised;center:yes;resizable:no;status:no;help:no;");
}

function checkpass(passid) {
	var str_password = eval("document.all." + passid + ".value");
	if ((str_password == '111111') || (str_password == '1')) {
		alert('您的密码仍为初始密码，为了保证您的信息安全，强烈建议您登录后修改密码！');
	}
}

/** 浏览器版本信息* */
function CheckBrowser() {
	var m_idx = navigator.appVersion.indexOf("MSIE 6");
	// alert(navigator.appVersion);
	// alert(navigator.appName);
	// alert(navigator.appVersion.substring(parseInt(m_idx+5),parseInt(m_idx+8)));
	var browser_info;
	if (m_idx == -1) {
		browser_info = "你现在使用的浏览器为" + navigator.appName;
		browser_info = browser_info
				+ "\r\n 请使用Microsoft Internet Explorer 6.0进行操作!";
		alert(browser_info);
		return false;
	} else {
		var m_idx2 = navigator.appVersion.indexOf("MSIE 6");
		if (m_idx2 == -1) {
			browser_info = "你现在使用的浏览器为"
					+ navigator.appName
					+ "  ，版本为"
					+ navigator.appVersion.substring(parseInt(m_idx + 5),
							parseInt(m_idx + 8));
			browser_info = browser_info
					+ "\r\n 强烈建议您使用6.0版本进行操作!\r\n 您可从网上下载升级文件或到主管税务机关领取升级光盘。";
			browser_info = browser_info + "\r\n 未升级前您可继续操作，但某些功能可能无法正常运行。";
			alert(browser_info);
		}
	}
	return true;
}

// 所属时期检测
function CheckSSSQ(year, month) {
	var str_year = eval("document.all." + year + ".value");
	var str_month = eval("document.all." + month + ".value");
	if ((parseInt(str_year) * 100 + parseInt(str_month)) < 200410) {
		alert_info = "由于数据量原因,暂时不可查看2004年10月以前所属时期的数据,请见谅!";
		alert(alert_info);
		return false;
	} else {
		return true;
	}
}

function setTableReadOnly_text(tableName, flag) {
	if (flag == 1) {
		var table1 = document.getElementById(tableName);
		if (table1 == null) {
			return;
		}
		// table1.style.background = "#E3EADA";
		var inputs = table1.all.tags("INPUT"); // 针对text,checkbox,radio
		var i;
		for (i = 0; i < inputs.length; i++) {
			if (inputs[i].type == "text") {
				inputs[i].value = 0;
				inputs[i].disabled = true;
				inputs[i].style.background = "#E3EADA";
			}
		}
	}

	if (flag == -1) {
		var table1 = document.getElementById(tableName);
		if (table1 == null) {
			return;
		}
		// table1.style.background = "#E3EADA";
		var inputs = table1.all.tags("INPUT"); // 针对text,checkbox,radio
		var i;
		for (i = 0; i < inputs.length; i++) {
			if (inputs[i].type == "text") {
				inputs[i].disabled = false;
				inputs[i].value = 0;
				inputs[i].style.background = "white";
			}
		}
	}
}

function roundOff(number, decimalNumber) {
	number = number + 0.5 / (Math.pow(10, decimalNumber));
	return Math.floor(number * Math.pow(10, decimalNumber))
			/ (Math.pow(10, decimalNumber));
}

function min(number1, number2) {
	if (number1 > number2) {
		return number2;
	} else {
		return number1;
	}
}

// 身份证验证
function checkIdcard(idcard) {
	var Errors = new Array("身份证验证通过!", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!",
			"身份证号码校验错误!", "身份证地区非法!");
	var area = {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙古",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙江",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	}

	var idcard, Y, JYM;
	var S, M;
	var idcard_array = new Array();
	idcard_array = idcard.split("");
	// 地区检验
	if (area[parseInt(idcard.substr(0, 2))] == null)
		return Errors[4];
	// 身份号码位数及格式检验
	switch (idcard.length) {
	case 15:
		if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0
				|| ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard
						.substr(6, 2)) + 1900) % 4 == 0)) {
			ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
		} else {
			ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
		}
		if (ereg.test(idcard))
			return Errors[0];
		else
			return Errors[2];
		break;
	case 18:
		// 18位身份号码检测
		// 出生日期的合法性检查
		// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
		// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
		if (parseInt(idcard.substr(6, 4)) % 4 == 0
				|| (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard
						.substr(6, 4)) % 4 == 0)) {
			ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
		} else {
			ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
		}
		if (ereg.test(idcard)) {// 测试出生日期的合法性
		// 计算校验位
			S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
					+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
					* 9
					+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
					* 10
					+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
					* 5
					+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
					* 8
					+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
					* 4
					+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
					* 2 + parseInt(idcard_array[7]) * 1
					+ parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9])
					* 3;
			Y = S % 11;
			M = "F";
			JYM = "10X98765432";
			M = JYM.substr(Y, 1);// 判断校验位
			if (M == idcard_array[17])
				return Errors[0]; // 检测ID的校验位
			else
				return Errors[3];
		} else
			return Errors[2];
		break;
	default:
		return Errors[1];
		break;
	}

}

// email
function jcv_checkEmail(emailStr) {
	if (emailStr.length == 0) {
		return true;
	}
	// TLD checking turned off by default
	var checkTLD = 0;
	var knownDomsPat = /^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
	var emailPat = /^(.+)@(.+)$/;
	var specialChars = "\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
	var validChars = "\[^\\s" + specialChars + "\]";
	var quotedUser = "(\"[^\"]*\")";
	var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
	var atom = validChars + '+';
	var word = "(" + atom + "|" + quotedUser + ")";
	var userPat = new RegExp("^" + word + "(\\." + word + ")*$");
	var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$");
	var matchArray = emailStr.match(emailPat);
	if (matchArray == null) {
		return false;
	}
	var user = matchArray[1];
	var domain = matchArray[2];
	for (i = 0; i < user.length; i++) {
		if (user.charCodeAt(i) > 127) {
			return false;
		}
	}
	for (i = 0; i < domain.length; i++) {
		if (domain.charCodeAt(i) > 127) {
			return false;
		}
	}
	if (user.match(userPat) == null) {
		return false;
	}
	var IPArray = domain.match(ipDomainPat);
	if (IPArray != null) {
		for (var i = 1; i <= 4; i++) {
			if (IPArray[i] > 255) {
				return false;
			}
		}
		return true;
	}
	var atomPat = new RegExp("^" + atom + "$");
	var domArr = domain.split(".");
	var len = domArr.length;
	for (i = 0; i < len; i++) {
		if (domArr[i].search(atomPat) == -1) {
			return false;
		}
	}
	if (checkTLD && domArr[domArr.length - 1].length != 2
			&& domArr[domArr.length - 1].search(knownDomsPat) == -1) {
		return false;
	}
	if (len < 2) {
		return false;
	}
	return true;
}

function equal_if0() {
}
function Calculate_lj() {

}

function init_nssb_report105() {
	hideDiv();
	divMaintable1.style.display = "block";
	document.all.fb1_h1_group1_xse.focus();
}
function setOperation(op, form) {
	// if (document.all.CurOperation.value=="3" &&op!=3){
	// FloatValidations=FloatValidations3.valueOf( );
	// equal=equal3.valueOf( );
	// equal_if=equal_if3.valueOf( );
	// if (!validateNssb_report010Form_maintable3(form)){ return };
	// }
	hideDiv();
	if (parseInt(op) == 0) {
		showDiv();
	} else {
		if (op == 5) {
			eval("document.all.divMaintable.style.display='block'");
		} else {
			eval("document.all.divMaintable" + parseInt(op)
					+ ".style.display='block'");
		}
		if (parseInt(op) == 2) {
			// todo
			// document.all.dk_1_fs.focus();
		}
		if (parseInt(op) == 1) {
			document.all.fb1_h1_group1_xse.focus();
		}
		if (parseInt(op) == 3) {
			// todo
			// document.all.zb_a1_1.focus();
		}
		if (parseInt(op) == 4) {
			// todo
			// document.all.zb_a1_1.focus();
		}
	}
	setCurOperation(op);
}

function hideDiv() {
	for (var i = 1; i < 7; i++)
		eval("document.all.divMaintable" + i + ".style.display='none'");
	eval("document.all.divMaintable.style.display='none'");
}
function showDiv() {
	for (var i = 1; i < 7; i++)
		eval("document.all.divMaintable" + i + ".style.display='block'");
	eval("document.all.divMaintable.style.display='block'");
}

function setCurOperation(op) {
	document.all.CurOperation.value = op;
}

function valifloatformat(t) {
};

function Calculate_Report(ame, rm) {
};