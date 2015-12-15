/*******************************************************************************
 * 日期时间工具类
 *
 * @author yangxi
 * @version 1.0
 * @since
 ******************************************************************************/
var dayarray = new Array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
var montharray = new Array("", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月",
		"九月", "十月", "十一月", "十二月");

function showNowTime() {
	setInterval("setTimeValue()", 1000);
}

function setTimeValue() {
	var cdate = getNowDateStr('ALL');
	$('clock').innerHTML = cdate;
}

function getNowDateStr(n) {
	var mydate = new Date();
	var year = mydate.getYear();
	if (year < 1000) {
		year += 1900
	}
	if (n == "Y") {
		return year;
	}
	var day = mydate.getDay();
	var month = mydate.getMonth() + 1;
	if (month <= 9) {
		month = "0" + month;
	}
	var daym = mydate.getDate();
	if (daym < 10) {
		daym = "0" + daym;
	}
	var hours = mydate.getHours();
	var minutes = mydate.getMinutes();
	var seconds = mydate.getSeconds();
	var dn = "上午"
	if (hours >= 12) {
		dn = "下午";
	}
	if (hours > 12) {
		hours = hours - 12;
	}
	if (hours == 0) {
		hours = 12;
	}
	if (minutes <= 9) {
		minutes = "0" + minutes;
	}
	if (seconds <= 9) {
		seconds = "0" + seconds
	}
	switch (n) {
		case 'MM' :
			return month;
		case 'MMZ' :
			return montharray[month];
		case 'DD' :
			return daym;
		case 'DA' :
			return dayarray[day];
		case 'YYYY-MM' :
			return year + "-" + month;
		case 'YYYY-MM-DD' :
			return year + "-" + month + "-" + daym;
		case 'YYYY/MM/DD' :
			return year + "-" + month + "-" + daym;
		case 'YYYY年MM月DD日' :
			return year + "年" + month + "月" + daym + "日";
		case 'YYYY-MM-DD HH:MI:SS' :
			return year + "-" + month + "-" + daym + " " + hours + ":"
					+ minutes + ":" + seconds + " ";
		case 'HH:MI:SS' :
			return hours + ":" + minutes + ":" + seconds + " ";
		case 'DN' :
			return dn;
		case 'ALL' :
			if (month.substr(0, 1) == "0") {
				month = month.substr(1, 1);
			}
			return dayarray[day] + ", " + montharray[month] + daym + "号,"
					+ year + "年" + hours + ":" + minutes + ":" + seconds + " "
					+ dn;
	}

}

function getSubDays(dateF, dateS) {
	var SecondADay = 24 * 60 * 60 * 1000;
	var dFirstDay = getDateByStr(dateF);
	var dSecondDay = getDateByStr(dateS);
	var days;
	if (dFirstDay == null || dSecondDay == null)
		return 0;
	else
		days = SYS_BeFloat((dSecondDay - dFirstDay) / SecondADay);
	return days;
}

function SYS_BeFloat(objValue) {
	var nResult1 = 0;
	var oArray1;
	var sTemp1 = "";
	if (objValue == null) {
		return nResult1;
	}
	if (typeof(objValue) == "number") {
		return objValue;
	}
	if (objValue.indexOf(",") == -1) {
		nResult1 = parseFloat(objValue);
		if (isNaN(nResult1)) {
			nResult1 = 0;
		}
	} else {
		oArray1 = objValue.split(",");
		for (var i = 0; i < oArray1.length; i++) {
			sTemp1 = sTemp1 + oArray1[i];
		}
		nResult1 = parseFloat(sTemp1);
	}
	return nResult1;
}

function getDateByStr(str) {
	var strLen = str.length;
	if (strLen == 0) {
		return null;
	}
	var splitStr = "";
	var yy = "";
	var mm = "";
	var dd = "";
	try {
		var splitType = str.indexOf("-", 0);
		if (splitType != -1) {
			splitStr = "-";
		} else {
			splitStr = "/";
		}
		yy = str.substring(0, 4);
		switch (strLen) {
			case 8 :
				mm = str.substring(5, 6);
				dd = str.substring(7, 8);
				break;
			case 9 :
				if (str.substring(5, 7).indexOf(splitStr) != -1) {
					mm = str.substring(5, 6);

				} else {
					mm = str.substring(5, 7);
				}
				if (str.substring(7, 9).indexOf(splitStr) != -1) {
					dd = str.substring(7, 9);
				} else {
					dd = str.substring(8, 9);
				}
				break;
			case 10 :
				mm = str.substring(5, 7);
				dd = str.substring(8, 10);
				break;
		}
		var retDate = new Date(yy, mm, dd);
		return retDate;
	} catch (e) {
		alert(e.description);
		return null;
	}
}

function GetlastDay(iYear, iMonth) {
	var iYear = parseInt(iYear, 10);
	var iMonth = parseInt(iMonth, 10);
	var sDay = 31;
	if ((iMonth == 4 || iMonth == 6 || iMonth == 9 || iMonth == 11)
			&& sDay == 31) {
		sDay = 30;
	}
	if (iMonth == 2) {
		if (IsLeapYear(iYear)) {
			sDay = 29;
		} else {
			sDay = 28;
		}
	}
	return sDay;
}

function IsLeapYear(iYear) {
	if (iYear + "" == "undefined" || iYear + "" == "null" || iYear + "" == "") {
		return false;
	}
	iYear = parseInt(iYear);
	var isValid = false;
	if ((iYear % 4 == 0 && iYear % 100 != 0) || iYear % 400 == 0) {
		isValid = true;
	}
	return isValid;
}