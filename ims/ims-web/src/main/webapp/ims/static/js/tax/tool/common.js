/*******************************************************************************
 * 网上（申报）办税 公共JS
 *
 * @author yangxi
 * @version 1.0
 * @since
 ******************************************************************************/
function trim(mystring) {
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

function ajaxUpdate(responseText, updateSpanID) {
	returnElements = responseText.split("</span>");
	var tempString = "";
	for (var i = returnElements.length - 1; i >= 0; --i) {
		spanPos = returnElements[i].indexOf("<span");
		if (spanPos > 0) {
			tempString = returnElements[i].substring(spanPos);
			var n = parseInt(updateSpanID.length) + 10;
			if (tempString.substring(10, n) == updateSpanID) {
				n = n + 2;
				$(updateSpanID).update(tempString.substring(n,
						tempString.length));
			}
		}
	}
}

/**
 * 此方法已经不用
 *
 * @param {}
 *            responseText
 * @param {}
 *            spanBZ
 */
function ajaxUpdateMore(responseText, spanBZ) {
	var newTextElements = responseText.split("</span>");
	for (var i = newTextElements.length - 1; i >= 0; --i) {
		if (newTextElements[i].indexOf("<span") > -1) {
			startNamePos = newTextElements[i].indexOf('"') + 1;
			endNamePos = newTextElements[i].indexOf('"', startNamePos);
			name = newTextElements[i].substring(startNamePos, endNamePos);
			startContentPos = newTextElements[i].indexOf('>') + 1;
			var content = newTextElements[i].substring(startContentPos);
			var obj = document.getElementById(name);
			if (obj) {
				if (obj.getAttribute("bz") == null) {
					continue;
				}
				if (obj.getAttribute("bz") == spanBZ) {
					document.getElementById(name).innerHTML = content;
					continue;
				}
			}
		}
	}
}

/**
 * 刷新多个区域
 *
 * @param {}
 *            responseText
 * @param {}
 *            spanBZ 示例 <SPAN id="a" bz="s"> xxxxx </SPAN>
 *
 *
 * 嵌套 <SPAN id="b" bz="s"> <SPAN id="c" bz="s2">xxxxx</SPAN> </SPAN>
 */
function ajaxUpdateMoreTag(responseText, spanBZ) {
	var tag = "SPAN";
	var newTextElements = responseText.split("</" + tag + ">");

	for (var i = newTextElements.length - 1; i >= 0; --i) {
		if (newTextElements[i].indexOf("<" + tag + "") > -1) {

			if (newTextElements[i].indexOf('bz="' + spanBZ + '"') == -1) {
				continue;
			}
			name = newTextElements[i].substring(newTextElements[i]
							.indexOf('bz="' + spanBZ + '"')
							- 3, newTextElements[i].indexOf('bz="' + spanBZ
							+ '"')
							- 2);
			var startContentPos = newTextElements[i].indexOf('bz="' + spanBZ
					+ '"')
					+ 4 + len(spanBZ) + 2;
			var content = newTextElements[i].substring(startContentPos);
			var obj = document.getElementById(name);
			if (obj) {
				if (obj.getAttribute("bz") == null) {
					continue;
				}
				if (obj.getAttribute("bz") == spanBZ) {
					document.getElementById(name).innerHTML = content;
					continue;
				}
			}
		}
	}
}

function len(s) {
	var l = 0;
	var a = s.split("");
	for (var i = 0; i < a.length; i++) {
		if (a[i].charCodeAt(0) < 299) {
			l++;
		} else {
			l += 2;
		}
	}
	return l;
}

var mouseOverRow;
function setRowClass(tabid, headRow) {
	var tab = $(tabid);
	var i = 1;
	if (headRow != null) {
		i = headRow;
	}
	for (; i < tab.rows.length; i++) {
		if (i % 2 == 0) {
			tab.rows[i].className = "tr-os";
		} else {
			tab.rows[i].className = "tr-js";
		}
		tab.rows[i].onmouseover = function() {
			mouseOverRow = this.className;
			this.className = "mouseover"
		};
		tab.rows[i].onmouseout = function() {
			this.className = mouseOverRow
		};
	}
}

this.openWin = function(panlId, url, title, width, height, maximizable,
		isDraggable, isModal) {
	var window = this.createWin(panlId, title, url, width, height, maximizable,
			isDraggable, isModal);
	window.show();
}

this.createWin = function(winId, winTitle, url, width, height, maximizable,
		isDraggable, isModal) {
	// 供各类型窗口创建时调用
	var win = Ext.getCmp(winId);
	if (!win) {
		win = new Ext.Window({
			id : winId,
			title : winTitle,
			width : width,
			height : height,
			shadow : true,
			maximizable : maximizable,// 是否可以最大化
			minimizable : false,// 是否可以最小化
			draggable : isDraggable, // 是否可以拖放
			modal : isModal,// 背景是否可操作(true:可以；false：不可以)
			minimize : function() {
				this.hide()
			},
			html : "<iframe scrolling=\"auto\" frameborder=\"0\" width=\"100%\" height=\"100%\" src=\""
					+ url + "\"></iframe>"
		});
	}
	return win;
};

function emptyToZ(obj) {
	if (typeof(obj) == "object") {
		if (trim(obj.value).empty()) {
			return "0.00";
		} else if (trim(obj.value) == "null") {
			return "0.00";
		} else {
			return obj.value;
		}
	} else {
		if (trim(obj).empty()) {
			return "0.00";
		} else if (trim(obj) == "null") {
			return "0.00";
		} else {
			return obj;
		}
	}
}

function szToHz(t, t2) {
	if (trim(t.value).empty())
		return;
	var ms = t.value.replace(/[^\\d\\.]/g, "").replace(/(\\.\\d{2}).+$/, "$1")
			.replace(/^0+([1-9])/, "$1").replace(/^0+$/, "0");
	var ms = t.value;
	var txt = ms.split(".");
	while (/\\d{4}(,|$)/.test(txt[0]))
		txt[0] = txt[0].replace(/(\\d)(\\d{3}(,|$))/, "$1,$2");
	t.value = txt[0] + (txt.length > 1 ? "." + txt[1] : "");
	t2.value = zdx(ms - 0);
}

function zdx(strg) {
	var number = Math.round(strg * 100) / 100;
	number = number.toString(10).split(".");
	var a = number[0];
	if (a.length > 12)
		return "数值超出范围！支持的最大数值为 999999999999.99";
	var e = "零壹贰叁肆伍陆柒捌玖";
	var num1 = "";
	var len = a.length - 1;
	for (var i = 0; i <= len; i++)
		num1 += e.charAt(parseInt(a.charAt(i)))
				+ [["圆", "万", "亿"][Math.floor((len - i) / 4)], "拾", "佰", "仟"][(len - i)
						% 4];
	if (number.length == 2 && number[1] != "") {
		var a = number[1];
		for (var i = 0; i < a.length; i++)
			num1 += e.charAt(parseInt(a.charAt(i))) + ["角", "分"][i];
	}
	num1 = num1.replace(/零佰|零拾|零仟|零角/g, "零");
	num1 = num1.replace(/零{2,}/g, "零");
	num1 = num1.replace(/零(?=圆|万|亿)/g, "");
	num1 = num1.replace(/亿万/, "亿");
	num1 = num1.replace(/^圆零?/, "");
	if (num1 != "" && !/分$/.test(num1))
		num1 += "整";
	return num1;
}

function maxPage() {
	try {
		self.moveTo(0, 0);
		self.resizeTo(screen.availWidth, screen.availHeight);
		safePage();
	} catch (e) {

	}
}

function f_KeyUp_number(obj, fN) {
	obj.value = obj.value.replace(/\D/g, '');
	if (fN == '0') {
		if (obj.value.length > 1) {
			if (obj.value.substr(0, 1) == '0') {
				obj.value = '';
			}
		}
	}
}

function f_OnChange_number(obj, fN) {
	obj.value = obj.value.replace(/\D/g, '');
	if (fN == '0') {
		if (obj.value.length > 1) {
			if (obj.value.substr(0, 1) == '0') {
				obj.value = '';
			}
		}
	}
}

function toUTF8(szInput) {
	var wch, x, uch = "", szRet = "";
	for (x = 0; x < szInput.length; x++) {
		wch = szInput.charCodeAt(x);
		if (!(wch & 0xFF80)) {
			szRet += szInput.charAt(x);
		} else if (!(wch & 0xF000)) {
			uch = "%" + (wch >> 6 | 0xC0).toString(16) + "%"
					+ (wch & 0x3F | 0x80).toString(16);
			szRet += uch;
		} else {
			uch = "%" + (wch >> 12 | 0xE0).toString(16) + "%"
					+ (((wch >> 6) & 0x3F) | 0x80).toString(16) + "%"
					+ (wch & 0x3F | 0x80).toString(16);
			szRet += uch;
		}
	}
	return (szRet);
}
function safePage() {
	// document.oncontextmenu = function() {
	// event.returnValue = false;
	// }
	// window.onhelp = function() {
	// return false;
	// }
	// document.onkeydown = function() {
	// if ((window.event.altKey)
	// && ((window.event.keyCode == 37) || (window.event.keyCode == 39))) {
	//
	// event.returnValue = false;
	// }
	// if ((event.keyCode == 116) || (event.ctrlKey && event.keyCode == 82)) {
	// event.keyCode = 0;
	// event.returnValue = false;
	// }
	// if (event.keyCode == 122) {
	// event.keyCode = 0;
	// event.returnValue = false;
	// }
	// if (event.ctrlKey && event.keyCode == 78)
	// event.returnValue = false;
	// if (event.shiftKey && event.keyCode == 121)
	// event.returnValue = false;
	// if (window.event.srcElement.tagName == "A" && window.event.shiftKey)
	// window.event.returnValue = false;
	// }
}

function beforeInitPage() {
	if (!trim($ES('errorMessage')[0].value).empty()) {
		try {
			if (Ext.getCmp("printBtn") != null) {
				Ext.getCmp("printBtn").disable();
			}
			iconDialog($ES('errorMessage')[0].value, 'ERROR', function() {
						readTextIne();
					});

		} catch (e) {

		}
		return false;
	}
	return true;
}

function enterTab() {
	try {
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
	} catch (e) {

	}
}

function openMaxWindow(url) {
	var winheight = screen.availHeight - 55;
	var winwidth = screen.availWidth - 10;
	var param = "height="
			+ winheight
			+ ",width="
			+ winwidth
			+ ",top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no,titlebar=no";
	window.open(url, "", param);
}

function openCenterWindow(url, winh, winw, scrollbars) {
	var winheight = winh;
	var winwidth = winw;
	var wintop = (screen.availHeight - winh) / 2;
	var winleft = (screen.availWidth - winw) / 2;
	if (null == scrollbars) {
		scrollbars = "yes";
	}
	var param = "height=" + winheight + ",width=" + winwidth + ",top=" + wintop
			+ ",left=" + winleft + ",toolbar=no,menubar=no,scrollbars="
			+ scrollbars + ",resizable=no,location=no,status=no,titlebar=no";
	window.open(url, "", param);
}

function isIE7() {
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
			return false;
		}
		if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
			return true;
		}
	}
	return false;
}

function resetForm(formname) {
	formname.reset();
}
function showExitDialog() {
	confirmDialog("是否确认退出?", function(button) {
				if (button == "yes") {
					window.location.href = "/index/sbTimeOut.jsp";
				}
			});
}

function readText(cwbbFlag) {
	if ($('bbzt') != null) {
		if ($F('bbzt') != "0" && $F('bbzt') != "4" && $F('bbzt') != "null"
				&& $F('bbzt') != "") {
			try {
				if (Ext.getCmp("printBtn") != null) {
					Ext.getCmp("printBtn").enable();
				}
			} catch (e) {

			}
			readTextIne();
		} else {
			// 财务报表特殊处理，打印按钮不禁用
			if (cwbbFlag == null) {
				try {
					if (Ext.getCmp("printBtn") != null) {
						Ext.getCmp("printBtn").disable();
					}
				} catch (e) {

				}
			}
		}
	}
	if ($ES("cqSb").length == 1) {
		if ($ES("cqSb")[0].value == "0") {
			if ($ES("sbbjqx").length != 0) {
				if (getSubDays($ES('sbbjqx')[0].value, curServerDate) > 0) {
					readTextIne();
				}
			}
		}
	} else {
		if ($ES("sbbjqx").length != 0) {
			if (getSubDays($ES('sbbjqx')[0].value, curServerDate) > 0) {
				readTextIne();
			}
		}
	}

	if (jsLtWbLogin == "1") {
		readTextIne();
	}
}

function readTextIne() {
	var s = document.forms(0).elements;
	for (var i = 0; i < s.length; i++) {
		if (s[i].type == "text" || s[i].type == "textarea") {
			if (s[i].id != "zdypinttxt") {
				s[i].readOnly = true;
			}
		} else if (s[i].tagName == "SELECT") {
			if (s[i].id != "bodySize") {
				s[i].disabled = "disabled";
			}
		} else if (s[i].type == "button") {
			if (s[i].name == "tempBtn" || s[i].name == "cleanBtn"
					|| s[i].name == "submitBtn" || s[i].name == "UploadBtn") {
				s[i].disabled = "disabled";
			}
		}
	}
	try {
		if (Ext.getCmp("tempBtn") != null) {
			Ext.getCmp("tempBtn").disable();
		}
		if (Ext.getCmp("xlsBtn") != null) {
			Ext.getCmp("xlsBtn").disable();
		}
		if (Ext.getCmp("submitBtn") != null) {
			Ext.getCmp("submitBtn").disable();
		}
		if (Ext.getCmp("mesBtn") != null) {
			Ext.getCmp("mesBtn").disable();
		}
		if (Ext.getCmp("UploadBtn") != null) {
			Ext.getCmp("UploadBtn").disable();
		}
		if (Ext.getCmp("addBtn") != null) {
			Ext.getCmp("addBtn").disable();
		}
		if (Ext.getCmp("delBtn") != null) {
			Ext.getCmp("delBtn").disable();
		}

		if (Ext.getCmp("dqsjBtn") != null) {
			Ext.getCmp("dqsjBtn").disable();
		}

	} catch (e) {

	}

}

function isReadPage() {
	if ($('bbzt') != null) {
		if ($F('bbzt') == "1" || $F('bbzt') == "2" || $F('bbzt') == "3"
				|| $F('bbzt') == "5" || $F('bbzt') == "6" || $F('bbzt') == "7"
				|| $F('bbzt') == "8" || $F('bbzt') == "9" || $F('bbzt') == "a") {
			return true;
		}
	}
	if ($('BBZT') != null) {
		if ($F('BBZT') == "1" || $F('BBZT') == "2" || $F('BBZT') == "3"
				|| $F('BBZT') == "5" || $F('BBZT') == "6" || $F('BBZT') == "7"
				|| $F('BBZT') == "8" || $F('BBZT') == "9" || $F('BBZT') == "a") {
			return true;
		}
	}
	return false;
}

function pathCheck(str) {
	re = /^[A-Z]:\\{1,2}[^/:\*\?<>\|]+\.(xml|XML)$/i;
	return re.test(str);
}

function pathCheckXls(str) {
	re = /^[A-Z]:\\{1,2}[^/:\*\?<>\|]+\.(xls|XLS)$/i;
	return re.test(str);
}

function pathCheckDataFile(str) {
	re = /^[A-Z]:\\{1,2}[^/:\*\?<>\|]+\.(dat|DAT)$/i;
	return re.test(str);
}
function pathCheckTxtFile(str) {
	re = /^[A-Z]:\\{1,2}[^/:\*\?<>\|]+\.(txt|TXT)$/i;
	return re.test(str);
}

function openModalDialog(url, width, height) {
	var mydate = new Date();
	var year = mydate.getYear();
	var hours = mydate.getHours();
	var minutes = mydate.getMinutes();
	var seconds = mydate.getSeconds();
	var month = mydate.getMonth() + 1;
	var daym = mydate.getDate();
	var paramRom = year + "-" + month + "-" + daym + " " + hours + ":"
			+ minutes + ":" + seconds;
	if (url.indexOf("?") == "-1") {
		url = url + "?" + paramRom + "=" + paramRom;
	} else {
		url = url + "&" + paramRom + "=" + paramRom;
	}
	return window.showModalDialog(url, window, "dialogWidth=" + width
					+ ";dialogHeight = " + height + ";status=no;resizable=no;");
}

function checkFileType(fileObj, fileType) {
	if (trim(fileObj.value).empty()) {
		return false;
	}
	var arr = fileObj.value.split("\\");
	if (arr[arr.length - 1].split(".").length > 2) {
		iconDialog("<font color=red>校验未通过,目前只支持 " + fileType + "文件类型</font>",
				"WARNING");
		return false;
	}
	var arrType = arr[arr.length - 1].split(".")[1].toLowerCase();
	if (fileType.split(",").length > 1) {
		var temp = fileType.split(",");
		var flag = false;
		for (var i = 0; i < temp.length; i++) {
			if (arrType == temp[i]) {
				flag = true;
				break;
			}
		}
		if (flag == false) {
			iconDialog("<font color=red>校验未通过,目前只支持 " + fileType
							+ "文件类型</font>", "WARNING");
			return false;
		}
	} else {
		if (arrType != fileType) {
			iconDialog("<font color=red>校验未通过,目前只支持 " + fileType
							+ "文件类型</font>", "WARNING");
			return false;
		}
	}
	return true;
}

function openCenterDialog(url, width, height) {
	var mydate = new Date();
	var year = mydate.getYear();
	var hours = mydate.getHours();
	var minutes = mydate.getMinutes();
	var seconds = mydate.getSeconds();
	var month = mydate.getMonth() + 1;
	var daym = mydate.getDate();
	var paramRom = year + "-" + month + "-" + daym + " " + hours + ":"
			+ minutes + ":" + seconds;
	if (url.indexOf("?") == "-1") {
		url = url + "?" + paramRom + "=" + paramRom;
	} else {
		url = url + "&" + paramRom + "=" + paramRom;
	}
	return window.showModalDialog(url, window, "dialogWidth=" + width
					+ ";dialogHeight = " + height
					+ "; scroll:yes; help=no;status=no;resizable=no;");
}

function deleteTablRow(tabid, rowindex) {
	while ($(tabid).rows.length > rowindex) {
		$(tabid).deleteRow(rowindex)
	}
}

function toNewIPUrl(str) {
	str = trim(str);
	// 生产配置
	if (str == "wsbs.js-l-tax.gov.cn") {
		return "ca.js-l-tax.gov.cn";
	} else if (str == "221.226.40.99") {
		return "221.226.40.100";
	} else if (str == "221.226.40.66") {
		return "221.226.40.67";
	} else if (str == "122.193.8.147") {
		return "122.193.8.148";
	} else if (str == "58.240.65.35") {
		return "58.240.65.38";
	} else if (str == "112.2.33.195") {
		return "112.2.33.198";
		// 验证配置
	} else if (str == "wsbsyz.js-l-tax.gov.cn") {
		return "cayz.js-l-tax.gov.cn";
	} else if (str == "221.226.40.105") {
		return "221.226.40.106";
	} else if (str == "221.226.40.72") {
		return "221.226.40.73"
	} else if (str == "122.193.8.153") {
		return "122.193.8.154";
	} else if (str == "58.240.65.37") {
		return "58.240.65.39"
	} else if (str == "112.2.33.197") {
		return "112.2.33.199";
	} else if (str == "141.16.31.76") {
		return "141.16.44.154";
	} else if (str == "127.0.0.1") {
		return "141.16.44.154";
	} else if (str == "localhost") {
		return "141.16.44.154";
	} else if (str == "www.jsds.gov.cn") {
		return "ca.jsds.gov.cn";
	} else if (str == "141.16.44.154") {
		return "141.16.44.154";
	} else {
		return "ca.jsds.gov.cn";
	}
}

function getRealValue(str) {
	var testValue;
	if (typeof(str) == "object") {
		testValue = trim(str.value);
	} else {
		testValue = trim(str);
	}
	return testValue;
}

function checkYYYY_MM(obj) {
	var testValue = getRealValue(obj);
	if (/^(\d{4})(-)(\d{2})$/.test(testValue) == false) {
		return false;
	}
	var matchArray = testValue.split("-");
	if (matchArray == null) {
		return false;
	}
	if (matchArray[1].substr(0, 1) == "0") {
		matchArray[1] = matchArray[1].substr(1, 1);
	}
	if (parseInt(matchArray[1]) < 1 || parseInt(matchArray[1]) > 12) {
		return false;
	}
	return true;
}

function bjYYYYMM_lessThanEqual(str1, str2) {
	if (checkYYYY_MM(str1) == false) {
		return false;
	}
	if (checkYYYY_MM(str2) == false) {
		return false;
	}
	var v1 = getRealValue(str1).replace(/-/g, "");
	var v2 = getRealValue(str2).replace(/-/g, "");
	if (parseInt(v1) <= parseInt(v2)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 禁止粘贴
 */
function pasteToFalse() {
	for (var i = 0; i < document.body.getElementsByTagName("input").length; i++) {
		if (document.body.getElementsByTagName("input")[i].paste != "true") {
			document.body.getElementsByTagName("input")[i].onpaste = function() {
				return false;
			}
		}
	}
}

function checkZspmdm(zsxmlist, zspmlist) {
	var ls_flag = true;
	var list = new Array;
	var ls_legth = 0;
	if (zsxmlist.length != zspmlist.length) {
		iconDialog("【征收项目】【征收品目】判断是否重复时，传入条件有误！", "WARNING");
		return false;
	} else {
		for (var i = 0; i < zsxmlist.length; i++) {
			if ("" == zsxmlist[i].value || "" == zspmlist[i].value) {
				continue;
			}
			if (list.length == 0) {
				list[0] = [zsxmlist[i].value, zspmlist[i].value];
			} else {
				for (var j = 0; j < list.length; j++) {
					if ("" == zsxmlist[i].value || "" == zspmlist[i].value) {
						continue;
					}
					if (list[j][0] == zsxmlist[i].value
							&& list[j][1] == zspmlist[i].value) {
						ls_flag = false;
						break;
					}
				}
				if (true == ls_flag) {
					ls_legth = list.length;
					list[ls_legth] = [zsxmlist[j].value, zspmlist[j].value];
				} else {
					iconDialog('第' + (i + 1) + "行【征收品目】重复！", "WARNING");
					return ls_flag;
				}
			}
		}
		return ls_flag;
	}
}

function getIEbb() {
	if (navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 6") == "-1"
			? false
			: true == true) {
		return 6;
	} else if (navigator.userAgent.split(";")[1].toLowerCase()
			.indexOf("msie 7") == "-1" ? false : true == true) {
		return 7;
	} else if (navigator.userAgent.split(";")[1].toLowerCase()
			.indexOf("msie 8") == "-1" ? false : true == true) {
		return 8;
	} else if (navigator.userAgent.split(";")[1].toLowerCase()
			.indexOf("msie 9") == "-1" ? false : true == true) {
		return 9;
	} else if (navigator.userAgent.split(";")[1].toLowerCase()
			.indexOf("msie 10") == "-1" ? false : true == true) {
		return 10;
	} else if (navigator.userAgent.toString().indexOf("11") == "-1"
			? false
			: true == true) {
		return 11;
	} else if (navigator.userAgent.split(";")[1].toLowerCase()
			.indexOf("msie 11") == "-1" ? false : true == true) {
		return 11;
	} else if (navigator.userAgent.split(";")[1].toLowerCase()
			.indexOf("msie 12") == "-1" ? false : true == true) {
		return 12;
	} else if (navigator.userAgent.split(";")[1].toLowerCase()
			.indexOf("msie 13") == "-1" ? false : true == true) {
		return 13;
	} else if (navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie") == "-1"
			? false
			: true == false) {
		return -99;
	} else {
		return 0;
	}
}

function toProMesHTML() {
	var proMes_JosnData = eval("(" + $F('proMessage') + ")").proMessage;
	var divHtml = "<br/><p><b>提交不成功!(如只有提醒类校验可以继续提交,如有强制类校验信息则不允许提交)</b></p><br/>";
	var qzHtml = new Array();
	qzHtml
			.push("<fieldset style='width: 98%'><legend style='font-size: 12px;color:red'>强制类信息</legend><table align='center'  border='1'  cellpadding='1' cellspacing='1' bordercolor='#000000' style='border-collapse: collapse;width:98%' id='qzjy99Table'><tr> <td width='15%'  align='center'>信息编码</td><td  align='center'>信息内容</td></tr>");
	var txHtml = new Array();
	txHtml
			.push("<fieldset style='width: 98%'><legend style='font-size: 12px'>提醒类信息</legend><table align='center'  border='1'  cellpadding='1' cellspacing='1' bordercolor='#000000' style='border-collapse: collapse;width:98%' id='txjy99Table'><tr> <td width='15%'  align='center'>信息编码</td><td  align='center'>信息内容</td></tr>");
	for (var i = 0; i < proMes_JosnData.length; i++) {
		if (proMes_JosnData[i].jylxdm == "1") {
			qzHtml.push("<tr><td align='center'>" + proMes_JosnData[i].jymxdm
					+ "</td><td>" + proMes_JosnData[i].tsnr + "</td></tr>");
		} else if (proMes_JosnData[i].jylxdm == "2") {
			txHtml.push("<tr><td align='center'>" + proMes_JosnData[i].jymxdm
					+ "</td><td>" + proMes_JosnData[i].tsnr + "</td></tr>");
		}
	}
	if (qzHtml.length > 1) {
		for (var i = 0; i < qzHtml.length; i++) {
			divHtml = divHtml + qzHtml[i];
		}
		divHtml = divHtml + "</table></fieldset><br/><br/>";
	}
	if (txHtml.length > 1) {
		for (var i = 0; i < txHtml.length; i++) {
			divHtml = divHtml + txHtml[i];
		}
		divHtml = divHtml + "</table></fieldset>";
	}
	$("qzlJyCount").value = qzHtml.length - 1;
	$("txlJyCount").value = txHtml.length - 1;
	return divHtml;
}

function isIE() {
	if (!!window.ActiveXObject || "ActiveXObject" in window)
		return true;
	else
		return false;
}

function ymkj_getRulesX(tableId) {
	if ($F("ymKj_Info") != "") {
		var ymKj_Info = eval("(" + $F("ymKj_Info") + ")");
		var jsGsList = ymKj_Info.jsGsList;
		var tempRulesXArr = new Array();
		for (var i = 0; i < jsGsList.length; i++) {
			if (jsGsList[i].TABLEID == tableId && jsGsList[i].GSLX == "X") {
				tempRulesXArr.push(jsGsList[i].GS);
			}
		}
		return tempRulesXArr;
	} else {
		return [];
	}
}

function ymkj_getRulesY(tableId) {
	if ($F("ymKj_Info") != "") {
		var ymKj_Info = eval("(" + $F("ymKj_Info") + ")");
		var jsGsList = ymKj_Info.jsGsList;
		var tempRulesYArr = new Array();
		for (var i = 0; i < jsGsList.length; i++) {
			if (jsGsList[i].TABLEID == tableId && jsGsList[i].GSLX == "Y") {
				tempRulesYArr.push(jsGsList[i].GS);
			}
		}
		return tempRulesYArr;
	} else {
		return [];
	}
}

function downLoadMbWj(wjm) {
	if (window.location.href.indexOf("127.0.0.1") == -1
			&& window.location.href.indexOf("localhost") == -1
			&& window.location.href.indexOf("141.16") == -1) {
		openCenterWindow(curWsbsPath + "/download/" + wjm);
	} else {
		openCenterWindow("http://141.16.51.136:6677/download/" + wjm);
	}
}