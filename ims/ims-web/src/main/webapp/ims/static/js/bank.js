
/**
 * Bank Account Module
 */
KISSY.add("ims/bank/account", function(S, jIMS, Common, IO, Dialog, Hint, Auth) {
	var $ = S.all;
	var auth = null;

    function bindEvent(){
    	$("#btn_submit").on("click", function(){
			if(!auth){
				auth = new Auth('#form_add', {submitTest:false});
				auth.render();
			}
			auth.test().then(function(){
            	IO.loading.show();
				IO.post(jIMS.context.path + "/bank/addAccount.json", IO.serialize($("#form_add")), function(result){
					if(result.success){
						//showTips(result);
						$("#section_add").hide();
						$("#section_success").show();
					}
				});
			})
    	})

    	$("#link_a").on("click", function(){
    		document.getElementById('content_a').contentWindow.print();
    	})

    	$("#link_b").on("click", function(){
    		document.getElementById('content_b').contentWindow.print();
    	})
    }

    function showTips(result){
		if(result.success){
			$("#tip_ok").show();
			setTimeout(function() {
				$("#tip_ok").hide()
			}, 3000);
		}else{
			$("#tip_error").show();
			setTimeout(function() {
				$("#tip_error").hide()
			}, 3000);
		}
	}

	return {
		init: function(){
			bindEvent();
		}
	}
}, {requires:['ims/bootstrap', "ims/common", "ajax", "cute/dialog/", "cute/hint/", "cute/auth/"]});


/**
 * Bank Saving Module
 */
KISSY.add("ims/bank/saving", function(S, jIMS, Common, IO, Dialog, Hint, Auth, Selector) {
	var $ = S.all;
	var auth = null;

    function bindEvent(){
    	$("#btn_submit").on("click", function(){
			if(!auth){
				auth = new Auth('#form_add', {submitTest:false});
				auth.render();
			}
			auth.test().then(function(){
            	IO.loading.show();
				IO.post(jIMS.context.path + "/bank/savingSubmit.json", IO.serialize($("#form_add")), function(result){
					if(result.success){
						$("#section_add").hide();
						$("#row_submit").hide();
						$("#section_success").show();
					}
				});
			})
    	})
    }

    function initSelector(){
    	new Selector({
            target: '#account',
            url: '/bank/queryAccount.json',
            multiSelect: false,
//            autoQuery: false,
//            queryKeyCodes: [13],
            valueTpl: '{{account}}',
            displayTpl: ['{{account}}', '{{account}}']
        });
    }

	return {
		init: function(){
			bindEvent();
			initSelector();
		}
	}
}, {requires:['ims/bootstrap', "ims/common", "ajax", "cute/dialog/", "cute/hint/", "cute/auth/", "cute/selector/"]});

/**
* Bank Statement Module
*/
KISSY.add("ims/bank/statement", function(S, jIMS, Common, Grid, IO, Dialog, Hint, DateSelector) {
	var $ = S.all;
	var grid = null;

    function initGrid(){
    	grid = new Grid({
	        target: '#grid',
	        buttons: "#buttons",
	        cols: [
				{
					name:'account',
					title:'账户'
				},
				{
					name:'opTime',
					title:'交易日期'
				},
	   			{
	  				name:'opType',
	  				title:'业务类型',
	  				tpl: function(value, row){
	  					return jIMS.dict.get("op_type")[value];
	  				}
				},
				{
	  				name:'amount',
	  				title:'金额'
				},
				{
	  				name: 'balance',
	  				title: '余额'
	      		}
			]
		})
    }

    function initCal(){
    	 new DateSelector({
             target:'#date',
             name:'from,to',
             placeholder:'请选择开始和结束时间'
         });
    }

    function bindEvent(){
		$("#btn_search").on("click", function(){
			search(true);
		})
    }

	function search(isFirst){
		var params = IO.serialize($("#form_search"));
		var config = {
			url: jIMS.context.path + "/bank/queryRecords.json" + (params ? ("?" + params) : "")
		}
		if(isFirst){
			config.data = {
				current: 1
			}
		}
		grid.init(config);
		grid.hideLoading();
	};

	return {
		init: function(){
			initGrid();
			initCal();
			search(true);
			bindEvent();
		}
	}
}, {requires:['ims/bootstrap',  "ims/common", "cute/grid/", "ajax", "cute/dialog/", "cute/hint/", "cute/dateselector/"]});

