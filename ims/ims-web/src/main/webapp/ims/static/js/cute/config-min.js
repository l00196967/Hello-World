!function(e){"use strict";var t,u,c,i,r,l,a=document.getElementsByTagName("script"),s=/(.+)\/sd\/cute3\/((?:\d+\.){2}\d+)\/js\/config(?:-min)?\.js/;for(t=0,u=a.length;u>t;t++){var o=a[t],d=o.src.match(s);if(d&&d[1]){r=o.getAttribute("data-config"),r=r?new Function("return "+r)():{},l="false"!==o.getAttribute("data-statistic"),c=d[1],i=d[2];break}}var n=e.namespace("CUTE",!0);n.statistic=l,n.package=function(t,u,i){var r="cute"==t?"cute3":t;i=i||{},e.config("packages",[e.mix({name:t,base:c+"/sd/"+r+"/"+u+"/js",ignorePackageNameInUri:!0},i)])};var g=n.debug||location&&-1!==(location.search||"").indexOf("ks-debug"),m="//assets.alicdn.com/s/kissy/";e.config({combine:!g,debug:g,packages:{gallery:{base:m},mobile:{base:m}}}),n.package("cute",i,r),e.config("modules",{"cute/button/index":{requires:["cute/util/statistic"]},"cute/calendar/index":{requires:["cute/util/","cute/calendar/calendar","cute/util/statistic"]},"cute/component/index":{requires:["cute/widget/","cute/util/statistic"]},"cute/dateselector/index":{requires:["cute/util/","cute/calendar/","cute/auth/","cute/dateselector/tpl","cute/util/statistic"]},"cute/designer/index":{requires:["cute/auth/","cute/calendar/","cute/gotop/","cute/grid/","cute/util/","cute/loading/","cute/tip/","cute/scrollbar/","cute/tagselector/","cute/dateselector/","cute/pasteselector/","cute/selector/","cute/uploader/","cute/xselectv2/xselect","cute/util/statistic"]},"cute/dialog/alert":{requires:["cute/dialog/common"]},"cute/dialog/confirm":{requires:["cute/dialog/common"]},"cute/dialog/custom":{requires:["cute/dialog/common"]},"cute/dialog/iframe":{requires:["cute/dialog/common"]},"cute/dialog/index":{requires:["cute/dialog/alert","cute/dialog/confirm","cute/dialog/prompt","cute/dialog/iframe","cute/dialog/custom","cute/util/statistic"]},"cute/dialog/prompt":{requires:["cute/dialog/common"]},"cute/field/index":{requires:["cute/component/"]},"cute/fixed/index":{requires:["cute/util/statistic"]},"cute/form/index":{requires:["cute/auth/","cute/util/","cute/loading/","cute/dialog/","cute/form/tpl","cute/widget/","cute/util/statistic"]},"cute/gotop/index":{requires:["cute/util/statistic"]},"cute/grid/collection":{requires:["cute/mvc/","cute/grid/model"]},"cute/grid/gridsview":{requires:["cute/xtemplate/","cute/mvc/","cute/fixed/","cute/util/","cute/hint/","cute/grid/tpl","cute/grid/gridview","cute/grid/paginationview"]},"cute/grid/gridview":{requires:["cute/mvc/"]},"cute/grid/index":{requires:["cute/util/","cute/tip/","cute/loading/","cute/mvc/","cute/grid/collection","cute/grid/gridsview","cute/util/statistic"]},"cute/grid/model":{requires:["cute/mvc/"]},"cute/grid/paginationview":{requires:["cute/mvc/","cute/pagination/"]},"cute/header/index":{requires:["cute/hint/","cute/header/tpl","cute/util/statistic"]},"cute/hint/index":{requires:["cute/component/","cute/hint/tpl"]},"cute/loading/index":{requires:["cute/loading/tpl","cute/util/statistic"]},"cute/menubutton/index":{requires:["cute/scrollbar/","cute/menubutton/tpl","cute/util/statistic"]},"cute/mvc/index":{requires:["cute/dialog/"]},"cute/navigator/index":{requires:["cute/navigator/tpl","cute/util/statistic"]},"cute/pagination/index":{requires:["cute/util/","cute/util/statistic"]},"cute/pasteselector/index":{requires:["cute/util/","cute/selector/"]},"cute/scrollbar/index":{requires:["cute/scrollbar/tpl","cute/util/statistic"]},"cute/selector/index":{requires:["cute/util/","cute/scrollbar/","cute/selector/tpl","cute/util/statistic"]},"cute/sidemenu/index":{requires:["cute/util/","cute/fixed/","cute/scrollbar/","cute/sidemenu/tpl","cute/util/statistic"]},"cute/splitbutton/index":{requires:["cute/scrollbar/","cute/splitbutton/tpl","cute/util/statistic"]},"cute/tab/index":{requires:["cute/scrollbar/","cute/tab/tpl","cute/util/statistic"]},"cute/tagselector/index":{requires:["cute/util/","cute/hint/","cute/tagselector/tpl","cute/util/statistic"]},"cute/tip/index":{requires:["cute/util/","cute/util/statistic"]},"cute/tree/index":{requires:["cute/util/","cute/tree/tree","cute/util/statistic"]},"cute/uploader/index":{requires:["cute/uploader/uploader","cute/uploader/imageUploader","cute/uploader/defaultTheme","cute/util/","cute/util/statistic"]},"cute/util/index":{requires:["cute/util/anim","cute/util/calendar","cute/util/form","cute/util/taobao","cute/util/window"]},"cute/util/statistic":{requires:["cute/util/"]},"cute/widget/index":{requires:["cute/util/","cute/util/statistic"]},"cute/xselectv2/core":{requires:["cute/xselectv2/area"]},"cute/xselectv2/diySelect":{requires:["cute/xselectv2/core"]},"cute/xselectv2/xselect":{requires:["cute/xselectv2/core","cute/util/","cute/util/statistic"]},"cute/xtemplate/compiler":{requires:["cute/xtemplate/runtime"]},"cute/xtemplate/facade":{requires:["cute/xtemplate/runtime","cute/xtemplate/compiler"]},"cute/xtemplate/":{alias:["cute/xtemplate/facade"]}}),document.createElement("header"),document.createElement("footer"),document.createElement("section")}(KISSY);