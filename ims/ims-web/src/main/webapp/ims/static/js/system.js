/**
 * Company List Module
 */
KISSY.add("ims/system/l", function(S, jIMS, Common, Grid, Tab, IO, Dialog, Hint, Calendar) {
	var $ = S.all;

    function bindEvent(){

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
			bindEvent();
		}
	}
}, {requires:['ims/bootstrap',  "ims/common", "cute/grid/", "cute/tab/", "ajax", "cute/dialog/", "cute/hint/", "cute/calendar/"]});
