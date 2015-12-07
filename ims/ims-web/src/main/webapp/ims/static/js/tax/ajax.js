/**
 * Ajax.js
 *
 * Collection of Scripts to allow in Page communication from browser to (struts) server
 * ie can reload part instead of full Page
 *
 * How to use
 * ==========
 * 1) Call retrieveURL from the relevant event on the HTML Page (e.g. onclick)
 * 2) Pass the url to contact (e.g. Struts Action) and the name of the HTML form to post
 * 3) When the server responds ...
 *         - the Script loops through the response , looking for <span id="name">newContent</span>
 *          - each <span> tag in the *existing* document will be replaced with newContent
 *
 * NOTE: <span id="name"> is case sensitive. Name *must* follow the first quote mark and end in a quote
 *         Everything after the first '>' mark until </span> is considered content.
 *         Empty Sections should be in the format <span id="name"></span>
 */

//global variables
var req;
var ajaxobjectid;
var spanobjects;


function getAjaxParaStr1(objectArray) {
    var returnString = "";
    for (var i = 0; i < objectArray.length; i++) {
        //we escape (encode) each value
        var obj = document.getElementById(objectArray[i]);
        if (obj != null) {
            returnString = returnString + "&" + unescape(obj.name) + "=" + unescape(obj.value);
        }
    }
    return returnString;
}

function getAjaxParaStr2(objectArray, number) {
    var returnString = "";
    for (var i = 0; i < objectArray.length; i++) {
        //we escape (encode) each value
        var obj = document.getElementById(objectArray[i] + number);
        if (obj != null) {
            returnString = returnString + "&" + unescape(obj.name) + "=" + unescape(obj.value);
        }
    }
    return returnString;
}

function doAjax(path, pageid, groupobjectname, object, pagearray, grouparray, number) {
    ajaxobjectid = object.id;
    var url = path + '/butterfly/other/load_ajax';
    var param = 'PageId=' + pageid + '&groupobjectname=' + groupobjectname + '&THISVALUE=' + (object == null ? "" : object.value);
    if (pagearray != null) {
        param = param + getAjaxParaStr1(pagearray);
        if (grouparray != null) {
           param = param + getAjaxParaStr2(grouparray, number);
        }
    }
    //Do the Ajax call
    if (window.XMLHttpRequest) { // Non-IE browsers
        req = new XMLHttpRequest();
        stateListener(req);
        req.onreadystatechange = processStateChanged;
        try {
            req.open("POST", url, 1);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.setRequestHeader("Content-Length", param.length);
            req.send(param);
        } catch (e) {
            alert("Problem Communicating with Server\n" + e);
        }
    } else if (window.ActiveXObject) { // IE
        req = new ActiveXObject("Microsoft.XMLHTTP");
        stateListener(req);
        if (req) {
            req.onreadystatechange = processStateChanged;
            req.open("POST", url, 1);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.setRequestHeader("Content-Length", param.length);
            req.send(param);
        }
    }
}


function processStateChanged() {
    if (req.readyState == 4) { // Complete
        if (req.status == 200) { // OK response
            var restext = req.responseText;
            var ajaxobject = document.getElementById('ajax_' + ajaxobjectid);
            eval(restext);
            eval(ajaxobject.innerText);
            //eval('ajax_'+ajaxobjectid+'(ajaxreturn)');
        } else {
            alert("Problem with server response:\n " + req.statusText);
        }
    }
    stateListener(req);
}

function stateListener(obj) {
    if (obj.readyState == "4")
        document.getElementById("loading").style.display = "none";
    else
        document.getElementById("loading").style.display = "block";
}


function exescripttext(innerobj, str) {
    var re = /\<script[\s\S]*\>/i;
    var arr;
    var html = '';
    var script = '';
    innerobj.innerHTML = '';
    while (arr = re.exec(str)) {
        //       var innerstr=str.substring(0,re.lastIndex);

        // innerobj.innerHTML=innerobj.innerHTML+innerstr.substring(0,innerstr.lastIndexOf('<'));
        html += str.substring(0, arr.index);
        //  alert(innerobj.innerHTML);
        str = str.substring(arr.index, str.length);
        var re1 = /\<\/script\>/i;
        var arr1;
        if (arr1 = re1.exec(str)) {
            var scripttext = str.substring(0, arr1.index);
            script += scripttext.substring(scripttext.indexOf('>') + 1, scripttext.length);
            //eval(scripttext);
            str = str.substring(arr1.index + 9, str.length);
        }
    }
    innerobj.innerHTML = html;
    eval(script);


    //   html=html+str;
    //   innerobj.innerHTML=html;
    //   alert(script);
    //   eval(script);
    //innerobj.innerHTML=innerobj.innerHTML+str;
}

function getDataBySpan(pageid, url, objectstr) {
    var para = document.getElementById(pageid + 'ALLPARAMETERS');
    if (para != null) {
        url = url + '&' + para.value;
    }
    //Do the Ajax call
    if (window.XMLHttpRequest) { // Non-IE browsers
        req = new XMLHttpRequest();
        stateListener(req);
        spanobjects = objectstr.split(',');
        req.onreadystatechange = processStateChangeBySpan;
        try {
            req.open("GET", url, true);
            //was get
        } catch (e) {
            alert("Problem Communicating with Server\n" + e);
        }
        req.send(null);
    } else if (window.ActiveXObject) { // IE
        req = new ActiveXObject("Microsoft.XMLHTTP");
        stateListener(req);
        spanobjects = objectstr.split(',');
        if (req) {
            req.onreadystatechange = processStateChangeBySpan;
            req.open("GET", url, true);
            req.send();
        }
    }
}


function processStateChangeBySpan() {
    if (req.readyState == 4) { // Complete
        if (req.status == 200) { // OK response
            ///alert("Ajax response:"+req.responseText);
            //Split the text response into Span elements
            var restext = req.responseText;
            for (var i = 0; i < spanobjects.length; i++) {
                var obj = document.getElementById('span_' + spanobjects[i]);
                //  var re=new RegExp('[.]*<span id="span_'+spanobjects[i]+'">([.]*)</span>[.]*','g');
                var temp = document.getElementById('temp');
                temp.innerHTML = restext.replace('<span id="span_' + spanobjects[i] + '">', '<span id="span_' + spanobjects[i] + '_bak">');
                var bac = document.getElementById('span_' + spanobjects[i] + '_bak');
                var bactext = bac.innerHTML;
                temp.innerHTML = '';
                exescripttext(obj, bactext);
                /*
                 var scripttext=bactext.substring(bactext.indexOf('<SCRIPT>')+8,bactext.indexOf('</SCRIPT>'));
                 var htmltext=bactext.substring(0,bactext.indexOf('<SCRIPT>'))+bactext.substring(bactext.indexOf('</SCRIPT>')+9,bactext.length);
                 //                if(re.test(bac.innerHTML)){
                 //                  alert(RegExp.$1)
                 //                  obj.innerHTML=RegExp.$1+RegExp.$3;
                 //                  eval(RegExp.$2);
                 //                }
                 //                else{
                 //                  alert(2)
                 //                  obj.innerHTML=bac.innerHTML;
                 //                }
                 obj.innerHTML=htmltext;
                 alert(scripttext);
                 eval(scripttext);         */
                //var re= new RegExp('.*<span id="span_'+spanobjects[i]+'">(.*)</span>.*','g');
                // alert(re.test(restext))
                //                if(re.test(restext)){
                //                   alert(RegExp.$1)
                //                   obj.innerHTML=ReplaceScript(RegExp.$1);
                //                }
            }
            //spanElements = splitTextIntoSpan(req.responseText);
            //Use these span elements to update the page
            //replaceExistingWithNewHtml(spanElements);

        } else {
            alert("Problem with server response:\n " + req.statusText);
        }
    }
    stateListener(req);
}