function swap_tab1(n) {
	for (var i = 1; i <= 2; i++) {
		var curC = document.getElementById("tabview1" + i);
		var curB = document.getElementById("tab1" + i);
		if (n == i) {
			curC.style.display = "block";
			curB.className = "li1";
		} else {
			curC.style.display = "none";
			curB.className = "li2";
		}
	}
}

function swap_tab2(n) {
	for (var i = 1; i <= 2; i++) {
		var curC = document.getElementById("tabview2" + i);
		var curB = document.getElementById("tab2" + i);
		if (n == i) {
			curC.style.display = "block";
			curB.className = "li1";
		} else {
			curC.style.display = "none";
			curB.className = "li2";
		}
	}
}

function swap_tab3(n) {
	for (var i = 1; i <= 4; i++) {
		var curC = document.getElementById("tabview3" + i);
		var curB = document.getElementById("tab3" + i);
		if (n == i) {
			curC.style.display = "block";
			curB.className = "li3";
		} else {
			curC.style.display = "none";
			curB.className = "li4";
		}
	}
}

function swap_rm(n) {
	for (var i = 1; i <= 2; i++) {
		var curC = document.getElementById("rmview" + i);
		var curB = document.getElementById("rm" + i);
		if (n == i) {
			curC.style.display = "block";
			curB.className = "li5";
		} else {
			curC.style.display = "none";
			curB.className = "li6";
		}
	}
}

function swap_tz(n) {
	for (var i = 1; i <= 3; i++) {
		var curC = document.getElementById("tzview" + i);
		var curB = document.getElementById("tz" + i);
		if (n == i) {
			curC.style.display = "block";
			curB.className = "tz2";
		} else {
			curC.style.display = "none";
			curB.className = "tz1";

		}
	}
}

function swap_xz(n) {
	for (var i = 1; i <= 3; i++) {
		var curC = document.getElementById("xzview" + i);
		var curB = document.getElementById("xz" + i);
		if (n == i) {
			curC.style.display = "block";
			curB.className = "li5";
		} else {
			curC.style.display = "none";
			curB.className = "li6";
		}
	}
}

function swap_wh(n) {
	for (var i = 1; i <= 4; i++) {
		var curC = document.getElementById("whview" + i);
		var curB = document.getElementById("wh" + i);
		if (n == i) {
			curC.style.display = "block";
			curB.className = "li5";
		} else {
			curC.style.display = "none";
			curB.className = "li6";
		}
	}
}

function swap_dc(n) {
	for (var i = 1; i <= 2; i++) {
		var curC = document.getElementById("dcview" + i);
		var curB = document.getElementById("dc" + i);
		if (n == i) {
			curC.style.display = "block";
			curB.className = "li5";
		} else {
			curC.style.display = "none";
			curB.className = "li6";
		}
	}
}

function swap_fc(n) {
	for (var i = 1; i <= 2; i++) {
		var curC = document.getElementById("fcview" + i);
		var curB = document.getElementById("fc" + i);
		if (n == i) {
			curC.style.display = "block";
			curB.className = "li5";
		} else {
			curC.style.display = "none";
			curB.className = "li6";
			}
		}
	}

function swap_page(n) {
	for (var i = 1; i <= 2; i++) {
		var curC = document.getElementById("pageview" + i);
		var curB = document.getElementById("page" + i);
		var curD = document.getElementById("nub" + i);
		if (n == i) {
			curC.style.display = "block";
			curD.style.display = "block";
		} else {
			curC.style.display = "none";
			curD.style.display = "none";
			}
		}
	}

function swap_page1(n) {
	for (var i = 1; i <= 2; i++) {
		var curC = document.getElementById("pageview1" + i);
		var curB = document.getElementById("page1" + i);
		var curD = document.getElementById("num" + i);
		if (n == i) {
			curC.style.display = "block";
			curD.style.display = "block";
		} else {
			curC.style.display = "none";
			curD.style.display = "none";
			}
		}
	}

function swap_page2(n) {
	for (var i = 1; i <= 2; i++) {
		var curC = document.getElementById("pageview2" + i);
		var curB = document.getElementById("page2" + i);
		var curD = document.getElementById("numb" + i);
		if (n == i) {
			curC.style.display = "block";
			curD.style.display = "block";
		} else {
			curC.style.display = "none";
			curD.style.display = "none";
		}
	}
}

function swap_sp(n) {
	for (var i = 1; i <= 2; i++) {
		var curC = document.getElementById("spview" + i);
		var curB = document.getElementById("sp" + i);
		if (n == i) {
			curC.style.display = "block";
			curB.className = "li5";
		} else {
			curC.style.display = "none";
			curB.className = "li6";
		}
	}
}

function swap_zx(n) {
	for (var i = 1; i <= 3; i++) {
		var curC = document.getElementById("zxview" + i);
		var curB = document.getElementById("zx" + i);
		if (n == i) {
			curC.style.display = "block";
			curB.className = "zx1";
		} else {
			curC.style.display = "none";
			curB.className = "zx2";
		}
	}
}

function swap_bs(n) {
	for (var i = 1; i <= 2; i++) {
		var curC = document.getElementById("bsview" + i);
		var curB = document.getElementById("bs" + i);
		if (n == i) {
			curC.style.display = "block";
			curB.className = "bs1";
		} else {
			curC.style.display = "none";
			curB.className = "bs2";
		}
	}
}

function swap_zqdh(n) {
	for (var i = 1; i <= 4; i++) {
		var curC = document.getElementById("zqdhview" + i);
		var curB = document.getElementById("zqdh" + i);
		if (n == i) {
			curC.style.display = "block";
			curB.className = "zqdh1";
		} else {
			curC.style.display = "none";
			curB.className = "zqdh2";

		}
	}
}
