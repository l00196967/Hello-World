function xmlhttpsend(sURL, sendbody) {
	// sendbody=sendbody+userbody;

	var oXMLHttp = new ActiveXObject("MSXML2.XMLHTTP");
	// sendbody=URLEncoding(sendbody);

	oXMLHttp.open('POST', sURL, false);
	// oXMLHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=gb2312");
	oXMLHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded;charset=UTF-8");
	// alert(sendbody);
	oXMLHttp.send(sendbody);
	// alert(oXMLHttp.responseText);
	// document.all("testdiv").innerText=oXMLHttp.responseText;
	return oXMLHttp.responseText;
}

function tongyong_Deal(s_url_execsp, sFormName, isdoValidate, isDoConfirm,
		isShowSuccess, txtErrorName, spanBZ, submitBZ) {
	if (isdoValidate) {
		var result = itongyong_doValidate(sFormName)
		if (!result) {
			return false;
		}
	}

	if (isDoConfirm) {

		if (!confirm(M_TY_DEAL_CONFIRM))
			return false;

	}

	var responseText = itongyong_xmlhttp(s_url_execsp, sFormName, submitBZ);

	itongyong_doReturn(responseText, spanBZ);
	if (txtErrorName != "") {
		var sresult = document.all(txtErrorName).value;
		if (sresult != "") {
			alert(sresult);
		} else {
			if (isShowSuccess) {
				alert(M_TY_DEAL_SUCCESS)
			}
		}
	}

}
function tongyong_Deal_xml(s_url_execsp, sFormName, isdoValidate, isDoConfirm,
		isShowSuccess, txtErrorName, name_aff) {

	if (isdoValidate) {
		var result = itongyong_doValidate(sFormName)
		if (!result) {
			return false;
		}
	}

	if (isDoConfirm) {

		if (!confirm(M_TY_DEAL_CONFIRM))
			return false;

	}

	var returnvalue = itongyong_xmlhttp(s_url_execsp, sFormName);
	if (returnvalue == "") {
		return "";
	}

	var XmlDoc = new ActiveXObject("Msxml2.DOMDocument");

	var nodevaluestr, nodeid;

	XmlDoc.loadXML(returnvalue);

	var oRoot = XmlDoc.documentElement;
	var xpath = "//people";
	var oRoot = oRoot.selectNodes(xpath);
	oRoot = oRoot(0).childNodes;
	var name = "", id = "";

	// alert(oRoot(17).text);return;
	var length = oRoot.length;
	for (var i = 0; i < length; i++) {
		name = name_aff + oRoot(i).nodeName;
		var ctl = document.all(name);
		if (ctl != null)
			document.all(name).value = oRoot(i).text;

	}
	return;

}
function itongyong_doValidate(sFormName) {
	return doValidate(sFormName);
}

function itongyong_xmlhttp(s_url_execsp, sFormName, submitBZ) {
	var s_sendbody = getFormAsString(sFormName, submitBZ);

	var result = xmlhttpsend(s_url_execsp, s_sendbody);

	return result;

}

function itongyong_doReturn(returnvalue, spanBZ) {
	var spanElements = splitTextIntoSpan(returnvalue);
	replaceExistingWithNewHtml(spanElements, spanBZ);
}

/**
 * gets the contents of the form as a URL encoded String suitable for appending
 * to a url
 *
 * @param formName
 *            to encode
 * @return string with encoded form values , beings with &
 */
function getFormAsString(formName, submitBZ) {

	if (submitBZ == null || submitBZ == "") {
		submitBZ = "oEditUnit";
	}
	// Setup the return String
	returnString = "";

	// Get the form values
	formElements = document.forms[formName].elements;
	// loop through the array , building up the url
	// in the form /strutsaction.do&name=value
	for (var i = formElements.length - 1; i >= 0; --i) {
		// we escape (encode) each value
		// returnString=returnString+"&"+escape(formElements[i].name)+"="+escape(formElements[i].value);
		var ele = formElements[i];
		if (ele.id == null) {
			continue;
		}

		if (ele.id != submitBZ) {
			continue;
		}
		/*
		 * var eleTagName = ele.tagName.toUpperCase(); if("CHECKBOX" ==
		 * eleTagName ){ if(ele.checked == true || ele.checked=="true"){
		 * returnString=returnString+"&"+formElements[i].name+"="+formElements[i].value;
		 * continue; }
		 *
		 * }else if("RADIO" == eleTagName ){ if(ele.checked == true ||
		 * ele.checked=="true"){
		 * returnString=returnString+"&"+formElements[i].name+"="+formElements[i].value;
		 * continue; } }else{
		 * returnString=returnString+"&"+formElements[i].name+"="+formElements[i].value; }
		 */
		// returnString=returnString+"&"+formElements[i].name+"="+formElements[i].value;
		returnString = returnString + "&" + formElements[i].name + "="
				+ encodeURI(formElements[i].value);
	}

	// return the values
	return returnString;
}

/**
 * Splits the text into <span> elements
 *
 * @param the
 *            text to be parsed
 * @return array of <span> elements - this array can contain nulls
 */
function splitTextIntoSpan(textToSplit) {

	// alert(textToSplit);
	// Split the document
	returnElements = textToSplit.split("</span>")

	// Process each of the elements
	for (var i = returnElements.length - 1; i >= 0; --i) {

		// Remove everything before the 1st span
		spanPos = returnElements[i].indexOf("<span");

		// if we find a match , take out everything before the span
		if (spanPos > 0) {
			subString = returnElements[i].substring(spanPos);
			returnElements[i] = subString;
			// alert(subString);

		}
	}

	return returnElements;
}

/*
 * Replace html elements in the existing (ie viewable document) with new
 * elements (from the ajax requested document) WHERE they have the same name AND
 * are <span> elements @param newTextElements (output of splitTextIntoSpan) in
 * the format <span id=name>texttoupdate
 */
function replaceExistingWithNewHtml(newTextElements, spanBZ) {

	if (spanBZ == null) {
		spanBZ = "CH"
	}

	// loop through newTextElements
	for (var i = newTextElements.length - 1; i >= 0; --i) {

		// check that this begins with <span
		if (newTextElements[i].indexOf("<span") > -1) {

			// get the name - between the 1st and 2nd quote mark
			startNamePos = newTextElements[i].indexOf('"') + 1;
			endNamePos = newTextElements[i].indexOf('"', startNamePos);
			name = newTextElements[i].substring(startNamePos, endNamePos);

			// get the content - everything after the first > mark
			startContentPos = newTextElements[i].indexOf('>') + 1;
			var content = newTextElements[i].substring(startContentPos);

			// Now update the existing Document with this element

			// check that this element exists in the document
			var obj = document.getElementById(name);
			if (obj) {

				// alert("Replacing Element:"+name);
				// yang add
				if (obj.bz == null) {
					continue;
				}

				if (obj.bz == "RUN") {
					if (content != "") {
						try {
							eval(content);
						} catch (err) {
							alert(content);
						}
					}
					continue;
				}
				if (obj.bz == spanBZ) {
					document.getElementById(name).innerHTML = content;
					continue;
				}

				if (obj.bz != "CH") {
					continue;
				}
				document.getElementById(name).innerHTML = content;
				// alert(content);
			} else {
				// alert("Element:"+name+"not found in existing document");
			}
		}
	}
}

function SetPageInfo(tablename, RowsCount, pages) {
	if (RowsCount == "" || RowsCount == "0")
		return;
	document.all(tablename + "_rowcount_totle").value = RowsCount;
	var page = document.all(tablename + "_page_current").value;
	document.all(tablename + "_page_total").value = pages.toString();
	if (page > 1) {
		document.all(tablename + "_btn_previous").disabled = false;
		document.all(tablename + "_btn_first").disabled = false;
		document.all(tablename + "_btn_go").disabled = false;
	} else {
		document.all(tablename + "_btn_previous").disabled = true;
		document.all(tablename + "_btn_first").disabled = true;
		// document.all(tablename + "_btn_go").disabled = true ;
	}
	if (page == pages) {
		document.all(tablename + "_btn_next").disabled = true;
		document.all(tablename + "_btn_end").disabled = true;
		// document.all(tablename + "_btn_go").disabled = true ;
	} else {
		document.all(tablename + "_btn_next").disabled = false;
		document.all(tablename + "_btn_end").disabled = false;
		document.all(tablename + "_btn_go").disabled = false;
	}
}
function firstPage(tablename) {
	document.all(tablename + "_page_current").value = "1";
	Pagination(tablename, document.all(tablename + "_page_current").value,
			document.all(tablename + "_rowcount_current").value);
}
function previousPage(tablename) {

	if (parseInt(Trim(document.all(tablename + "_page_current").value)) >= 1) {
		document.all(tablename + "_page_current").value = parseInt(Trim(document
				.all(tablename + "_page_current").value))
				- 1;
		Pagination(tablename, document.all(tablename + "_page_current").value,
				document.all(tablename + "_rowcount_current").value);
	}
}

function nextPage(tablename) {

	if (parseInt(Trim(document.all(tablename + "_page_current").value)) < parseInt(Trim(document
			.all(tablename + "_page_total").value))) {
		document.all(tablename + "_page_current").value = parseInt(Trim(document
				.all(tablename + "_page_current").value))
				+ 1;
		Pagination(tablename, document.all(tablename + "_page_current").value,
				document.all(tablename + "_rowcount_current").value);
	}
}
function endPage(tablename) {
	document.all(tablename + "_page_current").value = document.all(tablename
			+ "_page_total").value;
	Pagination(tablename, document.all(tablename + "_page_current").value,
			document.all(tablename + "_rowcount_current").value)
}
function GoToPage(tablename) {
	if (document.all(tablename + "_page_go").value == "") {
		alert(M_PAGE_NOINPUTPAGE);
		return;
	}
	document.all(tablename + "_page_current").value = document.all(tablename
			+ "_page_go").value;
	Pagination(tablename, document.all(tablename + "_page_current").value,
			document.all(tablename + "_rowcount_current").value)

}

function LTrim(str) {
	var whitespace = new String(" \t\n\r");
	var s = new String(str);
	if (whitespace.indexOf(s.charAt(0)) != -1) {
		var j = 0, i = s.length;
		while (j < i && whitespace.indexOf(s.charAt(j)) != -1) {
			j++;
		}
		s = s.substring(j, i);
	}
	return s;
}

function RTrim(str) {
	var whitespace = new String(" \t\n\r");
	var s = new String(str);

	if (whitespace.indexOf(s.charAt(s.length - 1)) != -1) {
		var i = s.length - 1;
		while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1) {
			i--;
		}
		s = s.substring(0, i + 1);
	}
	return s;
}

function Trim(str) {
	return RTrim(LTrim(str));
}

function tongyong_getparameter(paraName) {
	paraName = paraName.toUpperCase();
	var tmpURL = document.URL;
	var m_WJDM = "";
	var tmpPara = tmpURL.split("?");
	if (tmpPara.length <= 1)
		return m_WJDM;
	var tmpPara1 = tmpPara[1];
	var tmpArr = tmpPara1.split("&");
	for (var i = 0; i < tmpArr.length; i++) {
		var tmpValue = tmpArr[i].split("=");
		switch (tmpValue[0].toUpperCase()) {
			case paraName :
				if (tmpValue.length > 0) {
					// m_WJDM= "1" + tmpValue[1];
					m_WJDM = tmpValue[1];
				} else {
					m_WJDM = "";
				}
				break;
			default :
		}
	}
	return m_WJDM;

}

function tongyong_selectOption(objname, ii) {
	var obj = document.getElementsByName(objname);

	for (var i = 0; i < obj.length; i++) {

		if (obj[i].bz == ii) {
			obj[i].checked = true;
		} else {
			obj[i].checked = false;
		}
	}
}

function nullToString(str) {
	if (str == null) {
		return "";
	}
	return str;
}

function ArgumentURL() {
	this.getArgument = _getArg;
	this.setArgument = _setArg;
	this.removeArgument = _removeArg;
	this.toString = _toString; // Allows the object to be printed
	// no need to write toString()
	this.arguments = new Array();

	// Initiation
	var separator = "&";
	var equalsign = "=";

	var str = window.location.search.replace(/%20/g, " ");
	var index = str.indexOf("?");
	var sInfo;
	var infoArray = new Array();

	var tmp;

	if (index != -1) {
		sInfo = str.substring(index + 1, str.length);
		infoArray = sInfo.split(separator);
	}

	for (var i = 0; i < infoArray.length; i++) {
		tmp = infoArray[i].split(equalsign);
		if (tmp[0] != "") {
			var t = tmp[0];
			this.arguments[tmp[0]] = new Object();
			this.arguments[tmp[0]].value = tmp[1];
			this.arguments[tmp[0]].name = tmp[0];
		}
	}

	function _toString() {
		var s = "";
		var once = true;
		for (i in this.arguments) {
			if (once) {
				s += "?";
				once = false;
			}
			s += this.arguments[i].name;
			s += equalsign;
			s += this.arguments[i].value;
			s += separator;
		}
		return s.replace(/ /g, "%20");
	}

	function _getArg(name) {
		if (this.arguments[name] == null) {
			return null;
		}
		if (typeof(this.arguments[name].name) != "string")
			return null;
		else
			return this.arguments[name].value;
	}

	function _setArg(name, value) {
		this.arguments[name] = new Object()
		this.arguments[name].name = name;
		this.arguments[name].value = value;
	}

	function _removeArg(name) {
		this.arguments[name] = null;
	}

	return this;
}

function getCtrlAttribute(ctrl, attrName) {
	if (ctrl == null)
		return null;

	var value = ctrl.getAttribute(attrName);
	if (value == null)
		value = "";
	value = Trim(value);
	return value;
}