var arrayObj = new Array();
Ext.BLANK_IMAGE_URL = './public/images/s.gif';
Ext.onReady(function() {
	try {
		var tb = new Ext.Toolbar({
			renderTo : "toolbar",
			items : ['-', '->', {
						text : "上传",
						iconCls : "up",
						id : "UploadBtn",
						handler : function() {
							upload();
						},
						scope : this
					}, '-', {
						text : "提交",
						iconCls : "submit",
						id : "submitBtn",
						handler : function() {
							showSubmitDialog();
						},
						scope : this
					}, '-', {
						text : "打印",
						id : "printBtn",
						iconCls : "print",
						handler : function() {
							$("handleCode").value = "printPage";
							openMaxWindow("/wb_DkdjptUpLoadAction.do?handleCode=printPage&PZ_XH="
									+ $F('pzxh'));
						},
						scope : this
					}, '-', {
						text : "关闭",
						iconCls : "close",
						handler : function() {
							window.close();
						},
						scope : this
					}]
		});
		initPage();
	} catch (e) {

	}
});

function initPage() {
	maxPage();
	if (!trim($F('errorMessage')).empty()) {
		iconDialog($F('errorMessage'), 'ERROR', function() {
					$('errorMessage').value = "";
				});
	} else {
		if (!trim($F('sucessMsg')).empty()) {
			if (window.opener != null && window.opener.sbMainForm != null) {
				window.opener.sbMainForm.submit();
			}
			if ($F('sucessMsg') == "提交成功!") {
				arrayObj.push($F("pzxh"));
				arrayObj.push(caltbNumloop($("sbje").value, 2));
				runMsgKk(arrayObj);
			} else {
				iconDialog($F('sucessMsg'), 'INFO');
			}
		}
	}
	readText();
}

/**
 * 确认提交
 */
function showSubmitDialog() {
	if (!bascicCheck()) {
		return;
	}
	var filedArr = [];
	filedArr.push("ybtseje");
	if (!fzYhNull(filedArr)) {
		return;
	}
	confirmDialog("本张申报表合计税额为" + caltbNumloop(getSbje(), 2) + ",是否确认提交申报数据?",
			iSdoubleSub);
}

function getSbje() {
	var sbje = 0;
	var filedArr = [];
	filedArr.push("ybtseje");
	for (var i = 0; i < filedArr.length; i++) {
		for (var j = 0; j < $ES(filedArr[i]).length; j++) {
			sbje = sbje + parseFloat(emptyToZ($ES(filedArr[i])[j].value));
		}
	}
	$("sbje").value = sbje;
	return sbje;
}

/**
 * 提示重复申报
 */
function iSdoubleSub(button) {
	if (button == "yes") {
		$("handleDesc").value = "判断是否重复申报";
		$("handleCode").value = "pdCfsb";
		waitDialog();
		new Ajax.Request('/wb_DkdjptUpLoadAction.do', {
					method : 'post',
					parameters : "handleCode=pdCfsb&&pzxh=" + $F('pzxh')
							+ "&&ssqs=" + $F('ssqq') + "&&ssqz=" + $F('ssqz'),
					onComplete : function(originalRequest) {
						Ext.MessageBox.hide();
						ajaxUpdate(originalRequest.responseText, "update");
						if ($F("cfsbbh") > 0) {
							confirmDialog("本月或同一税款所属期内已报送过" + $F("cfsbbh")
											+ "张该报表，是否重复申报？", submitData);
						} else {
							submitData("yes");
						}
					},
					onException : function() {
						Ext.MessageBox.hide();
						iconDialog('系统异常', 'ERROR', function() {
									readTextIne();
								});
					}
				});
	}
}

/**
 * 提交
 */
function submitData(button) {
	if (button == "yes") {
		$('sucessMsg').value = "";
		$("handleDesc").value = "提交申报表";
		$('errorMessage').value = "";
		$("handleCode").value = "saveSBxx";
		if (ca == "1") {
			if (!caSetValue(getCaData())) {
				return;
			}
		}
		waitDialog();
		wb_DkdjptUpLoadForm.action = '/wb_DkdjptUpLoadAction.do';
		wb_DkdjptUpLoadForm.target = '_self';
		wb_DkdjptUpLoadForm.submit();
	}
}

/**
 * 基本校验
 */
function bascicCheck() {
	var str = $F('sucessMsg');
	var a = str.split("!");
	if (a[0] != '上传成功') {
		iconDialog('请先上传文件!', 'WARNING');
		return false;
	}
	return true;
}

function uploadfilename() {
	var str = $('file').value;
	var s = str.split('\\');
	return s[s.length - 1];
}

function upload() {
	var a = $("file").value;
	var b = $("file1").value;

	if (a.empty() && b.empty()) {
		iconDialog('请选择上传文件!', 'WARNING');
		return;
	}

	if (!a.empty() && !b.empty()) {
		iconDialog('请选择上传旧版或者新版文件，不能2个一起上传！', 'WARNING');
		return;
	}

	if (!a.empty()) {
		if (!pathCheckDataFile(a)) {
			iconDialog('上传路径错误!', 'WARNING');
			return false;
		}
	}

	if (!b.empty()) {
		if (!pathCheckDataFile(b)) {
			iconDialog('上传路径错误!', 'WARNING');
			return false;
		}
	}

	confirmDialog("是否确认上传申报数据?", function(button) {
				if (button == "yes") {
					if (!a.empty()) {
						$('bb').value = '1';
					} else {
						$('bb').value = '2';
					}
					waitDialog();
					$('sucessMsg').value = "";
					$('errorMessage').value = "";
					$("filename").value = uploadfilename();
					$("handleCode").value = "upload";
					wb_DkdjptUpLoadForm.action = '/wb_DkdjptUpLoadAction.do';
					wb_DkdjptUpLoadForm.target = '_self';
					wb_DkdjptUpLoadForm.submit();
				}
			});

}

function getCaData() {
	var data = "";
	for (var i = 0; i < $ES('zspmdm').length; i++) {
		// 税费所属期起
		data = data + $F('ssqq') + "=";
		// 税费所属期止
		data = data + $F('ssqz') + "=";
		// 所得项目代码
		data = data + $ES('zspmdm')[i].value + "=";
		// 收入额合计
		data = data + $ES('hzsreje')[i].value + "=";
		// 应纳税所得额
		data = data + $ES('hzynssdeje')[i].value + "=";
		// 补（退）扣缴所得税额
		data = data + $ES('hzybtseje')[i].value + "--";
	}
	return data;
}