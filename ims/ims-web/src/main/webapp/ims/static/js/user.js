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
	  				width: "10%",
	  				tpl: function(value, row){
	  					return jIMS.dict.get("role_type")[value];
	  				}
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
	   					return "<a class='link_reset mr' href='javascript:void(0)' >重置密码</a><a class='link_del mr' href='javascript:void(0)' >删除</a>";
	   				}
	    		}
			],
	        linkers: {
	        	".link_reset": function(value, row){
	        	},
	        	".link_del": function(value, row){
	        	}
	        }
		})
    }

    function bindEvent(){
    	$("#btn_add").on("click", function(){
    		var url = jIMS.context.path + "/user/add.htm?layout=false";
    		Common.showDialog(url, {title: '添加用户', width: 900, height: 600});
    	})
    }

	function search(isFirst){
		var config = {
			url: jIMS.context.path + "/user/query.json"
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
		},
		refresh: function(){
			search(true);
		}
	}
}, {requires:['ims/bootstrap',  "ims/common", "cute/grid/", "cute/tab/", "ajax", "cute/dialog/", "cute/hint/"]});


/**
 * User Add Module
 */
KISSY.add("ims/user/add", function(S, jIMS, Common, IO, Dialog, Hint, Auth, Selector) {
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
				IO.post(jIMS.context.path + "/user/submit.json", IO.serialize($("#form_add")), function(result){
					if(result.success){
						parent.refresh();
						Common.closeDialog();
					}
				});
			})
    	})
    }

	return {
		init: function(){
			bindEvent();
		}
	}
}, {requires:['ims/bootstrap', "ims/common", "ajax", "cute/dialog/", "cute/hint/", "cute/auth/", "cute/selector/"]});

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


