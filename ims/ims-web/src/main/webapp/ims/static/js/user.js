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
					title:'用户名'
				},
				{
	  				name:'role',
	  				title:'角色',
	  				tpl: function(value, row){
	  					return jIMS.dict.get("role_type")[value];
	  				}
	      		},
	      		{
	  				name: 'operation',
	  				title: '操作',
					tpl: function(value, row){
	   					return "<a class='link_reset mr' href='javascript:void(0)' >重置密码</a><a class='link_del mr' href='javascript:void(0)' >删除</a>";
	   				}
	    		}
			],
	        linkers: {
	        	".link_reset": function(value, row){
	        		var url = jIMS.context.path + "/user/reset.json?name=" + row.name;
	            	IO.loading.show();
	    			IO.post(url, function(result){
	    				if(result.success){
	    					Dialog.alert("密码已重置为 000000");
	    				}
	    			});
	        	},
	        	".link_del": function(value, row){
	        		var url = jIMS.context.path + "/user/delete.json?id=" + row.id;
	            	IO.loading.show();
	    			IO.post(url, function(result){
	    				if(result.success){
	    					search(true);
	    				}
	    			});
	        	}
	        }
		})
    }

    function bindEvent(){
    	 $('#btn_search').on('click', function(e){
    		 search(true);
 	    });

    	$("#btn_add").on("click", function(){
    		var url = jIMS.context.path + "/user/add.htm?layout=false";
    		Common.showDialog(url, {title: '添加用户', width: 900, height: 600});
    	})

    	$("#btn_del").on("click", function(){
    		var selected = grid.getChecked();
			if(selected.length == 0){
				Dialog.alert("请至少选择一条数据！");
				return false;
			}

			var ids = "";
			for(var i in selected){
				ids += selected[i].id + ",";
			}

        	var url = jIMS.context.path + "/user/deleteBatch.json?ids=" + ids;
        	IO.loading.show();
			IO.post(url, function(result){
				if(result.success){
					search(true);
				}
			});
    	})

    	 $("input", $("#form_search")).on("keydown", function (event) {
 	    	if(event.which == 13) {
 	    		event.preventDefault();
 	    		search(true);
 	    	}
     	});
    }

	function search(isFirst){
		var params = IO.serialize($("#form_search"));
		var config = {
			url: jIMS.context.path + "/user/query.json" + (params ? ("?" + params) : "")
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


