document
		.write('<script language="javascript" src="/ims/static/js/tax/prototype.js"></script>');
document
		.write('<script language="javascript" src="/ims/static/js/tax/ext-all.js"></script>');
document
		.write('<script language="javascript" src="/ims/static/js/tax/ext-lang-zh_CN.js"></script>');
document
		.write('<script language="javascript" src="/ims/static/js/tax/tool/dialogtool.js"></script>');
document
		.write('<script language="javascript" src="/ims/static/js/tax/tool/appserver.js"></script>');
document
		.write('<script language="javascript" src="/ims/static/js/tax/tool/public.js"></script>');
document
		.write('<script language="javascript" src="/ims/static/js/tax/tool/clsDynamicSelect.js"></script>');
document
		.write('<script language="javascript" src="/ims/static/js/tax/tool/datetool.js"></script>');
document
		.write('<script language="javascript" src="/ims/static/js/tax/tool/common.js"></script>');
document
		.write('<script language="javascript" src="/ims/static/js/tax/tool/print.js"></script>');

document
		.write('<OBJECT id="WebBrowser" height="0" width="0" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>');

var COMMERRORMSG = "后台处理失败!";
var proMessageWin = null;
var proMessageCxWin = null;
var qynsrKkQr_MessageWin = null;
var zrrWykkQr_MessageDiv = null;

function showBbzt(ztCode) {
	switch (trim(ztCode)) {
		case "0" :
			return "已暂存";
			break;
		case "1" :
			return "已提交";
			break;
		case "2" :
			return "已迁移";
			break;
		case "3" :
			return "审核通过";
			break;
		case "4" :
			return "审核不通过";
			break;
		case "5" :
			return "审核中";
			break;
		case "6" :
			return "待处理";
			break;
		case "7" :
			return "未入库";
			break;
		case "9" :
			return "部分入库";
			break;
		case "a" :
			return "已入库";
			break;
		case "8" :
			return "迁移中";
			break;
		case "b" :
			return "部分作废";
			break;
		case "c" :
			return "作废";
			break;
		case "d" :
			return "扣款中";
			break;
		case "e" :
			return "扣款成功";
			break;
		case "f" :
			return "待处理";
			break;
		case "g" :
			return "扣款成功-已迁移";
			break;
		case "h" :
			return "扣款中—迁移中";
			break;
		case "i" :
			return "扣款成功-迁移中";
			break;
		case "j" :
			return "扣款失败";
			break;
		case "k" :
			return "扣款失败—已迁移";
			break;
		case "l" :
			return "扣款失败-迁移中";
			break;
		case "m" :
			return "扣款成功-待确认";
			break;
		case "n" :
			return "扣款成功-待确认(迁移中)";
			break;
		case "o" :
			return "扣款成功-待确认(已迁移)";
			break;
		case "p" :
			return "审核通过(网银)";
			break;
		case "q" :
			return "对账成功(网银)";
			break;
		default :
			return "状态错误";
			break;
	}
}

function isYqy(ztCode) {
	if (ztCode != null) {
		if (ztCode == "2") {
			return true;
		}
	}
	return false;
}

function caSetValue(data) {
	try {
		// var data = escape(data);
		var flag = $('signerx').PKCS1(data, "sha1");
	} catch (e) {
		try {
			var comActiveX = new ActiveXObject("SignerX.FormSigner.1");
			alert("您的补丁为老版本，请返回首页下载最新的(E-sign090205.exe)补丁");
		} catch (e) {
			alert("1 首先确认您的补丁是否已正确安装" + '\n' + '2 降低您的IE浏览器级别\n'
					+ '3 如以上不能解决，请联系CA客服：025-83393888');
		}
	}
	if (flag != 0) {
		alert($('signerx').GetErrorString(flag));
		return false;
	}
	$('caVO.str_signature').value = $('signerx').SXSignature;
	$('caVO.str_certificate').value = $('signerx').SXCertificate;
	return true;
}

function AutoVO(text, content, parentCode) {
	this.text = text;
	this.content = content;
	if (parentCode == null) {
		this.parentCode = "";
	} else {
		this.parentCode = parentCode;
	}
}

function pageCofig() {
	this.headRow = 1;
	this.sbbname = "";
}

var pageInfo = new pageCofig();

function checkYssr(mustvalue, checkvlaue, mes) {
	if (mes == null) {
		mes = "请填写应税收入!";
	}
	var bqyingjsejeArr = $ES(mustvalue);
	var yssrjeArr = $ES(checkvlaue);
	for (var i = 0; i < bqyingjsejeArr.length; i++) {
		if (!bqyingjsejeArr[i].value.empty()) {
			if (trim(yssrjeArr[i].value).empty()) {
				iconDialog(mes, 'WARNING', function() {
							if (yssrjeArr[i].readOnly == false) {
								yssrjeArr[i].focus();
							}
							yssrjeArr[i].style.background = "red";
						});
				return false;
			} else {
				yssrjeArr[i].style.background = "#FFFFFF";
			}
		}
	}
	return true;
}

function checkSbData(mustvalue, checkvlaueArr, mes) {
	var mustvalueArr = $ES(mustvalue);
	var empFlag = true;
	for (var i = 0; i < mustvalueArr.length; i++) {
		if (!mustvalueArr[i].value.empty()) {
			for (var j = 0; j < checkvlaueArr.length; j++) {
				if (trim($ES(checkvlaueArr[j])[i].value).empty()) {
					iconDialog(mes[j], 'WARNING', function() {
								if ($ES(checkvlaueArr[j])[i].readOnly == false) {
									$ES(checkvlaueArr[j])[i].focus();
								}
								$ES(checkvlaueArr[j])[i].style.background = "red";
							});
					return false;
				} else {
					$ES(checkvlaueArr[j])[i].style.background = "#FFFFFF";
				}
			}
			empFlag = false;
		}
	}
	if (empFlag) {
		iconDialog('请填写申报数据!', 'WARNING');
		return false;
	}
	return true;
}

function fzYhNull(filedArr) {
	var sbje = 0;
	try {
		for (var i = 0; i < filedArr.length; i++) {
			for (var j = 0; j < $ES(filedArr[i]).length; j++) {
				sbje = sbje + parseFloat(emptyToZ($ES(filedArr[i])[j].value));
			}
		}

		if (sbje > 0 && nsryhzh.empty()) {
			iconDialog('非零申报时必须有银行帐号信息!', 'WARNING');
			return false;
		}
		if (sbje > 0 && nsryhzh == "null") {
			iconDialog('非零申报时必须有银行帐号信息!', 'WARNING');
			return false;
		}
		if (sbje > 0 && nsryhzh == "") {
			iconDialog('非零申报时必须有银行帐号信息!', 'WARNING');
			return false;
		}
	} catch (e) {
		iconDialog(e.message, 'ERROR');
		return false;
	}
	return true;
}

function openMsgWindow() {
	if ($("proMessageDiv").innerHTML == "") {
		iconDialog('没有可查看的信息!');
	} else {
		proMessageCxWin = new Ext.Window({
					width : 550,
					height : 520,
					title : '信息提示',
					closeAction : 'hide',
					closable : false,
					modal : true,
					layout : "fit",
					items : new Ext.Panel({
								contentEl : 'proMessageDiv'
							}),
					buttons : [{
								text : '关闭',
								scope : this,
								handler : function() {
									proMessageCxWin.hide();
								}
							}]
				});
		proMessageCxWin.show();
	}
}

function runMsg(bbzt, cwbbFlag, formname, fblb) {
	if (!trim($F('sucessMsg')).empty()) {
		iconDialog($F('sucessMsg'), 'INFO', function() {
					if (bbzt != null) {
						$('bbzt').value = bbzt;
					} else {
						$('bbzt').value = "1";
					}
					readText(cwbbFlag);
				});
	} else if (!$F('errorMessage').empty()) {
		iconDialog($F('errorMessage'), 'ERROR');
	} else if (!$F('proMessage').empty()) {
		$("proMessageDiv").innerHTML = toProMesHTML();
		proMessageWin = new Ext.Window({
					width : 550,
					height : 520,
					title : '信息提示',
					closeAction : 'hide',
					closable : false,
					modal : true,
					layout : "fit",
					items : new Ext.Panel({
								contentEl : 'proMessageDiv'
							}),
					buttons : [{
						text : '提交',
						scope : this,
						handler : function() {
							if (parseInt($F("qzlJyCount")) > 0) {
								iconDialog("共有" + $F("qzlJyCount")
												+ "条强制类校验未通过,不允许提交!", "WARNING");
								return;
							}
							proMessageWin.hide();
							$("proMessage").value = "";
							$("proMessageDiv").innerHTML = "";
							$("nsrQrtjBz").value = "1";
							submitData('yes');
						}
					}, {
						text : '取消',
						scope : this,
						handler : function() {
							proMessageWin.hide();
						}
					}]
				});
		proMessageWin.show();
	} else {
		iconDialog(COMMERRORMSG, 'ERROR');
	}

	try {
		if (formname != null) {
			formname.submit();
		} else {
			if (window.opener != null && window.opener.sbMainForm != null) {
				// 刷新列表窗口
				window.opener.sbMainForm.submit();
			}
			if (window.opener != null && window.opener.opener != null
					&& window.opener.opener.sbMainForm != null) {
				// 刷新列表窗口
				window.opener.opener.sbMainForm.submit();
			}

			if (window.opener != null && window.opener.opener != null
					&& window.opener.opener.opener != null
					&& window.opener.opener.opener.sbMainForm != null) {
				// 刷新列表窗口
				window.opener.opener.opener.sbMainForm.submit();
			}

		}
		if (fblb != null) {
			eval("window.opener." + fblb + ".submit()");
		}

	} catch (e) {

	}
}

function yzsbqk_new(pzxh, url, isZrr) {
	if (pzxh.empty()) {
		iconDialog("请先暂存主表！", "WARNING");
		return;
	}

	waitDialog();
	new Ajax.Request('/WB338JmsAction.do?handleCode=yzsbqk', {
				method : 'post',
				parameters : "pzxh=" + pzxh + "&isZrr=" + isZrr,
				onComplete : function(originalRequest) {
					Ext.MessageBox.hide();
					if (originalRequest.responseText == '1') {
						openMaxWindow(url);
					} else {
						iconDialog("请先暂存主表！", "WARNING");
					}
				},
				onException : function() {
					Ext.MessageBox.hide();
					iconDialog('系统异常', 'ERROR');
				}
			});
}
// 数组顺序pzxh, ybtse, bbzt, formname, fblb,pzzldm
function runMsgKk(arrayObj) {
	if (!trim($F('sucessMsg')).empty()) {
		if (typeof(arrayObj[2]) != "undefined" || arrayObj[2] != undefined
				|| null != arrayObj[2] || "" != arrayObj[2]) {
			$('bbzt').value = arrayObj[2];
		} else {
			$('bbzt').value = "1";
		}

		var pzzlDm
		if (typeof(arrayObj[5]) != "undefined" || arrayObj[5] != undefined
				|| null != arrayObj[5] || "" != arrayObj[5]) {
			pzzlDm = arrayObj[5];
		} else {
			pzzlDm = 0
		}
		readText();
		if (wsbs_kkbj == '1') {
			if (parseFloat(arrayObj[1]) > 0) {
				$("qynsrKkQr_MessageDiv").innerHTML = '<p algin="center"><font size=3><b>&nbsp;&nbsp;提交成功!</b></font></p><br/><table width="98%" align="center" border="1" style="background-color: #FFFFFF;" cellpadding="0" cellspacing="0" bordercolor="#505050" style=" border-collapse:collapse;">'
						+ '<tr> <td align="center" bgcolor="#ededed" style="font-size: 12px">纳税人识别号：</td><td align="center" style="font-size: 12px">'
						+ nsrsbh
						+ ' </td></tr> '
						+ '<tr> <td align="center" bgcolor="#ededed" style="font-size: 12px">纳税人名称：</td><td align="center" style="font-size: 12px">'
						+ nsrmc
						+ ' </td></tr> '
						+ '<tr> <td align="center" bgcolor="#ededed" style="font-size: 12px">开户行：</td><td align="center" style="font-size: 12px">'
						+ yhmc
						+ '</td></tr> '
						+ '<tr> <td align="center" bgcolor="#ededed" style="font-size: 12px">账号：</td><td align="center" style="font-size: 12px">'
						+ nsryhzh
						+ ' </td></tr> '
						+ '<tr> <td align="center" bgcolor="#ededed" style="font-size: 12px">本次应缴纳税额为：</td><td align="center" style="font-size: 12px"><font color="red">'
						+ arrayObj[1]
						+ '</font>元</td></tr> '
						+ '<tr> <td align="left" colspan="2" style="font-size:12px">友情提示:</td></tr> '
						+ '<tr> <td align="left" colspan="2" style="font-size:12px">如不及时缴纳税款,逾期将加收滞纳金并根据《中华人民共和国税收征收管理法》<br/>第六十二条的有关规定,税务机关将责令限期改正,并按照规定依法对你单位进行政处罚!</td></tr></table>';
				qynsrKkQr_MessageWin = new Ext.Window({
					width : 550,
					height : 320,
					title : '信息提示',
					closable : false,
					modal : true,
					layout : "fit",
					items : new Ext.Panel({
								contentEl : 'qynsrKkQr_MessageDiv'
							}),
					buttons : [{
						text : '发起扣款',
						scope : this,
						iconCls : "rmb",
						handler : function() {
							openModalDialog(
									"/WBkkAction.do?handleCode=initForm&pzXh="
											+ arrayObj[0] + "&ybtseHj="
											+ arrayObj[1] + "&pzzlDm=" + pzzlDm,
									"850px", "550px");
							qynsrKkQr_MessageWin.destroy();
						}
					}, {
						text : '暂不扣款',
						scope : this,
						iconCls : "close",
						handler : function() {
							qynsrKkQr_MessageWin.destroy();
							iconDialog("您选择了暂不扣款，税务机关将直接从您的签约账户发起扣款。", 'INFO');
						}
					}]
				});
				qynsrKkQr_MessageWin.show();
				// openModalDialog("/WBkkAction.do?handleCode=initForm&pzXh="
				// + arrayObj[0] + "&ybtseHj=" + arrayObj[1]
				// + "&pzzlDm=" + pzzlDm, "850px", "550px");

			} else {
				iconDialog($F('sucessMsg'), 'INFO');
			}
		} else {
			iconDialog($F('sucessMsg'), 'INFO');
		}

	} else if (!$F('errorMessage').empty()) {
		iconDialog($F('errorMessage'), 'ERROR');
	} else if (!$F('proMessage').empty()) {
		$("proMessageDiv").innerHTML = toProMesHTML();
		proMessageWin = new Ext.Window({
					width : 550,
					height : 520,
					title : '信息提示',
					closeAction : 'hide',
					closable : false,
					modal : true,
					layout : "fit",
					items : new Ext.Panel({
								contentEl : 'proMessageDiv'
							}),
					buttons : [{
						text : '提交',
						scope : this,
						handler : function() {
							if (parseInt($F("qzlJyCount")) > 0) {
								iconDialog("共有" + $F("qzlJyCount")
												+ "条强制类校验未通过,不允许提交!", "WARNING");
								return;
							}
							proMessageWin.hide();
							$("proMessage").value = "";
							$("proMessageDiv").innerHTML = "";
							$("nsrQrtjBz").value = "1";
							submitData('yes');
						}
					}, {
						text : '取消',
						scope : this,
						handler : function() {
							proMessageWin.hide();
						}
					}]
				});
		proMessageWin.show();
	} else {
		iconDialog(COMMERRORMSG, 'ERROR');
	}
	sbMainPageRe(arrayObj[3], arrayObj[4]);
}

function sbMainPageRe(formname, fblb) {
	try {
		if (typeof(formname) != "undefined" && null != formname
				&& "" != formname && formname != undefined) {
			formname.submit();
		} else {
			if (window.opener != null && window.opener.sbMainForm != null) {
				// 刷新列表窗口
				window.opener.sbMainForm.submit();
			}
			if (window.opener != null && window.opener.opener != null
					&& window.opener.opener.sbMainForm != null) {
				// 刷新列表窗口
				window.opener.opener.sbMainForm.submit();
			}

			if (window.opener != null && window.opener.opener != null
					&& window.opener.opener.opener != null
					&& window.opener.opener.opener.sbMainForm != null) {
				// 刷新列表窗口
				window.opener.opener.opener.sbMainForm.submit();
			}

		}
		if (typeof(fblb) != "undefined" && null != fblb && "" != fblb
				&& undefined != fblb) {
			eval("window.opener." + fblb + ".submit()");
		}
	} catch (e) {

	}
}

// 数组顺序pzxh, ybtse, ddly,bbzt, formname, fblb
function runMsgWykk(arrayObj) {
	if (!trim($F('sucessMsg')).empty()) {
		if (typeof(arrayObj[3]) != "undefined" || arrayObj[3] != undefined
				|| null != arrayObj[3] || "" != arrayObj[3]) {
			$('bbzt').value = arrayObj[3];
		} else {
			$('bbzt').value = "1";
		}
		readText();
		if (wsbs_wykkbj == '1') {
			if (parseFloat(arrayObj[1]) > 0) {
				$("zrrWykkQr_MessageDiv").innerHTML = '<p algin="center"><font size=3><b>&nbsp;&nbsp;提交成功!</b></font></p><br/><table width="98%"  align="center" border="1" style="background-color: #FFFFFF;" cellpadding="0" cellspacing="0" bordercolor="#505050"  style=" border-collapse:collapse;">'
						+ '<tr>	<td align="center" bgcolor="#ededed" style="font-size: 12px" width="40%">纳税人名称：</td><td align="center" style="font-size: 12px">'
						+ zrr_nsrmc
						+ ' </td></tr> '
						+ '<tr>	<td align="center" bgcolor="#ededed" style="font-size: 12px">本次应缴纳税额为：</td><td align="center" style="font-size: 12px"><font color="red">'
						+ arrayObj[1]
						+ '</font>元</td></tr> '
						+ '<tr>	<td align="left"  colspan="2" style="font-size: 12px">友情提示:</td></tr> '
						+ '<tr>	<td align="left"  colspan="2" style="font-size: 12px">&nbsp;&nbsp;如不及时缴纳税款,逾期将加收滞纳金并根据《中华人民共和国税收征收管理法》<br/>第六十二条的有关规定,税务机关将责令限期改正,并按照规定依法对你个人进行行政处罚!</td></tr></table> ';
				zrrWykkQr_MessageDiv = new Ext.Window({
					width : 550,
					height : 320,
					title : '信息提示',
					closable : false,
					modal : true,
					layout : "fit",
					items : new Ext.Panel({
								contentEl : 'zrrWykkQr_MessageDiv'
							}),
					buttons : [{
						text : '网银扣款',
						scope : this,
						iconCls : "rmb",
						handler : function() {
							// openModalDialog(
							// "/WB_wykkAction.do?handleCode=createZrrOrder&PZ_XH="
							// + arrayObj[0], "850px",
							// "550px");
							// zrrWykkQr_MessageDiv.destroy();
							window.location.href = "/WBwykkAction.do?handleCode=createZrrOrder&ddLy="
									+ arrayObj[2] + "&pzXh=" + arrayObj[0];

						}
					}, {
						text : '暂不扣款',
						scope : this,
						iconCls : "close",
						handler : function() {
							zrrWykkQr_MessageDiv.destroy();
							iconDialog("您选择了暂不扣款，税务机关将直接从您的签约账户发起扣款。", 'INFO');
						}
					}]
				});
				zrrWykkQr_MessageDiv.show();

			} else {
				iconDialog($F('sucessMsg'), 'INFO');
			}
		} else {
			iconDialog($F('sucessMsg'), 'INFO');
		}

	} else if (!$F('errorMessage').empty()) {
		iconDialog($F('errorMessage'), 'ERROR');
	} else {
		iconDialog(COMMERRORMSG, 'ERROR');
	}
	zrrsbMainPageRe(arrayObj[4], arrayObj[5]);
}

function zrrsbMainPageRe(formname, fblb) {
	try {
		if (typeof(formname) != "undefined" && null != formname
				&& "" != formname && formname != undefined) {
			formname.submit();
		} else {
			if (window.opener != null && window.opener.zrrsbMainForm != null) {
				// 刷新列表窗口
				window.opener.zrrsbMainForm.submit();
			}
			if (window.opener != null && window.opener.opener != null
					&& window.opener.opener.zrrsbMainForm != null) {
				// 刷新列表窗口
				window.opener.opener.zrrsbMainForm.submit();
			}
		}
		if (typeof(fblb) != "undefined" && null != fblb && "" != fblb
				&& undefined != fblb) {
			eval("window.opener." + fblb + ".submit()");
		}
	} catch (e) {

	}
}
// 判断网银扣款后续操作
function pdWykkHxcz(_je) {
	var action;
	if (parseFloat(_je) <= 0) {
		action = 'a';
		confirmDialog("本张申报表合计税额为" + caltbNumloop(_je, 2) + ",是否确认提交申报数据?",
				submitData);

	} else {
		// 如果没有银行帐号
		if (zrr_yhzh == '' || zrr_yhzh == 'null' || zrr_yhzh == null) {
			// 没有开通网银的地区
			if (wsbs_wykkbj != '1') {
				iconDialog('由于您没有银行账号，且您所在地区未开通网银扣款，不允许进行有税申报！', 'ERROR');
				return;
			} else {
				// 开通网银的地区
				action = 'b';
				confirmDialog(
						"本张申报表合计额为" + caltbNumloop(_je, 2) + ",是否进行网银缴款?",
						submitData);
			}
		} else {
			// 如果有银行帐号
			if (wsbs_wykkbj != '1') {
				// 如果没有开通网银
				action = 'a';
				confirmDialog("本张申报表合计税额为" + caltbNumloop(_je, 2)
								+ ",是否确认提交申报数据?", submitData);
			} else {
				action = 'c';
				confirmDialog("本张申报表合计税额为" + caltbNumloop(_je, 2)
								+ ",是否确认提交申报数据?", submitData);
			}
		}
	}
	return action;
}