////////////////////////////////公共事件类模块///////////////////////////////////////
var  myPage$functionid="";
function clsPublicFunction()
{
	this.getDom	    = clsPublicFunction$getDom;
//	this.insertRow	= clsPublicFunction$insertRow;
	this.getDBDom	= clsPublicFunction$getDBDom;
	this.addoOption	= clsPublicFunction$addoOption;
	this.deleteRow	= clsPublicFunction$deleteRow;
	this.emptyObject= clsPublicFunction$emptyObject;
	this.getRow		= clsPublicFunction$getRow;
	this.DomToString= clsPublicFunction$DomToString;
	this.getNamedObj= clsPublicFunction$getNamedObj;
	this.setObjectDisabled = clsPublicFunction$setObjectDisabled;
}

//设置Disabled属性
function clsPublicFunction$setObjectDisabled()
{
	//TEXT RADIO PASSWORD HIDDEN CHECKBOX
	var objList = document.getElementsByTagName("INPUT");
	for (var i=0;i<objList.length;i++){
		if (objList[i].type.toUpperCase()!="BUTTON") {
			if (objList[i].getAttribute("prikey")!=null) {
				//dynamicSelect or  dynamicSelectTree
				objList[i].onfocus = "";
			}
			objList[i].setAttribute("readOnly",true);
			objList[i].disabled = true;
		}else{
				if (objList[i].value=="增行" || objList[i].value=="删行") {
					objList[i].disabled = true;
				}
		}
	}

	var objList = document.getElementsByTagName("SELECT");
	for (var i=0;i<objList.length;i++){
			objList[i].disabled = true;
	}

	var objList = document.getElementsByTagName("TEXTAREA");
	for (var i=0;i<objList.length;i++){
			objList[i].disabled = true;
	}
}
function  clsPublicFunction$createDomObj(){
	var oDom = null;
	var signatures = ["Msxml2.DOMDocument.5.0","Msxml2.DOMDocument.4.0","Msxml2.DOMDocument.3.0","Msxml2.DOMDocument","Microsoft.XmlDom"];
	for(var i=0;i<signatures.length;i++)
	{
		   try
		   {
				  oDom = new ActiveXObject(signatures[i]);
				  return oDom;
		   }
		   catch(e)
		   {
		   }
	}
}

//通过路径或者字符串得到xml对象
function clsPublicFunction$getDom(strPath,strValue)
{
	if(strValue==null || strValue==""){
		strValue="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
        strValue+= "<navi></navi>";

	}
	//alert(strValue);
	var oDom =clsPublicFunction$createDomObj();
	//var oDom	= new ActiveXObject("MSXML2.DOMDocument.5.0");
	oDom.async	= false;
	if (strPath != null)
	{

		oDom.load(strPath) ? oDom : null;
		if (oDom!=null)
		{
			if (oDom.documentElement.getAttribute("state")!=null)
			{
				showAlert(dom);
			}
		}
		return 	oDom==null ? null : oDom;
	}
	else
	{
		oDom.loadXML(strValue) ? oDom : null;

		if(oDom==null){
			oDom=oPublicFunction.getDom(null,"");
		}else{
			if(oDom.xml==""){
				oDom=oPublicFunction.getDom(null,"");
			}
		}
		if (oDom!=null)
		{
			/*if (oDom.documentElement.getAttribute("state")!=null)
			{
				//弹出模态窗体 显示提示信息
				//showAlert(dom);
			}*/
		}
		return 	oDom==null ? null : oDom;
	}
}
//得到数据库中的查询结果（xml对象）
function clsPublicFunction$getDBDom(strSQL)
{
	return xmlSend("../asp/getData.asp", "<a>"+ strSQL +"</a>");
}
//增加一个option对象
function clsPublicFunction$addoOption(oSelectCtrl,strValue,strText,selValue,selText,strAttributeNameArray,strAttributeValueArray)
{
	var oOption = document.createElement("OPTION");
	if (oSelectCtrl != null)
	{
		if (strValue != null)
			oOption.value	= strValue;
		if (strText	!= null)
			oOption.text	= strText;
		if ((strValue == selValue && strValue != null && selValue != null) || (strText == selText && strText != null && selText != null))
			oOption.selected = true;

		if (strAttributeNameArray != null)
		{
			for (var nI=0; nI<strAttributeNameArray.length; nI++)
				oOption.setAttribute(strAttributeNameArray[nI],strAttributeValueArray[nI]);
		}
		oSelectCtrl.add(oOption);
	}
}
//删除表格中的行
function clsPublicFunction$deleteRow(oTable)
{
	for (var nI=oTable.rows.length - 1; nI>=0; nI--)
	{
		if (oTable.rows[nI].style.display == "block")
			oTable.deleteRow(nI);
	}
}
//清空对象内容
function clsPublicFunction$emptyObject(obj)
{
	switch(obj.tagName.toUpperCase())
	{
		case "INPUT":
			switch(obj.type.toUpperCase())
			{
				case "TEXT": case "PASSWORD": case "HIDDEN":
					 obj.value = "";
					 break;
				case "RADIO": case "CHECKBOX":
					 obj.checked = false;
					 break;
				default:
					obj.value = "";
					break;
			}
			break;
		case "LABEL":
			obj.innerText = "";
			break;
		case "SELECT":
			obj.innerHTML = "";
			break;
		case "TABLE":
			this.deleteRow(obj);
			break;
		case "TEXTAREA":
			obj.value = "";
			break;
		default:
			obj.innerText = "";
			break;
	}
}

//得到行对象
function clsPublicFunction$getRow()
{
	var element = event.srcElement;
	if (element.tagName != null)
	{
		while (element.tagName.toUpperCase() != "TR")
		{
			element = element.parentNode;
			if (element == null)
				break;
		}
		return element;
	}
	return null;
}

//得到指定对象//2006/08修改
function clsPublicFunction$getNamedObj(strTagName)
{
	var element = event.srcElement;
	if (element.tagName != null)
	{
		while (element.tagName.toUpperCase() != strTagName)
		{
			element = element.parentNode;
			if (element == null)
				break;
			if(element.tagName.toUpperCase()=="HTML")
			{
				element=null;
				break;
			}
		}
		return element;
	}
	return null;
}

//去掉Dom对象中的"<"和">"符号
function clsPublicFunction$DomToString(strValue)
{
	return (strValue != null) ? strValue.replace(/\</g,"&lt;").replace(/\>/g,"&gt;") : null;
}

var oPublicFunction = new clsPublicFunction();
//document.oncontextmenu = function (){return false;} ;
//document.ondragstart   = function (){return false;} ;

function clsPublicFunction$shieldRefesh(){
	var key$Code = event.keyCode;
	if (key$Code=="116" || key$Code=="122") {          //F5 F11
		event.keyCode     = 0;
        event.returnValue = false;
	}
	if (key$Code=="8") {    //<--
		try{
			if ((event.srcElement.tagName.toUpperCase()=="INPUT" && event.srcElement.type.toUpperCase()=="TEXT")||event.srcElement.tagName.toUpperCase()=="TEXTAREA") {
				if (event.srcElement.value.length>0) {
				}else{
					event.keyCode     = 0;
					event.returnValue = false;
				}
			}else{
					event.keyCode     = 0;
					event.returnValue = false;
			}
		}
		catch(e){

		}
	}

}
////////////////////////////////组合xml对象类模块/////////////////////////////////////
function clsComboXML()
{
	this.Dom		= null;
	this.createDom	= clsComboXML$createDom;
	this.createNode	= clsComboNode$createNode;
	this.appendNode	= clsComboXML$appendNode;
}
//其中nameArray为属性名称、valueArray为属性值
function clsComboXML$createDom(strTagName,strText,nameArray,valueArray)
{
	var oDom	= clsPublicFunction$createDomObj();
	oDom.async	= false;
	oDom.loadXML("<"+ strTagName +" />");
	if (nameArray != null)
	{
		for (var nI=0; nI<nameArray.length; nI++)
		{
			oDom.documentElement.setAttribute(nameArray[nI],valueArray[nI]);
		}
	}
	if (strText != null)
		oDom.documentElement.text = strText;
	this.Dom = oDom;

}

//注意：oDom必须有appendChild属性，此事件也可以为一个节点添加一个子节点 2
function clsComboXML$appendNode(oDom,oNode)
{
	oDom.appendChild(oNode);
}

//创建一个节点
function clsComboNode$createNode(oDom,strTagName,strText,nameArray,valueArray)
{
	var oNode	= this.Dom.createElement(strTagName);
	if (nameArray != null)
	{
		for (var nI=0; nI<nameArray.length; nI++)
		{
			oNode.setAttribute(nameArray[nI],valueArray[nI]);
		}
	}
	if (strText != null)
		oNode.text = strText;
	this.appendNode(oDom,oNode);
	return oNode;
}



function ArgumentURL() {
	this.getArgument = _getArg;
	this.setArgument = _setArg;
	this.removeArgument = _removeArg;
	this.toString    = _toString;	//Allows the object to be printed
									//no need to write toString()
	this.arguments   = new Array();

	// Initiation
	var separator = "&";
	var equalsign = "=";

	var str = window.location.search.replace(/%20/g, " ");
	var index = str.indexOf("?");
	var sInfo;
	var infoArray = new Array();

	var tmp;

	if (index != -1) {
		sInfo = str.substring(index+1,str.length);
		infoArray = sInfo.split(separator);
	}

	for (var i=0; i<infoArray.length; i++) {
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
		if(this.arguments[name]==null){
			return  null;
		}
		if (typeof(this.arguments[name].name) != "string")
			return null;
		else
			return this.arguments[name].value;
	}

	function _setArg(name,value) {
		this.arguments[name] = new Object()
		this.arguments[name].name = name;
		this.arguments[name].value = value;
	}

	function _removeArg(name) {
		this.arguments[name] = null;
	}

	return this;
}

var  myPageUrl=ArgumentURL();
myPage$functionid=myPageUrl.getArgument("gn_dm");

