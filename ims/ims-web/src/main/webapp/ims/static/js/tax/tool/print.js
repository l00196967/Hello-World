function changeBodySize(str) {
	document.body.style.zoom = str;
}
function printSelChange(obj) {
	if (obj.value == "zdy") {
		$('zdypinttxt').value = "";
		$('zdypinttxt').show();
		$('printspan').show();
		return;
	} else {
		$('zdypinttxt').hide();
		$('printspan').hide();
		changeBodySize(obj.value);
	}
}

function printTxtChange(obj) {
	if (event.keyCode == 13) {
		if (trim(obj.value).empty()) {
			return;
		}
		if (obj.value.length == 1) {
			changeBodySize("0.0" + obj.value);
		} else if (obj.value.length == 2) {
			changeBodySize("0." + obj.value);
		} else {
			changeBodySize("1");
		}
	}
}
function jsprint(flag) {
	try {
		if (flag == "1") {
			if (factory.printing == undefined) {
				// pagesetup_null();
				document.all.WebBrowser.ExecWB(6, 6);
			} else {
				factory.printing.Print(false);
			}
		} else if (flag == "2") {
			if (factory.printing == undefined) {
				document.all.WebBrowser.ExecWB(7, 1);
			} else {
				factory.printing.Preview();
			}
		}
	} catch (e) {
		alert(e.message);
		// iconDialog('请检查是否正确安装打印控件', 'WARNING');
	}
}

function beforeprint(prinArr) {
	if ($("noprint") != null) {
		$("noprint").hide();
	}
	if (prinArr != null) {
		for (var i = 0; i < prinArr.length; i++) {
			if ($(prinArr[i]) != null) {
				$(prinArr[i]).hide();
			}
		}
	}
}

function afterprint(prinArr) {
	if ($("noprint") != null) {
		$("noprint").show();
	}
	if (prinArr != null) {
		for (var i = 0; i < prinArr.length; i++) {
			if ($(prinArr[i]) != null) {
				$(prinArr[i]).show();
			}
		}
	}
}

function doprint(flag, prinArr, portrait, pageSize) {
	try {
		if (pageSize != null) {
			if (document.body.style.zoom == 1 || document.body.style.zoom == "") {
				document.body.style.zoom = pageSize;
			}
		}

		if (flag == "3") {
			// 打印设置
			if (factory.printing == undefined) {
				document.all.WebBrowser.ExecWB(8, 1);
			} else {
				factory.printing.PageSetup();
			}
			return;
		}

		if (factory.printing != undefined) {
			factory.printing.header = "";
			factory.printing.footer = "";
			factory.printing.topMargin = 0.00;
			factory.printing.bottomMargin = 0.00;
			factory.printing.leftMargin = 0.00;
			factory.printing.rightMargin = 0.00;
			if (portrait == null) {
				factory.printing.portrait = 0;
			} else {
				factory.printing.portrait = portrait;
			}
		}

		// 设置打印页数需要花钱买
		// factory.printing.copies = 3;
		if (typeof(zdyBeforeprint) == "function") {
			zdyBeforeprint(prinArr);
		}
		beforeprint(prinArr);
		jsprint(flag);
		afterprint(prinArr);
		document.body.style.zoom = 1;
		if (typeof(zdyAfterprint) == "function") {
			zdyAfterprint(prinArr);
		}
	} catch (e) {
		document.body.style.zoom = 1;
		alert(e.message);
		// iconDialog('请检查是否正确安装打印控件', 'WARNING');
	}
}