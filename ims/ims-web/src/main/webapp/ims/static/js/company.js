/**
 * Company List Module
 */
KISSY.add("ims/company/list", function(S, jIMS, Common, Grid, Tab, IO, Dialog, Hint) {
	var $ = S.all;
	var grid = null;

    function initGrid(){
    	grid = new Grid({
	        target: '#grid',
	        cols: [
				{
					name:'registNo',
					title:'工商注册号',
					width: "10%"
				},
	   			{
	  				name:'name',
	  				title:'公司名称',
	  				width: "15%"
				},
				{
	  				name:'type',
	  				title:'公司类型',
	  				width: "10%"
				},
				{
	  				name: 'address',
	  				title: '经营地址',
	  				width: "15%"
	      		},
				{
	  				name:'legalPerson',
	  				title:'法人代表',
	  				width: "10%"
	      		},
				{
	  				name:'registCapital',
	  				title:'注册资本',
					width: "10%"
	      		},
	      		{
	  				name:'createTime',
	  				title:'注册日期',
					width: "10%"
	      		},
	      		{
	  				name:'expireTime',
	  				title:'营业期限',
	  				width: "10%"
	      		},
	      		{
	  				name: 'operation',
	  				title: '操作',
	  				width: "10%",
					tpl: function(value, row){
	   					return "<a class='link_priv mr' href='javascript:void(0)' >详情</a>";
	   				}
	    		}
			],
	        linkers: {},
	        localData:{
	        	data: [
        	       {
        	    	   registNo: "000001111",
        	    	   name: "一公司"
        	       }
    	       ]
	        }
		})
    }

    function bindEvent(){

    }

	function search(isFirst){
		var config = {
			url: jIMS.context.path + "/company/query.json"
		}
		if(isFirst){
			config.data = {
				current: 1
			}
		}
		grid.init(config);
	};

	return {
		init: function(){
			initGrid();
			search(true);
			bindEvent();
		}
	}
}, {requires:['ims/bootstrap',  "ims/common", "cute/grid/", "cute/tab/", "ajax", "cute/dialog/", "cute/hint/"]});


/**
 * Company Add Module
 */
KISSY.add("ims/company/add", function(S, jIMS, Common, IO, Dialog, Hint, Calendar, Auth) {
	var $ = S.all;
	var auth = null;

    function bindEvent(){
    	$("#print").on("click", function(){
			if(!auth){
				auth = new Auth('#form_add', {submitTest:false});
				auth.render();
			}
			auth.test().then(function(){
				document.getElementById('content').contentWindow.print();
			})
    	})
    }

    function initCal(){
    	new Calendar({
            target: '#expireTime',
            showTime: false,
            value: '2015-12-12'
        });
    }

	return {
		init: function(){
			initCal();
			bindEvent();
		}
	}
}, {requires:['ims/bootstrap',  "ims/common", "ajax", "cute/dialog/", "cute/hint/", "cute/calendar/", "cute/auth/"]});
