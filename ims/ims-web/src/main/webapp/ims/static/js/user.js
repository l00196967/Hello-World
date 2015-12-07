/**
 * User List Module
 */
KISSY.add("ims/user/list", function(S, jIMS, Common, Grid, Tab, IO, Dialog, Hint) {
	var $ = S.all;
	var grid = null;

    function initGrid(){
    	grid = new Grid({
	        target: '#grid',
	        buttons:'#buttons',
	        isSelect: true,
	        cols: [
				{
					name:'name',
					title:'用户名',
					width: "10%"
				},
				{
	  				name:'role',
	  				title:'角色',
	  				width: "10%"
	      		},
				{
	  				name:'xx',
	  				title:'xxxx',
	  				width: "10%"
	      		},
	      		{
	  				name:'xx',
	  				title:'xxxx',
	  				width: "10%"
	      		},
	      		{
	  				name:'expireTime',
	  				title:'过期时间',
	  				width: "10%"
	      		},
	      		{
	  				name: 'operation',
	  				title: '操作',
	  				width: "10%",
					tpl: function(value, row){
	   					return "<a class='link_priv mr' href='javascript:void(0)' >删除</a>";
	   				}
	    		}
			],
	        linkers: {},
	        localData:{
	        	data: [{
		        	name: "张三",
		        	role: "操作员",
		        	expireTime: '2015-12-12'
		        }]
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
//			search(true);
			bindEvent();
		}
	}
}, {requires:['ims/bootstrap',  "ims/common", "cute/grid/", "cute/tab/", "ajax", "cute/dialog/", "cute/hint/"]});


/**
 * Role List Module
 */
KISSY.add("ims/role/list", function(S, jIMS, Common, Grid, Tab, IO, Dialog, Hint) {
	var $ = S.all;
	var grid = null;

    function initGrid(){
    	grid = new Grid({
	        target: '#grid',
	        buttons:'#buttons',
	        isSelect: true,
	        cols: [
				{
					name:'name',
					title:'角色名',
					width: "10%"
				},
	      		{
	  				name:'domain',
	  				title:'所属领域',
	  				width: "10%"
	      		},
	      		{
	  				name:'xx',
	  				title:'xxxx',
	  				width: "10%"
	      		},
	      		{
	  				name:'xx',
	  				title:'xxxx',
	  				width: "10%"
	      		},
	      		{
	  				name: 'operation',
	  				title: '操作',
	  				width: "10%",
					tpl: function(value, row){
	   					return "<a class='link_priv mr' href='javascript:void(0)' >删除</a>";
	   				}
	    		}
			],
	        linkers: {},
	        localData:{
	        	data: [
	    	       {
			        	name: "管理员",
			        	domain: "工商"
			        },
			        {
			        	name: "操作员",
			        	domain: "工商"
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
//			search(true);
			bindEvent();
		}
	}
}, {requires:['ims/bootstrap',  "ims/common", "cute/grid/", "cute/tab/", "ajax", "cute/dialog/", "cute/hint/"]});


