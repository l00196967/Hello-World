/*
 * IMS Bootstrap Module
 */
KISSY.add("ims/bootstrap", function(S, JSON, IO, Dialog, Loading) {

	//Kissy global config
	S.config({
		"debug" : true,
		"tag" : "1.0.0"
	});

	//Ajax global config
	IO.loading = new Loading('.main');
	IO.setupConfig({
		error : function(d, textStatus, io) {
			if (io.status == 500 || (io.statusText =="parser error")) {
				Dialog.alert("操作失败： " + io.responseText, {
					zIndex : 5000
				});
			}
		},
		complete : function(){
			IO.loading.hide();
		},
		timeout : 180
	});

	function initContext(){
		var jIMS = window.jIMS = window.jIMS || {};

		if (!jIMS.context) {
			jIMS.context = {
				path : ""
			}
		}

		if (!jIMS.dict) {
			jIMS.dict = {
				dataDict : {},
				get: function(key){
					return dataDict[key];
				},
				set: function(data){
					dataDict = data;
				}
			}
		}

		loadContext();

		return jIMS;
	}

	function loadContext(){
		var context = sessionStorage.getItem("ims_context");
		if(!context){
			IO.post(jIMS.context.path + "/system/loadContext.json", function(result) {
				if(result.success){
					sessionStorage.setItem("ims_context", JSON.stringify(result.data));
					jIMS.dict.set(result.data);
					initDictSelect();
					initDictRadio()
				}
			})
		}else{
			jIMS.dict.set(JSON.parse(context));
			initDictSelect();
			initDictRadio()
		}
	}

	function initDictSelect(){
		var $ = S.all;
		$("select[dict-key]").each(function(ele){
			var $this = $(ele);
			var dictKey = $this.attr("dict-key");
			var value = $this.attr("value");
			var head = $this.attr("head");
			var dicts = jIMS.dict.get(dictKey);

			if(dictKey && dicts){
				if(head != "false"){
					$this.append($("<option value=''>请选择</option>"));
				}
				for(key in dicts){
					$this.append($("<option value='" + key + "'>" + dicts[key] + "</option>"));
				}
			}
			$this.val(value ? value : "");
		})
	}

	function initDictRadio(){
		var $ = S.all;
		$("label[class=cute-group]").each(function(ele){
			var $this = $(ele);
			var dictKey = $this.attr("dict-key");
			var value = $this.attr("value");
			var dicts = jIMS.dict.get(dictKey);
			if(dictKey && dicts){
				for(key in dicts){
					var $clone = $this.clone(true);
					$clone.one("input").attr("value", key);
					if(value && value.trim() == key){
						$clone.one("input").attr("checked", "checked");
					}
					$clone.append(dicts[key]);
					$this.before($clone);
				}
				$this.remove();
			}
		})
	}

	return initContext();
}, {requires : ["json", "ajax", "cute/dialog/", 'cute/loading/']});

/*
 * IMS Common Module
 */
KISSY.add("ims/common", function(S, jNDA, Grid, Dialog, IO) {
	var $ = S.all;

	function createGrid(config){
		top.currentGrid = new Grid(config);
	}

	function refreshList(url, params){
		top.currentGrid.init({
			url: url + (params ? ("?" + params) : "")
		});
	}

	return {
		createGrid: createGrid,

		refreshList: refreshList,

		showDialog: function(url, config){
			top.currentDialog = Dialog.iframe(url, config);
		},

		closeDialog: function(){
			top.currentDialog.close();
			top.currentDialog = null;
		},

		del: function(url, data, callback){
			Dialog.confirm('确定要删除该条记录吗？', {title: '操作提示'}, function(e){
                if(e.result){
	    			IO.post(url, data, callback);
                }
            });
		},

		batchDelete: function(url, callback){
			var ids = top.currentGrid.getChecked("id");
			if(ids.length == 0){
				Dialog.alert("请至少选择一条记录！");
				return false;
			}
			Dialog.confirm('确定删除该条记录吗？', {title: '操作提示'}, function(data){
	            if(data.result){
	    			IO.post(url, {id: ids.join(",")}, callback);
	            }
			});
		}
	}
}, {requires : [ "ims/bootstrap", "cute/grid/", "cute/dialog/", "ajax"]});

/*
 * IMS Stepbar Module
 */
KISSY.add("ims/stepbar", function(S) {
	var stepBar = function(config){
		var $ = S.all;
		var container = config.target ? $(config.target) : $("#step_bar");
		var nextBtn = config.nexBtn ? $(config.nexBtn) : $("#btn_next");
		var preBtn = config.preBtn ? $(config.preBtn) : $("#btn_pre");
		var submitBtn = config.submitBtn ? $(config.submitBtn) : $("#btn_submit");

		function isFirst(){
			return container.one("td.step-bar-cell:first").hasClass("active");
		}

		function isLast(){
			return container.one("td.step-bar-cell:last").hasClass("active");
		}

		function nextStep(){
			if(isLast()) return;

			var current = container.one("td.active");
			var pre = current.prev();
			var next = current.next();

			current.removeClass("active").addClass("lastfinished");
			next.addClass("active");
			if(pre){
				pre.removeClass("lastfinished").addClass("finished");
			}

			var currentBody = $("#" + current.attr("id") + "_body");
			var nextBody = $("#" + next.attr("id") + "_body");
			if(currentBody.length>0){
				currentBody.hide();
			}
			if(nextBody.length>0){
				nextBody.show();
			}
		}

		function preStep(){
			if(isFirst()) return;

			var current = container.one("td.active");
			var pre = current.prev();
			var prepre = pre.prev();

			pre.removeClass("lastfinished").addClass("active");
			current.removeClass("active");
			if(prepre){
				prepre.removeClass("finished").addClass("lastfinished");
			}

			var currentBody = $("#" + current.attr("id") + "_body");
			var preBody = $("#" + pre.attr("id") + "_body");
			if(currentBody.length>0){
				currentBody.hide();
			}
			if(preBody.length>0){
				preBody.show();
			}
		}

		function init(){
			//preBtn.hide();
			//submitBtn.hide();

			preBtn.on("click", function(){
				preStep();
				if(isFirst()){
					preBtn.hide();
				}
				nextBtn.show();
				submitBtn.hide();
			});
			nextBtn.on("click", function(){
				nextStep();
				if(isLast()){
					nextBtn.hide();
					submitBtn.show();
				}
				preBtn.show();
			})
		}

		init();
	}

	return stepBar;
});

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}