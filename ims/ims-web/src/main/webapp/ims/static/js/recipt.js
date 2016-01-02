KISSY.add("ims/recipt", function(S, jIMS, IO, ReciptItem) {
	var $ = S.all;
	var reciptItem = null;

	function bindEvent(){
		$("#print").on("click", function(){
//			if(!auth){
//				auth = new Auth('#form_add', {submitTest:false});
//				auth.render();
//			}
//			auth.test().then(function(){
				document.getElementById('content').contentWindow.print();
//			})
    	})
	}

	return {
		init: function(tableName, selected){
			reciptItem = new ReciptItem();
			reciptItem.init();
			bindEvent();
		}
	}
}, {requires:["ims/bootstrap", "ajax", "ims/reciptItem"]})

KISSY.add("ims/reciptItem", function(S, Dialog, Hint) {

	    function htmlencode(s){
                var div = document.createElement('div');
                div.appendChild(document.createTextNode(s));
                return div.innerHTML;
        }

        function htmldecode(s){
                var div = document.createElement('div');
                div.innerHTML = s;
                return div.innerText || div.textContent;
        }

	var PropSelector = function(schemaColumns, selectedColumns) {
		var $ = S.all;
		var self = this;
		var dialog = null;
		var currentSelect = null;
		var currentTemplate = null;
		var selected = false;

		var colComments = {};
		var dataTypes = {};

		var selctor_add = ".icon_add";
		var selctor_del = ".icon_del";
		var container = $("#prop");
		var originRow = container.one("tr");

		container.all(selctor_add).on("click", function() {
			// add new row
			container.append(createRow());

			$(this).hide();
			$(this).parent("tr").one(selctor_del).show();
		});

		container.all(selctor_del).on("click", function() {
			// remove select row
			$(this).parent("tr").remove();

			var rows = container.all("tr");
			if (rows.length == 2) {
				rows.item(1).one(selctor_del).hide();
			}
			rows.item(rows.length - 1).one(selctor_add).show();
		});

		container.all("#amount").on("change", function(){
			var price = $(this).parent("tr").all(".price").val();
			if(price){
				$(this).parent("tr").one(".total").text((amount * $(this).val()).toFixed(2));
				$(this).parent("tr").one(".tax_total").text((amount * $(this).val() * 0.17).toFixed(2));
			}
		});

		container.all("#price").on("change", function(){
			var amount = $(this).parent("tr").all(".amount").val();
			if(amount){
				$(this).parent("tr").one(".total").text((amount * $(this).val()).toFixed(2));
				$(this).parent("tr").one(".tax_total").text((amount * $(this).val() * 0.17).toFixed(2));
			}
		});

		function createRow(column){
			var newRow = originRow.clone(true, true, true);
			newRow.removeClass("hide").addClass("new_row");
			return newRow;
		}

		function addFirstRow(column) {
			var newRow = createRow(column);
			newRow.one(selctor_del).hide();
			container.append(newRow);
		}

		function addRow(column){
			var newRow = createRow(column);
			newRow.one(selctor_add).hide();
			container.append(newRow);
		}

		function addLastRow(column){
			var newRow = createRow(column);
			container.append(newRow);
		}

		this.initRow = function(columns){
			if(columns){
				for(i in columns){
					colComments[columns[i].name] = columns[i].comment;
					dataTypes[columns[i].name] = columns[i].type;
				}
			}
			container.all("tr.new_row").remove();

			if(!columns || columns.length == 0){
				addFirstRow();
			}else if(columns.length == 1){
				addFirstRow(columns[0]);
			}else{
				for(var i=0; i<columns.length; i++){
					if(i == columns.length - 1){
						addLastRow(columns[i]);
					}else{
						addRow(columns[i]);
					}
				}
			}
		}

		this.init = function(schemaColumns, selectedColumns){
			container.all("tr.new_row").remove();

			if(!selectedColumns || selectedColumns.length == 0){
				addFirstRow();
			}else if(selectedColumns.length == 1){
				addFirstRow(selectedColumns[0]);
			}else{
				for(var i = 0; i < selectedColumns.length; i++){
					if(i == selectedColumns.length - 1){
						addLastRow(selectedColumns[i]);
					}else{
						addRow(selectedColumns[i]);
					}
				}
			}
		}
	}

	return PropSelector;
}, {requires:["cute/dialog/", 'cute/hint/']})