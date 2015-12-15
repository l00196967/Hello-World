/*******************************************************************************
 * 2010-04-22 version 1.2 杨希 修改回车键不起作用的问题. 回车键选中规则为: 从页面其它元素回车进入代码框,需要显示下拉列表,
 * 并且不再执行选中操作.
 * 如果从本代码框触发的回车事件,分两种情况:如果代码框还未选中数据(为空),或者下拉列表中选项条目大于1,则直接跳过,否则置第一个选项为选中
 * 修改用nextSibling获取名称框时出错问题.
 * ***************************************************************** /*
 * /****************************************************************** version
 *
 *
 * 修改代码值改变时清空所有下级的方法, 采用手工调用递归函数的方式 ,防止在有些环境不能触发onpropertychange 修改顶层框架缓存机制,
 * 防止在多层弹出页面中不能取到父框架的问题. 修改回车键不能直接选中代码值的问题
 * 修改反复点击同一个代码框每次都需要清除并且重新构建下拉层数据的问题,提升显示效率 修改当选中的值还是原来代码框中的值时,不清除下级.
 * ***************************************************************** /*
 * 解决不选择值，下拉不消失的Bug 增加当前值默认选中
 *
 * ******************************************************************
 */
/*******************************************************************************
 * version 1.0 ***************************************************************** /*
 * 增加输入校验 增加对 SELECT 控件的遮挡 去掉当没有下拉选项时DIV的竖线 增加对页面下拉模板的动态建立 修改代码转名称时
 * onpropertychange 事件的 attachEvent 方法, 修改为直接对onpropertychange 事件赋值 清空realvalue
 * 增加必添项校验 解决选项显示不完整
 * ******************************************************************
 */
var clsDynamicSelect$xmlHttp = null;
var clsDynamicSelect$completeDiv = null;
var clsDynamicSelect$inputField = null;
var clsDynamicSelect$nameTable = null;
var clsDynamicSelect$nameThead = null;
var clsDynamicSelect$nameTableBody = null;
var clsDynamicSelect$cellindex = null;
var clsDynamicSelect$selectDom = null;
var clsDynamicSelect$privateDom = null;
var clsDynamicSelect$flag = false;
var clsDynamicSelect$showStatus = false; // 标志当前下拉层是否被显示 false 没有被显示 true已被显示
// 放置所有的select项
var clsDynamicSelect$tablist = null;
var clsDynamicSelect$domPath = null;
var privateCodeCacheName = "selectXml";
function getCodeXml(prikey, filter) {

	var action = "/codeSelectServer";
	var sendbody = "&prikey=" + escape(encodeURIComponent(prikey));

	sendbody += "&curentfilter=" + escape(encodeURIComponent(filter));
	return xmlhttpsend(action, sendbody);

}
// document.onkeyup = ondocumentkeyup;
function clsDynamicSelect$ondocumentkeyup() {
	alert("in document key up");
}

function clsDynamicSelect$getCodeNameCtrl(codeCtrl, oTR) {
	var nameCtrl = null;
	var name = codeCtrl.name + "_name";
	/*
	 * var tagName = nameCtrl.getAttribute("tagName"); //toUpperCase()
	 * if(tagName != undefined && tagName !=null){
	 * if(tagName.toUpperCase()=="INPUT"){ if(nameCtrl.name = name){ return
	 * nameCtrl; } } }
	 */

	if (oTR != null) {
		nameCtrl = clsDynamicSelect$findCtrlInElementById(oTR, "input", name);
		return nameCtrl;
	} else {
		nameCtrl = document.getElementsByName(name);
		if (nameCtrl.length == 1) {
			nameCtrl = nameCtrl[0];
			return nameCtrl;
		} else {
			return null;
		}

	}
	return null;

}

// 代码转名称 传入代码控件name数组
function clsDynamicSelect$codeToName(nameArray) {
	if (nameArray != null && nameArray.length != 0) {
		if (clsDynamicSelect$privateDom == null) {
			clsDynamicSelect$init(privateCodeCacheName);
		}
		if (event != null)
			event.cancelBubble = false;
		var ctrlArray;
		var oCtrl;
		var oEvent;
		var parentKeyValue;
		var oTR;
		var parentkeyctrl = null;
		var parentctrl = null;
		var textCtrl = null;
		for (var i = 0; i < nameArray.length; i++) {

			ctrlArray = document.getElementsByName(nameArray[i]);
			if (ctrlArray != null && ctrlArray.length != 0) {
				for (var j = 0; j < ctrlArray.length; j++) {
					oCtrl = ctrlArray[j];

					// oEvent = oCtrl.onpropertychange;
					// oCtrl.onpropertychange = "";

					// 需要判断是否在表格中属性
					if (oCtrl.getAttribute("inTable") == "false"
							|| oCtrl.getAttribute("inTable") == false) {
						oTR = null;
					} else {
						oTR = clsDynamicSelect$getTrByElement(oCtrl, "TR");
					}
					if (oCtrl.getAttribute("outerrelation") != ""
							&& oCtrl.getAttribute("outerrelation") != null) {
						// parentKeyValue=document.all(oCtrl.getAttribute("outerrelation")).getAttribute(
						// "realvalue" );
						parentKeyValue = document.getElementById(oCtrl
								.getAttribute("outerrelation"))
								.getAttribute("realvalue");
					} else {
						if (oTR == null) {
							parentkeyctrl = oCtrl.getAttribute("parentctrl");
							if (parentkeyctrl != "" && parentkeyctrl != null) {
								parentctrl = document
										.getElementsByName(parentkeyctrl);
								if (parentctrl.length > 0) {
									parentctrl = parentctrl[0];
								} else {
									parentctrl = null;
								}
								if (parentctrl != null) {
									parentKeyValue = parentctrl
											.getAttribute("realvalue");
								} else {
									parentKeyValue = null;
								}

							} else {
								parentKeyValue = null;
							}
						} else {
							parentKeyValue = clsDynamicSelect$getParentCtrlValuesInTR(
									oCtrl, oTR);
						}
						textCtrl = clsDynamicSelect$getCodeNameCtrl(oCtrl, oTR);
					}

					// if(j==2)alert(parentKeyValue);
					if (textCtrl != null) {
						textCtrl.value = clsDynamicSelect$getCodeValue(oCtrl,
								parentKeyValue);
					}
					// oCtrl.onpropertychange = oEvent;
					// 直接手工调用清除下级函数
					// clsDynamicSelect$clearChildCtrl(oCtrl);
					oCtrl = null;
					parentKeyValue = null;
					oEvent = null;
					oTR = null;
					parentKeyValue = null;
					parentctrl = null;
				}
			}
			ctrlArray = null;
		}
		if (event != null)
			event.cancelBubble = false;
	}

}
// ================================================
function clsDynamicSelect$getTrByElement(oCtrl, strTagName) {
	var element = oCtrl;
	if (element.tagName != null) {
		while (element.tagName.toUpperCase() != strTagName) {
			element = element.parentNode;
			if (element == null)
				break;
			if (element.tagName == undefined || element.tagName == "") {
				element = null;
				break;
			}
			if (element.tagName.toUpperCase() == "HTML") {
				element = null;
				break;
			}
		}
		return element;
	}
	return null;
}
function clsDynamicSelect$getCodeValue(oCtrl, parentKeyValue) {

	if (clsDynamicSelect$privateDom == null)
		return "";
	var prikey = oCtrl.getAttribute("prikey");
	var realvalue = oCtrl.getAttribute("realvalue");
	var currentDom = clsDynamicSelect$getAjaxDom(prikey, oCtrl);
	if (currentDom == null)
		return "";
	if (parentKeyValue == "" || parentKeyValue == null) {
		var node = currentDom.selectSingleNode("name[@value='" + realvalue
				+ "']");

		if (node == null) {
			return "";
		} else {
			return node.getAttribute("text");
		}
	} else {
		var node = currentDom.selectSingleNode("navi[@parentkey='"
				+ parentKeyValue + "']/name[@value='" + realvalue + "']");
		if (node == null) {
			return "";
		} else {
			return node.getAttribute("text");
		}
	}

}
function clsDynamicSelect$createIframe() {
	clsDynamicSelect$nameIframe = document.createElement("IFRAME");
	clsDynamicSelect$nameIframe.style.width = "0px";
	clsDynamicSelect$nameIframe.style.height = "0px";
	clsDynamicSelect$nameIframe.frameborder = "no";
	clsDynamicSelect$nameIframe.style.position = "absolute";
	clsDynamicSelect$IframeDiv.appendChild(clsDynamicSelect$nameIframe);
}
function clsDynamicSelect$createElement() {

	clsDynamicSelect$nameIframe = document.createElement("IFRAME");
	clsDynamicSelect$IframeDiv = document.createElement("DIV");

	clsDynamicSelect$IframeDiv.id = "clsPopupIframe";
	clsDynamicSelect$IframeDiv.style.overflowY = "auto";
	clsDynamicSelect$IframeDiv.style.position = "absolute";
	clsDynamicSelect$IframeDiv.style.height = "102px";
	clsDynamicSelect$IframeDiv.style.display = "block";

	clsDynamicSelect$nameIframe.style.width = "0px";
	clsDynamicSelect$nameIframe.style.height = "0px";
	clsDynamicSelect$nameIframe.frameborder = "no";
	clsDynamicSelect$nameIframe.style.position = "absolute";

	clsDynamicSelect$IframeDiv.appendChild(clsDynamicSelect$nameIframe);

	clsDynamicSelect$IframeDiv.style.display = "block";
	clsDynamicSelect$IframeDiv.setAttribute("display", "block");

	document.body
			.insertAdjacentElement("beforeEnd", clsDynamicSelect$IframeDiv);

	// 创建包含表格的层
	clsDynamicSelect$completeDiv = document.createElement("DIV");
	clsDynamicSelect$completeDiv.style.backgroundColor = "#E6E6FA";
	// 创建表格
	clsDynamicSelect$nameTable = document.createElement("TABLE");
	// cellspacing='1' cellpadding='4' style='background-color: Teal' ;
	clsDynamicSelect$nameTable.setAttribute("cellspacing", "1");
	clsDynamicSelect$nameTable.setAttribute("cellpadding", "4");
	clsDynamicSelect$nameTable.setAttribute("class", "codeSelectTB");
	// clsDynamicSelect$nameTable.style.cssText="background-color: Teal";
	// 创建表头
	clsDynamicSelect$nameThead = document.createElement("THEAD");
	// 创建表格body
	clsDynamicSelect$nameTableBody = document.createElement("TBODY");

	clsDynamicSelect$completeDiv.id = "clsPopup";
	clsDynamicSelect$completeDiv.style.overflowY = "auto";
	clsDynamicSelect$completeDiv.style.position = "absolute";
	clsDynamicSelect$completeDiv.style.height = "215px"; // yang gai
	// 2008-9-22
	clsDynamicSelect$completeDiv.style.display = "block";

	clsDynamicSelect$completeDiv.style.zIndex = "999999" // ymd add 2008-9-8

	//
	clsDynamicSelect$nameTable.appendChild(clsDynamicSelect$nameThead);
	clsDynamicSelect$nameTable.appendChild(clsDynamicSelect$nameTableBody);
	clsDynamicSelect$completeDiv.appendChild(clsDynamicSelect$nameTable);

	document.body.insertAdjacentElement("beforeEnd",
			clsDynamicSelect$completeDiv);

	/*
	 * clsDynamicSelect$nameTable.onclick = function () { return; if
	 * (document.activeElement.getAttribute("realvalue")==null ||
	 * document.activeElement.getAttribute("textvalue")==null)
	 * clsDynamicSelect$clearNames(); }
	 */

}
// ==========================================================================
// 初始化代码显示组建
function clsDynamicSelect$init(ctrlName, urlPath, AppendUrlPath, oDom, fileName) {

	if (clsDynamicSelect$completeDiv == null) {
		// 创建代码显示容器的各个元素, 比如div table tBody
		clsDynamicSelect$createElement();
	}
	if (urlPath != null) {
		clsDynamicSelect$privateDom = oPublicFunction.getDom(urlPath);
		return;
	}
	if (AppendUrlPath != null && clsDynamicSelect$privateDom != null)// 将要附加的代码数据源按照指定地址附加到已有的代码dom树中
	{
		var tempDom = oPublicFunction.getDom(AppendUrlPath);
		if (tempDom != null) {
			var oCloneNode;
			var oNodeList = tempDom.selectNodes("/navi/navi");
			if (oNodeList != null && oNodeList.length != 0) {
				for (var i = 0; i < oNodeList.length; i++) {
					oCloneNode = oNodeList[i].cloneNode(true);
					clsDynamicSelect$privateDom.documentElement
							.appendChild(oCloneNode);
					oCloneNode = null;
				}
			}
		}
		return;// 11185 10665185
	}
	if (ctrlName != null) {
		var xmlStr = "";
		if (document.getElementById(ctrlName) != null
				&& document.getElementById(ctrlName) != undefined) {
			xmlStr = document.getElementById(ctrlName).value;
		}
		// 此处进行dom加载 如果一进来的时候还没有初始化数据, 需要创建一个空的dom
		// 如果存在数据 则添加到父页面缓存
		var tempXml = oPublicFunction.getDom(null, xmlStr);
		var cacheObj = clsDynamicSelect$getCcObj();
		if (cacheObj != null) {
			cacheObj.addDom(tempXml, myPage$functionid);
			clsDynamicSelect$privateDom = oPublicFunction.getDom(null, "");
		} else {
			clsDynamicSelect$privateDom = tempXml;

		}

		return;
	}
	if (oDom != null) {
		var cacheObj = clsDynamicSelect$getCcObj();
		if (cacheObj != null) {
			// alert("将初始化数据加载到框架缓存");
			cacheObj.addDom(oDom, myPage$functionid);
			clsDynamicSelect$privateDom = oPublicFunction.getDom(null, "");
		} else {
			clsDynamicSelect$privateDom = oDom;

		}

	}
}

// ---------------------------------------
function clsDynamicSelect$createXMLHttpRequest() {
	if (window.ActiveXObject) {
		clsDynamicSelect$xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		clsDynamicSelect$xmlHttp = new XMLHttpRequest();
	}
}
// ---------------------------------------
function clsDynamicSelect$initVars() {

	clsDynamicSelect$inputField = event.srcElement;
	clsDynamicSelect$cellindex = 0;
	clsDynamicSelect$flag = false;
	/*
	 * if (clsDynamicSelect$inputField.getAttribute("input_Must")==null) {
	 * clsDynamicSelect$inputField.setAttribute("input_Must","true"); }
	 */
	// clsDynamicSelect$inputField.style.width = "100%";
}

// ---------------------------------------
// 焦点
function getInputByIndex(obj, objCrl) {
	// alert(objCrl.index);
	// alert(crlCount);

	for (var i = 0; i < obj.length; i++) {
		if (obj[i].index == objCrl.index + 1) {
			if (obj[i].type != "hidden" && obj[i].style.visibility != "hidden"
					&& obj[i].style.visibility != "none") {
				return obj[i].focus();
			}
		}
	}
}// end function
function clsDynamicSelect$nextctrl() {

	var crlCount;
	crlCount = document.getElementsByTagName("input");
	for (var j = 0; j < document.getElementsByTagName("input").length; j++) {

		// 增加扩展属性
		document.getElementsByTagName("input")[j].index = j;
		var self = document.getElementsByTagName("input");
		var crlIndex = j;
		var objCrl = document.getElementsByTagName("input")[j];
		// 给每个控件对象增加onkeyup事件 ---回车跳转
		document.getElementsByTagName("input")[j].onkeyup = function() {

			if (window.event.keyCode == 13) {
				// 如果当前为最后一个，则停止跳转
				if (this.index + 1 != crlCount) {
					getInputByIndex(self, this);
				}
				return;
			}
		}
	}// end for

}

// ---------------------------------------

function clsDynamicSelect$inputsample() {
	var keyCodeStr = event.keyCode;
	if (keyCodeStr == "13") {
		clsDynamicSelect$nextctrl();
	}
}

// ---------------------------------------
function Trim(str) {
	return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
}
/*******************************************************************************
 * 初次进入代码框时没有任何一项被选中 代码框必须存在有效的输入值时，才会默认选中第一个 按向下箭头键时， 第一次按置第一个选项为选中
 * 回车时判断是否存在被选中的项， 存在则置被选中项为值。
 *
 ******************************************************************************/
function clsDynamicSelect$findNames() {
	// alert( "in ctrl key up" );

	var keyCodeStr = event.keyCode;
	// clsDynamicSelect$inputField.value=Trim(clsDynamicSelect$inputField.value);

	// 回车键
	if (keyCodeStr == "13") {
		if (event.expando == "indiv") {
			// alert("indiv");
			// clsDynamicSelect$nextctrl();
			return;
		}
		/*
		 * show true length 0 跳过 已显示 输入代码为空 show true length 1 选中第一个 跳过
		 * 已显示输入代码不是空 show false length 1 不能赋值 (由其它控件回车进入时) 未显示 则显示 show false
		 * length 0 不能赋值
		 */

		var oTR = null;
		var textCtrl = null;
		var currentRow = null;
		// 未显示 则显示
		// alert(public_enter_priv_obj == clsDynamicSelect$inputField);
		// public_enter_priv_obj 等于 clsDynamicSelect$inputField 表示是由自己触发的回车事件
		// 此时需要正常流转下去 如果不相等 表示是其它控件触发的回车事件 需要退出处理
		if (public_enter_priv_obj != clsDynamicSelect$inputField) {

			return;
		}
		// 已显示 但是输入空值 则认为是不想选择 跳过
		oTR = null;
		if (clsDynamicSelect$inputField.getAttribute("inTable") == false
				|| clsDynamicSelect$inputField.getAttribute("inTable") == "false") {
			oTR = null;
		} else {
			oTR = clsDynamicSelect$getNamedObj("TR",
					clsDynamicSelect$inputField);
		}
		textCtrl = clsDynamicSelect$getCodeNameCtrl(
				clsDynamicSelect$inputField, oTR);

		/*
		 * if((clsDynamicSelect$inputField.value.length ==0) ){ if(textCtrl !=
		 * null){ textCtrl.value = ""; textCtrl.focus(); textCtrl.select(); }
		 * clsDynamicSelect$clearNames(); return ; }
		 */
		currentRow = clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex];
		if (currentRow == null) {
			return;
		}
		if (currentRow.style.color != "#ffffff") {
			if (textCtrl != null) {
				textCtrl.focus();
				textCtrl.select();
			}
			clsDynamicSelect$clearNames();
			return;
		}
		// 如果此时 realvalue 和value相等 则认不想选择 直接跳过
		var realvalue = Trim(clsDynamicSelect$inputField
				.getAttribute("realvalue"));
		var codevalue = Trim(clsDynamicSelect$inputField.getAttribute("value"));
		/*
		 * if(realvalue==codevalue && codevalue!=""){ if(textCtrl != null){
		 * textCtrl.focus(); textCtrl.select(); } clsDynamicSelect$clearNames();
		 * return ; }
		 */
		// 此时已显示 需要判断是否存在选中的项 存在则职位
		// alert("clsDynamicSelect$showStatus:"+clsDynamicSelect$showStatus);
		var trLength = clsDynamicSelect$nameTableBody.childNodes.length;
		// 如果下拉层中有多个值, 则跳过到下一个 并且清空

		/*
		 * if(trLength>1 ){ if(textCtrl != null){ textCtrl.value="";
		 * textCtrl.focus(); textCtrl.select(); } clsDynamicSelect$clearNames();
		 * return ; }
		 */
		if (trLength != 0) {
			// alert(clsDynamicSelect$cellindex);
			if ((clsDynamicSelect$cellindex != -1)) {

				var codeValue = currentRow.getAttribute("realvalue");
				var textValue = currentRow.getAttribute("textvalue");
				clsDynamicSelect$inputField
						.setAttribute("realvalue", codeValue);
				clsDynamicSelect$inputField.value = codeValue;
				if (textCtrl != null) {
					textCtrl.value = textValue;// 文本值
				}
				clsDynamicSelect$clearNames();
			}

		}
		// clsDynamicSelect$nextctrl();
		if (textCtrl != null) {
			textCtrl.focus();
			textCtrl.select();
		}
		try {
			clsDynamicSelect$inputField.onchange();
		} catch (err) {
		}

	}
	if (keyCodeStr == "38") {
		// alert( "上" );
		if (clsDynamicSelect$cellindex - 1 >= 0) {
			var currentRow = null;
			// background-color: #ffcc66;color: #ffffff;
			currentRow = clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex
					- 1];
			currentRow.style.backgroundColor = "#ffcc66";
			currentRow.style.color = "#ffffff";
			currentRow = clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex];
			currentRow.style.backgroundColor = "#F0F5FF";
			currentRow.style.color = "#000000";
			clsDynamicSelect$cellindex = clsDynamicSelect$cellindex - 1;
			var height = currentRow.offsetHeight;
			clsDynamicSelect$completeDiv.scrollTop = clsDynamicSelect$completeDiv.scrollTop
					- height;
		}
	}
	if (keyCodeStr == "40") {
		//
		var currentRow = null;
		if (clsDynamicSelect$cellindex > 0) {

			if (clsDynamicSelect$cellindex + 1 < clsDynamicSelect$nameTableBody.childNodes.length) {
				currentRow = clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex
						+ 1];
				currentRow.style.backgroundColor = "#ffcc66";
				currentRow.style.color = "#ffffff";
				currentRow = clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex];
				currentRow.style.backgroundColor = "#F0F5FF";
				currentRow.style.color = "#000000";
				clsDynamicSelect$cellindex = clsDynamicSelect$cellindex + 1;
				var height = currentRow.offsetHeight;
				clsDynamicSelect$completeDiv.scrollTop = clsDynamicSelect$completeDiv.scrollTop
						+ height;
			}
		} else {
			if (0 < clsDynamicSelect$nameTableBody.childNodes.length) {
				currentRow = clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex];
				if (currentRow.style.color != "#ffffff") {// 第0行未被选中
					currentRow.style.backgroundColor = "#ffcc66";
					currentRow.style.color = "#ffffff";
					var height = currentRow.offsetHeight;
					clsDynamicSelect$completeDiv.scrollTop = clsDynamicSelect$completeDiv.scrollTop
							+ height;
				} else {// 第0行已被选中
					if (1 < clsDynamicSelect$nameTableBody.childNodes.length) {
						currentRow = clsDynamicSelect$nameTableBody.childNodes[0];
						currentRow.style.backgroundColor = "#F0F5FF";
						currentRow.style.color = "#000000";
						currentRow = clsDynamicSelect$nameTableBody.childNodes[1];
						currentRow.style.backgroundColor = "#ffcc66";
						currentRow.style.color = "#ffffff";
						clsDynamicSelect$cellindex = 1;
						var height = currentRow.offsetHeight;
						clsDynamicSelect$completeDiv.scrollTop = clsDynamicSelect$completeDiv.scrollTop
								+ height;

					}
				}

			}

		}
		/*
		 * if( clsDynamicSelect$cellindex <
		 * clsDynamicSelect$nameTableBody.childNodes.length ) { //判断第0行是否被选中
		 * if(clsDynamicSelect$cellindex==0){
		 * if(clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex
		 * ].style.color!="#ffffff"){//第0行未被选中
		 * clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex
		 * ].style.backgroundColor="#ffcc66";
		 * clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex
		 * ].style.color="#ffffff"; }else{ if( 1 <
		 * clsDynamicSelect$nameTableBody.childNodes.length ){
		 * clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex
		 * +1].style.backgroundColor="#ffcc66";
		 * clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex
		 * +1].style.color="#ffffff"; } } }else{ if( clsDynamicSelect$cellindex +
		 * 1 < clsDynamicSelect$nameTableBody.childNodes.length ){
		 * clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex
		 * +1].style.backgroundColor="#ffcc66";
		 * clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex
		 * +1].style.color="#ffffff"; } }
		 *
		 * if(clsDynamicSelect$cellindex>0){
		 * clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex-1
		 * ].style.backgroundColor = "#F0F5FF";
		 * clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex-1].style.color
		 * ="#000000"; } clsDynamicSelect$cellindex = clsDynamicSelect$cellindex +
		 * 1; if(clsDynamicSelect$cellindex ==
		 * clsDynamicSelect$nameTableBody.childNodes.length)
		 * clsDynamicSelect$cellindex--; clsDynamicSelect$completeDiv.scrollTop =
		 * clsDynamicSelect$completeDiv.scrollTop + 15; }
		 */
	}
	if (keyCodeStr != "13" && keyCodeStr != "38" && keyCodeStr != "40") {

		if (clsDynamicSelect$privateDom == null)
			return;
		clsDynamicSelect$initVars();
		clsDynamicSelect$inputField.setAttribute("realvalue", "");
		/*
		 * if (Trim(clsDynamicSelect$inputField.value)=="") {
		 * clsDynamicSelect$inputField.setAttribute("realvalue",""); }
		 */

		var oTR = clsDynamicSelect$getNamedObj("TR",
				clsDynamicSelect$inputField);
		if (clsDynamicSelect$inputField.value.length > 0) {
			var prikey = event.srcElement.getAttribute("prikey");
			var parentkeyctrl = event.srcElement.getAttribute("parentctrl");
			var outerrelation = event.srcElement.getAttribute("outerrelation");
			var text_name = clsDynamicSelect$inputField.name + "_name";
			var textCtrl = null;
			// 需要手动清除下级
			clsDynamicSelect$clearChildCtrl(clsDynamicSelect$inputField);
			if (outerrelation == "") {
				if (parentkeyctrl != "") {

					if (clsDynamicSelect$inputField.getAttribute("inTable") == false
							|| clsDynamicSelect$inputField
									.getAttribute("inTable") == "false")
						oTR = null;
					textCtrl = clsDynamicSelect$getCodeNameCtrl(
							clsDynamicSelect$inputField, oTR);
					if (textCtrl != null) {
						textCtrl.value = "";// 文本值
					}
					if (oTR == null)// 不在table中
					{
						var tempValue = clsDynamicSelect$getParentCtrlValues(event.srcElement);
						// var parentKeyValue = document.all( parentkeyctrl
						// ).getAttribute( "realvalue" );
						var parentKeyValue = tempValue;
						var inputValue = event.srcElement.value;
						var prikey = event.srcElement.getAttribute("prikey");
						var filter = event.srcElement
								.getAttribute("curentfilter");
						var tempDom = clsDynamicSelect$getExsitNode(prikey,
								filter);
						tempDom = tempDom.selectSingleNode("navi[@prikey='"
								+ prikey + "' and @parentkey='"
								+ parentKeyValue + "']");
						if (tempDom == null)
							return;
						var tarDom = tempDom
								.selectNodes("name[starts-with(@value,'"
										+ inputValue + "')]");
						if (tarDom != null)
							clsDynamicSelect$setNames(tarDom);

					} else {
						var tempValue = clsDynamicSelect$getParentCtrlValuesInTR(
								event.srcElement, oTR);
						var parentKeyValue = tempValue;
						var inputValue = event.srcElement.value;
						var prikey = event.srcElement.getAttribute("prikey");
						var filter = event.srcElement
								.getAttribute("curentfilter");
						var tempDom = clsDynamicSelect$getExsitNode(prikey,
								filter);
						tempDom = tempDom.selectSingleNode("navi[@prikey='"
								+ prikey + "' and @parentkey='"
								+ parentKeyValue + "']");
						if (tempDom == null)
							return;
						var tarDom = tempDom
								.selectNodes("name[starts-with(@value,'"
										+ inputValue + "')]");

						if (tarDom != null)
							clsDynamicSelect$setNames(tarDom);
					}

				} else {
					var oTR = null;
					if (clsDynamicSelect$inputField.getAttribute("inTable") == false
							|| clsDynamicSelect$inputField
									.getAttribute("inTable") == "false") {
						oTR = null;
					} else {
						oTR = clsDynamicSelect$getNamedObj("TR",
								clsDynamicSelect$inputField);
					}
					var textCtrl = clsDynamicSelect$getCodeNameCtrl(
							clsDynamicSelect$inputField, oTR);
					if (textCtrl != null) {
						textCtrl.value = "";// 文本值
					}

					var inputValue = event.srcElement.value;
					var prikey = event.srcElement.getAttribute("prikey");
					var filter = event.srcElement.getAttribute("curentfilter");
					var tempDom = clsDynamicSelect$getExsitNode(prikey, filter);

					var tarDom = tempDom
							.selectNodes("name[starts-with(@value,'"
									+ inputValue + "')]");
					if (tarDom != null)
						clsDynamicSelect$setNames(tarDom);

				}
			} else {
				var parentKeyValue = document.all(outerrelation)
						.getAttribute("realvalue");
				var inputValue = event.srcElement.value;
				var prikey = event.srcElement.getAttribute("prikey");
				var filter = event.srcElement.getAttribute("curentfilter");
				var tempDom = clsDynamicSelect$getExsitNode(prikey, filter);
				tempDom = tempDom.selectSingleNode("navi[@prikey='" + prikey
						+ "' and @parentkey='" + parentKeyValue + "']");
				var tarDom = tempDom.selectNodes("name[starts-with(@value,'"
						+ inputValue + "')]");
				if (tarDom != null)
					clsDynamicSelect$setNames(tarDom);
			}
			clsDynamicSelect$completeDiv.scrollTop = 0;
		} else {
			// clearNames();
			// 需要置空
			var textCtrl = clsDynamicSelect$getCodeNameCtrl(
					clsDynamicSelect$inputField, oTR);
			if (textCtrl != null) {
				textCtrl.value = "";// 文本值
			}
			clsDynamicSelect$completeDiv.scrollTop = 0;
			clsDynamicSelect$showAllItem();
		}
		// 此时如果存在一个有效值 则置第一个为选中
		if (Trim(clsDynamicSelect$inputField.value) != "") {
			// alert(clsDynamicSelect$cellindex);
			if (clsDynamicSelect$cellindex < clsDynamicSelect$nameTableBody.childNodes.length) {
				clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex].style.backgroundColor = "#ffcc66";
				clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex].style.color = "#ffffff";

				// clsDynamicSelect$completeDiv.scrollTop =
				// clsDynamicSelect$completeDiv.scrollTop + 15;
			}

		}
	}
}

// ---------------------------------------

function clsDynamicSelect$getParentCtrlValuesInTR(oCtrl, oTR) {
	var parentkeyctrl = oCtrl.getAttribute("parentctrl");
	if (parentkeyctrl == "" || parentkeyctrl == null) {
		return "";

	} else {

		var oParentCtrl = clsDynamicSelect$findCtrlInElementById(oTR, "input",
				parentkeyctrl)// 获得父节点控件
		return oParentCtrl.getAttribute("realvalue");
		// return "," + oParentCtrl.getAttribute( "realvalue" ) +
		// clsDynamicSelect$getParentCtrlValuesInTR( oParentCtrl, oTR );
	}

}

// ---------------------------------------
// 获取存在关系的代码控件的所有父节点关系串 input0,input1,input2
function clsDynamicSelect$getParentCtrlValues(oCtrl) {
	var parentkeyctrl = oCtrl.getAttribute("parentctrl");
	if (parentkeyctrl == "") {
		return "";

	} else {
		return document.getElementsByName(parentkeyctrl)[0]
				.getAttribute("realvalue");
		// return "," + document.all( parentkeyctrl ).getAttribute( "realvalue"
		// ) + clsDynamicSelect$getParentCtrlValues( document.all( parentkeyctrl
		// ) );
	}

}

// ---------------------------------------

function clsDynamicSelect$callback() {
	if (clsDynamicSelect$xmlHttp.readyState == 4) {
		if (clsDynamicSelect$xmlHttp.status == 200) {
			var name = clsDynamicSelect$xmlHttp.responseXML
					.getElementsByTagName("name")[0].firstChild.data;
			clsDynamicSelect$setNames(clsDynamicSelect$xmlHttp.responseXML
					.getElementsByTagName("name"));
		} else if (clsDynamicSelect$xmlHttp.status == 204) {
			clsDynamicSelect$clearNames();
		}
	}
}
// 判断是否能取到顶层框架
function clsDynamicSelect$testTopPage(page) {
	// yangxi add
	try {
		// 首先判断是否模态
		if (page.dialogArguments != undefined && page.dialogArguments != null) {
			return clsDynamicSelect$testTopPage(page.dialogArguments);
		} else if (typeof(page.opener) == "object") {// 判断是否弹出
			return clsDynamicSelect$testTopPage(page.opener);
		} else {// 此时应是框架内页面
			return page.top;
		}
	} catch (e) {
		return page.top;
	}
	return null;

}
/*
 * function clsDynamicSelect$testTopPage(){ if(window.dialogArguments==undefined ||
 * window.dialogArguments==null){ if (typeof(window.opener)!="object"){
 *
 * //在框架中的页面 return window.top; }else{//被弹出的非模态窗体 return window.opener.top; }
 * }else{//被弹出的模态窗体 return window.dialogArguments.top; } return null; }
 */

/*
 * 此方法返回缓存xml对象, 如果能够从顶层框架取,则返回顶层框架的, 否则返回本页面的; 凡是需要获取xml缓存对象的地方, 都调用该方法,
 * 该方法屏蔽了缓存文件的获取过程
 */
function clsDynamicSelect$getExsitXml() {
	var topObj = clsDynamicSelect$testTopPage(window);
	var returnXml = null;
	if (topObj != null) {// 从父框架获取
		if (topObj.pubClsCodeCache != null
				&& (typeof(topObj.pubClsCodeCache) == "object")) {
			returnXml = topObj.pubClsCodeCache.clsCodeCache$Xml;
		} else {
			returnXml = clsDynamicSelect$privateDom;
		}

	} else {// 从本地获取
		returnXml = clsDynamicSelect$privateDom;
	}
	return returnXml;
}
function clsDynamicSelect$getCcObj() {
	var topObj = clsDynamicSelect$testTopPage(window);
	var ccObj = null;
	if (topObj != null) {// 从父框架获取
		if (topObj.pubClsCodeCache != null
				&& (typeof(topObj.pubClsCodeCache) == "object")) {
			ccObj = topObj.pubClsCodeCache
		}
	}
	return ccObj;
}
// 从缓存文件中查找节点
function clsDynamicSelect$getExsitNode(prikey, filter) {
	var ccObj = clsDynamicSelect$getCcObj();

	if (ccObj == null) {
		return clsDynamicSelect$privateDom
				.selectSingleNode("/navi/navi[@prikey='" + prikey
						+ "' and @filter=\"" + filter + "\"]");
	} else {
		return ccObj.getDom(prikey, filter);
	}
}
// 向缓存文件中增加一个节点, 屏蔽缓存文件是顶层框架还是本页面 如果是缓存到框架 则会把整个节点都缓存
function clsDynamicSelect$addNodeToCache(oDom) {
	// 如果能够取到框架缓存对象 则增加到框架缓存
	if (oDom.childNodes[1] == null)
		return;
	var cacheObj = clsDynamicSelect$getCcObj();
	if (cacheObj != null) {
		cacheObj.addDom(oDom, myPage$functionid);
	} else {
		// 否则缓存到本页面对象

		oDom = oDom.childNodes[1].childNodes[0];
		var oCloneNode = oDom.cloneNode(true);
		var rootNode = clsDynamicSelect$privateDom.selectSingleNode("/navi");
		rootNode.appendChild(oCloneNode);
	}
}
// 判断需要获取的code是否已经初始化,如果没有初始化,则从ajax进行初始化 并且将获得的数据加载到xml文件节点中
function clsDynamicSelect$getAjaxDom(prikey, codeInput) {
	if (clsDynamicSelect$getExsitXml() == null)
		return null;
	var filter = codeInput.getAttribute("curentfilter");
	var tempDom = clsDynamicSelect$getExsitNode(prikey, filter);
	if (tempDom == null) {// 需要从ajax获取xml初始化数据
		var xmlStr = getCodeXml(prikey, filter);
		if (xmlStr == null)
			return null;
		// var oDom = new ActiveXObject("MSXML2.DOMDocument.5.0");
		var oDom = clsPublicFunction$createDomObj();
		oDom.loadXML(xmlStr);
		clsDynamicSelect$addNodeToCache(oDom);
		oDom = null;
	}
	tempDom = clsDynamicSelect$getExsitNode(prikey, filter);
	return tempDom;
}
// ---------------------------------------
// 当下拉控件获得焦点时的触发函数 查找当前下拉框匹配的xml数据,将数据填充到下拉层并且显示下拉层
function clsDynamicSelect$showAllItem() {

	if (clsDynamicSelect$completeDiv == null) {
		clsDynamicSelect$init(privateCodeCacheName);
	}

	if (clsDynamicSelect$getExsitXml() == null)
		return;
	clsDynamicSelect$initVars();
	var readonly = clsDynamicSelect$inputField.getAttribute("readonly");
	if (readonly == true)
		return;
	if (clsDynamicSelect$inputField.value != "" && clsDynamicSelect$flag) {
		clsDynamicSelect$flag = false;
		return;
	}
	clsDynamicSelect$completeDiv.scrollTop = 0;
	var prikey = event.srcElement.getAttribute("prikey");// 获取当前控件对应的xml主键
	var outerrelation = event.srcElement.getAttribute("outerrelation");//
	var inputValue = event.srcElement.value;// 获取当前控件输入值

	var tempDom = clsDynamicSelect$getAjaxDom(prikey,
			clsDynamicSelect$inputField);// 根据主键查找当前控件对应的xml节点
	if (tempDom == null) {
		alert("无法获取代码初始化数据!请检查配置文件.");
		return;
	}
	var currentRootDom = tempDom;
	// 此时需要判断是否存在dom节点,如果不存在 则需要从ajax获取

	if (outerrelation == "") {
		if (event.srcElement.getAttribute("parentctrl") != "")// 如果存在父节点
		{
			var prikey = event.srcElement.getAttribute("prikey");//
			var parentkeyctrl = event.srcElement.getAttribute("parentctrl");// 获取父控件名称
			var oTR = clsDynamicSelect$getNamedObj("TR",
					clsDynamicSelect$inputField);
			if (clsDynamicSelect$inputField.getAttribute("inTable") == false
					|| clsDynamicSelect$inputField.getAttribute("inTable") == "false")
				oTR = null;
			// alert(oTR.innerHTML);
			if (oTR == null)// 不在table中 非表格行的代码, 就是说代码控件不在表格中放着
			{
				var tempValue = clsDynamicSelect$getParentCtrlValues(event.srcElement);// 获取父节点关系串

				var parentKeyValue = tempValue;// 整理父节点关系串,规范格式
				// var parentKeyValue = document.all( parentkeyctrl
				// ).getAttribute( "realvalue" );
				// alert("tr==null,"+ parentKeyValue );
				if (parentKeyValue != "" && parentKeyValue != null)// 存在级联关系并且不是最顶层的代码控件处理
				{
					var tempDom = currentRootDom
							.selectSingleNode("navi[@prikey='" + prikey
									+ "' and @parentkey='" + parentKeyValue
									+ "']");
					if (tempDom != null && tempDom.childNodes.length != 0)
						clsDynamicSelect$setNames(tempDom.childNodes);
				} else// 存在级联关系并且是最顶层的控件
				{

					clsDynamicSelect$clearNames();
				}

			} else// 下拉控件被包含在表格中
			{
				// var oCtrl = findIdInTR( oTR, parentkeyctrl );
				var tempValue = clsDynamicSelect$getParentCtrlValuesInTR(
						event.srcElement, oTR);
				var parentKeyValue = tempValue;// 所有父节点的值串 用来dom中过滤条件
				// alert( parentKeyValue );
				// var oCtrl = findCtrlInElementById( oTR, "input",
				// parentkeyctrl );
				// var parentKeyValue = oCtrl.getAttribute( "realvalue" );
				if (parentKeyValue != "" && parentKeyValue != null)// 如果父节点串值不为空
				{
					var inputValue = event.srcElement.value;
					var tempDom = currentRootDom
							.selectSingleNode("navi[@parentkey='"
									+ parentKeyValue + "']");
					if (tempDom != null && tempDom.childNodes.length != 0)
						clsDynamicSelect$setNames(tempDom.childNodes);
				} else// 父节点串值为空
				{

					clsDynamicSelect$clearNames();
				}
			}
		} else// 如果不存在父节点
		{
			// 但是此时的层次未必是第一层 需要判断
			if (tempDom != null && tempDom.childNodes.length != 0)
				clsDynamicSelect$setNames(tempDom.childNodes);// 将xml数据塞入下拉层
			// 并且显示下拉层
		}
	} else {
		var parentKeyValue = document.all(outerrelation)
				.getAttribute("realvalue");
		var inputValue = event.srcElement.value;
		var tempDom = currentRootDom.selectSingleNode("navi[@prikey='" + prikey
				+ "' and @parentkey='" + parentKeyValue + "']");
		if (tempDom != null && tempDom.childNodes.length != 0)
			clsDynamicSelect$setNames(tempDom.childNodes);
	}
}
// ---------------------------------------
function clsDynamicSelect$findCtrlInElementById(oE, ctrlTagName, ctrlid) {
	var ctrlList = oE.getElementsByTagName(ctrlTagName);
	var octrl;
	for (var i = 0; i < ctrlList.length; i++) {
		octrl = ctrlList[i];
		if (ctrlid == octrl.name) {
			return octrl;
		}
	}
	return null;
}

// ---------------------------------------

function clsDynamicSelect$findIdInTR(oTR, ctrlId) {
	var oTDList = oTR.childNodes;
	var oTD;
	var oCtrl;
	for (var i = 0; i < oTDList.length; i++) {
		oTD = oTDList[i];
		oCtrl = clsDynamicSelect$findIdInTD(oTD, ctrlId);
		if (oCtrl != null) {
			return oCtrl;
		}
	}
	return null;
}

// ---------------------------------------

function clsDynamicSelect$findIdInTD(oTD, ctrlId) {
	var oCtrlList = oTD.childNodes;
	var oCtrl;
	for (var j = 0; j < oCtrlList.length; j++) {
		oCtrl = oCtrlList[j];
		if (ctrlId == oCtrl.id) {
			return oCtrl;
		}
	}
	return null;
}

// ---------------------------------------

function clsDynamicSelect$sortParentValue(parentValue) {
	var strList = parentValue.split(",");
	var returnStr = "";
	for (var i = strList.length - 1; i >= 0; i--) {
		if (strList[i] == "") {
		} else {
			if (returnStr == "") {
				returnStr = strList[i];
			} else {
				returnStr = returnStr + "," + strList[i];
			}
		}

	}
	return returnStr;
}
// 设置是否显示表头
function clsDynamicSelect$ctrlTableHead(action) {
	if (action == 0) {// 删除head
		if (clsDynamicSelect$nameThead.childNodes.length > 0) {
			clsDynamicSelect$nameThead
					.removeChild(clsDynamicSelect$nameThead.childNodes[0]);
		}
		return;
	}
	if (action == 1) {// 显示head
		var row = document.createElement("TR");
		row.setAttribute("bgColor", "#e6ecff");
		row.setAttribute("class", "codeSelectTHEAD");
		var cell = document.createElement("TD");
		cell.setAttribute("nowarp", "true");
		cell.setAttribute("align", "center");
		cell.innerText = "编号";
		row.appendChild(cell);
		cell = document.createElement("TD");
		cell.setAttribute("nowarp", "true");
		cell.setAttribute("align", "center");
		cell.innerText = "名称";
		row.appendChild(cell);
		clsDynamicSelect$nameThead.appendChild(row);
		return;
	}

}
// 判断当前prikey所在的节点是否是第一层 -1 空的文档节点 0 是第一层 1 是第N层
function clsDynamicSelect$isOneLevel(the_names) {
	var size = the_names.length;
	if (size == 0)// 如果数据不存在 则不显示
		return -1;
	var parentkey = the_names[0].getAttribute("parentkey");
	if (parentkey != null) {
		return 1;
	} else {
		return 0;
	}

}
function clsDynamicSelect$setNamesN(the_names) {
	clsDynamicSelect$showStatus = true;
	var row, cell, nobrnode, txtNode;
	var size = the_names.length;
	var count = 0;
	for (var i = 0; i < size; i++)// 遍历所有叶节点 生成下拉层的代码数据显示表格
	{
		var node = the_names[i].childNodes;
		var nsize = node.length;
		// 获取code值

		var temp = "";
		// 获取代码名称
		var nextNode = "";

		for (var j = 0; j < nsize; j++) {
			// 获取code值
			temp = nullToString(node[j].getAttribute("value"));
			// 获取代码名称
			nextNode = node[j].getAttribute("text");
			// 生成行
			row = document.createElement("tr");
			count++;
			row.style.cursor = "hand";
			// 单元格绑定事件 变换颜色效果
			row.onmouseout = function() {
				// this.className = 'mouseOver';
				this.style.backgroundColor = "#F0F5FF";
				this.style.color = "#000000";
			};
			row.onmouseover = function() {
				this.style.backgroundColor = "#ffcc66";
				this.style.color = "#ffffff";
			};
			row.bgColor = '#F0F5FF';
			// 将代码值和代码名称写入单元格附加属性
			row.setAttribute("realvalue", temp);
			row.setAttribute("textvalue", nextNode);
			// row.setAttribute( "onclick","clsDynamicSelect$populateName();" );
			// 绑定代码单击事件 单击后将选中值显示在输入框中
			row.onclick = function() {
				clsDynamicSelect$populateName(this);
			};
			// 生成单元格 代码单元格
			cell = document.createElement("td");
			// cell.setAttribute( "border", "0" );
			txtNode = document.createTextNode(temp);
			nobrnode = document.createElement("nobr");
			// 指定单元格中显示的文本不换行
			nobrnode.appendChild(txtNode);
			// 创建层
			var spanNode = document.createElement("SPAN");
			spanNode.width = "10px";
			spanNode.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;"
			// 美化作用 在显示的文本前加空格
			nobrnode.appendChild(spanNode);
			// 将内容添加到单元格中
			cell.appendChild(nobrnode);
			row.appendChild(cell);

			// 生成单元格 文本单元格
			cell = document.createElement("td");
			cell.setAttribute("border", "0");
			txtNode = document.createTextNode(nextNode);

			nobrnode = document.createElement("nobr");
			// 指定单元格中显示的文本不换行
			nobrnode.appendChild(txtNode);
			// 创建层
			var spanNode = document.createElement("SPAN");
			spanNode.width = "10px";
			spanNode.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
			// 美化作用 在显示的文本前加空格

			nobrnode.appendChild(spanNode);
			// 将内容添加到单元格中
			cell.appendChild(nobrnode);
			row.appendChild(cell);
			// 将生成的列添加到下拉层的表格主体中 nameTableBody是公共变量 下拉组件容器的一部分
			clsDynamicSelect$nameTableBody.appendChild(row);

		}

	}
	if (size > 0) {

		clsDynamicSelect$ctrlTableHead(1);
	}
	clsDynamicSelect$setOffsets();

	if (clsDynamicSelect$inputField.realvalue != ""
			|| clsDynamicSelect$inputField.value != "") {
		var trList = clsDynamicSelect$nameTableBody.childNodes;
		// 遍历下拉层中的表格主体中所有行
		for (var m = 0; m < trList.length; m++) {
			var currentTD = trList[m].childNodes[0];
			if (currentTD.getAttribute("textvalue") == clsDynamicSelect$inputField.value
					|| currentTD.getAttribute("realvalue") == clsDynamicSelect$inputField.realvalue) {
				var currentScrollTop = document.body.scrollTop; // 记录当前BODY滚动条的Top
				currentTD.scrollIntoView();
				clsDynamicSelect$cellindex = m;
				document.body.scrollTop = currentScrollTop; // 保持BODY滚动条不滚动
				currentTD.fireEvent("onmouseover");
				return;
			}
		}
	}

}
// ---------------------------------------
// 用来将数据塞入下拉层 并且显示下拉层
function clsDynamicSelect$setNames(the_names) { // the_names是代码xml文件中当前需要抓取的节点
	// 代码xml文件中存放所有类型的本页面代码数据
	clsDynamicSelect$clearNames();// 清空下拉框
	clsDynamicSelect$createIframe();// 用来使下拉层不被遮挡的iframe

	var size = the_names.length;
	if (size == 0)// 如果数据不存在 则不显示
	{

		clsDynamicSelect$nameIframe.style.display = "none";
		clsDynamicSelect$completeDiv.style.display = "none";
		clsDynamicSelect$completeDiv.style.border = "black 0px none";
		var clsDynamicSelect$value = clsDynamicSelect$inputField.value;
		// alert('输入错误!!');
		clsDynamicSelect$inputField.value = clsDynamicSelect$value.substr(0,
				clsDynamicSelect$value.length - 1);
		// clsDynamicSelect$inputField.focus();
		clsDynamicSelect$flag = true;
		clsDynamicSelect$showStatus = false;
		clsDynamicSelect$findNames();
		return;
	}
	clsDynamicSelect$showStatus = true;
	if (clsDynamicSelect$isOneLevel(the_names) == 1) {// 第N层
		clsDynamicSelect$setNamesN(the_names);
		return;
	}
	var row, cell, nobrnode, txtNode;

	for (var i = 0; i < size; i++)// 循环处理节点 生成下拉层的代码数据显示表格
	{
		// 获取code值
		var temp = nullToString(the_names[i].getAttribute("value"));
		// 获取代码名称
		var nextNode = the_names[i].getAttribute("text");
		// 生成行
		row = document.createElement("tr");
		row.setAttribute("rownumber", i);
		row.style.cursor = "hand";
		// 单元格绑定事件 变换颜色效果
		// 取消选中
		row.onmouseout = function() {
			// this.className = 'mouseOver';
			this.style.backgroundColor = "#F0F5FF";
			this.style.color = "#000000";
			// clsDynamicSelect$cellindex=0;
		};
		// 选中 需要将currentindex的项目置为不选中 index置为当前行号
		row.onmouseover = function() {
			var currentRow = clsDynamicSelect$nameTableBody.childNodes[clsDynamicSelect$cellindex];
			currentRow.style.backgroundColor = "#F0F5FF";
			currentRow.style.color = "#000000";
			this.style.backgroundColor = "#ffcc66";
			this.style.color = "#ffffff";
			clsDynamicSelect$cellindex = this.getAttribute("rownumber");

		};
		row.bgColor = '#F0F5FF';
		// 将代码值和代码名称写入单元格附加属性
		row.setAttribute("realvalue", temp);
		row.setAttribute("textvalue", nextNode);
		// row.setAttribute( "onclick","clsDynamicSelect$populateName();" );
		/*
		 * row.attachEvent("onclick", function() {
		 * clsDynamicSelect$populateName(row); });
		 */
		// 绑定代码单击事件 单击后将选中值显示在输入框中
		row.onclick = function() {
			clsDynamicSelect$populateName(this);
		};
		// 生成单元格 代码单元格
		cell = document.createElement("td");
		// cell.setAttribute( "border", "0" );
		txtNode = document.createTextNode(temp);
		nobrnode = document.createElement("nobr");
		// 指定单元格中显示的文本不换行
		nobrnode.appendChild(txtNode);
		// 创建层
		var spanNode = document.createElement("SPAN");
		spanNode.width = "10px";
		spanNode.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;"
		// 美化作用 在显示的文本前加空格
		nobrnode.appendChild(spanNode);
		// 将内容添加到单元格中
		cell.appendChild(nobrnode);
		row.appendChild(cell);

		// 生成单元格 文本单元格
		cell = document.createElement("td");
		cell.setAttribute("border", "0");
		txtNode = document.createTextNode(nextNode);

		nobrnode = document.createElement("nobr");
		// 指定单元格中显示的文本不换行
		nobrnode.appendChild(txtNode);
		// 创建层
		var spanNode = document.createElement("SPAN");
		spanNode.width = "10px";
		spanNode.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
		// 美化作用 在显示的文本前加空格
		nobrnode.appendChild(spanNode);
		// 将内容添加到单元格中
		cell.appendChild(nobrnode);
		row.appendChild(cell);
		// 将生成的列添加到下拉层的表格主体中 nameTableBody是公共变量 下拉组件容器的一部分
		clsDynamicSelect$nameTableBody.appendChild(row);

	}
	if (size > 0) {

		clsDynamicSelect$ctrlTableHead(1);
	}
	clsDynamicSelect$setOffsets();

	if (clsDynamicSelect$inputField.realvalue != ""
			|| clsDynamicSelect$inputField.value != "") {
		var trList = clsDynamicSelect$nameTableBody.childNodes;
		// 遍历下拉层中的表格主体中所有行
		for (var m = 0; m < trList.length; m++) {
			var currentTD = trList[m].childNodes[0];
			if (currentTD.getAttribute("textvalue") == clsDynamicSelect$inputField.value
					|| currentTD.getAttribute("realvalue") == clsDynamicSelect$inputField.realvalue) {
				var currentScrollTop = document.body.scrollTop; // 记录当前BODY滚动条的Top
				currentTD.scrollIntoView();
				clsDynamicSelect$cellindex = m;
				document.body.scrollTop = currentScrollTop; // 保持BODY滚动条不滚动
				currentTD.fireEvent("onmouseover");
				return;
			}
		}
	}
}

// ---------------------------------------

function clsDynamicSelect$setOffsets() {
	var end = clsDynamicSelect$inputField.offsetWidth;
	// var left = clsDynamicSelect$calculateOffsetLeft(
	// clsDynamicSelect$inputField );
	// var top = clsDynamicSelect$calculateOffsetTop(
	// clsDynamicSelect$inputField ) + clsDynamicSelect$inputField.offsetHeight;
	var left = clsDynamicSelect$calculateCtrlLeft(clsDynamicSelect$inputField);
	var top = clsDynamicSelect$calculateCtrlTop(clsDynamicSelect$inputField)
			+ clsDynamicSelect$inputField.offsetHeight;

	clsDynamicSelect$completeDiv.style.border = "black 1px solid";
	clsDynamicSelect$completeDiv.style.display = "";
	clsDynamicSelect$completeDiv.style.left = left + "px";
	// clsDynamicSelect$completeDiv.style.background = "#F0F5FF";
	clsDynamicSelect$completeDiv.style.top = top + "px";
	// clsDynamicSelect$completeDiv.style.width = end + "px";
	clsDynamicSelect$nameTable.style.width = end + "px";
	clsDynamicSelect$nameTable.style.width = end + "px";

	clsDynamicSelect$IframeDiv.style.display = "block";
	clsDynamicSelect$IframeDiv.setAttribute("display", "block");
	clsDynamicSelect$IframeDiv.style.left = left + "px";
	clsDynamicSelect$IframeDiv.style.top = top + "px";

	clsDynamicSelect$IframeDiv.style.width = clsDynamicSelect$completeDiv.scrollWidth
			+ 2;// clsDynamicSelect$completeDiv.clientWidth+20;//end +
	// "px";//offsetWidth;

	clsDynamicSelect$nameIframe.style.width = clsDynamicSelect$completeDiv.scrollWidth
			+ 2;// clsDynamicSelect$completeDiv.clientWidth+20;//end + "px";

	clsDynamicSelect$nameIframe.style.height = clsDynamicSelect$completeDiv.clientHeight
			+ 2;// "100px";

}

// ---------------------------------------

function clsDynamicSelect$calculateCtrlTop(obj) {
	if (obj != null) {
		var nTop = 0;
		while (obj != null) {
			nTop = nTop + obj.offsetTop;
			if (obj.tagName.toLowerCase() == "div") {
				nTop = nTop - obj.scrollTop;
			}
			if (obj.offsetParent != null && obj.offsetParent.tagName != null
					&& obj.offsetParent.tagName.toLowerCase() == "body")
				break;
			obj = obj.offsetParent;
		}
		return nTop;
	}
}

function clsDynamicSelect$calculateCtrlLeft(obj) {
	if (obj != null) {
		var nLeft = 0;
		while (obj != null && typeof(obj) != "undefined") {
			nLeft = nLeft + obj.offsetLeft;
			if (obj.tagName.toLowerCase() == "div") {

				if (getIEbb() < 10) {
					nLeft = nLeft - obj.scrollLeft;
				} else {
					nLeft = nLeft - obj.scrollLeft;
				}
			}
			if (obj.offsetParent != null && obj.offsetParent.tagName != null
					&& obj.offsetParent.tagName.toLowerCase() == "body")
				break;
			obj = obj.parentNode;
		}
		return nLeft-15;
	}
}

// ---------------------------------------

function clsDynamicSelect$calculateOffsetLeft(field) {
	return clsDynamicSelect$calculateOffset(field, "offsetLeft");
}

// ---------------------------------------

function clsDynamicSelect$calculateOffsetTop(field) {
	return clsDynamicSelect$calculateOffset(field, "offsetTop");
}

// ---------------------------------------

function clsDynamicSelect$calculateOffset(field, attr) {
	var offset = 0;
	while (field) {
		offset += field[attr];
		field = field.offsetParent;
	}
	return offset;
}
var isAlert = 0;
// ---------------------------------------
// 下拉层中数据行的单击事件,将选中行写入代码输入显示框
function clsDynamicSelect$populateName(cell) {
	clsDynamicSelect$inputField.setAttribute("realvalue", cell
					.getAttribute("realvalue"));// 代码值

	clsDynamicSelect$inputField.value = cell.getAttribute("realvalue");
	clsDynamicSelect$clearChildCtrl(clsDynamicSelect$inputField);
	var text_name = clsDynamicSelect$inputField.name + "_name";

	var oTR = clsDynamicSelect$getNamedObj("TR", clsDynamicSelect$inputField);
	if (clsDynamicSelect$inputField.getAttribute("inTable") == false
			|| clsDynamicSelect$inputField.getAttribute("inTable") == "false")
		oTR = null;
	var textCtrl = clsDynamicSelect$getCodeNameCtrl(
			clsDynamicSelect$inputField, oTR);
	if (textCtrl != null) {

		textCtrl.value = cell.getAttribute("textvalue");// 文本值
	}
	// Validator.Validate(clsDynamicSelect$inputField,2);
	// 隐藏下拉层
	// alert("clear")
	clsDynamicSelect$clearNames();
	var eventObj = document.createEventObject();
	eventObj.expando = "indiv";
	eventObj.keyCode = 13;
	// 触发keyup事件 并且模拟传入回车键,13是回车 此时一般会触发findNames 函数
	isAlert = 1;

	clsDynamicSelect$inputField.fireEvent("onkeyup", eventObj);
	//
	event.cancelBubble = true;// 停止事件向上传递
	try {
		clsDynamicSelect$inputField.onchange();
	} catch (err) {
		// alert("异常");
	}

}

// ---------------------------------------
// 清空下拉层
function clsDynamicSelect$clearNames() {
	clsDynamicSelect$showStatus = false;
	var ind = clsDynamicSelect$nameTableBody.childNodes.length;

	for (var i = ind - 1; i >= 0; i--) {
		clsDynamicSelect$nameTableBody
				.removeChild(clsDynamicSelect$nameTableBody.childNodes[i]);
	}
	clsDynamicSelect$nameTableBody.innerText = "";
	clsDynamicSelect$completeDiv.style.border = "none";
	// clsDynamicSelect$IframeDiv.runtimeStyle.width = "0px";
	// clsDynamicSelect$IframeDiv.runtimeStyle.height = "0px";
	clsDynamicSelect$nameIframe.runtimeStyle.width = "1px";
	clsDynamicSelect$nameIframe.runtimeStyle.height = "1px";

	/*
	 * if (clsDynamicSelect$IframeDiv.childNodes.length!=0) {
	 * clsDynamicSelect$IframeDiv.removeChild(clsDynamicSelect$nameIframe); }
	 */
	clsDynamicSelect$ctrlTableHead(0);
	clsDynamicSelect$nameIframe.removeNode(true);
	// clsDynamicSelect$nameIframe = null;

	clsDynamicSelect$IframeDiv.style.display = "none";
	clsDynamicSelect$IframeDiv.style.border = "none";
	clsDynamicSelect$completeDiv.style.display = "none";
	clsDynamicSelect$IframeDiv.setAttribute("display", "none");
	return;
	clsDynamicSelect$IframeDiv.style.display = "block";
	clsDynamicSelect$IframeDiv.setAttribute("display", "block");

	clsDynamicSelect$IframeDiv.style.display = "none";
	clsDynamicSelect$IframeDiv.setAttribute("display", "none");

	// clsDynamicSelect$IframeDiv.refresh();
	// clsDynamicSelect$IframeDiv.style.visibility = "hidden";
	// prompt("",clsDynamicSelect$IframeDiv.outerHTML);
	// alert(clsDynamicSelect$IframeDiv.outerHTML);
	// clsDynamicSelect$inputField.setAttribute( "realvalue", "");
	// document.all.Select2.value += clsDynamicSelect$IframeDiv.outerHTML;
}

// ---------------------------------------
// 下拉控件onblur的触发函数 隐藏下拉框
function clsDynamicSelect$onSelectLostFocus() {
	// 如果下拉层未创建 则退出
	if (clsDynamicSelect$completeDiv == null) {
		return;
	}
	// EXT4ccs不允许重叠，需要扣除40，IE10版本例外
	var ieSizeW = 0;
	var ieSizeH = 0;
	if (getIEbb() < 10) {
		ieSizeW = 40;
		ieSizeH = 350;
	}
	if ((clsDynamicSelect$completeDiv.offsetLeft - document.body.scrollLeft) < event.x
			&& event.x < (clsDynamicSelect$completeDiv.offsetLeft
					+ clsDynamicSelect$completeDiv.offsetWidth - document.body.scrollLeft)
			&& (clsDynamicSelect$completeDiv.offsetTop - ieSizeW - document.body.scrollTop) < event.y
					+ ieSizeH
			&& (event.y - ieSizeH) < (clsDynamicSelect$completeDiv.offsetTop
					- ieSizeW + clsDynamicSelect$completeDiv.offsetHeight - document.body.scrollTop)) {

	} else {
		// alert("outer div");
		clsDynamicSelect$clearNames();
		if (clsDynamicSelect$inputField != null) {
			if (clsDynamicSelect$inputField.getAttribute("realvalue") == "") {
				clsDynamicSelect$inputField.setAttribute("value", "");
			}
		}
		// Validator.Validate(clsDynamicSelect$inputField,2);
	}
}

// ---------------------------------------
// 直接通过函数清除关联的下级控件 不通过事件关联触发
function clsDynamicSelect$clearChildCtrl(rootCtrl) {

	// alert(event.srcElement.outerHTML);
	// if (event.srcElement.value=="") alert(xxxxx);
	if (rootCtrl.getAttribute("childCtrl") != "") {
		var childCtrlName = rootCtrl.getAttribute("childCtrl");
		var textCtrl = null;
		var oTR = clsDynamicSelect$getNamedObj("TR", rootCtrl);
		// alert(clsDynamicSelect$inputField.getAttribute("inTable"));
		if (rootCtrl.getAttribute("inTable") == false
				|| rootCtrl.getAttribute("inTable") == "false")
			oTR = null;
		if (oTR == null)// 不在table中
		{
			var childCtrl = document.getElementById(childCtrlName);
			// alert("tr==null"+childCtrl.name);
			childCtrl.value = "";
			childCtrl.setAttribute("realvalue", "");
			// 并且相应的文本控件也置空
			textCtrl = clsDynamicSelect$getCodeNameCtrl(childCtrl, oTR);

			clsDynamicSelect$clearChildCtrl(childCtrl);
		} else// 在table 针对多行的情况 name可能出现重名 因此必须是同一行的才清除
		{
			// var oCtrl = findIdInTR( oTR, parentkeyctrl );
			var oCtrl = clsDynamicSelect$findCtrlInElementById(oTR, "input",
					childCtrlName);
			// alert(oCtrl.name);
			oCtrl.value = "";
			oCtrl.setAttribute("realvalue", "");
			textCtrl = clsDynamicSelect$getCodeNameCtrl(oCtrl, oTR);

			clsDynamicSelect$clearChildCtrl(oCtrl);
		}
		// 清空名称框
		if (textCtrl != null) {
			textCtrl.value = "";
		}
	}

}

function clsDynamicSelect$clearChildCtrlValue() {

	if (event.propertyName == 'value') {

		// alert(event.srcElement.outerHTML);
		// if (event.srcElement.value=="") alert(xxxxx);
		if (event.srcElement.getAttribute("childCtrl") != "") {
			var childCtrlName = event.srcElement.getAttribute("childCtrl");
			var textCtrl = null;
			var oTR = clsDynamicSelect$getNamedObj("TR", event.srcElement);
			// alert(clsDynamicSelect$inputField.getAttribute("inTable"));
			if (event.srcElement.getAttribute("inTable") == false
					|| event.srcElement.getAttribute("inTable") == "false")
				oTR = null;
			// alert(oTR);
			if (oTR == null)// 不在table中
			{
				var childCtrl = document.all(childCtrlName);
				// alert("tr==null"+childCtrl.name);
				childCtrl.value = "";
				childCtrl.setAttribute("realvalue", "");
				// 并且相应的文本控件也置空
				textCtrl = clsDynamicSelect$getCodeNameCtrl(childCtrl, oTR);

			} else// 在table 针对多行的情况 name可能出现重名 因此必须是同一行的才清除
			{
				// var oCtrl = findIdInTR( oTR, parentkeyctrl );
				var oCtrl = clsDynamicSelect$findCtrlInElementById(oTR,
						"input", childCtrlName);
				// alert(oCtrl.name);
				oCtrl.value = "";
				oCtrl.setAttribute("realvalue", "");
				textCtrl = clsDynamicSelect$getCodeNameCtrl(oCtrl, oTR);

			}
			// 清空名称框
			if (textCtrl != null) {
				textCtrl.value = "";
			}
		}

	}

}

function clsDynamicSelect$getNamedObj(strTagName, currentCtrl) {

	var element = null;
	if (currentCtrl == null) {
		element = event.srcElement;
	} else {
		element = currentCtrl;
	}

	if (element.tagName != null) {
		// 循环查找
		while (element.tagName.toUpperCase() != strTagName) {
			element = element.parentNode;
			if (element == null)// 到顶部 结束循环
			{
				break;
			}
			if (element.tagName == undefined || element.tagName == "") {
				element = null;
				break;
			}
			if (element.tagName.toUpperCase() == "TABLE")// 如果是table则结束循环
			{
				element = null;
				break;
			}
		}
		return element;
	}
	return null;
}
function clsDynamicSelect$ChildHasItem() {

	clsDynamicSelect$initVars();
	if (clsDynamicSelect$privateDom == null)
		return;

	clsDynamicSelect$completeDiv.scrollTop = 0;
	var prikey = event.srcElement.getAttribute("prikey");
	var filter = event.srcElement.getAttribute("filter");
	var outerrelation = event.srcElement.getAttribute("outerrelation");
	var inputValue = event.srcElement.value;
	if (clsDynamicSelect$privateDom == null)
		return;
	var tempDom = clsDynamicSelect$getExsitNode(prikey, filter);
	// = clsDynamicSelect$privateDom.selectSingleNode(
	// "/navi/navi[@prikey='"+prikey+"']" );
	if (outerrelation == "") {
		if (event.srcElement.getAttribute("parentctrl") != "") {
			var prikey = event.srcElement.getAttribute("prikey");
			var parentkeyctrl = event.srcElement.getAttribute("parentctrl");
			var oTR = clsDynamicSelect$getNamedObj("TR", event.srcElement);
			if (oTR == null)// 不在table中
			{

				var tempValue = clsDynamicSelect$getParentCtrlValues(event.srcElement);
				var parentKeyValue = tempValue;
				// var parentKeyValue = document.all( parentkeyctrl
				// ).getAttribute( "realvalue" );
				if (parentKeyValue != "" && parentKeyValue != null) {
					var tempDom = this.selectDom
							.selectSingleNode("//navi[@prikey='" + prikey
									+ "' and @parentkey='" + parentKeyValue
									+ "']");
					if (tempDom != null && tempDom.childNodes.length != 0) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}

			} else {
				// var oCtrl = findIdInTR( oTR, parentkeyctrl );

				var tempValue = clsDynamicSelect$getParentCtrlValuesInTR(
						event.srcElement, oTR);
				var parentKeyValue = tempValue;
				if (parentKeyValue != "" && parentKeyValue != null) {
					var inputValue = event.srcElement.value;
					var tempDom = clsDynamicSelect$getExsitNode(prikey, filter);
					tempDom = tempDom.selectSingleNode("navi[@prikey='"
							+ prikey + "' and @parentkey='" + parentKeyValue
							+ "']");
					// clsDynamicSelect$privateDom.selectSingleNode(
					// "//navi[@prikey='"+prikey+"' and
					// @parentkey='"+parentKeyValue+"']" );
					if (tempDom != null && tempDom.childNodes.length != 0) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}

		} else {
			if (tempDom != null && tempDom.childNodes.length != 0) {
				return true;
			} else {
				return false;
			}
		}
	} else {
		var parentKeyValue = document.all(outerrelation)
				.getAttribute("realvalue");
		var inputValue = event.srcElement.value;
		var tempDom = clsDynamicSelect$getExsitNode(prikey, filter);
		tempDom = tempDom.selectSingleNode("navi[@prikey='" + prikey
				+ "' and @parentkey='" + parentKeyValue + "']");
		if (tempDom != null && tempDom.childNodes.length != 0) {
			return true;
		} else {
			return false;
		}
	}

}

// ---------------------------------------

function clsDynamicSelect$test() {
	var i = 1;

}