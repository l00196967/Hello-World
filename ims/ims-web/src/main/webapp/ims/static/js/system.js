/**
 * Company List Module
 */
KISSY.add("ims/system/l", function(S, jIMS, Common, Grid, Tab, IO, Dialog, Auth, Calendar) {
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
				IO.post(jIMS.context.path + "/system/genLicence.json", IO.serialize($("#form_add")), function(result){
					if(result.success){
						$("#code").text(result.data).show();
					}
				});
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
}, {requires:['ims/bootstrap',  "ims/common", "cute/grid/", "cute/tab/", "ajax", "cute/dialog/", "cute/auth/", "cute/calendar/"]});
