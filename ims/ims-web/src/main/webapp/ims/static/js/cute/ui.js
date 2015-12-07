KISSY.add("cute/dialog/index",function(t,i,e,c,o,u){return{alert:i,confirm:e,prompt:c,iframe:o,custom:u}},{requires:["cute/dialog/alert","cute/dialog/confirm","cute/dialog/prompt","cute/dialog/iframe","cute/dialog/custom","cute/util/statistic"]});KISSY.add("cute/dialog/alert",function(t,e,n,a,i,l){function o(){o.superclass.constructor.call(this)}var c=e.all,s=['<div class="dialog-content alert">','<div class="tip">{content}</div>','<div class="dialog-btn">','<input type="button" class="btn btn-m J_KsDialogBtn" value="',l.CONFIRM,'"/>',"</div>","</div>"].join(""),r=function(t,e){t.on("hide",function(){t.destroy(),e&&e({result:!0})}),t.on("afterRenderUI",function(){var e=c(t.get("el")),n=e.all(".J_KsDialogBtn");n.on("click",function(){t.hide()})})};return t.extend(o,a,{alert:function(e,n,a){var l=i.parseData(n,a),o=l.config,c=i.getDialog(o),d=l.callback;return i.setContent(c,s,{title:o.title,content:o.isHtml?e:t.escapeHTML(e)}),r(c,d),c.show(),o.isNeedDrag&&i.setDragAble(c),c}}),(new o).alert},{requires:["node","sizzle","base","cute/dialog/common","cute/dialog/language"]});KISSY.add("cute/dialog/common",function(e,t,n,i,o){var a=t.all,c={},r={title:"提示",isNeedDrag:!0,closable:!0,closeAction:"hide",mask:!0,effect:{effect:"fade",duration:.2},align:{points:["cc","cc"]},elCls:"common"};return e.mix(c,{parseData:function(t,n){var i,o,a=e.clone(r);return e.isPlainObject(t)?i=e.mix(a,t):e.isFunction(t)?(i=a,n=t):(o=n,i=a),e.isFunction(n)&&(o=n),{config:i,callback:o}},getDialog:function(e){return new o.Dialog(e)},setDragAble:function(e){var t,n=a(e.get("el")),i=this;t=i._initDD(n,[".ks-stdmod-header"])},_initDD:function(e,t){return new i.Draggable({node:e,cursor:"move",move:!0,handlers:t})},setContent:function(t,n,i){return t.set("bodyContent",e.substitute(n,i)),t.set("headerContent",i.title),this}}),c},{requires:["node","sizzle","dd","overlay"]});KISSY.add("cute/dialog/confirm",function(t,n,e,i,a){function o(){o.superclass.constructor.call(this)}var s=n.all,l=['<div class="dialog-content confirm">','<div class="tip">{content}</div>','<div class="dialog-btn">','<input type="button" class="btn btn-m J_KsDialogBtn ks-dialog-yes" value="确定"/>\n','<input type="button" class="btn btn-m btn-weak J_KsDialogBtn ks-dialog-no" value="取消"/>',"</div>","</div>"].join(""),c=function(t,n){t.on("hide",function(){t.destroy(),n&&n({result:!!t.result})}),t.on("afterRenderUI",function(){var n=s(t.get("el")),e=n.all(".J_KsDialogBtn");e.on("click",function(n){var e=s(n.target);t.result=e.hasClass("ks-dialog-yes"),t.hide()})})};return t.extend(o,i,{confirm:function(n,e,i){var o=a.parseData(e,i),s=o.config,r=a.getDialog(s),u=o.callback;return a.setContent(r,l,{title:s.title,content:s.isHtml?n:t.escapeHTML(n)}),c(r,u),r.show(),s.isNeedDrag&&a.setDragAble(r),r}}),(new o).confirm},{requires:["node","sizzle","base","cute/dialog/common"]});KISSY.add("cute/dialog/prompt",function(t,e,a,n,i){function l(){l.superclass.constructor.call(this)}var o=e.all,s=['<div class="dialog-content prompt">','<div class="tip">',"{content}","{inputType}","</div>",'<div class="dialog-btn">','<input type="button" class="btn btn-m J_KsDialogBtn ks-dialog-yes" value="确定"/>\n','<input type="button" class="btn btn-m btn-weak J_KsDialogBtn ks-dialog-no" value="取消"/>',"</div>","</div>"].join(""),r='<input type="text" class="text dialog-input J_KsDialogPromptTxt" style="width:193px;">',c='<textarea class="text J_KsDialogPromptTxt dialog-textArea" style="margin-top:3px;"></textarea>',p=function(e,a){e.on("hide",function(){e.destroy(),a&&a({result:!!e.result,txt:e.txt||""})}),e.on("afterRenderUI",function(){var a=o(e.get("el")),n=a.all(".J_KsDialogBtn"),i=a.all(".J_KsDialogPromptTxt");t.later(function(){i.fire("focus")},100),n.on("click",function(t){var a=o(t.target),n=a.hasClass("ks-dialog-yes"),l=n?i.val():"";e.result=n,e.txt=l,e.hide()})})};return t.extend(l,n,{prompt:function(e,a,n){var l=i.parseData(a,n),o=l.config,u=i.getDialog(o),d=l.callback;return i.setContent(u,s.replace("{inputType}",o.inputType?c:r),{title:o.title,content:o.isHtml?e:t.escapeHTML(e)}),p(u,d),u.show(),o.isNeedDrag&&i.setDragAble(u),u}}),(new l).prompt},{requires:["node","sizzle","base","cute/dialog/common"]});KISSY.add("cute/dialog/iframe",function(e,t,i,r,o){function n(){n.superclass.constructor.call(this)}var a=(t.all,['<div class="dialog-content iframe">','<iframe src="{url}" width="100%" height="100%" frameborder="0"></iframe>',"</div>"].join(""));return e.extend(n,r,{iframe:function(e,t){t.height||(t.height=280);var i=o.parseData(t),r=i.config,n=o.getDialog(r);o.setContent(n,a,{title:r.title,url:e}),n.on("hide",function(){n.destroy()}),n.show();var d=n.get("el"),s=d.children(".ks-contentbox"),c=s.children(".ks-stdmod-header"),l=s.children(".ks-stdmod-body"),h=s.children(".ks-stdmod-footer");return l.css("height",s.innerHeight()-c.outerHeight()-h.outerHeight()),r.isNeedDrag&&o.setDragAble(n),n}}),(new n).iframe},{requires:["node","sizzle","base","cute/dialog/common"]});KISSY.add("cute/dialog/custom",function(t,e,o,a,n){function i(){i.superclass.constructor.call(this)}var s=e.all,c='<div class="dialog-content custom"></div>';return t.extend(i,a,{custom:function(t,e){var o=s(t),a=o.data("widget");if(!a){var i=n.parseData(e),r=i.config;a=n.getDialog(r),n.setContent(a,c,{title:r.title}),a.on("afterRenderUI",function(){var t=a.get("el").one(".dialog-content");t.append(o),o.show(),r.isNeedDrag&&n.setDragAble(a)}),o.data("widget",a)}var l=e.autoShow;return null==l&&(l=e.autoShow=!0),l&&a.show(),a}}),(new i).custom},{requires:["node","sizzle","base","cute/dialog/common"]});KISSY.add("cute/util/statistic",function(t,e,a,i){"use strict";var r=e.all,c={collect:function(e){if(e){var a=t.namespace("CUTE",!0);if(a.statistic&&"true"!=localStorage.getItem("disableStatistic")){var c=location.host,l=null,s=r("#header h1");s.length||(s=r("header h1")),s.length&&(l=s.text());var n=document.title,o=null,u=r("#header .hd-userimg");if(u.length||(u=r("header .hd-userimg")),u.length){var d=u.attr("src"),h=d.match(/http:\/\/work\.alibaba-inc\.com\/photo\/(\d+)\.(\d+)x(\d+)\.jpg/);h&&h[1]&&(o=h[1])}var g=null,m=t.Config.packages.cute.base;if(m){var p=m.match(/(.+)\/sd\/cute3\/((?:\d+\.){2}\d+)\/js/);p&&p[2]&&(g=p[2])}var v={host:c,project_name:l,page_title:n,user_id:o,cute_version:g,timestamp:(new Date).getTime()},f=new Image;f.src=e+"?"+i.param(v),localStorage.setItem("disableStatistic","true")}}}};return c.collect("http://eb.alisec.org/statistic.gif"),c},{requires:["node","sizzle","cute/util/"]});KISSY.add("cute/util/index",function(A,t,n,i,e,a,r,o){"use strict";var g=t.all,c={loadingGifData:"data:image/gif;base64,R0lGODlhIAAgAPeWAHp6eqOjo1JSUvT09M3NzfPz89fX1/Dw8Ozs7OLi4tXV1c/Pz+7u7vHx8dHR0d/f387Ozu/v79DQ0Ovr6/Ly8tTU1OPj4+np6dbW1uTk5Orq6uDg4NjY2Nra2vX19dzc3N3d3d7e3ujo6OHh4e3t7efn5+bm5uXl5dLS0qioqNnZ2dvb29PT06urq6ampnx8fLW1tcjIyKqqqn19faysrMnJyampqYGBgaWlpaSkpLKysri4uMbGxn5+foaGhlZWVlxcXLu7u7Ozs7a2tsvLy7S0tLy8vFhYWMTExIiIiJqamp6enn9/f5mZmZOTk7m5ubq6umFhYcLCwpSUlISEhJWVlV9fX3Z2dqCgoIKCgrCwsFdXV52dnb29vbe3t3Nzc6GhoWRkZHt7e8HBwb6+vsPDw6+vr4WFhZGRkcrKyq2trZycnHFxcV1dXZCQkMDAwJiYmK6url5eXnh4eFRUVMXFxbGxsVVVVWVlZWJiYoODg4CAgGNjY8fHx5aWloeHh4yMjJeXl3R0dJubm4mJiXd3d46OjltbW3V1dWZmZouLi4qKimBgYFpaWmhoaGdnZ4+Pj2xsbFNTU2pqaqenp8zMzPX19QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpENTlDMjg2MkNCN0QxMUUzODlGQThCQzZBRUVDNjA5MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpENTlDMjg2M0NCN0QxMUUzODlGQThCQzZBRUVDNjA5MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ1OUMyODYwQ0I3RDExRTM4OUZBOEJDNkFFRUM2MDkwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ1OUMyODYxQ0I3RDExRTM4OUZBOEJDNkFFRUM2MDkwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQoAlgAsAAAAACAAIAAACP8ALQkcSNDSByFKCGXJ4qMKjTQDCkqcOEFgHQAYM2JUNLGjwAJEcISwpEGMxoxCBN5IQcGjQARFAgSAIXCMgw0IDlgwEGSDpT4CBFxJ4FEEDZkBdhxwaclNUAF5OkxEcDSAiwpMBQ4w8yMoo5EEBwyRmWJEVoIL2gRlEwGtTBw+zxJEcSQoF4I7ZEroSAEEhwYdhwS9A1bgijcRX4qw8AADgUqQFTywIAIBQSZfkAj00PEx5M+gIRMgaNlSgQElUGxgUHBB6NeVFhTUoIKACRCQiRJ0ADu0g4IJIK9QALkiwQq9QWMlOCGyBMiACRpI/tlAwQaQF0CAnHhgB+qQpYbkFb29UgHg4CvpHjgAMgTelZYSjJCeNcEDkB1Mr3RB4v7eCkikAWQYPABZBhIhQJ0GEm0A2QMIZBCdRCP0BsJEA1zwgXEuffAaB90N1MB5BFGwAQacSZSBZ5WEEOJAHEhgAYkDwGdBRxEYoAAJHZnwmX2WBFcJAaXJ9VJ5hVkyAHGVQFDkWQi4VgkLJA50AHwQnCDXitm1JREDz0FmwIQd/ScBjx0dgFxsp21wAQMUDHDABAkwaGAlFcjn0QAhEEDUgLCpYAkFEozwokcMnOchbAScd+hZEzQmAQQELKDAByZUOVFAACH5BAUKAJYALAIAAAAeABUAAAjbAC0JHDjwRI0nalKkaAEDCQeCECMKPCBQQYCLGC/GkchxwAYCFywxyJERYw2BS4IU4GjpQIVKlRQIZAGiRIQGF0ZAKGEJBQAAVXhGZOAAZiUMK1lasvETgI8REA8UrUQgg1KCb2b8PGNVoAcMMCFMuAqRQ5afaBoITACTgAayETsw+alDINhKFuBK5PHzRVcRHTzolbjGiYTBZBkIJBEBsdIaZ7Y8cczShgABkChzhHAZkWaJJi5b+RyxweUjpCFGuNwoNcEEl8O4HhjjMoDZAsFcXoO7JRI3RAICACH5BAUKAJYALAsAAAAVAB8AAAjXAEk8MOBgwQIJCkCU8GCpocOHJypJnCgRxcOLDRtQpPigYRAIAzBaynCBAYUCESYkYGApRIAAMBCInGlJyssALUrQFIkCx0sZF3ZiTJDipQ4KQi9acPGyRtKLCl7mCPrUIZQiIKo+PNAwQgOtDSuA6REDrCUjAACkMMsh7RSzGtJSMUshbQ+zDdLuMVsibRKzLNLCMQsjrQ68EmxgAHsigtmGe6K0cKwVigABdDpoRXHk8uCqKORcjsTyqZ0tl62EqDrjsoAoBrQuufxlBNgLUXJ8NUsZY0AAIfkEBQoAlgAsCwACABUAHgAACNsALQkcSFAghwQFEyq8UKmSggMKI1r60LCSBAYSE3qwQKChhAgZE05Y0LDCgJAFEUBo+ABlwRMNCYB0OdBAhQs0CRYQ2IBCToEPurgw8NPSggABpBQdgbRIUQZIZRQtgNRFUQpIKRWdgJRG0RBIvRQlgjTG1Q9SNvy8ALGoJS5nyLSlGQMAADFqaXZgYtdMzg567BqaG3JMD7tUMtBUYheAjxAEG2DhsWJChAcEZNSwJMSuExMFYwgYTXo0FUsIfOzwWdBJ6dI/JlhqEJHAmhd8Dh2xIggNlJkRAwIAIfkEBQoAlgAsAQAKAB8AFgAACOMALQkcSLCgwYOWCgxAyLChBhUETDScaDBBpUorKGoUOOGigo0aG1xcAJLigIsESk48WQmCyoYHLjp4yVDDRQw0EW64+CDnwQEXPkzwWZAEBYITArxYmBOKDAlHKeARIEBNTgMBAuQoIdAG1R8kVVpwkZXHQAqFqAKZCdKCjaxaGhC0EIbqES8bWZANIOOCwQ55qArokWHik6wBWkg8uIENVTlGYaAYQaLBCQNGKliqkbXIUIYHlNxJYYkFgNOoT2OxFKFFpQIaV5Cw1CJ16hkMLB1VaUBHkz83elCZYiPGgYYBAQAh+QQFCgCWACwAAAoAHwAWAAAI3QAHWBpIsKDBgwgHdpmEZUXChxCnCBCQAqLFg3MmQrjIcSCfiSY6cgQysYHIiyQFRDhp8dHEESwhvpjII+ZDLgIkabGZkIWQDDyDdmxQoCAJL02EcpBgoWiBJAAAkOFpopJVBgONRJ2hIiYCCFZDECzgJ+qNDicRLLDKoijBElABMKnJMQMBqwtWGtzgIyqAQSIsGrBaSQKJhCfQRNUToUCaECIOUNAwYsEDSw+sVjgAsYGWF0EshQhAujRpI5YoSBgh8OKIlUhMm8bBufXJETF20EjhQkaRMgYoPAwIACH5BAUKAJYALAAAAQAWAB8AAAjTAC0JHCgwAcGDCAk2APODR8KHBb8IEHAFYsIVeCYKeIHAIkELYSZuEeKRYIE5E4FAKElQxsQfRFgSfDGxhcyDUgAVuMkzIRFAMEb0tEQDAIAgQ/0Y5TD0j1ENQ28YpRDV6IGhi4yaGKrEKIqhOgCIGTN0RRkRQ9MiPFBpR1o1AQI4GLogLg6DPYfETWGhJwIacV1g6FmiRdwATzre1KAjro0GAzZcYEBhwIEJCaAipNAnx0oNlUKLDq0CoogGlj6MHk1gp8UJDzBIgEBggYIPJgoEBAAh+QQFCgCWACwAAAAAFgAfAAAI1wAtCRxI0FKFJTMStQES5coUIwUKDiwhcIiAixgvOpJoiQKMGSgslaCTEeMSiSWcAABQRaCdOh0uMABBIEWHgiOSrATQhAFHjiV0AuhR5ifHAYFW3uBglGOXlTMUNOXYZCWZqT8h4BiAtWtXFWbSiPBKEEmAABDIDhxydoRagS3O+nyb4mxEumcpvLUU5+yEvTvOhthbI0COkG8zVCCxt7FEChsweHg7wEGlShb2JrhMAAFlBZcheFZ7wHIlCCfeMpBwuZKBBqQrXF5wl+yAEAQSOGZQ22hAADs=",isSecure:/^https/i.test(window.location.protocol),setDefaultValue:function(){var t=function(t,n,i){A.isUndefined(t[n])&&(t[n]=i)};return function(n,i,e){A.isObject(i)?A.each(i,function(A,i){t(n,i,A)}):t(n,i,e)}}(),unparam:function(t,n){if(A.isObject(t))return t;if(n){var i=t||location.href,e=i.indexOf("?");t=e>-1?i.substring(e+1):""}var a={};return t&&A.each(t.split("&"),function(t){var n=t.split("="),i=n[0],e=n[1];e=decodeURIComponent(e||"");var r=a[i];null==r?a[i]=e:A.isArray(r)?r.push(e):a[i]=[r,e]}),a},param:function(t){t=t||{};var n=[];for(var i in t){var e=t[i];null!=e&&(A.isArray(e)?A.each(e,function(A){n.push(i+"="+encodeURIComponent(A))}):n.push(i+"="+encodeURIComponent(e)))}return n.join("&")},stringToObject:function(t,n){var i=null;try{i=new Function("return "+A.trim(t))()}catch(e){null!=n&&(i=n),A.log("stringToObject error!\n"+t,"error")}return i},getCommentData:function(A){A=g(A);var t=null;if(!A||!A.length)return t;var n=A[0],i=n.firstChild;return i&&"#text"==i.nodeName&&(i=i.nextSibling),i&&"#comment"==i.nodeName&&(t=c.stringToObject(i.data)),t},getConfigData:function(A){A=g(A);var t=null;return A&&A.length?t=c.stringToObject(A.html()):t},getConfig:function(A){A=g(A);var t=null;if(!A||!A.length)return t;var n=A[0],i=n.tagName.toLowerCase();return"script"==i?c.getConfigData(A):c.getCommentData(A)},getTextWidth:function(A){var t=g("#_text");return t.length||(g(document.body).append('<div id="_text" style="position:absolute;left:-10000px;top:-10000px;"></div>'),t=g("#_text")),t.html(A||""),t.width()},getArray:function(t,n){n=n||",";var i;return i=A.isArray(t)?t:"string"==typeof t?t?t.split(n):[]:t?[t]:[]},getArrayMap:function(t){var n=this;t=n.getArray(t);var i={};return A.each(t,function(A){i[A]=!0}),i},getMapValues:function(t){var n=[];return A.each(t,function(A){n.push(A)}),n},getIOConfig:function(t){return A.mix({type:"post",dataType:"json",cache:!1,serializeArray:!1},t)},getSelectMap:function(A,t){A=g(A);var n={};return A.all("option").each(function(A){var i=A.val();(t||i)&&(n[i]=A.text())}),n},callbackByDialog:function(A,t){A?A.on("destroy",function(){t()}):t()},alias:function(t,n,i){t&&A.isUndefined(t[n])&&!A.isUndefined(t[i])&&(t[n]=t[i])},createNodesMap:function(t,n,i,e,a){var r=this;e=e||function(A){return A.id},a=a||"children",A.each(n,function(A){var n=e(A);t[n]=A,A._parentId=i,A[a]&&r.createNodesMap(t,A[a],n,e,a)})},getPath:function(A,t,n){n=n||function(A){return A.id};var i=A[t];if(!i)return[];if("root"==t)return["root"];var e=[];e.unshift(t);for(var a=i._parentId;;){if("root"==a)break;i=A[a],e.unshift(n(i)),a=i._parentId}return e},getLanguage:function(){var A=null,t=g(document.body);return A=t.hasClass("language-en")?"en":"zh"},createVarMap:function(A,t){var n=this;g(A).children().each(function(A){var i=A[0],e=i.tagName.toLowerCase(),a=A.attr("type");if("input"==e&&("hidden"==a||"text"==a)||"textarea"==e){var r=A.attr("name");r&&(t[r]=A.val())}else if("form"==e){var r=A.attr("name");if(r){var o={};n.createVarMap(A,o),t[r]=o}}})}},l={AnimUtil:i,CalendarUtil:e,FormUtil:a,TaobaoUtil:r,WindowUtil:o};return A.each(l,function(t){A.mix(c,t)}),A.mix(c,l),c},{requires:["node","sizzle","cute/util/anim","cute/util/calendar","cute/util/form","cute/util/taobao","cute/util/window"]});KISSY.add("cute/util/anim",function(i,t,n,e){"use strict";var a=t.all;return{anim:function(t,n,a,h,o){return i.each(t,function(i){e(i,n,a,o||"easeOut",h).run()}),t},show:function(i,t){var n=this;n.anim(a(i),{height:"show",opacity:"show"},.2,t)},hide:function(i,t){var n=this;n.anim(a(i),{height:"hide",opacity:"hide"},.2,t)},toggle:function(i,t){var n=this;n.anim(a(i),{height:"toggle",opacity:"toggle"},.2,t)}}},{requires:["node","sizzle","anim"]});KISSY.add("cute/util/calendar",function(e){"use strict";var t={leftPad:function(e){return e+="",1==e.length&&(e="0"+e),e},formatDate:function(a,r){if(!e.isDate(a))return"";var s;s=e.isString(r)?r:r?"{y}-{m}-{d} {h}:{i}:{s}":"{y}-{m}-{d}";var l=t.leftPad,n=a.getFullYear(),i=l(a.getMonth()+1),d=l(a.getDate()),u=l(a.getHours()),o=l(a.getMinutes()),g=l(a.getSeconds());return e.substitute(s,{y:n,m:i,d:d,h:u,i:o,s:g})},parseDate:function(a){if(e.isDate(a))return a;if(t.dateReg.test(a)){var r=a.split("-"),s=parseFloat(r[0]),l=parseFloat(r[1])-1,n=parseFloat(r[2]);return new Date(s,l,n,0,0,0)}if(t.dateTimeReg.test(a)){var r=a.split(" "),i=r[0],d=r[1],u=i.split("-"),o=d.split(":"),s=parseFloat(u[0]),l=parseFloat(u[1])-1,n=parseFloat(u[2]),g=parseFloat(o[0]),p=parseFloat(o[1]),v=parseFloat(o[2]);return new Date(s,l,n,g,p,v)}return null},dateReg:/^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/,dateTimeReg:/^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01]) (0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/,dateValidator:function(e,a,r,s){var l=s.get("target"),n=l.parent();n.hasClass("calendar-wrapper")&&(n=n.parent());var i=n.prev(),d=n.next(),u=i&&i.hasClass("interval-date-separator")||d&&d.hasClass("interval-date-separator");if(u){var o,g;i&&i.hasClass("interval-date-separator")?(o=i.prev().one(".calendar"),g=l):(o=l,g=n.next().next().one(".calendar"));var p,v,m=o.val(),f=g.val(),c=o.attr("_date_required"),h=g.attr("_date_required");if(null==c||m||null==h||f?null==c||m?null==h||f?(p=!0,v=""):(p=!1,v="结束时间不可以为空！"):(p=!1,v="开始时间不可以为空！"):(p=!1,v="开始时间和结束时间都不可以为空！"),!p)return this.msg("error",v),p;var F,R,D,_,T,w,C,S="true"==o.attr("_showtime"),q="true"==g.attr("_showtime");if(w=S?t.dateTimeReg:t.dateReg,C=q?t.dateTimeReg:t.dateReg,R=m?w.test(m):!0,D=f?C.test(f):!0,F=R&&D){var x=m,y=f;x&&y?(x=parseFloat(x.replace(/[-: ]/g,"")),y=parseFloat(y.replace(/[-: ]/g,"")),_=y>=x):_=!0;var M=o.attr("_range");M?(M=parseFloat(M),!isNaN(M)&&M>0?(x=S?m:m+" 00:00:00",y=q?f:f+" 23:59:59",x&&y?(x=t.parseDate(x).getTime(),y=t.parseDate(y).getTime(),T=24*M*60*60*1e3>=y-x):T=!0):T=!0):T=!0}var v;return v=F?_?T?"":o.attr("_rangemessage")||"不能超过"+M+"天！":"时间区间不正确！":"时间格式不合法！",this.msg("error",v),F&&_&&T}var F,N,P=l.val(),Y="true"==l.attr("_showtime");N=Y?t.dateTimeReg:t.dateReg,F=P?N.test(P):!0;var v;return v=F?"":"时间格式不合法！",this.msg("error",v),F}};return t},{requires:[]});KISSY.add("cute/util/form",function(e,r){"use strict";function t(e){return e.replace(i,"\r\n")}var a,n=/^(?:select|textarea)/i,i=/\r?\n/g,u=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;return a={serialize:function(r,t){return e.param(a.getFormData(r),void 0,void 0,t||!1)},getFormData:function(a){var i=[],m={};return e.each(r.query(a),function(r){var t=r.elements?e.makeArray(r.elements):[r];i.push.apply(i,t)}),i=e.filter(i,function(e){return e.name&&!e.disabled&&(e.checked||n.test(e.nodeName)||u.test(e.type))}),e.each(i,function(a){var n,i=r.val(a);if(null!==i){if(i=e.isArray(i)?e.map(i,t):t(i),n=m[a.name],null==n)return void(m[a.name]=i);e.isArray(n)||(n=m[a.name]=[n]),n.push.apply(n,e.makeArray(i))}}),m}}},{requires:["dom"]});KISSY.add("cute/util/taobao",function(){"use strict";return{getTaobaoUserLevel:function(e){if(null==e)return"";var i="<img class='taobao-user-level' src='//img.alicdn.com/newrank/s_",f="";if(e>=4&&10>=e)f="red_1.gif";else if(e>=11&&40>=e)f="red_2.gif";else if(e>=41&&90>=e)f="red_3.gif";else if(e>=91&&150>=e)f="red_4.gif";else if(e>=151&&250>=e)f="red_5.gif";else if(e>=251&&500>=e)f="blue_1.gif";else if(e>=501&&1e3>=e)f="blue_2.gif";else if(e>=1001&&2e3>=e)f="blue_3.gif";else if(e>=2001&&5e3>=e)f="blue_4.gif";else if(e>=5001&&1e4>=e)f="blue_5.gif";else if(e>=10001&&2e4>=e)f="cap_1.gif";else if(e>=20001&&5e4>=e)f="cap_2.gif";else if(e>=50001&&1e5>=e)f="cap_3.gif";else if(e>=100001&&2e5>=e)f="cap_4.gif";else if(e>=200001&&5e5>=e)f="cap_5.gif";else if(e>=500001&&1e6>=e)f="crown_1.gif";else if(e>=1000001&&2e6>=e)f="crown_2.gif";else if(e>=2000001&&5e6>=e)f="crown_3.gif";else if(e>=5000001&&1e7>=e)f="crown_4.gif";else{if(!(e>=10000001))return"";f="crown_5.gif"}return i+f+"'/>"},getTaobaoCommodityStatus:function(e){switch(e+=""){case"-9":return"CC";case"0":return"正常";case"1":return"确认通过";case"-1":return"卖家删除";case"-2":return"卖家下架";case"-3":return"小二下架";case"-4":return"小二删除";case"-5":return"从未上架";default:return""}}}},{requires:[]});KISSY.add("cute/util/window",function(e,a,o,r){"use strict";var n=a.all;return{downloadFile:function(a){a=a||{};var o=a.url,t=a.params;if(r.ie){var i=n(document.body),l=n("#_form"),s=l[0];s||(i.append('<form id="_form" method="post" class="display-none" autocomplete="off"></form>'),l=n("#_form"),s=l[0]);var u=n("#_iframe"),m=u[0];m||(i.append('<iframe id="_iframe" name="_iframe" class="display-none"></iframe>'),u=n("#_iframe"),m=u[0]),s.action=o,s.target="_iframe",l.empty(),s.innerHTML="";for(var c in t){var f=t[c];null!=f&&(l.append('<input type="text" name="'+e.escapeHTML(c)+'"/>'),s.lastChild.value=f)}s.submit()}else Util.openWindow({url:o,params:t,config:{fullScreen:!1}})},openWindow:function(){var a=function(a){a=a||{};var o=a.url,a=a.config||{},n=Util.setDefaultValue;n(a,{fullScreen:!0,width:500,height:300,toolbar:!1,menubar:!1,scrollbars:!1,resizable:!0,location:!1,status:!1}),a.toolbar=a.toolbar?"yes":"no",a.menubar=a.menubar?"yes":"no",a.scrollbars=a.scrollbars?"yes":"no",a.resizable=a.resizable?"yes":"no",a.location=a.location?"yes":"no",a.status=a.status?"yes":"no";var t,i,l,s,u=screen.availWidth+(r.chrome?-10:r.ie?-12:0),m=screen.availHeight+(r.chrome?-58:r.ie?-38:0);a.fullScreen?(t=u,i=m,l=0,s=0):(t=a.width,i=a.height,l=(u-t)/2,s=(m-i)/2);var c=window.open(o,a.name||"_blank",["width=",t,",height=",i,",left=",l,",top=",s,",toolbar=",a.toolbar,",menubar=",a.menubar,",scrollbars=",a.scrollbars,",resizable=",a.resizable,",location=",a.location,",status=",a.status].join(""));e.later(function(){c.focus()})};return function(o){o=o||{};var r=o.url,t=o.params,i=o.method||"post",o=o.config,l=n(document.body),s=n("#_form"),u=s[0];if(u||(l.append('<form id="_form" method="'+i+'" class="display-none" autocomplete="off"></form>'),s=n("#_form"),u=s[0]),u.action=r,o){var m=e.guid("window_");o.name=m,a({url:"about:blank",config:o}),u.target=m}else u.target="_blank";s.empty(),u.innerHTML="";for(var c in t){var f=t[c];null!=f&&(s.append('<input type="text" name="'+e.escapeHTML(c)+'"/>'),u.lastChild.value=f)}u.submit()}}()}},{requires:["node","sizzle","ua"]});KISSY.add("cute/loading/index",function(e,t,i,n,r){"use strict";function o(t){var i=this;e.isString(t)&&(t={target:t}),o.superclass.constructor.call(i,t);var n=i.get("events");e.each(n,function(e,t){i.on(t,e)}),i.fire("create")}var s=t.all;return e.extend(o,n,{createHtml:function(){var t=this,i=r.loading;return e.substitute(i,{iconSize:t.get("iconSize")})},renderUI:function(){var e=this,t=e.get("target");!function(e){if(e[0]!=document.body){var t=e.css("position");"relative"!=t&&"absolute"!=t&&"fixed"!=t&&e.css("position","relative")}}(t);var i=e.createHtml(),n=s(i).prependTo(t);e.set("el",n),t[0]==document.body&&n.css("position","fixed")},bindUI:function(){},init:function(){var e=this;e.renderUI(),e.bindUI(),e.set("inited",!0)},show:function(){var e=this,t=e.get("inited");t||e.init();var i=e.get("el");return i.css({left:0,top:0}),e.fire("show"),e},hide:function(){var e=this,t=e.get("inited");if(t){var i=e.get("el");i.css({left:"-10000px",top:"-10000px"}),e.fire("hide")}return e},destroy:function(){var e=this,t=e.get("inited");return t&&(e.get("el").remove(),e.set("el",null),e.set("inited",!1)),e},delay:function(t,i){var n=this;return t=500>t?500:t,null==i&&(i="hide"),e.later(function(){var e=n[i];e&&e.call(n)},t),n}},{ATTRS:{inited:{value:!1},iconSize:{value:32},el:{},target:{value:s(document.body),setter:function(e){var t=s(e);return t.length||(t=s(document.body)),t}},events:{value:{}}}}),o},{requires:["node","sizzle","base","cute/loading/tpl","cute/util/statistic"]});KISSY.add("cute/loading/tpl",function(){"use strict";return{loading:'<div class="loading loading-{iconSize}x{iconSize} loading-float"></div>'}},{requires:[]});KISSY.add("cute/sidemenu/index",function(e,t,i,a,s,n,r,l,o,d,u){"use strict";function c(t){var i=this;e.isString(t)&&(t={target:t}),c.superclass.constructor.call(i,t);var a=i.get("events");e.each(a,function(e,t){i.on(t,e)}),i.init(),i.fire("create")}var f=t.all,g=window.sessionStorage;return e.mix(c,{iconfonts:{home:"e604",gear:"e600",submit:"e60c",clock:"e60b",document:"e60a",edit:"e621",system:"e622",add:"e623",search:"e625",view:"e624",element:"e62a",eye:"e629",widget:"e628",page:"e626",product:"e627",frame:"e62b"}}),e.extend(c,a,{compareData:function(){var e=this,t=g.getItem("sidemenuData"+e.suffix)||"[]";return t==n.stringify(e.get("data"))},renderUI:function(){var e=this,t=e.get("target"),i=t.children(),a=i.length;if(!a||1==a&&"script"==i[0].tagName.toLowerCase()||!e.compareData()){var n=e.get("data"),r={menus:n,isFixed:e.get("isFixed")},l=new s(u.sidemenu).render(r);t.html(l),g.removeItem("sidemenuScrollTop"+e.suffix)}e.set("el",t.last());var o=e.getActiveId();e.selectMenu(o)},storeHtml:function(){var e=this,t=e.get("target"),i=t.children(),a=i.length;a&&"script"==i[0].tagName.toLowerCase()&&i.item(0).remove();var s=['<ul class="sidemenu-wrapper">',t.one(".sidemenu-wrapper").html(),"</ul>"].join("");g.setItem("sidemenuHtml"+e.suffix,s),g.setItem("sidemenuData"+e.suffix,n.stringify(e.get("data")))},bindUI:function(){var t=this,i=t.get("target");i.delegate("click",".sidemenu-li-url",function(e){var i=f(e.currentTarget),a=i.attr("_id");t.selectMenu(a);var s=t.get("clickEvent");if(s){var n=i.attr("_url"),r=t.get("nodesMap")[a];s.call(t,n,r,i)}e.stopPropagation()});var a=f(document.body);i.delegate("click",".sidemenu-li-children",function(e){var i=f(e.currentTarget);a.hasClass("sidemenu-collapsed")&&i.hasClass("sidemenu-li1")||(t.get("singleExpand")&&i.siblings().removeClass("expanded").each(function(e){l.hide(e.children(".sidemenu-ul"),function(){t.storeHtml()})}),l.toggle(i.toggleClass("expanded").children(".sidemenu-ul"),function(){t.storeHtml()}),e.stopPropagation())}),i.delegate("click",".toolbar-collapse",function(e){f(e.currentTarget);a.hasClass("sidemenu-collapsed")?t.expandSideMenu():t.collapseSideMenu()});var s=i.all(".sidemenu-wrapper"),n=i.all(".sidemenu-toolbar"),r=i.all(".sidemenu-body"),o=t.scrollFn=function(){if(t.get("isFixed")&&r.hasClass("scrollbar")){var i=e.DOM.viewportHeight();r.height(i-(s.hasClass("fixed")?0:s.offset().top-a.scrollTop())-n.outerHeight());var l=t.get("scrollbar");l&&l.refresh()}};f(window).on("scroll",e.buffer(o,10));var d=t.resizeFn=function(){var i=e.DOM.viewportWidth();1175>i?(a.hasClass("sidemenu-collapsed")||t.collapseSideMenu(),n.hide()):n.show(),o()};f(window).on("resize",d),r.on("scroll",function(){g.setItem("sidemenuScrollTop"+t.suffix,r.scrollTop())})},collapseSideMenu:function(){var e=this,t=e.get("target"),i=f(document.body);i.addClass("sidemenu-collapsed"),t.all(".sidemenu-ul2").hide().each(function(e){e.parent(".sidemenu-li").removeClass("expanded"),e.css({display:""})});var a=e.get("fixed");a&&a.refreshTargetWidth&&a.refreshTargetWidth();var s=e.get("scrollbar");s&&s.disable();var n=e.get("collapsedStorageMode");"cookie"==n?r.set("sidemenu-collapsed"+e.suffix,"true",null,null,"/"):g.setItem("sidemenu-collapsed"+e.suffix,"true"),e.storeHtml(),e.fire("collapse")},expandSideMenu:function(){var e=this,t=f(document.body);t.removeClass("sidemenu-collapsed");var i=e.get("fixed");i&&i.refreshTargetWidth&&i.refreshTargetWidth();var a=e.get("scrollbar");a&&a.enable();var s=e.get("collapsedStorageMode");"cookie"==s?r.remove("sidemenu-collapsed"+e.suffix,null,"/"):g.removeItem("sidemenu-collapsed"+e.suffix),e.storeHtml(),e.fire("expand")},createNodesMap:function(e,t,i){for(var a=this,s=0,n=t.length;n>s;s++){var r=t[s];e[r.id]=r,r._parentId=i,r.children=r.children||[],r.url=r.url||"",r.icon=r.icon||"gear",r.iconfont=c.iconfonts[r.icon]||r.icon||"",a.createNodesMap(e,r.children,r.id)}},getPath:function(e){var t=this,i=t.get("nodesMap"),a=i[e];if(!a)return"";if("root"==a.id)return"/root";var s=[];s.unshift(a.id);for(var n=a._parentId;;){if("root"==n){s.unshift("/root");break}a=i[n],s.unshift(a.id),n=a._parentId}return s.join("/")},selectMenu:function(e){var t=this,i=t.get("nodesMap"),a=i[e];if(a){var s=t.get("target");s.all(".active,.cur").removeClass("active").removeClass("cur");var n=t.getPath(e).split("/");if(f("#menu_"+n[2]).addClass("active"),n.length>3){f("#menu_"+n[n.length-1]).addClass("cur");for(var r=f(document.body),l=2;l<n.length-1;l++)if(!r.hasClass("sidemenu-collapsed")||2!=l){var o=f("#menu_"+n[l]).parent().addClass("expanded");o.children(".sidemenu-ul").show(),t.get("singleExpand")&&o.siblings().removeClass("expanded").each(function(e){e.children(".sidemenu-ul").hide()})}}g.setItem("sidemenuActiveId"+t.suffix,e),t.storeHtml()}},initFixed:function(){var e=this,t=e.get("isFixed");if(t){var i=e.get("el");e.set("fixed",new o({target:i})),e.initScrollbar()}},initScrollbar:function(){var e=this,t=e.get("target"),i=t.all(".sidemenu-body");i.hasClass("scrollbar")&&e.set("scrollbar",new d({target:i,el:t.one(".scrollbar-div"),style:{backgroundColor:"#fff"},autoHide:!0,proxyZIndex:3}))},getPageHref:function(){var e=location.href,t=e.lastIndexOf("#");return t>-1&&(e=e.substring(0,t)),e},getActiveId:function(){var e=this,t=e.getPageHref(),i=e.sidemenuActiveIdMap;return e.get("activeId")||i[t]||g.getItem("sidemenuActiveId"+e.suffix)},initSidemenuActiveIdMap:function(){var t=this,i=t.get("nodesMap"),a={};e.each(i,function(e,t){var i=e.url;i&&(a[i]=t)}),t.sidemenuActiveIdMap=a},init:function(){var e=this,t=e.get("keySuffix");e.suffix=t?"_"+t:"";var i=e.get("nodesMap"),a=e.get("data");e.createNodesMap(i,a,"root"),e.initSidemenuActiveIdMap(),e.renderUI(),e.bindUI(),e.get("el").show(),e.initFixed(),e.resizeFn();var s=null,n=e.get("collapsedStorageMode");"cookie"==n?(r.remove("sidemenu-collapsed"+e.suffix),s=r.get("sidemenu-collapsed"+e.suffix)):s=g.getItem("sidemenu-collapsed"+e.suffix),s?e.collapseSideMenu():e.expandSideMenu()},destroy:function(){}},{ATTRS:{el:{},target:{setter:function(e){return f(e)}},activeId:{},data:{value:[]},nodesMap:{value:{}},clickEvent:{},isFixed:{value:!1},fixed:{},scrollbar:{},singleExpand:{value:!0},keySuffix:{value:""},collapsedStorageMode:{value:"cookie"},events:{value:{}}}}),c},{requires:["node","sizzle","base","xtemplate","json","cookie","cute/util/","cute/fixed/","cute/scrollbar/","cute/sidemenu/tpl","cute/util/statistic"]});KISSY.add("cute/fixed/index",function(e,t,i,o,r){"use strict";function s(t){var i=this;e.isString(t)&&(t={target:t}),s.superclass.constructor.call(i,t);var o=i.get("events");e.each(o,function(e,t){i.on(t,e)}),i.init(),i.fire("create")}var a=i.all,c=a(window),n=a(document);return e.extend(s,r,{createPlaceholder:function(){var e=this,t=e.get("target");e.set("_placeholder",t.clone(!0).css("visibility","hidden"))},addPlaceholder:function(){var e=this,t=e.get("target");e.get("_placeholder").insertAfter(t)},removePlaceholder:function(){var e=this;e.get("_placeholder").remove()},bindUI:function(){var i,o,r=this,s=r.get("target"),f=s.offset().top,l=s.outerHeight(),d=r.get("align"),g=r.get("container"),h=r.refreshPosition=function(){var e=n.scrollTop(),c=r.get("_placeholder");"fixed"!==s.css("position")?f=s.offset().top:c&&(f=c.offset().top),g?(i=g.offset().top,o=g.outerHeight()):(i=0,o=t.docHeight()+l);var h=t.viewportHeight();if("top"===d){var u=e,p=r.get("fixedTop");p&&(u=e+p),u>f&&i+o-l>e||!g&&f-e>h?r.fix():r.reset()}else f-e+l>h||e>f?r.fix():r.reset();var v=r.get("_fixed"),c=r.get("_placeholder");if(v&&c){var _=a(document).scrollLeft();s.css("left",c.offset().left-_)}};c.on("resize scroll",e.buffer(h,10));var u=r.refreshTargetWidth=function(){var e=r.get("_fixed");if(e){var t=r.get("_placeholder");t&&s.width(t.outerWidth())}};c.on("resize",e.buffer(u,10)),h()},fix:function(){var e=this,t=e.get("_fixed");if(!t){var i=e.get("offset"),o=e.get("align"),r=e.get("target");if(e.set("_width",r[0].style.width),r.addClass("fixed"),r.css("position","fixed"),"top"===o){var s=i,a=e.get("fixedTop");a&&(s=i+a),r.css("top",s)}else r.css("bottom",i);e.get("placeholder")&&e.addPlaceholder();var c=e.get("_placeholder");c&&r.width(c.outerWidth()),e.set("_fixed",!0),e.fire("fix")}},reset:function(){var e=this,t=e.get("_fixed");if(t){var i,o,r=e.get("align"),s=e.get("target");s.css("position",e.get("_position")),s.removeClass("fixed"),"top"===r?(i=e.get("_top"))?s.css("top",i):s.css("top","auto"):(o=e.get("_bottom"))?s.css("bottom",o):s.css("bottom","auto"),s.css("width",e.get("_width")),e.get("placeholder")&&e.removePlaceholder(),e.set("_fixed",!1),e.fire("reset")}},temp:function(){var e,t,i,o=this,r=o.get("target");o.set("_outerWidth",r.outerWidth()),o.set("_outerHeight",r.outerHeight()),(e=r.css("position"))&&o.set("_position",e),(t=r.css("top"))&&o.set("_top",t),(i=r.css("bottom"))&&o.set("_bottom",i)},init:function(){{var e=this;e.get("target")}e.temp(),e.get("placeholder")&&e.createPlaceholder(),e.bindUI()}},{ATTRS:{target:{setter:function(e){return a(e)}},align:{value:"top"},offset:{value:0},placeholder:{value:!0},_fixed:{value:!1},_width:{},container:{setter:function(e){return a(e)}},events:{value:{}}}}),s},{requires:["dom","node","sizzle","base","cute/util/statistic"]});KISSY.add("cute/scrollbar/index",function(e,o,t,r,l,n){"use strict";function s(o){var t=this;e.isString(o)&&(o={target:o}),s.superclass.constructor.call(t,o);var r=t.get("events");e.each(r,function(e,o){t.on(o,e)}),t.init(),t.fire("create")}var a=o.all;return e.extend(s,r,{createHtml:function(){var o=n.scrollbar;return e.substitute(o,{})},renderUI:function(){var e=this,o=e.get("target");!function(e){if(e.hasClass("scrollbar")||e.addClass("scrollbar"),e[0]!=document.body){var o=e.css("position");"relative"!=o&&"absolute"!=o&&"fixed"!=o&&e.css("position","relative")}}(o);var t=e.get("el");if(t&&t.length)o[0]._scrollbarEl=t;else{var r=e.createHtml();o.append(r);var l=o.last().last();o[0]._scrollbarEl=l,t=l,e.set("el",t)}var n=e.get("style");n&&t.css(n);var s=e.get("proxyZIndex"),c=a(['<div class="scrollbar-proxy" style="',null==s?"":"z-index:"+s+";",'">','<div class="scrollbar-proxy-content"></div>',"</div>"].join("")).appendTo(document.body);e.set("proxyEl",c),e.set("proxyContentEl",c.all(".scrollbar-proxy-content"))},bindUI:function(){var o=this,t=o.get("target"),r=o.target_mousewheelFn=function(e){var t=o.get("disabled");if(!t){var r,n=this;if(o.hide(),r=l.chrome||n!=document.body?n:document.documentElement,e.delta<0){r.scrollTop+=50;var s,c,u=r.scrollTop;n==document.body?(s=a(window).height(),c=l.firefox?document.documentElement.scrollHeight:n.scrollHeight):(s=a(n).outerHeight(),c=n.scrollHeight),u>c-s&&(r.scrollTop=c-s)}else r.scrollTop-=50;o.refresh(),n._scrollbarEl.height()&&e.halt()}};if(t.on("mousewheel",r),t[0]!=document.body){var n=o.body_mousewheelFn=function(){o.refresh()};a(document.body).on("mousewheel",n)}var s=o.refreshFn=e.buffer(function(){o.refresh()},10);t.on("mouseenter",s),t.on("mousemove",s),a(window).on("resize",s);var c=o.target_mouseenterFn=function(){if(o.get("autoHide")&&this!=document.body){var e=this._scrollbarEl;e.parent().css({opacity:1})}};t.on("mouseenter",c);var u=o.target_mousemoveFn=e.buffer(function(){o.target_mouseenterFn.call(this)},10);t.on("mousemove",u);var i=o.target_mouseleaveFn=function(){if(o.get("autoHide")&&this!=document.body){var e=this._scrollbarEl;e.parent().css({opacity:0})}};t.on("mouseleave",i),s();var d=o.get("proxyEl"),v=t[0],h=o.proxyScrollFn=function(){t.scrollTop(d.scrollTop()),o.refresh()},m=o.proxy_mousedownFn=function(){d.on("scroll",h)};d.on("mousedown",m);var p=o.proxy_mouseupFn=function(){d.detach("scroll",h)};d.on("mouseup",p);var g=o.proxy_mouseenterFn=function(){var e=v._scrollbarEl;e.parent().css({opacity:1})};d.on("mouseenter",g);var f=o.proxy_mouseleaveFn=function(){if(o.get("autoHide")&&t[0]!=document.body){var e=v._scrollbarEl;e.parent().css({opacity:0})}};d.on("mouseleave",f)},init:function(){var e=this;e.renderUI(),e.bindUI();var o=e.get("target"),t=e.get("autoHide");!function(e){var o=e[0];if(!t||o==document.body){var r=o._scrollbarEl;r&&r.parent().css({opacity:1})}}(o)},hide:function(){var e=this,o=e.get("target");!function(e){var o=e[0],t=o._scrollbarEl;t.css({right:2,top:0,height:0})}(o)},disable:function(){var e=this;e.set("disabled",!0);var o=e.get("target"),t=e.get("proxyEl");!function(e){var o=e[0],r=o._scrollbarEl;o.scrollTop=0,e.css({overflow:"inherit"}),r.css({display:"none"}),t.css({display:"none"})}(o)},enable:function(){var e=this;e.set("disabled",!1);var o=e.get("target"),t=e.get("proxyEl");!function(e){var o=e[0],r=o._scrollbarEl;e.css({overflow:"hidden"}),r.css({display:"block"}),t.css({display:"block"})}(o)},refresh:function(){var o=this,t=o.get("disabled");if(!t){var r=o.get("target"),n=null;!function(e){var o,t=e[0];o=l.chrome||t!=document.body?t:document.documentElement;var r,s;t==document.body?(r=a(window).height(),s=l.firefox?document.documentElement.scrollHeight:t.scrollHeight):(r=e.outerHeight(),s=t.scrollHeight),n=r*r/s,n>=r&&(n=0);var c=o.scrollTop,u=c+r*c/s,i=t._scrollbarEl;i.css({right:2-o.scrollLeft,top:u,height:n})}(r);var s=r[0],c=o.get("proxyEl"),u=o.get("proxyContentEl"),i=document.body,d=a(i);if(s==i)c.css({position:"fixed",left:"auto",right:2,top:0,height:e.DOM.viewportHeight()}),u.css({height:e.DOM.docHeight()}),c.scrollTop(s.scrollTop);else{var v=r.offset(),h=v.left,m=v.top,p=r.outerWidth(),g=r.outerHeight();c.css({position:"fixed",left:h+p-(l.chrome?8:9),top:m-d.scrollTop(),height:g}),u.css({height:s.scrollHeight}),c.scrollTop(s.scrollTop)}n?c.css("display","block"):c.css("display","none")}},destroy:function(){var e=this,o=e.get("target"),t=e.get("proxyEl"),r=e.target_mousewheelFn;o.detach("mousewheel",r);var l=e.body_mousewheelFn;l&&a(document.body).detach("mousewheel",l);var n=e.refreshFn;o.detach("mouseenter",n),o.detach("mousemove",n),a(window).detach("resize",n);var s=e.target_mouseenterFn;o.detach("mouseenter",s);var c=e.target_mousemoveFn;o.detach("mousemove",c);var u=e.target_mouseleaveFn;o.detach("mouseleave",u);var i=e.proxyScrollFn;t.detach("scroll",i);var d=e.proxy_mousedownFn;t.detach("mousedown",d);var v=e.proxy_mouseupFn;t.detach("mouseup",v);var h=e.proxy_mouseenterFn;t.detach("mouseenter",h);var m=e.proxy_mouseleaveFn;t.detach("mouseleave",m),e.target_mousewheelFn=null,e.body_mousewheelFn=null,e.refreshFn=null,e.target_mouseenterFn=null,e.target_mousemoveFn=null,e.target_mouseleaveFn=null,e.proxyScrollFn=null,e.proxy_mousedownFn=null,e.proxy_mouseupFn=null,e.proxy_mouseenterFn=null,e.proxy_mouseleaveFn=null,e.get("el").remove(),e.set("el",null),e.get("proxyEl").remove(),e.set("proxyEl",null),e.set("proxyContentEl",null),function(e){e.removeClass("scrollbar");var o=e[0];o._scrollbarEl=null}(o)}},{ATTRS:{el:{setter:function(e){return a(e)}},target:{value:a(document.body),setter:function(e){var o=a(e);return o.length||(o=a(document.body)),o}},style:{},disabled:{value:!1},autoHide:{value:!1},proxyEl:{value:null},proxyContentEl:{value:null},proxyZIndex:{value:null},events:{value:{}}}}),s},{requires:["node","sizzle","base","ua","cute/scrollbar/tpl","cute/util/statistic"]});KISSY.add("cute/scrollbar/tpl",function(){"use strict";return{scrollbar:'<div class="scrollbar-wrapper"><div class="scrollbar-div"></div></div>'}},{requires:[]});KISSY.add("cute/sidemenu/tpl",function(){"use strict";return{sidemenu:['<ul class="sidemenu-wrapper">','<li class="sidemenu-toolbar">','<div class="toolbar-collapse">','<div class="collapse-icon icon-e612"></div>','<div class="expand-icon icon-e611"></div>',"</div>","</li>",'<li class="sidemenu-body{{#if isFixed}} scrollbar{{/if}}">','<ul class="sidemenu-ul sidemenu-ul1">',"{{#each menus}}",'<li class="sidemenu-li sidemenu-li1{{#if children.length}} sidemenu-li-children{{/if}}">','<div class="sidemenu-li-a{{#if url}} sidemenu-li-url{{/if}}"',' title="{{text}}"',' _id="{{id}}" _url="{{url}}" id="menu_{{id}}">','<div class="sidemenu-li-icon icon-{{{iconfont}}}"></div>',"{{text}}",'<div class="sidemenu-li-arrow icon-e60d"></div>','<div class="sidemenu-li-blankArrow"></div>',"</div>","{{#if children.length}}",'<ul class="sidemenu-ul sidemenu-ul2">',"{{#each children}}",'<li class="sidemenu-li sidemenu-li2{{#if children.length}} sidemenu-li-children{{/if}}">','<div class="sidemenu-li-a{{#if url}} sidemenu-li-url{{/if}}"',' title="{{text}}"',' _id="{{id}}" _url="{{url}}" id="menu_{{id}}">',"{{text}}",'<div class="sidemenu-li-arrow icon-e60d"></div>',"</div>","{{#if children.length}}",'<ul class="sidemenu-ul sidemenu-ul3">',"{{#each children}}",'<li class="sidemenu-li sidemenu-li3{{#if children.length}} sidemenu-li-children{{/if}}">','<div class="sidemenu-li-a{{#if url}} sidemenu-li-url{{/if}}"',' title="{{text}}"',' _id="{{id}}" _url="{{url}}" id="menu_{{id}}">',"{{text}}","</div>","</li>","{{/each}}","</ul>","{{/if}}","</li>","{{/each}}","</ul>","{{/if}}","</li>","{{/each}}","</ul>",,"</li>","</ul>"].join("")}},{requires:[]});

KISSY.add("cute/hint/index",function(t,e,i,n,r,a){"use strict";function s(t){var e=this;s.superclass.constructor.call(e,t),e.constructor.widgets[e.get("widgetId")]=e}var c=e.all;return t.extend(s,r,{createHtml:function(t){var e=this,i=e.getTemplate("hint"),n=e.isClick,r=e.isClose;return i.render({clickClass:n?s.CLICKCLASS:"",closeClass:r?s.CLOSECLASS:"",closeDOM:r?'<span class="icon-close '+s.CLOSEBTNCLASS+'"></span>':"",position:e.get("position"),cls:e.get("cls"),style:e.get("style"),text:t.attr("data-hint")})},getParentHints:function(){var t=function(t){var e=c(t.eventTarget).parent(".hint");if(e)return e.data("widget")};return function(){for(var e=this,i=[],n=e;;){var r=t(n);if(!r)break;i.push(r),n=r}return i}}(),refreshPosition:function(e){var i=this,n=i.hint,r=n.get("visible");if(r){var a=i.get("position");switch(a){case"tl":a=["tl","bl"];break;case"tr":a=["tr","br"];break;case"bl":a=["bl","tl"];break;case"br":a=["br","tr"];break;case"lt":a=["tl","tr"];break;case"lb":a=["bl","br"];break;case"rt":a=["tr","tl"];break;case"rb":a=["br","bl"];break;default:a=["bl","tl"]}n.set("align",t.mix({node:i.eventTarget,points:a,offset:i.get("offset")},e))}},show:function(e){var i=this,n=i.hint,r=n.get("visible"),a=i.eventTarget=e.currentTarget,s=c(a),l=i.get("target"),o=i.get("srcNode");o&&o.length?i.rendered||n.set("content",i.createHtml(s)):n.set("content",i.createHtml(s)),i.refreshPosition({offset:[-1e4,-1e4]}),n.show();var h=n.get("el").one(".hint");o&&o.length&&!i.rendered&&(o.css({position:"relative"}),h.append(o.show()),i.attachEvent(h,"click",function(t){var e=i.getParentHints();e.push(i),t._parentHints=e,c(document).fire("click",t),t.stopPropagation()}),i.attachEvent(document,"click",function(e){var n=e._parentHints;if(!n||!t.inArray(i,n)){var r=e.target,a=c(r);if(1==l.length){var s=l.attr("id");s||(s=t.guid("hint_"),l.attr("id",s));var o=l[0];if(r==o||a.parent("#"+s))return}else if(l.length>1){var h=!1;if(l[0].all(l[1]).each(function(e){var i=e.attr("id");i||(i=t.guid("hint_"),e.attr("id",i));var n=e[0];return r==n||a.parent("#"+i)?(h=!0,!1):void 0}),h)return}i.hide()}}),i.rendered=!0),i.refreshPosition(),i.refreshPosition(),h.data("widget",i),r&&i.fire("show",{eventTarget:i.eventTarget})},hide:function(){var t=this,e=t.hint;if(e.get("visible")){var i=t.fire("beforeHide");i!==!1&&e.hide()}},bindUI:function(){var e=this;s.superclass.bindUI.apply(e,arguments);var i=e.get("target"),n=e.hint,r=e.showAction,a=e.hideAction,l=e.show,o=e.hide;if(e.attachEvent(n,"show",function(){e.fire("show",{eventTarget:e.eventTarget})}),e.attachEvent(n,"hide",function(){e.fire("hide")}),t.isArray(i)){var h=i[0],u=i[1];e.isClick?r&&e.delegate(h,r,u,function(t){var i=t.currentTarget;n.get("visible")&&i==e.eventTarget?o.call(this):l.call(this,t)},e):r&&e.delegate(h,r,u,l,e),a&&e.delegate(h,a,u,o,e)}else e.isClick?r&&e.attachEvent(i,r,function(t){n.get("visible")?o.call(this):l.call(this,t)},e):r&&e.attachEvent(i,r,l,e),a&&e.attachEvent(i,a,o,e);if(e.isClick){var v=function(){e.hide()};e.attachEvent(e,"show",function(){var t=n.get("el"),i=c("."+s.CLOSEBTNCLASS,t);i.detach("click",v),e.attachEvent(i,"click",v),t&&t.all(".uploader-btn").css({visibility:"visible"})}),e.attachEvent(e,"hide",function(){var t=n.get("el");t&&t.all(".uploader-btn").css({visibility:"hidden"})}),e.attachEvent(window,"resize scroll",function(){e.refreshPosition()}),e.attachEvent(window,"resize scroll",t.buffer(function(){e.refreshPosition()},20))}e.attachEvent(e,"hide",function(){var t=e.hint.get("el");t&&t.css({left:-1e4,top:-1e4})})},prepare:function(){var t=this;s.superclass.prepare.apply(t,arguments),t.get("click")?(t.isClick=!0,t.showAction="click"):(t.showAction="mouseenter",t.hideAction="mouseleave"),t.get("close")&&(t.isClose=!0)},initTpl:function(){var t=this;s.superclass.initTpl.apply(t,arguments),t.addTemplate("hint",a.hint)},renderUI:function(){var e=this;s.superclass.renderUI.apply(e,arguments);var i=e.hint=new n(t.mix({effect:{effect:"fade",duration:.2},elCls:"ks-overlay-hint"},e.get("overlayConfig"))),r=e.get("srcNode");e.addElement("srcNode",r),e.addElement("hint",i)}},{CLICKCLASS:"hint-click",CLOSECLASS:"hint-close",CLOSEBTNCLASS:"hint-close-btn",widgets:{},getVisibleWidgets:function(){var e=this.widgets,i=[];return t.each(e,function(t){t.hint.get("visible")&&i.push(t)}),i},ATTRS:{target:{setter:function(e){return t.isArray(e)?[c(e[0]),e[1]]:c(e)}},position:{value:"bl"},close:{value:!1},click:{value:!1},srcNode:{setter:function(t){return c(t)}},offset:{value:[0,0]},overlayConfig:{value:null}}}),t.namespace("CUTE",!0).Hint=s,s},{requires:["node","sizzle","overlay","cute/component/","cute/hint/tpl"]});KISSY.add("cute/component/index",function(e,t,n,a,r,i){"use strict";function s(e){var t=this;s.superclass.constructor.call(t,t.parseConfig(e)),t.init(),t.fire("create")}var c=t.all;return e.extend(s,a,{initTpl:e.noop,renderUI:e.noop,bindUI:e.noop,init:function(){var e=this;e.prepare(),e.initTpl(),e.renderUI(),e.bindUI()},parseConfig:function(t){var n=this;return t=t||{},e.isString(t)&&(t={target:t}),n.set("initConfig",e.clone(t)),t},prepare:function(){var t=this,n=t.get("widgetId")||e.guid("widget_");t.set("widgetId",n),i.set(n,t);var a=t.get("target");e.isArray(a)||a&&a.data("widget",t),t.attachOuterEvents()},destroy:function(){var t=this,n=t.get("widgetId");i.remove(n);var a=t.get("target");e.isArray(a)||a&&a.removeData("widget"),t.detach(),t.detachInnerEvents(),t.destroyElements(),t.fire("destroy")},attachOuterEvents:function(){var t=this,n=t.get("events");e.each(n,function(e,n){t.on(n,e)})},detachOuterEvents:function(){var t=this,n=t.get("events");e.each(n,function(e,n){t.detach(n,e)})},attachEvent:function(t){var n=this,a=n.get("innerEvents"),r={el:t,method:"on",args:e.makeArray(arguments).slice(1)};n.attachInnerEvent(r),a.push(r)},delegate:function(t){var n=this,a=n.get("innerEvents"),r={el:t,method:"delegate",args:e.makeArray(arguments).slice(1)};n.attachInnerEvent(r),a.push(r)},innerEventHandler:function(t,n){if("attach"==t||"detach"==t){var a=n.el,r=n.method;if("detach"==t&&(r="on"==r?"detach":"delegate"==r?"undelegate":""),r){var i=n.args,s=e.makeArray(a);e.each(s,function(e){var t=e[r];t?t.apply(e,i):(e=c(e),t=e[r],t&&t.apply(e,i))})}}},attachInnerEvent:function(e){var t=this;t.innerEventHandler("attach",e)},innerEventsHandler:function(t){var n=this;if("attach"==t||"detach"==t){var a=n.get("innerEvents");e.each(a,function(e){n.innerEventHandler(t,e)})}},detachInnerEvents:function(){var e=this;e.innerEventsHandler("detach")},addTemplate:function(t,n){var a=this;if(1==arguments.length&&e.isPlainObject(t))e.each(t,function(e,t){a.addTemplate(t,e)});else{var i=a.get("templates");e.isString(n)&&(n=new r(n)),i[t]=n}},getTemplate:function(e){var t=this,n=t.get("templates");return n[e]},addElement:function(t,n){var a=this;if(1==arguments.length&&e.isPlainObject(t))e.each(t,function(e,t){a.addElement(t,e)});else{var r=a.get("elements");r[t]=n}},getElement:function(e){var t=this,n=t.get("elements");return n[e]},destroyElements:function(){var t=this,n=t.get("elements");e.each(n,function(e){e&&(e.destroy?e.destroy():e.remove&&e.remove())})}},{ATTRS:{widgetId:{value:null},target:{value:null,setter:function(e){return c(e)}},templates:{value:{}},elements:{value:{}},events:{value:{}},innerEvents:{value:[]},initConfig:{value:null}}}),e.namespace("CUTE",!0).Component=s,s},{requires:["node","sizzle","base","xtemplate","cute/widget/","cute/util/statistic"]});KISSY.add("cute/widget/index",function(e,t,r,i,a,n){"use strict";var u=t.all,o=["packageName","type","id"],s=[];e.each(o,function(e){s.push("widget"+e.substr(0,1).toUpperCase()+e.substr(1))});var c={widgets:{},get:function(e){var t=this;return t.widgets[e]},set:function(e,t){var r=this;r.widgets[e]=t},remove:function(e){var t=this;delete t.widgets[e]},init:function(t,r){var n=this;1==arguments.length&&(r=arguments[0],t={},e.each(o,function(e,i){var a=s[i],n=r[a];t[e]=n||r[e],n?delete r[a]:delete r[e]}));var c=t.type;if(!c)return void e.log("初始化控件出错！请配置控件类型(type)！\n	"+a.stringify(t),"error");var d=t.packageName=t.packageName||"cute",l=new i.Defer;if("cute"==d&&e.inArray(c,["css","body","crumb"]))return l.resolve(),l.promise;var v=t.id=t.id||e.guid("widget_");e.each(o,function(e,i){var a=s[i];r[a]=t[e]});var f=null;return f="cute"==d&&"xselect"==c?d+"/"+c+"v2/"+c:d+"/"+c+"/",e.use(f,function(e,t){var i=r.target;i||(i="#"+v,r.target=i);var a=null;e.isFunction(t)?a=new t(r):e.isObject(t)&&t.init&&(a=t.init(r)),a&&(n.set(v,a),i&&!e.isArray(i)&&u(i).data("widget",a)),l.resolve(a)}),l.promise},initWidgets:function(t){var r=this;t=n.getArray(t);var a=[];e.each(t,function(t){var i=null;if("grid"==t.type){var n=t._autoload;if(null==n){var u=t.autoload;null==u&&(u=!0),t.autoload=!1,t._autoload=u}}i=e.isArray(t)?r.init.apply(r,t):r.init(t),a.push(i)});var u=i.all(a);if(!u){var o=new i.Defer;o.resolve([]),u=o.promise}return u=u.then(function(e){return c.loadGrid(e),e})},exists:function(t,r){var i=this;t=n.getArray(t);var a=[],u=[];e.each(t,function(e){var t=i.get(e);a.push(t),u.push(!!t)});var o=!1;u.length&&(o=e.reduce(u,function(e,t){return e&&t})),o&&r.apply(i,a)},loadGrid:function(t){var r=e.namespace("CUTE",!0),i=r.Form,a=r.Grid,n=[];e.each(t,function(e){if(i&&e instanceof i){var t=e.get("grid");t&&(t._form=e)}else a&&e instanceof a&&n.push(e)}),e.each(n,function(e){if(!e.get("autoload")&&e.get("_autoload")&&!e._loaded){var t=e._form;t?t.query():e.reload(),e._loaded=!0}})}};return e.namespace("CUTE",!0).Widget=c,c},{requires:["node","sizzle","promise","json","cute/util/","cute/util/statistic"]});KISSY.add("cute/hint/tpl",function(){"use strict";return{hint:["<div",' class="hint hint-{{position}} {{clickClass}} {{closeClass}} {{cls}}"',' style="{{style}}"',">",'<div class="text">{{{text}}}</div>','<i class="triangle"></i>','<em class="triangle-masker"></em>',"{{{closeDOM}}}","</div>"].join("")}},{requires:[]});

/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:07
*/
KISSY.add("node/anim",function(a,f,g,e,j){function d(a,h,c){for(var b=[],i={},c=c||0;c<h;c++)b.push.apply(b,k[c]);for(c=0;c<b.length;c++)i[b[c]]=a;return i}var k=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];a.augment(e,{animate:function(e){var h=a.makeArray(arguments);a.each(this,function(c){var b=a.clone(h),i=b[0];i.props?(i.el=c,g(i).run()):g.apply(j,[c].concat(b)).run()});return this},stop:function(e,
h,c){a.each(this,function(b){g.stop(b,e,h,c)});return this},pause:function(e,h){a.each(this,function(c){g.pause(c,h)});return this},resume:function(e,h){a.each(this,function(c){g.resume(c,h)});return this},isRunning:function(){for(var a=0;a<this.length;a++)if(g.isRunning(this[a]))return!0;return!1},isPaused:function(){for(var a=0;a<this.length;a++)if(g.isPaused(this[a]))return 1;return 0}});a.each({show:d("show",3),hide:d("hide",3),toggle:d("toggle",3),fadeIn:d("show",3,2),fadeOut:d("hide",3,2),fadeToggle:d("toggle",
3,2),slideDown:d("show",1),slideUp:d("hide",1),slideToggle:d("toggle",1)},function(d,h){e.prototype[h]=function(c,b,i){if(f[h]&&!c)f[h](this);else a.each(this,function(a){g(a,d,c,i||"easeOut",b).run()});return this}})},{requires:["dom","anim","./base"]});
KISSY.add("node/attach",function(a,f,g,e,j){function d(a,c,b){b.unshift(c);a=f[a].apply(f,b);return a===j?c:a}var k=e.prototype,l=a.makeArray;e.KeyCodes=g.KeyCodes;a.each("nodeName,equals,contains,index,scrollTop,scrollLeft,height,width,innerHeight,innerWidth,outerHeight,outerWidth,addStyleSheet,appendTo,prependTo,insertBefore,before,after,insertAfter,test,hasClass,addClass,removeClass,replaceClass,toggleClass,removeAttr,hasAttr,hasProp,scrollIntoView,remove,empty,removeData,hasData,unselectable,wrap,wrapAll,replaceWith,wrapInner,unwrap".split(","),function(a){k[a]=
function(){var c=l(arguments);return d(a,this,c)}});a.each("filter,first,last,parent,closest,next,prev,clone,siblings,contents,children".split(","),function(a){k[a]=function(){var c=l(arguments);c.unshift(this);c=f[a].apply(f,c);return c===j?this:c===null?null:new e(c)}});a.each({attr:1,text:0,css:1,style:1,val:0,prop:1,offset:0,html:0,outerHTML:0,data:1},function(e,c){k[c]=function(){var b;b=l(arguments);b[e]===j&&!a.isObject(b[0])?(b.unshift(this),b=f[c].apply(f,b)):b=d(c,this,b);return b}});a.each("on,detach,fire,fireHandler,delegate,undelegate".split(","),
function(a){k[a]=function(){var c=l(arguments);c.unshift(this);g[a].apply(g,c);return this}})},{requires:["dom","event/dom","./base"]});
KISSY.add("node/base",function(a,f,g){function e(b,i,d){if(!(this instanceof e))return new e(b,i,d);if(b)if("string"==typeof b){if(b=f.create(b,i,d),b.nodeType===k.DOCUMENT_FRAGMENT_NODE)return l.apply(this,h(b.childNodes)),this}else{if(a.isArray(b)||c(b))return l.apply(this,h(b)),this}else return this;this[0]=b;this.length=1;return this}var j=Array.prototype,d=j.slice,k=f.NodeType,l=j.push,h=a.makeArray,c=f._isNodeList;e.prototype={constructor:e,length:0,item:function(b){return a.isNumber(b)?b>=
this.length?null:new e(this[b]):new e(b)},add:function(b,c,d){a.isNumber(c)&&(d=c,c=g);b=e.all(b,c).getDOMNodes();c=new e(this);d===g?l.apply(c,b):(d=[d,0],d.push.apply(d,b),j.splice.apply(c,d));return c},slice:function(b,a){return new e(d.apply(this,arguments))},getDOMNodes:function(){return d.call(this)},each:function(b,c){var d=this;a.each(d,function(a,f){a=new e(a);return b.call(c||a,a,f,d)});return d},getDOMNode:function(){return this[0]},end:function(){return this.__parent||this},all:function(b){b=
0<this.length?e.all(b,this):new e;b.__parent=this;return b},one:function(b){b=this.all(b);if(b=b.length?b.slice(0,1):null)b.__parent=this;return b}};a.mix(e,{all:function(b,c){return"string"==typeof b&&(b=a.trim(b))&&3<=b.length&&a.startsWith(b,"<")&&a.endsWith(b,">")?(c&&(c.getDOMNode&&(c=c[0]),c=c.ownerDocument||c),new e(b,g,c)):new e(f.query(b,c))},one:function(b,a){var c=e.all(b,a);return c.length?c.slice(0,1):null}});e.NodeType=k;return e},{requires:["dom"]});
KISSY.add("node",function(a,f){a.mix(a,{Node:f,NodeList:f,one:f.one,all:f.all});return f},{requires:["node/base","node/attach","node/override","node/anim"]});
KISSY.add("node/override",function(a,f,g){var e=g.prototype;a.each(["append","prepend","before","after"],function(a){e[a]=function(d){"string"==typeof d&&(d=f.create(d));if(d)f[a](d,this);return this}});a.each(["wrap","wrapAll","replaceWith","wrapInner"],function(a){var d=e[a];e[a]=function(a){"string"==typeof a&&(a=g.all(a,this[0].ownerDocument));return d.call(this,a)}})},{requires:["dom","./base","./attach"]});
/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:00
*/
KISSY.add("anim",function(b,d,f){d.Easing=f;b.mix(b,{Anim:d,Easing:d.Easing});return d},{requires:["anim/base","anim/easing","anim/color","anim/background-position"]});
KISSY.add("anim/background-position",function(b,d,f,g){function a(a){a=a.replace(/left|top/g,"0px").replace(/right|bottom/g,"100%").replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");a=a.match(/(-?[0-9\.]+)(px|%|em|pt)\s(-?[0-9\.]+)(px|%|em|pt)/);return[parseFloat(a[1]),a[2],parseFloat(a[3]),a[4]]}function c(){c.superclass.constructor.apply(this,arguments)}b.extend(c,g,{load:function(){c.superclass.load.apply(this,arguments);this.unit=["px","px"];if(this.from){var b=a(this.from);this.from=[b[0],b[2]]}else this.from=
[0,0];this.to?(b=a(this.to),this.to=[b[0],b[2]],this.unit=[b[1],b[3]]):this.to=[0,0]},interpolate:function(a,b,d){var f=this.unit,g=c.superclass.interpolate;return g(a[0],b[0],d)+f[0]+" "+g(a[1],b[1],d)+f[1]},cur:function(){return d.css(this.anim.config.el,"backgroundPosition")},update:function(){var a=this.prop,b=this.anim.config.el,c=this.interpolate(this.from,this.to,this.pos);d.css(b,a,c)}});return g.Factories.backgroundPosition=c},{requires:["dom","./base","./fx"]});
KISSY.add("anim/base",function(b,d,f,g,a,c,j){function e(a,c,h,f,j){if(a.el)return h=a.el,c=a.props,delete a.el,delete a.props,new e(h,c,a);if(a=d.get(a)){if(!(this instanceof e))return new e(a,c,h,f,j);c="string"==typeof c?b.unparam(""+c,";",":"):b.clone(c);b.each(c,function(a,d){var h=b.trim(p(d));h?d!=h&&(c[h]=c[d],delete c[d]):delete c[d]});h=b.isPlainObject(h)?b.clone(h):{duration:parseFloat(h)||void 0,easing:f,complete:j};h=b.merge(x,h);h.el=a;h.props=c;this.config=h;this._duration=1E3*h.duration;
this.domEl=a;this._backupProps={};this._fxs={};this.on("complete",i)}}function i(a){var c,h,e=this.config;b.isEmptyObject(c=this._backupProps)||d.css(e.el,c);(h=e.complete)&&h.call(this,a)}function m(){var e=this.config,f=this._backupProps,h=e.el,k,j,i,q=e.specialEasing||{},u=this._fxs,m=e.props;s(this);if(!1===this.fire("beforeStart"))this.stop(0);else{if(h.nodeType==v.ELEMENT_NODE)for(i in j="none"===d.css(h,"display"),m)if(k=m[i],"hide"==k&&j||"show"==k&&!j){this.stop(1);return}if(h.nodeType==
v.ELEMENT_NODE&&(m.width||m.height))k=h.style,b.mix(f,{overflow:k.overflow,"overflow-x":k.overflowX,"overflow-y":k.overflowY}),k.overflow="hidden","inline"===d.css(h,"display")&&"none"===d.css(h,"float")&&(y.ie?k.zoom=1:k.display="inline-block");b.each(m,function(a,d){var c;b.isArray(a)?(c=q[d]=a[1],m[d]=a[0]):c=q[d]=q[d]||e.easing;"string"==typeof c&&(c=q[d]=g[c]);q[d]=c||g.easeNone});b.each(w,function(a,c){var e,f;if(f=m[c])e={},b.each(a,function(a){e[a]=d.css(h,a);q[a]=q[c]}),d.css(h,c,f),b.each(e,
function(a,b){m[b]=d.css(h,b);d.css(h,b,a)}),delete m[c]});for(i in m){k=b.trim(m[i]);var l,p,n={prop:i,anim:this,easing:q[i]},o=c.getFx(n);b.inArray(k,z)?(f[i]=d.style(h,i),"toggle"==k&&(k=j?"show":"hide"),"hide"==k?(l=0,p=o.cur(),f.display="none"):(p=0,l=o.cur(),d.css(h,i,p),d.show(h)),k=l):(l=k,p=o.cur());k+="";var t="",r=k.match(A);if(r){l=parseFloat(r[2]);if((t=r[3])&&"px"!==t)d.css(h,i,k),p*=l/o.cur(),d.css(h,i,p+t);r[1]&&(l=("-="===r[1]?-1:1)*l+p)}n.from=p;n.to=l;n.unit=t;o.load(n);u[i]=o}this._startTime=
b.now();a.start(this)}}function s(a){var c=a.config.el,e=d.data(c,n);e||d.data(c,n,e={});e[b.stamp(a)]=a}function l(a){var c=a.config.el,e=d.data(c,n);e&&(delete e[b.stamp(a)],b.isEmptyObject(e)&&d.removeData(c,n))}function q(a,c,e){a=d.data(a,"resume"==e?o:n);a=b.merge(a);b.each(a,function(a){if(void 0===c||a.config.queue==c)a[e]()})}function u(a,c,e,f){e&&!1!==f&&j.removeQueue(a,f);a=d.data(a,n);a=b.merge(a);b.each(a,function(a){a.config.queue==f&&a.stop(c)})}var y=b.UA,p=d._camelCase,v=d.NodeType,
z=["hide","show","toggle"],w={background:["backgroundPosition"],border:["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth"],borderBottom:["borderBottomWidth"],borderLeft:["borderLeftWidth"],borderTop:["borderTopWidth"],borderRight:["borderRightWidth"],font:["fontSize","fontWeight"],margin:["marginBottom","marginLeft","marginRight","marginTop"],padding:["paddingBottom","paddingLeft","paddingRight","paddingTop"]},x={duration:1,easing:"easeNone"},A=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i;
e.SHORT_HANDS=w;e.prototype={constructor:e,isRunning:function(){var a=d.data(this.config.el,n);return a?!!a[b.stamp(this)]:0},isPaused:function(){var a=d.data(this.config.el,o);return a?!!a[b.stamp(this)]:0},pause:function(){if(this.isRunning()){this._pauseDiff=b.now()-this._startTime;a.stop(this);l(this);var c=this.config.el,e=d.data(c,o);e||d.data(c,o,e={});e[b.stamp(this)]=this}return this},resume:function(){if(this.isPaused()){this._startTime=b.now()-this._pauseDiff;var c=this.config.el,e=d.data(c,
o);e&&(delete e[b.stamp(this)],b.isEmptyObject(e)&&d.removeData(c,o));s(this);a.start(this)}return this},_runInternal:m,run:function(){!1===this.config.queue?m.call(this):j.queue(this);return this},_frame:function(){var a,c=this.config,e=1,b,d,f=this._fxs;for(a in f)if(!(d=f[a]).finished)c.frame&&(b=c.frame(d)),1==b||0==b?(d.finished=b,e&=b):(e&=d.frame())&&c.frame&&c.frame(d);(!1===this.fire("step")||e)&&this.stop(e)},stop:function(c){var e=this.config,b=e.queue,d,f=this._fxs;if(!this.isRunning())return!1!==
b&&j.remove(this),this;if(c){for(d in f)if(!(c=f[d]).finished)e.frame?e.frame(c,1):c.frame(1);this.fire("complete")}a.stop(this);l(this);!1!==b&&j.dequeue(this);return this}};b.augment(e,f.Target);var n=b.guid("ks-anim-unqueued-"+b.now()+"-"),o=b.guid("ks-anim-paused-"+b.now()+"-");e.stop=function(a,c,e,f){if(null===f||"string"==typeof f||!1===f)return u.apply(void 0,arguments);e&&j.removeQueues(a);var i=d.data(a,n),i=b.merge(i);b.each(i,function(a){a.stop(c)})};b.each(["pause","resume"],function(a){e[a]=
function(c,e){if(null===e||"string"==typeof e||!1===e)return q(c,e,a);q(c,void 0,a)}});e.isRunning=function(a){return(a=d.data(a,n))&&!b.isEmptyObject(a)};e.isPaused=function(a){return(a=d.data(a,o))&&!b.isEmptyObject(a)};e.Q=j;return e},{requires:"dom,event,./easing,./manager,./fx,./queue".split(",")});
KISSY.add("anim/color",function(b,d,f,g){function a(a){var a=a+"",c;if(c=a.match(m))return[parseInt(c[1]),parseInt(c[2]),parseInt(c[3])];if(c=a.match(s))return[parseInt(c[1]),parseInt(c[2]),parseInt(c[3]),parseInt(c[4])];if(c=a.match(l)){for(a=1;a<c.length;a++)2>c[a].length&&(c[a]+=c[a]);return[parseInt(c[1],j),parseInt(c[2],j),parseInt(c[3],j)]}return i[a=a.toLowerCase()]?i[a]:[255,255,255]}function c(){c.superclass.constructor.apply(this,arguments)}var j=16,e=Math.floor,i={black:[0,0,0],silver:[192,
192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]},m=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,s=/^rgba\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+),\s*([0-9]+)\)$/i,l=/^#?([0-9A-F]{1,2})([0-9A-F]{1,2})([0-9A-F]{1,2})$/i,d=f.SHORT_HANDS;d.background=d.background||[];d.background.push("backgroundColor");
d.borderColor=["borderBottomColor","borderLeftColor","borderRightColor","borderTopColor"];d.border.push("borderBottomColor","borderLeftColor","borderRightColor","borderTopColor");d.borderBottom.push("borderBottomColor");d.borderLeft.push("borderLeftColor");d.borderRight.push("borderRightColor");d.borderTop.push("borderTopColor");b.extend(c,g,{load:function(){c.superclass.load.apply(this,arguments);this.from&&(this.from=a(this.from));this.to&&(this.to=a(this.to))},interpolate:function(a,b,d){var f=
c.superclass.interpolate;if(3==a.length&&3==b.length)return"rgb("+[e(f(a[0],b[0],d)),e(f(a[1],b[1],d)),e(f(a[2],b[2],d))].join(", ")+")";if(4==a.length||4==b.length)return"rgba("+[e(f(a[0],b[0],d)),e(f(a[1],b[1],d)),e(f(a[2],b[2],d)),e(f(a[3]||1,b[3]||1,d))].join(", ")+")"}});b.each("backgroundColor,borderBottomColor,borderLeftColor,borderRightColor,borderTopColor,color,outlineColor".split(","),function(a){g.Factories[a]=c});return c},{requires:["dom","./base","./fx"]});
KISSY.add("anim/easing",function(){var b=Math.PI,d=Math.pow,f=Math.sin,g={swing:function(a){return-Math.cos(a*b)/2+0.5},easeNone:function(a){return a},easeIn:function(a){return a*a},easeOut:function(a){return(2-a)*a},easeBoth:function(a){return 1>(a*=2)?0.5*a*a:0.5*(1- --a*(a-2))},easeInStrong:function(a){return a*a*a*a},easeOutStrong:function(a){return 1- --a*a*a*a},easeBothStrong:function(a){return 1>(a*=2)?0.5*a*a*a*a:0.5*(2-(a-=2)*a*a*a)},elasticIn:function(a){return 0===a||1===a?a:-(d(2,10*(a-=
1))*f((a-0.075)*2*b/0.3))},elasticOut:function(a){return 0===a||1===a?a:d(2,-10*a)*f((a-0.075)*2*b/0.3)+1},elasticBoth:function(a){return 0===a||2===(a*=2)?a:1>a?-0.5*d(2,10*(a-=1))*f((a-0.1125)*2*b/0.45):0.5*d(2,-10*(a-=1))*f((a-0.1125)*2*b/0.45)+1},backIn:function(a){1===a&&(a-=0.001);return a*a*(2.70158*a-1.70158)},backOut:function(a){return(a-=1)*a*(2.70158*a+1.70158)+1},backBoth:function(a){var c,b=(c=2.5949095)+1;return 1>(a*=2)?0.5*a*a*(b*a-c):0.5*((a-=2)*a*(b*a+c)+2)},bounceIn:function(a){return 1-
g.bounceOut(1-a)},bounceOut:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375},bounceBoth:function(a){return 0.5>a?0.5*g.bounceIn(2*a):0.5*g.bounceOut(2*a-1)+0.5}};return g});
KISSY.add("anim/fx",function(b,d,f){function g(a){this.load(a)}function a(a,b){return(!a.style||null==a.style[b])&&null!=d.attr(a,b,f,1)?1:0}g.prototype={constructor:g,load:function(a){b.mix(this,a);this.pos=0;this.unit=this.unit||""},frame:function(a){var d=this.anim,e=0;if(this.finished)return 1;var f=b.now(),g=d._startTime,d=d._duration;a||f>=d+g?e=this.pos=1:this.pos=this.easing((f-g)/d);this.update();this.finished=this.finished||e;return e},interpolate:function(a,d,e){return b.isNumber(a)&&b.isNumber(d)?
(a+(d-a)*e).toFixed(3):f},update:function(){var c=this.prop,b=this.anim.config.el,e=this.to,i=this.interpolate(this.from,e,this.pos);i===f?this.finished||(this.finished=1,d.css(b,c,e)):(i+=this.unit,a(b,c)?d.attr(b,c,i,1):d.css(b,c,i))},cur:function(){var c=this.prop,b=this.anim.config.el;if(a(b,c))return d.attr(b,c,f,1);var e,c=d.css(b,c);return isNaN(e=parseFloat(c))?!c||"auto"===c?0:c:e}};g.Factories={};g.getFx=function(a){return new (g.Factories[a.prop]||g)(a)};return g},{requires:["dom"]});
KISSY.add("anim/manager",function(b){var d=b.stamp;return{interval:15,runnings:{},timer:null,start:function(b){var g=d(b);this.runnings[g]||(this.runnings[g]=b,this.startTimer())},stop:function(b){this.notRun(b)},notRun:function(f){delete this.runnings[d(f)];b.isEmptyObject(this.runnings)&&this.stopTimer()},pause:function(b){this.notRun(b)},resume:function(b){this.start(b)},startTimer:function(){var b=this;b.timer||(b.timer=setTimeout(function(){b.runFrames()?b.stopTimer():(b.timer=0,b.startTimer())},
b.interval))},stopTimer:function(){var b=this.timer;b&&(clearTimeout(b),this.timer=0)},runFrames:function(){var b=1,d,a=this.runnings;for(d in a)b=0,a[d]._frame();return b}}});
KISSY.add("anim/queue",function(b,d){function f(b,f,g){var f=f||c,j,l=d.data(b,a);!l&&!g&&d.data(b,a,l={});l&&(j=l[f],!j&&!g&&(j=l[f]=[]));return j}function g(e,f){var f=f||c,g=d.data(e,a);g&&delete g[f];b.isEmptyObject(g)&&d.removeData(e,a)}var a=b.guid("ks-queue-"+b.now()+"-"),c=b.guid("ks-queue-"+b.now()+"-"),j={queueCollectionKey:a,queue:function(a){var b=f(a.config.el,a.config.queue);b.push(a);"..."!==b[0]&&j.dequeue(a);return b},remove:function(a){var c=f(a.config.el,a.config.queue,1);c&&(a=
b.indexOf(a,c),-1<a&&c.splice(a,1))},removeQueues:function(b){d.removeData(b,a)},removeQueue:g,dequeue:function(a){var b=a.config.el,a=a.config.queue,c=f(b,a,1),d=c&&c.shift();"..."==d&&(d=c.shift());d?(c.unshift("..."),d._runInternal()):g(b,a)}};return j},{requires:["dom"]});
/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:07
*/
KISSY.add("sizzle",function(){function k(a,b,c,d){var c=c||[],b=b||j,g,f,e,i,h=b.nodeType;if(!a||"string"!==typeof a)return c;if(1!==h&&9!==h)return[];e=E(b);if(!e&&!d&&(g=fa.exec(a)))if(i=g[1])if(9===h)if((f=b.getElementById(i))&&f.parentNode){if(f.id===i)return c.push(f),c}else return c;else{if(b.ownerDocument&&(f=b.ownerDocument.getElementById(i))&&v(b,f)&&f.id===i)return c.push(f),c}else{if(g[2])return z.apply(c,A.call(b.getElementsByTagName(a),0)),c;if((i=g[3])&&X&&b.getElementsByClassName)return z.apply(c,
A.call(b.getElementsByClassName(i),0)),c}return L(a.replace(F,"$1"),b,c,d,e)}function B(a){return function(b){return"input"===b.nodeName.toLowerCase()&&b.type===a}}function Y(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function y(a){return s(function(b){b=+b;return s(function(c,d){for(var g,f=a([],c.length,b),e=f.length;e--;)if(c[g=f[e]])c[g]=!(d[g]=c[g])})})}function Z(a,b){if(a&&b)for(var c=a.nextSibling;c;){if(c===b)return-1;c=c.nextSibling}return a?
1:-1}function G(a,b){var c,d,g,f,e,i,h;if(e=$[m][a+" "])return b?0:e.slice(0);e=a;i=[];for(h=l.preFilter;e;){if(!c||(d=ga.exec(e)))d&&(e=e.slice(d[0].length)||e),i.push(g=[]);c=!1;if(d=ha.exec(e))g.push(c=new aa(d.shift())),e=e.slice(c.length),c.type=d[0].replace(F," ");for(f in l.filter)if((d=H[f].exec(e))&&(!h[f]||(d=h[f](d))))g.push(c=new aa(d.shift())),e=e.slice(c.length),c.type=f,c.matches=d;if(!c)break}return b?e.length:e?k.error(a):$(a,i).slice(0)}function M(a,b,c){var d=b.dir,g=c&&"parentNode"===
b.dir,f=ia++;return b.first?function(b,c,f){for(;b=b[d];)if(g||1===b.nodeType)return a(b,c,f)}:function(b,c,h){if(h)for(;b=b[d];){if((g||1===b.nodeType)&&a(b,c,h))return b}else for(var n,r=C+" "+f+" ",w=r+N;b=b[d];)if(g||1===b.nodeType){if((n=b[m])===w)return b.sizset;if("string"===typeof n&&0===n.indexOf(r)){if(b.sizset)return b}else{b[m]=w;if(a(b,c,h))return b.sizset=!0,b;b.sizset=!1}}}}function O(a){return 1<a.length?function(b,c,d){for(var g=a.length;g--;)if(!a[g](b,c,d))return!1;return!0}:a[0]}
function I(a,b,c,d,g){for(var f,e=[],i=0,h=a.length,n=null!=b;i<h;i++)if(f=a[i])if(!c||c(f,d,g))e.push(f),n&&b.push(i);return e}function P(a,b,c,d,g,f){d&&!d[m]&&(d=P(d));g&&!g[m]&&(g=P(g,f));return s(function(e,f,h,n){var r,w,l=[],j=[],m=f.length,p;if(!(p=e)){p=b||"*";for(var q=h.nodeType?[h]:h,o=[],s=0,t=q.length;s<t;s++)k(p,q[s],o);p=o}p=a&&(e||!b)?I(p,l,a,h,n):p;q=c?g||(e?a:m||d)?[]:f:p;c&&c(p,q,h,n);if(d){r=I(q,j);d(r,[],h,n);for(h=r.length;h--;)if(w=r[h])q[j[h]]=!(p[j[h]]=w)}if(e){if(g||a){if(g){r=
[];for(h=q.length;h--;)if(w=q[h])r.push(p[h]=w);g(null,q=[],r,n)}for(h=q.length;h--;)if((w=q[h])&&-1<(r=g?Q.call(e,w):l[h]))e[r]=!(f[r]=w)}}else q=I(q===f?q.splice(m,q.length):q),g?g(null,f,q,n):z.apply(f,q)})}function R(a){var b,c,d,g=a.length,f=l.relative[a[0].type];c=f||l.relative[" "];for(var e=f?1:0,i=M(function(a){return a===b},c,!0),h=M(function(a){return-1<Q.call(b,a)},c,!0),n=[function(a,c,d){return!f&&(d||c!==J)||((b=c).nodeType?i(a,c,d):h(a,c,d))}];e<g;e++)if(c=l.relative[a[e].type])n=
[M(O(n),c)];else{c=l.filter[a[e].type].apply(null,a[e].matches);if(c[m]){for(d=++e;d<g&&!l.relative[a[d].type];d++);return P(1<e&&O(n),1<e&&a.slice(0,e-1).join("").replace(F,"$1"),c,e<d&&R(a.slice(e,d)),d<g&&R(a=a.slice(d)),d<g&&a.join(""))}n.push(c)}return O(n)}function ja(a,b){var c=0,d=0<b.length,g=0<a.length,f=function(f,i,h,n,r){var m,s,o=[],t=0,p="0",q=f&&[],u=null!=r,v=J,y=f||g&&l.find.TAG("*",r&&i.parentNode||i),x=C+=null==v?1:Math.E;u&&(J=i!==j&&i,N=c);for(;null!=(r=y[p]);p++){if(g&&r){for(m=
0;s=a[m];m++)if(s(r,i,h)){n.push(r);break}u&&(C=x,N=++c)}d&&((r=!s&&r)&&t--,f&&q.push(r))}t+=p;if(d&&p!==t){for(m=0;s=b[m];m++)s(q,o,i,h);if(f){if(0<t)for(;p--;)!q[p]&&!o[p]&&(o[p]=ka.call(n));o=I(o)}z.apply(n,o);u&&!f&&0<o.length&&1<t+b.length&&k.uniqueSort(n)}u&&(C=x,J=v);return q};return d?s(f):f}function L(a,b,c,d,g){var f,e,i,h,n=G(a);if(!d&&1===n.length){e=n[0]=n[0].slice(0);if(2<e.length&&"ID"===(i=e[0]).type&&9===b.nodeType&&!g&&l.relative[e[1].type]){b=l.find.ID(i.matches[0].replace(x,""),
b,g)[0];if(!b)return c;a=a.slice(e.shift().length)}for(f=H.needsContext.test(a)?-1:e.length-1;0<=f;f--){i=e[f];if(l.relative[h=i.type])break;if(h=l.find[h])if(d=h(i.matches[0].replace(x,""),S.test(e[0].type)&&b.parentNode||b,g)){e.splice(f,1);a=d.length&&e.join("");if(!a)return z.apply(c,A.call(d,0)),c;break}}}T(a,n)(d,b,g,c,S.test(a));return c}function ba(){}var N,U,l,K,E,v,T,V,D,J,ca=!0,m=("sizcache"+Math.random()).replace(".",""),aa=String,j=window.document,o=j.documentElement,C=0,ia=0,ka=[].pop,
z=[].push,A=[].slice,Q=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(this[b]===a)return b;return-1},s=function(a,b){a[m]=null==b||b;return a},t=function(){var a={},b=[];return s(function(c,d){b.push(c)>l.cacheLength&&delete a[b.shift()];return a[c+" "]=d},a)},da=t(),$=t(),ea=t(),t="\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+"(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w","w#")+
")|)|)[\\x20\\t\\r\\n\\f]*\\]",W=":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+t+")|[^:]|\\\\.)*|.*))\\)|)",F=RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$","g"),ga=/^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,ha=/^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/,la=RegExp(W),fa=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,S=/[\x20\t\r\n\f]*[+~]/,ma=/h\d/i,na=/input|select|textarea|button/i,x=/\\(?!\\)/g,H={ID:/^#((?:\\.|[-\w]|[^\x00-\xa0])+)/,
CLASS:/^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/,NAME:/^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/,TAG:RegExp("^("+"(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w","w*")+")"),ATTR:RegExp("^"+t),PSEUDO:RegExp("^"+W),CHILD:RegExp("^:(only|nth|first|last)-child(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)","i"),needsContext:RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)",
"i")},u=function(a){var b=j.createElement("div");try{return a(b)}catch(c){return!1}finally{}},t=u(function(a){a.appendChild(j.createComment(""));return!a.getElementsByTagName("*").length}),oa=u(function(a){a.innerHTML="<a href='#'></a>";return a.firstChild&&"undefined"!==typeof a.firstChild.getAttribute&&"#"===a.firstChild.getAttribute("href")}),pa=u(function(a){a.innerHTML="<select></select>";a=typeof a.lastChild.getAttribute("multiple");return"boolean"!==a&&"string"!==a}),X=u(function(a){a.innerHTML=
"<div class='hidden e'></div><div class='hidden'></div>";if(!a.getElementsByClassName||!a.getElementsByClassName("e").length)return!1;a.lastChild.className="e";return 2===a.getElementsByClassName("e").length}),qa=u(function(a){a.id=m+0;a.innerHTML="<a name='"+m+"'></a><div name='"+m+"'></div>";o.insertBefore(a,o.firstChild);var b=j.getElementsByName&&j.getElementsByName(m).length===2+j.getElementsByName(m+0).length;U=!j.getElementById(m);o.removeChild(a);return b});try{A.call(o.childNodes,0)[0].nodeType}catch(ra){A=
function(a){for(var b,c=[];b=this[a];a++)c.push(b);return c}}k.matches=function(a,b){return k(a,null,null,b)};k.matchesSelector=function(a,b){return 0<k(b,null,null,[a]).length};K=k.getText=function(a){var b,c="",d=0;if(b=a.nodeType)if(1===b||9===b||11===b){if("string"===typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=K(a)}else{if(3===b||4===b)return a.nodeValue}else for(;b=a[d];d++)c+=K(b);return c};E=k.isXML=function(a){return(a=a&&(a.ownerDocument||a).documentElement)?
"HTML"!==a.nodeName:!1};v=k.contains=o.contains?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||!(1===d.nodeType&&c.contains&&c.contains(d)))}:o.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)}:function(a,b){for(;b=b.parentNode;)if(b===a)return!0;return!1};k.attr=function(a,b){var c,d=E(a);d||(b=b.toLowerCase());return(c=l.attrHandle[b])?c(a):d||pa?a.getAttribute(b):(c=a.getAttributeNode(b))?"boolean"===typeof a[b]?a[b]?
b:null:c.specified?c.value:null:null};l=k.selectors={cacheLength:50,createPseudo:s,match:H,attrHandle:oa?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:U?function(a,b,c){if("undefined"!==typeof b.getElementById&&!c)return(a=b.getElementById(a))&&a.parentNode?[a]:[]}:function(a,b,c){if("undefined"!==typeof b.getElementById&&!c)return(b=b.getElementById(a))?b.id===a||"undefined"!==typeof b.getAttributeNode&&b.getAttributeNode("id").value===
a?[b]:void 0:[]},TAG:t?function(a,b){if("undefined"!==typeof b.getElementsByTagName)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if("*"===a){for(var d,g=[],f=0;d=c[f];f++)1===d.nodeType&&g.push(d);return g}return c},NAME:qa&&function(a,b){if("undefined"!==typeof b.getElementsByName)return b.getElementsByName(name)},CLASS:X&&function(a,b,c){if("undefined"!==typeof b.getElementsByClassName&&!c)return b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0},
" ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){a[1]=a[1].replace(x,"");a[3]=(a[4]||a[5]||"").replace(x,"");"~="===a[2]&&(a[3]=" "+a[3]+" ");return a.slice(0,4)},CHILD:function(a){a[1]=a[1].toLowerCase();"nth"===a[1]?(a[2]||k.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*("even"===a[2]||"odd"===a[2])),a[4]=+(a[6]+a[7]||"odd"===a[2])):a[2]&&k.error(a[0]);return a},PSEUDO:function(a){var b,c;if(H.CHILD.test(a[0]))return null;if(a[3])a[2]=
a[3];else if(b=a[4]){if(la.test(b)&&(c=G(b,!0))&&(c=b.indexOf(")",b.length-c)-b.length))b=b.slice(0,c),a[0]=a[0].slice(0,c);a[2]=b}return a.slice(0,3)}},filter:{ID:U?function(a){a=a.replace(x,"");return function(b){return b.getAttribute("id")===a}}:function(a){a=a.replace(x,"");return function(b){return(b="undefined"!==typeof b.getAttributeNode&&b.getAttributeNode("id"))&&b.value===a}},TAG:function(a){if("*"===a)return function(){return!0};a=a.replace(x,"").toLowerCase();return function(b){return b.nodeName&&
b.nodeName.toLowerCase()===a}},CLASS:function(a){var b=da[m][a+" "];return b||(b=RegExp("(^|[\\x20\\t\\r\\n\\f])"+a+"([\\x20\\t\\r\\n\\f]|$)"))&&da(a,function(a){return b.test(a.className||"undefined"!==typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){d=k.attr(d,a);if(null==d)return"!="===b;if(!b)return!0;d+="";return"="===b?d===c:"!="===b?d!==c:"^="===b?c&&0===d.indexOf(c):"*="===b?c&&-1<d.indexOf(c):"$="===b?c&&d.substr(d.length-c.length)===c:"~="===
b?-1<(" "+d+" ").indexOf(c):"|="===b?d===c||d.substr(0,c.length+1)===c+"-":!1}},CHILD:function(a,b,c,d){return"nth"===a?function(a){var b,e;b=a.parentNode;if(1===c&&0===d)return!0;if(b){e=0;for(b=b.firstChild;b&&!(1===b.nodeType&&(e++,a===b));b=b.nextSibling);}e-=d;return e===c||0===e%c&&0<=e/c}:function(b){var c=b;switch(a){case "only":case "first":for(;c=c.previousSibling;)if(1===c.nodeType)return!1;if("first"===a)return!0;c=b;case "last":for(;c=c.nextSibling;)if(1===c.nodeType)return!1;return!0}}},
PSEUDO:function(a,b){var c,d=l.pseudos[a]||l.setFilters[a.toLowerCase()]||k.error("unsupported pseudo: "+a);return d[m]?d(b):1<d.length?(c=[a,a,"",b],l.setFilters.hasOwnProperty(a.toLowerCase())?s(function(a,c){for(var e,i=d(a,b),h=i.length;h--;)e=Q.call(a,i[h]),a[e]=!(c[e]=i[h])}):function(a){return d(a,0,c)}):d}},pseudos:{not:s(function(a){var b=[],c=[],d=T(a.replace(F,"$1"));return d[m]?s(function(a,b,c,i){for(var i=d(a,null,i,[]),h=a.length;h--;)if(c=i[h])a[h]=!(b[h]=c)}):function(a,f,e){b[0]=
a;d(b,null,e,c);return!c.pop()}}),has:s(function(a){return function(b){return 0<k(a,b).length}}),contains:s(function(a){return function(b){return-1<(b.textContent||b.innerText||K(b)).indexOf(a)}}),enabled:function(a){return!1===a.disabled},disabled:function(a){return!0===a.disabled},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return!0===a.selected},parent:function(a){return!l.pseudos.empty(a)},
empty:function(a){for(var b,a=a.firstChild;a;){if("@"<a.nodeName||3===(b=a.nodeType)||4===b)return!1;a=a.nextSibling}return!0},header:function(a){return ma.test(a.nodeName)},text:function(a){var b,c;return"input"===a.nodeName.toLowerCase()&&"text"===(b=a.type)&&(null==(c=a.getAttribute("type"))||c.toLowerCase()===b)},radio:B("radio"),checkbox:B("checkbox"),file:B("file"),password:B("password"),image:B("image"),submit:Y("submit"),reset:Y("reset"),button:function(a){var b=a.nodeName.toLowerCase();return"input"===
b&&"button"===a.type||"button"===b},input:function(a){return na.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&!(!a.type&&!a.href&&!~a.tabIndex)},active:function(a){return a===a.ownerDocument.activeElement},first:y(function(){return[0]}),last:y(function(a,b){return[b-1]}),eq:y(function(a,b,c){return[0>c?c+b:c]}),even:y(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:y(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),
lt:y(function(a,b,c){for(b=0>c?c+b:c;0<=--b;)a.push(b);return a}),gt:y(function(a,b,c){for(c=0>c?c+b:c;++c<b;)a.push(c);return a})}};V=o.compareDocumentPosition?function(a,b){var c,d;return a===b?(D=!0,0):a.compareDocumentPosition&&b.compareDocumentPosition?(c=a.compareDocumentPosition(b))&1||(d=a.parentNode)&&11===d.nodeType?a===j||v(j,a)?-1:b===j||v(j,b)?1:0:c&4?-1:1:a.compareDocumentPosition?-1:1}:function(a,b){if(a===b)return D=!0,0;if(a.sourceIndex&&b.sourceIndex)return(~b.sourceIndex||-2147483648)-
(v(j,a)&&~a.sourceIndex||-2147483648);var c=0,d=[a],g=[b],f=a.parentNode,e=b.parentNode,i=f;if(a===j)return-1;if(b===j)return 1;if(!f&&!e)return 0;if(e)if(f){if(f===e)return Z(a,b)}else return 1;else return-1;for(;i;)d.unshift(i),i=i.parentNode;for(i=e;i;)g.unshift(i),i=i.parentNode;for(;d[c]===g[c];)c++;return 0===c?d[0]===j||v(j,d[0])?-1:g[0]===j||v(j,g[0])?1:0:Z(d[c],g[c])};[0,0].sort(V);ca=!D;k.uniqueSort=function(a){var b,c=[],d=1,g=0;D=ca;a.sort(V);if(D){for(;b=a[d];d++)b===a[d-1]&&(g=c.push(d));
for(;g--;)a.splice(c[g],1)}return a};k.error=function(a){throw Error("Syntax error, unrecognized expression: "+a);};T=k.compile=function(a,b){var c,d=[],g=[],f=ea[m][a+" "];if(!f){b||(b=G(a));for(c=b.length;c--;)f=R(b[c]),f[m]?d.push(f):g.push(f);f=ea(a,ja(g,d))}return f};j.querySelectorAll&&function(){var a,b=L,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,g=[":focus"],f=[":active"],e=o.matchesSelector||o.mozMatchesSelector||o.webkitMatchesSelector||o.oMatchesSelector||o.msMatchesSelector;
u(function(a){a.innerHTML="<select><option selected=''></option></select>";a.querySelectorAll("[selected]").length||g.push("\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)");a.querySelectorAll(":checked").length||g.push(":checked")});u(function(a){a.innerHTML="<p test=''></p>";a.querySelectorAll("[test^='']").length&&g.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:\"\"|'')");a.innerHTML="<input type='hidden'/>";a.querySelectorAll(":enabled").length||g.push(":enabled",":disabled")});
g=RegExp(g.join("|"));L=function(a,d,e,f,l){if(!f&&!l&&!g.test(a)){var j,k,o=!0,p=m;k=d;j=9===d.nodeType&&a;if(1===d.nodeType&&"object"!==d.nodeName.toLowerCase()){j=G(a);(o=d.getAttribute("id"))?p=o.replace(c,"\\$&"):d.setAttribute("id",p);p="[id='"+p+"'] ";for(k=j.length;k--;)j[k]=p+j[k].join("");k=S.test(a)&&d.parentNode||d;j=j.join(",")}if(j)try{return z.apply(e,A.call(k.querySelectorAll(j),0)),e}catch(q){}finally{o||d.removeAttribute("id")}}return b(a,d,e,f,l)};e&&(u(function(b){a=e.call(b,"div");
try{e.call(b,"[test!='']:sizzle"),f.push("!=",W)}catch(c){}}),f=RegExp(f.join("|")),k.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!E(b)&&!f.test(c)&&!g.test(c))try{var j=e.call(b,c);if(j||a||b.document&&11!==b.document.nodeType)return j}catch(l){}return 0<k(c,null,null,[b]).length})}();l.pseudos.nth=l.pseudos.eq;l.filters=ba.prototype=l.pseudos;l.setFilters=new ba;return k});
/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:07
*/
KISSY.add("overlay/base",function(d,e,b,a,c,g,f,h){return e.Controller.extend([b.ContentBox,b.Position,a,b.Align,c,g,h],{},{ATTRS:{focusable:{value:!1},allowTextSelection:{value:!0},closable:{value:!1},handleMouseEvents:{value:!1},xrender:{value:f}}},{xclass:"overlay",priority:10})},{requires:"component/base,component/extension,./extension/loading,./extension/close,./extension/mask,./overlay-render,./extension/overlay-effect".split(",")});
KISSY.add("overlay/dialog-render",function(d,e,b){return e.extend([b],{createDom:function(){var a=this.get("el"),c,b=this.get("header");if(!(c=b.attr("id")))b.attr("id",c=d.guid("ks-dialog-header"));a.attr("role","dialog").attr("aria-labelledby",c);a.append("<div tabindex='0' style='position:absolute;'></div>")}})},{requires:["./overlay-render","./extension/stdmod-render"]});
KISSY.add("overlay/dialog",function(d,e,b,a,c,g){var f=e.extend([c,g],{handleKeyEventInternal:function(f){if(this.get("escapeToClose")&&f.keyCode===a.KeyCodes.ESC){if("select"!=f.target.nodeName.toLowerCase()||f.target.disabled)this.close(),f.halt()}else a:if(f.keyCode==h){var c=this.get("el"),b=a.all(f.target),g=c.last();if(b.equals(c)&&f.shiftKey)g[0].focus(),f.halt();else if(b.equals(g)&&!f.shiftKey)c[0].focus(),f.halt();else if(b.equals(c)||c.contains(b))break a;f.halt()}},_onSetVisible:function(a){var c=
this.get("el");if(a)this.__lastActive=c[0].ownerDocument.activeElement,this.set("focused",!0),c.attr("aria-hidden","false");else{c.attr("aria-hidden","true");try{this.__lastActive&&this.__lastActive.focus()}catch(b){}}f.superclass._onSetVisible.apply(this,arguments)}},{ATTRS:{closable:{value:!0},xrender:{value:b},focusable:{value:!0},escapeToClose:{value:!0}}},{xclass:"dialog",priority:20}),h=a.KeyCodes.TAB;return f},{requires:["./base","./dialog-render","node","./extension/stdmod","./extension/dialog-effect"]});
KISSY.add("overlay/extension/close-render",function(d,e){function b(a){return new e("<a tabindex='0' href='javascript:void(\"\u5173\u95ed\")' role='button' style='z-index:9' class='"+a+c+"close'><span class='"+a+c+"close-x'>\u5173\u95ed</span></a>")}function a(){}var c="ext-";a.ATTRS={closable:{value:!0},closeBtn:{}};a.HTML_PARSER={closeBtn:function(a){return a.one("."+this.get("prefixCls")+c+"close")}};a.prototype={_onSetClosable:function(a){var f=this.get("closeBtn");a?(f||this.setInternal("closeBtn",f=b(this.get("prefixCls"))),
this.get("el").prepend(f)):f&&f.remove()}};return a},{requires:["node"]});
KISSY.add("overlay/extension/close",function(){function d(){}d.ATTRS={closable:{view:1},closeBtn:{view:1},closeAction:{value:"hide"}};var e={hide:"hide",destroy:"destroy"};d.prototype={_onSetClosable:function(b){var a=this;b&&!a.__bindCloseEvent&&(a.__bindCloseEvent=1,a.get("closeBtn").on("click",function(c){a.close();c.preventDefault()}))},close:function(){this[e[this.get("closeAction")]||"hide"]();return this},__destructor:function(){var b=this.get("closeBtn");b&&b.detach()}};return d});
KISSY.add("overlay/extension/dialog-effect",function(){function d(){}d.prototype={__afterCreateEffectGhost:function(d){var b=this.get("body");d.all("."+this.get("prefixCls")+"stdmod-body").css({height:b.height(),width:b.width()}).html("");return d}};return d});
KISSY.add("overlay/extension/loading-render",function(d,e){function b(){}b.prototype={loading:function(){this._loadingExtEl||(this._loadingExtEl=(new e("<div class='"+this.get("prefixCls")+"ext-loading' style='position: absolute;border: none;width: 100%;top: 0;left: 0;z-index: 99999;height:100%;*height: expression(this.parentNode.offsetHeight);'/>")).appendTo(this.get("el")));this._loadingExtEl.show()},unloading:function(){var a=this._loadingExtEl;a&&a.hide()}};return b},{requires:["node"]});
KISSY.add("overlay/extension/loading",function(){function d(){}d.prototype={loading:function(){this.get("view").loading();return this},unloading:function(){this.get("view").unloading();return this}};return d});
KISSY.add("overlay/extension/mask-render",function(d,e){function b(a){a=a.get("prefixCls")+"ext-mask "+a.getCssClassWithState("-mask");a=g("<div  style='width:"+(c?"expression(KISSY.DOM.docWidth())":"100%")+";left:0;top:0;height:"+(c?"expression(KISSY.DOM.docHeight())":"100%")+";position:"+(c?"absolute":"fixed")+";' class='"+a+"'>"+(c?"<iframe style='position:absolute;left:0;top:0;background:red;width: expression(this.parentNode.offsetWidth);height: expression(this.parentNode.offsetHeight);filter:alpha(opacity=0);z-index:-1;'></iframe>":
"")+"</div>").prependTo("body");a.unselectable();a.on("mousedown",function(a){a.preventDefault()});return a}function a(){}var c=6===d.UA.ie,g=e.all;a.ATTRS={mask:{value:!1},maskNode:{}};a.prototype={__renderUI:function(){this.get("mask")&&this.set("maskNode",b(this))},__syncUI:function(){this.get("mask")&&this.ksSetMaskVisible(this.get("visible"),1)},ksSetMaskVisible:function(a,c){var b=this.getCssClassWithState("-mask-shown"),d=this.get("maskNode"),g=this.getCssClassWithState("-mask-hidden");a?d.removeClass(g).addClass(b):
d.removeClass(b).addClass(g);c||d.css("visibility",a?"visible":"hidden")},__destructor:function(){var a;(a=this.get("maskNode"))&&a.remove()}};return a},{requires:["node"]});
KISSY.add("overlay/extension/mask",function(d,e){function b(){}b.ATTRS={mask:{view:1},maskNode:{view:1}};var a={fade:["Out","In"],slide:["Up","Down"]};b.prototype={__bindUI:function(){var c,b,f=this.get("el"),d=this.get("view");if(b=this.get("mask")){c=this.get("maskNode");if(b.closeOnClick)c.on(e.Gesture.tap,this.close,this);this.on("afterVisibleChange",function(e){if(e=e.newVal){var i=parseInt(f.css("z-index"))||1;c.css("z-index",i-1)}i=b.effect||"none";if("none"==i)d.ksSetMaskVisible(e);else{d.ksSetMaskVisible(e,
1);var n=b.duration,o=b.easing,p=e?1:0;c.stop(1,1);c.css("display",e?"none":"block");c[i+a[i][p]](n,null,o)}})}}};return b},{requires:["event"]});
KISSY.add("overlay/extension/overlay-effect",function(d){function e(a){var b=a.get("el").clone(!0);b.css({visibility:"",overflow:h}).addClass(a.get("prefixCls")+"overlay-ghost");return a.__afterCreateEffectGhost(b)}function b(a,b,c){a.__effectGhost&&a.__effectGhost.stop(1);var f=a.get("el"),g=d.all,h=a.get("effect"),i=g(h.target),g=h.duration,i=d.mix(i.offset(),{width:i.width(),height:i.height()}),k=d.mix(f.offset(),{width:f.width(),height:f.height()}),j=e(a),h=h.easing;j.insertAfter(f);f.hide();
b?(b=i,i=k):b=k;j.css(b);a.__effectGhost=j;j.animate(i,{duration:g,easing:h,complete:function(){a.__effectGhost=null;j.remove();f.show();c()}})}function a(a,c,d){var e=a.get("el"),h=a.get("effect"),m=h.effect||g,l=h.target;if(m==g&&!l)d();else if(l)b(a,c,d);else{var a=h.duration,h=h.easing,q=e.css("visibility"),l=c?1:0;e.stop(1,1);e.css({visibility:k,display:c?g:f});e[m+i[m][l]](a,function(){e.css({display:f,visibility:q});d()},h)}}function c(){}var g="none",f="block",h="hidden",k="visible",i={fade:["Out",
"In"],slide:["Up","Down"]};c.ATTRS={effect:{value:{effect:"",target:null,duration:0.5,easing:"easeOut"},setter:function(a){var b=a.effect;"string"==typeof b&&!i[b]&&(a.effect="")}}};c.prototype={__afterCreateEffectGhost:function(a){return a},_onSetVisible:function(b){var c=this;c.get("rendered")&&a(c,b,function(){c.fire(b?"show":"hide")})}};return c});
KISSY.add("overlay/extension/stdmod-render",function(d,e){function b(){}function a(a,b){var c=a.get("contentEl"),d=a.get(b);d||(d=new e("<div class='"+a.get("prefixCls")+g+b+"'  ></div>"),d.appendTo(c),a.setInternal(b,d))}function c(a,b,c){b=a.get(b);"string"==typeof c?b.html(c):b.html("").append(c)}var g="stdmod-";b.ATTRS={header:{},body:{},footer:{},bodyStyle:{},footerStyle:{},headerStyle:{},headerContent:{},bodyContent:{},footerContent:{}};b.HTML_PARSER={header:function(a){return a.one("."+this.get("prefixCls")+
g+"header")},body:function(a){return a.one("."+this.get("prefixCls")+g+"body")},footer:function(a){return a.one("."+this.get("prefixCls")+g+"footer")}};b.prototype={__createDom:function(){a(this,"header");a(this,"body");a(this,"footer")},_onSetBodyStyle:function(a){this.get("body").css(a)},_onSetHeaderStyle:function(a){this.get("header").css(a)},_onSetFooterStyle:function(a){this.get("footer").css(a)},_onSetBodyContent:function(a){c(this,"body",a)},_onSetHeaderContent:function(a){c(this,"header",
a)},_onSetFooterContent:function(a){c(this,"footer",a)}};return b},{requires:["node"]});KISSY.add("overlay/extension/stdmod",function(){function d(){}d.ATTRS={header:{view:1},body:{view:1},footer:{view:1},bodyStyle:{view:1},footerStyle:{view:1},headerStyle:{view:1},headerContent:{view:1},bodyContent:{view:1},footerContent:{view:1}};return d});
KISSY.add("overlay/overlay-render",function(d,e,b,a,c,g){return e.Render.extend([b.ContentBox.Render,b.Position.Render,a,6===d.UA.ie?b.Shim.Render:null,c,g])},{requires:["component/base","component/extension","./extension/loading-render","./extension/close-render","./extension/mask-render"]});
KISSY.add("overlay",function(d,e,b,a,c,g){e.Render=b;a.Render=c;e.Dialog=a;d.Dialog=a;e.Popup=g;return d.Overlay=e},{requires:["overlay/base","overlay/overlay-render","overlay/dialog","overlay/dialog-render","overlay/popup"]});
KISSY.add("overlay/popup",function(d,e,b){return e.extend({initializer:function(){var a=this;a.get("trigger")&&("mouse"===a.get("triggerType")?(a._bindTriggerMouse(),a.on("afterRenderUI",function(){a._bindContainerMouse()})):a._bindTriggerClick())},_bindTriggerMouse:function(){var a=this,c=a.get("trigger"),e;a.__mouseEnterPopup=function(c){a._clearHiddenTimer();e=d.later(function(){a._showing(c);e=b},1E3*a.get("mouseDelay"))};c.on("mouseenter",a.__mouseEnterPopup);a._mouseLeavePopup=function(){e&&
(e.cancel(),e=b);a._setHiddenTimer()};c.on("mouseleave",a._mouseLeavePopup)},_bindContainerMouse:function(){this.get("el").on("mouseleave",this._setHiddenTimer,this).on("mouseenter",this._clearHiddenTimer,this)},_setHiddenTimer:function(){var a=this;a._hiddenTimer=d.later(function(){a._hiding()},1E3*a.get("mouseDelay"))},_clearHiddenTimer:function(){this._hiddenTimer&&(this._hiddenTimer.cancel(),this._hiddenTimer=b)},_bindTriggerClick:function(){var a=this;a.__clickPopup=function(b){b.halt();if(a.get("toggle"))a[a.get("visible")?
"_hiding":"_showing"](b);else a._showing(b)};a.get("trigger").on("click",a.__clickPopup)},_showing:function(a){this.set("currentTrigger",d.one(a.target));this.show()},_hiding:function(){this.set("currentTrigger",b);this.hide()},destructor:function(){var a,b=this.get("trigger");b&&(this.__clickPopup&&b.detach("click",this.__clickPopup),this.__mouseEnterPopup&&b.detach("mouseenter",this.__mouseEnterPopup),this._mouseLeavePopup&&b.detach("mouseleave",this._mouseLeavePopup));(a=this.get("el"))&&a.detach("mouseleave",
this._setHiddenTimer,this).detach("mouseenter",this._clearHiddenTimer,this)}},{ATTRS:{trigger:{setter:function(a){return d.all(a)}},triggerType:{value:"click"},currentTrigger:{},mouseDelay:{value:0.1},toggle:{value:!1}}},{xclass:"popup",priority:20})},{requires:["./base"]});
/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:00
*/
KISSY.add("component/base",function(d,g,e,c,h,a,b,i){d.mix(g,{Controller:e,Render:c,Container:h,DelegateChildren:a,DecorateChild:i,DecorateChildren:b});return g},{requires:"./base/impl,./base/controller,./base/render,./base/container,./base/delegate-children,./base/decorate-children,./base/decorate-child".split(",")});
KISSY.add("component/base/box-render",function(d){function g(){}var e=d.all,c=d.UA,h=d.Env.host.document;g.ATTRS={el:{setter:function(a){return e(a)}},elCls:{},elStyle:{},width:{},height:{},elTagName:{value:"div"},elAttrs:{},content:{},elBefore:{},render:{},visible:{value:!0},visibleMode:{value:"display"},contentEl:{valueFn:function(){return this.get("el")}}};g.HTML_PARSER={el:function(a){return a},content:function(a){return(this.get("contentEl")||a).html()}};g.prototype={__createDom:function(){var a,
b;this.get("srcNode")||(b=this.get("contentEl"),a=e("<"+this.get("elTagName")+">"),b&&a.append(b),this.setInternal("el",a),b||this.setInternal("contentEl",a))},__renderUI:function(){if(!this.get("srcNode")){var a=this.get("render"),b=this.get("el"),i=this.get("elBefore");i?b.insertBefore(i,void 0):a?b.appendTo(a,void 0):b.appendTo(h.body,void 0)}},_onSetElAttrs:function(a){this.get("el").attr(a)},_onSetElCls:function(a){this.get("el").addClass(a)},_onSetElStyle:function(a){this.get("el").css(a)},
_onSetWidth:function(a){this.get("el").width(a)},_onSetHeight:function(a){this.get("el").height(a)},_onSetContent:function(a){var b=this.get("contentEl");if(!this.get("srcNode")||this.get("rendered"))"string"==typeof a?b.html(a):a&&b.empty().append(a);9>c.ie&&!this.get("allowTextSelection")&&b.unselectable(void 0)},_onSetVisible:function(a){var b=this.get("el"),i=this.getCssClassWithState("-shown"),c=this.getCssClassWithState("-hidden"),d=this.get("visibleMode");a?(b.removeClass(c),b.addClass(i)):
(b.removeClass(i),b.addClass(c));"visibility"==d?b.css("visibility",a?"visible":"hidden"):b.css("display",a?"":"none")},__destructor:function(){var a=this.get("el");a&&a.remove()}};return g},{requires:["node"]});
KISSY.add("component/base/box",function(){function d(){}d.ATTRS={content:{view:1},width:{view:1},height:{view:1},elCls:{view:1},elStyle:{view:1},elAttrs:{view:1},elBefore:{view:1},el:{view:1},render:{view:1},visibleMode:{view:1},visible:{value:!0,view:1},srcNode:{view:1}};d.prototype={_onSetVisible:function(d){this.get("rendered")&&this.fire(d?"show":"hide")},show:function(){this.render();this.set("visible",!0);return this},hide:function(){this.set("visible",!1);return this}};return d});
KISSY.add("component/base/container",function(d,g,e,c){return g.extend([e,c])},{requires:["./controller","./delegate-children","./decorate-children"]});
KISSY.add("component/base/controller",function(d,g,e,c,h,a,b,i){function o(a){return function(b){this==b.target&&(b=b.newVal,this.get("view").set(a,b))}}function t(a){return function(b){var c=this.get("view");return b===i?c.get(a):b}}function u(j){var b,c,e,f={},h,g=j.get("xrender");b=j.getAttrs();for(e in b)if(c=b[e],c.view){if((h=j.get(e))!==i)f[e]=h;j.on("after"+d.ucfirst(e)+"Change",o(e));c.getter=t(e)}j=j.constructor;for(c=[];j&&j!=r;)(b=a.getXClassByConstructor(j))&&c.push(b),j=j.superclass&&
j.superclass.constructor;j=c.join(" ");f.ksComponentCss=j;return new g(f)}function s(a,b){var c=a.relatedTarget;return c&&(c===b[0]||b.contains(c))}function f(a,b){return function(c){if(!a.get("disabled"))a[b](c)}}var k=d.Env.host.document.documentMode||d.UA.ie,l=d.Features,p=e.Gesture,n=".-ks-component-focus"+d.now(),m=".-ks-component-mouse"+d.now(),q=l.isTouchSupported(),r=h.extend([g],{isController:!0,getCssClassWithPrefix:a.getCssClassWithPrefix,initializer:function(){this.setInternal("view",
u(this))},createDom:function(){var a;a=this.get("view");a.create(i);a=a.getKeyEventTarget();this.get("allowTextSelection")||a.unselectable(i)},renderUI:function(){var a,b,c;this.get("view").render();b=this.get("children").concat();for(a=this.get("children").length=0;a<b.length;a++)c=this.addChild(b[a]),c.render()},_onSetFocusable:function(a){var b=this.getKeyEventTarget();if(a)b.attr("tabIndex",0).attr("hideFocus",!0).on("focus"+n,f(this,"handleFocus")).on("blur"+n,f(this,"handleBlur")).on("keydown"+
n,f(this,"handleKeydown"));else b.removeAttr("tabIndex"),b.detach(n)},_onSetHandleMouseEvents:function(a){var b=this.get("el");if(a){if(!q)b.on("mouseenter"+m,f(this,"handleMouseEnter")).on("mouseleave"+m,f(this,"handleMouseLeave")).on("contextmenu"+m,f(this,"handleContextMenu"));b.on(p.start+m,f(this,"handleMouseDown")).on(p.end+m,f(this,"handleMouseUp")).on(p.tap+m,f(this,"performActionInternal"));if(k&&9>k)b.on("dblclick"+m,f(this,"handleDblClick"))}else b.detach(m)},_onSetFocused:function(a){a&&
this.getKeyEventTarget()[0].focus()},getContentElement:function(){return this.get("view").getContentElement()},getKeyEventTarget:function(){return this.get("view").getKeyEventTarget()},addChild:function(a,b){var d=this.get("children"),e;b===i&&(b=d.length);e=d[b]&&d[b].get("el")||null;var f=a;this.create();var h=this.getContentElement(),f=c.create(f,this);f.setInternal("parent",this);f.set("render",h);f.set("elBefore",e);f.create(i);a=f;d.splice(b,0,a);this.get("rendered")&&a.render();return a},removeChild:function(a,
b){var c=this.get("children"),i=d.indexOf(a,c);-1!=i&&c.splice(i,1);b&&a.destroy&&a.destroy();return a},removeChildren:function(a){var b,c=[].concat(this.get("children"));for(b=0;b<c.length;b++)this.removeChild(c[b],a);return this},getChildAt:function(a){return this.get("children")[a]||null},handleDblClick:function(a){this.performActionInternal(a)},handleMouseOver:function(a){var b=this.get("el");s(a,b)||this.handleMouseEnter(a)},handleMouseOut:function(a){var b=this.get("el");s(a,b)||this.handleMouseLeave(a)},
handleMouseEnter:function(a){this.set("highlighted",!!a)},handleMouseLeave:function(a){this.set("active",!1);this.set("highlighted",!a)},handleMouseDown:function(a){var b;if(1==a.which||q)if(b=this.getKeyEventTarget(),this.get("activeable")&&this.set("active",!0),this.get("focusable")&&(b[0].focus(),this.set("focused",!0)),!this.get("allowTextSelection"))b=(b=a.target.nodeName)&&b.toLowerCase(),"input"!=b&&"textarea"!=b&&a.preventDefault()},handleMouseUp:function(a){this.get("active")&&(1==a.which||
q)&&this.set("active",!1)},handleContextMenu:function(){},handleFocus:function(a){this.set("focused",!!a);this.fire("focus")},handleBlur:function(a){this.set("focused",!a);this.fire("blur")},handleKeyEventInternal:function(a){if(a.keyCode==e.KeyCodes.ENTER)return this.performActionInternal(a)},handleKeydown:function(a){if(this.handleKeyEventInternal(a))return a.halt(),!0},performActionInternal:function(){},destructor:function(){var a,b=this.get("children");for(a=0;a<b.length;a++)b[a].destroy&&b[a].destroy();
this.get("view").destroy()}},{ATTRS:{handleMouseEvents:{value:!0},focusable:{value:!0,view:1},allowTextSelection:{view:1,value:!1},activeable:{value:!0},focused:{view:1},active:{view:1},highlighted:{view:1},children:{value:[]},prefixCls:{value:d.config("component/prefixCls")||"ks-",view:1},parent:{setter:function(a){this.addTarget(a)}},disabled:{view:1},xrender:{value:b},defaultChildXClass:{}}},{xclass:"controller"});return r},{requires:"./box,event,./impl,./uibase,./manager,./render".split(",")});
KISSY.add("component/base/decorate-child",function(d,g){function e(){}d.augment(e,g,{decorateInternal:function(c){this.set("el",c);var d=this.get("decorateChildCls"),a=this.get("prefixCls");if(c=c.one("."+d))(a=this.findUIConstructorByNode(a,c,1))?this.decorateChildrenInternal(a,c):this.decorateChildren(c)}});return e},{requires:["./decorate-children"]});
KISSY.add("component/base/decorate-children",function(d,g){function e(){}d.augment(e,{decorateInternal:function(c){this.set("el",c);this.decorateChildren(c)},findUIConstructorByNode:function(c,d,a,b){d=d[0].className||"";d=d.replace(RegExp("\\b"+c,"ig"),"");return g.getConstructorByXClass(d)||b&&g.getConstructorByXClass(b)},decorateChildrenInternal:function(c,d){this.addChild(new c({srcNode:d,prefixCls:this.get("prefixCls")}))},decorateChildren:function(c){var d=this,a=d.get("prefixCls"),b=d.get("defaultChildXClass");
c.children().each(function(c){var e=d.findUIConstructorByNode(a,c,0,b);d.decorateChildrenInternal(e,c)})}});return e},{requires:["./manager"]});
KISSY.add("component/base/delegate-children",function(d,g){function e(){}function c(a){if(!this.get("disabled")){var c=this.getOwnerControl(a.target,a);if(c&&!c.get("disabled"))switch(a.type){case b.start:c.handleMouseDown(a);break;case b.end:c.handleMouseUp(a);break;case b.tap:c.performActionInternal(a);break;case "mouseover":c.handleMouseOver(a);break;case "mouseout":c.handleMouseOut(a);break;case "contextmenu":c.handleContextMenu(a);break;case "dblclick":c.handleDblClick(a)}}}var h=d.UA,a=d.Env.host.document.documentMode||
h.ie,b=g.Gesture,i=d.Features.isTouchSupported();e.ATTRS={delegateChildren:{value:!0}};d.augment(e,{__bindUI:function(){var d;this.get("delegateChildren")&&(d=b.start+" "+b.end+" "+b.tap+" ",i||(d+="mouseover mouseout contextmenu "+(a&&9>a?"dblclick ":"")),this.get("el").on(d,c,this))},getOwnerControl:function(a){for(var b=this.get("children"),c=b.length,d=this.get("el")[0];a&&a!==d;){for(var i=0;i<c;i++)if(b[i].get("el")[0]===a)return b[i];a=a.parentNode}return null}});return e},{requires:["event"]});
KISSY.add("component/base/impl",function(d,g,e){return{Manager:e,UIBase:g,create:function(c,d){var a;c&&!c.isController&&!c.xclass&&(c.xclass=d.get("defaultChildXClass"));if(c&&(a=c.xclass))d&&!c.prefixCls&&(c.prefixCls=d.get("prefixCls")),a=e.getConstructorByXClass(a),c=new a(c);return c}}},{requires:["./uibase","./manager"]});
KISSY.add("component/base/manager",function(d){function g(a){for(var a=d.trim(a).split(/\s+/),b=0;b<a.length;b++)a[b]&&(a[b]=this.get("prefixCls")+a[b]);return a.join(" ")}var e={},c={},h={__instances:c,addComponent:function(a,b){c[a]=b},removeComponent:function(a){delete c[a]},getComponent:function(a){return c[a]},getCssClassWithPrefix:g,getXClassByConstructor:function(a){for(var b in e)if(e[b].constructor==a)return b;return 0},getConstructorByXClass:function(a){for(var a=a.split(/\s+/),b=-1,c,d=
null,g=0;g<a.length;g++){var h=e[a[g]];if(h&&(c=h.priority)>b)b=c,d=h.constructor}return d},setConstructorByXClass:function(a,b){d.isFunction(b)?e[a]={constructor:b,priority:0}:(b.priority=b.priority||0,e[a]=b)}};h.getCssClassWithPrefix=g;return h});
KISSY.add("component/base/render",function(d,g,e,c,h){return c.extend([g],{getCssClassWithState:function(a){var b=this.get("ksComponentCss")||"",a=a||"";return this.getCssClassWithPrefix(b.split(/\s+/).join(a+" ")+a)},getCssClassWithPrefix:h.getCssClassWithPrefix,createDom:function(){this.get("el").addClass(this.getCssClassWithState())},getKeyEventTarget:function(){return this.get("el")},_onSetHighlighted:function(a){var b=this.getCssClassWithState("-hover");this.get("el")[a?"addClass":"removeClass"](b)},
_onSetDisabled:function(a){var b=this.getCssClassWithState("-disabled");this.get("el")[a?"addClass":"removeClass"](b).attr("aria-disabled",a);this.get("focusable")&&this.getKeyEventTarget().attr("tabIndex",a?-1:0)},_onSetActive:function(a){var b=this.getCssClassWithState("-active");this.get("el")[a?"addClass":"removeClass"](b).attr("aria-pressed",!!a)},_onSetFocused:function(a){var b=this.get("el"),c=this.getCssClassWithState("-focused");b[a?"addClass":"removeClass"](c)},getContentElement:function(){return this.get("contentEl")||
this.get("el")}},{ATTRS:{prefixCls:{value:"ks-"},focusable:{value:!0},focused:{},active:{},disabled:{},highlighted:{}},HTML_PARSER:{disabled:function(){var a=this.getCssClassWithState("-disabled");return this.get("el").hasClass(a)}}})},{requires:["./box-render","./impl","./uibase","./manager"]});
KISSY.add("component/base/uibase",function(d,g,e,c,h){var e=d.noop,a=g.extend({constructor:function(){var b;a.superclass.constructor.apply(this,arguments);this.decorateInternal&&(b=this.get("srcNode"))&&this.decorateInternal(b);this.get("autoRender")&&this.render()},bindInternal:e,syncInternal:e,initializer:function(){var a,b=d.one(this.get("srcNode"));(a=this.get("id"))&&c.addComponent(a,this);if(b){var e=this.constructor,g,h;h=this.collectConstructorChains();for(a=h.length-1;0<=a;a--)if(e=h[a],
g=e.HTML_PARSER){var e=b,f=void 0,k=void 0,l=this.userConfig||{};for(f in g)f in l||(k=g[f],d.isFunction(k)?this.setInternal(f,k.call(this,e)):"string"==typeof k?this.setInternal(f,e.one(k)):d.isArray(k)&&k[0]&&this.setInternal(f,e.all(k[0])))}this.setInternal("srcNode",b)}},create:function(){this.get("created")||(this.fire("beforeCreateDom"),this.callMethodByHierarchy("createDom","__createDom"),this.setInternal("created",!0),this.fire("afterCreateDom"),this.callPluginsMethod("createDom"));return this},
render:function(){this.get("rendered")||(this.create(h),this.fire("beforeRenderUI"),this.callMethodByHierarchy("renderUI","__renderUI"),this.fire("afterRenderUI"),this.callPluginsMethod("renderUI"),this.fire("beforeBindUI"),a.superclass.bindInternal.call(this),this.callMethodByHierarchy("bindUI","__bindUI"),this.fire("afterBindUI"),this.callPluginsMethod("bindUI"),this.fire("beforeSyncUI"),a.superclass.syncInternal.call(this),this.callMethodByHierarchy("syncUI","__syncUI"),this.fire("afterSyncUI"),
this.callPluginsMethod("syncUI"),this.setInternal("rendered",!0));return this},createDom:e,renderUI:e,bindUI:e,syncUI:e,plug:function(){var b;b=this.get("plugins");a.superclass.plug.apply(this,arguments);b=b[b.length-1];this.get("rendered")?(b.pluginCreateDom&&b.pluginCreateDom(this),b.pluginRenderUI&&b.pluginRenderUI(this),b.pluginBindUI&&b.pluginBindUI(this),b.pluginSyncUI&&b.pluginSyncUI(this)):this.get("created")&&b.pluginCreateDom&&b.pluginCreateDom(this);return this},destructor:function(){var a;
(a=this.get("id"))&&c.removeComponent(a)}},{ATTRS:{rendered:{value:!1},created:{value:!1},xclass:{valueFn:function(){return c.getXClassByConstructor(this.constructor)}}}}),b=a.extend;d.mix(a,{HTML_PARSER:{},extend:function o(a,e,g){var f=d.makeArray(arguments),h={},l=f[f.length-1];l.xclass&&(f.pop(),f.push(l.xclass));f=b.apply(this,f);d.isArray(a)&&(d.each(a.concat(f),function(a){a&&d.each(a.HTML_PARSER,function(a,b){h[b]=a})}),f.HTML_PARSER=h);l.xclass&&c.setConstructorByXClass(l.xclass,{constructor:f,
priority:l.priority});f.extend=o;return f}});return a},{requires:["rich-base","node","./manager"]});
/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:07
*/
KISSY.add("rich-base",function(d,n){function l(){var b,c;n.apply(this,arguments);c=this.get("listeners");for(b in c)this.on(b,c[b]);this.callMethodByHierarchy("initializer","constructor");this.constructPlugins();this.callPluginsMethod("initializer");this.bindInternal();this.syncInternal()}function p(b){if(b.target==this)this[m+b.type.slice(5).slice(0,-6)](b.newVal,b)}var j=d.ucfirst,m="_onSet",o=d.noop;d.extend(l,n,{collectConstructorChains:function(){for(var b=[],c=this.constructor;c;)b.push(c),
c=c.superclass&&c.superclass.constructor;return b},callMethodByHierarchy:function(b,c){for(var a=this.constructor,e=[],h,d,f,g,i;a;){i=[];if(g=a.__ks_exts)for(f=0;f<g.length;f++)if(h=g[f])"constructor"!=c&&(h=h.prototype.hasOwnProperty(c)?h.prototype[c]:null),h&&i.push(h);a.prototype.hasOwnProperty(b)&&(d=a.prototype[b])&&i.push(d);i.length&&e.push.apply(e,i.reverse());a=a.superclass&&a.superclass.constructor}for(f=e.length-1;0<=f;f--)e[f]&&e[f].call(this)},callPluginsMethod:function(b){var c=this,
b="plugin"+j(b);d.each(c.get("plugins"),function(a){if(a[b])a[b](c)})},constructPlugins:function(){var b=this.get("plugins");d.each(b,function(c,a){d.isFunction(c)&&(b[a]=new c)})},bindInternal:function(){var b=this.getAttrs(),c,a;for(c in b)if(a=m+j(c),this[a])this.on("after"+j(c)+"Change",p)},syncInternal:function(){var b,c,a,e,h,d={},f=this.collectConstructorChains(),g;for(a=f.length-1;0<=a;a--)if(e=f[a],g=e.ATTRS)for(h in g)d[h]||(d[h]=1,e=m+j(h),(c=this[e])&&!1!==g[h].sync&&void 0!==(b=this.get(h))&&
c.call(this,b))},initializer:o,destructor:o,destroy:function(){this.callPluginsMethod("destructor");for(var b=this.constructor,c,a,e;b;){b.prototype.hasOwnProperty("destructor")&&b.prototype.destructor.apply(this);if(c=b.__ks_exts)for(e=c.length-1;0<=e;e--)(a=c[e]&&c[e].prototype.__destructor)&&a.apply(this);b=b.superclass&&b.superclass.constructor}this.fire("destroy");this.detach()},plug:function(b){d.isFunction(b)&&(b=new b);b.pluginInitializer&&b.pluginInitializer(this);this.get("plugins").push(b);
return this},unplug:function(b){var c=[],a=this,e="string"==typeof b;d.each(a.get("plugins"),function(d){var k=0,f;b&&(e?(f=d.get&&d.get("pluginId")||d.pluginId,f!=b&&(c.push(d),k=1)):d!=b&&(c.push(d),k=1));k||d.pluginDestructor(a)});a.setInternal("plugins",c);return a},getPlugin:function(b){var c=null;d.each(this.get("plugins"),function(a){if((a.get&&a.get("pluginId")||a.pluginId)==b)return c=a,!1});return c}},{ATTRS:{plugins:{value:[]},listeners:{value:[]}}});d.mix(l,{extend:function c(a,e,h){var k=
"RichBaseDerived",f,g;f=d.makeArray(arguments);if(null==a||d.isObject(a))h=e,e=a,a=[];if("string"==typeof(f=f[f.length-1]))k=f;e=e||{};e.hasOwnProperty("constructor")?g=e.constructor:(g=function(){g.superclass.constructor.apply(this,arguments)},d.Config.debug&&eval("C=function "+k.replace(/[-./]/g,"_")+"(){ C.superclass.constructor.apply(this, arguments);}"));g.name=k;d.extend(g,this,e,h);if(a){g.__ks_exts=a;var i={},j={};d.each(a.concat(g),function(a){if(a){d.each(a.ATTRS,function(a,c){var e=i[c]=
i[c]||{};d.mix(e,a)});var a=a.prototype,c;for(c in a)a.hasOwnProperty(c)&&(j[c]=a[c])}});g.ATTRS=i;d.augment(g,j)}g.extend=c;return g}});return l},{requires:["base"]});
/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:00
*/
KISSY.add("base/attribute",function(j,i){function k(a,b){return"string"==typeof b?a[b]:b}function m(a,b,c,d,e,g,f){f=f||c;return a.fire(b+j.ucfirst(c)+"Change",{attrName:f,subAttrName:g,prevVal:d,newVal:e})}function h(a,b,c){var d=a[b]||{};c&&(a[b]=d);return d}function f(a){return h(a,"__attrs",!0)}function n(a){return h(a,"__attrVals",!0)}function q(a,b){for(var c=0,d=b.length;a!=i&&c<d;c++)a=a[b[c]];return a}function r(a,b){var c;!a.hasAttr(b)&&-1!==b.indexOf(".")&&(c=b.split("."),b=c.shift());
return{path:c,name:b}}function s(a,b,c){var d=c;if(b){var a=d=a===i?{}:j.clone(a),e=b.length-1;if(0<=e){for(var g=0;g<e;g++)a=a[b[g]];a!=i&&(a[b[g]]=c)}}return d}function t(a,b,c,d,e){var d=d||{},g,f,l;l=r(a,b);var h=b,b=l.name;g=l.path;l=a.get(b);g&&(f=q(l,g));if(!g&&l===c||g&&f===c)return i;c=s(l,g,c);if(!d.silent&&!1===m(a,"before",b,l,c,h))return!1;c=a.setInternal(b,c,d);if(!1===c)return c;d.silent||(c=n(a)[b],m(a,"after",b,l,c,h),e?e.push({prevVal:l,newVal:c,attrName:b,subAttrName:h}):m(a,"",
"*",[l],[c],[h],[b]));return a}function o(){}function p(a,b){var c=f(a),d=h(c,b),e=d.valueFn;if(e&&(e=k(a,e)))e=e.call(a),e!==i&&(d.value=e),delete d.valueFn,c[b]=d;return d.value}function u(a,b,c,d){var e,g;e=r(a,b);b=e.name;if(e=e.path)g=a.get(b),c=s(g,e,c);if((e=h(f(a),b,!0).validator)&&(e=k(a,e)))if(a=e.call(a,c,b,d),a!==i&&!0!==a)return a;return i}o.INVALID={};var v=o.INVALID;o.prototype={getAttrs:function(){return f(this)},getAttrVals:function(){var a={},b,c=f(this);for(b in c)a[b]=this.get(b);
return a},addAttr:function(a,b,c){var d=f(this),b=j.clone(b);d[a]?j.mix(d[a],b,c):d[a]=b;return this},addAttrs:function(a,b){var c=this;j.each(a,function(a,b){c.addAttr(b,a)});b&&c.set(b);return c},hasAttr:function(a){return f(this).hasOwnProperty(a)},removeAttr:function(a){this.hasAttr(a)&&(delete f(this)[a],delete n(this)[a]);return this},set:function(a,b,c){if(j.isPlainObject(a)){var c=b,b=Object(a),d=[],e,g=[];for(a in b)(e=u(this,a,b[a],b))!==i&&g.push(e);if(g.length)return c&&c.error&&c.error(g),
!1;for(a in b)t(this,a,b[a],c,d);var f=[],h=[],n=[],k=[];j.each(d,function(a){h.push(a.prevVal);n.push(a.newVal);f.push(a.attrName);k.push(a.subAttrName)});f.length&&m(this,"","*",h,n,k,f);return this}return t(this,a,b,c)},setInternal:function(a,b,c){var d,e,g=h(f(this),a,!0).setter;e=u(this,a,b);if(e!==i)return c.error&&c.error(e),!1;if(g&&(g=k(this,g)))d=g.call(this,b,a);if(d===v)return!1;d!==i&&(b=d);n(this)[a]=b},get:function(a){var b,c=this.hasAttr(a),d=n(this),e;!c&&-1!==a.indexOf(".")&&(b=
a.split("."),a=b.shift());c=h(f(this),a).getter;e=a in d?d[a]:p(this,a);if(c&&(c=k(this,c)))e=c.call(this,e,a);!(a in d)&&e!==i&&(d[a]=e);b&&(e=q(e,b));return e},reset:function(a,b){if("string"==typeof a)return this.hasAttr(a)?this.set(a,p(this,a),b):this;var b=a,c=f(this),d={};for(a in c)d[a]=p(this,a);this.set(d,b);return this}};return o});
KISSY.add("base",function(j,i,k){function m(h){var f=this.constructor;for(this.userConfig=h;f;){var i=f.ATTRS;if(i){var j=void 0;for(j in i)this.addAttr(j,i[j],!1)}f=f.superclass?f.superclass.constructor:null}if(h)for(var k in h)this.setInternal(k,h[k])}j.augment(m,k.Target,i);m.Attribute=i;return j.Base=m},{requires:["base/attribute","event/custom"]});
/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:00
*/
KISSY.add("component/extension/align",function(e,c,n){function h(a){var d=a.ownerDocument.body,g=c.css(a,"position");if(!("fixed"==g||"absolute"==g))return"html"==a.nodeName.toLowerCase()?null:a.parentNode;for(a=a.parentNode;a&&a!=d;a=a.parentNode)if(g=c.css(a,"position"),"static"!=g)return a;return null}function o(a){var d,g,b={left:0,right:Infinity,top:0,bottom:Infinity},k;g=a.ownerDocument;d=g.body;for(g=g.documentElement;a=h(a);)if((!t.ie||0!=a.clientWidth)&&a!=d&&a!=g&&"visible"!=c.css(a,"overflow"))k=
c.offset(a),k.left+=a.clientLeft,k.top+=a.clientTop,b.top=Math.max(b.top,k.top),b.right=Math.min(b.right,k.left+a.clientWidth),b.bottom=Math.min(b.bottom,k.top+a.clientHeight),b.left=Math.max(b.left,k.left);a=c.scrollLeft();k=c.scrollTop();b.left=Math.max(b.left,a);b.top=Math.max(b.top,k);d=c.viewportWidth();g=c.viewportHeight();b.right=Math.min(b.right,a+d);b.bottom=Math.min(b.bottom,k+g);return 0<=b.top&&0<=b.left&&b.bottom>b.top&&b.right>b.left?b:null}function q(a,d,g,b){var c,j;c=a.left;j=a.top;
d=r(d,g[0]);a=r(a,g[1]);a=[a.left-d.left,a.top-d.top];return{left:c-a[0]+ +b[0],top:j-a[1]+ +b[1]}}function m(a,d,g){var b=[];e.each(a,function(a){b.push(a.replace(d,function(a){return g[a]}))});return b}function p(){}function s(a){var d,g;e.isWindow(a[0])?(d={left:c.scrollLeft(),top:c.scrollTop()},g=c.viewportWidth(),a=c.viewportHeight()):(d=a.offset(),g=a.outerWidth(),a=a.outerHeight());d.width=g;d.height=a;return d}function r(a,d){var g=d.charAt(0),b=d.charAt(1),c=a.width,e=a.height,f,i;f=a.left;
i=a.top;"c"===g?i+=e/2:"b"===g&&(i+=e);"c"===b?f+=c/2:"r"===b&&(f+=c);return{left:f,top:i}}var u=e.Env.host,t=e.UA;p.__getOffsetParent=h;p.__getVisibleRectForElement=o;p.ATTRS={align:{value:{}}};p.prototype={_onSetAlign:function(a){a&&a.points&&this.align(a.node,a.points,a.offset,a.overflow)},align:function(a,d,c,b){var a=n.one(a||u),c=c&&[].concat(c)||[0,0],b=b||{},k=this.get("el"),j=0,f=o(k[0]),i=s(k),h=s(a),a=q(i,h,d,c),l=e.merge(i,a);if(f&&(b.adjustX||b.adjustY)){if(a.left<f.left||a.left+i.width>
f.right)j=1,d=m(d,/[lr]/ig,{l:"r",r:"l"}),c[0]=-c[0];if(a.top<f.top||a.top+i.height>f.bottom)j=1,d=m(d,/[tb]/ig,{t:"b",b:"t"}),c[1]=-c[1];j&&(a=q(i,h,d,c),e.mix(l,a));d={};d.adjustX=b.adjustX&&(a.left<f.left||a.left+i.width>f.right);d.adjustY=b.adjustY&&(a.top<f.top||a.top+i.height>f.bottom);if(d.adjustX||d.adjustY)b=e.clone(a),j={width:i.width,height:i.height},d.adjustX&&b.left<f.left&&(b.left=f.left),d.resizeWidth&&b.left>=f.left&&b.left+j.width>f.right&&(j.width-=b.left+j.width-f.right),d.adjustX&&
b.left+j.width>f.right&&(b.left=Math.max(f.right-j.width,f.left)),d.adjustY&&b.top<f.top&&(b.top=f.top),d.resizeHeight&&b.top>=f.top&&b.top+j.height>f.bottom&&(j.height-=b.top+j.height-f.bottom),d.adjustY&&b.top+j.height>f.bottom&&(b.top=Math.max(f.bottom-j.height,f.top)),l=e.mix(b,j)}l.left!=i.left&&(this.setInternal("x",null),this.get("view").setInternal("x",null),this.set("x",l.left));l.top!=i.top&&(this.setInternal("y",null),this.get("view").setInternal("y",null),this.set("y",l.top));l.width!=
i.width&&k.width(k.width()+l.width-i.width);l.height!=i.height&&k.height(k.height()+l.height-i.height);return this},center:function(a){this.set("align",{node:a,points:["cc","cc"],offset:[0,0]});return this}};return p},{requires:["dom","node"]});
KISSY.add("component/extension/content-box-render",function(e,c,n){function h(){}h.ATTRS={contentEl:{}};h.prototype={__createDom:function(){var e,h=this.get("el");e=h[0].childNodes;var m=e.length&&n._nodeListToFragment(e);e=c.all("<div class='"+this.get("prefixCls")+"contentbox'></div>");m&&e.append(m);h.append(e);this.setInternal("contentEl",e)}};return h},{requires:["node","dom"]});KISSY.add("component/extension/content-box",function(){function e(){}e.ATTRS={contentEl:{view:1}};return e});
KISSY.add("component/extension",function(e,c,n,h,o,q,m){o.Render=q;n.Render=h;return{Align:c,ContentBox:n,Position:o,Shim:{Render:m}}},{requires:"./extension/align,./extension/content-box,./extension/content-box-render,./extension/position,./extension/position-render,./extension/shim-render".split(",")});
KISSY.add("component/extension/position-render",function(){function e(){}e.ATTRS={x:{},y:{},zIndex:{},visibleMode:{value:"visibility"}};e.prototype={__createDom:function(){this.get("el").addClass(this.get("prefixCls")+"ext-position")},_onSetZIndex:function(c){this.get("el").css("z-index",c)},_onSetX:function(c){null!=c&&this.get("el").offset({left:c})},_onSetY:function(c){null!=c&&this.get("el").offset({top:c})}};return e});
KISSY.add("component/extension/position",function(e){function c(){}c.ATTRS={x:{view:1},y:{view:1},xy:{setter:function(c){var h=e.makeArray(c);h.length&&(h[0]&&this.set("x",h[0]),h[1]&&this.set("y",h[1]));return c},getter:function(){return[this.get("x"),this.get("y")]}},zIndex:{view:1},visible:{value:!1}};c.prototype={move:function(c,h){e.isArray(c)&&(h=c[1],c=c[0]);this.set("xy",[c,h]);return this}};return c});
KISSY.add("component/extension/shim-render",function(){function e(){}e.prototype={__createDom:function(){this.get("el").prepend("<iframe style='position: absolute;border: none;width: expression(this.parentNode.clientWidth);top: 0;opacity: 0;filter: alpha(opacity=0);left: 0;z-index: -1;height: expression(this.parentNode.clientHeight);'/>")}};return e});
/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:08
*/
KISSY.add("xtemplate/facade",function(f,c,h){function a(b,d){d=f.merge(j,d);if("string"==typeof b){var a=b,g=d,e;if(!g.cache||!(e=i[a]))e=h.compileToFn(a,g),g.cache&&(i[a]=e);b=e}this.option=d;this.tpl=b;this.runtime=new c(b,d)}var i=a.cache={};c.includeCommand.invokeEngine=function(b,d,c){return(new a(b,f.merge(c))).render(d,!0)};var j={cache:!0};f.augment(a,{removeSubTpl:function(b){this.runtime.removeSubTpl(b)},removeCommand:function(b){this.runtime.removeCommand(b)},addSubTpl:function(b,a){this.runtime.addSubTpl(b,
a)},addCommand:function(a,c){this.runtime.addCommand(a,c)},render:function(a){return this.runtime.render.apply(this.runtime,arguments)}});a.compiler=h;a.RunTime=c;a.addCommand=c.addCommand;a.addSubTpl=c.addSubTpl;a.removeCommand=c.removeCommand;a.removeSubTpl=c.removeSubTpl;return a},{requires:["./runtime","./compiler"]});
/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:08
*/
KISSY.add("xtemplate/runtime/base",function(d){function b(c,a){this.tpl=c;a=d.merge(g,a);a.subTpls=d.merge(a.subTpls,b.subTpls);a.commands=d.merge(a.commands,b.commands);this.option=a}var g={silent:!0,name:"",utils:{getProperty:function(c,a,e){if("this"==c||"."==c)return a.length?[a[0]]:!1;for(var c=c.split("."),g=c.length,b=e||0,f,d,i,k=a.length;b<k;b++){f=a[b];i=1;for(e=0;e<g;e++){d=c[e];if("object"!=typeof f||!(d in f)){i=0;break}f=f[d]}if(i)return"function"==typeof f&&(f=f.call(a[0])),[f]}return!1}}};
b.prototype={constructor:b,removeSubTpl:function(c){delete this.option.subTpls[c]},removeCommand:function(c){delete this.option.commands[c]},addSubTpl:function(c,a){this.option.subTpls[c]=a},addCommand:function(c,a){this.option.commands[c]=a},render:function(c,a){a||(c=[c]);return this.tpl(c,this.option)}};return b});
KISSY.add("xtemplate/runtime/commands",function(d,b){return{each:function(b,c){var a=c.params[0],e="",d;if(a){var h=[0,0].concat(b);d=a.length;for(var f=0;f<d;f++)h[0]=a[f],h[1]={xcount:d,xindex:f},e+=c.fn(h)}else c.inverse&&(e=c.inverse(b));return e},"with":function(b,c){var a=c.params[0],e=[0].concat(b),d="";a?(e[0]=a,d=c.fn(e)):c.inverse&&(d=c.inverse(b));return d},"if":function(b,c){var a="";c.params[0]?c.fn&&(a=c.fn(b)):c.inverse&&(a=c.inverse(b));return a},set:function(b,c){for(var a=b.length-
1;0<=a;a--)if("object"==typeof b[a]){d.mix(b[a],c.hash);break}return""},include:b.include}},{requires:["./include-command"]});
KISSY.add("xtemplate/runtime/include-command",function(d,b){var g={invokeEngine:function(c,a,e){return(new b(c,d.merge(e))).render(a,!0)},include:function(c,a){var b=a.params;if(!b||1!=b.length)return d[a.silent?"log":"error"]("include must has one param"),"";var b=b[0],j;if(!(j=a.subTpls[b]))return d[a.silent?"log":"error"]('does not include sub template "'+b+'"'),"";a.name=b;return g.invokeEngine(j,c,a)}};return g},{requires:["./base"]});
KISSY.add("xtemplate/runtime",function(d,b,g,c){b.addCommand=function(a,b){g[a]=b};b.removeCommand=function(a){delete g[a]};b.commands=g;b.includeCommand=c;var a={};b.subTpls=a;b.addSubTpl=function(b,c){a[b]=c};b.removeSubTpl=function(b){delete a[b]};return b.IncludeEngine=b},{requires:["./runtime/base","./runtime/commands","./runtime/include-command"]});
/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:08
*/
KISSY.add("xtemplate/compiler/ast",function(k){var a={ProgramNode:function(a,f,b){this.lineNumber=a;this.statements=f;this.inverse=b}};a.ProgramNode.prototype.type="program";a.BlockNode=function(a,f,b,e){k.equals(f.path.parts,e.parts);this.lineNumber=a;this.tpl=f;this.program=b};a.BlockNode.prototype.type="block";a.TplNode=function(a,f,b,e){this.lineNumber=a;this.path=f;this.params=b;this.hash=e;this.escaped=!0;this.isInversed=!1};a.TplNode.prototype.type="tpl";a.TplExpressionNode=function(a,f){this.lineNumber=
a;this.expression=f;this.escaped=!0};a.TplExpressionNode.prototype.type="tplExpression";a.ContentNode=function(a,f){this.lineNumber=a;this.value=f};a.ContentNode.prototype.type="content";a.UnaryExpression=function(a){this.value=a};a.UnaryExpression.prototype.type="unaryExpression";a.MultiplicativeExpression=function(a,f,b){this.op1=a;this.opType=f;this.op2=b};a.MultiplicativeExpression.prototype.type="multiplicativeExpression";a.AdditiveExpression=function(a,f,b){this.op1=a;this.opType=f;this.op2=
b};a.AdditiveExpression.prototype.type="additiveExpression";a.RelationalExpression=function(a,f,b){this.op1=a;this.opType=f;this.op2=b};a.RelationalExpression.prototype.type="relationalExpression";a.EqualityExpression=function(a,f,b){this.op1=a;this.opType=f;this.op2=b};a.EqualityExpression.prototype.type="equalityExpression";a.ConditionalAndExpression=function(a,f){this.op1=a;this.op2=f};a.ConditionalAndExpression.prototype.type="conditionalAndExpression";a.ConditionalOrExpression=function(a,f){this.op1=
a;this.op2=f};a.ConditionalOrExpression.prototype.type="conditionalOrExpression";a.StringNode=function(a,f){this.lineNumber=a;this.value=f};a.StringNode.prototype.type="string";a.NumberNode=function(a,f){this.lineNumber=a;this.value=f};a.NumberNode.prototype.type="number";a.BooleanNode=function(a,f){this.lineNumber=a;this.value=f};a.BooleanNode.prototype.type="boolean";a.HashNode=function(a,f){var b={};this.lineNumber=a;k.each(f,function(a){b[a[0]]=a[1]});this.value=b};a.HashNode.prototype.type="hash";
a.IdNode=function(a,f){var b=[],e=0;this.lineNumber=a;k.each(f,function(a){".."==a?e++:b.push(a)});this.parts=b;this.string=b.join(".");this.depth=e};a.IdNode.prototype.type="id";return a});
KISSY.add("xtemplate/compiler",function(k,a,m,f){function b(d,a){return e(d.replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t"),a)}function e(d,a){return d.replace(a?s:t,function(d){d.length%2&&(d="\\"+d);return d})}function l(d,a){n.apply(d,a)}function g(d){return d[d.length-1]}function q(d,a,c){var b="tmp"+j++;c.push("var "+b+" = "+d+";");c.push("buffer+="+(a?"escapeHTML(":"")+"("+b+'===undefined?"":'+b+')+""'+(a?")":"")+";")}a.yy=m;var u={getProperty:1},s=/\\*"/g,t=/\\*'/g,n=[].push,
j=0,r=0;f.includeCommand.invokeEngine=function(d,a,c){"string"==typeof d&&(d=o.compileToFn(d,c));return(new f(d,k.merge(c))).render(a)};var i={genFunction:function(d,a){var c=[];a||c.push("function(scopes) {");c.push('var buffer = ""'+(a?",":";"));if(a){c.push("S = KISSY,escapeHTML = S.escapeHTML,isArray = S.isArray,isObject = S.isObject,log = S.log,commands = option.commands,utils = option.utils,error = S.error;");var b="",e,g=f.commands;for(e in g)b+=e+'Command = commands["'+e+'"],';for(e in u)b+=
e+' = utils["'+e+'"],';b&&c.push("var "+b.slice(0,b.length-1))}if(d){b=0;for(e=d.length;b<e;b++)l(c,this[d[b].type](d[b]))}c.push("return buffer;");return!a?(c.push("}"),c):{params:["scopes","option","undefined"],source:c}},genId:function(d,a){var c=[],b=d.depth,e=d.string,g="id"+j++,h=0,p;p=f.commands;c.push("var "+g+";");if(a&&0==b){var i=this.genOption(a);l(c,i[1]);(h=p[e])?p=e+"Command":(p="command"+j++,c.push("var "+p+";"),c.push(p+' = commands["'+e+'"];'),c.push("if( "+p+" ){"));c.push("try{");
c.push(g+" = "+p+"(scopes,"+i[0]+");");c.push("}catch(e){");c.push("error(e.message+\": '"+e+"' at line "+d.lineNumber+'");');c.push("}");h||(c.push("}"),c.push("else {"))}h||(h="tmp"+j++,c.push("var "+h+' = getProperty("'+e+'",scopes,'+b+");"),c.push("if("+h+"===false){"),c.push('S[option.silent?"log":"error"]("can not find property: \''+e+"' at line "+d.lineNumber+'", "warn");'),c.push("} else {"),c.push(g+" = "+h+"[0];"),c.push("}"),a&&0==b&&c.push("}"));return[g,c]},genOpExpression:function(d,
a){var c=[],b,e,f=this[d.op1.type](d.op1),h=this[d.op2.type](d.op2);b=f[0];e=h[0];if(b&&e)return l(c,f[1]),l(c,h[1]),c.push(b+a+e),["",c];if(!b&&!e)return l(c,f[1].slice(0,-1)),l(c,h[1].slice(0,-1)),c.push("("+g(f[1])+")"+a+"("+g(h[1])+")"),["",c];if(b&&!e)return l(c,f[1]),l(c,h[1].slice(0,-1)),c.push(b+a+"("+g(h[1])+")"),["",c];if(!b&&e)return l(c,f[1].slice(0,-1)),l(c,h[1]),c.push("("+g(f[1])+")"+a+e),["",c]},genOption:function(d){var a=[],c="option"+j++,b,e=this;a.push("var "+c+" = S.merge(option);");
if(d){if(b=d.params){var f="params"+j++;a.push("var "+f+" = [];");k.each(b,function(d){d=e[d.type](d);d[0]?(l(a,d[1]),a.push(f+".push("+d[0]+");")):(l(a,d[1].slice(0,-1)),a.push(f+".push("+g(d[1])+");"))});a.push(c+".params="+f+";")}if(d=d.hash){var h="hash"+j++;a.push("var "+h+" = {};");k.each(d.value,function(d,b){var c=e[d.type](d);c[0]?(l(a,c[1]),a.push(h+'["'+b+'"] = '+c[0]+";")):(l(a,c[1].slice(0,-1)),a.push(h+'["'+b+'"] = '+g(c[1])+";"))});a.push(c+".hash="+h+";")}}return[c,a]},conditionalOrExpression:function(d){return this.genOpExpression(d,
"||")},conditionalAndExpression:function(d){return this.genOpExpression(d,"&&")},relationalExpression:function(d){return this.genOpExpression(d,d.opType)},equalityExpression:function(d){return this.genOpExpression(d,d.opType)},additiveExpression:function(d){return this.genOpExpression(d,d.opType)},multiplicativeExpression:function(d){return this.genOpExpression(d,d.opType)},unaryExpression:function(d){var a=[],c,d=this[d.value.type](d.value);n.apply(a,d[1]);(c=d[0])?a.push(c+"=!"+c+";"):a[a.length-
1]="!"+g(a);return[c,a]},string:function(d){return["",["'"+b(d.value)+"'"]]},number:function(d){return["",[d.value]]},"boolean":function(d){return["",[d.value]]},id:function(d){return this.genId(d)},block:function(d){var a=d.program,c=[],b,d=d.tpl,e=this.genOption(d),g=e[0];b=f.commands;var h=d.path.string;l(c,e[1]);c.push(g+".fn="+this.genFunction(a.statements).join("\n")+";");a.inverse&&(a=this.genFunction(a.inverse).join("\n"),c.push(g+".inverse="+a+";"));d.isInversed&&(a="inverse"+j++,c.push("var "+
a+"="+g+".fn;"),c.push(g+".fn = "+g+".inverse;"),c.push(g+".inverse = "+a+";"));if(a=b[h])b=h+"Command";else{b="command"+j++;c.push("var "+b+' = commands["'+h+'"];');if(!d.hash&&!d.params){c.push("if(!"+b+"){");var i="propertyValueHolder"+j++;c.push("var "+i+' = getProperty("'+h+'",scopes);');e="variableName"+j++;c.push("var "+e+"="+i+"&&"+i+"[0];");c.push(g+".params=["+e+"];");c.push("if(isArray("+e+")){");c.push(b+'=commands["each"];');c.push("}");c.push("else if(isObject("+e+")){");c.push(b+'=commands["with"];');
c.push("}");c.push("else {");c.push(b+'=commands["if"];');c.push("}");c.push("}")}c.push("if( "+b+" ){")}c.push("try{");c.push("buffer += "+b+"(scopes,"+g+");");c.push("}catch(e){");c.push("error(e.message+\": '"+h+"' at line "+d.path.lineNumber+'");');c.push("}");a||(c.push("}"),c.push("if("+i+"===false) {"),c.push('S[option.silent?"log":"error"]("can not find command: \''+h+"' at line "+d.path.lineNumber+'","warn");'),c.push("}"));return c},content:function(a){return["buffer += '"+b(a.value)+"';"]},
tpl:function(a){var b=[],c=a.escaped,a=this.genId(a.path,a);l(b,a[1]);q(a[0],c,b);return b},tplExpression:function(a){var b=[],c=a.escaped,a=this[a.expression.type](a.expression);a[0]?(l(b,a[1]),a=a[0]):(l(b,a[1].slice(0,-1)),a=g(a[1]));q(a,c,b);return b}},o;return o={parse:function(b){return a.parse(b)},compileToStr:function(a){a=this.compile(a);return"function("+a.params.join(",")+"){\n"+a.source.join("\n")+"}"},compile:function(a){a=this.parse(a);j=0;return i.genFunction(a.statements,!0)},compileToFn:function(a,
b){var c=o.compile(a),b=b||{};return Function.apply(null,[].concat(c.params).concat(c.source.join("\n")+"//@ sourceURL="+(b.name?b.name:"xtemplate"+r++)+".js"))}}},{requires:["./compiler/parser","./compiler/ast","xtemplate/runtime"]});
KISSY.add("xtemplate/compiler/parser",function(){var k={},a=KISSY,m=function(b){this.rules=[];a.mix(this,b);this.resetInput(this.input)};m.prototype={constructor:function(b){this.rules=[];a.mix(this,b);this.resetInput(this.input)},resetInput:function(b){a.mix(this,{input:b,matched:"",stateStack:[m.STATIC.INITIAL],match:"",text:"",firstLine:1,lineNumber:1,lastLine:1,firstColumn:1,lastColumn:1})},getCurrentRules:function(){var b=this.stateStack[this.stateStack.length-1],e=[],b=this.mapState(b);a.each(this.rules,
function(l){var f=l.state||l[3];f?a.inArray(b,f)&&e.push(l):b==m.STATIC.INITIAL&&e.push(l)});return e},pushState:function(a){this.stateStack.push(a)},popState:function(){return this.stateStack.pop()},getStateStack:function(){return this.stateStack},showDebugInfo:function(){var a=m.STATIC.DEBUG_CONTEXT_LIMIT,e=this.matched,f=this.match,g=this.input,e=e.slice(0,e.length-f.length),e=(e.length>a?"...":"")+e.slice(-a).replace(/\n/," "),f=f+g,f=f.slice(0,a)+(f.length>a?"...":"");return e+f+"\n"+Array(e.length+
1).join("-")+"^"},mapSymbol:function(a){var e=this.symbolMap;return!e?a:e[a]||(e[a]=++this.symbolId)},mapReverseSymbol:function(a){var e=this.symbolMap,f,g=this.reverseSymbolMap;if(!g&&e)for(f in g=this.reverseSymbolMap={},e)g[e[f]]=f;return g?g[a]:a},mapState:function(a){var e=this.stateMap;return!e?a:e[a]||(e[a]=++this.stateId)},lex:function(){var b=this.input,e,f,g,q=this.getCurrentRules();this.match=this.text="";if(!b)return this.mapSymbol(m.STATIC.END_TAG);for(e=0;e<q.length;e++){f=q[e];var k=
f.token||f[0];g=f.action||f[2]||void 0;if(f=b.match(f.regexp||f[1])){if(e=f[0].match(/\n.*/g))this.lineNumber+=e.length;a.mix(this,{firstLine:this.lastLine,lastLine:this.lineNumber+1,firstColumn:this.lastColumn,lastColumn:e?e[e.length-1].length-1:this.lastColumn+f[0].length});e=this.match=f[0];this.matches=f;this.text=e;this.matched+=e;g=g&&g.call(this);g=void 0==g?k:this.mapSymbol(g);this.input=b=b.slice(e.length);return g?g:this.lex()}}}};m.STATIC={INITIAL:"I",DEBUG_CONTEXT_LIMIT:20,END_TAG:"$EOF"};
var f=new m({rules:[[0,/^(\\[\s\S]|[\s\S])*?(?={{)/,function(){var a=this.text,e,f=0;if(e=a.match(/\\+$/))f=e[0].length;f%2?(a=a.slice(0,-1),this.pushState("et")):this.pushState("t");if(this.text=a)return"CONTENT"}],[2,/^[\s\S]+/,0],[2,/^[\s\S]{2,}?(?:(?={{)|$)/,function(){this.popState()},["et"]],[3,/^{{(?:#|@|\^)/,0,["t"]],[4,/^{{\//,0,["t"]],[5,/^{{\s*else/,0,["t"]],[6,/^{{{/,0,["t"]],[0,/^{{![\s\S]*?}}/,function(){this.popState()},["t"]],[7,/^{{/,0,["t"]],[0,/^\s+/,0,["t"]],[8,/^}}}/,function(){this.popState()},
["t"]],[8,/^}}/,function(){this.popState()},["t"]],[9,/^\(/,0,["t"]],[10,/^\)/,0,["t"]],[11,/^\|\|/,0,["t"]],[12,/^&&/,0,["t"]],[13,/^===/,0,["t"]],[14,/^!==/,0,["t"]],[16,/^>=/,0,["t"]],[18,/^<=/,0,["t"]],[15,/^>/,0,["t"]],[17,/^</,0,["t"]],[19,/^\+/,0,["t"]],[20,/^-/,0,["t"]],[21,/^\*/,0,["t"]],[22,/^\//,0,["t"]],[23,/^%/,0,["t"]],[24,/^!/,0,["t"]],[25,/^"(\\"|[^"])*"/,function(){this.text=this.text.slice(1,-1).replace(/\\"/g,'"')},["t"]],[25,/^'(\\'|[^'])*'/,function(){this.text=this.text.slice(1,
-1).replace(/\\'/g,"'")},["t"]],[26,/^true/,0,["t"]],[26,/^false/,0,["t"]],[27,/^\d+(?:\.\d+)?(?:e-?\d+)?/i,0,["t"]],[28,/^=/,0,["t"]],[29,/^\.(?=})/,0,["t"]],[29,/^\.\./,function(){this.pushState("ws")},["t"]],[30,/^\./,0,["t"]],[30,/^\//,function(){this.popState()},["ws"]],[29,/^[a-zA-Z0-9_$-]+/,0,["t"]],[31,/^./,0,["t"]]]});k.lexer=f;f.symbolMap={$EOF:1,CONTENT:2,OPEN_BLOCK:3,OPEN_END_BLOCK:4,OPEN_INVERSE:5,OPEN_UN_ESCAPED:6,OPEN:7,CLOSE:8,LPAREN:9,RPAREN:10,OR:11,AND:12,LOGIC_EQUALS:13,LOGIC_NOT_EQUALS:14,
GT:15,GE:16,LT:17,LE:18,PLUS:19,MINUS:20,MULTIPLY:21,DIVIDE:22,MODULUS:23,NOT:24,STRING:25,BOOLEAN:26,NUMBER:27,EQUALS:28,ID:29,SEP:30,INVALID:31,$START:32,program:33,statements:34,inverse:35,statement:36,openBlock:37,closeBlock:38,tpl:39,inTpl:40,path:41,Expression:42,params:43,hash:44,param:45,ConditionalOrExpression:46,ConditionalAndExpression:47,EqualityExpression:48,RelationalExpression:49,AdditiveExpression:50,MultiplicativeExpression:51,UnaryExpression:52,PrimaryExpression:53,hashSegments:54,
hashSegment:55,pathSegments:56};k.productions=[[32,[33]],[33,[34,35,34],function(){return new this.yy.ProgramNode(this.lexer.lineNumber,this.$1,this.$3)}],[33,[34],function(){return new this.yy.ProgramNode(this.lexer.lineNumber,this.$1)}],[34,[36],function(){return[this.$1]}],[34,[34,36],function(){this.$1.push(this.$2)}],[36,[37,33,38],function(){return new this.yy.BlockNode(this.lexer.lineNumber,this.$1,this.$2,this.$3)}],[36,[39]],[36,[2],function(){return new this.yy.ContentNode(this.lexer.lineNumber,
this.$1)}],[37,[3,40,8],function(){"^"==this.$1.charAt(this.$1.length-1)&&(this.$2.isInversed=1);return this.$2}],[38,[4,41,8],function(){return this.$2}],[39,[7,40,8],function(){return this.$2}],[39,[6,40,8],function(){this.$2.escaped=!1;return this.$2}],[39,[7,42,8],function(){return new this.yy.TplExpressionNode(this.lexer.lineNumber,this.$2)}],[39,[6,42,8],function(){var a=new this.yy.TplExpressionNode(this.lexer.lineNumber,this.$2);a.escaped=!1;return a}],[35,[5,8]],[40,[41,43,44],function(){return new this.yy.TplNode(this.lexer.lineNumber,
this.$1,this.$2,this.$3)}],[40,[41,43],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1,this.$2)}],[40,[41,44],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1,null,this.$2)}],[40,[41],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1)}],[43,[43,45],function(){this.$1.push(this.$2)}],[43,[45],function(){return[this.$1]}],[45,[42]],[42,[46]],[46,[47]],[46,[46,11,47],function(){return new this.yy.ConditionalOrExpression(this.$1,this.$3)}],[47,
[48]],[47,[47,12,48],function(){return new this.yy.ConditionalAndExpression(this.$1,this.$3)}],[48,[49]],[48,[48,13,49],function(){return new this.yy.EqualityExpression(this.$1,"===",this.$3)}],[48,[48,14,49],function(){return new this.yy.EqualityExpression(this.$1,"!==",this.$3)}],[49,[50]],[49,[49,17,50],function(){return new this.yy.RelationalExpression(this.$1,"<",this.$3)}],[49,[49,15,50],function(){return new this.yy.RelationalExpression(this.$1,">",this.$3)}],[49,[49,18,50],function(){return new this.yy.RelationalExpression(this.$1,
"<=",this.$3)}],[49,[49,16,50],function(){return new this.yy.RelationalExpression(this.$1,">=",this.$3)}],[50,[51]],[50,[50,19,51],function(){return new this.yy.AdditiveExpression(this.$1,"+",this.$3)}],[50,[50,20,51],function(){return new this.yy.AdditiveExpression(this.$1,"-",this.$3)}],[51,[52]],[51,[51,21,52],function(){return new this.yy.MultiplicativeExpression(this.$1,"*",this.$3)}],[51,[51,22,52],function(){return new this.yy.MultiplicativeExpression(this.$1,"/",this.$3)}],[51,[51,23,52],
function(){return new this.yy.MultiplicativeExpression(this.$1,"%",this.$3)}],[52,[24,52],function(){return new this.yy.UnaryExpression(this.$1)}],[52,[53]],[53,[25],function(){return new this.yy.StringNode(this.lexer.lineNumber,this.$1)}],[53,[27],function(){return new this.yy.NumberNode(this.lexer.lineNumber,this.$1)}],[53,[26],function(){return new this.yy.BooleanNode(this.lexer.lineNumber,this.$1)}],[53,[41]],[53,[9,42,10],function(){return this.$2}],[44,[54],function(){return new this.yy.HashNode(this.lexer.lineNumber,
this.$1)}],[54,[54,55],function(){this.$1.push(this.$2)}],[54,[55],function(){return[this.$1]}],[55,[29,28,42],function(){return[this.$1,this.$3]}],[41,[56],function(){return new this.yy.IdNode(this.lexer.lineNumber,this.$1)}],[56,[56,30,29],function(){this.$1.push(this.$3)}],[56,[56,30,27],function(){this.$1.push(this.$3)}],[56,[29],function(){return[this.$1]}]];k.table={gotos:{"0":{33:5,34:6,36:7,37:8,39:9},2:{40:11,41:12,56:13},3:{40:19,41:20,42:21,46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,
56:13},4:{40:30,41:20,42:31,46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,56:13},6:{35:33,36:34,37:8,39:9},8:{33:35,34:6,36:7,37:8,39:9},12:{41:38,42:39,43:40,44:41,45:42,46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,54:43,55:44,56:13},14:{41:38,42:46,46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,56:13},15:{41:38,52:47,53:29,56:13},20:{41:38,42:39,43:40,44:41,45:42,46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,54:43,55:44,56:13},33:{34:66,36:7,37:8,39:9},35:{38:68},40:{41:38,42:39,44:70,45:71,
46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,54:43,55:44,56:13},43:{55:73},50:{41:38,47:77,48:24,49:25,50:26,51:27,52:28,53:29,56:13},51:{41:38,48:78,49:25,50:26,51:27,52:28,53:29,56:13},52:{41:38,49:79,50:26,51:27,52:28,53:29,56:13},53:{41:38,49:80,50:26,51:27,52:28,53:29,56:13},54:{41:38,50:81,51:27,52:28,53:29,56:13},55:{41:38,50:82,51:27,52:28,53:29,56:13},56:{41:38,50:83,51:27,52:28,53:29,56:13},57:{41:38,50:84,51:27,52:28,53:29,56:13},58:{41:38,51:85,52:28,53:29,56:13},59:{41:38,51:86,52:28,
53:29,56:13},60:{41:38,52:87,53:29,56:13},61:{41:38,52:88,53:29,56:13},62:{41:38,52:89,53:29,56:13},66:{36:34,37:8,39:9},67:{41:90,56:13},69:{41:38,42:91,46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,56:13}},action:{"0":{2:[1,0,1],3:[1,0,2],6:[1,0,3],7:[1,0,4]},1:{1:[2,7,0],2:[2,7,0],3:[2,7,0],4:[2,7,0],5:[2,7,0],6:[2,7,0],7:[2,7,0]},2:{29:[1,0,10]},3:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},4:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},
5:{1:[0,0,0]},6:{1:[2,2,0],2:[1,0,1],3:[1,0,2],4:[2,2,0],5:[1,0,32],6:[1,0,3],7:[1,0,4]},7:{1:[2,3,0],2:[2,3,0],3:[2,3,0],4:[2,3,0],5:[2,3,0],6:[2,3,0],7:[2,3,0]},8:{2:[1,0,1],3:[1,0,2],6:[1,0,3],7:[1,0,4]},9:{1:[2,6,0],2:[2,6,0],3:[2,6,0],4:[2,6,0],5:[2,6,0],6:[2,6,0],7:[2,6,0]},10:{8:[2,56,0],9:[2,56,0],10:[2,56,0],11:[2,56,0],12:[2,56,0],13:[2,56,0],14:[2,56,0],15:[2,56,0],16:[2,56,0],17:[2,56,0],18:[2,56,0],19:[2,56,0],20:[2,56,0],21:[2,56,0],22:[2,56,0],23:[2,56,0],24:[2,56,0],25:[2,56,0],26:[2,
56,0],27:[2,56,0],29:[2,56,0],30:[2,56,0]},11:{8:[1,0,36]},12:{8:[2,18,0],9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,37]},13:{8:[2,53,0],9:[2,53,0],10:[2,53,0],11:[2,53,0],12:[2,53,0],13:[2,53,0],14:[2,53,0],15:[2,53,0],16:[2,53,0],17:[2,53,0],18:[2,53,0],19:[2,53,0],20:[2,53,0],21:[2,53,0],22:[2,53,0],23:[2,53,0],24:[2,53,0],25:[2,53,0],26:[2,53,0],27:[2,53,0],29:[2,53,0],30:[1,0,45]},14:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},15:{9:[1,0,14],
24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},16:{8:[2,44,0],9:[2,44,0],10:[2,44,0],11:[2,44,0],12:[2,44,0],13:[2,44,0],14:[2,44,0],15:[2,44,0],16:[2,44,0],17:[2,44,0],18:[2,44,0],19:[2,44,0],20:[2,44,0],21:[2,44,0],22:[2,44,0],23:[2,44,0],24:[2,44,0],25:[2,44,0],26:[2,44,0],27:[2,44,0],29:[2,44,0]},17:{8:[2,46,0],9:[2,46,0],10:[2,46,0],11:[2,46,0],12:[2,46,0],13:[2,46,0],14:[2,46,0],15:[2,46,0],16:[2,46,0],17:[2,46,0],18:[2,46,0],19:[2,46,0],20:[2,46,0],21:[2,46,0],22:[2,46,0],23:[2,
46,0],24:[2,46,0],25:[2,46,0],26:[2,46,0],27:[2,46,0],29:[2,46,0]},18:{8:[2,45,0],9:[2,45,0],10:[2,45,0],11:[2,45,0],12:[2,45,0],13:[2,45,0],14:[2,45,0],15:[2,45,0],16:[2,45,0],17:[2,45,0],18:[2,45,0],19:[2,45,0],20:[2,45,0],21:[2,45,0],22:[2,45,0],23:[2,45,0],24:[2,45,0],25:[2,45,0],26:[2,45,0],27:[2,45,0],29:[2,45,0]},19:{8:[1,0,48]},20:{8:[2,47,0],9:[1,0,14],11:[2,47,0],12:[2,47,0],13:[2,47,0],14:[2,47,0],15:[2,47,0],16:[2,47,0],17:[2,47,0],18:[2,47,0],19:[2,47,0],20:[2,47,0],21:[2,47,0],22:[2,
47,0],23:[2,47,0],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,37]},21:{8:[1,0,49]},22:{8:[2,22,0],9:[2,22,0],10:[2,22,0],11:[1,0,50],24:[2,22,0],25:[2,22,0],26:[2,22,0],27:[2,22,0],29:[2,22,0]},23:{8:[2,23,0],9:[2,23,0],10:[2,23,0],11:[2,23,0],12:[1,0,51],24:[2,23,0],25:[2,23,0],26:[2,23,0],27:[2,23,0],29:[2,23,0]},24:{8:[2,25,0],9:[2,25,0],10:[2,25,0],11:[2,25,0],12:[2,25,0],13:[1,0,52],14:[1,0,53],24:[2,25,0],25:[2,25,0],26:[2,25,0],27:[2,25,0],29:[2,25,0]},25:{8:[2,27,0],9:[2,27,0],
10:[2,27,0],11:[2,27,0],12:[2,27,0],13:[2,27,0],14:[2,27,0],15:[1,0,54],16:[1,0,55],17:[1,0,56],18:[1,0,57],24:[2,27,0],25:[2,27,0],26:[2,27,0],27:[2,27,0],29:[2,27,0]},26:{8:[2,30,0],9:[2,30,0],10:[2,30,0],11:[2,30,0],12:[2,30,0],13:[2,30,0],14:[2,30,0],15:[2,30,0],16:[2,30,0],17:[2,30,0],18:[2,30,0],19:[1,0,58],20:[1,0,59],24:[2,30,0],25:[2,30,0],26:[2,30,0],27:[2,30,0],29:[2,30,0]},27:{8:[2,35,0],9:[2,35,0],10:[2,35,0],11:[2,35,0],12:[2,35,0],13:[2,35,0],14:[2,35,0],15:[2,35,0],16:[2,35,0],17:[2,
35,0],18:[2,35,0],19:[2,35,0],20:[2,35,0],21:[1,0,60],22:[1,0,61],23:[1,0,62],24:[2,35,0],25:[2,35,0],26:[2,35,0],27:[2,35,0],29:[2,35,0]},28:{8:[2,38,0],9:[2,38,0],10:[2,38,0],11:[2,38,0],12:[2,38,0],13:[2,38,0],14:[2,38,0],15:[2,38,0],16:[2,38,0],17:[2,38,0],18:[2,38,0],19:[2,38,0],20:[2,38,0],21:[2,38,0],22:[2,38,0],23:[2,38,0],24:[2,38,0],25:[2,38,0],26:[2,38,0],27:[2,38,0],29:[2,38,0]},29:{8:[2,43,0],9:[2,43,0],10:[2,43,0],11:[2,43,0],12:[2,43,0],13:[2,43,0],14:[2,43,0],15:[2,43,0],16:[2,43,
0],17:[2,43,0],18:[2,43,0],19:[2,43,0],20:[2,43,0],21:[2,43,0],22:[2,43,0],23:[2,43,0],24:[2,43,0],25:[2,43,0],26:[2,43,0],27:[2,43,0],29:[2,43,0]},30:{8:[1,0,63]},31:{8:[1,0,64]},32:{8:[1,0,65]},33:{2:[1,0,1],3:[1,0,2],6:[1,0,3],7:[1,0,4]},34:{1:[2,4,0],2:[2,4,0],3:[2,4,0],4:[2,4,0],5:[2,4,0],6:[2,4,0],7:[2,4,0]},35:{4:[1,0,67]},36:{2:[2,8,0],3:[2,8,0],6:[2,8,0],7:[2,8,0]},37:{8:[2,56,0],9:[2,56,0],11:[2,56,0],12:[2,56,0],13:[2,56,0],14:[2,56,0],15:[2,56,0],16:[2,56,0],17:[2,56,0],18:[2,56,0],19:[2,
56,0],20:[2,56,0],21:[2,56,0],22:[2,56,0],23:[2,56,0],24:[2,56,0],25:[2,56,0],26:[2,56,0],27:[2,56,0],28:[1,0,69],29:[2,56,0],30:[2,56,0]},38:{8:[2,47,0],9:[2,47,0],10:[2,47,0],11:[2,47,0],12:[2,47,0],13:[2,47,0],14:[2,47,0],15:[2,47,0],16:[2,47,0],17:[2,47,0],18:[2,47,0],19:[2,47,0],20:[2,47,0],21:[2,47,0],22:[2,47,0],23:[2,47,0],24:[2,47,0],25:[2,47,0],26:[2,47,0],27:[2,47,0],29:[2,47,0]},39:{8:[2,21,0],9:[2,21,0],24:[2,21,0],25:[2,21,0],26:[2,21,0],27:[2,21,0],29:[2,21,0]},40:{8:[2,16,0],9:[1,
0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,37]},41:{8:[2,17,0]},42:{8:[2,20,0],9:[2,20,0],24:[2,20,0],25:[2,20,0],26:[2,20,0],27:[2,20,0],29:[2,20,0]},43:{8:[2,49,0],29:[1,0,72]},44:{8:[2,51,0],29:[2,51,0]},45:{27:[1,0,74],29:[1,0,75]},46:{10:[1,0,76]},47:{8:[2,42,0],9:[2,42,0],10:[2,42,0],11:[2,42,0],12:[2,42,0],13:[2,42,0],14:[2,42,0],15:[2,42,0],16:[2,42,0],17:[2,42,0],18:[2,42,0],19:[2,42,0],20:[2,42,0],21:[2,42,0],22:[2,42,0],23:[2,42,0],24:[2,42,0],25:[2,42,0],26:[2,42,0],
27:[2,42,0],29:[2,42,0]},48:{1:[2,11,0],2:[2,11,0],3:[2,11,0],4:[2,11,0],5:[2,11,0],6:[2,11,0],7:[2,11,0]},49:{1:[2,13,0],2:[2,13,0],3:[2,13,0],4:[2,13,0],5:[2,13,0],6:[2,13,0],7:[2,13,0]},50:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},51:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},52:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},53:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},54:{9:[1,
0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},55:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},56:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},57:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},58:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},59:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},60:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,
0,18],29:[1,0,10]},61:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},62:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},63:{1:[2,10,0],2:[2,10,0],3:[2,10,0],4:[2,10,0],5:[2,10,0],6:[2,10,0],7:[2,10,0]},64:{1:[2,12,0],2:[2,12,0],3:[2,12,0],4:[2,12,0],5:[2,12,0],6:[2,12,0],7:[2,12,0]},65:{2:[2,14,0],3:[2,14,0],6:[2,14,0],7:[2,14,0]},66:{1:[2,1,0],2:[1,0,1],3:[1,0,2],4:[2,1,0],6:[1,0,3],7:[1,0,4]},67:{29:[1,0,10]},68:{1:[2,5,0],2:[2,5,0],3:[2,5,0],4:[2,
5,0],5:[2,5,0],6:[2,5,0],7:[2,5,0]},69:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},70:{8:[2,15,0]},71:{8:[2,19,0],9:[2,19,0],24:[2,19,0],25:[2,19,0],26:[2,19,0],27:[2,19,0],29:[2,19,0]},72:{28:[1,0,69]},73:{8:[2,50,0],29:[2,50,0]},74:{8:[2,55,0],9:[2,55,0],10:[2,55,0],11:[2,55,0],12:[2,55,0],13:[2,55,0],14:[2,55,0],15:[2,55,0],16:[2,55,0],17:[2,55,0],18:[2,55,0],19:[2,55,0],20:[2,55,0],21:[2,55,0],22:[2,55,0],23:[2,55,0],24:[2,55,0],25:[2,55,0],26:[2,55,0],27:[2,55,0],
29:[2,55,0],30:[2,55,0]},75:{8:[2,54,0],9:[2,54,0],10:[2,54,0],11:[2,54,0],12:[2,54,0],13:[2,54,0],14:[2,54,0],15:[2,54,0],16:[2,54,0],17:[2,54,0],18:[2,54,0],19:[2,54,0],20:[2,54,0],21:[2,54,0],22:[2,54,0],23:[2,54,0],24:[2,54,0],25:[2,54,0],26:[2,54,0],27:[2,54,0],29:[2,54,0],30:[2,54,0]},76:{8:[2,48,0],9:[2,48,0],10:[2,48,0],11:[2,48,0],12:[2,48,0],13:[2,48,0],14:[2,48,0],15:[2,48,0],16:[2,48,0],17:[2,48,0],18:[2,48,0],19:[2,48,0],20:[2,48,0],21:[2,48,0],22:[2,48,0],23:[2,48,0],24:[2,48,0],25:[2,
48,0],26:[2,48,0],27:[2,48,0],29:[2,48,0]},77:{8:[2,24,0],9:[2,24,0],10:[2,24,0],11:[2,24,0],12:[1,0,51],24:[2,24,0],25:[2,24,0],26:[2,24,0],27:[2,24,0],29:[2,24,0]},78:{8:[2,26,0],9:[2,26,0],10:[2,26,0],11:[2,26,0],12:[2,26,0],13:[1,0,52],14:[1,0,53],24:[2,26,0],25:[2,26,0],26:[2,26,0],27:[2,26,0],29:[2,26,0]},79:{8:[2,28,0],9:[2,28,0],10:[2,28,0],11:[2,28,0],12:[2,28,0],13:[2,28,0],14:[2,28,0],15:[1,0,54],16:[1,0,55],17:[1,0,56],18:[1,0,57],24:[2,28,0],25:[2,28,0],26:[2,28,0],27:[2,28,0],29:[2,
28,0]},80:{8:[2,29,0],9:[2,29,0],10:[2,29,0],11:[2,29,0],12:[2,29,0],13:[2,29,0],14:[2,29,0],15:[1,0,54],16:[1,0,55],17:[1,0,56],18:[1,0,57],24:[2,29,0],25:[2,29,0],26:[2,29,0],27:[2,29,0],29:[2,29,0]},81:{8:[2,32,0],9:[2,32,0],10:[2,32,0],11:[2,32,0],12:[2,32,0],13:[2,32,0],14:[2,32,0],15:[2,32,0],16:[2,32,0],17:[2,32,0],18:[2,32,0],19:[1,0,58],20:[1,0,59],24:[2,32,0],25:[2,32,0],26:[2,32,0],27:[2,32,0],29:[2,32,0]},82:{8:[2,34,0],9:[2,34,0],10:[2,34,0],11:[2,34,0],12:[2,34,0],13:[2,34,0],14:[2,
34,0],15:[2,34,0],16:[2,34,0],17:[2,34,0],18:[2,34,0],19:[1,0,58],20:[1,0,59],24:[2,34,0],25:[2,34,0],26:[2,34,0],27:[2,34,0],29:[2,34,0]},83:{8:[2,31,0],9:[2,31,0],10:[2,31,0],11:[2,31,0],12:[2,31,0],13:[2,31,0],14:[2,31,0],15:[2,31,0],16:[2,31,0],17:[2,31,0],18:[2,31,0],19:[1,0,58],20:[1,0,59],24:[2,31,0],25:[2,31,0],26:[2,31,0],27:[2,31,0],29:[2,31,0]},84:{8:[2,33,0],9:[2,33,0],10:[2,33,0],11:[2,33,0],12:[2,33,0],13:[2,33,0],14:[2,33,0],15:[2,33,0],16:[2,33,0],17:[2,33,0],18:[2,33,0],19:[1,0,58],
20:[1,0,59],24:[2,33,0],25:[2,33,0],26:[2,33,0],27:[2,33,0],29:[2,33,0]},85:{8:[2,36,0],9:[2,36,0],10:[2,36,0],11:[2,36,0],12:[2,36,0],13:[2,36,0],14:[2,36,0],15:[2,36,0],16:[2,36,0],17:[2,36,0],18:[2,36,0],19:[2,36,0],20:[2,36,0],21:[1,0,60],22:[1,0,61],23:[1,0,62],24:[2,36,0],25:[2,36,0],26:[2,36,0],27:[2,36,0],29:[2,36,0]},86:{8:[2,37,0],9:[2,37,0],10:[2,37,0],11:[2,37,0],12:[2,37,0],13:[2,37,0],14:[2,37,0],15:[2,37,0],16:[2,37,0],17:[2,37,0],18:[2,37,0],19:[2,37,0],20:[2,37,0],21:[1,0,60],22:[1,
0,61],23:[1,0,62],24:[2,37,0],25:[2,37,0],26:[2,37,0],27:[2,37,0],29:[2,37,0]},87:{8:[2,39,0],9:[2,39,0],10:[2,39,0],11:[2,39,0],12:[2,39,0],13:[2,39,0],14:[2,39,0],15:[2,39,0],16:[2,39,0],17:[2,39,0],18:[2,39,0],19:[2,39,0],20:[2,39,0],21:[2,39,0],22:[2,39,0],23:[2,39,0],24:[2,39,0],25:[2,39,0],26:[2,39,0],27:[2,39,0],29:[2,39,0]},88:{8:[2,40,0],9:[2,40,0],10:[2,40,0],11:[2,40,0],12:[2,40,0],13:[2,40,0],14:[2,40,0],15:[2,40,0],16:[2,40,0],17:[2,40,0],18:[2,40,0],19:[2,40,0],20:[2,40,0],21:[2,40,
0],22:[2,40,0],23:[2,40,0],24:[2,40,0],25:[2,40,0],26:[2,40,0],27:[2,40,0],29:[2,40,0]},89:{8:[2,41,0],9:[2,41,0],10:[2,41,0],11:[2,41,0],12:[2,41,0],13:[2,41,0],14:[2,41,0],15:[2,41,0],16:[2,41,0],17:[2,41,0],18:[2,41,0],19:[2,41,0],20:[2,41,0],21:[2,41,0],22:[2,41,0],23:[2,41,0],24:[2,41,0],25:[2,41,0],26:[2,41,0],27:[2,41,0],29:[2,41,0]},90:{8:[1,0,92]},91:{8:[2,52,0],29:[2,52,0]},92:{1:[2,9,0],2:[2,9,0],3:[2,9,0],4:[2,9,0],5:[2,9,0],6:[2,9,0],7:[2,9,0]}}};k.parse=function(b){var e=this,f=e.lexer,
g,k,m=e.table,s=m.gotos,m=m.action,t=e.productions,n=[null],j=[0];for(f.resetInput(b);;){b=j[j.length-1];g||(g=f.lex());if(!g)return!1;k=m[b]&&m[b][g];if(!k){var r=[];m[b]&&a.each(m[b],function(a,b){r.push(e.lexer.mapReverseSymbol(b))});f.showDebugInfo();r.join(", ");return!1}switch(k[0]){case 1:j.push(g);n.push(f.text);j.push(k[2]);g=null;break;case 2:var i=t[k[1]],b=i.symbol||i[0];k=i.action||i[2];var o=(i.rhs||i[1]).length,d,i=n[n.length-o];e.$$=i;for(i=0;i<o;i++)e["$"+(o-i)]=n[n.length-1-i];k&&
(d=k.call(e));i=void 0!==d?d:e.$$;o&&(j=j.slice(0,-2*o),n=n.slice(0,-1*o));j.push(b);n.push(i);j.push(s[j[j.length-2]][j[j.length-1]]);break;case 0:return i}}};return k});

KISSY.add("cute/dialog/language",function(e,u){"use strict";var n=u.getLanguage(),t=null;return t="en"==n?{CONFIRM:"Confirm"}:{CONFIRM:"确定"}},{requires:["cute/util/"]});

/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:01
*/
KISSY.add("dd/base",function(g,l,h,f){g={Draggable:h,DDM:l,DraggableDelegate:f};return KISSY.DD=g},{requires:["./base/ddm","./base/draggable","./base/draggable-delegate"]});
KISSY.add("dd/base/ddm",function(g,l,h,f,t){function n(){n.superclass.constructor.apply(this,arguments)}function o(a){a.preventDefault();C.call(this,a)}function s(a,u,i){var d=i.get("mode"),c=a.get("validDrops"),e=0,f=0,h=j(i.get("node")),k=p(h);g.each(c,function(a){var c;if(c=a.getNodeFromTarget(u,i.get("dragNode")[0],i.get("node")[0]))if("point"==d)v(j(c),i.mousePos)&&(c=p(j(c)),e?c<f&&(e=a,f=c):(e=a,f=c));else if("intersect"==d)c=p(b(h,j(c))),c>f&&(f=c,e=a);else if("strict"==d&&(c=p(b(h,j(c))),
c==k))return e=a,!1});if((c=a.get("activeDrop"))&&c!=e)c._handleOut(u),i._handleOut(u);a.setInternal("activeDrop",e);e&&(c!=e?e._handleEnter(u):e._handleOver(u))}function q(a){a._shim=(new f('<div style="background-color:red;position:'+(w?"absolute":"fixed")+";left:0;width:100%;height:100%;top:0;cursor:"+m.get("dragCursor")+";z-index:"+D+';"></div>')).prependTo(r.body||r.documentElement).css("opacity",0);q=c;if(w)h.on(e,"resize scroll",y,a);c(a)}function c(a){var b=a.get("activeDrag").get("activeHandler"),
c="auto";b&&(c=b.css("cursor"));"auto"==c&&(c=a.get("dragCursor"));a._shim.css({cursor:c,display:"block"});w&&y.call(a)}function x(a){var b=a.get("drops");a.setInternal("validDrops",[]);g.each(b,function(a){a._active()})}function k(a){var b=a.get("drops");a.setInternal("validDrops",[]);g.each(b,function(a){a._deActive()})}function j(a){var b=a.offset();return{left:b.left,right:b.left+(a.__dd_cached_width||a.outerWidth()),top:b.top,bottom:b.top+(a.__dd_cached_height||a.outerHeight())}}function v(a,
b){return a.left<=b.left&&a.right>=b.left&&a.top<=b.top&&a.bottom>=b.top}function p(a){return a.top>=a.bottom||a.left>=a.right?0:(a.right-a.left)*(a.bottom-a.top)}function b(a,b){var c=Math.max(a.top,b.top),i=Math.min(a.right,b.right),d=Math.min(a.bottom,b.bottom);return{left:Math.max(a.left,b.left),right:i,top:c,bottom:d}}function i(a){a&&(a.__dd_cached_width=a.outerWidth(),a.__dd_cached_height=a.outerHeight())}var d=g.UA,e=g.Env.host,r=e.document,w=6===d.ie,D=999999,z=h.Gesture,A=z.move,B=z.end;
n.ATTRS={dragCursor:{value:"move"},clickPixelThresh:{value:3},bufferTime:{value:1},activeDrag:{},activeDrop:{},drops:{value:[]},validDrops:{value:[]}};var C=g.throttle(function(a){var b;if(a=m._normalEvent(a))if(a.preventDefault(),b=this.__activeToDrag)b._move(a);else if(b=this.get("activeDrag"))b._move(a),s(this,a,b)},30),y=g.throttle(function(){var a;(a=this.get("activeDrag"))&&a.get("shim")&&this._shim.css({width:l.docWidth(),height:l.docHeight()})},30);g.extend(n,t,{__activeToDrag:0,_regDrop:function(a){this.get("drops").push(a)},
_unRegDrop:function(a){a=g.indexOf(a,this.get("drops"));-1!=a&&this.get("drops").splice(a,1)},_regToDrag:function(a){this.__activeToDrag=a;h.on(r,B,this._end,this);h.on(r,A,o,this);6===d.ie&&r.body.setCapture()},_start:function(){this.get("drops");var a=this.__activeToDrag;this.setInternal("activeDrag",a);this.__activeToDrag=0;a.get("shim")&&q(this);i(a.get("node"));x(this)},_addValidDrop:function(a){this.get("validDrops").push(a)},_end:function(){var a=this.get("activeDrag"),b=this.get("activeDrop");
h.remove(r,A,o,this);h.remove(r,B,this._end,this);6===d.ie&&r.body.releaseCapture();this.__activeToDrag&&(this.__activeToDrag._end(),this.__activeToDrag=0);this._shim&&this._shim.hide();a&&(a._end(),k(this),b&&b._end(),this.setInternal("activeDrag",null),this.setInternal("activeDrop",null))}});var m=new n;m.inRegion=v;m.region=j;m.area=p;m.cacheWH=i;m.PREFIX_CLS="ks-dd-";m._normalEvent=function(a){var b=a.touches;if(b){if(1!=b.length)return;b=b[0];a.target=a.target||b.target;a.currentTarget=a.currentTarget||
b.currentTarget;a.which=1;a.pageX=b.pageX;a.pageY=b.pageY}return a};return m},{requires:["dom","event","node","base"]});
KISSY.add("dd/base/draggable-delegate",function(g,l,h,f,t,n){var o=l.PREFIX_CLS,s=n.Gesture.start,q=function(c){if(c=l._normalEvent(c)){var f,g;if(this._checkDragStartValid(c)){f=this.get("handlers");var h=new t(c.target);(f=f.length?this._getHandler(h):h)&&(g=this._getNode(f));g&&(this.setInternal("activeHandler",f),this.setInternal("node",g),this.setInternal("dragNode",g),this._prepare(c))}}};return h.extend({_onSetNode:function(){},_onSetContainer:function(){this.bindDragEvent()},_onSetDisabledChange:function(c){this.get("container")[c?
"addClass":"removeClass"](o+"-disabled")},bindDragEvent:function(){this.get("container").on(s,q,this).on("dragstart",this._fixDragStart)},detachDragEvent:function(){this.get("container").detach(s,q,this).detach("dragstart",this._fixDragStart)},_getHandler:function(c){for(var h=void 0,k=this.get("container"),j=this.get("handlers");c&&c[0]!==k[0];){g.each(j,function(g){if(f.test(c[0],g))return h=c,!1});if(h)break;c=c.parent()}return h},_getNode:function(c){return c.closest(this.get("selector"),this.get("container"))}},
{ATTRS:{container:{setter:function(c){return t.one(c)}},selector:{},handlers:{value:[],getter:0}}})},{requires:["./ddm","./draggable","dom","node","event"]});
KISSY.add("dd/base/draggable",function(g,l,h,f,t){function n(){return!1}var o=l.all,s=g.each,q=t.Gesture.start,c=g.UA.ie,x=g.Features,k=f.PREFIX_CLS,j=g.Env.host.document,h=h.extend({initializer:function(){this.addTarget(f)},_onSetNode:function(b){this.setInternal("dragNode",b);this.bindDragEvent()},bindDragEvent:function(){this.get("node").on(q,p,this).on("dragstart",this._fixDragStart)},detachDragEvent:function(){this.get("node").detach(q,p,this).detach("dragstart",this._fixDragStart)},_bufferTimer:null,
_onSetDisabledChange:function(b){this.get("dragNode")[b?"addClass":"removeClass"](k+"-disabled")},_fixDragStart:function(b){b.preventDefault()},_checkHandler:function(b){var c=this,d=c.get("handlers"),e=0;s(d,function(d){if(d.contains(b)||d[0]==b)return e=1,c.setInternal("activeHandler",d),!1});return e},_checkDragStartValid:function(b){return this.get("primaryButtonOnly")&&1!=b.which||this.get("disabled")?0:1},_prepare:function(b){if(b){var i=this;o(b.target);c&&(v=j.body.onselectstart,j.body.onselectstart=
n);i.get("halt")&&b.stopPropagation();x.isTouchSupported()||b.preventDefault();var d=i.get("node"),e=b.pageX,b=b.pageY,d=d.offset();i.setInternal("startMousePos",i.mousePos={left:e,top:b});i.setInternal("startNodePos",d);i.setInternal("deltaPos",{left:e-d.left,top:b-d.top});f._regToDrag(i);if(e=i.get("bufferTime"))i._bufferTimer=setTimeout(function(){i._start()},1E3*e)}},_clearBufferTimer:function(){this._bufferTimer&&(clearTimeout(this._bufferTimer),this._bufferTimer=0)},_move:function(b){var c;
c=b.pageX;b=b.pageY;if(this.get("dragging")){var d=this.get("deltaPos"),e=c-d.left,d=b-d.top;this.mousePos={left:c,top:b};c={left:e,top:d,pageX:c,pageY:b,drag:this};this.setInternal("actualPos",{left:e,top:d});this.fire("dragalign",c);b=1;!1===this.fire("drag",c)&&(b=0);b&&this.get("move")&&this.get("node").offset(this.get("actualPos"))}else e=this.get("startMousePos"),d=this.get("clickPixelThresh"),(Math.abs(c-e.left)>=d||Math.abs(b-e.top)>=d)&&this._start()},stopDrag:function(){f._end()},_end:function(){var b;
this._clearBufferTimer();c&&(j.body.onselectstart=v);this.get("dragging")&&(this.get("node").removeClass(k+"drag-over"),(b=f.get("activeDrop"))?this.fire("dragdrophit",{drag:this,drop:b}):this.fire("dragdropmiss",{drag:this}),this.setInternal("dragging",0),this.fire("dragend",{drag:this}))},_handleOut:function(){this.get("node").removeClass(k+"drag-over");this.fire("dragexit",{drag:this,drop:f.get("activeDrop")})},_handleEnter:function(b){this.get("node").addClass(k+"drag-over");this.fire("dragenter",
b)},_handleOver:function(b){this.fire("dragover",b)},_start:function(){this._clearBufferTimer();this.setInternal("dragging",1);f._start();this.fire("dragstart",{drag:this})},destructor:function(){this.detachDragEvent();this.detach()}},{ATTRS:{node:{setter:function(b){if(!(b instanceof l))return o(b)}},clickPixelThresh:{valueFn:function(){return f.get("clickPixelThresh")}},bufferTime:{valueFn:function(){return f.get("bufferTime")}},dragNode:{},shim:{value:!0},handlers:{value:[],getter:function(b){var c=
this;b.length||(b[0]=c.get("node"));s(b,function(d,e){g.isFunction(d)&&(d=d.call(c));"string"==typeof d&&(d=c.get("node").one(d));d.nodeType&&(d=o(d));b[e]=d});c.setInternal("handlers",b);return b}},activeHandler:{},dragging:{value:!1,setter:function(b){this.get("dragNode")[b?"addClass":"removeClass"](k+"dragging")}},mode:{value:"point"},disabled:{value:!1},move:{value:!1},primaryButtonOnly:{value:!0},halt:{value:!0},groups:{value:{}},startMousePos:{},startNodePos:{},deltaPos:{},actualPos:{}}});h.DropMode=
{POINT:"point",INTERSECT:"intersect",STRICT:"strict"};var v,p=function(b){if(b=f._normalEvent(b)){var c=b.target;this._checkDragStartValid(b)&&this._checkHandler(c)&&this._prepare(b)}};return h},{requires:["node","rich-base","./ddm","event"]});
/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:01
*/
KISSY.add("dd/droppable/base",function(j,g,e,h){var d=h.DDM,f=d.PREFIX_CLS;return e.extend({initializer:function(){this.addTarget(d);d._regDrop(this)},getNodeFromTarget:function(a,c,b){var a=this.get("node"),k=a[0];return k==c||k==b?null:a},_active:function(){var a=d.get("activeDrag"),c=this.get("node"),b=this.get("groups"),a=a.get("groups");a:if(!0===b)b=1;else{for(var k in b)if(a[k]){b=1;break a}b=0}b?(d._addValidDrop(this),c&&(c.addClass(f+"drop-active-valid"),d.cacheWH(c))):c&&c.addClass(f+"drop-active-invalid")},
_deActive:function(){var a=this.get("node");a&&a.removeClass(f+"drop-active-valid").removeClass(f+"drop-active-invalid")},__getCustomEvt:function(a){return j.mix({drag:d.get("activeDrag"),drop:this},a)},_handleOut:function(){var a=this.__getCustomEvt();this.get("node").removeClass(f+"drop-over");this.fire("dropexit",a)},_handleEnter:function(a){a=this.__getCustomEvt(a);a.drag._handleEnter(a);this.get("node").addClass(f+"drop-over");this.fire("dropenter",a)},_handleOver:function(a){a=this.__getCustomEvt(a);
a.drag._handleOver(a);this.fire("dropover",a)},_end:function(){var a=this.__getCustomEvt();this.get("node").removeClass(f+"drop-over");this.fire("drophit",a)},destructor:function(){d._unRegDrop(this)}},{ATTRS:{node:{setter:function(a){if(a)return g.one(a)}},groups:{value:!0}}})},{requires:["node","rich-base","dd/base"]});
KISSY.add("dd/droppable/delegate",function(j,g,e,h,d){function f(){var b=this.get("container"),c=[],d=this.get("selector");b.all(d).each(function(b){a.cacheWH(b);c.push(b)});this.__allNodes=c}var a=g.DDM,c=e.extend({initializer:function(){a.on("dragstart",f,this)},getNodeFromTarget:function(b,c,d){var f={left:b.pageX,top:b.pageY},b=this.__allNodes,e=0,g=Number.MAX_VALUE;b&&j.each(b,function(b){var i=b[0];i===d||i===c||(i=a.region(b),a.inRegion(i,f)&&(i=a.area(i),i<g&&(g=i,e=b)))});e&&(this.setInternal("lastNode",
this.get("node")),this.setInternal("node",e));return e},_handleOut:function(){c.superclass._handleOut.apply(this,arguments);this.setInternal("node",0);this.setInternal("lastNode",0)},_handleOver:function(a){var d=this.get("node"),e=c.superclass._handleOut,f=c.superclass._handleOver,g=c.superclass._handleEnter,h=this.get("lastNode");h[0]!==d[0]?(this.setInternal("node",h),e.apply(this,arguments),this.setInternal("node",d),g.call(this,a)):f.call(this,a)},_end:function(){c.superclass._end.apply(this,
arguments);this.setInternal("node",0)}},{ATTRS:{lastNode:{},selector:{},container:{setter:function(a){return d.one(a)}}}});return c},{requires:["dd/base","./base","dom","node"]});KISSY.add("dd/droppable",function(j,g,e,h){e.Delegate=h;g.Droppable=e;g.DroppableDelegate=h;return e},{requires:["dd/base","./droppable/base","./droppable/delegate"]});
/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:01
*/
KISSY.add("cookie",function(c){function f(b){return"string"==typeof b&&""!==b}var h=c.Env.host.document,j=encodeURIComponent,g=c.urlDecode;return c.Cookie={get:function(b){var a,d;if(f(b)&&(d=(""+h.cookie).match(RegExp("(?:^| )"+b+"(?:(?:=([^;]*))|;|$)"))))a=d[1]?g(d[1]):"";return a},set:function(b,a,d,i,c,g){var a=""+j(a),e=d;"number"===typeof e&&(e=new Date,e.setTime(e.getTime()+864E5*d));e instanceof Date&&(a+="; expires="+e.toUTCString());f(i)&&(a+="; domain="+i);f(c)&&(a+="; path="+c);g&&(a+=
"; secure");h.cookie=b+"="+a},remove:function(b,a,d,c){this.set(b,"",-1,a,d,c)}}});

KISSY.add("cute/grid/index",function(e,t,a,r,i,n,l,o,c,s,u){"use strict";function g(t){var a=this;t=t||{},l.alias(t,"el","target"),l.alias(t,"hasPagination","hasPage"),l.alias(t,"ajaxConfig","ioConfig"),l.alias(t,"data","params");var r=t.events=t.events||{},i={};e.each(r,function(t,a){e.isFunction(t)&&(i[a]=t)}),e.each(i,function(e,t){delete r[t]});var n=t.linkers=t.linkers||{};e.each(n,function(t,i){r[i]={click:function(r){var i=d(r.target),n=d(r.currentTarget),l=i.parent(".cute-grid-td"),o=l.attr("_name"),c=l.parent(".cute-grid-tr"),s=c.attr("_rowid"),u=a.getRowData(s),g=[],v=a.gridCollection;e.each(v.get("models"),function(e){g.push(a.getRowData(e))}),t.call(a,u[o],u,g,i,n)}}}),g.superclass.constructor.apply(this,arguments);var c=a.get("el");a.set("target",c),e.each(i,function(e,t){a.on(t,e)});var s=a.get("showScrollX"),u=a.get("cols"),v=1,h=[];e.each(u,function(e){if(e.newRow&&v++,v>1)delete e.title,delete e.width;else if(e.title=e.title||" ",e.hidden||h.push(e),s){var t=e.width;t=parseFloat(t),isNaN(t)&&(t=100),e.width=t}});var f=!0;e.each(h,function(e){return e.width?void 0:(f=!1,!1)}),a.set("rowSpan",v),a.set("initConfig",e.clone(t));var p={},C=t.cols;e.each(C,function(e){p[e.name]=e}),a.set("colsMap",e.clone(p)),s?(c.addClass("scroll-x"),a.on("render",function(){a.initScrollX(),a.resetScrollXStatus()}),a.on("topFix",function(){var e=c.all(".grid-head"),t=c.all(".grid-body");e.scrollLeft(t.scrollLeft())})):f&&h.length&&delete h[h.length-1].width;var m=a.get("autoload"),k=a.get("data"),w=a.get("group"),S=null,b=null,D=null;if(w&&(S=w.gridAttr||{},b=w.formAttr||{},D=b.formEl,a.gridAttr=S),m&&D){var M=l.getFormData(D);e.mix(k,M),k.current=1}a.initLoading(),a.init({data:k},!0),a.get("enableTip")&&new o({target:[c,".tip-dom"]}),a.fire("create")}var d=t.all,v=["rows","data","datas"],h=function(t){var a=null;return e.each(v,function(r){var i=t[r];return i&&e.isArray(i)?(a=i,!1):void 0}),a||[]},f=function(t,a,r,i){if(a){var n=null;e.each(i,function(e){return e.name==a?(n=e,!1):void 0});var l=h(t),o=function(t){var r=t[a];if(r=e.isObject(r)?r.value:r,e.isString(r)&&"number"==n.type){var i=parseFloat(r);return isNaN(i)?0:i}return r};l.sort(function(e,t){var a=o(e),i=o(t),n=null;return n=i>a?1:a>i?-1:0,"desc"==r?n:-n})}};return e.extend(g,r,{getRows:h,getTotalWidth:function(){var t=this,a=0,r=t.get("showScrollX");if(r){var i=t.get("isSelect");i&&(a+=33);var n=t.get("hasOrderCol");n&&(a+=45);var l=t.get("cols"),o=1,c=[];e.each(l,function(e){return e.newRow&&o++,o>1?!1:void(e.hidden||c.push(e))}),e.each(c,function(e){a+=e.width})}return a},getModel:function(t,a){var r=this;if(a){var i=d(t),n=null;n=i.hasClass("cute-grid-tr")?i:i.parent(".cute-grid-tr"),t=n.attr("_rowid")}if(e.isString(t)||e.isNumber(t)){var l=r.gridCollection;t=l.getById(t)}return t},getRowData:function(e,t){var a=this;return e=a.getModel(e,t),e.getData()},getPageData:function(t,a,r){var i=this,n=i.get("hasPagination");n||(t=null,a=null,r=null);var l=null,o=i.get("localPage");if(o){var c=[],s=i.get("localPageData"),u=h(s),g=u.length;if(n)for(var d=a,f=a+r;f>d&&!(d>g-1);d++)c.push(u[d]);else for(var d=0,f=g;f>d;d++)c.push(u[d]);l=e.clone(s),e.each(v,function(e){delete l[e]}),l.rows=c,l.pagination=l.pagination||{},e.mix(l.pagination,{current:t,per:r})}return l||{}},load:function(e){var t=this;e=e||{},t.init({data:e})},reload:function(t){var a=this,r=a.get("data");e.mix(r,t),a.init({data:r})},abort:function(){var e=this,t=e.gridCollection;if(t){var a=t.get("io");a&&a.abort()}},init:function(t,a,r){var i=this;i.fire("beforeLoad");var n=i.get("localPage");if(!r&&n){var l=i.get("initConfig");i.set("localData",l.localData)}e.each(t,function(e,t){i.set(t,e)});var o=i.get("data"),c=null,g=null,d=null,v=i.get("hasPagination");if(v){c=o.current,null==c&&(c=i.gridsView&&i.gridsView.pv?i.gridsView.pv.p.get("current"):1);var p=i.get("pageSize");g=(c-1)*p,d=p,o.current=c,o.start=g,o.limit=d}var C=i.get("currentSort"),m=i.get("sortField"),k=i.get("sortDir");C||n||!m||(o.sortField=m,o.sortDir=k),i.abort();var w=i.get("autoload");(w||!a)&&i.showLoading(),i.gridCollection=new s({url:i.get("url"),parse:function(e){var t=i.get("parse");return t?t.call(i,e):h(e)},comparator:function(t){var a=i.get("currentSort"),r=i.get("sortField");if(a&&r){var n=t.get(r);if(n=e.isObject(n)?n.value:n,e.isString(n)){var l=i.get("cols"),o=null;if(e.each(l,function(e){return e.name==r?(o=e,!1):void 0}),"number"==o.type){var c=parseFloat(n);return isNaN(c)?0:c}}return n}},localData:i.get("localData"),localPageDataHandler:function(t){var a=i.get("localPage");if(!r&&a){var n=e.clone(t);n.pagination=n.pagination||{current:c,per:d},n.totalCount=n.pagination.dataLen=h(n).length;var l=i.get("sortField"),o=i.get("sortDir");f(n,l,o,i.get("cols")),i.set("localPageData",n);var s=i.getPageData(c,g,d);return i.set("localData",s),s}return t},sortDir:k,dataHandler:i.get("dataHandler")});var S=e.merge({success:function(t,a){if(!r){var n;n=t.pagination?t.pagination.dataLen:t.totalCount,null==n&&(n=h(t).length),i.oldTotalCount=n}var l=i.gridCollection,o=i.gridsView;if(o?(o.set("grids",l),o.set("data",t),o.set("current",c),o.set("status",a),e.each(["cols","isSelect","rowSpan","events","callback"],function(e){o.set(e,i.get(e))}),o.init()):(i.gridsView=new u({grid:i,el:i.get("el"),grids:l,data:t,current:c,status:a,cols:i.get("cols"),isSelect:i.get("isSelect"),rowSpan:i.get("rowSpan"),events:i.get("events"),callback:i.get("callback")}),i.gridsView.on("sort",function(e){i.sort({sortField:e.sortField,sortDir:e.sortDir})}),i.gridsView.on("page",function(t){var a=e.clone(i.get("data"))||{},r=t.current;a.current=r;var n=i.get("localPage");if(n){var l=i.get("pageSize"),o=(r-1)*l,c=l;i.set("localData",i.getPageData(r,o,c))}var s=i.get("pageHandler");if(s){var u=s.call(i,{grid:i,current:r,params:a});if(u===!1)return}i.init({data:a},!1,!0)})),e.isString(a)){var s=i.get("ioSuccess")||i.get("ioCallback");s&&s.apply(i,arguments)}i.fire("success",{results:arguments})},complete:function(t,a){if(i.hideLoading(),e.isString(a)){var r=i.get("ioComplete");r&&r.apply(i,arguments)}i.fire("complete",{results:arguments})},error:function(t,a){if(e.isString(a)){var r=i.get("ioError");r&&r.apply(i,arguments)}i.fire("error",{results:arguments})},data:i.get("data"),type:"post",cache:!1},i.get("ajaxConfig"));if(w||!a)i.gridCollection.load(S,{init:a});else{var b=i.get("localData");i.gridCollection.set("localData",{read:{rows:[],pagination:{current:1,dataLen:0}}}),i.gridCollection.load(S,{init:a}),i.gridCollection.set("localData",b)}},initLoading:function(){var e=this,t=e.get("el"),a=new c({target:t});e.set("loading",a)},initScrollX:function(){var e=this,t=e.get("target"),a=t.all(".grid-body"),r=a.data("scrollXinited");if(!r){var i=t.all(".grid-head");a.on("scroll",function(){i.scrollLeft(d(this).scrollLeft())}),a.data("scrollXinited",!0)}},resetScrollXStatus:function(){var e=this;if(e.get("showScrollX")){var t=e.get("target");t.all(".grid-head").scrollLeft(0),t.all(".grid-body").scrollLeft(0)}},showLoading:function(){var e=this,t=e.get("target");t.css({background:"none"});var a=e.hideLoadingTimer;a&&a.cancel();var r=e.get("loading");r.show(),r._timestamp=(new Date).getTime()},hideLoading:function(){var t=this,a=t.get("loading"),r=(new Date).getTime()-(a._timestamp||0);r>=100?a.hide():t.hideLoadingTimer=e.later(function(){a.hide()},100-r)},destroy:function(){var e=this,t=e.gridsView,a=e.get("mainCheckbox");a&&a.detach("change",t.changeMainCheckbox,t),e.gridCollection=null,e.gridsView=null;var r=e.listConfigHint;r&&r.destroy()},add:function(e){var t=this;t.gridCollection.add(e)},remove:function(t){var a=this,r=a.gridCollection;t||(t=a.getCheckedModels()),t=l.getArray(t);var i=a.get("modelKey"),n={};e.each(r.get("models"),function(e){n[e.get(i)]=e});var o=[];e.each(t,function(t){var a=null;a=e.isString(t)||e.isNumber(t)?n[t]:t,r.remove(a),o.push(a)}),a.fire("check",{checkedModels:a.getCheckedModels(),changeModels:[]}),a.fire("remove",{removedModels:o})},sort:function(t,a){var r=this,i=t.sortField,n=t.sortDir;r.set("sortField",i),r.set("sortDir",n);var l=r.gridCollection;l.set("sortDir",n);var o=r.gridsView;o.set("sortField",i),o.set("sortDir",n);var c=r.get("currentSort");if(c)l.sort(),l.fire("afterModelsChange"),a&&a(t);else{var s=r.get("localPage");if(s){var u=r.get("localPageData");f(u,i,n,r.get("cols")),r.set("localData",r.getPageData(1,0,r.get("pageSize"))),r.init({data:e.mix(r.get("data"),{current:1})},!1,!0)}else r.init({data:e.mix(r.get("data"),{current:1})})}},getChecked:function(t){var a=this,r=a.getCheckedModels(),i=[];return t?e.each(r,function(e){i.push(a.getRowData(e)[t])}):e.each(r,function(e){i.push(a.getRowData(e))}),i},getModels:function(){var e=this,t=e.gridCollection,a=t.get("models");return a},eachModels:function(t){var a=this,r=a.getModels();e.each(r,t)},setChecked:function(t,a,r){var i=this,n=[];a||Array.prototype.push.apply(n,i.clearChecked(!0)),t=l.getArray(t);var o=i.gridsView;e.each(t,function(e){var t=i.getModel(e);if(t){var a=t.isChecked();if(!a){var r=t.view.get("el");Array.prototype.push.apply(n,o.rowClick({target:r,currentTarget:r,silent:!0}))}}}),n=e.unique(n),r||i.fire("check",{checkedModels:i.getCheckedModels(),changeModels:n})},unChecked:function(t,a){var r=this;t=l.getArray(t);var i=[];e.each(t,function(e){var t=r.getModel(e);if(t){var a=t.isChecked();a&&(t.setChecked(!1),i.push(t))}}),a||r.fire("check",{checkedModels:r.getCheckedModels(),changeModels:i})},refreshFixed:function(){var e=this,t=e.topFixed;t&&(t.refreshPosition(),t.refreshTargetWidth());var a=e.bottomFixed;a&&(a.refreshPosition(),a.refreshTargetWidth())},refreshMainCheckbox:function(){var e=this,t=e.gridCollection,a=t.get("models"),r=e.gridsView,i=e.get("mainCheckboxCls"),n=r.toolbar.all("."+i),l=null;r.foot&&(l=r.foot.all("."+i));var o=e.get("mainCheckbox"),c=e.getCheckedModels(),s=c.length;s&&s==a.length?(n.prop("checked",!0),l&&l.prop("checked",!0),o&&o.prop("checked",!0)):(n.prop("checked",!1),l&&l.prop("checked",!1),o&&o.prop("checked",!1))},clearChecked:function(t){var a=this,r=a.getCheckedModels(),i=[];return e.each(r,function(e){e.setChecked(!1),i.push(e)}),t||a.fire("check",{checkedModels:a.getCheckedModels(),changeModels:i}),i},getCheckedModels:function(){var t=this,a=t.gridCollection,r=a.get("models");return e.filter(r,function(e){return e.isChecked()})}},{ATTRS:{autoload:{value:!0},localData:{value:null,setter:function(e){return{read:e}}},el:{value:null,setter:function(t){var a=d(t),r=a.attr("id");return r||a.attr("id",e.guid("grid_")),a}},url:{value:""},cols:{value:[]},isSelect:{value:!1},rowSpan:{value:1},callback:{value:e.noop},data:{value:{}},ajaxConfig:{value:{}},modelKey:{value:"id"},events:{value:{}},group:{value:{}},hasPagination:{value:!0},pageSize:{value:20},buttons:{setter:function(e){return d(e)}},zebra:{value:!0},pageHandler:{value:null},localPage:{value:!1},localPageData:{value:{}},initConfig:{value:{}},titleEllipsis:{value:!0},sortField:{value:""},sortDir:{value:"asc"},currentSort:{value:!0},hasOrderCol:{value:!0},hideToolbar:{value:!1},hideHeader:{value:!1},hidePageSize:{value:!0},hideTotalCount:{value:!1},hideConfigMenu:{value:!1},linkers:{value:{}},toggleSelect:{value:!0},enableTip:{value:!0},enableHeadTip:{value:!0},enableCellTip:{value:!0},loading:{value:null},dataHandler:{value:null},enableCheckRow:{value:!0},customLeft:{setter:function(e){return d(e)}},customRight:{setter:function(e){return d(e)}},customFoot:{setter:function(e){return d(e)}},hoverCls:{value:"hover"},checkedCls:{value:"checked"},noQueryMessage:{value:"请查询数据"},noDataMessage:{value:"没有数据"},showScrollX:{value:!1},rendered:{value:!1},mainCheckbox:{setter:function(e){return d(e)}},pageSizeTpl:{value:'每页<span class="grid-pageSize-number">{{pageSize}}</span>条数据'},totalCountTpl:{value:'共<span class="grid-totalCount-number">0</span>条数据'},rowCheckboxCls:{value:"grid-checkbox-sub"},mainCheckboxCls:{value:"grid-checkbox-main"},rowClickExcludeCls:{value:"grid-rowClick-exclude"},hasTopFixed:{value:!0},hasBottomFixed:{value:!0}}}),e.namespace("CUTE",!0).Grid=g,g},{requires:["node","sizzle","base","ajax","overlay","cute/util/","cute/tip/","cute/loading/","cute/grid/collection","cute/grid/gridsview","cute/util/statistic"]});KISSY.add("cute/tip/index",function(e,t,a,i,n,o){"use strict";function l(t){var a=this;e.isString(t)&&(t={target:t}),l.superclass.constructor.call(a,t);var i=a.get("events");e.each(i,function(e,t){a.on(t,e)}),a.init(),a.fire("create")}var s=a.all;return e.mix(l,{tipEl:null,contentEl:null,clipEl:null,mouseenterFn:null,mouseleaveFn:null,targetEl:null,initTipEvent:function(){{var e=this;e.tipEl}e.mouseenterFn=function(){var e=s(this);clearTimeout(e.data("timerId"))},e.mouseleaveFn=function(){var e=s(this);clearTimeout(e.data("timerId"));var t=setTimeout(function(){l.hide()},50);e.data("timerId",t)}},attachTipEvent:function(){var e=this,t=e.tipEl;t.on("mouseenter",e.mouseenterFn),t.on("mouseleave",e.mouseleaveFn)},detachTipEvent:function(){var e=this,t=e.tipEl;t.detach("mouseenter",e.mouseenterFn),t.detach("mouseleave",e.mouseleaveFn)},inited:!1,init:function(e,t){var a=this;if(!a.inited){var i=a.tipEl=s(['<div class="q-tip" style="',null==t?"":"z-index:"+t+";",'">','<div class="container">','<div class="content"></div>','<i class="zero-clipboard"></i>',"</div>","</div>"].join("")).appendTo(document.body);a.contentEl=i.all(".content");var n=a.clipEl=i.all(".zero-clipboard");n.html(a.createClip(e));var o=n[0],l=o.firstChild;l.onmouseup=function(){a.copySuccess(this)},l.onmouseenter=function(){a.tipEl.all(".copy-btn").addClass("hover")},l.onmouseleave=function(){a.tipEl.all(".copy-btn").removeClass("hover")},a.initTipEvent(),a.inited=!0}},createClipHtml:function(){var e=this,t=e.width,a=e.height,i=e.moviePath,n="",o="id="+e.id+"&width="+t+"&height="+a;if(navigator.userAgent.match(/MSIE/)){var l=location.href.match(/^https/i)?"https://":"http://";n+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+l+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+t+'" height="'+a+'" id="'+e.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+i+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+o+'"/><param name="wmode" value="transparent"/></object>'}else n+='<embed id="'+e.movieId+'" src="'+i+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+t+'" height="'+a+'" name="'+e.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+o+'" wmode="transparent" />';return n},createClip:function(t){var a=this,i=e.guid("clip_");return a.createClipHtml.call({id:i,movieId:"ZeroClipboardMovie_"+i,width:24,height:20,moviePath:t||"//g.alicdn.com/sd/cute3/0.1.16/swf/ZeroClipboard.swf"})},showMessage:function(t){var a=t.message||"",i=t.isHtml,n=t.type||"success",l=t.target,s=t.align,r=new o({content:['<div class="tip tip-',n,'" style="padding:5px 10px;min-height:0;">','<p style="margin:0;">',i?a:e.escapeHTML(a),"</p>","</div>"].join(""),elCls:"tip-overlay"});s?!s.node&&l&&(s.node=l):s=l?{node:l,points:["tc","bc"],offset:[0,0]}:{points:["cc","cc"],offset:[0,0]},r.set("align",s),r.show(),e.later(function(){r.set("effect",{effect:"fade",duration:.5}),r.on("hide",function(){r.destroy()}),r.hide()},1e3)},copySuccess:function(e){var t=this;t.showMessage({target:e,message:"复制成功！"}),l.hide()},hide:function(){var e=l.tipEl;e.css({left:-1e4,top:-1e4}),l.detachTipEvent(),l.targetEl=null}}),e.extend(l,n,{mouseenterFn:function(t){var a=s(t.currentTarget);l.targetEl=a;var i="true"==a.attr("_showtext"),n="true"==a.attr("_copy");if(i||n){var o=l.tipEl;clearTimeout(o.data("timerId"));var r=null;r=n?!0:"true"==a.attr("_canhover"),r?l.attachTipEvent():l.detachTipEvent();var c=a.attr("_textel"),u=null,m=null;c&&(c="true"==c?a.all(".template-text"):s(c)),c&&c.length?(u=c.html(),m=!0):(u=a.attr("_text"),u?m="true"==a.attr("_ishtml"):(u=a.text(),m=!1));var d=l.contentEl;d.empty().html(['<div class="content-text"',i&&n?"":' style="margin-right:0;"',">",i?m?u:e.escapeHTML(u):"","</div>",n?'<span class="copy-btn">复制</span>':""].join("")),o.css({width:"auto",left:-1e4,top:-1e4}),o.data("tipWidth",o.outerWidth()+1);var v=l.clipEl;if(n){v.css({bottom:0,right:0});var p=v[0],h=p.firstChild;if(h&&h.setText){var f=null,g=a.attr("_copyel");g&&(g="true"==g?a.all(".template-copy"):s(g)),f=g&&g.length?g.html():i?d.all(".content-text").text():a.attr("_text")||a.text(),h.setText(f||"")}}else v.css({bottom:1e4,right:1e4})}},mousemoveFn:function(e){var a=s(e.currentTarget),i="true"==a.attr("_showtext"),n="true"==a.attr("_copy");if(i||n){var o=l.contentEl;if(!i||n||o.all(".content-text").html()){var r=l.tipEl;clearTimeout(r.data("timerId"));var c=a.offset(),u=r.data("tipWidth"),m=e.pageX,d=0,v=s(document).scrollLeft(),p=t.viewportWidth(),h="true"==a.attr("_canhover");if(r.css({width:u}),n||h){m=m-u+20,m+u>v+p?d=v+p-(m+u):v>m&&(d=v-m),r.css({left:m+d,top:c.top-r.outerHeight()});var f=r.outerHeight(),g=c.top;if(f>g){var w=event.pageY,y=0,E=s(document).scrollTop(),b=t.viewportHeight();w=w-f+20,w+f>E+b?y=E+b-(w+f):E>w&&(y=E-w),r.css({top:w+y})}}else m+u>v+p&&(d=v+p-(m+u)),r.css({left:m+d,top:e.pageY+20})}}},mouseleaveFn:function(){var e=l.tipEl,t=setTimeout(function(){l.hide()},50);e.data("timerId",t)},init:function(){var t=this,a=t.get("target");if(e.isArray(a)){var i=a[0],n=a[1];i.delegate("mouseenter",n,t.mouseenterFn),i.delegate("mousemove",n,t.mousemoveFn),i.delegate("mouseleave",n,t.mouseleaveFn)}else a.on("mouseenter",t.mouseenterFn),a.on("mousemove",t.mousemoveFn),a.on("mouseleave",t.mouseleaveFn)},destroy:function(){var t=this,a=t.get("target");if(e.isArray(a)){var i=a[0],n=a[1];i.undelegate("mouseenter",n,t.mouseenterFn),i.undelegate("mousemove",n,t.mousemoveFn),i.undelegate("mouseleave",n,t.mouseleaveFn)}else a.detach("mouseenter",t.mouseenterFn),a.detach("mousemove",t.mousemoveFn),a.detach("mouseleave",t.mouseleaveFn);t.set("target",null)}},{ATTRS:{target:{setter:function(t){return e.isArray(t)?[s(t[0]),t[1]]:s(t)}},events:{value:{}}}}),e.ready(function(){var e,t,a=window.CUTE;a?(e=a.tip_swfUrl,t=a.tip_zIndex):(e=window.tip_swfUrl,t=window.tip_zIndex),l.init(e,t)}),l},{requires:["dom","node","sizzle","base","overlay","cute/util/","cute/util/statistic"]});KISSY.add("cute/mvc/collection",function(t,e,r,n,i){function o(t,e,r,n){var i=t.length;if(r){var o=r(e);for(i=0;i<t.length;i++){var a=r(t[i]);if("desc"==n){if(o>a)break}else if(a>o)break}}return i}function a(){a.superclass.constructor.apply(this,arguments)}return a.ATTRS={model:{value:r},models:{setter:function(t){var e=this.get("models");return this.remove(e,{silent:1}),this.add(t,{silent:1}),this.get("models")},value:[]},url:{value:""},comparator:{},sync:{value:function(){return t.require("cute/mvc/index").sync.apply(this,arguments)}},parse:{value:function(t){return t}},localData:{value:null}},t.extend(a,n,{sort:function(){var t=this.get("comparator");if(t){var e=this.get("sortDir");this.get("models").sort(function(r,n){var i=t(r),o=t(n),a=null;return a=o>i?1:i>o?-1:0,"desc"==e?a:-a})}},toJSON:function(){return t.map(this.get("models"),function(t){return t.toJSON()})},add:function(e,r){var n=this,i=!0;if(t.isArray(e)){var o=[].concat(e);t.each(o,function(t){var e=n._add(t,r);i=i&&e})}else i=n._add(e,r);return i},remove:function(e,r){var n=this;if(t.isArray(e)){var i=[].concat(e);t.each(i,function(t){n._remove(t,r)})}else e&&n._remove(e,r)},at:function(t){return this.get("models")[t]},_normModel:function(t){var e=!0;if(!(t instanceof r)){var n=t,i=this.get("model");t=new i,e=t.set(n,{silent:1})}return e&&t},load:function(e,r){var n=this;e=e||{};var o=e.success,a=e.error;e.success=function(r){if(r&&!r.pagination&&null==r.totalCount&&!t.isArray(r.data)&&t.isBoolean(r.success)){if(!r.success){var s=r.message||"加载失败！",u=i.alert(s,{elCls:"error",isHtml:r.isHtml}),c=t.makeArray(arguments);return c.push(u),void(a&&a.apply(this,c))}r=r.data||{}}var l=n.get("dataHandler");if(l&&(r=l.call(n,r)),r){var f=n.get("localPageDataHandler");f&&(r=f.call(n,r));var d=n.get("parse").call(n,r);d&&n.set("models",d,e)}t.each(n.get("models"),function(t){t.__isModified=0}),o&&o.apply(this,arguments)};var s=n.get("localData");s=s||{};var u=n.get("io");return u&&u.abort(),u=n.get("sync").call(n,n,"read",e,s.read,r),n.set("io",u),n},create:function(t,e){var r=this;if(e=e||{},t=this._normModel(t)){t.addToCollection(r);var n=e.success;e.success=function(){r.add(t,e),n&&n()},t.save(e)}return t},_add:function(t,e){if(t=this._normModel(t)){e=e||{};var r=o(this.get("models"),t,this.get("comparator"),this.get("sortDir"));this.get("models").splice(r,0,t),t.addToCollection(this),e.silent||this.fire("add",{model:t})}return t},_remove:function(e,r){r=r||{};var n=t.indexOf(e,this.get("models"));-1!=n&&(this.get("models").splice(n,1),e.removeFromCollection(this)),r.silent||this.fire("remove",{model:e})},getById:function(t){for(var e=this.get("models"),r=0;r<e.length;r++){var n=e[r],i=n.getId();if(null!=i&&i==t)return n}return null},getByCid:function(t){for(var e=this.get("models"),r=0;r<e.length;r++){var n=e[r];if(n.get("clientId")===t)return n}return null}}),a},{requires:["event","cute/mvc/model","base","cute/dialog/"]}),KISSY.add("cute/mvc/model",function(t,e){function r(){var t=this;r.superclass.constructor.apply(t,arguments),t.collections={}}function n(t){var e;return t&&(e=t.get("url"))?"string"==typeof e?e:e.call(t):e}function i(){var t,e,r=this.collections;for(t in r)if(r.hasOwnProperty(t)){e=r[t];break}var i=n(e)||this.get("urlRoot");return this.isNew()?i:(i+="/"==i.charAt(i.length-1)?"":"/",i+encodeURIComponent(this.getId())+"/")}var o=["idAttribute","clientId","urlRoot","url","parse","sync"];return t.extend(r,e,{addToCollection:function(e){this.collections[t.stamp(e)]=e,this.addTarget(e)},removeFromCollection:function(e){delete this.collections[t.stamp(e)],this.removeTarget(e)},getId:function(){return this.get(this.get("idAttribute"))},setId:function(t){return this.set(this.get("idAttribute"),t)},setInternal:function(){return this.__isModified=1,r.superclass.setInternal.apply(this,arguments)},isNew:function(){return!this.getId()},isModified:function(){return!(!this.isNew()&&!this.__isModified)},destroy:function(t){var e=this;t=t||{};var r=t.success;return t.success=function(n){var i=e.collections;if(n){var o=e.get("parse").call(e,n);o&&e.set(o,t)}for(var a in i)i[a].remove(e,t),i[a]&&e.removeFromCollection(i[a]);e.fire("destroy"),r&&r.apply(this,arguments)},!e.isNew()&&t["delete"]?e.get("sync").call(e,e,"delete",t):(t.success(),t.complete&&t.complete()),e},load:function(t){var e=this;t=t||{};var r=t.success;return t.success=function(n){if(n){var i=e.get("parse").call(e,n);i&&e.set(i,t)}e.__isModified=0,r&&r.apply(this,arguments)},e.get("sync").call(e,e,"read",t),e},save:function(t){var e=this;t=t||{};var r=t.success;return t.success=function(n){if(n){var i=e.get("parse").call(e,n);i&&e.set(i,t)}e.__isModified=0,r&&r.apply(this,arguments)},e.get("sync").call(e,e,e.isNew()?"create":"update",t),e},toJSON:function(){var e=this.getAttrVals();return t.each(o,function(t){delete e[t]}),e}},{ATTRS:{idAttribute:{value:"id"},clientId:{valueFn:function(){return t.guid("mvc-client")}},url:{value:i},urlRoot:{value:""},sync:{value:function(){return t.require("cute/mvc/index").sync.apply(this,arguments)}},parse:{value:function(t){return t}}}}),r},{requires:["base"]}),KISSY.add("cute/mvc/index",function(t,e,r,n,i,o){return{sync:o,Model:e,View:n,Collection:r,Router:i}},{requires:["cute/mvc/model","cute/mvc/collection","cute/mvc/view","cute/mvc/router","cute/mvc/sync"]}),KISSY.add("cute/mvc/router",function(t,e,r){function n(t){var e,r;for(r=0;r<t.length;r++)if(e=t.charAt(r),"\\"==e)r++;else if("("==e)return r;throw new Error("impossible to not to get capture group in kissy mvc route")}function i(e){return new t.Uri(e).getFragment().replace(/^!/,"")}function o(e){if(e=e||location.href,y.nativeHistory&&A){e=new t.Uri(e);var r=e.getQuery().toString();return e.getPath().substr(y.urlRoot.length)+(r?"?"+r:"")}return i(e)}function a(e){return t.endsWith(e,"/")}function s(e){return t.startsWith(e,"/")}function u(t){return a(t)&&(t=t.substring(0,t.length-1)),t}function c(t){return s(t)&&(t=t.substring(1)),t}function l(t){return u(t)+"/"}function f(t){return t?"/"+c(t):t}function d(t,e){return t=u(t),e=u(e),t==e}function v(t){return location.protocol+"//"+location.host+u(y.urlRoot)+f(t)}function h(){var e,r,i,a=0,s=-1,u="",c=-1,l=0,f="",d=new t.Uri(o()),v=0;r=d.clone(),r.query.reset(),r=r.toString(),_(w,function(t){var e=t[C],i=0;return _(e,function(e){function o(){if(p){var t={};return _(h,function(e,r){t[p[r]]=e}),t}return[].concat(h)}function d(){u=m,c=y,l=R,v=o(),a=t,f=S,s=h.length}var h,g=e.reg,m=e.regStr,p=e.paramNames,y=-1,S=e.name,R=e.callback;if(h=r.match(g)){if(h.shift(),!h.length)return d(),i=1,!1;if(!m)return d(),i=1,!1;y=n(m),y>c?d():y==c&&s>=h.length?h.length<s?d():m.length>u.length&&d():a||d()}}),i?!1:void 0}),v&&(e=d.query.get(),l.apply(a,[v,e,{path:r,url:location.href}]),i={name:f,paths:v,path:r,url:location.href,query:e},a.fire("route:"+f,i),a.fire("route",i))}function g(e,r,n){var i=r,o=[];return t.isFunction(n)?(r=t.escapeRegExp(r),r=r.replace(R,function(t,e,r,n,i){return o.push(r||i),r?"([^/]+)":i?"(.*)":void 0}),{name:i,paramNames:o,reg:new RegExp("^"+r+"$"),regStr:r,callback:n}):{name:i,reg:n.reg,callback:m(e,n.callback)}}function m(e,r){return t.isFunction(r)?r:"string"==typeof r?e[r]:r}function p(t){var e=this;e[C]={},e.addRoutes(t.newVal)}function y(){var t=this;y.superclass.constructor.apply(t,arguments),t.on("afterRoutesChange",p,t),p.call(t,{newVal:t.get("routes")}),w.push(t)}var _=t.each,S=100,R=/(:([\w\d]+))|(\\\*([\w\d]+))/g,w=[],b=t.Env.host,I=b.document.documentMode||t.UA.ie,T=b.history,A=!(!T||!T.pushState),C="__routerMap";return y.ATTRS={routes:{}},t.extend(y,r,{addRoutes:function(t){var e=this;_(t,function(t,r){e[C][r]=g(e,r,m(e,t))})}},{hasRoute:function(t){var e=0;return _(w,function(r){var n=r[C];return _(n,function(r){var n=r.reg;return t.match(n)?(e=1,!1):void 0}),e?!1:void 0}),!!e},removeRoot:function(e){var r=new t.Uri(e);return r.getPath().substr(y.urlRoot.length)},navigate:function(t,r){r=r||{};var n,i=r.replaceHistory;o()!==t?y.nativeHistory&&A?(T[i?"replaceState":"pushState"]({},"",v(t)),h()):(n="#!"+t,i?location.replace(n+(I&&8>I?e.REPLACE_HISTORY:"")):location.hash=n):r&&r.triggerRoute&&h()},start:function(r){if(r=r||{},y.__started)return r.success&&r.success();r.urlRoot=(r.urlRoot||"").replace(/\/$/,"");var n,i=r.nativeHistory,a=location.pathname,s=o(),u=location.hash.match(/#!.+/);if(n=y.urlRoot=r.urlRoot,y.nativeHistory=i,i)if(A)u&&(d(a,n)?(T.replaceState({},"",v(s)),r.triggerRoute=1):t.error("location path must be same with urlRoot!"));else if(!d(a,n))return void location.replace(l(n)+"#!"+s);setTimeout(function(){i&&A?e.on(b,"popstate",h):(e.on(b,"hashchange",h),r.triggerRoute=1),r.triggerRoute&&h(),r.success&&r.success()},S),y.__started=1}}),y},{requires:["event","base"]}),KISSY.add("cute/mvc/sync",function(t,e,r){function n(n,o,a,s,u){if(s)return a.success&&a.success(s,u),void(a.complete&&a.complete(s,u));var c,l,f=i[o],d=t.merge({type:f,dataType:"json"},a);return c=d.data=d.data||{},c._method=o,d.url||(l=n.get("url"),d.url="string"==typeof l?l:l.call(n)),("create"==o||"update"==o)&&(c.model=r.stringify(n.toJSON())),d.serializeArray=!1,e(d)}var i={create:"POST",update:"POST","delete":"POST",read:"GET"};return n},{requires:["ajax","json"]}),KISSY.add("cute/mvc/view",function(t,e,r){function n(t,e){return"string"==typeof e?t[e]:e}function i(){i.superclass.constructor.apply(this,arguments);var t;(t=this.get("events"))&&this._afterEventsChange({newVal:t})}var o=e.all;return i.ATTRS={el:{value:"<div />",getter:function(t){return"string"==typeof t&&(t=o(t),this.setInternal("el",t)),t}},events:{}},t.extend(i,r,{_afterEventsChange:function(t){var e=t.prevVal;e&&this._removeEvents(e),this._addEvents(t.newVal)},_removeEvents:function(t){var e=this.get("el");for(var r in t){var i=t[r];for(var o in i){var a=n(this,i[o]);e.undelegate(o,r,a,this)}}},_addEvents:function(t){var e=this.get("el");for(var r in t){var i=t[r];for(var o in i){var a=n(this,i[o]);e.delegate(o,r,a,this)}}},render:function(){return this},destroy:function(){this.get("el").remove()}}),i},{requires:["node","base"]});KISSY.add("cute/grid/collection",function(e,t,c){"use strict";function r(){var e=this;r.superclass.constructor.apply(e,arguments)}return e.extend(r,t.Collection,{},{ATTRS:{model:{value:c},url:""}}),r},{requires:["cute/mvc/","cute/grid/model"]});KISSY.add("cute/grid/model",function(e,t){"use strict";function c(){c.superclass.constructor.apply(this,arguments)}return e.extend(c,t.Model,{getData:function(){var t=this,c=t.toJSON();return e.each(["idAttribute","url","urlRoot","sync","parse","clientId"],function(n){var r=t.get(n);c[n]=e.isFunction(r)?"":r}),c},isChecked:function(){var e=this,t=e.get("checkedKey");return!!e.get(t)},setChecked:function(e){var t=this;null==e&&(e=!0);var c=t.get("checkedKey");t.set(c,e),t.fire("check")},unChecked:function(){var e=this;e.setChecked(!1)},getEl:function(){var e=this,t=e.view,c=null;return t&&(c=t.get("el")),c}},{ATTRS:{checkedKey:{value:"_cute_checked"}}}),c},{requires:["cute/mvc/"]});KISSY.add("cute/grid/gridsview",function(e,t,i,r,a,o,l,d,n,s,g){"use strict";function c(t){var i=this;i.tpl=e.clone(n);var r=i.grid=t.grid,a=r.get("mainCheckboxCls"),l=t.events=t.events||{};l["."+a]={change:"changeMainCheckbox"},c.superclass.constructor.apply(i,arguments);var d=i.get("el");r.gridsView=i;var s=r.get("customFoot"),g=!(!s||!s.length),h=r.get("hideHeader");d.append(['<div class="grid-fixed-top">','<div class="grid-toolbar"></div>','<div class="grid-head-wrapper">','<div class="grid-head"></div>','<div class="border-top"></div>','<div class="border-right"></div>','<div class="border-bottom"></div>','<div class="border-left"></div>',"</div>","</div>",'<div class="grid-body-wrapper">','<div class="grid-body ',h?"hideHeader":"",'"></div>','<div class="border-top"></div>','<div class="border-right"></div>','<div class="border-bottom"></div>','<div class="border-left"></div>',"</div>",g?'<div class="grid-foot grid-fixed-bottom"></div>':""].join("")),i.toolbar=d.one(".grid-toolbar"),i.head=d.one(".grid-head"),i.body=d.one(".grid-body"),i.foot=d.one(".grid-foot"),i.init();var u=d.attr("id"),v={target:"#"+u+" .grid-fixed-top",container:"#"+u},p=r.get("initConfig");p&&p.fixedTop&&(v.fixedTop=p.fixedTop);var f=null;r.get("hasTopFixed")&&(f=r.topFixed=new o(v));var m=r.get("showScrollX");m&&f&&f.on("fix",function(){r.fire("topFix")}),g&&r.get("hasBottomFixed")&&(r.bottomFixed=new o({target:"#"+u+" .grid-fixed-bottom",container:"#"+u,align:"bottom"}));var C=r.get("mainCheckbox");C&&C.on("change",i.changeMainCheckbox,i)}var h=t.all,u=["title","sortable","newRow","name","width","hidden","ellipsis","rowspan","colspan","style","tip","copy","isHtml","tpl","titleEllipsis","titleTipText","titleTip"];return e.extend(c,a.View,{init:function(){var e=this;return e.render(),e.bind(),e},render:function(){var t,i=this,a=i.get("grid"),o=i.get("grids"),n=i.get("data"),c=o.get("models"),v=o.toJSON(),p=i.get("cols"),f=i.tpl,m=!(i.cols===p),C=i.get("isSelect"),b=a.get("modelKey"),k=a.get("hasPagination"),w=!0;e.each(p,function(e){return e.newRow?(w=!1,!1):void 0});var x={isSelect:C,hasPagination:k,cols:p,gridConfig:w,hideToolbar:a.get("hideToolbar"),hideTotalCount:a.get("hideTotalCount"),hideConfigMenu:a.get("hideConfigMenu"),hidePageSize:a.get("hidePageSize"),pageSize:a.get("pageSize"),mainCheckboxCls:a.get("mainCheckboxCls")};if(i.toolbarRendered){var S=i.listConfigDetailWrapper;S.html(new r(i.tpl.toolbarConfig).render(x)),e.each(p,function(e){if(!e.hidden){var t=".grid-list-config-detail2-"+e.name;S.all(t).attr("checked",!0)}})}else{i.toolbar.html(new r(i.tpl.toolbar,{subTpls:{pageSizeTpl:a.get("pageSizeTpl"),totalCountTpl:a.get("totalCountTpl")}}).render(x));var T=i.toolbar.all(".grid-list-config"),S=T.all(".grid-list-config-detail");i.listConfigDetailWrapper=S,S.html(new r(i.tpl.toolbarConfig).render(x)),e.each(p,function(e){if(!e.hidden){var t=".grid-list-config-detail2-"+e.name;S.all(t).attr("checked",!0)}}),a.listConfigHint=new d({target:T.all(".grid-list-config-iconfont"),click:!0,position:"br",srcNode:S,offset:[7,0]}),S.delegate("click",".grid-list-config-detail2-check",function(t){var r=i.get("cols"),o=t.currentTarget,l=0,d=S.all(".grid-list-config-detail2-check:checked"),n=a.get("showScrollX");if(d.length<1)return void(o.checked=!0);var s=".header_"+o.value;if(o.checked?i.toolbar.parent(".grid").all(s).removeClass("hidden"):i.toolbar.parent(".grid").all(s).addClass("hidden"),e.each(r,function(e){var t=i.get("grid").get("colsMap")[e.name].width;e.width=t;var r=".header_"+e.name;T.parent(".grid").all(r).attr("width",t);var a=".grid-list-config-detail2-"+e.name;e.hidden=!S.all(a).prop("checked"),!i.get("grid").get("colsMap")[e.name].width&&S.all(a).prop("checked")&&l++}),!n&&0==l){var g=".header_"+d[d.length-1].value;T.parent(".grid").all(g).attr("width",""),e.each(r,function(e){e.name==d[d.length-1].value&&(e.width="")})}if(n){var c=i.head.children(".table"),u=i.body.children(".table"),v=a.getTotalWidth();c.width(v),u.width(v)}var p=[],f=[],m=h(o);m.parent(".grid-list-config-detail").all(".grid-list-config-detail2-check").each(function(e){e.prop("checked")?p.push(e.val()):f.push(e.val())}),a.fire("colHiddenStatusChange",{visibleCols:p,hiddenCols:f})});var M=a.get("buttons");if(M&&M.length){var y=i.toolbar.all(".grid-toolbar-buttons");y.append(M),M.removeClass("bottom-margin").removeClass("margin-bottom-10").show(),y.all(".btn").each(function(e){var t=e.attr("_handler");if(t){var r=l.getConfig(e.siblings("."+t)[0]);r&&e.on("click",function(){r.call(this,i.get("grid"))})}})}var _=a.get("customLeft");if(_&&_.length){var F=i.toolbar.one(".grid-custom-left");F.append(_),_.removeClass("bottom-margin").removeClass("margin-bottom-10").show()}var R=a.get("customRight");if(R&&R.length){var H=i.toolbar.one(".grid-custom-right");H.append(R),R.removeClass("bottom-margin").removeClass("margin-bottom-10").show()}i.toolbarRendered=!0,a.fire("toolbarRender",{toolbar:i.toolbar})}if(i.foot&&!i.footRendered){var z=a.get("customFoot");z&&z.length&&(i.foot.append(z),z.removeClass("bottom-margin").removeClass("margin-bottom-10").show()),a.fire("footRender",{foot:i.foot}),i.footRendered=!0}m&&i.head.html(new r(i.tpl.head).render({isSelect:C,cols:p,titleEllipsis:a.get("titleEllipsis"),sortField:a.get("sortField"),sortDir:a.get("sortDir"),hasOrderCol:a.get("hasOrderCol"),hideHeader:a.get("hideHeader"),enableTip:a.get("enableTip"),enableHeadTip:a.get("enableHeadTip"),totalWidth:a.getTotalWidth(),mainCheckboxCls:a.get("mainCheckboxCls")})),e.each(v,function(i,r){if(!c[r].get(b)){var a=e.guid();c[r].set(b,a),i.id=a}t=[],e.each(["idAttribute","url","urlRoot","sync","parse","clientId"],function(t){var a=c[r].get(t);i[t]=e.isFunction(a)?"":a}),e.each(p,function(r){var a=r.name;if(a){null==i[a]&&(i[a]="");var o=i[a];null==o&&(o=""),t.push(e.merge(o.value?o:{value:o},r))}}),i.cell=t});var D="{{{value}}}",L="{{value}}";e.each(p,function(t,r){if((m||!f._grid)&&t.tpl){var a=t.tpl;if(e.isString(a))a=a.replace(new RegExp("\\{\\{("+u.join("|")+")\\}\\}","g"),"{{../$1}}");else if(e.isFunction(a)){var o="tpl_"+e.guid();f._commands[o]=function(e){var r=e[2];return t.tpl.call(i,r[t.name],r)},a="{{{"+o+" _}}}"}D=D.replace(/{{{value}}}/g,"{{@if xindex==="+r+"}}"+a+"{{else}}{{{value}}}{{/if}}"),L=L.replace(/{{value}}/g,"{{@if xindex==="+r+"}}"+a+"{{else}}{{value}}{{/if}}")}}),f._grid=f.grid.replace(/{{@if isHtml}}{{{value}}}{{else}}{{value}}{{\/if}}/g,"{{@if isHtml}}"+D+"{{else}}"+L+"{{/if}}"),(m||!f._grids)&&(f._grids=f.grids.replace("{{_grid}}",f._grid));var W=a.gridAttr,O=v.length,E=i.get("status").init,N=W&&W.gridDom?W.autoload:a.get("autoload");a.status=O?"":E&&!N?"noQuery":"noData";var P=new r(f._grids,{commands:f._commands}),A=P.render({isSelect:i.get("isSelect"),rowSpan:i.get("rowSpan"),grids:v,zebra:a.get("zebra"),hasOrderCol:a.get("hasOrderCol"),init:E,autoload:N,dataLen:O,enableTip:a.get("enableTip"),enableCellTip:a.get("enableCellTip"),noQueryMessage:a.get("noQueryMessage"),noDataMessage:a.get("noDataMessage"),totalWidth:a.getTotalWidth(),rowCheckboxCls:a.get("rowCheckboxCls")});i.body.html(A);var K=i.grid.get("loading");if(K&&K.hide(),i.tbody=i.get("el").one("tbody"),e.each(c,function(e){e.view=new s({el:"#"+i.get("el").attr("id")+" .grid-"+e.get(b),model:e,isSelect:i.get("isSelect"),rowSpan:i.get("rowSpan"),grid:a})}),k){var Q=n.pagination||{current:i.get("current"),dataLen:n.totalCount,per:a.get("pageSize")};null==Q.dataLen&&(Q.dataLen=i.get("grid").oldTotalCount||0);var j=e.merge({el:i.toolbar.one(".grid-pagination"),per:c.length},Q);i.pv?i.pv.update(j):(i.pv=new g(j).render(),i.pv.p.on("page",function(e){i.fire("page",e)}))}var I=a.get("mainCheckboxCls");i.toolbar.all("."+I).attr("checked",!1),i.foot&&i.foot.all("."+I).attr("checked",!1);var J=a.get("mainCheckbox");J&&J.attr("checked",!1);var V,X=i.toolbar.all(".grid-totalCount");V=n.pagination?n.pagination.dataLen:n.totalCount,null==V&&(V=a.oldTotalCount||0),X&&X.length&&X.one(".grid-totalCount-number").html(V),a.totalCount=V,i.cols=p,a.refreshFixed();var q=a.get("target");q.css({minHeight:0,background:"none"});var B=i.get("callback");B&&B.call(a,n);var Y=a.get("rendered");Y||a.fire("firstRender",{data:n}),a.fire("render",{data:n}),a.fire("check",{checkedModels:a.getCheckedModels(),changeModels:[]}),a.set("rendered",!0)},bind:function(){var t=this,i=t.get("grid"),a=t.get("el"),o=t.get("grids"),l=t.tpl,d=i.get("modelKey");o.on("add",function(o){var n,g=o.model,c=[],h=g.toJSON(),u=t.get("cols");g.get(d)||g.set(d,e.guid()),n=g.get(d),e.each(u,function(t){t.name&&h[t.name]&&c.push(e.merge(h[t.name].value?h[t.name]:{value:h[t.name]},t))}),t.tbody.append(new r(l._grid,{commands:l._commands}).render(e.merge({isSelect:t.get("isSelect"),rowSpan:t.get("rowSpan"),id:n,cell:c},h))),g.view=new s({el:"#"+a.attr("id")+" .grid-"+n,model:g,isSelect:t.get("isSelect"),rowSpan:t.get("rowSpan"),grid:i})}),o.on("afterModelsChange",function(){t.empty(),t.render()}),o.on("remove",function(e){var i,r=e.model;i=r.get(d),h("#"+t.get("el").attr("id")+" .grid-"+i).remove()}),o.on("*Change",e.buffer(function(){i.refreshMainCheckbox()},100))},Map:function(){},empty:function(){this.body.html("")},changeMainCheckbox:function(e){var t=this,i=h(e.currentTarget).prop("checked"),r=t.get("grid"),a=[];r.eachModels(function(e){var t=e.isChecked();t!=i&&(e.setChecked(i),a.push(e))}),e.silent||r.fire("check",{checkedModels:r.getCheckedModels(),changeModels:a})},rowClick:function(e){var t=this,i=h(e.target),r=i[0].tagName.toLowerCase(),a=t.get("grid"),o=a.get("enableCheckRow"),l=a.get("rowCheckboxCls"),d=a.get("rowClickExcludeCls"),n=[];if(!o||i.hasClass(l)||"a"==r||i.parent("a")||i.hasClass(d)||i.parent("."+d))return n;var s=a.fire("beforeCheck");if(s===!1)return n;var g=h(e.currentTarget);if(g.hasClass("cute-grid-tr")||(g=g.parent(".cute-grid-tr")),g&&g.length){var c=g.attr("_rowid"),u=a.getModel(c),v=u.isChecked(),p=a.get("toggleSelect");t.get("isSelect")?p?(u.setChecked(!v),n.push(u)):v||(u.setChecked(!0),n.push(u)):a.eachModels(p?function(e){var t=e.isChecked();e==u?(e.setChecked(!t),n.push(e)):t&&(e.setChecked(!1),n.push(e))}:function(e){var t=e.isChecked();e==u?t||(e.setChecked(!0),n.push(e)):t&&(e.setChecked(!1),n.push(e))})}return e.silent||a.fire("check",{checkedModels:a.getCheckedModels(),changeModels:n}),n},mouseenter:function(e){var t=this,i=h(e.currentTarget);i.hasClass("cute-grid-tr")||(i=i.parent(".cute-grid-tr")),i&&i.length&&t.get("el").all(".grid-"+i.attr("_rowid")).addClass(t.get("grid").get("hoverCls"))},mouseleave:function(e){var t=this,i=h(e.currentTarget);i.hasClass("cute-grid-tr")||(i=i.parent(".cute-grid-tr")),i&&i.length&&t.get("el").all(".grid-"+i.attr("_rowid")).removeClass(t.get("grid").get("hoverCls"))},sort:function(e){var t=this,i=h(e.currentTarget),r=i.attr("_sortfield"),a=null,o=i.hasClass("grid-sort-asc"),l=i.hasClass("grid-sort-desc");i.siblings(".grid-sort-asc,.grid-sort-desc").removeClass("grid-sort-asc").removeClass("grid-sort-desc"),o||l?o?(i.replaceClass("grid-sort-asc","grid-sort-desc"),a="desc"):(i.replaceClass("grid-sort-desc","grid-sort-asc"),a="asc"):(i.addClass("grid-sort-asc"),a="asc"),t.set("sortField",r),t.set("sortDir",a),t.fire("sort",{sortField:r,sortDir:a})}},{ATTRS:{grid:{value:null},el:{value:""},events:{setter:function(t){return e.merge({".grid-sortable":{click:"sort"},".cute-grid-tr":{mouseenter:"mouseenter",mouseleave:"mouseleave",click:"rowClick"}},t)}},current:{value:1},status:{value:{}}}}),c},{requires:["node","sizzle","cute/xtemplate/","cute/mvc/","cute/fixed/","cute/util/","cute/hint/","cute/grid/tpl","cute/grid/gridview","cute/grid/paginationview"]});KISSY.add("cute/xtemplate/facade",function(e,n,m){function t(e,n){var t;return n.cache&&(t=u[e])?t:(t=m.compileToFn(e,n),n.cache&&(u[e]=t),t)}function r(m,r){var u=this;r=e.merge(a,r),"string"==typeof m&&(m=t(m,r)),u.option=r,u.tpl=m,u.runtime=new n(m,r)}var u=r.cache={};n.includeCommand.invokeEngine=function(n,m,t){return new r(n,e.merge(t)).render(m,!0)};var a={cache:!0};return e.augment(r,{removeSubTpl:function(e){this.runtime.removeSubTpl(e)},removeCommand:function(e){this.runtime.removeCommand(e)},addSubTpl:function(e,n){this.runtime.addSubTpl(e,n)},addCommand:function(e,n){this.runtime.addCommand(e,n)},render:function(){return this.runtime.render.apply(this.runtime,arguments)}}),r.compiler=m,r.RunTime=n,r.addCommand=n.addCommand,r.addSubTpl=n.addSubTpl,r.removeCommand=n.removeCommand,r.removeSubTpl=n.removeSubTpl,r},{requires:["cute/xtemplate/runtime","cute/xtemplate/compiler"]});KISSY.add("cute/xtemplate/runtime/base",function(e){function n(r,u){var i=this;i.tpl=r,u=e.merge(t,u),u.subTpls=e.merge(u.subTpls,n.subTpls),u.commands=e.merge(u.commands,n.commands),this.option=u}var t={silent:!0,name:"",utils:{getProperty:function(e,n,t){if("this"==e||"."==e)return n.length?[n[0]]:!1;e=e.split(".");for(var r,u,i,o,a=e.length,m=t||0,c=n.length;c>m;m++){for(u=n[m],o=1,r=0;a>r;r++){if(i=e[r],"object"!=typeof u||!(i in u)){o=0;break}u=u[i]}if(o)return"function"==typeof u&&(u=u.call(n[0])),[u]}return!1}}};return n.prototype={constructor:n,removeSubTpl:function(e){delete this.option.subTpls[e]},removeCommand:function(e){delete this.option.commands[e]},addSubTpl:function(e,n){this.option.subTpls[e]=n},addCommand:function(e,n){this.option.commands[e]=n},render:function(e,n){var t=this;return n||(e=[e]),t.tpl(e,t.option)}},n}),KISSY.add("cute/xtemplate/runtime/commands",function(e,n){return{each:function(e,n){var t,r=n.params,u=r[0],i="";if(u){var o=[0,0].concat(e);t=u.length;for(var a=0;t>a;a++){var m=o[0]=u[a];o[1]={xcount:t,xindex:a,xitem:m},i+=n.fn(o)}}return i},"with":function(e,n){var t=n.params,r=t[0],u=[0].concat(e),i="";return r?(u[0]=r,i=n.fn(u)):n.inverse&&(i=n.inverse(e)),i},"if":function(e,n){var t=n.params,r=t[0],u="";return r?n.fn&&(u=n.fn(e)):n.inverse&&(u=n.inverse(e)),u},set:function(n,t){for(var r=n.length-1;r>=0;r--)if("object"==typeof n[r]){e.mix(n[r],t.hash);break}return""},include:n.include}},{requires:["cute/xtemplate/runtime/include-command"]}),KISSY.add("cute/xtemplate/runtime/include-command",function(e,n){var t={invokeEngine:function(t,r,u){return new n(t,e.merge(u)).render(r,!0)},include:function(n,r){var u=r.params;if(!u||1!=u.length)return e[r.silent?"log":"error"]("include must has one param"),"";var i,o=u[0],a=r.subTpls;return(i=a[o])?(r.name=o,t.invokeEngine(i,n,r)):(e[r.silent?"log":"error"]('does not include sub template "'+o+'"'),"")}};return t},{requires:["cute/xtemplate/runtime/base"]}),KISSY.add("cute/xtemplate/runtime",function(e,n,t,r){n.addCommand=function(e,n){t[e]=n},n.removeCommand=function(e){delete t[e]},n.commands=t,n.includeCommand=r;var u={};return n.subTpls=u,n.addSubTpl=function(e,n){u[e]=n},n.removeSubTpl=function(e){delete u[e]},n.IncludeEngine=n,n},{requires:["cute/xtemplate/runtime/base","cute/xtemplate/runtime/commands","cute/xtemplate/runtime/include-command"]});KISSY.add("cute/xtemplate/compiler/ast",function(t){var e={};return e.ProgramNode=function(t,e,n){var i=this;i.lineNumber=t,i.statements=e,i.inverse=n},e.ProgramNode.prototype.type="program",e.BlockNode=function(e,n,i,s){var r,o=s.parts,u=this;t.equals(n.path.parts,o)||(r="parse error at line "+e+":\nexpect {{/"+n.path.parts+"}} not {{/"+o+"}}",t.error(r)),u.lineNumber=e,u.tpl=n,u.program=i},e.BlockNode.prototype.type="block",e.TplNode=function(t,e,n,i){var s=this;s.lineNumber=t,s.path=e,s.params=n,s.hash=i,s.escaped=!0,s.isInversed=!1},e.TplNode.prototype.type="tpl",e.TplExpressionNode=function(t,e){var n=this;n.lineNumber=t,n.expression=e,n.escaped=!0},e.TplExpressionNode.prototype.type="tplExpression",e.ContentNode=function(t,e){var n=this;n.lineNumber=t,n.value=e},e.ContentNode.prototype.type="content",e.UnaryExpression=function(t){this.value=t},e.UnaryExpression.prototype.type="unaryExpression",e.MultiplicativeExpression=function(t,e,n){var i=this;i.op1=t,i.opType=e,i.op2=n},e.MultiplicativeExpression.prototype.type="multiplicativeExpression",e.AdditiveExpression=function(t,e,n){var i=this;i.op1=t,i.opType=e,i.op2=n},e.AdditiveExpression.prototype.type="additiveExpression",e.RelationalExpression=function(t,e,n){var i=this;i.op1=t,i.opType=e,i.op2=n},e.RelationalExpression.prototype.type="relationalExpression",e.EqualityExpression=function(t,e,n){var i=this;i.op1=t,i.opType=e,i.op2=n},e.EqualityExpression.prototype.type="equalityExpression",e.ConditionalAndExpression=function(t,e){var n=this;n.op1=t,n.op2=e},e.ConditionalAndExpression.prototype.type="conditionalAndExpression",e.ConditionalOrExpression=function(t,e){var n=this;n.op1=t,n.op2=e},e.ConditionalOrExpression.prototype.type="conditionalOrExpression",e.StringNode=function(t,e){var n=this;n.lineNumber=t,n.value=e},e.StringNode.prototype.type="string",e.NumberNode=function(t,e){var n=this;n.lineNumber=t,n.value=e},e.NumberNode.prototype.type="number",e.BooleanNode=function(t,e){var n=this;n.lineNumber=t,n.value=e},e.BooleanNode.prototype.type="boolean",e.HashNode=function(e,n){var i=this,s={};i.lineNumber=e,t.each(n,function(t){s[t[0]]=t[1]}),i.value=s},e.HashNode.prototype.type="hash",e.IdNode=function(e,n){var i=this,s=[],r=0;i.lineNumber=e,t.each(n,function(t){".."==t?r++:s.push(t)}),i.parts=s,i.string=s.join("."),i.depth=r},e.IdNode.prototype.type="id",e}),KISSY.add("cute/xtemplate/compiler",function(t,e,n,i){function s(t){return t+m++}function r(t,e){return o(t.replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t"),e)}function o(t,e){return t.replace(e?l:c,function(t){return t.length%2&&(t="\\"+t),t})}function u(t,e){f.apply(t,e)}function p(t){return t[t.length-1]}function a(t,e,n){var i=s("tmp");n.push("var "+i+" = "+t+";"),n.push("buffer+="+(e?"escapeHTML(":"")+"("+i+'===undefined?"":'+i+')+""'+(e?")":"")+";")}e.yy=n;var h={getProperty:1},l=/\\*"/g,c=/\\*'/g,f=[].push,m=0,y=0;i.includeCommand.invokeEngine=function(e,n,s){return"string"==typeof e&&(e=d.compileToFn(e,s)),new i(e,t.merge(s)).render(n)};var d,v={genFunction:function(t,e){var n=[];if(e||n.push("function(scopes) {"),n.push('var buffer = ""'+(e?",":";")),e){n.push("S = KISSY,escapeHTML = S.escapeHTML,isArray = S.isArray,isObject = S.isObject,log = S.log,commands = option.commands,utils = option.utils,error = S.error;");var s,r="",o=i.commands;for(s in o)r+=s+'Command = commands["'+s+'"],';for(s in h)r+=s+' = utils["'+s+'"],';r&&n.push("var "+r.slice(0,r.length-1))}if(t)for(var p=0,a=t.length;a>p;p++)u(n,this[t[p].type](t[p]));return n.push("return buffer;"),e?{params:["scopes","option","undefined"],source:n}:(n.push("}"),n)},genId:function(t,e){var n,r=[],o=t.depth,p=t.string,a=s("id"),h=this,l=0,c=i.commands;if(r.push("var "+a+";"),e&&0==o){var f=h.genOption(e);u(r,f[1]),(l=c[p])?n=p+"Command":(n=s("command"),r.push("var "+n+";"),r.push(n+' = commands["'+p+'"];'),r.push("if( "+n+" ){")),r.push("try{"),r.push(a+" = "+n+"(scopes,"+f[0]+");"),r.push("}catch(e){"),r.push("error(e.message+\": '"+p+"' at line "+t.lineNumber+'");'),r.push("}"),l||(r.push("}"),r.push("else {"))}if(!l){var m=s("tmp");r.push("var "+m+' = getProperty("'+p+'",scopes,'+o+");"),r.push("if("+m+"===false){"),r.push('S[option.silent?"log":"error"]("can not find property: \''+p+"' at line "+t.lineNumber+'", "warn");'),r.push("} else {"),r.push(a+" = "+m+"[0];"),r.push("}"),e&&0==o&&r.push("}")}return[a,r]},genOpExpression:function(t,e){var n,i,s=[],r=this[t.op1.type](t.op1),o=this[t.op2.type](t.op2);return n=r[0],i=o[0],n&&i?(u(s,r[1]),u(s,o[1]),s.push(n+e+i),["",s]):n||i?n&&!i?(u(s,r[1]),u(s,o[1].slice(0,-1)),s.push(n+e+"("+p(o[1])+")"),["",s]):!n&&i?(u(s,r[1].slice(0,-1)),u(s,o[1]),s.push("("+p(r[1])+")"+e+i),["",s]):void 0:(u(s,r[1].slice(0,-1)),u(s,o[1].slice(0,-1)),s.push("("+p(r[1])+")"+e+"("+p(o[1])+")"),["",s])},genOption:function(e){var n,i,r=[],o=s("option"),a=this;if(r.push("var "+o+" = S.merge(option);"),e){if(n=e.params){var h=s("params");r.push("var "+h+" = [];"),t.each(n,function(t){var e=a[t.type](t);e[0]?(u(r,e[1]),r.push(h+".push("+e[0]+");")):(u(r,e[1].slice(0,-1)),r.push(h+".push("+p(e[1])+");"))}),r.push(o+".params="+h+";")}if(i=e.hash){var l=s("hash");r.push("var "+l+" = {};"),t.each(i.value,function(t,e){var n=a[t.type](t);n[0]?(u(r,n[1]),r.push(l+'["'+e+'"] = '+n[0]+";")):(u(r,n[1].slice(0,-1)),r.push(l+'["'+e+'"] = '+p(n[1])+";"))}),r.push(o+".hash="+l+";")}}return[o,r]},conditionalOrExpression:function(t){return this.genOpExpression(t,"||")},conditionalAndExpression:function(t){return this.genOpExpression(t,"&&")},relationalExpression:function(t){return this.genOpExpression(t,t.opType)},equalityExpression:function(t){return this.genOpExpression(t,t.opType)},additiveExpression:function(t){return this.genOpExpression(t,t.opType)},multiplicativeExpression:function(t){return this.genOpExpression(t,t.opType)},unaryExpression:function(t){var e,n=[],i=this[t.value.type](t.value);return f.apply(n,i[1]),(e=i[0])?n.push(e+"=!"+e+";"):n[n.length-1]="!"+p(n),[e,n]},string:function(t){return["",["'"+r(t.value)+"'"]]},number:function(t){return["",[t.value]]},"boolean":function(t){return["",[t.value]]},id:function(t){return this.genId(t)},block:function(t){var e,n,r,o,p=t.program,a=[],h=this,l=t.tpl,c=h.genOption(l),f=c[0],m=i.commands,y=l.path.string;if(u(a,c[1]),a.push(f+".fn="+h.genFunction(p.statements).join("\n")+";"),p.inverse&&(n=h.genFunction(p.inverse).join("\n"),a.push(f+".inverse="+n+";")),l.isInversed){var d=s("inverse");a.push("var "+d+"="+f+".fn;"),a.push(f+".fn = "+f+".inverse;"),a.push(f+".inverse = "+d+";")}if(r=m[y])e=y+"Command";else{if(e=s("command"),a.push("var "+e+' = commands["'+y+'"];'),!l.hash&&!l.params){a.push("if(!"+e+"){");var v=s("propertyValueHolder");a.push("var "+v+' = getProperty("'+y+'",scopes);'),o=s("variableName"),a.push("var "+o+"="+v+"&&"+v+"[0];"),a.push(f+".params=["+o+"];"),a.push("if(isArray("+o+")){"),a.push(e+'=commands["each"];'),a.push("}"),a.push("else if(isObject("+o+")){"),a.push(e+'=commands["with"];'),a.push("}"),a.push("else {"),a.push(e+'=commands["if"];'),a.push("}"),a.push("}")}a.push("if( "+e+" ){")}return a.push("try{"),a.push("buffer += "+e+"(scopes,"+f+");"),a.push("}catch(e){"),a.push("error(e.message+\": '"+y+"' at line "+l.path.lineNumber+'");'),a.push("}"),r||(a.push("}"),a.push("if("+v+"===false) {"),a.push('S[option.silent?"log":"error"]("can not find command: \''+y+"' at line "+l.path.lineNumber+'","warn");'),a.push("}")),a},content:function(t){return["buffer += '"+r(t.value)+"';"]},tpl:function(t){var e=[],n=t.escaped,i=this.genId(t.path,t);return u(e,i[1]),a(i[0],n,e),e},tplExpression:function(t){var e,n=[],i=t.escaped,s=this[t.expression.type](t.expression);return s[0]?(u(n,s[1]),e=s[0]):(u(n,s[1].slice(0,-1)),e=p(s[1])),a(e,i,n),n}};return d={parse:function(t){return e.parse(t)},compileToStr:function(t){var e=this.compile(t);return"function("+e.params.join(",")+"){\n"+e.source.join("\n")+"}"},compile:function(t){var e=this.parse(t);return m=0,v.genFunction(e.statements,!0)},compileToFn:function(t,e){var n=d.compile(t);return e=e||{},Function.apply(null,[].concat(n.params).concat(n.source.join("\n")+"//@ sourceURL="+(e.name?e.name:"xtemplate"+y++)+".js"))}}},{requires:["cute/xtemplate/compiler/parser","cute/xtemplate/compiler/ast","cute/xtemplate/runtime"]}),KISSY.add("cute/xtemplate/compiler/parser",function(){var t={},e=KISSY,n={SHIFT_TYPE:1,REDUCE_TYPE:2,ACCEPT_TYPE:0,TYPE_INDEX:0,PRODUCTION_INDEX:1,TO_INDEX:2},i=function(t){var n=this;n.rules=[],e.mix(n,t),n.resetInput(n.input)};i.prototype={constructor:function(t){var n=this;n.rules=[],e.mix(n,t),n.resetInput(n.input)},resetInput:function(t){e.mix(this,{input:t,matched:"",stateStack:[i.STATIC.INITIAL],match:"",text:"",firstLine:1,lineNumber:1,lastLine:1,firstColumn:1,lastColumn:1})},getCurrentRules:function(){var t=this,n=t.stateStack[t.stateStack.length-1],s=[];return n=t.mapState(n),e.each(t.rules,function(t){var r=t.state||t[3];r?e.inArray(n,r)&&s.push(t):n==i.STATIC.INITIAL&&s.push(t)}),s},pushState:function(t){this.stateStack.push(t)},popState:function(){return this.stateStack.pop()},getStateStack:function(){return this.stateStack},showDebugInfo:function(){var t=this,e=i.STATIC.DEBUG_CONTEXT_LIMIT,n=t.matched,s=t.match,r=t.input;n=n.slice(0,n.length-s.length);var o=(n.length>e?"...":"")+n.slice(-e).replace(/\n/," "),u=s+r;return u=u.slice(0,e)+(u.length>e?"...":""),o+u+"\n"+new Array(o.length+1).join("-")+"^"},mapSymbol:function(t){var e=this,n=e.symbolMap;return n?n[t]||(n[t]=++e.symbolId):t},mapReverseSymbol:function(t){var e,n=this,i=n.symbolMap,s=n.reverseSymbolMap;if(!s&&i){s=n.reverseSymbolMap={};for(e in i)s[i[e]]=e}return s?s[t]:t},mapState:function(t){var e=this,n=e.stateMap;return n?n[t]||(n[t]=++e.stateId):t},lex:function(){var t,n,s,r,o,u=this,p=u.input,a=u.getCurrentRules();if(u.match=u.text="",!p)return u.mapSymbol(i.STATIC.END_TAG);for(t=0;t<a.length;t++){n=a[t];var h=n.regexp||n[1],l=n.token||n[0],c=n.action||n[2]||void 0;if(s=p.match(h)){o=s[0].match(/\n.*/g),o&&(u.lineNumber+=o.length),e.mix(u,{firstLine:u.lastLine,lastLine:u.lineNumber+1,firstColumn:u.lastColumn,lastColumn:o?o[o.length-1].length-1:u.lastColumn+s[0].length});var f;return f=u.match=s[0],u.matches=s,u.text=f,u.matched+=f,r=c&&c.call(u),r=void 0==r?l:u.mapSymbol(r),p=p.slice(f.length),u.input=p,r?r:u.lex()}}return void e.error("lex error at line "+u.lineNumber+":\n"+u.showDebugInfo())}},i.STATIC={INITIAL:"I",DEBUG_CONTEXT_LIMIT:20,END_TAG:"$EOF"};var s=new i({rules:[[0,/^(\\[\s\S]|[\s\S])*?(?={{)/,function(){var t,e=this,n=e.text,i=0;return(t=n.match(/\\+$/))&&(i=t[0].length),i%2?(n=n.slice(0,-1),e.pushState("et")):e.pushState("t"),(e.text=n)?"CONTENT":void 0}],[2,/^[\s\S]+/,0],[2,/^[\s\S]{2,}?(?:(?={{)|$)/,function(){this.popState()},["et"]],[3,/^{{(?:#|@|\^)/,0,["t"]],[4,/^{{\//,0,["t"]],[5,/^{{\s*else/,0,["t"]],[6,/^{{{/,0,["t"]],[0,/^{{![\s\S]*?}}/,function(){this.popState()},["t"]],[7,/^{{/,0,["t"]],[0,/^\s+/,0,["t"]],[8,/^}}}/,function(){this.popState()},["t"]],[8,/^}}/,function(){this.popState()},["t"]],[9,/^\(/,0,["t"]],[10,/^\)/,0,["t"]],[11,/^\|\|/,0,["t"]],[12,/^&&/,0,["t"]],[13,/^===/,0,["t"]],[14,/^!==/,0,["t"]],[16,/^>=/,0,["t"]],[18,/^<=/,0,["t"]],[15,/^>/,0,["t"]],[17,/^</,0,["t"]],[19,/^\+/,0,["t"]],[20,/^-/,0,["t"]],[21,/^\*/,0,["t"]],[22,/^\//,0,["t"]],[23,/^%/,0,["t"]],[24,/^!/,0,["t"]],[25,/^"(\\"|[^"])*"/,function(){this.text=this.text.slice(1,-1).replace(/\\"/g,'"')},["t"]],[25,/^'(\\'|[^'])*'/,function(){this.text=this.text.slice(1,-1).replace(/\\'/g,"'")},["t"]],[26,/^true/,0,["t"]],[26,/^false/,0,["t"]],[27,/^\d+(?:\.\d+)?(?:e-?\d+)?/i,0,["t"]],[28,/^=/,0,["t"]],[29,/^\.(?=})/,0,["t"]],[29,/^\.\./,function(){this.pushState("ws")},["t"]],[30,/^\./,0,["t"]],[30,/^\//,function(){this.popState()},["ws"]],[29,/^[a-zA-Z0-9_$-]+/,0,["t"]],[31,/^./,0,["t"]]]});return t.lexer=s,s.symbolMap={$EOF:1,CONTENT:2,OPEN_BLOCK:3,OPEN_END_BLOCK:4,OPEN_INVERSE:5,OPEN_UN_ESCAPED:6,OPEN:7,CLOSE:8,LPAREN:9,RPAREN:10,OR:11,AND:12,LOGIC_EQUALS:13,LOGIC_NOT_EQUALS:14,GT:15,GE:16,LT:17,LE:18,PLUS:19,MINUS:20,MULTIPLY:21,DIVIDE:22,MODULUS:23,NOT:24,STRING:25,BOOLEAN:26,NUMBER:27,EQUALS:28,ID:29,SEP:30,INVALID:31,$START:32,program:33,statements:34,inverse:35,statement:36,openBlock:37,closeBlock:38,tpl:39,inTpl:40,path:41,Expression:42,params:43,hash:44,param:45,ConditionalOrExpression:46,ConditionalAndExpression:47,EqualityExpression:48,RelationalExpression:49,AdditiveExpression:50,MultiplicativeExpression:51,UnaryExpression:52,PrimaryExpression:53,hashSegments:54,hashSegment:55,pathSegments:56},t.productions=[[32,[33]],[33,[34,35,34],function(){return new this.yy.ProgramNode(this.lexer.lineNumber,this.$1,this.$3)}],[33,[34],function(){return new this.yy.ProgramNode(this.lexer.lineNumber,this.$1)}],[34,[36],function(){return[this.$1]}],[34,[34,36],function(){this.$1.push(this.$2)}],[36,[37,33,38],function(){return new this.yy.BlockNode(this.lexer.lineNumber,this.$1,this.$2,this.$3)}],[36,[39]],[36,[2],function(){return new this.yy.ContentNode(this.lexer.lineNumber,this.$1)}],[37,[3,40,8],function(){return"^"==this.$1.charAt(this.$1.length-1)&&(this.$2.isInversed=1),this.$2}],[38,[4,41,8],function(){return this.$2}],[39,[7,40,8],function(){return this.$2}],[39,[6,40,8],function(){return this.$2.escaped=!1,this.$2}],[39,[7,42,8],function(){return new this.yy.TplExpressionNode(this.lexer.lineNumber,this.$2)}],[39,[6,42,8],function(){var t=new this.yy.TplExpressionNode(this.lexer.lineNumber,this.$2);return t.escaped=!1,t}],[35,[5,8]],[40,[41,43,44],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1,this.$2,this.$3)}],[40,[41,43],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1,this.$2)}],[40,[41,44],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1,null,this.$2)}],[40,[41],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1)}],[43,[43,45],function(){this.$1.push(this.$2)}],[43,[45],function(){return[this.$1]}],[45,[42]],[42,[46]],[46,[47]],[46,[46,11,47],function(){return new this.yy.ConditionalOrExpression(this.$1,this.$3)}],[47,[48]],[47,[47,12,48],function(){return new this.yy.ConditionalAndExpression(this.$1,this.$3)}],[48,[49]],[48,[48,13,49],function(){return new this.yy.EqualityExpression(this.$1,"===",this.$3)}],[48,[48,14,49],function(){return new this.yy.EqualityExpression(this.$1,"!==",this.$3)}],[49,[50]],[49,[49,17,50],function(){return new this.yy.RelationalExpression(this.$1,"<",this.$3)}],[49,[49,15,50],function(){return new this.yy.RelationalExpression(this.$1,">",this.$3)}],[49,[49,18,50],function(){return new this.yy.RelationalExpression(this.$1,"<=",this.$3)}],[49,[49,16,50],function(){return new this.yy.RelationalExpression(this.$1,">=",this.$3)}],[50,[51]],[50,[50,19,51],function(){return new this.yy.AdditiveExpression(this.$1,"+",this.$3)}],[50,[50,20,51],function(){return new this.yy.AdditiveExpression(this.$1,"-",this.$3)}],[51,[52]],[51,[51,21,52],function(){return new this.yy.MultiplicativeExpression(this.$1,"*",this.$3)}],[51,[51,22,52],function(){return new this.yy.MultiplicativeExpression(this.$1,"/",this.$3)}],[51,[51,23,52],function(){return new this.yy.MultiplicativeExpression(this.$1,"%",this.$3)}],[52,[24,52],function(){return new this.yy.UnaryExpression(this.$1)}],[52,[53]],[53,[25],function(){return new this.yy.StringNode(this.lexer.lineNumber,this.$1)}],[53,[27],function(){return new this.yy.NumberNode(this.lexer.lineNumber,this.$1)}],[53,[26],function(){return new this.yy.BooleanNode(this.lexer.lineNumber,this.$1)}],[53,[41]],[53,[9,42,10],function(){return this.$2}],[44,[54],function(){return new this.yy.HashNode(this.lexer.lineNumber,this.$1)}],[54,[54,55],function(){this.$1.push(this.$2)}],[54,[55],function(){return[this.$1]}],[55,[29,28,42],function(){return[this.$1,this.$3]}],[41,[56],function(){return new this.yy.IdNode(this.lexer.lineNumber,this.$1)}],[56,[56,30,29],function(){this.$1.push(this.$3)}],[56,[56,30,27],function(){this.$1.push(this.$3)}],[56,[29],function(){return[this.$1]}]],t.table={gotos:{0:{33:5,34:6,36:7,37:8,39:9},2:{40:11,41:12,56:13},3:{40:19,41:20,42:21,46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,56:13},4:{40:30,41:20,42:31,46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,56:13},6:{35:33,36:34,37:8,39:9},8:{33:35,34:6,36:7,37:8,39:9},12:{41:38,42:39,43:40,44:41,45:42,46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,54:43,55:44,56:13},14:{41:38,42:46,46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,56:13},15:{41:38,52:47,53:29,56:13},20:{41:38,42:39,43:40,44:41,45:42,46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,54:43,55:44,56:13},33:{34:66,36:7,37:8,39:9},35:{38:68},40:{41:38,42:39,44:70,45:71,46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,54:43,55:44,56:13},43:{55:73},50:{41:38,47:77,48:24,49:25,50:26,51:27,52:28,53:29,56:13},51:{41:38,48:78,49:25,50:26,51:27,52:28,53:29,56:13},52:{41:38,49:79,50:26,51:27,52:28,53:29,56:13},53:{41:38,49:80,50:26,51:27,52:28,53:29,56:13},54:{41:38,50:81,51:27,52:28,53:29,56:13},55:{41:38,50:82,51:27,52:28,53:29,56:13},56:{41:38,50:83,51:27,52:28,53:29,56:13},57:{41:38,50:84,51:27,52:28,53:29,56:13},58:{41:38,51:85,52:28,53:29,56:13},59:{41:38,51:86,52:28,53:29,56:13},60:{41:38,52:87,53:29,56:13},61:{41:38,52:88,53:29,56:13},62:{41:38,52:89,53:29,56:13},66:{36:34,37:8,39:9},67:{41:90,56:13},69:{41:38,42:91,46:22,47:23,48:24,49:25,50:26,51:27,52:28,53:29,56:13}},action:{0:{2:[1,0,1],3:[1,0,2],6:[1,0,3],7:[1,0,4]},1:{1:[2,7,0],2:[2,7,0],3:[2,7,0],4:[2,7,0],5:[2,7,0],6:[2,7,0],7:[2,7,0]},2:{29:[1,0,10]},3:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},4:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},5:{1:[0,0,0]},6:{1:[2,2,0],2:[1,0,1],3:[1,0,2],4:[2,2,0],5:[1,0,32],6:[1,0,3],7:[1,0,4]},7:{1:[2,3,0],2:[2,3,0],3:[2,3,0],4:[2,3,0],5:[2,3,0],6:[2,3,0],7:[2,3,0]},8:{2:[1,0,1],3:[1,0,2],6:[1,0,3],7:[1,0,4]},9:{1:[2,6,0],2:[2,6,0],3:[2,6,0],4:[2,6,0],5:[2,6,0],6:[2,6,0],7:[2,6,0]},10:{8:[2,56,0],9:[2,56,0],10:[2,56,0],11:[2,56,0],12:[2,56,0],13:[2,56,0],14:[2,56,0],15:[2,56,0],16:[2,56,0],17:[2,56,0],18:[2,56,0],19:[2,56,0],20:[2,56,0],21:[2,56,0],22:[2,56,0],23:[2,56,0],24:[2,56,0],25:[2,56,0],26:[2,56,0],27:[2,56,0],29:[2,56,0],30:[2,56,0]},11:{8:[1,0,36]},12:{8:[2,18,0],9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,37]},13:{8:[2,53,0],9:[2,53,0],10:[2,53,0],11:[2,53,0],12:[2,53,0],13:[2,53,0],14:[2,53,0],15:[2,53,0],16:[2,53,0],17:[2,53,0],18:[2,53,0],19:[2,53,0],20:[2,53,0],21:[2,53,0],22:[2,53,0],23:[2,53,0],24:[2,53,0],25:[2,53,0],26:[2,53,0],27:[2,53,0],29:[2,53,0],30:[1,0,45]},14:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},15:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},16:{8:[2,44,0],9:[2,44,0],10:[2,44,0],11:[2,44,0],12:[2,44,0],13:[2,44,0],14:[2,44,0],15:[2,44,0],16:[2,44,0],17:[2,44,0],18:[2,44,0],19:[2,44,0],20:[2,44,0],21:[2,44,0],22:[2,44,0],23:[2,44,0],24:[2,44,0],25:[2,44,0],26:[2,44,0],27:[2,44,0],29:[2,44,0]},17:{8:[2,46,0],9:[2,46,0],10:[2,46,0],11:[2,46,0],12:[2,46,0],13:[2,46,0],14:[2,46,0],15:[2,46,0],16:[2,46,0],17:[2,46,0],18:[2,46,0],19:[2,46,0],20:[2,46,0],21:[2,46,0],22:[2,46,0],23:[2,46,0],24:[2,46,0],25:[2,46,0],26:[2,46,0],27:[2,46,0],29:[2,46,0]},18:{8:[2,45,0],9:[2,45,0],10:[2,45,0],11:[2,45,0],12:[2,45,0],13:[2,45,0],14:[2,45,0],15:[2,45,0],16:[2,45,0],17:[2,45,0],18:[2,45,0],19:[2,45,0],20:[2,45,0],21:[2,45,0],22:[2,45,0],23:[2,45,0],24:[2,45,0],25:[2,45,0],26:[2,45,0],27:[2,45,0],29:[2,45,0]},19:{8:[1,0,48]},20:{8:[2,47,0],9:[1,0,14],11:[2,47,0],12:[2,47,0],13:[2,47,0],14:[2,47,0],15:[2,47,0],16:[2,47,0],17:[2,47,0],18:[2,47,0],19:[2,47,0],20:[2,47,0],21:[2,47,0],22:[2,47,0],23:[2,47,0],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,37]},21:{8:[1,0,49]},22:{8:[2,22,0],9:[2,22,0],10:[2,22,0],11:[1,0,50],24:[2,22,0],25:[2,22,0],26:[2,22,0],27:[2,22,0],29:[2,22,0]},23:{8:[2,23,0],9:[2,23,0],10:[2,23,0],11:[2,23,0],12:[1,0,51],24:[2,23,0],25:[2,23,0],26:[2,23,0],27:[2,23,0],29:[2,23,0]},24:{8:[2,25,0],9:[2,25,0],10:[2,25,0],11:[2,25,0],12:[2,25,0],13:[1,0,52],14:[1,0,53],24:[2,25,0],25:[2,25,0],26:[2,25,0],27:[2,25,0],29:[2,25,0]},25:{8:[2,27,0],9:[2,27,0],10:[2,27,0],11:[2,27,0],12:[2,27,0],13:[2,27,0],14:[2,27,0],15:[1,0,54],16:[1,0,55],17:[1,0,56],18:[1,0,57],24:[2,27,0],25:[2,27,0],26:[2,27,0],27:[2,27,0],29:[2,27,0]},26:{8:[2,30,0],9:[2,30,0],10:[2,30,0],11:[2,30,0],12:[2,30,0],13:[2,30,0],14:[2,30,0],15:[2,30,0],16:[2,30,0],17:[2,30,0],18:[2,30,0],19:[1,0,58],20:[1,0,59],24:[2,30,0],25:[2,30,0],26:[2,30,0],27:[2,30,0],29:[2,30,0]},27:{8:[2,35,0],9:[2,35,0],10:[2,35,0],11:[2,35,0],12:[2,35,0],13:[2,35,0],14:[2,35,0],15:[2,35,0],16:[2,35,0],17:[2,35,0],18:[2,35,0],19:[2,35,0],20:[2,35,0],21:[1,0,60],22:[1,0,61],23:[1,0,62],24:[2,35,0],25:[2,35,0],26:[2,35,0],27:[2,35,0],29:[2,35,0]},28:{8:[2,38,0],9:[2,38,0],10:[2,38,0],11:[2,38,0],12:[2,38,0],13:[2,38,0],14:[2,38,0],15:[2,38,0],16:[2,38,0],17:[2,38,0],18:[2,38,0],19:[2,38,0],20:[2,38,0],21:[2,38,0],22:[2,38,0],23:[2,38,0],24:[2,38,0],25:[2,38,0],26:[2,38,0],27:[2,38,0],29:[2,38,0]},29:{8:[2,43,0],9:[2,43,0],10:[2,43,0],11:[2,43,0],12:[2,43,0],13:[2,43,0],14:[2,43,0],15:[2,43,0],16:[2,43,0],17:[2,43,0],18:[2,43,0],19:[2,43,0],20:[2,43,0],21:[2,43,0],22:[2,43,0],23:[2,43,0],24:[2,43,0],25:[2,43,0],26:[2,43,0],27:[2,43,0],29:[2,43,0]},30:{8:[1,0,63]},31:{8:[1,0,64]},32:{8:[1,0,65]},33:{2:[1,0,1],3:[1,0,2],6:[1,0,3],7:[1,0,4]},34:{1:[2,4,0],2:[2,4,0],3:[2,4,0],4:[2,4,0],5:[2,4,0],6:[2,4,0],7:[2,4,0]},35:{4:[1,0,67]},36:{2:[2,8,0],3:[2,8,0],6:[2,8,0],7:[2,8,0]},37:{8:[2,56,0],9:[2,56,0],11:[2,56,0],12:[2,56,0],13:[2,56,0],14:[2,56,0],15:[2,56,0],16:[2,56,0],17:[2,56,0],18:[2,56,0],19:[2,56,0],20:[2,56,0],21:[2,56,0],22:[2,56,0],23:[2,56,0],24:[2,56,0],25:[2,56,0],26:[2,56,0],27:[2,56,0],28:[1,0,69],29:[2,56,0],30:[2,56,0]},38:{8:[2,47,0],9:[2,47,0],10:[2,47,0],11:[2,47,0],12:[2,47,0],13:[2,47,0],14:[2,47,0],15:[2,47,0],16:[2,47,0],17:[2,47,0],18:[2,47,0],19:[2,47,0],20:[2,47,0],21:[2,47,0],22:[2,47,0],23:[2,47,0],24:[2,47,0],25:[2,47,0],26:[2,47,0],27:[2,47,0],29:[2,47,0]},39:{8:[2,21,0],9:[2,21,0],24:[2,21,0],25:[2,21,0],26:[2,21,0],27:[2,21,0],29:[2,21,0]},40:{8:[2,16,0],9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,37]},41:{8:[2,17,0]},42:{8:[2,20,0],9:[2,20,0],24:[2,20,0],25:[2,20,0],26:[2,20,0],27:[2,20,0],29:[2,20,0]},43:{8:[2,49,0],29:[1,0,72]},44:{8:[2,51,0],29:[2,51,0]},45:{27:[1,0,74],29:[1,0,75]},46:{10:[1,0,76]},47:{8:[2,42,0],9:[2,42,0],10:[2,42,0],11:[2,42,0],12:[2,42,0],13:[2,42,0],14:[2,42,0],15:[2,42,0],16:[2,42,0],17:[2,42,0],18:[2,42,0],19:[2,42,0],20:[2,42,0],21:[2,42,0],22:[2,42,0],23:[2,42,0],24:[2,42,0],25:[2,42,0],26:[2,42,0],27:[2,42,0],29:[2,42,0]},48:{1:[2,11,0],2:[2,11,0],3:[2,11,0],4:[2,11,0],5:[2,11,0],6:[2,11,0],7:[2,11,0]},49:{1:[2,13,0],2:[2,13,0],3:[2,13,0],4:[2,13,0],5:[2,13,0],6:[2,13,0],7:[2,13,0]},50:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},51:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},52:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},53:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},54:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},55:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},56:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},57:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},58:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},59:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},60:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},61:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},62:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},63:{1:[2,10,0],2:[2,10,0],3:[2,10,0],4:[2,10,0],5:[2,10,0],6:[2,10,0],7:[2,10,0]},64:{1:[2,12,0],2:[2,12,0],3:[2,12,0],4:[2,12,0],5:[2,12,0],6:[2,12,0],7:[2,12,0]},65:{2:[2,14,0],3:[2,14,0],6:[2,14,0],7:[2,14,0]},66:{1:[2,1,0],2:[1,0,1],3:[1,0,2],4:[2,1,0],6:[1,0,3],7:[1,0,4]},67:{29:[1,0,10]},68:{1:[2,5,0],2:[2,5,0],3:[2,5,0],4:[2,5,0],5:[2,5,0],6:[2,5,0],7:[2,5,0]},69:{9:[1,0,14],24:[1,0,15],25:[1,0,16],26:[1,0,17],27:[1,0,18],29:[1,0,10]},70:{8:[2,15,0]},71:{8:[2,19,0],9:[2,19,0],24:[2,19,0],25:[2,19,0],26:[2,19,0],27:[2,19,0],29:[2,19,0]},72:{28:[1,0,69]},73:{8:[2,50,0],29:[2,50,0]},74:{8:[2,55,0],9:[2,55,0],10:[2,55,0],11:[2,55,0],12:[2,55,0],13:[2,55,0],14:[2,55,0],15:[2,55,0],16:[2,55,0],17:[2,55,0],18:[2,55,0],19:[2,55,0],20:[2,55,0],21:[2,55,0],22:[2,55,0],23:[2,55,0],24:[2,55,0],25:[2,55,0],26:[2,55,0],27:[2,55,0],29:[2,55,0],30:[2,55,0]},75:{8:[2,54,0],9:[2,54,0],10:[2,54,0],11:[2,54,0],12:[2,54,0],13:[2,54,0],14:[2,54,0],15:[2,54,0],16:[2,54,0],17:[2,54,0],18:[2,54,0],19:[2,54,0],20:[2,54,0],21:[2,54,0],22:[2,54,0],23:[2,54,0],24:[2,54,0],25:[2,54,0],26:[2,54,0],27:[2,54,0],29:[2,54,0],30:[2,54,0]},76:{8:[2,48,0],9:[2,48,0],10:[2,48,0],11:[2,48,0],12:[2,48,0],13:[2,48,0],14:[2,48,0],15:[2,48,0],16:[2,48,0],17:[2,48,0],18:[2,48,0],19:[2,48,0],20:[2,48,0],21:[2,48,0],22:[2,48,0],23:[2,48,0],24:[2,48,0],25:[2,48,0],26:[2,48,0],27:[2,48,0],29:[2,48,0]},77:{8:[2,24,0],9:[2,24,0],10:[2,24,0],11:[2,24,0],12:[1,0,51],24:[2,24,0],25:[2,24,0],26:[2,24,0],27:[2,24,0],29:[2,24,0]},78:{8:[2,26,0],9:[2,26,0],10:[2,26,0],11:[2,26,0],12:[2,26,0],13:[1,0,52],14:[1,0,53],24:[2,26,0],25:[2,26,0],26:[2,26,0],27:[2,26,0],29:[2,26,0]},79:{8:[2,28,0],9:[2,28,0],10:[2,28,0],11:[2,28,0],12:[2,28,0],13:[2,28,0],14:[2,28,0],15:[1,0,54],16:[1,0,55],17:[1,0,56],18:[1,0,57],24:[2,28,0],25:[2,28,0],26:[2,28,0],27:[2,28,0],29:[2,28,0]},80:{8:[2,29,0],9:[2,29,0],10:[2,29,0],11:[2,29,0],12:[2,29,0],13:[2,29,0],14:[2,29,0],15:[1,0,54],16:[1,0,55],17:[1,0,56],18:[1,0,57],24:[2,29,0],25:[2,29,0],26:[2,29,0],27:[2,29,0],29:[2,29,0]},81:{8:[2,32,0],9:[2,32,0],10:[2,32,0],11:[2,32,0],12:[2,32,0],13:[2,32,0],14:[2,32,0],15:[2,32,0],16:[2,32,0],17:[2,32,0],18:[2,32,0],19:[1,0,58],20:[1,0,59],24:[2,32,0],25:[2,32,0],26:[2,32,0],27:[2,32,0],29:[2,32,0]},82:{8:[2,34,0],9:[2,34,0],10:[2,34,0],11:[2,34,0],12:[2,34,0],13:[2,34,0],14:[2,34,0],15:[2,34,0],16:[2,34,0],17:[2,34,0],18:[2,34,0],19:[1,0,58],20:[1,0,59],24:[2,34,0],25:[2,34,0],26:[2,34,0],27:[2,34,0],29:[2,34,0]},83:{8:[2,31,0],9:[2,31,0],10:[2,31,0],11:[2,31,0],12:[2,31,0],13:[2,31,0],14:[2,31,0],15:[2,31,0],16:[2,31,0],17:[2,31,0],18:[2,31,0],19:[1,0,58],20:[1,0,59],24:[2,31,0],25:[2,31,0],26:[2,31,0],27:[2,31,0],29:[2,31,0]},84:{8:[2,33,0],9:[2,33,0],10:[2,33,0],11:[2,33,0],12:[2,33,0],13:[2,33,0],14:[2,33,0],15:[2,33,0],16:[2,33,0],17:[2,33,0],18:[2,33,0],19:[1,0,58],20:[1,0,59],24:[2,33,0],25:[2,33,0],26:[2,33,0],27:[2,33,0],29:[2,33,0]},85:{8:[2,36,0],9:[2,36,0],10:[2,36,0],11:[2,36,0],12:[2,36,0],13:[2,36,0],14:[2,36,0],15:[2,36,0],16:[2,36,0],17:[2,36,0],18:[2,36,0],19:[2,36,0],20:[2,36,0],21:[1,0,60],22:[1,0,61],23:[1,0,62],24:[2,36,0],25:[2,36,0],26:[2,36,0],27:[2,36,0],29:[2,36,0]},86:{8:[2,37,0],9:[2,37,0],10:[2,37,0],11:[2,37,0],12:[2,37,0],13:[2,37,0],14:[2,37,0],15:[2,37,0],16:[2,37,0],17:[2,37,0],18:[2,37,0],19:[2,37,0],20:[2,37,0],21:[1,0,60],22:[1,0,61],23:[1,0,62],24:[2,37,0],25:[2,37,0],26:[2,37,0],27:[2,37,0],29:[2,37,0]},87:{8:[2,39,0],9:[2,39,0],10:[2,39,0],11:[2,39,0],12:[2,39,0],13:[2,39,0],14:[2,39,0],15:[2,39,0],16:[2,39,0],17:[2,39,0],18:[2,39,0],19:[2,39,0],20:[2,39,0],21:[2,39,0],22:[2,39,0],23:[2,39,0],24:[2,39,0],25:[2,39,0],26:[2,39,0],27:[2,39,0],29:[2,39,0]},88:{8:[2,40,0],9:[2,40,0],10:[2,40,0],11:[2,40,0],12:[2,40,0],13:[2,40,0],14:[2,40,0],15:[2,40,0],16:[2,40,0],17:[2,40,0],18:[2,40,0],19:[2,40,0],20:[2,40,0],21:[2,40,0],22:[2,40,0],23:[2,40,0],24:[2,40,0],25:[2,40,0],26:[2,40,0],27:[2,40,0],29:[2,40,0]},89:{8:[2,41,0],9:[2,41,0],10:[2,41,0],11:[2,41,0],12:[2,41,0],13:[2,41,0],14:[2,41,0],15:[2,41,0],16:[2,41,0],17:[2,41,0],18:[2,41,0],19:[2,41,0],20:[2,41,0],21:[2,41,0],22:[2,41,0],23:[2,41,0],24:[2,41,0],25:[2,41,0],26:[2,41,0],27:[2,41,0],29:[2,41,0]},90:{8:[1,0,92]},91:{8:[2,52,0],29:[2,52,0]},92:{1:[2,9,0],2:[2,9,0],3:[2,9,0],4:[2,9,0],5:[2,9,0],6:[2,9,0],7:[2,9,0]}}},t.parse=function(t){var i,s,r,o=this,u=o.lexer,p=o.table,a=p.gotos,h=p.action,l=o.productions,c=[null],f=[0];for(u.resetInput(t);;){if(i=f[f.length-1],s||(s=u.lex()),!s)return e.log("it is not a valid input: "+t,"error"),!1;if(r=h[i]&&h[i][s],!r){var m,y=[];return h[i]&&e.each(h[i],function(t,e){y.push(o.lexer.mapReverseSymbol(e))}),m="parse error at line "+u.lineNumber+":\n"+u.showDebugInfo()+"\nexpect "+y.join(", "),e.error(m),!1}switch(r[n.TYPE_INDEX]){case n.SHIFT_TYPE:f.push(s),c.push(u.text),f.push(r[n.TO_INDEX]),s=null;break;case n.REDUCE_TYPE:var d,v,E=l[r[n.PRODUCTION_INDEX]],x=E.symbol||E[0],N=E.action||E[2],g=E.rhs||E[1],$=g.length,S=c[c.length-$];for(o.$$=S,d=0;$>d;d++)o["$"+($-d)]=c[c.length-1-d];N&&(v=N.call(o)),S=void 0!==v?v:o.$$,$&&(f=f.slice(0,-1*$*2),c=c.slice(0,-1*$)),f.push(x),c.push(S);var T=a[f[f.length-2]][f[f.length-1]];f.push(T);break;case n.ACCEPT_TYPE:return S}}return void 0},t});KISSY.add("cute/grid/tpl",function(){"use strict";var i=["<tr>",'<td class="no-query-td">',"{{{noQueryMessage}}}","</td>","</tr>"].join(""),t=["<tr>",'<td class="no-data-td">',"{{{noDataMessage}}}","</td>","</tr>"].join("");return{_commands:{},_gridTpl:!1,_gridsTpl:!1,grid:["{{set rowIndex=xindex}}",'<tr class="cute-grid-tr grid-{{id}}',"{{@if zebra}}","{{@if rowIndex%2===1}}"," zebra","{{/if}}",'{{/if}}"',' _rowid="{{id}}"',">","{{@if isSelect}}",'<td class="cute-grid-td grid-checkbox-td"',"{{@if rowSpan}}",' rowspan="{{rowSpan}}"',"{{/if}}",">",'<input type="checkbox" class="{{rowCheckboxCls}} outline-0"/>',"</td>","{{/if}}","{{@if hasOrderCol}}",'<td class="cute-grid-td grid-order-td"',"{{@if rowSpan}}",' rowspan="{{rowSpan}}"',"{{/if}}",">","{{xindex+1}}","</td>","{{/if}}","{{@each cell}}","{{@if newRow}}","</tr>",'<tr class="cute-grid-tr grid-{{id}}',"{{@if zebra}}","{{@if rowIndex%2===1}}"," zebra","{{/if}}",'{{/if}}"',' _rowid="{{id}}"',">","{{/if}}","<td",' _name="{{name}}"',"{{@if width}}",' width="{{width}}"',"{{/if}}",' class="cute-grid-td cute-grid-cell header_{{name}}{{@if hidden}} hidden{{/if}}','"{{@if rowspan}}',' rowspan="{{rowspan}}"',"{{/if}}","{{@if colspan}}",' colspan="{{colspan}}"',"{{/if}}",' style="',"{{@if style}}","{{style}}",'{{/if}}"',">","{{set hasTipDomClass=false}}","{{@if enableTip}}","{{@if enableCellTip}}","{{@if tip!==false}}","{{@if tip}}","{{set hasTipDomClass=true}}","{{else}}{{@if ellipsis}}","{{set hasTipDomClass=true}}","{{else}}{{@if copy}}","{{set hasTipDomClass=true}}","{{/if}}{{/if}}{{/if}}","{{/if}}","{{/if}}","{{/if}}",'<div class="',"{{@if hasTipDomClass}}","tip-dom","{{/if}}","{{@if ellipsis}}"," text-ellipsis",'{{/if}}"',"{{@if tip}}",' _showtext="{{tip.showText}}"',' _copy="{{tip.copy}}"',' _text="{{tip.text}}"',' _ishtml="{{tip.isHtml}}"',' _canhover="{{tip.canHover}}"',' _textel="{{tip.textEl}}"',' _copyel="{{tip.copyEl}}"',"{{else}}",' _showtext="{{ellipsis}}"',' _copy="{{copy}}"',"{{/if}}",">","{{@if isHtml}}","{{{value}}}","{{else}}","{{value}}","{{/if}}","</div>","</td>","{{/each}}","</tr>"].join(""),grids:["<table",' class="table"',' style="{{@if totalWidth}}width:{{totalWidth}}px;{{/if}}"',">","<tbody>","{{^if dataLen}}","{{@if init}}","{{@if autoload}}",t,"{{else}}",i,"{{/if}}","{{else}}",t,"{{/if}}","{{else}}","{{@each grids}}","{{_grid}}","{{/each}}","{{/if}}","</tbody>","</table>"].join(""),toolbarConfig:["<table>",'<tr class="grid-list-config-detail1">','<td  class="grid-list-config-detail3 title0 text-ellipsis">删减列</td>',"</tr>",'<tr class="grid-list-config-detail1">',"{{@each cols}}","{{@if title}}",'<td  class="grid-list-config-detail2 text-ellipsis">',"<label>",'<input class="grid-list-config-detail2-check grid-list-config-detail2-{{name}}" name ="box" value="{{name}}" type="checkbox"/>',"{{title}}","</label>","</td>","{{@if ((xindex+1)%4)===0}}","</tr>",'<tr class="grid-list-config-detail1">',"{{/if}}","{{/if}}","{{/each}}","</tr>","</table>"].join(""),toolbar:['<table class="table{{@if hideToolbar}} display-none{{/if}}">',"<tbody>",'<tr class="grid-toolbar-tr">',"<td>",'<div class="grid-toolbar-left">',"{{@if isSelect}}",'<label class="grid-checkbox-label"><input type="checkbox" class="{{mainCheckboxCls}} outline-0"/>全选</label>',"{{/if}}",'<div class="grid-toolbar-buttons"></div>','<div class="grid-custom-left"></div>',"</div>",'<div class="grid-toolbar-right">','<div class="grid-custom-right"></div>','<div class="grid-info" style="{{@if hasPagination}}margin-right:10px;{{/if}}">',"{{^if hidePageSize}}",'<div class="grid-info-item grid-pageSize">','<span class="grid-info-item-text">','{{{include "pageSizeTpl"}}}',"</span>",'<span class="grid-info-item-separator">，</span>',"</div>","{{/if}}","{{^if hideTotalCount}}",'<div class="grid-info-item grid-totalCount">','<span class="grid-info-item-text">','{{{include "totalCountTpl"}}}',"</span>",'<span class="grid-info-item-separator">，</span>',"</div>","{{/if}}","</div>",'<div class="grid-pagination"></div>',"{{@if gridConfig}}",'<div class="grid-list-config"',' style="',"{{@if hideConfigMenu}}display:none;{{/if}}",'">','<div class="grid-list-config-iconfont icon-e600">',"</div>",'<div class="grid_list_config_tirAngle hide"></div>','<div class="grid_list_config_tirAngle-mask hide"></div>','<div class="grid-list-config-detail hide"></div>',"</div>","{{/if}}","</div>","</td>","</tr>","</tbody>","</table>"].join(""),head:["<table",' class="table{{@if hideHeader}} display-none{{/if}}"',' style="{{@if totalWidth}}width:{{totalWidth}}px;{{/if}}"',">","<thead>","<tr>","{{@if isSelect}}",'<th class="cute-grid-th grid-checkbox-th">',"</th>","{{/if}}","{{@if hasOrderCol}}",'<th class="cute-grid-th grid-order-th">',"序号","</th>","{{/if}}","{{@each cols}}","{{@if title}}",'<th class="cute-grid-th cute-grid-cell header_{{name}}',"{{@if sortable}}"," grid-sortable","{{@if name===sortField}}"," grid-sort-",'{{@if sortDir==="desc"}}',"desc","{{else}}","asc","{{/if}}","{{/if}}",'{{/if}}{{@if hidden}} hidden{{/if}}"',"{{@if sortable}}",' _sortfield="{{name}}"',"{{/if}}","{{@if width}}"," width={{width}}","{{/if}}",">",'<table class="th-table" border="0" cellpadding="0" cellspacing="0">',"<tr>",'<td class="th-title-td"',' style="',"{{@if style}}","{{style}}",'{{/if}}"',">","{{set hasTipDomClass=false}}","{{@if enableTip}}","{{@if enableHeadTip}}","{{@if titleTip!==false}}","{{@if titleTip}}","{{set hasTipDomClass=true}}","{{else}}{{@if titleEllipsis}}","{{set hasTipDomClass=true}}","{{else}}{{@if titleTipText}}","{{set hasTipDomClass=true}}","{{/if}}{{/if}}{{/if}}","{{/if}}","{{/if}}","{{/if}}",'<div class="',"{{@if hasTipDomClass}}","tip-dom","{{/if}}","{{@if titleEllipsis}}"," text-ellipsis",'{{/if}}"',"{{@if titleTip}}",' _showtext="{{titleTip.showText}}"',' _copy="{{titleTip.copy}}"',' _text="{{titleTip.text}}"',' _ishtml="{{titleTip.isHtml}}"',' _canhover="{{titleTip.canHover}}"',' _textel="{{titleTip.textEl}}"',' _copyel="{{titleTip.copyEl}}"',"{{else}}","{{set titleTipShowText=false}}","{{@if titleEllipsis}}","{{set titleTipShowText=true}}","{{else}}{{@if titleTipText}}","{{set titleTipShowText=true}}","{{/if}}{{/if}}",' _showtext="{{titleTipShowText}}"',' _text="{{titleTipText}}"',"{{/if}}",">","{{@if titleHtml}}","{{{titleHtml}}}","{{else}}","{{title}}","{{/if}}","</div>","</td>","{{@if sortable}}",'<td class="th-sort-td">','<div class="th-sort-div">','<i class="icon-arrow icon-arrow-up grid-sort"></i>','<i class="icon-arrow icon-arrow-down grid-sort"></i>',"</div>","</td>","{{/if}}","</tr>","</table>","</th>","{{/if}}","{{/each}}","</tr>","</thead>","</table>"].join("")}});KISSY.add("cute/grid/gridview",function(e,c,t,l){"use strict";function r(e){var c=this,t=e.grid,l=t.get("rowCheckboxCls"),s=e.events=e.events||{};s["."+l]={click:"changeCheckbox"},r.superclass.constructor.apply(c,arguments),c.bind()}var s=c.all;return e.extend(r,l.View,{bind:function(){var e=this,c=e.get("model"),t=e.get("el"),l=e.get("grid");c.on("check",function(){var e=c.isChecked(),r=l.get("checkedCls");e?t.addClass(r):t.removeClass(r);var s=l.get("rowCheckboxCls");t.all("."+s).prop("checked",e)})},changeCheckbox:function(e){var c=this,t=s(e.currentTarget),l=t.prop("checked"),r=c.get("model"),d=r.isChecked(),n=[];d!=l&&(r.setChecked(l),n.push(r));var i=c.get("grid");i.fire("check",{checkedModels:i.getCheckedModels(),changeModels:n})}},{ATTRS:{el:{value:null},model:{value:null},grid:{value:null},events:{value:{}}}}),r},{requires:["node","sizzle","cute/mvc/"]});KISSY.add("cute/grid/paginationview",function(e,t,n,r,i){"use strict";function a(){var e=this;a.superclass.constructor.apply(e,arguments)}t.all;return e.extend(a,r.View,{render:function(){var e=this;return e.p=new i({target:e.get("el"),dataLen:e.get("dataLen"),per:e.get("per"),current:e.get("current")}),e},update:function(e){var t=this;t.p.init(e)},destroy:function(){this.p.destroy()}},{ATTRS:{el:{value:""},events:{value:{}}}}),a},{requires:["node","sizzle","cute/mvc/","cute/pagination/"]});KISSY.add("cute/pagination/index",function(t,e,n,a,s,r){"use strict";function i(e){var n=this;i.superclass.constructor.call(n,e);var a=n.get("events");t.each(a,function(t,e){n.on(e,t)}),n.init(),n.fire("create")}var u=e.all,c='<div class="pagination"><span class="first btn btn-s btn-weak icon-e60e"></span><span class="prev btn btn-s btn-weak icon-e60d"></span><input type="text" class="text current" value="{{current}}" title="输入页数回车跳转" /><b> / {{pages}}</b><span class="next btn btn-s btn-weak icon-e60f"></span><span class="last btn btn-s btn-weak icon-e603"></span></div>',l=".current",p="prev",g="next",d="first",v="last",o="btn-disabled";return t.extend(i,a,{page:function(t){var e=this,n=parseInt(t,10),a=e.getPages(),s=u(l,e.get("target"));isNaN(n)?(s.val(e.get("current")),e.refreshInputWidth()):(1>n&&(n=1),n>a&&(n=a),s.val(n),e.refreshInputWidth(),n!==e.get("current")&&(e.set("current",n),e.fire("page",{current:e.get("current")})))},prev:function(){var t=this;t.page(t.get("current")-1)},next:function(){var t=this;t.page(t.get("current")+1)},updateUI:function(){var t=this,e=t.get("current"),n=t.getPages();n>e?(t.nextBtn.removeClass(o),t.lastBtn.removeClass(o)):(t.nextBtn.addClass(o),t.lastBtn.addClass(o)),e>1?(t.prevBtn.removeClass(o),t.firstBtn.removeClass(o)):(t.prevBtn.addClass(o),t.firstBtn.addClass(o))},getPages:function(){var t=this,e=t.get("pages");if(!e){var n=t.get("dataLen"),a=t.get("per");e=n&&a?Math.ceil(n/a):1}return e},renderUI:function(){var t=this,e=t.get("target"),n=new s(c).render({current:t.get("current"),pages:t.getPages()});e.html(n),t.inputEl=u(l,e),t.refreshInputWidth()},refreshInputWidth:function(){var t=this,e=t.inputEl,n=e.val(),a=r.getTextWidth(n)+6;22>a&&(a=22),e.css("width",a)},bindUI:function(){var t=this,e=t.get("target"),n=t.inputEl;e.delegate("click","span",function(e){var n=u(e.currentTarget);n.hasClass(p)&&t.prev(),n.hasClass(g)&&t.next(),n.hasClass(d)&&t.page(1),n.hasClass(v)&&t.page(t.getPages())}),n.on("blur",function(){t.page(n.val())}),n.on("keyup",function(e){13===e.keyCode&&t.page(n.val())}),n.on("input",function(){t.refreshInputWidth()}),t.on("page",t.updateUI)},unbind:function(){var t=this,e=t.get("target"),n=u(l,e);e.undelegate("click","span"),n.detach("blur"),n.detach("keyup"),n.detach("input"),t.detach("page",t.updateUI)},init:function(e){var n=this,a=n.get("target");t.each(e,function(t,e){n.set(e,t)}),n.unbind(),n.renderUI(),n.prevBtn=u("."+p,a),n.nextBtn=u("."+g,a),n.firstBtn=u("."+d,a),n.lastBtn=u("."+v,a),n.updateUI(),n.bindUI()}},{ATTRS:{target:{setter:function(t){return u(t)}},current:{value:1},pages:{value:0},dataLen:{value:0},per:{value:20},events:{value:{}}}}),i},{requires:["node","sizzle","base","xtemplate","cute/util/","cute/util/statistic"]});KISSY.add("cute/tab/index",function(e,t,a,i,l,r,n){"use strict";function s(t){var a=this;e.isString(t)&&(t={target:t}),s.superclass.constructor.call(a,t);var i=a.get("events");e.each(i,function(e,t){a.on(t,e)}),a.init(),a.fire("create")}var o=t.all;return e.extend(s,i,{renderUI:function(){var e=this,t=e.get("level"),a=e.tabEl;if(1==t)e.slideEl=o(e.slideTpl).prependTo(a),e.refreshSlideEl();else{e.tabListArrowEl=o(e.arrowTpl).appendTo(a);var i=e.tabListEl=o(e.listTpl).appendTo(document.body);e.itemsWrapperEl=i.one(".tab-itemsWrapper"),e.itemsEl=i.one(".tab-items"),e.initScrollbar()}var l=e.targetEl;l.addClass("tab-wrapper-"+t);var r=e.getActiveTab();r&&r.length||e.go(0)},bindUI:function(){var t=this,a=t.tabEl;a.delegate("click","li em",function(e){o(document).fire("click",e),e.stopPropagation()});var i=t.get("level");if(1==i){var l=t.get("navClass");a.delegate("mouseenter","ul."+l+" li",function(e){t.refreshSlideEl(o(e.currentTarget))}),a.delegate("mouseleave","ul."+l+" li",function(){t.refreshSlideEl()}),o(window).on("resize",e.buffer(function(){t.refreshSlideEl()},10))}else{var r=t.tabListArrowEl;r.on("click",function(){t.get("listPopup")?t.hideList():t.showList()});var n=t.tabListEl;n.on("click",function(e){e.stopPropagation()}),n.delegate("click",".tab-item",function(e){var a=o(e.currentTarget);if(!a.hasClass("disabled")){var i=parseFloat(a.attr("_index"));t.go(i),t.hideList()}}),o(window).on("resize",e.buffer(function(){t.refreshTabListArrow(),t.hideList()},10)),o(document).on("click",function(e){var a=e.target,i=t.tabListArrowEl;a!=i[0]&&a!=i.one(".tab-list-arrow-icon")[0]&&t.hideList()}),t.on("tabChange add clear remove",function(){t.refreshTabListArrow()}),t.refreshTabListArrow()}a.delegate("click","li",function(e){t.go(t.index(o(e.currentTarget)),!0)}),a.delegate("click",".close-icon",function(e){var a=o(e.currentTarget),i=a.parent("li"),l=t.index(i);t.remove(l),o(document).fire("click",e),e.stopPropagation()}),t.on("tabChange",function(e){t.set("currentIndex",e.index)})},disable:function(e){var t=this,a=t.getTab(e);a.addClass("disabled")},enable:function(e){var t=this,a=t.getTab(e);a.removeClass("disabled")},initVar:function(){var t=this,a=t.get("target"),i=t.get("navClass"),l=a.children("."+i);a.hasClass("tab-wrapper-1")?t.set("level",1):a.hasClass("tab-wrapper-2")?t.set("level",2):l.hasClass("tab-1")?t.set("level",1):t.set("level",2);var r=t.get("contentClass"),n=a.children("."+r);e.mix(t,{targetEl:a,tabEl:l,contentEl:n})},initTpl:function(){var e=this;e.tabTpl=new l(n.tab),e.panelTpl=new l(n.panel),e.slideTpl=n.slide,e.arrowTpl=n.arrow,e.listTpl=n.list,e.itemsTpl=new l(n.items),e.noDataTpl=n.noData},initScrollbar:function(){var e=this;e.set("scrollbar",new r({target:e.itemsWrapperEl}))},init:function(){var e=this;e.initVar(),e.initTpl(),e.renderUI(),e.bindUI()},refreshSlideEl:function(e){var t=this,a=t.slideEl;if(a)if(e=e||t.getActiveTab(),e&&e.length){var i=t.tabEl;a.css({width:e.outerWidth(),left:e.offset().left-i.offset().left})}else a.css({width:0,left:0})},getTabs:function(){var e=this,t=e.tabEl;return t.children("li")},getTab:function(e){var t=this,a=t.getTabs();return a.item(e)},getFirstEnableTab:function(){var e=this,t=e.getTabs(),a=null;return t.each(function(e){return e.hasClass("disabled")?void 0:(a=e,!1)}),a},getActiveTab:function(){var e=this,t=e.tabEl,a=e.get("selectedClass"),i=t.children("."+a);if(!i.length){var l=e.get("level");i=t.children(1==l?".active-1":".active-2")}return i},getPanels:function(){var e=this,t=e.contentEl,a=e.get("panelClass");return t.children("."+a)},getPanel:function(e){var t=this,a=t.getPanels();return a.item(e)},count:function(){var e=this,t=e.getTabs();return t.length},index:function(e){var t=this;if(!e||!e.length)return-1;var a=t.getTabs();return a.index(e)},go:function(e,t){var a=this,i=a.count();if(!(0>e||e>=i)){var l=a.getTab(e);if(!l.hasClass("disabled")){var r=a.getActiveTab(),n=a.index(r),s=a.getPanel(e),o=a.getPanel(n);if(e!=n){var c={tabIndex:e,el:l,panelEl:s,oldEl:r,oldPanelEl:o,index:e,tab:l,panel:s,oldIndex:n,oldTab:r,oldPanel:o},d=a.fire("beforeTabChange",c);if(d===!1)return;var f=a.get("selectedClass");l.addClass(f).siblings().removeClass(f+" active-1 active-2"),o.attr("data-position",o.css("position")).css("position","absolute"),s.css("position",s.attr("data-position")),s.replaceClass("hide","show").siblings().replaceClass("show","hide"),a.refreshSlideEl(l),a.fire("tabChange",c)}t&&a.fire("tabClick",{tabIndex:e,el:l,panelEl:s,index:e,tab:l,panel:s}),a.fire("go",{index:e,tab:l,panel:s})}}},add:function(e,t){var a=this,i=a.tabEl,l=a.tabTpl,r=o(l.render(e)).appendTo(i),n=a.contentEl,s=a.panelTpl,c=o(s.render(e)).appendTo(n);t&&t.call(a,c,r);var d=a.index(r);a.go(d),a.fire("add",{index:d,tab:r,panel:c})},clear:function(){var e=this,t=e.getTabs();t&&t.length&&t.remove();var a=e.getPanels();a&&a.length&&a.remove(),e.fire("clear")},isActiveTab:function(e){var t=this,a=t.get("selectedClass"),i=t.get("level");return e.hasClass(a)||e.hasClass(1==i?"active-1":"active-2")},remove:function(e){var t=this,a=t.getTab(e),i=t.getPanel(e),l=t.fire("beforeRemove",{index:e,tab:a,panel:i});if(l!==!1){var r=t.isActiveTab(a);if(a.remove(),i.remove(),r){for(var n=t.getTabs(),s=null,o=e,c=n.length;c>o;o++){var d=n.item(o);if(!d.hasClass("disabled")){s=d;break}}if(!s)for(var o=e-1;o>=0;o--){var d=n.item(o);if(!d.hasClass("disabled")){s=d;break}}s&&t.go(t.index(s))}t.refreshSlideEl(),t.fire("remove",{index:e})}},refreshTabListArrow:function(){var e=this,t=e.getTabs();t.show();var a=!1;t.each(function(t){var i=t.offset().top-e.tabEl.offset().top;return i?(a=!0,!1):void 0});var i=e.tabListArrowEl;a?i.show():i.hide();var l=e.getActiveTab();if(l&&l.length)for(var r=l,n=e.tabEl;l.offset().top-n.offset().top;){var s=r.prev("li");if(!s||!s.length)break;s.hide(),r=s}},getListData:function(){var e=this,t=[],a=e.getTabs(),i=e.tabEl;return a.each(function(e,a){("none"==e.css("display")||e.offset().top-i.offset().top)&&t.push({index:a,disabled:e.hasClass("disabled"),title:e.one(".tab-title").text()})}),t},showList:function(){var t=this,a=t.getListData(),i=t.tabListEl,l=t.itemsWrapperEl,r=t.itemsEl,n=t.noDataTpl;a&&a.length?(a=e.clone(a),r.html(t.itemsTpl.render({items:a}))):r.html(n),l.scrollTop(0);var s=t.tabListArrowEl,o=s.offset();i.css({left:o.left-i.outerWidth()+s.outerWidth(),top:o.top+s.outerHeight()}),t.get("scrollbar").refresh(),t.set("listPopup",!0),t.fire("showList")},hideList:function(){var e=this,t=e.tabListEl;t.css({left:-1e4,top:-1e4}),e.get("scrollbar").refresh(),e.set("listPopup",!1),e.fire("hideList")},destroy:function(){}},{ATTRS:{level:{value:1},target:{value:null,setter:function(e){return o(e)}},navClass:{value:"tab"},selectedClass:{value:"active"},contentClass:{value:"tab-content"},panelClass:{value:"tab-panel"},scrollbar:{value:null},events:{value:{}},currentIndex:{value:0},listPopup:{value:!1}}}),s},{requires:["node","sizzle","base","xtemplate","cute/scrollbar/","cute/tab/tpl","cute/util/statistic"]});KISSY.add("cute/tab/tpl",function(){"use strict";return{tab:['<li class="',"{{@if closable}}closable{{/if}} ","{{@if disabled}}disabled{{/if}} ",'{{@if ellipsis}}text-ellipsis tab-ellipsis{{/if}}" ','style="{{style}}"',">",'<span class="tab-title"{{@if ellipsis}} title="{{title}}"{{/if}}>',"{{title}}","</span>","<i></i>","<em></em>",'<div class="close-icon icon-e613"></div>',"</li>"].join(""),panel:['<div class="tab-panel">',"{{{html}}}","</div>"].join(""),slide:'<div class="tab-slide"></div>',arrow:['<div class="tab-list-arrow">','<span class="tab-list-arrow-icon icon-e601"></span>',"</div>"].join(""),list:['<div class="cute-list tab-list">','<div class="list-itemsWrapper tab-itemsWrapper scrollbar">','<ul class="list-items tab-items"></ul>',"</div>","</div>"].join(""),items:["{{@each items}}",'<li class="',"list-item tab-item ","{{@if disabled}}disabled{{/if}} ",'text-ellipsis" ','_index="{{index}}" ','title="{{title}}"',">","{{title}}","</li>","{{/each}}"].join(""),noData:['<li class="list-item tab-item disabled">',"无数据","</li>"].join("")}},{requires:[]});

/**
 * @class Calendar
 * @author wenhan.wwh
 * 日历控件，[查看例子请点击这里](http://cute.alisec.org/calendar.html)
 *
 *      //html结构请打开例子查看
 *      KISSY.use('node,cute/calendar/,cute/auth/',function(S,Node,Calendar,Auth){
 *          var $=Node.all;
 *          var formDomId='form';
 *          var formEl=$('#'+formDomId);
 *          formEl.on('submit',function(){
 *              return false;
 *          });
 *
 *          //实例化Auth表单校验框架
 *          var auth=new Auth('#'+formDomId,{submitTest:false});
 *          //添加自定义验证规则
 *          auth.register('_date_validator',Calendar.dateValidator);
 *          //验证成功事件
 *          auth.on('success',function(e){
 *              //submit form
 *          });
 *          auth.render();
 *
 *          //单日历
 *          new Calendar({
 *              target:'#date',
 *              auth:auth,
 *              showTime:true,
 *              value:'2013-12-12 12:12:12'
 *          });
 *          //双日历
 *          new Calendar({
 *              target:'#startDate',
 *              auth:auth,
 *              showTime:true,
 *              value:['2013-12-12 00:00:00','2013-12-12 23:59:59']
 *          });
 *
 *          $('#queryBtn').on('click',function(){
 *              auth.test();
 *          });
 *      });
 */
KISSY.add('cute/calendar/index', function (S, Node, Sizzle, Base, Util, Cal) {
    'use strict';
    var $ = Node.all;

    function Calendar(config) {
        var self = this;
        if (S.isString(config)) {
            config = {target: config};
        }
        Calendar.superclass.constructor.call(self, config);
        var events = self.get('events');
        S.each(events, function (eventFn, eventName) {
            self.on(eventName, eventFn);
        });
        self.init();
        self.fire('create');
    }

    S.mix(Calendar, Util.CalendarUtil);
    S.extend(Calendar, Base, {
        /**
         * 判断日期字符串是否合法。
         * @param {String} value 日期字符串
         * @return {Boolean}
         */
        isValid: function (value) {
            var self = this;
            var showTime = self.get('showTime');
            var regExp;
            if (showTime) {
                regExp = Calendar.dateTimeReg;
            } else {
                regExp = Calendar.dateReg;
            }
            var valueArr = S.makeArray(value);
            return S.every(valueArr, function (value) {
                return regExp.test(value);
            });
        },
        /**
         * 获取日历控件的值。
         * @param {Boolean} returnDate 是否返回Date对象
         * @return {String|Date|Array}
         */
        getValue: function (returnDate) {
            var self = this;
            var target = self.get('target');
            var blankValue = (returnDate ? null : '');
            if (!target || !target.length) {
                return blankValue;
            } else if (target.length == 1) {
                var value = target.val();
                return self.isValid(value) ? (returnDate ? Calendar.parseDate(value) : value) : blankValue;
            } else {
                var valueArr = [];
                target.each(function (el) {
                    var value = el.val();
                    valueArr.push(self.isValid(value) ? (returnDate ? Calendar.parseDate(value) : value) : blankValue);
                });
                return valueArr;
            }
        },
        /**
         * 设置日历控件的值。
         * @param {String|Date|Array} value
         */
        setValue: function (value) {
            var self = this;
            var showTime = self.get('showTime');
            var valueArr = Util.getArray(value);
            S.each(valueArr, function (aValue, index) {
                if (S.isDate(aValue)) {
                    valueArr[index] = Calendar.formatDate(aValue, showTime);
                }
            });
            var target = self.get('target');
            if (target && target.length) {
                if (target.length == 1) {
                    var aValue = valueArr[0];
                    target.val(self.isValid(aValue) ? aValue : '');
                } else {
                    target.each(function (el, index) {
                        var aValue = valueArr[index];
                        el.val(self.isValid(aValue) ? aValue : '');
                    });
                }
            }
        },
        validate: function (el) {
            var self = this;
            var auth = self.get('auth');
            if (!auth) {
                var widget = $(el[0].form).data('widget');
                if (widget) {
                    auth = widget.get('auth');
                }
            }
            if (auth) {
                var authField = auth.getField(el.attr("name"));
                authField && authField.test();
            }
        },
        /**
         * 初始化日期控件。
         * @param el
         * @param index
         * @private
         */
        initCal: function (el, index) {
            var self = this;
            var showTime = self.get('showTime');
            var minDate = self.get('minDate');
            var maxDate = self.get('maxDate');
            if (index != null) {
                if (minDate) {
                    minDate = minDate[index];
                }
                if (maxDate) {
                    maxDate = maxDate[index];
                }
            }
            if (showTime) {
                el.attr('_showtime', 'true');
            }
            var dom = el[0];
            var nowDate = new Date();
            var config = {
                //弹出形式
                popup: true,
                //选择日期后关闭
                closable: true,
                //选中指定日期
                selected: nowDate,
                //展示当前日期所在月份
                date: nowDate,
                //是否显示时间
                showTime: showTime
            };
            if (minDate) {
                config.minDate = minDate;
            }
            if (maxDate) {
                config.maxDate = maxDate;
            }
            //初始化日历控件
            var cal = new Cal(dom, config, self, index, self.get('align'));
            //选择日期
            cal.on(showTime ? "timeSelect" : "select", function (e) {
                var d = e.date;
                //插入日期
                el.val(Calendar.formatDate(d, showTime));
                self.validate(el);
            });
            cal.con.on('click', function (e) {
                e.stopPropagation();
            });
            var cals = self.get('cals');
            cals.push(cal);
        },
        /**
         * 控件渲染方法。
         * @private
         */
        renderUI: function () {
            var self = this;
            var target = self.get('target');
            target.wrap('<div class="calendar-wrapper"></div>');
            var wrapper = $();
            var closeIcon = $();
            target.each(function (aTarget) {
                var parentEl = aTarget.parent();
                if (aTarget.prop('readonly')) {
                    parentEl.addClass('readonly');
                }
                wrapper = wrapper.add(parentEl);
                var icon = $('<div class="calendar-close-icon icon-e613"></div>');
                parentEl.append(icon);
                closeIcon = closeIcon.add(icon);
            });
            self.wrapper = wrapper;
            self.closeIcon = closeIcon;
        },
        /**
         * 控件事件绑定方法。
         * @private
         */
        bindUI: function () {
            var self = this;
            var target = self.get('target');
            var targetLen = target.length;
            target.each(function (el, index) {
                self.initCal(el, targetLen == 2 ? index : null);
            });
            target.on('input', function (e) {
                var currentTarget = e.currentTarget;
                var currentTargetEl = $(currentTarget);
                /*var closeIconEl=currentTargetEl.next('.calendar-close-icon');
                 if(currentTargetEl.val()){
                 closeIconEl.css({
                 right:22,
                 top:8
                 });
                 }else{
                 closeIconEl.css({
                 right:10000,
                 top:-10000
                 });
                 }*/
                var wrapper = currentTargetEl.parent();
                if (currentTargetEl.val()) {
                    wrapper.addClass('show-close-icon');
                } else {
                    wrapper.removeClass('show-close-icon');
                }
            });
            var closeIcon = self.closeIcon;
            closeIcon.on('click', function (e) {
                var currentTarget = e.currentTarget;
                var currentTargetEl = $(currentTarget);
                /*var calendarEl=currentTargetEl.css({
                 right:10000,
                 top:-10000
                 }).prev('.calendar');*/
                var wrapper = currentTargetEl.parent();
                wrapper.removeClass('show-close-icon');
                var calendarEl = currentTargetEl.prev('.calendar');
                calendarEl.val('');
                self.validate(calendarEl);
            });
            var wrapper = self.wrapper;
            wrapper.on('mouseenter', function (e) {
                var currentTarget = e.currentTarget;
                var currentTargetEl = $(currentTarget);
                if (currentTargetEl.one('.calendar').val()) {
                    /*currentTargetEl.one('.calendar-close-icon').css({
                     right:22,
                     top:8
                     });*/
                    currentTargetEl.addClass('show-close-icon');
                }
            });
            wrapper.on('mouseleave', function (e) {
                var currentTarget = e.currentTarget;
                var currentTargetEl = $(currentTarget);
                /*currentTargetEl.one('.calendar-close-icon').css({
                 right:10000,
                 top:-10000
                 });*/
                currentTargetEl.removeClass('show-close-icon');
            });
        },
        /**
         * 控件初始化方法。
         * @private
         */
        init: function () {
            var self = this;
            var target = self.get('target');
            if (target.length == 2) {
                var startDateEl = $(target[0]);
                var range = self.get('range');
                if (range != null) {
                    startDateEl.attr('_range', range);
                    var rangeMessage = self.get('rangeMessage');
                    startDateEl.attr('_rangemessage', rangeMessage || '');
                }
            }
            self.renderUI();
            self.bindUI();
            var value = self.get('value');
            value && self.setValue(value);
        },
        /**
         * 控件销毁方法。
         * @private
         */
        destroy: function () {
            //todo destroy
        }
    }, {
        ATTRS: {
            /**
             * 初始值。
             * @cfg {String|Date|Array} value
             *      <br/>如：
             *
             *      //单日历
             *      value:'2013-12-12 12:12:12'
             *      //双日历
             *      value:['2013-12-12 00:00:00','2013-12-12 23:59:59']
             */
            /**
             * 初始值。
             * @property {String|Date|Array} value
             */
            value: {},
            /**
             * 是否显示时分秒。
             * 默认值为false。
             * @cfg {Boolean} showTime
             *      <br/>如：
             *
             *      showTime:true
             */
            /**
             * 是否显示时分秒。
             * @property {Boolean} showTime
             */
            showTime: {
                value: false
            },
            /**
             * kissy日历控件实例数组。
             * @property {Array} cals
             */
            cals: {
                value: []
            },
            /**
             * Auth表单验证框架对象。
             * @cfg {Auth} auth
             */
            /**
             * Auth表单验证框架对象。
             * @property {Auth} auth
             */
            auth: {},
            /**
             * 需要初始化日历控件的Node对象。
             * @cfg {String|Node} target
             *      <br/>如：
             *
             *      target:'#date'
             *      或者
             *      target:Node.all('#date')
             */
            /**
             * 控件的Node对象。
             * @property {Node} target
             */
            target: {
                setter: function (v) {
                    var target = $(v);
                    var parentEl = target.parent();
                    if (parentEl.hasClass('calendar-wrapper')) {
                        parentEl = parentEl.parent();
                    }
                    var prevEl = parentEl.prev(), nextEl = parentEl.next();
                    //判断是否为日期区间控件
                    var isInterval = (prevEl && prevEl.hasClass("interval-date-separator")
                    || nextEl && nextEl.hasClass("interval-date-separator"));
                    if (isInterval) {
                        //区分日期区间控件的开始日期和结束日期
                        var startDateEl, endDateEl;
                        if (prevEl && prevEl.hasClass("interval-date-separator")) {
                            startDateEl = prevEl.prev().one('.calendar');
                            endDateEl = target;
                        } else {
                            startDateEl = target;
                            endDateEl = parentEl.next().next().one('.calendar');
                        }
                        target = $().add(startDateEl).add(endDateEl);
                    }
                    return target;
                }
            },
            /**
             * 当日历有开始时间和结束时间时，日期可选范围，单位是天。
             * @cfg {Number} range
             *      <br/>如：
             *
             *      range:30
             */
            /**
             * 当日历有开始时间和结束时间时，日期可选范围，单位是天。
             * @property {Number} range
             */
            range: {},
            /*
             * 日期超过range可选范围时的报错信息。
             * @cfg {String} rangeMessage
             *      <br/>如：
             *
             *      rangeMessage:'日期范围不能超过1个月！'
             */
            /*
             * 日期超过range可选范围时的报错信息。
             * @property {String} rangeMessage
             */
            rangeMessage: {},
            minDate: {
                setter: function (v) {
                    if (S.isArray(v)) {
                        S.each(v, function (value, index) {
                            if (S.isString(value)) {
                                v[index] = Calendar.parseDate(value);
                            }
                        });
                    } else if (S.isString(v)) {
                        v = Calendar.parseDate(v);
                    }
                    return v;
                }
            },
            maxDate: {
                setter: function (v) {
                    if (S.isArray(v)) {
                        S.each(v, function (value, index) {
                            if (S.isString(value)) {
                                v[index] = Calendar.parseDate(value);
                            }
                        });
                    } else if (S.isString(v)) {
                        v = Calendar.parseDate(v);
                    }
                    return v;
                }
            },
            align: {
                value: 'right'
            },
            events: {
                value: {}
            }
        }
    });
    return Calendar;
}, {
    requires: [
        'node', 'sizzle', 'base',
        'cute/util/', 'cute/calendar/calendar',
        'cute/util/statistic'
    ]
});
/*
 Copyright 2013, KISSY UI Library v1.32
 MIT Licensed
 build time: Aug 15 00:00
 */
/*
 *  KISSY Calendar
 * @author 拔赤<lijing00333@163.com>
 */
KISSY.add('cute/calendar/calendar/base', function (S, Node, Event, undefined) {
    var EventTarget = Event.Target,
            DOM = S.DOM,
            UA = S.UA,
            $ = Node.all;

    function Calendar(trigger, config, cute_calendar, index, align) {
        this._cute_calendar = cute_calendar;
        this._index = index;
        align = align || 'right';
        this._align = align;
        this.config = config || {};
        this._init(trigger, config);
    }

    S.augment(Calendar, EventTarget, {

        /*
         * 日历构造函数
         * @method     _init
         * @param { string }    selector
         * @param { string }    config
         * @private
         */
        _init: function (selector, config) {
            /*
             self.con  日历的容器
             self.id   传进来的id
             self.C_Id 永远代表日历容器的ID
             */
            var self = this, trigger = $(selector);
            self.id = self._stamp(trigger);
            self._buildParam(config);
            if (!self.popup) {
                self.con = trigger;
            } else {
                self.trigger = trigger;
                self.con = new Node('<div>');

                // 支持直接将日历加载到某个容器中
                var container = self.container || config.container;
                if(container){
                    container.html('');
                    container.append(self.con);
                }else{
                    $(document.body).append(self.con);
                    self.con.css({
                        'left': '-10000px',
                        'top': '-10000px',
                        'position': 'absolute',
                        'background': 'white',
                        'visibility': 'hidden'/*,
                         'z-index': 5000*/
                    });
                }
            }
            self.C_Id = self._stamp(self.con);

            self.render();
            self._buildEvent();
            return this;
        },

        /*
         * 日历构造渲染,增加对多日历不联动的处理
         * @param { object }    o
         */
        render: function (o) {
            var self = this,
                    i = 0,
                    _prev, _next, _oym;

            o = o || {};
            self._parseParam(o);

            self.con.addClass('ks-cal-call ks-clearfix ks-cal-call-multi-' + self.pages + ' align-' + self._align);

            self.ca = self.ca || [];
            for (var i = 0; i < self.ca.length; i++) {
                self.ca[i].detachEvent();
            }
            if (self.__shimEl) {
                self.__shimEl.remove();
                delete self.__shimEl;
            }
            self.con.empty();

            //重置日历的个数
            self.ca.length = self.pages;
            var _rangeStart = false;
            var _rangeEnd = false;
            if (self.range) {
                if (self.range.start) {
                    _rangeStart = true;
                }
                if (self.range.end) {
                    _rangeEnd = true;
                }
            }
            if (_rangeStart && !self.rangeLinkage) {

                _oym = [self.range.start.getFullYear(), self.range.start.getMonth()];
            }
            else {
                _oym = [self.year, self.month];
            }

            for (i = 0; i < self.pages; i++) {
                if (i === 0) {
                    if (_rangeStart) {
                        self._time = S.clone(self.range.start);
                    }
                    _prev = true;
                } else if (!self.rangeLinkage) {
                    if (_rangeEnd) {
                        self._time = S.clone(self.range.end);
                    }
                    _prev = true;
                    if (_rangeEnd && (i + 1) == self.pages) {
                        _oym = [self.range.end.getFullYear(), self.range.end.getMonth()];
                    }
                    else {
                        _oym = self._computeNextMonth(_oym);
                    }
                }
                else {
                    if (_rangeEnd) {
                        self._time = S.clone(self.range.end);
                    }
                    _prev = false;
                    _oym = self._computeNextMonth(_oym);
                }
                if (!self.rangeLinkage) {
                    _next = true;
                }
                else {
                    _next = i == (self.pages - 1);
                }

                var cal = self.ca[i];
                if (!self.rangeLinkage && cal && (cal.year != _oym[0] || cal.month != _oym[1])) {
                    _oym = [cal.year, cal.month];
                }

                self.ca[i] = new self.Page({
                    year: _oym[0],
                    month: _oym[1],
                    prevArrow: _prev,
                    nextArrow: _next,
                    showTime: self.showTime
                }, self);
                self.ca[i].render();
            }
            if (self.popup && UA['ie'] === 6) {
                self.__shimEl = new Node("<" + "iframe frameBorder='0' style='position: absolute;" +
                "border: none;" +
                "width: expression(this.parentNode.offsetWidth-3);" +
                "top: 0;" +
                    //"filter: alpha(opacity=0);" +
                "left: 0;" +
                "z-index: 0;" +
                "height: expression(this.parentNode.offsetHeight-3);" + "'></iframe>");
                self.con.prepend(self.__shimEl);
            }
            return this;

        },
        destroy: function () {
            //在清空html前，移除绑定的事件
            var self = this;
            for (var i = 0; i < self.ca.length; i++) {
                self.ca[i].detachEvent();
            }

            S.each(self.EV, function (tev) {
                if (tev) {
                    tev.target.detach(tev.type, tev.fn);
                }
            });
            self.con.remove();
        },
        /*
         * 用以给容器打上id的标记,容器有id则返回
         * @method _stamp
         * @param el
         * @return {string}
         * @private
         */
        _stamp: function (el) {
            if (!el.attr('id')) {
                el.attr('id', S.guid('K_Calendar'));
            }
            return el.attr('id');
        },


        /*
         * 创建日历外框的事件
         * @method _buildEvent
         * @private
         */
        _buildEvent: function () {
            var self = this, tev, i;
            if (!self.popup) {
                return this;
            }
            //点击空白
            //flush event
            S.each(self.EV, function (tev) {
                if (tev) {
                    tev.target.detach(tev.type, tev.fn);
                }
            });
            self.EV = self.EV || [];
            tev = self.EV[0] = {
                target: $(document),
                type: 'click'
            };
            tev.fn = function (e) {
                var target = $(e.target);
                //点击到日历上
                if (target.attr('id') === self.C_Id) {
                    return;
                }
                if ((target.hasClass('ks-next') || target.hasClass('ks-prev')) &&
                        target[0].tagName === 'A') {
                    return;
                }
                //点击在trigger上
                if (target.attr('id') == self.id) {
                    return;
                }

                if (self.con.css('visibility') == 'hidden') {
                    return;
                }

                // bugfix by jayli - popup状态下，点击选择月份的option时日历层关闭
                if (self.con.contains(target) &&
                        (target[0].nodeName.toLowerCase() === 'option' ||
                        target[0].nodeName.toLowerCase() === 'select')) {
                    return;
                }

                var inRegion = function (dot, r) {
                    return dot[0] > r[0].x
                            && dot[0] < r[1].x
                            && dot[1] > r[0].y
                            && dot[1] < r[1].y;
                };
                if (!inRegion([e.pageX, e.pageY], [
                            {
                                x: self.con.offset().left,
                                y: self.con.offset().top
                            },
                            {
                                x: self.con.offset().left + self.con.width(),
                                y: self.con.offset().top + self.con.height()
                            }
                        ])) {
                    self.hide();
                }
            };
            tev.target.on(tev.type, tev.fn);
            //点击触点
            for (i = 0; i < self.triggerType.length; i++) {
                tev = self.EV[i + 1] = {
                    target: $('#' + self.id),
                    type: self.triggerType[i],
                    fn: function (e) {
                        e.target = $(e.target);
                        e.preventDefault();
                        //如果focus和click同时存在的hack

                        var a = self.triggerType;
                        if (S.inArray('click', a) && S.inArray('focus', a)) {//同时含有
                            if (e.type == 'focus') {
                                self.toggle();
                            }
                        } else if (S.inArray('click', a) && !S.inArray('focus', a)) {//只有click
                            if (e.type == 'click') {
                                self.toggle();
                            }
                        } else if (!S.inArray('click', a) && S.inArray('focus', a)) {//只有focus
                            setTimeout(function () {//为了跳过document.onclick事件
                                self.toggle();
                            }, 170);
                        } else {
                            self.toggle();
                        }

                    }
                };
                tev.target.on(tev.type, tev.fn);
            }
            var windowEl = $(window);
            var resizeFn = S.buffer(function () {
                if (self.popup) {
                    self.hide();
                }
            }, 10);
            windowEl.on('resize', resizeFn);
            //windowEl.on('scroll',resizeFn);
            return this;
        },

        //处理对齐
        __getAlignOffset: function (node, align) {
            var V = align.charAt(0),
                    H = align.charAt(1),
                    offset, w, h, x, y;

            if (node) {
                node = Node.one(node);
                offset = node.offset();
                w = node.outerWidth();
                h = node.outerHeight();
            } else {
                offset = {left: DOM.scrollLeft(), top: DOM.scrollTop()};
                w = DOM.viewportWidth();
                h = DOM.viewportHeight();
            }

            x = offset.left;
            y = offset.top;

            if (V === 'c') {
                y += h / 2;
            } else if (V === 'b') {
                y += h;
            }

            if (H === 'c') {
                x += w / 2;
            } else if (H === 'r') {
                x += w;
            }

            return {left: x, top: y};

        },
        /*
         * 改变日历是否显示的状态
         * @method toggle
         */
        toggle: function () {
            var self = this;
            if (self.con.css('visibility') == 'hidden') {
                var cute_calendar = self._cute_calendar;
                if (cute_calendar) {
                    var index = self._index;
                    var value = cute_calendar.getValue(true);
                    if (index == null) {
                        var selected = value || self.date || new Date();
                        if (!value) {
                            selected = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate(), 0, 0, 0);
                        }
                        self.render({
                            selected: selected,
                            date: selected
                        });
                        var timmer = self.ca[0].timmer;
                        if (timmer) {
                            timmer.time = selected;
                            timmer.render();
                        }
                    } else {
                        var selected = value[index] || self.date || new Date();
                        if (!value[index]) {
                            selected = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate(), index ? 23 : 0, index ? 59 : 0, index ? 59 : 0);
                        }
                        self.render({
                            selected: selected,
                            date: selected
                        });
                        var timmer = self.ca[0].timmer;
                        if (timmer) {
                            timmer.time = selected;
                            timmer.render();
                        }
                    }
                }
                self.show();
            } else {
                self.hide();
            }
        },
        relocateList: function () {
            var self = this;
            var align = self._align;
            var points = self.align.points,
                    offset = self.align.offset || [0, 0],
                    xy = self.con.offset(),
                    p1 = self.__getAlignOffset(self.trigger, points[0]),
                    p2 = self.__getAlignOffset(self.con, points[1]),
                    diff = [p2.left - p1.left, p2.top - p1.top],
                    _x = (align == 'left' ? xy.left - diff[0] + offset[0] : xy.left - diff[0] + offset[0] - (self.con.outerWidth() - self.trigger.outerWidth())),
                    _y = xy.top - diff[1] + offset[1] + 4;
            self.con.css('left', _x.toString() + 'px');
            self.con.css('top', _y.toString() + 'px');
        },
        /*
         * 显示日历
         * 日历位置由原来的左对齐变为右对齐；
         * @method show
         */
        show: function () {
            var self = this;
            self.con.css('visibility', '');
            self.relocateList();
            //防止显示浮层之后浏览器出现滚动条导致定位有偏差,重新再调用一次
            self.relocateList();
            self.fire("show");
            return this;
        },

        /*
         * 隐藏日历
         * @method hide
         */
        hide: function () {
            var self = this;

            var container = self.container || self.config.container;
            if(container){ // 如果用户传递了container 就代表该日历在容器内部，日历不需要控制隐藏/显示
                return this;
            }
            self.con.css({
                'visibility': 'hidden',
                'left': '-10000px',
                'top': '-10000px'
            });
            self.fire("hide");
            return this;
        },

        /*
         * 创建参数列表
         * @method _buildParam
         * @private
         */
        _buildParam: function (o) {
            var self = this;
            if (o === undefined || o === null) {
                o = {};
            }

            function setParam(def, key) {
                var v = o[key];
                // null在这里是“占位符”，用来清除参数的一个道具
                self[key] = (v === undefined || v === null) ? def : v;
            }

            //这种处理方式不错
            S.each({
                date: new Date(), //该日期所在月份, 默认为当天
                selected: null, //当前选中的日期
                startDay: 0, //日历显示星期x为起始日期, 取值范围为0到6, 默认为0,从星期日开始,若取值为1, 则从星期一开始, 若取值为7, 则从周日开始
                pages: 1, //日历的页数, 默认为1, 包含一页日历
                closable: false, //在弹出情况下, 点选日期后是否关闭日历, 默认为false
                rangeSelect: false, //是否支持时间段选择，只有开启时候才会触发rangeSelect事件
                minDate: false, //日历可选择的最小日期
                maxDate: false, //日历可选择的最大日期
                multiSelect: false, //是否支持多选
                multi: null, //多选的日期数组
                navigator: true, //是否可以通过点击导航输入日期,默认开启
                popup: false, //日历是否为弹出,默认为false
                showTime: false, //是否显示时间的选择,默认为false
                triggerType: ['click'], //弹出状态下, 触发弹出日历的事件, 例如：[‘click’,’focus’],也可以直接传入’focus’, 默认为[‘click’]
                disabled: null, //禁止点击的日期数组[new Date(),new Date(2011,11,26)]
                range: null, //已选择的时间段{start:null,end:null}
                rangeLinkage: true, //多个日历是否联动
                align: {
                    points: ['bl', 'tl'],
                    offset: [0, 0]
                }, //对齐方式
                notLimited: false// 是否出现不限的按钮
            }, setParam);


            return this;
        },

        /*
         * 过滤参数列表
         * @method _parseParam
         * @private
         */
        _parseParam: function (o) {
            var self = this, i;
            if (o === undefined || o === null) {
                o = {};
            }
            for (i in o) {
                self[i] = o[i];
            }

            // 支持用户传进来一个string
            if (typeof self.triggerType === 'string') {
                self.triggerType = [self.triggerType];
            }

            self.startDay = self.startDay % 7;
            if (self.startDay < 0) {
                self.startDay += 7;
            }

            self.EV = [];
            self._handleDate();


            //对multiSelect的处理
            if (self.multiSelect) {
                self.rangeSelect = false;
                self.range = null;
                self.selected = null;
                if (self.multi) {
                    //将传入的日期数组格式化成字符串数组,便于内部操作
                    for (var i = 0; i < self.multi.length; i++) {
                        if (self.multi[i] instanceof Date) {
                            self.multi[i] = self._handleDate2String(self.multi[i]);
                        }
                    }
                }
            }
            return this;
        },

        /*
         * 模板函数
         * @method _templetShow
         * @private
         */
        _templetShow: function (templet, data) {
            var str_in, value_s, i, m, value, par;
            if (data instanceof Array) {
                str_in = '';
                for (i = 0; i < data.length; i++) {
                    str_in += arguments.callee(templet, data[i]);
                }
                templet = str_in;
            } else {
                value_s = templet.match(/{\$(.*?)}/g);
                if (data !== undefined && value_s !== null) {
                    for (i = 0, m = value_s.length; i < m; i++) {
                        par = value_s[i].replace(/({\$)|}/g, '');
                        value = (data[par] !== undefined) ? data[par] : '';
                        templet = templet.replace(value_s[i], value);
                    }
                }
            }
            return templet;
        },

        /*
         * 处理日期
         * @method _handleDate
         * @private
         */
        _handleDate: function () {
            var self = this,
                    date = self.date;
            self.weekday = date.getDay() + 1;//星期几 //指定日期是星期几
            self.day = date.getDate();//几号
            self.month = date.getMonth();//月份
            self.year = date.getFullYear();//年份
            return this;
        },
        /*
         * 处理日期TO字符串
         * @method _handleDate2String
         * @private
         */
        _handleDate2String: function (d) {
            var year = d.getFullYear();
            var month = d.getMonth();
            var date = d.getDate();
            return year + '-' + (month > 8 ? (month + 1) : '0' + (month + 1)) + '-' + (date > 9 ? date : '0' + date);
        },
        /*
         * 处理字符串TO日期
         * @method _handleString2Date
         * @private
         */
        _handleString2Date: function (str) {
            var arr = str.toString().split('-');
            if (arr.length == 3) {
                var date = new Date(parseInt(arr[0], 10), (parseInt(arr[1], 10) - 1), parseInt(arr[2], 10));
                if (date instanceof Date && (date != "Invalid Date") && !isNaN(date)) {
                    return date;
                }
            }
        },

        //get标题
        _getHeadStr: function (year, month) {
            return year.toString() + '年' + (Number(month) + 1).toString() + '月';
        },

        //月加
        _monthAdd: function () {
            var self = this;
            if (self.month == 11) {
                self.year++;
                self.month = 0;
            } else {
                self.month++;
            }
            self.date = new Date(self.year.toString() + '/' + (self.month + 1).toString() + '/1');
            return this;
        },

        //月减
        _monthMinus: function () {
            var self = this;
            if (self.month === 0) {
                self.year--;
                self.month = 11;
            } else {
                self.month--;
            }
            self.date = new Date(self.year.toString() + '/' + (self.month + 1).toString() + '/1');
            return this;
        },
        //年加
        _yearAdd: function () {
            var self = this;
            self.year++;
            self.date = new Date(self.year.toString() + '/' + (self.month + 1).toString() + '/1');
            return this;
        },

        //年减
        _yearMinus: function () {
            var self = this;
            self.year--;
            self.date = new Date(self.year.toString() + '/' + (self.month + 1).toString() + '/1');
            return this;
        },

        //裸算下一个月的年月,[2009,11],年:fullYear，月:从0开始计数
        _computeNextMonth: function (a) {
            var _year = a[0],
                    _month = a[1];
            if (_month == 11) {
                _year++;
                _month = 0;
            } else {
                _month++;
            }
            return [_year, _month];
        },

        //处理日期的偏移量
        _handleOffset: function () {
            var self = this,
                    data = ['日', '一', '二', '三', '四', '五', '六'],
                    temp = '<span>{$day}</span>',
                    offset = self.startDay,
                    day_html = '',
                    a = [];
            for (var i = 0; i < 7; i++) {
                a[i] = {
                    day: data[(i + offset) % 7]
                };
            }
            day_html = self._templetShow(temp, a);

            return {
                day_html: day_html
            };
        },

        //处理起始日期,d:Date类型
        _handleRange: function (d) {
            var self = this, t;
            self.range = self.range || {start: null, end: null};
            if ((self.range.start === null && self.range.end === null ) || (self.range.start !== null && self.range.end !== null)) {
                self.range.start = d;
                self.range.end = null;
            } else if (self.range.start !== null && self.range.end === null) {
                self.range.end = d;
                if (self.range.start.getTime() > self.range.end.getTime()) {
                    t = self.range.start;
                    self.range.start = self.range.end;
                    self.range.end = t;
                }
                self.fire('rangeSelect', self.range);
                if (self.popup && self.closable) {
                    self.hide();
                }
            }
            return this;
        },
        //开始多选
        _handleMultiSelectStart: function (d) {
            var self = this;
            self.multiStart = d;

        },
        _handleMultiSelectEnd: function (d) {

            var self = this;
            if (!self.multiStart) {
                return;
            }
            self.multi = self.multi || [];
            if (d < self.multiStart) {
                self.multiEnd = self.multiStart;
                self.multiStart = d;
            }
            else {
                self.multiEnd = d;
            }

            //对min和max的处理
            if (self.minDate && self.multiStart < self.minDate) {
                self.multiStart = new Date(self.minDate.getFullYear(), self.minDate.getMonth(), self.minDate.getDate());//这里需要重新创建对象
            }
            if (self.maxDate && self.multiEnd > self.maxDate) {
                self.multiEnd = new Date(self.maxDate.getFullYear(), self.maxDate.getMonth(), self.maxDate.getDate());
            }

            while (self.multiStart <= self.multiEnd) {

                var isDisabled = false;
                //需要处理disabled
                if (self.disabled && self.disabled.length > 0) {
                    for (var i = 0; i < self.disabled.length; i++) {
                        var disabled = self.disabled[i];
                        if (disabled.getTime() == self.multiStart.getTime()) {
                            isDisabled = true;
                            break;
                        }
                    }
                }
                if (isDisabled) {
                    continue;
                }
                var str = self._handleDate2String(self.multiStart);
                if (!S.inArray(str, self.multi)) {
                    self.multi.push(str);
                }
                else {
                    self.multi.splice(S.indexOf(str, self.multi), 1);
                }
                self.multiStart.setDate(self.multiStart.getDate() + 1);
            }
            self.multiStart = null;
            self.render();
        },
        _handleMultiSelect: function () {
            var self = this;
            //这里对multi进行排序和处理成日期格式
            self.multi = self.multi || [];
            self.multi.sort(function (a, b) {
                if (a > b) {
                    return 1;
                }
                return -1;
            });
            for (var i = 0; i < self.multi.length; i++) {
                self.multi[i] = self._handleString2Date(self.multi[i])
            }

            self.fire('multiSelect', {multi: self.multi});
            if (self.popup && self.closable) {
                self.hide();
            }

        }
    });

    return Calendar;
}, {requires: ['node', "event"]});

/*
 *
 * 2011-12-27 by keyapril@gmail.com
 1.新增配置参数：
 disabled:null, //禁止点击的日期数组[new Date(),new Date(2011,11,26)]
 range:    null,//已选择的时间段{start:null,end:null}
 align:{
 points:['bl','tl'],
 offset:[0,0]
 },//对其方式
 notLimited:    false,// 是否出现不限的按钮
 rangLinkage //多个日历是否联动
 2.新增加功能
 -加入了"年"的前进后退
 -加入了不限按钮，在点击之后触发“select”事件，参数为null,
 -Date.parse方法新增对"2011-12-27"字符串的处理
 3.bug修复
 -修复最小最大日期限制后31号始终可点击的BUG
 4.样式的调整
 -美化了。。。
 *
 * 2011-12-06 by yiminghe@gmail.com
 *  - 全局绑定放 document
 *  - fix 清除事件调用
 *
 * 2010-09-09 by lijing00333@163.com - 拔赤
 *     - 将基于YUI2/3的Calendar改为基于KISSY
 *     - 增加起始日期（星期x）的自定义
 *      - 常见浮层的bugfix
 *
 * TODO:
 *   - 日历日期的输出格式的定制
 *   - 多选日期的场景的交互设计
 *//*
 *  calendar
 */
KISSY.add('cute/calendar/calendar', function (S, C, Page, Time, Date) {
    S.Date = C.Date = Date;
    S.Calendar = C;
    return C;
}, {
    requires: ["cute/calendar/calendar/base", "cute/calendar/calendar/page", "cute/calendar/calendar/time", "cute/calendar/calendar/date"]
});

/*
 左莫 2011-12-28：
 1.新增配置参数：
 disabled:null, //禁止点击的日期数组[new Date(),new Date(2011,11,26)]
 range:    null,//已选择的时间段{start:null,end:null}
 align:{
 points:['bl','tl'],
 offset:[0,0]
 },//对其方式
 notLimited:    false,// 是否出现不限的按钮
 rangLinkage //多个日历是否联动
 2.新增加功能
 -加入了"年"的前进后退
 -加入了不限按钮，在点击之后触发“select”事件，参数为null,
 -Date.parse方法新增对"2011-12-27"字符串的处理
 3.bug修复
 -修复最小最大日期限制后31号始终可点击的BUG
 4.样式的调整
 -美化了
 **//*
 *  Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 *
 * Last modified by jayli 拔赤 2010-09-09
 * - 增加中文的支持
 * - 简单的本地化，对w（星期x）的支持
 */
KISSY.add('cute/calendar/calendar/date', function (S) {

    function dateParse(data, s) {

        var date = null;
        s = s || '-';
        //Convert to date
        if (!(date instanceof Date)) {
            date = new Date(data);
        }
        else {
            return date;
        }

        // Validate
        if (date instanceof Date && (date != "Invalid Date") && !isNaN(date)) {
            return date;
        }
        else {
            var arr = data.toString().split(s);
            if (arr.length == 3) {
                date = new Date(arr[0], (parseInt(arr[1], 10) - 1), arr[2]);
                if (date instanceof Date && (date != "Invalid Date") && !isNaN(date)) {
                    return date;
                }
            }
        }
        return null;

    }


    var dateFormat = function () {
        var token = /w{1}|d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                timezoneClip = /[^-+\dA-Z]/g,
                pad = function (val, len) {
                    val = String(val);
                    len = len || 2;
                    while (val.length < len) {
                        val = "0" + val;
                    }
                    return val;
                },
        // Some common format strings
                masks = {
                    "default": "ddd mmm dd yyyy HH:MM:ss",
                    shortDate: "m/d/yy",
                    //mediumDate:     "mmm d, yyyy",
                    longDate: "mmmm d, yyyy",
                    fullDate: "dddd, mmmm d, yyyy",
                    shortTime: "h:MM TT",
                    //mediumTime:     "h:MM:ss TT",
                    longTime: "h:MM:ss TT Z",
                    isoDate: "yyyy-mm-dd",
                    isoTime: "HH:MM:ss",
                    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                    isoUTCDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",

                    //added by jayli
                    localShortDate: "yy年mm月dd日",
                    localShortDateTime: "yy年mm月dd日 hh:MM:ss TT",
                    localLongDate: "yyyy年mm月dd日",
                    localLongDateTime: "yyyy年mm月dd日 hh:MM:ss TT",
                    localFullDate: "yyyy年mm月dd日 w",
                    localFullDateTime: "yyyy年mm月dd日 w hh:MM:ss TT"

                },

        // Internationalization strings
                i18n = {
                    dayNames: [
                        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
                        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
                        "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"
                    ],
                    monthNames: [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                    ]
                };

        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc) {

            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }

            // Passing date through Date applies Date.parse, if necessary
            date = date ? new Date(date) : new Date();
            if (isNaN(date)) {
                throw SyntaxError("invalid date");
            }

            mask = String(masks[mask] || mask || masks["default"]);

            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }

            var _ = utc ? "getUTC" : "get",
                    d = date[_ + "Date"](),
                    D = date[_ + "Day"](),
                    m = date[_ + "Month"](),
                    y = date[_ + "FullYear"](),
                    H = date[_ + "Hours"](),
                    M = date[_ + "Minutes"](),
                    s = date[_ + "Seconds"](),
                    L = date[_ + "Milliseconds"](),
                    o = utc ? 0 : date.getTimezoneOffset(),
                    flags = {
                        d: d,
                        dd: pad(d, undefined),
                        ddd: i18n.dayNames[D],
                        dddd: i18n.dayNames[D + 7],
                        w: i18n.dayNames[D + 14],
                        m: m + 1,
                        mm: pad(m + 1, undefined),
                        mmm: i18n.monthNames[m],
                        mmmm: i18n.monthNames[m + 12],
                        yy: String(y).slice(2),
                        yyyy: y,
                        h: H % 12 || 12,
                        hh: pad(H % 12 || 12, undefined),
                        H: H,
                        HH: pad(H, undefined),
                        M: M,
                        MM: pad(M, undefined),
                        s: s,
                        ss: pad(s, undefined),
                        l: pad(L, 3),
                        L: pad(L > 99 ? Math.round(L / 10) : L, undefined),
                        t: H < 12 ? "a" : "p",
                        tt: H < 12 ? "am" : "pm",
                        T: H < 12 ? "A" : "P",
                        TT: H < 12 ? "AM" : "PM",
                        Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                        o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                        S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                    };

            return mask.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }();

    return {
        format: function (date, mask, utc) {
            return dateFormat(date, mask, utc);
        },
        parse: function (date, s) {
            return dateParse(date, s);
        }
    };
});
/*
 * @     日历
 * @author  拔赤<lijing00333@163.com>
 */
KISSY.add('cute/calendar/calendar/page', function (S, Node, Calendar) {

    S.augment(Calendar, {

        Page: function (config, father) {
            /*
             * 子日历构造器
             * @constructor S.Calendar.Page
             * @param {Object} config ,参数列表，需要指定子日历所需的年月
             * @param {Object} father,指向Y.Calendar实例的指针，需要共享父框的参数
             * @return 子日历的实例
             */

            //属性
            this.father = father;
            this.month = Number(config.month);
            this.year = Number(config.year);
            this.prevArrow = config.prevArrow;
            this.nextArrow = config.nextArrow;
            this.node = null;
            this.timmer = null;//时间选择的实例
            this.id = '';

            this.triAngleStr = '<div class="ks-cal-triAngle"></div>';
            if(this.father && this.father.config && this.father.config.container){ // 有容器不需要显示箭头
                this.triAngleStr = '<div class="ks-cal-triAngle" style="display:none;"></div>';
            }

            this.html = [
                this.triAngleStr,
                '<div class="ks-cal-box" id="{$id}">',
                '<div class="ks-cal-hd">',
                '<a href="javascript:;" class="ks-prev-year {$prev} icon-e616"></a>',
                '<a href="javascript:;" class="ks-prev-month {$prev} icon-e60d"></a>',
                '<a href="javascript:;" class="ks-title">{$title}</a>',
                '<a href="javascript:;" class="ks-next-month {$next} icon-e60f"></a>',
                '<a href="javascript:;" class="ks-next-year {$next} icon-e615"></a>',
                '</div>',
                '<div class="ks-cal-bd">',
                '<div class="ks-whd">',
                /*
                 '<span>日</span>',
                 '<span>一</span>',
                 '<span>二</span>',
                 '<span>三</span>',
                 '<span>四</span>',
                 '<span>五</span>',
                 '<span>六</span>',
                 */
                father._handleOffset().day_html,
                '</div>',
                '<div class="ks-dbd ks-clearfix">',
                '{$ds}',
                /*
                 <a href="" class="ks-null">1</a>
                 <a href="" class="ks-disabled">3</a>
                 <a href="" class="ks-selected">1</a>
                 <a href="" class="ks-today">1</a>
                 <a href="">1</a>
                 */
                '<div style="clear:both;"></div>',
                '</div>',
                '</div>',
                '<div class="ks-setime-mask hidden"></div>',
                '<div class="ks-setime hidden">',
                '</div>',
                '<div class="{$notlimited}"><a href="#" class="ks-cal-notLimited {$notlimitedCls}">不限</a></div>',
                '<div class="ks-multi-select {$multiSelect}"><button class="ks-multi-select-btn">确定</button></div>',
                '<div class="ks-cal-ft {$showtime}">',
                '<div class="ks-cal-time">',
                '时间：00:00 &hearts;',
                '</div>',
                '</div>',
                '<div class="ks-selectime-mask hidden"></div>',
                '<div class="ks-selectime hidden">', //<!--用以存放点选时间的一些关键值-->',
                '</div>',
                '</div><!--#ks-cal-box-->'
            ].join("");
            this.nav_html = [
                '<p>',
                '<select' +
                ' value="{$the_month}">',
                '<option class="m1" value="1">01</option>',
                '<option class="m2" value="2">02</option>',
                '<option class="m3" value="3">03</option>',
                '<option class="m4" value="4">04</option>',
                '<option class="m5" value="5">05</option>',
                '<option class="m6" value="6">06</option>',
                '<option class="m7" value="7">07</option>',
                '<option class="m8" value="8">08</option>',
                '<option class="m9" value="9">09</option>',
                '<option class="m10" value="10">10</option>',
                '<option class="m11" value="11">11</option>',
                '<option class="m12" value="12">12</option>',
                '</select>',
                '月',
                '</p>',
                '<p>',

                '<input type="text" value="{$the_year}" onfocus="this.select()"/>',
                '年',
                '</p>',
                '<p>',
                '<button class="ok btn btn-s btn-weak">确定</button><button class="cancel btn btn-m btn-weak">取消</button>',
                '</p>'
            ].join("");


            //方法
            //常用的数据格式的验证
            this.Verify = function () {

                var isDay = function (n) {
                            if (!/^\d+$/i.test(n)) {
                                return false;
                            }
                            n = Number(n);
                            return !(n < 1 || n > 31);

                        },
                        isYear = function (n) {
                            if (!/^\d+$/i.test(n)) {
                                return false;
                            }
                            n = Number(n);
                            return !(n < 100 || n > 10000);

                        },
                        isMonth = function (n) {
                            if (!/^\d+$/i.test(n)) {
                                return false;
                            }
                            n = Number(n);
                            return !(n < 1 || n > 12);


                        };

                return {
                    isDay: isDay,
                    isYear: isYear,
                    isMonth: isMonth

                };


            };

            /*
             * 渲染子日历的UI
             */
            this._renderUI = function () {
                var cc = this, _o = {}, ft;
                cc.HTML = '';
                _o.prev = '';
                _o.next = '';
                _o.title = '';
                _o.ds = '';
                _o.notlimited = '';
                _o.notlimitedClass = '';
                if (!cc.prevArrow) {
                    _o.prev = 'hidden';
                }
                if (!cc.nextArrow) {
                    _o.next = 'hidden';
                }
                if (!cc.father.showTime) {
                    _o.showtime = 'hidden';
                }
                if (!cc.father.notLimited) {
                    _o.notlimited = 'hidden';
                }
                if (!cc.father.multiSelect) {
                    _o.multiSelect = 'hidden';
                }
                if (cc.father.showTime && cc.father.notLimited) {
                    _o.notlimitedCls = 'ks-cal-notLimited-showTime';
                }
                if (cc.father.notLimited && !cc.father.selected) {
                    _o.notlimitedCls += ' ks-cal-notLimited-selected';
                }
                _o.id = cc.id = 'ks-cal-' + Math.random().toString().replace(/.\./i, '');
                _o.title = cc.father._getHeadStr(cc.year, cc.month);
                cc.createDS();
                _o.ds = cc.ds;
                cc.father.con.append(cc.father._templetShow(cc.html, _o));
                cc.node = Node.one('#' + cc.id);
                if (cc.father.showTime) {
                    ft = cc.node.one('.ks-cal-ft');
                    cc.timmer = new cc.father.TimeSelector(ft, cc.father);
                }
                return this;
            };

            this.detachEvent = function () {
                var cc = this;
                cc.EV = cc.EV || [];
                //flush event
                S.each(cc.EV, function (tev) {
                    if (tev) {
                        tev.target.detach(tev.type, tev.fn);
                    }
                });
            };

            /*
             * 创建子日历的事件
             */
            this._buildEvent = function () {
                var cc = this, i,
                        tev,
                        con = Node.one('#' + cc.id);

                function bindEventTev() {
                    tev.target.on(tev.type, tev.fn);
                }

                cc.EV = [];
                if (!cc.father.multiSelect) {
                    tev = cc.EV[cc.EV.length] = {
                        target: con.one('div.ks-dbd'),
                        type: "click",
                        fn: function (e) {
                            e.preventDefault();
                            if (e.target.tagName != 'A') {
                                //如果不是点击在A标签上，直接return;
                                return;
                            }
                            e.target = Node(e.target);

                            if (e.target.hasClass('ks-null')) {
                                return;
                            }
                            if (e.target.hasClass('ks-disabled')) {
                                return;
                            }
                            var d = new Date(cc.year, cc.month, Number(e.target.html()));
                            cc.father.dt_date = d;
                            cc.father.fire('select', {
                                date: d
                            });
                            if (cc.father.popup && cc.father.closable && !cc.father.showTime && !cc.father.rangeSelect) {
                                cc.father.hide();
                            }
                            if (cc.father.rangeSelect) {
                                //如果包含time，这显示完整的时间
                                if (cc.timmer) {
                                    d.setHours(cc.timmer.get('h'));
                                    d.setMinutes(cc.timmer.get('m'));
                                    d.setSeconds(cc.timmer.get('s'));
                                }
                                cc.father._handleRange(d);
                            }
                            S.later(function () {
                                cc.father.render({selected: d});
                            }, 1);
                        }
                    };
                    bindEventTev();
                    if (cc.father.showTime) {
                        tev.target.on('dblclick', function (e) {
                            e.preventDefault();
                            if (Node.one(e.target)[0].tagName != 'A') {
                                //如果不是点击在A标签上，直接return;
                                return;
                            }
                            e.target = Node(e.target);
                            if (e.target.hasClass('ks-null')) {
                                return;
                            }
                            if (e.target.hasClass('ks-disabled')) {
                                return;
                            }
                            cc.timmer.button.fire('click');
                        });
                    }
                }

                //向前一月
                tev = cc.EV[cc.EV.length] = {
                    target: con.one('a.ks-prev-month'),
                    type: 'click',
                    fn: function (e) {
                        e.preventDefault();
                        if (!cc.father.rangeLinkage) {
                            cc._monthMinus();
                        }
                        cc.father._monthMinus().render();
                        cc.father.fire('monthChange', {
                            date: new Date(cc.father.year + '/' + (cc.father.month + 1) + '/01')
                        });
                    }
                };
                bindEventTev();
                //向后一月
                tev = cc.EV[cc.EV.length] = {
                    target: con.one('a.ks-next-month'),
                    type: 'click',
                    fn: function (e) {
                        e.preventDefault();
                        if (!cc.father.rangeLinkage) {
                            cc._monthAdd();
                        }
                        cc.father._monthAdd().render();
                        cc.father.fire('monthChange', {
                            date: new Date(cc.father.year + '/' + (cc.father.month + 1) + '/01')
                        });
                    }
                };
                bindEventTev();
                //向前一年
                tev = cc.EV[cc.EV.length] = {
                    target: con.one('a.ks-prev-year'),
                    type: 'click',
                    fn: function (e) {
                        e.preventDefault();
                        if (!cc.father.rangeLinkage) {
                            cc._yearMinus();
                        }
                        cc.father._yearMinus().render();
                        cc.father.fire('monthChange', {
                            date: new Date(cc.father.year + '/' + (cc.father.month + 1) + '/01')
                        });
                    }
                };
                bindEventTev();
                //向后一年
                tev = cc.EV[cc.EV.length] = {
                    target: con.one('a.ks-next-year'),
                    type: 'click',
                    fn: function (e) {
                        e.preventDefault();
                        if (!cc.father.rangeLinkage) {
                            cc._yearAdd();
                        }
                        cc.father._yearAdd().render();
                        cc.father.fire('monthChange', {
                            date: new Date(cc.father.year + '/' + (cc.father.month + 1) + '/01')
                        });
                    }
                };
                bindEventTev();
                if (cc.father.navigator) {
                    tev = cc.EV[cc.EV.length] = {
                        target: con.one('a.ks-title'),
                        type: 'click',
                        fn: function (e) {
                            try {
                                cc.timmer.hidePopup();
                                e.preventDefault();
                            } catch (exp) {
                            }
                            e.target = Node(e.target);
                            var setime_node = con.one('.ks-setime');
                            setime_node.html('');
                            var in_str = cc.father._templetShow(cc.nav_html, {
                                the_month: cc.month + 1,
                                the_year: cc.year
                            });
                            setime_node.html(in_str);
                            con.siblings('.ks-cal-triAngle').addClass('ks-cal-triAngle-mask');
                            con.one('.ks-setime-mask').removeClass('hidden');
                            setime_node.removeClass('hidden');
                            con.one('input').on('keydown', function (e) {
                                e.target = Node(e.target);
                                if (e.keyCode == 38) {//up
                                    e.target.val(Number(e.target.val()) + 1);
                                    e.target[0].select();
                                }
                                if (e.keyCode == 40) {//down
                                    e.target.val(Number(e.target.val()) - 1);
                                    e.target[0].select();
                                }
                                if (e.keyCode == 13) {//enter
                                    var _month = con.one('.ks-setime').one('select').val();
                                    var _year = con.one('.ks-setime').one('input').val();
                                    con.one('.ks-setime').addClass('hidden');
                                    con.one('.ks-setime-mask').addClass('hidden');
                                    if (!cc.Verify().isYear(_year)) {
                                        return;
                                    }
                                    if (!cc.Verify().isMonth(_month)) {
                                        return;
                                    }
                                    cc.father.render({
                                        date: new Date(_year + '/' + _month + '/01')
                                    });
                                    cc.father.fire('monthChange', {
                                        date: new Date(_year + '/' + _month + '/01')
                                    });
                                }
                            });
                        }
                    };
                    bindEventTev();
                    tev = cc.EV[cc.EV.length] = {
                        target: con.one('.ks-setime'),
                        type: 'click',
                        fn: function (e) {
                            e.preventDefault();
                            e.target = Node(e.target);
                            if (e.target.hasClass('ok')) {
                                var _month = con.one('.ks-setime').one('select').val(),
                                        _year = con.one('.ks-setime').one('input').val();
                                con.siblings('.ks-cal-triAngle').removeClass('ks-cal-triAngle-mask');
                                con.one('.ks-setime').addClass('hidden');
                                con.one('.ks-setime-mask').addClass('hidden');
                                if (!cc.Verify().isYear(_year)) {
                                    return;
                                }
                                if (!cc.Verify().isMonth(_month)) {
                                    return;
                                }
                                cc.father.render({
                                    date: new Date(_year + '/' + _month + '/01')
                                });
                                cc.father.fire('monthChange', {
                                    date: new Date(_year + '/' + _month + '/01')
                                });
                            } else if (e.target.hasClass('cancel')) {
                                con.siblings('.ks-cal-triAngle').removeClass('ks-cal-triAngle-mask');
                                con.one('.ks-setime').addClass('hidden');
                                con.one('.ks-setime-mask').addClass('hidden');
                            }
                        }
                    };
                    bindEventTev();
                }

                if (cc.father.notLimited) {
                    tev = cc.EV[cc.EV.length] = {
                        target: con.one('.ks-cal-notLimited'),
                        type: 'click',
                        fn: function (e) {
                            e.preventDefault();
                            cc.father.range = {start: null, end: null};
                            cc.father.fire('select', {date: null});
                            if (cc.father.popup && cc.father.closable) {
                                cc.father.hide();
                            }
                            cc.father.render({selected: null});
                        }
                    };
                    bindEventTev();
                }
                if (cc.father.multiSelect) {
                    tev = cc.EV[cc.EV.length] = {
                        target: con.one('div.ks-dbd'),
                        type: "mousedown",
                        fn: function (e) {
                            e.preventDefault();
                            if (e.target.tagName != 'A') {
                                return;
                            }
                            e.target = Node(e.target);

                            if (e.target.hasClass('ks-null')) {
                                return;
                            }
                            if (e.target.hasClass('ks-disabled')) {
                                return;
                            }
                            var d = new Date(cc.year, cc.month, Number(e.target.html()));
                            cc.father._handleMultiSelectStart(d)
                        }
                    };
                    bindEventTev();
                    tev = cc.EV[cc.EV.length] = {
                        target: con.one('div.ks-dbd'),
                        type: "mouseup",
                        fn: function (e) {
                            e.preventDefault();
                            if (e.target.tagName != 'A') {
                                return;
                            }
                            e.target = Node(e.target);
                            if (e.target.hasClass('ks-null')) {
                                return;
                            }
                            if (e.target.hasClass('ks-disabled')) {
                                return;
                            }
                            var d = new Date(cc.year, cc.month, Number(e.target.html()));
                            cc.father._handleMultiSelectEnd(d);
                            //cc.father.render();
                        }
                    };
                    bindEventTev();
                    tev = cc.EV[cc.EV.length] = {
                        target: con.one('.ks-multi-select-btn'),
                        type: "click",
                        fn: function (e) {
                            e.preventDefault();
                            cc.father._handleMultiSelect();
                            //cc.father.render();
                        }
                    };
                    bindEventTev();
                }

                return this;

            };
            //月加
            this._monthAdd = function () {
                var self = this;
                if (self.month == 11) {
                    self.year++;
                    self.month = 0;
                } else {
                    self.month++;
                }
            },

                //月减
                    this._monthMinus = function () {
                        var self = this;
                        if (self.month === 0) {
                            self.year--;
                            self.month = 11;
                        } else {
                            self.month--;
                        }
                    },
                //年加
                    this._yearAdd = function () {
                        var self = this;
                        self.year++;
                    };

            //年减
            this._yearMinus = function () {
                var self = this;
                self.year--;
            };

            /*
             * 得到当前子日历的node引用
             */
            this._getNode = function () {
                var cc = this;
                return cc.node;
            };
            /*
             * 得到某月有多少天,需要给定年来判断闰年
             */
            this._getNumOfDays = function (year, month) {
                return 32 - new Date(year, month - 1, 32).getDate();
            };

            this._isDisabled = function (arrDisabled, date) {
                if (arrDisabled && arrDisabled.length > 0) {
                    for (var i = 0; i < arrDisabled.length; i++) {
                        var d = arrDisabled[i];
                        if (date.getFullYear() == d.getFullYear() && date.getMonth() == d.getMonth() && date.getDate() == d.getDate()) {
                            return true;
                        }
                    }
                }
                return false;
            };

            this.isInMulit = function (mulit, date) {
                if (mulit && mulit.length > 0) {
                    for (var i = 0; i < mulit.length; i++) {
                        var arr = mulit[i].split('-');
                        if (date.getFullYear() == parseInt(arr[0], 10) && date.getMonth() == (parseInt(arr[1], 10) - 1) && date.getDate() == parseInt(arr[2], 10)) {
                            return true;
                        }
                    }
                }
                return false;
            };


            /*
             * 生成日期的html
             *
             */
            this.createDS = function () {
                var cc = this;
                var cute_calendar = cc.father._cute_calendar;
                if (cute_calendar) {
                    var range = cute_calendar.get('range');
                    var index = cc.father._index;
                    if (index != null && range != null && range > 0) {
                        var dates = cute_calendar.getValue(true);
                        if (index == 0) {
                            /*if(dates[1]){
                             cc.father.maxDate=null;
                             cc.father.minDate=null;
                             }else{
                             cc.father.maxDate=null;
                             cc.father.minDate=null;
                             }*/
                        } else if (index == 1) {
                            if (dates[0]) {
                                cc.father.minDate = dates[0];
                                var showTime = cute_calendar.get('showTime');
                                var maxDateTime = dates[0].getTime() + (showTime ? range : range - 1) * 24 * 60 * 60 * 1000;
                                var config_maxDate = cute_calendar.get('maxDate');
                                if (config_maxDate && S.isArray(config_maxDate) && config_maxDate[1]) {
                                    var config_maxDateTime = config_maxDate[1].getTime();
                                    if (maxDateTime > config_maxDateTime) {
                                        maxDateTime = config_maxDateTime;
                                    }
                                }
                                cc.father.maxDate = new Date(maxDateTime);
                            } else {
                                cc.father.minDate = null;
                                cc.father.maxDate = null;
                            }
                        }
                    }
                }

                var s = '',
                        startOffset = (7 - cc.father.startDay + new Date(cc.year + '/' + (cc.month + 1) + '/01').getDay()) % 7, //当月第一天是星期几
                        days = cc._getNumOfDays(cc.year, cc.month + 1),
                        selected = cc.father.selected,
                        today = new Date(),
                        i, _td_s;


                for (var i = 0; i < startOffset; i++) {
                    s += '<a href="javascript:;" class="ks-null">0</a>';
                }

                //左莫优化了日历生成
                for (i = 1; i <= days; i++) {
                    var cls = '';
                    var date = new Date(cc.year, cc.month, i);
                    //minDate 和 maxDate都包含当天
                    if ((cc.father.minDate && new Date(cc.year, cc.month, i + 1) <= cc.father.minDate) || (cc.father.maxDate && date > cc.father.maxDate) || cc._isDisabled(cc.father.disabled, date)) {
                        cls = 'ks-disabled';
                    }
                    else if (cc.father.range && date >= cc.father.range.start && date <= cc.father.range.end) {
                        cls = 'ks-range';
                    }
                    else if ((selected && selected.getFullYear() == cc.year && selected.getMonth() == cc.month && selected.getDate() == i) || cc.isInMulit(cc.father.multi, date)) {
                        cls = 'ks-selected';
                    }

                    if (today.getFullYear() == cc.year && today.getMonth() == cc.month && today.getDate() == i) {
                        cls += ' ks-today';
                    }

                    s += '<a ' + (cls ? 'class="' + cls + '"' : '') + ' href="javascript:;">' + i + '</a>';
                }
                cc.ds = s;
                return this;
            };
            /*
             * 渲染
             */
            this.render = function () {
                var cc = this;
                cc._renderUI();
                cc._buildEvent();
                return this;
            };


        }//Page constructor over
    });
    return Calendar;
}, {requires: ["node", "cute/calendar/calendar/base"]});
/*
 * 2010-09-14 拔赤
 *        - 仅支持S.Date.format和S.Date.parse，format仅对常用格式进行支持（不超过10个），也可以自定义
 *        - kissy-lang中是否应当增加Lang.type(o)?或者isDate(d)?
 *        - 模块名称取为datetype还是直接用date? 我更倾向于用date
 *        - YUI的datetype花了大量精力对全球语种进行hack，似乎KISSY是不必要的，KISSY只对中文做hack即可
 *//*
 *      日历
 * @author  拔赤<lijing00333@163.com>
 */
KISSY.add('cute/calendar/calendar/time', function (S, Node, Calendar) {

    S.augment(Calendar, {

        /*
         * 时间选择构造器

         * @constructor S.Calendar.TimerSelector
         * @param {Object} ft ,timer所在的容器
         * @param {Object} father 指向S.Calendar实例的指针，需要共享父框的参数
         */
        TimeSelector: function (ft, father) {
            //属性

            this.father = father;
            this.fcon = ft.parent('.ks-cal-box');
            this.grandPfon = ft.parent('.ks-cal-call');
            this.popupannel = this.fcon.one('.ks-selectime');//点选时间的弹出层
            if (typeof father._time == 'undefined') {//确保初始值和当前时间一致
                father._time = new Date();
            }

            this.time = father.config._time || father._time;
            this.status = 's';//当前选择的状态，'h','m','s'依次判断更新哪个值

            this.ctime = Node('<div class="ks-cal-time"><span class="ks-cal-time-detail">时间：</span><span class="h">h</span>:<span class="m">m</span>:<span class="s">s</span><!--{{arrow--><div class="cta"><button class="u"></button><button class="d"></button></div><!--arrow}}--></div>');
            this.button = Node('<button class="ct-ok btn btn-s btn-weak">确定</button>');

            var isHideBtn = father.config.hideTimeBtn;
            if(isHideBtn){
                this.button = Node('<button class="ct-ok btn btn-s btn-weak" style="display: none;">确定</button>');
            }
            //小时

            this.h_a = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
            //分钟

            this.m_a = ['00', '10', '20', '30', '40', '50'];
            //秒

            this.s_a = ['00', '10', '20', '30', '40', '50'];


            //方法

            /*
             * 创建相应的容器html，值均包含在a中
             * 参数：要拼装的数组
             * 返回：拼好的innerHTML,结尾还要带一个关闭的a



             *
             */
            this.parseSubHtml = function (a) {
                var in_str = '';
                for (var i = 0; i < a.length; i++) {
                    in_str += '<a href="javascript:;" class="item">' + a[i] + '</a>';
                }
                in_str += '<a href="javascript:;" class="x icon-e613"></a>';
                return in_str;
            };
            /*
             * 显示ks-selectime容器
             * 参数，构造好的innerHTML

             */
            this.showPopup = function (instr) {
                var self = this;
                this.popupannel.html(instr);
                this.popupannel.removeClass('hidden');
                var status = self.status;
                self.ctime.all('span').removeClass('on');
                switch (status) {
                    case 'h':
                        self.ctime.all('.h').addClass('on');
                        break;
                    case 'm':
                        self.ctime.all('.m').addClass('on');
                        break;
                    case 's':
                        self.ctime.all('.s').addClass('on');
                        break;
                }
            };
            /*
             * 隐藏ks-selectime容器
             */
            this.hidePopup = function () {
                this.popupannel.addClass('hidden');
            };
            /*
             * 不对其做更多的上下文假设，仅仅根据time显示出来

             */
            this.render = function () {
                var self = this;
                var h = self.get('h');
                var m = self.get('m');
                var s = self.get('s');
                if (h < 10) {
                    h = '0' + h;
                }
                if (m < 10) {
                    m = '0' + m;
                }
                if (s < 10) {
                    s = '0' + s;
                }
                self.father._time = self.time;
                self.ctime.all('.h').html(h);
                self.ctime.all('.m').html(m);
                self.ctime.all('.s').html(s);
                return self;
            };
            //这里的set和get都只是对time的操作，并不对上下文做过多假设

            /*
             * set(status,v)
             * h:2,'2'
             */
            this.set = function (status, v) {
                var self = this;
                v = Number(v);
                switch (status) {
                    case 'h':
                        self.time.setHours(v);
                        break;
                    case 'm':
                        self.time.setMinutes(v);
                        break;
                    case 's':
                        self.time.setSeconds(v);
                        break;
                }
                self.render();
            };
            /*
             * get(status)
             */
            this.get = function (status) {
                var self = this;
                var time = self.time;
                switch (status) {
                    case 'h':
                        return time.getHours();
                    case 'm':
                        return time.getMinutes();
                    case 's':
                        return time.getSeconds();
                }
            };

            /*
             * add()
             * 状态值代表的变量增1

             */
            this.add = function () {
                var self = this;
                var status = self.status;
                var v = self.get(status);
                v++;
                self.set(status, v);
            };
            /*
             * minus()
             * 状态值代表的变量增1

             */
            this.minus = function () {
                var self = this;
                var status = self.status;
                var v = self.get(status);
                v--;
                self.set(status, v);
            };


            //构造

            this._init = function () {
                var self = this;
                ft.html('').append(self.ctime);
                ft.append(self.button);
                self.render();
                self.popupannel.on('click', function (e) {
                    var el = Node(e.target);
                    if (el.hasClass('x')) {//关闭
                        self.grandPfon.one('.ks-cal-triAngle').removeClass('ks-cal-triAngle-mask');
                        self.fcon.one('.ks-selectime-mask').addClass('hidden');
                        self.hidePopup();
                    } else if (el.hasClass('item')) {//点选一个值
                        var v = Number(el.html());
                        self.set(self.status, v);
                        self.grandPfon.one('.ks-cal-triAngle').removeClass('ks-cal-triAngle-mask');
                        self.fcon.one('.ks-selectime-mask').addClass('hidden');
                        self.hidePopup();
                    }
                });
                //确定的动作

                self.button.on('click', function () {
                    //初始化读取父框的date

                    var d = typeof self.father.dt_date == 'undefined' ? self.father.date : self.father.dt_date;
                    d.setHours(self.get('h'));
                    d.setMinutes(self.get('m'));
                    d.setSeconds(self.get('s'));
                    self.father.fire('timeSelect', {
                        date: d
                    });
                    if (self.father.popup && self.father.closable) {
                        self.father.hide();
                    }
                });
                //ctime上的键盘事件，上下键，左右键的监听
                //TODO 考虑是否去掉


                self.ctime.on('keyup', function (e) {
                    if (e.keyCode == 38 || e.keyCode == 37) {//up or left
                        //e.stopPropagation();
                        e.preventDefault();
                        self.add();
                    }
                    if (e.keyCode == 40 || e.keyCode == 39) {//down or right
                        //e.stopPropagation();
                        e.preventDefault();
                        self.minus();
                    }
                });
                //上的箭头动作

                self.ctime.one('.u').on('click', function () {
                    self.grandPfon.one('.ks-cal-triAngle').removeClass('ks-cal-triAngle-mask');
                    self.fcon.one('.ks-selectime-mask').addClass('hidden');
                    self.hidePopup();
                    self.add();
                });
                //下的箭头动作

                self.ctime.one('.d').on('click', function () {
                    self.grandPfon.one('.ks-cal-triAngle').removeClass('ks-cal-triAngle-mask');
                    self.fcon.one('.ks-selectime-mask').addClass('hidden');
                    self.hidePopup();
                    self.minus();
                });
                //弹出选择小时

                self.ctime.one('.h').on('click', function () {
                    var in_str = self.parseSubHtml(self.h_a);
                    self.status = 'h';
                    self.grandPfon.one('.ks-cal-triAngle').addClass('ks-cal-triAngle-mask');
                    self.fcon.one('.ks-selectime-mask').removeClass('hidden');
                    self.showPopup(in_str);
                });
                //弹出选择分钟

                self.ctime.one('.m').on('click', function () {
                    var in_str = self.parseSubHtml(self.m_a);
                    self.status = 'm';
                    self.grandPfon.one('.ks-cal-triAngle').addClass('ks-cal-triAngle-mask');
                    self.fcon.one('.ks-selectime-mask').removeClass('hidden');
                    self.showPopup(in_str);
                });
                //弹出选择秒

                self.ctime.one('.s').on('click', function () {
                    var in_str = self.parseSubHtml(self.s_a);
                    self.status = 's';
                    self.grandPfon.one('.ks-cal-triAngle').addClass('ks-cal-triAngle-mask');
                    self.fcon.one('.ks-selectime-mask').removeClass('hidden');
                    self.showPopup(in_str);
                });


            };
            this._init();


        }

    });

    return Calendar;

}, {requires: ["node", "cute/calendar/calendar/base"]});

KISSY.add("cute/dialog/index",function(t,i,e,c,o,u){return{alert:i,confirm:e,prompt:c,iframe:o,custom:u}},{requires:["cute/dialog/alert","cute/dialog/confirm","cute/dialog/prompt","cute/dialog/iframe","cute/dialog/custom","cute/util/statistic"]});KISSY.add("cute/dialog/alert",function(t,e,n,a,i,l){function o(){o.superclass.constructor.call(this)}var c=e.all,s=['<div class="dialog-content alert">','<div class="tip">{content}</div>','<div class="dialog-btn">','<input type="button" class="btn btn-m J_KsDialogBtn" value="',l.CONFIRM,'"/>',"</div>","</div>"].join(""),r=function(t,e){t.on("hide",function(){t.destroy(),e&&e({result:!0})}),t.on("afterRenderUI",function(){var e=c(t.get("el")),n=e.all(".J_KsDialogBtn");n.on("click",function(){t.hide()})})};return t.extend(o,a,{alert:function(e,n,a){var l=i.parseData(n,a),o=l.config,c=i.getDialog(o),d=l.callback;return i.setContent(c,s,{title:o.title,content:o.isHtml?e:t.escapeHTML(e)}),r(c,d),c.show(),o.isNeedDrag&&i.setDragAble(c),c}}),(new o).alert},{requires:["node","sizzle","base","cute/dialog/common","cute/dialog/language"]});KISSY.add("cute/dialog/common",function(e,t,n,i,o){var a=t.all,c={},r={title:"提示",isNeedDrag:!0,closable:!0,closeAction:"hide",mask:!0,effect:{effect:"fade",duration:.2},align:{points:["cc","cc"]},elCls:"common"};return e.mix(c,{parseData:function(t,n){var i,o,a=e.clone(r);return e.isPlainObject(t)?i=e.mix(a,t):e.isFunction(t)?(i=a,n=t):(o=n,i=a),e.isFunction(n)&&(o=n),{config:i,callback:o}},getDialog:function(e){return new o.Dialog(e)},setDragAble:function(e){var t,n=a(e.get("el")),i=this;t=i._initDD(n,[".ks-stdmod-header"])},_initDD:function(e,t){return new i.Draggable({node:e,cursor:"move",move:!0,handlers:t})},setContent:function(t,n,i){return t.set("bodyContent",e.substitute(n,i)),t.set("headerContent",i.title),this}}),c},{requires:["node","sizzle","dd","overlay"]});KISSY.add("cute/dialog/confirm",function(t,n,e,i,a){function o(){o.superclass.constructor.call(this)}var s=n.all,l=['<div class="dialog-content confirm">','<div class="tip">{content}</div>','<div class="dialog-btn">','<input type="button" class="btn btn-m J_KsDialogBtn ks-dialog-yes" value="确定"/>\n','<input type="button" class="btn btn-m btn-weak J_KsDialogBtn ks-dialog-no" value="取消"/>',"</div>","</div>"].join(""),c=function(t,n){t.on("hide",function(){t.destroy(),n&&n({result:!!t.result})}),t.on("afterRenderUI",function(){var n=s(t.get("el")),e=n.all(".J_KsDialogBtn");e.on("click",function(n){var e=s(n.target);t.result=e.hasClass("ks-dialog-yes"),t.hide()})})};return t.extend(o,i,{confirm:function(n,e,i){var o=a.parseData(e,i),s=o.config,r=a.getDialog(s),u=o.callback;return a.setContent(r,l,{title:s.title,content:s.isHtml?n:t.escapeHTML(n)}),c(r,u),r.show(),s.isNeedDrag&&a.setDragAble(r),r}}),(new o).confirm},{requires:["node","sizzle","base","cute/dialog/common"]});KISSY.add("cute/dialog/prompt",function(t,e,a,n,i){function l(){l.superclass.constructor.call(this)}var o=e.all,s=['<div class="dialog-content prompt">','<div class="tip">',"{content}","{inputType}","</div>",'<div class="dialog-btn">','<input type="button" class="btn btn-m J_KsDialogBtn ks-dialog-yes" value="确定"/>\n','<input type="button" class="btn btn-m btn-weak J_KsDialogBtn ks-dialog-no" value="取消"/>',"</div>","</div>"].join(""),r='<input type="text" class="text dialog-input J_KsDialogPromptTxt" style="width:193px;">',c='<textarea class="text J_KsDialogPromptTxt dialog-textArea" style="margin-top:3px;"></textarea>',p=function(e,a){e.on("hide",function(){e.destroy(),a&&a({result:!!e.result,txt:e.txt||""})}),e.on("afterRenderUI",function(){var a=o(e.get("el")),n=a.all(".J_KsDialogBtn"),i=a.all(".J_KsDialogPromptTxt");t.later(function(){i.fire("focus")},100),n.on("click",function(t){var a=o(t.target),n=a.hasClass("ks-dialog-yes"),l=n?i.val():"";e.result=n,e.txt=l,e.hide()})})};return t.extend(l,n,{prompt:function(e,a,n){var l=i.parseData(a,n),o=l.config,u=i.getDialog(o),d=l.callback;return i.setContent(u,s.replace("{inputType}",o.inputType?c:r),{title:o.title,content:o.isHtml?e:t.escapeHTML(e)}),p(u,d),u.show(),o.isNeedDrag&&i.setDragAble(u),u}}),(new l).prompt},{requires:["node","sizzle","base","cute/dialog/common"]});KISSY.add("cute/dialog/iframe",function(e,t,i,r,o){function n(){n.superclass.constructor.call(this)}var a=(t.all,['<div class="dialog-content iframe">','<iframe src="{url}" width="100%" height="100%" frameborder="0"></iframe>',"</div>"].join(""));return e.extend(n,r,{iframe:function(e,t){t.height||(t.height=280);var i=o.parseData(t),r=i.config,n=o.getDialog(r);o.setContent(n,a,{title:r.title,url:e}),n.on("hide",function(){n.destroy()}),n.show();var d=n.get("el"),s=d.children(".ks-contentbox"),c=s.children(".ks-stdmod-header"),l=s.children(".ks-stdmod-body"),h=s.children(".ks-stdmod-footer");return l.css("height",s.innerHeight()-c.outerHeight()-h.outerHeight()),r.isNeedDrag&&o.setDragAble(n),n}}),(new n).iframe},{requires:["node","sizzle","base","cute/dialog/common"]});KISSY.add("cute/dialog/custom",function(t,e,o,a,n){function i(){i.superclass.constructor.call(this)}var s=e.all,c='<div class="dialog-content custom"></div>';return t.extend(i,a,{custom:function(t,e){var o=s(t),a=o.data("widget");if(!a){var i=n.parseData(e),r=i.config;a=n.getDialog(r),n.setContent(a,c,{title:r.title}),a.on("afterRenderUI",function(){var t=a.get("el").one(".dialog-content");t.append(o),o.show(),r.isNeedDrag&&n.setDragAble(a)}),o.data("widget",a)}var l=e.autoShow;return null==l&&(l=e.autoShow=!0),l&&a.show(),a}}),(new i).custom},{requires:["node","sizzle","base","cute/dialog/common"]});KISSY.add("cute/util/statistic",function(t,e,a,i){"use strict";var r=e.all,c={collect:function(e){if(e){var a=t.namespace("CUTE",!0);if(a.statistic&&"true"!=localStorage.getItem("disableStatistic")){var c=location.host,l=null,s=r("#header h1");s.length||(s=r("header h1")),s.length&&(l=s.text());var n=document.title,o=null,u=r("#header .hd-userimg");if(u.length||(u=r("header .hd-userimg")),u.length){var d=u.attr("src"),h=d.match(/http:\/\/work\.alibaba-inc\.com\/photo\/(\d+)\.(\d+)x(\d+)\.jpg/);h&&h[1]&&(o=h[1])}var g=null,m=t.Config.packages.cute.base;if(m){var p=m.match(/(.+)\/sd\/cute3\/((?:\d+\.){2}\d+)\/js/);p&&p[2]&&(g=p[2])}var v={host:c,project_name:l,page_title:n,user_id:o,cute_version:g,timestamp:(new Date).getTime()},f=new Image;f.src=e+"?"+i.param(v),localStorage.setItem("disableStatistic","true")}}}};return c.collect("http://eb.alisec.org/statistic.gif"),c},{requires:["node","sizzle","cute/util/"]});KISSY.add("cute/util/index",function(A,t,n,i,e,a,r,o){"use strict";var g=t.all,c={loadingGifData:"data:image/gif;base64,R0lGODlhIAAgAPeWAHp6eqOjo1JSUvT09M3NzfPz89fX1/Dw8Ozs7OLi4tXV1c/Pz+7u7vHx8dHR0d/f387Ozu/v79DQ0Ovr6/Ly8tTU1OPj4+np6dbW1uTk5Orq6uDg4NjY2Nra2vX19dzc3N3d3d7e3ujo6OHh4e3t7efn5+bm5uXl5dLS0qioqNnZ2dvb29PT06urq6ampnx8fLW1tcjIyKqqqn19faysrMnJyampqYGBgaWlpaSkpLKysri4uMbGxn5+foaGhlZWVlxcXLu7u7Ozs7a2tsvLy7S0tLy8vFhYWMTExIiIiJqamp6enn9/f5mZmZOTk7m5ubq6umFhYcLCwpSUlISEhJWVlV9fX3Z2dqCgoIKCgrCwsFdXV52dnb29vbe3t3Nzc6GhoWRkZHt7e8HBwb6+vsPDw6+vr4WFhZGRkcrKyq2trZycnHFxcV1dXZCQkMDAwJiYmK6url5eXnh4eFRUVMXFxbGxsVVVVWVlZWJiYoODg4CAgGNjY8fHx5aWloeHh4yMjJeXl3R0dJubm4mJiXd3d46OjltbW3V1dWZmZouLi4qKimBgYFpaWmhoaGdnZ4+Pj2xsbFNTU2pqaqenp8zMzPX19QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpENTlDMjg2MkNCN0QxMUUzODlGQThCQzZBRUVDNjA5MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpENTlDMjg2M0NCN0QxMUUzODlGQThCQzZBRUVDNjA5MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ1OUMyODYwQ0I3RDExRTM4OUZBOEJDNkFFRUM2MDkwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ1OUMyODYxQ0I3RDExRTM4OUZBOEJDNkFFRUM2MDkwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQoAlgAsAAAAACAAIAAACP8ALQkcSNDSByFKCGXJ4qMKjTQDCkqcOEFgHQAYM2JUNLGjwAJEcISwpEGMxoxCBN5IQcGjQARFAgSAIXCMgw0IDlgwEGSDpT4CBFxJ4FEEDZkBdhxwaclNUAF5OkxEcDSAiwpMBQ4w8yMoo5EEBwyRmWJEVoIL2gRlEwGtTBw+zxJEcSQoF4I7ZEroSAEEhwYdhwS9A1bgijcRX4qw8AADgUqQFTywIAIBQSZfkAj00PEx5M+gIRMgaNlSgQElUGxgUHBB6NeVFhTUoIKACRCQiRJ0ADu0g4IJIK9QALkiwQq9QWMlOCGyBMiACRpI/tlAwQaQF0CAnHhgB+qQpYbkFb29UgHg4CvpHjgAMgTelZYSjJCeNcEDkB1Mr3RB4v7eCkikAWQYPABZBhIhQJ0GEm0A2QMIZBCdRCP0BsJEA1zwgXEuffAaB90N1MB5BFGwAQacSZSBZ5WEEOJAHEhgAYkDwGdBRxEYoAAJHZnwmX2WBFcJAaXJ9VJ5hVkyAHGVQFDkWQi4VgkLJA50AHwQnCDXitm1JREDz0FmwIQd/ScBjx0dgFxsp21wAQMUDHDABAkwaGAlFcjn0QAhEEDUgLCpYAkFEozwokcMnOchbAScd+hZEzQmAQQELKDAByZUOVFAACH5BAUKAJYALAIAAAAeABUAAAjbAC0JHDjwRI0nalKkaAEDCQeCECMKPCBQQYCLGC/GkchxwAYCFywxyJERYw2BS4IU4GjpQIVKlRQIZAGiRIQGF0ZAKGEJBQAAVXhGZOAAZiUMK1lasvETgI8REA8UrUQgg1KCb2b8PGNVoAcMMCFMuAqRQ5afaBoITACTgAayETsw+alDINhKFuBK5PHzRVcRHTzolbjGiYTBZBkIJBEBsdIaZ7Y8cczShgABkChzhHAZkWaJJi5b+RyxweUjpCFGuNwoNcEEl8O4HhjjMoDZAsFcXoO7JRI3RAICACH5BAUKAJYALAsAAAAVAB8AAAjXAEk8MOBgwQIJCkCU8GCpocOHJypJnCgRxcOLDRtQpPigYRAIAzBaynCBAYUCESYkYGApRIAAMBCInGlJyssALUrQFIkCx0sZF3ZiTJDipQ4KQi9acPGyRtKLCl7mCPrUIZQiIKo+PNAwQgOtDSuA6REDrCUjAACkMMsh7RSzGtJSMUshbQ+zDdLuMVsibRKzLNLCMQsjrQ68EmxgAHsigtmGe6K0cKwVigABdDpoRXHk8uCqKORcjsTyqZ0tl62EqDrjsoAoBrQuufxlBNgLUXJ8NUsZY0AAIfkEBQoAlgAsCwACABUAHgAACNsALQkcSFAghwQFEyq8UKmSggMKI1r60LCSBAYSE3qwQKChhAgZE05Y0LDCgJAFEUBo+ABlwRMNCYB0OdBAhQs0CRYQ2IBCToEPurgw8NPSggABpBQdgbRIUQZIZRQtgNRFUQpIKRWdgJRG0RBIvRQlgjTG1Q9SNvy8ALGoJS5nyLSlGQMAADFqaXZgYtdMzg567BqaG3JMD7tUMtBUYheAjxAEG2DhsWJChAcEZNSwJMSuExMFYwgYTXo0FUsIfOzwWdBJ6dI/JlhqEJHAmhd8Dh2xIggNlJkRAwIAIfkEBQoAlgAsAQAKAB8AFgAACOMALQkcSLCgwYOWCgxAyLChBhUETDScaDBBpUorKGoUOOGigo0aG1xcAJLigIsESk48WQmCyoYHLjp4yVDDRQw0EW64+CDnwQEXPkzwWZAEBYITArxYmBOKDAlHKeARIEBNTgMBAuQoIdAG1R8kVVpwkZXHQAqFqAKZCdKCjaxaGhC0EIbqES8bWZANIOOCwQ55qArokWHik6wBWkg8uIENVTlGYaAYQaLBCQNGKliqkbXIUIYHlNxJYYkFgNOoT2OxFKFFpQIaV5Cw1CJ16hkMLB1VaUBHkz83elCZYiPGgYYBAQAh+QQFCgCWACwAAAoAHwAWAAAI3QAHWBpIsKDBgwgHdpmEZUXChxCnCBCQAqLFg3MmQrjIcSCfiSY6cgQysYHIiyQFRDhp8dHEESwhvpjII+ZDLgIkabGZkIWQDDyDdmxQoCAJL02EcpBgoWiBJAAAkOFpopJVBgONRJ2hIiYCCFZDECzgJ+qNDicRLLDKoijBElABMKnJMQMBqwtWGtzgIyqAQSIsGrBaSQKJhCfQRNUToUCaECIOUNAwYsEDSw+sVjgAsYGWF0EshQhAujRpI5YoSBgh8OKIlUhMm8bBufXJETF20EjhQkaRMgYoPAwIACH5BAUKAJYALAAAAQAWAB8AAAjTAC0JHCgwAcGDCAk2APODR8KHBb8IEHAFYsIVeCYKeIHAIkELYSZuEeKRYIE5E4FAKElQxsQfRFgSfDGxhcyDUgAVuMkzIRFAMEb0tEQDAIAgQ/0Y5TD0j1ENQ28YpRDV6IGhi4yaGKrEKIqhOgCIGTN0RRkRQ9MiPFBpR1o1AQI4GLogLg6DPYfETWGhJwIacV1g6FmiRdwATzre1KAjro0GAzZcYEBhwIEJCaAipNAnx0oNlUKLDq0CoogGlj6MHk1gp8UJDzBIgEBggYIPJgoEBAAh+QQFCgCWACwAAAAAFgAfAAAI1wAtCRxI0FKFJTMStQES5coUIwUKDiwhcIiAixgvOpJoiQKMGSgslaCTEeMSiSWcAABQRaCdOh0uMABBIEWHgiOSrATQhAFHjiV0AuhR5ifHAYFW3uBglGOXlTMUNOXYZCWZqT8h4BiAtWtXFWbSiPBKEEmAABDIDhxydoRagS3O+nyb4mxEumcpvLUU5+yEvTvOhthbI0COkG8zVCCxt7FEChsweHg7wEGlShb2JrhMAAFlBZcheFZ7wHIlCCfeMpBwuZKBBqQrXF5wl+yAEAQSOGZQ22hAADs=",isSecure:/^https/i.test(window.location.protocol),setDefaultValue:function(){var t=function(t,n,i){A.isUndefined(t[n])&&(t[n]=i)};return function(n,i,e){A.isObject(i)?A.each(i,function(A,i){t(n,i,A)}):t(n,i,e)}}(),unparam:function(t,n){if(A.isObject(t))return t;if(n){var i=t||location.href,e=i.indexOf("?");t=e>-1?i.substring(e+1):""}var a={};return t&&A.each(t.split("&"),function(t){var n=t.split("="),i=n[0],e=n[1];e=decodeURIComponent(e||"");var r=a[i];null==r?a[i]=e:A.isArray(r)?r.push(e):a[i]=[r,e]}),a},param:function(t){t=t||{};var n=[];for(var i in t){var e=t[i];null!=e&&(A.isArray(e)?A.each(e,function(A){n.push(i+"="+encodeURIComponent(A))}):n.push(i+"="+encodeURIComponent(e)))}return n.join("&")},stringToObject:function(t,n){var i=null;try{i=new Function("return "+A.trim(t))()}catch(e){null!=n&&(i=n),A.log("stringToObject error!\n"+t,"error")}return i},getCommentData:function(A){A=g(A);var t=null;if(!A||!A.length)return t;var n=A[0],i=n.firstChild;return i&&"#text"==i.nodeName&&(i=i.nextSibling),i&&"#comment"==i.nodeName&&(t=c.stringToObject(i.data)),t},getConfigData:function(A){A=g(A);var t=null;return A&&A.length?t=c.stringToObject(A.html()):t},getConfig:function(A){A=g(A);var t=null;if(!A||!A.length)return t;var n=A[0],i=n.tagName.toLowerCase();return"script"==i?c.getConfigData(A):c.getCommentData(A)},getTextWidth:function(A){var t=g("#_text");return t.length||(g(document.body).append('<div id="_text" style="position:absolute;left:-10000px;top:-10000px;"></div>'),t=g("#_text")),t.html(A||""),t.width()},getArray:function(t,n){n=n||",";var i;return i=A.isArray(t)?t:"string"==typeof t?t?t.split(n):[]:t?[t]:[]},getArrayMap:function(t){var n=this;t=n.getArray(t);var i={};return A.each(t,function(A){i[A]=!0}),i},getMapValues:function(t){var n=[];return A.each(t,function(A){n.push(A)}),n},getIOConfig:function(t){return A.mix({type:"post",dataType:"json",cache:!1,serializeArray:!1},t)},getSelectMap:function(A,t){A=g(A);var n={};return A.all("option").each(function(A){var i=A.val();(t||i)&&(n[i]=A.text())}),n},callbackByDialog:function(A,t){A?A.on("destroy",function(){t()}):t()},alias:function(t,n,i){t&&A.isUndefined(t[n])&&!A.isUndefined(t[i])&&(t[n]=t[i])},createNodesMap:function(t,n,i,e,a){var r=this;e=e||function(A){return A.id},a=a||"children",A.each(n,function(A){var n=e(A);t[n]=A,A._parentId=i,A[a]&&r.createNodesMap(t,A[a],n,e,a)})},getPath:function(A,t,n){n=n||function(A){return A.id};var i=A[t];if(!i)return[];if("root"==t)return["root"];var e=[];e.unshift(t);for(var a=i._parentId;;){if("root"==a)break;i=A[a],e.unshift(n(i)),a=i._parentId}return e},getLanguage:function(){var A=null,t=g(document.body);return A=t.hasClass("language-en")?"en":"zh"},createVarMap:function(A,t){var n=this;g(A).children().each(function(A){var i=A[0],e=i.tagName.toLowerCase(),a=A.attr("type");if("input"==e&&("hidden"==a||"text"==a)||"textarea"==e){var r=A.attr("name");r&&(t[r]=A.val())}else if("form"==e){var r=A.attr("name");if(r){var o={};n.createVarMap(A,o),t[r]=o}}})}},l={AnimUtil:i,CalendarUtil:e,FormUtil:a,TaobaoUtil:r,WindowUtil:o};return A.each(l,function(t){A.mix(c,t)}),A.mix(c,l),c},{requires:["node","sizzle","cute/util/anim","cute/util/calendar","cute/util/form","cute/util/taobao","cute/util/window"]});KISSY.add("cute/util/anim",function(i,t,n,e){"use strict";var a=t.all;return{anim:function(t,n,a,h,o){return i.each(t,function(i){e(i,n,a,o||"easeOut",h).run()}),t},show:function(i,t){var n=this;n.anim(a(i),{height:"show",opacity:"show"},.2,t)},hide:function(i,t){var n=this;n.anim(a(i),{height:"hide",opacity:"hide"},.2,t)},toggle:function(i,t){var n=this;n.anim(a(i),{height:"toggle",opacity:"toggle"},.2,t)}}},{requires:["node","sizzle","anim"]});KISSY.add("cute/util/calendar",function(e){"use strict";var t={leftPad:function(e){return e+="",1==e.length&&(e="0"+e),e},formatDate:function(a,r){if(!e.isDate(a))return"";var s;s=e.isString(r)?r:r?"{y}-{m}-{d} {h}:{i}:{s}":"{y}-{m}-{d}";var l=t.leftPad,n=a.getFullYear(),i=l(a.getMonth()+1),d=l(a.getDate()),u=l(a.getHours()),o=l(a.getMinutes()),g=l(a.getSeconds());return e.substitute(s,{y:n,m:i,d:d,h:u,i:o,s:g})},parseDate:function(a){if(e.isDate(a))return a;if(t.dateReg.test(a)){var r=a.split("-"),s=parseFloat(r[0]),l=parseFloat(r[1])-1,n=parseFloat(r[2]);return new Date(s,l,n,0,0,0)}if(t.dateTimeReg.test(a)){var r=a.split(" "),i=r[0],d=r[1],u=i.split("-"),o=d.split(":"),s=parseFloat(u[0]),l=parseFloat(u[1])-1,n=parseFloat(u[2]),g=parseFloat(o[0]),p=parseFloat(o[1]),v=parseFloat(o[2]);return new Date(s,l,n,g,p,v)}return null},dateReg:/^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/,dateTimeReg:/^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01]) (0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/,dateValidator:function(e,a,r,s){var l=s.get("target"),n=l.parent();n.hasClass("calendar-wrapper")&&(n=n.parent());var i=n.prev(),d=n.next(),u=i&&i.hasClass("interval-date-separator")||d&&d.hasClass("interval-date-separator");if(u){var o,g;i&&i.hasClass("interval-date-separator")?(o=i.prev().one(".calendar"),g=l):(o=l,g=n.next().next().one(".calendar"));var p,v,m=o.val(),f=g.val(),c=o.attr("_date_required"),h=g.attr("_date_required");if(null==c||m||null==h||f?null==c||m?null==h||f?(p=!0,v=""):(p=!1,v="结束时间不可以为空！"):(p=!1,v="开始时间不可以为空！"):(p=!1,v="开始时间和结束时间都不可以为空！"),!p)return this.msg("error",v),p;var F,R,D,_,T,w,C,S="true"==o.attr("_showtime"),q="true"==g.attr("_showtime");if(w=S?t.dateTimeReg:t.dateReg,C=q?t.dateTimeReg:t.dateReg,R=m?w.test(m):!0,D=f?C.test(f):!0,F=R&&D){var x=m,y=f;x&&y?(x=parseFloat(x.replace(/[-: ]/g,"")),y=parseFloat(y.replace(/[-: ]/g,"")),_=y>=x):_=!0;var M=o.attr("_range");M?(M=parseFloat(M),!isNaN(M)&&M>0?(x=S?m:m+" 00:00:00",y=q?f:f+" 23:59:59",x&&y?(x=t.parseDate(x).getTime(),y=t.parseDate(y).getTime(),T=24*M*60*60*1e3>=y-x):T=!0):T=!0):T=!0}var v;return v=F?_?T?"":o.attr("_rangemessage")||"不能超过"+M+"天！":"时间区间不正确！":"时间格式不合法！",this.msg("error",v),F&&_&&T}var F,N,P=l.val(),Y="true"==l.attr("_showtime");N=Y?t.dateTimeReg:t.dateReg,F=P?N.test(P):!0;var v;return v=F?"":"时间格式不合法！",this.msg("error",v),F}};return t},{requires:[]});KISSY.add("cute/util/form",function(e,r){"use strict";function t(e){return e.replace(i,"\r\n")}var a,n=/^(?:select|textarea)/i,i=/\r?\n/g,u=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;return a={serialize:function(r,t){return e.param(a.getFormData(r),void 0,void 0,t||!1)},getFormData:function(a){var i=[],m={};return e.each(r.query(a),function(r){var t=r.elements?e.makeArray(r.elements):[r];i.push.apply(i,t)}),i=e.filter(i,function(e){return e.name&&!e.disabled&&(e.checked||n.test(e.nodeName)||u.test(e.type))}),e.each(i,function(a){var n,i=r.val(a);if(null!==i){if(i=e.isArray(i)?e.map(i,t):t(i),n=m[a.name],null==n)return void(m[a.name]=i);e.isArray(n)||(n=m[a.name]=[n]),n.push.apply(n,e.makeArray(i))}}),m}}},{requires:["dom"]});KISSY.add("cute/util/taobao",function(){"use strict";return{getTaobaoUserLevel:function(e){if(null==e)return"";var i="<img class='taobao-user-level' src='//img.alicdn.com/newrank/s_",f="";if(e>=4&&10>=e)f="red_1.gif";else if(e>=11&&40>=e)f="red_2.gif";else if(e>=41&&90>=e)f="red_3.gif";else if(e>=91&&150>=e)f="red_4.gif";else if(e>=151&&250>=e)f="red_5.gif";else if(e>=251&&500>=e)f="blue_1.gif";else if(e>=501&&1e3>=e)f="blue_2.gif";else if(e>=1001&&2e3>=e)f="blue_3.gif";else if(e>=2001&&5e3>=e)f="blue_4.gif";else if(e>=5001&&1e4>=e)f="blue_5.gif";else if(e>=10001&&2e4>=e)f="cap_1.gif";else if(e>=20001&&5e4>=e)f="cap_2.gif";else if(e>=50001&&1e5>=e)f="cap_3.gif";else if(e>=100001&&2e5>=e)f="cap_4.gif";else if(e>=200001&&5e5>=e)f="cap_5.gif";else if(e>=500001&&1e6>=e)f="crown_1.gif";else if(e>=1000001&&2e6>=e)f="crown_2.gif";else if(e>=2000001&&5e6>=e)f="crown_3.gif";else if(e>=5000001&&1e7>=e)f="crown_4.gif";else{if(!(e>=10000001))return"";f="crown_5.gif"}return i+f+"'/>"},getTaobaoCommodityStatus:function(e){switch(e+=""){case"-9":return"CC";case"0":return"正常";case"1":return"确认通过";case"-1":return"卖家删除";case"-2":return"卖家下架";case"-3":return"小二下架";case"-4":return"小二删除";case"-5":return"从未上架";default:return""}}}},{requires:[]});KISSY.add("cute/util/window",function(e,a,o,r){"use strict";var n=a.all;return{downloadFile:function(a){a=a||{};var o=a.url,t=a.params;if(r.ie){var i=n(document.body),l=n("#_form"),s=l[0];s||(i.append('<form id="_form" method="post" class="display-none" autocomplete="off"></form>'),l=n("#_form"),s=l[0]);var u=n("#_iframe"),m=u[0];m||(i.append('<iframe id="_iframe" name="_iframe" class="display-none"></iframe>'),u=n("#_iframe"),m=u[0]),s.action=o,s.target="_iframe",l.empty(),s.innerHTML="";for(var c in t){var f=t[c];null!=f&&(l.append('<input type="text" name="'+e.escapeHTML(c)+'"/>'),s.lastChild.value=f)}s.submit()}else Util.openWindow({url:o,params:t,config:{fullScreen:!1}})},openWindow:function(){var a=function(a){a=a||{};var o=a.url,a=a.config||{},n=Util.setDefaultValue;n(a,{fullScreen:!0,width:500,height:300,toolbar:!1,menubar:!1,scrollbars:!1,resizable:!0,location:!1,status:!1}),a.toolbar=a.toolbar?"yes":"no",a.menubar=a.menubar?"yes":"no",a.scrollbars=a.scrollbars?"yes":"no",a.resizable=a.resizable?"yes":"no",a.location=a.location?"yes":"no",a.status=a.status?"yes":"no";var t,i,l,s,u=screen.availWidth+(r.chrome?-10:r.ie?-12:0),m=screen.availHeight+(r.chrome?-58:r.ie?-38:0);a.fullScreen?(t=u,i=m,l=0,s=0):(t=a.width,i=a.height,l=(u-t)/2,s=(m-i)/2);var c=window.open(o,a.name||"_blank",["width=",t,",height=",i,",left=",l,",top=",s,",toolbar=",a.toolbar,",menubar=",a.menubar,",scrollbars=",a.scrollbars,",resizable=",a.resizable,",location=",a.location,",status=",a.status].join(""));e.later(function(){c.focus()})};return function(o){o=o||{};var r=o.url,t=o.params,i=o.method||"post",o=o.config,l=n(document.body),s=n("#_form"),u=s[0];if(u||(l.append('<form id="_form" method="'+i+'" class="display-none" autocomplete="off"></form>'),s=n("#_form"),u=s[0]),u.action=r,o){var m=e.guid("window_");o.name=m,a({url:"about:blank",config:o}),u.target=m}else u.target="_blank";s.empty(),u.innerHTML="";for(var c in t){var f=t[c];null!=f&&(s.append('<input type="text" name="'+e.escapeHTML(c)+'"/>'),u.lastChild.value=f)}u.submit()}}()}},{requires:["node","sizzle","ua"]});KISSY.add("cute/loading/index",function(e,t,i,n,r){"use strict";function o(t){var i=this;e.isString(t)&&(t={target:t}),o.superclass.constructor.call(i,t);var n=i.get("events");e.each(n,function(e,t){i.on(t,e)}),i.fire("create")}var s=t.all;return e.extend(o,n,{createHtml:function(){var t=this,i=r.loading;return e.substitute(i,{iconSize:t.get("iconSize")})},renderUI:function(){var e=this,t=e.get("target");!function(e){if(e[0]!=document.body){var t=e.css("position");"relative"!=t&&"absolute"!=t&&"fixed"!=t&&e.css("position","relative")}}(t);var i=e.createHtml(),n=s(i).prependTo(t);e.set("el",n),t[0]==document.body&&n.css("position","fixed")},bindUI:function(){},init:function(){var e=this;e.renderUI(),e.bindUI(),e.set("inited",!0)},show:function(){var e=this,t=e.get("inited");t||e.init();var i=e.get("el");return i.css({left:0,top:0}),e.fire("show"),e},hide:function(){var e=this,t=e.get("inited");if(t){var i=e.get("el");i.css({left:"-10000px",top:"-10000px"}),e.fire("hide")}return e},destroy:function(){var e=this,t=e.get("inited");return t&&(e.get("el").remove(),e.set("el",null),e.set("inited",!1)),e},delay:function(t,i){var n=this;return t=500>t?500:t,null==i&&(i="hide"),e.later(function(){var e=n[i];e&&e.call(n)},t),n}},{ATTRS:{inited:{value:!1},iconSize:{value:32},el:{},target:{value:s(document.body),setter:function(e){var t=s(e);return t.length||(t=s(document.body)),t}},events:{value:{}}}}),o},{requires:["node","sizzle","base","cute/loading/tpl","cute/util/statistic"]});KISSY.add("cute/loading/tpl",function(){"use strict";return{loading:'<div class="loading loading-{iconSize}x{iconSize} loading-float"></div>'}},{requires:[]});KISSY.add("cute/sidemenu/index",function(e,t,i,a,s,n,r,l,o,d,u){"use strict";function c(t){var i=this;e.isString(t)&&(t={target:t}),c.superclass.constructor.call(i,t);var a=i.get("events");e.each(a,function(e,t){i.on(t,e)}),i.init(),i.fire("create")}var f=t.all,g=window.sessionStorage;return e.mix(c,{iconfonts:{home:"e604",gear:"e600",submit:"e60c",clock:"e60b",document:"e60a",edit:"e621",system:"e622",add:"e623",search:"e625",view:"e624",element:"e62a",eye:"e629",widget:"e628",page:"e626",product:"e627",frame:"e62b"}}),e.extend(c,a,{compareData:function(){var e=this,t=g.getItem("sidemenuData"+e.suffix)||"[]";return t==n.stringify(e.get("data"))},renderUI:function(){var e=this,t=e.get("target"),i=t.children(),a=i.length;if(!a||1==a&&"script"==i[0].tagName.toLowerCase()||!e.compareData()){var n=e.get("data"),r={menus:n,isFixed:e.get("isFixed")},l=new s(u.sidemenu).render(r);t.html(l),g.removeItem("sidemenuScrollTop"+e.suffix)}e.set("el",t.last());var o=e.getActiveId();e.selectMenu(o)},storeHtml:function(){var e=this,t=e.get("target"),i=t.children(),a=i.length;a&&"script"==i[0].tagName.toLowerCase()&&i.item(0).remove();var s=['<ul class="sidemenu-wrapper">',t.one(".sidemenu-wrapper").html(),"</ul>"].join("");g.setItem("sidemenuHtml"+e.suffix,s),g.setItem("sidemenuData"+e.suffix,n.stringify(e.get("data")))},bindUI:function(){var t=this,i=t.get("target");i.delegate("click",".sidemenu-li-url",function(e){var i=f(e.currentTarget),a=i.attr("_id");t.selectMenu(a);var s=t.get("clickEvent");if(s){var n=i.attr("_url"),r=t.get("nodesMap")[a];s.call(t,n,r,i)}e.stopPropagation()});var a=f(document.body);i.delegate("click",".sidemenu-li-children",function(e){var i=f(e.currentTarget);a.hasClass("sidemenu-collapsed")&&i.hasClass("sidemenu-li1")||(t.get("singleExpand")&&i.siblings().removeClass("expanded").each(function(e){l.hide(e.children(".sidemenu-ul"),function(){t.storeHtml()})}),l.toggle(i.toggleClass("expanded").children(".sidemenu-ul"),function(){t.storeHtml()}),e.stopPropagation())}),i.delegate("click",".toolbar-collapse",function(e){f(e.currentTarget);a.hasClass("sidemenu-collapsed")?t.expandSideMenu():t.collapseSideMenu()});var s=i.all(".sidemenu-wrapper"),n=i.all(".sidemenu-toolbar"),r=i.all(".sidemenu-body"),o=t.scrollFn=function(){if(t.get("isFixed")&&r.hasClass("scrollbar")){var i=e.DOM.viewportHeight();r.height(i-(s.hasClass("fixed")?0:s.offset().top-a.scrollTop())-n.outerHeight());var l=t.get("scrollbar");l&&l.refresh()}};f(window).on("scroll",e.buffer(o,10));var d=t.resizeFn=function(){var i=e.DOM.viewportWidth();1175>i?(a.hasClass("sidemenu-collapsed")||t.collapseSideMenu(),n.hide()):n.show(),o()};f(window).on("resize",d),r.on("scroll",function(){g.setItem("sidemenuScrollTop"+t.suffix,r.scrollTop())})},collapseSideMenu:function(){var e=this,t=e.get("target"),i=f(document.body);i.addClass("sidemenu-collapsed"),t.all(".sidemenu-ul2").hide().each(function(e){e.parent(".sidemenu-li").removeClass("expanded"),e.css({display:""})});var a=e.get("fixed");a&&a.refreshTargetWidth&&a.refreshTargetWidth();var s=e.get("scrollbar");s&&s.disable();var n=e.get("collapsedStorageMode");"cookie"==n?r.set("sidemenu-collapsed"+e.suffix,"true",null,null,"/"):g.setItem("sidemenu-collapsed"+e.suffix,"true"),e.storeHtml(),e.fire("collapse")},expandSideMenu:function(){var e=this,t=f(document.body);t.removeClass("sidemenu-collapsed");var i=e.get("fixed");i&&i.refreshTargetWidth&&i.refreshTargetWidth();var a=e.get("scrollbar");a&&a.enable();var s=e.get("collapsedStorageMode");"cookie"==s?r.remove("sidemenu-collapsed"+e.suffix,null,"/"):g.removeItem("sidemenu-collapsed"+e.suffix),e.storeHtml(),e.fire("expand")},createNodesMap:function(e,t,i){for(var a=this,s=0,n=t.length;n>s;s++){var r=t[s];e[r.id]=r,r._parentId=i,r.children=r.children||[],r.url=r.url||"",r.icon=r.icon||"gear",r.iconfont=c.iconfonts[r.icon]||r.icon||"",a.createNodesMap(e,r.children,r.id)}},getPath:function(e){var t=this,i=t.get("nodesMap"),a=i[e];if(!a)return"";if("root"==a.id)return"/root";var s=[];s.unshift(a.id);for(var n=a._parentId;;){if("root"==n){s.unshift("/root");break}a=i[n],s.unshift(a.id),n=a._parentId}return s.join("/")},selectMenu:function(e){var t=this,i=t.get("nodesMap"),a=i[e];if(a){var s=t.get("target");s.all(".active,.cur").removeClass("active").removeClass("cur");var n=t.getPath(e).split("/");if(f("#menu_"+n[2]).addClass("active"),n.length>3){f("#menu_"+n[n.length-1]).addClass("cur");for(var r=f(document.body),l=2;l<n.length-1;l++)if(!r.hasClass("sidemenu-collapsed")||2!=l){var o=f("#menu_"+n[l]).parent().addClass("expanded");o.children(".sidemenu-ul").show(),t.get("singleExpand")&&o.siblings().removeClass("expanded").each(function(e){e.children(".sidemenu-ul").hide()})}}g.setItem("sidemenuActiveId"+t.suffix,e),t.storeHtml()}},initFixed:function(){var e=this,t=e.get("isFixed");if(t){var i=e.get("el");e.set("fixed",new o({target:i})),e.initScrollbar()}},initScrollbar:function(){var e=this,t=e.get("target"),i=t.all(".sidemenu-body");i.hasClass("scrollbar")&&e.set("scrollbar",new d({target:i,el:t.one(".scrollbar-div"),style:{backgroundColor:"#fff"},autoHide:!0,proxyZIndex:3}))},getPageHref:function(){var e=location.href,t=e.lastIndexOf("#");return t>-1&&(e=e.substring(0,t)),e},getActiveId:function(){var e=this,t=e.getPageHref(),i=e.sidemenuActiveIdMap;return e.get("activeId")||i[t]||g.getItem("sidemenuActiveId"+e.suffix)},initSidemenuActiveIdMap:function(){var t=this,i=t.get("nodesMap"),a={};e.each(i,function(e,t){var i=e.url;i&&(a[i]=t)}),t.sidemenuActiveIdMap=a},init:function(){var e=this,t=e.get("keySuffix");e.suffix=t?"_"+t:"";var i=e.get("nodesMap"),a=e.get("data");e.createNodesMap(i,a,"root"),e.initSidemenuActiveIdMap(),e.renderUI(),e.bindUI(),e.get("el").show(),e.initFixed(),e.resizeFn();var s=null,n=e.get("collapsedStorageMode");"cookie"==n?(r.remove("sidemenu-collapsed"+e.suffix),s=r.get("sidemenu-collapsed"+e.suffix)):s=g.getItem("sidemenu-collapsed"+e.suffix),s?e.collapseSideMenu():e.expandSideMenu()},destroy:function(){}},{ATTRS:{el:{},target:{setter:function(e){return f(e)}},activeId:{},data:{value:[]},nodesMap:{value:{}},clickEvent:{},isFixed:{value:!1},fixed:{},scrollbar:{},singleExpand:{value:!0},keySuffix:{value:""},collapsedStorageMode:{value:"cookie"},events:{value:{}}}}),c},{requires:["node","sizzle","base","xtemplate","json","cookie","cute/util/","cute/fixed/","cute/scrollbar/","cute/sidemenu/tpl","cute/util/statistic"]});KISSY.add("cute/fixed/index",function(e,t,i,o,r){"use strict";function s(t){var i=this;e.isString(t)&&(t={target:t}),s.superclass.constructor.call(i,t);var o=i.get("events");e.each(o,function(e,t){i.on(t,e)}),i.init(),i.fire("create")}var a=i.all,c=a(window),n=a(document);return e.extend(s,r,{createPlaceholder:function(){var e=this,t=e.get("target");e.set("_placeholder",t.clone(!0).css("visibility","hidden"))},addPlaceholder:function(){var e=this,t=e.get("target");e.get("_placeholder").insertAfter(t)},removePlaceholder:function(){var e=this;e.get("_placeholder").remove()},bindUI:function(){var i,o,r=this,s=r.get("target"),f=s.offset().top,l=s.outerHeight(),d=r.get("align"),g=r.get("container"),h=r.refreshPosition=function(){var e=n.scrollTop(),c=r.get("_placeholder");"fixed"!==s.css("position")?f=s.offset().top:c&&(f=c.offset().top),g?(i=g.offset().top,o=g.outerHeight()):(i=0,o=t.docHeight()+l);var h=t.viewportHeight();if("top"===d){var u=e,p=r.get("fixedTop");p&&(u=e+p),u>f&&i+o-l>e||!g&&f-e>h?r.fix():r.reset()}else f-e+l>h||e>f?r.fix():r.reset();var v=r.get("_fixed"),c=r.get("_placeholder");if(v&&c){var _=a(document).scrollLeft();s.css("left",c.offset().left-_)}};c.on("resize scroll",e.buffer(h,10));var u=r.refreshTargetWidth=function(){var e=r.get("_fixed");if(e){var t=r.get("_placeholder");t&&s.width(t.outerWidth())}};c.on("resize",e.buffer(u,10)),h()},fix:function(){var e=this,t=e.get("_fixed");if(!t){var i=e.get("offset"),o=e.get("align"),r=e.get("target");if(e.set("_width",r[0].style.width),r.addClass("fixed"),r.css("position","fixed"),"top"===o){var s=i,a=e.get("fixedTop");a&&(s=i+a),r.css("top",s)}else r.css("bottom",i);e.get("placeholder")&&e.addPlaceholder();var c=e.get("_placeholder");c&&r.width(c.outerWidth()),e.set("_fixed",!0),e.fire("fix")}},reset:function(){var e=this,t=e.get("_fixed");if(t){var i,o,r=e.get("align"),s=e.get("target");s.css("position",e.get("_position")),s.removeClass("fixed"),"top"===r?(i=e.get("_top"))?s.css("top",i):s.css("top","auto"):(o=e.get("_bottom"))?s.css("bottom",o):s.css("bottom","auto"),s.css("width",e.get("_width")),e.get("placeholder")&&e.removePlaceholder(),e.set("_fixed",!1),e.fire("reset")}},temp:function(){var e,t,i,o=this,r=o.get("target");o.set("_outerWidth",r.outerWidth()),o.set("_outerHeight",r.outerHeight()),(e=r.css("position"))&&o.set("_position",e),(t=r.css("top"))&&o.set("_top",t),(i=r.css("bottom"))&&o.set("_bottom",i)},init:function(){{var e=this;e.get("target")}e.temp(),e.get("placeholder")&&e.createPlaceholder(),e.bindUI()}},{ATTRS:{target:{setter:function(e){return a(e)}},align:{value:"top"},offset:{value:0},placeholder:{value:!0},_fixed:{value:!1},_width:{},container:{setter:function(e){return a(e)}},events:{value:{}}}}),s},{requires:["dom","node","sizzle","base","cute/util/statistic"]});KISSY.add("cute/scrollbar/index",function(e,o,t,r,l,n){"use strict";function s(o){var t=this;e.isString(o)&&(o={target:o}),s.superclass.constructor.call(t,o);var r=t.get("events");e.each(r,function(e,o){t.on(o,e)}),t.init(),t.fire("create")}var a=o.all;return e.extend(s,r,{createHtml:function(){var o=n.scrollbar;return e.substitute(o,{})},renderUI:function(){var e=this,o=e.get("target");!function(e){if(e.hasClass("scrollbar")||e.addClass("scrollbar"),e[0]!=document.body){var o=e.css("position");"relative"!=o&&"absolute"!=o&&"fixed"!=o&&e.css("position","relative")}}(o);var t=e.get("el");if(t&&t.length)o[0]._scrollbarEl=t;else{var r=e.createHtml();o.append(r);var l=o.last().last();o[0]._scrollbarEl=l,t=l,e.set("el",t)}var n=e.get("style");n&&t.css(n);var s=e.get("proxyZIndex"),c=a(['<div class="scrollbar-proxy" style="',null==s?"":"z-index:"+s+";",'">','<div class="scrollbar-proxy-content"></div>',"</div>"].join("")).appendTo(document.body);e.set("proxyEl",c),e.set("proxyContentEl",c.all(".scrollbar-proxy-content"))},bindUI:function(){var o=this,t=o.get("target"),r=o.target_mousewheelFn=function(e){var t=o.get("disabled");if(!t){var r,n=this;if(o.hide(),r=l.chrome||n!=document.body?n:document.documentElement,e.delta<0){r.scrollTop+=50;var s,c,u=r.scrollTop;n==document.body?(s=a(window).height(),c=l.firefox?document.documentElement.scrollHeight:n.scrollHeight):(s=a(n).outerHeight(),c=n.scrollHeight),u>c-s&&(r.scrollTop=c-s)}else r.scrollTop-=50;o.refresh(),n._scrollbarEl.height()&&e.halt()}};if(t.on("mousewheel",r),t[0]!=document.body){var n=o.body_mousewheelFn=function(){o.refresh()};a(document.body).on("mousewheel",n)}var s=o.refreshFn=e.buffer(function(){o.refresh()},10);t.on("mouseenter",s),t.on("mousemove",s),a(window).on("resize",s);var c=o.target_mouseenterFn=function(){if(o.get("autoHide")&&this!=document.body){var e=this._scrollbarEl;e.parent().css({opacity:1})}};t.on("mouseenter",c);var u=o.target_mousemoveFn=e.buffer(function(){o.target_mouseenterFn.call(this)},10);t.on("mousemove",u);var i=o.target_mouseleaveFn=function(){if(o.get("autoHide")&&this!=document.body){var e=this._scrollbarEl;e.parent().css({opacity:0})}};t.on("mouseleave",i),s();var d=o.get("proxyEl"),v=t[0],h=o.proxyScrollFn=function(){t.scrollTop(d.scrollTop()),o.refresh()},m=o.proxy_mousedownFn=function(){d.on("scroll",h)};d.on("mousedown",m);var p=o.proxy_mouseupFn=function(){d.detach("scroll",h)};d.on("mouseup",p);var g=o.proxy_mouseenterFn=function(){var e=v._scrollbarEl;e.parent().css({opacity:1})};d.on("mouseenter",g);var f=o.proxy_mouseleaveFn=function(){if(o.get("autoHide")&&t[0]!=document.body){var e=v._scrollbarEl;e.parent().css({opacity:0})}};d.on("mouseleave",f)},init:function(){var e=this;e.renderUI(),e.bindUI();var o=e.get("target"),t=e.get("autoHide");!function(e){var o=e[0];if(!t||o==document.body){var r=o._scrollbarEl;r&&r.parent().css({opacity:1})}}(o)},hide:function(){var e=this,o=e.get("target");!function(e){var o=e[0],t=o._scrollbarEl;t.css({right:2,top:0,height:0})}(o)},disable:function(){var e=this;e.set("disabled",!0);var o=e.get("target"),t=e.get("proxyEl");!function(e){var o=e[0],r=o._scrollbarEl;o.scrollTop=0,e.css({overflow:"inherit"}),r.css({display:"none"}),t.css({display:"none"})}(o)},enable:function(){var e=this;e.set("disabled",!1);var o=e.get("target"),t=e.get("proxyEl");!function(e){var o=e[0],r=o._scrollbarEl;e.css({overflow:"hidden"}),r.css({display:"block"}),t.css({display:"block"})}(o)},refresh:function(){var o=this,t=o.get("disabled");if(!t){var r=o.get("target"),n=null;!function(e){var o,t=e[0];o=l.chrome||t!=document.body?t:document.documentElement;var r,s;t==document.body?(r=a(window).height(),s=l.firefox?document.documentElement.scrollHeight:t.scrollHeight):(r=e.outerHeight(),s=t.scrollHeight),n=r*r/s,n>=r&&(n=0);var c=o.scrollTop,u=c+r*c/s,i=t._scrollbarEl;i.css({right:2-o.scrollLeft,top:u,height:n})}(r);var s=r[0],c=o.get("proxyEl"),u=o.get("proxyContentEl"),i=document.body,d=a(i);if(s==i)c.css({position:"fixed",left:"auto",right:2,top:0,height:e.DOM.viewportHeight()}),u.css({height:e.DOM.docHeight()}),c.scrollTop(s.scrollTop);else{var v=r.offset(),h=v.left,m=v.top,p=r.outerWidth(),g=r.outerHeight();c.css({position:"fixed",left:h+p-(l.chrome?8:9),top:m-d.scrollTop(),height:g}),u.css({height:s.scrollHeight}),c.scrollTop(s.scrollTop)}n?c.css("display","block"):c.css("display","none")}},destroy:function(){var e=this,o=e.get("target"),t=e.get("proxyEl"),r=e.target_mousewheelFn;o.detach("mousewheel",r);var l=e.body_mousewheelFn;l&&a(document.body).detach("mousewheel",l);var n=e.refreshFn;o.detach("mouseenter",n),o.detach("mousemove",n),a(window).detach("resize",n);var s=e.target_mouseenterFn;o.detach("mouseenter",s);var c=e.target_mousemoveFn;o.detach("mousemove",c);var u=e.target_mouseleaveFn;o.detach("mouseleave",u);var i=e.proxyScrollFn;t.detach("scroll",i);var d=e.proxy_mousedownFn;t.detach("mousedown",d);var v=e.proxy_mouseupFn;t.detach("mouseup",v);var h=e.proxy_mouseenterFn;t.detach("mouseenter",h);var m=e.proxy_mouseleaveFn;t.detach("mouseleave",m),e.target_mousewheelFn=null,e.body_mousewheelFn=null,e.refreshFn=null,e.target_mouseenterFn=null,e.target_mousemoveFn=null,e.target_mouseleaveFn=null,e.proxyScrollFn=null,e.proxy_mousedownFn=null,e.proxy_mouseupFn=null,e.proxy_mouseenterFn=null,e.proxy_mouseleaveFn=null,e.get("el").remove(),e.set("el",null),e.get("proxyEl").remove(),e.set("proxyEl",null),e.set("proxyContentEl",null),function(e){e.removeClass("scrollbar");var o=e[0];o._scrollbarEl=null}(o)}},{ATTRS:{el:{setter:function(e){return a(e)}},target:{value:a(document.body),setter:function(e){var o=a(e);return o.length||(o=a(document.body)),o}},style:{},disabled:{value:!1},autoHide:{value:!1},proxyEl:{value:null},proxyContentEl:{value:null},proxyZIndex:{value:null},events:{value:{}}}}),s},{requires:["node","sizzle","base","ua","cute/scrollbar/tpl","cute/util/statistic"]});KISSY.add("cute/scrollbar/tpl",function(){"use strict";return{scrollbar:'<div class="scrollbar-wrapper"><div class="scrollbar-div"></div></div>'}},{requires:[]});KISSY.add("cute/sidemenu/tpl",function(){"use strict";return{sidemenu:['<ul class="sidemenu-wrapper">','<li class="sidemenu-toolbar">','<div class="toolbar-collapse">','<div class="collapse-icon icon-e612"></div>','<div class="expand-icon icon-e611"></div>',"</div>","</li>",'<li class="sidemenu-body{{#if isFixed}} scrollbar{{/if}}">','<ul class="sidemenu-ul sidemenu-ul1">',"{{#each menus}}",'<li class="sidemenu-li sidemenu-li1{{#if children.length}} sidemenu-li-children{{/if}}">','<div class="sidemenu-li-a{{#if url}} sidemenu-li-url{{/if}}"',' title="{{text}}"',' _id="{{id}}" _url="{{url}}" id="menu_{{id}}">','<div class="sidemenu-li-icon icon-{{{iconfont}}}"></div>',"{{text}}",'<div class="sidemenu-li-arrow icon-e60d"></div>','<div class="sidemenu-li-blankArrow"></div>',"</div>","{{#if children.length}}",'<ul class="sidemenu-ul sidemenu-ul2">',"{{#each children}}",'<li class="sidemenu-li sidemenu-li2{{#if children.length}} sidemenu-li-children{{/if}}">','<div class="sidemenu-li-a{{#if url}} sidemenu-li-url{{/if}}"',' title="{{text}}"',' _id="{{id}}" _url="{{url}}" id="menu_{{id}}">',"{{text}}",'<div class="sidemenu-li-arrow icon-e60d"></div>',"</div>","{{#if children.length}}",'<ul class="sidemenu-ul sidemenu-ul3">',"{{#each children}}",'<li class="sidemenu-li sidemenu-li3{{#if children.length}} sidemenu-li-children{{/if}}">','<div class="sidemenu-li-a{{#if url}} sidemenu-li-url{{/if}}"',' title="{{text}}"',' _id="{{id}}" _url="{{url}}" id="menu_{{id}}">',"{{text}}","</div>","</li>","{{/each}}","</ul>","{{/if}}","</li>","{{/each}}","</ul>","{{/if}}","</li>","{{/each}}","</ul>",,"</li>","</ul>"].join("")}},{requires:[]});

KISSY.add("cute/auth/lib/rule/rule",function(e,t,r){function n(t,r,i){var a=this;return e.isString(t)&&e.isFunction(r)?(e.isObject(i)||(i={args:[]}),e.mix(i,{name:t,validation:r}),void n.superclass.constructor.call(a,i)):a}return e.extend(n,t,{validate:function(){var t=this,r=t.get("validation"),n=t._getArgs(),i=t.get("_defer"),a=r.apply(t,n);if(e.isBoolean(a)){var u=a;return a=i.promise,i[u&&"resolve"||"reject"](t),a}return a},msg:function(t,r){var n=this;if(!e.isString(t)&&!e.isString(r))return n;var i=n.get("msg");return r?(i[t]=r,r):i[t]},_getArgs:function(){var e=this,t=new r.Defer,n=e.get("field"),i=[e.get("value"),e.get("propertyValue"),t,n];return e.set("_defer",t),i}},{ATTRS:{name:{value:""},value:{value:"",getter:function(e){var t=this.get("target");return t.length?t.val():e}},propertyValue:{value:"",getter:function(e){var t=this.get("target");return t.length?t.attr(this.get("name")):e}},msg:{value:{error:"",success:""}},validation:{value:function(){}},target:{value:""},field:{value:""},_defer:{value:""}}}),n},{requires:["base","promise"]}),KISSY.add("cute/auth/lib/rule/default",function(e){return{required:function(t){this.msg("error")||this.msg("error","不可以为空！");var r=this.get("target"),n=["radio","checkbox"];if(e.inArray(r.attr("type"),n)){var i=!1;return r.each(function(e){return e.prop("checked")?(i=!0,!1):void 0}),i}return!!e.trim(t)},pattern:function(e,t){return this.msg("error")||this.msg("error","不符合要求！"),""==e?!0:new RegExp(t).test(e)},number:function(t){return this.msg("error")||this.msg("error","必须是数字！"),""==t?!0:/^([+-]?)\d*\.?\d+$/.test(e.trim(t))},"int":function(t){return this.msg("error")||this.msg("error","必须是整数！"),""==t?!0:/^([+-]?)\d+$/.test(e.trim(t))},"positive-int":function(t){return this.msg("error")||this.msg("error","必须是正整数！"),""==t?!0:/^[123456789]\d*$/.test(e.trim(t))},max:function(e,t){if(this.msg("error")||this.msg("error","必须小于等于"+t+"！"),""==e)return!0;var r=this.get("target");return"checkbox"==r.attr("type")&&(e=0,r.each(function(t){t.prop("checked")&&e++}),this.msg("error")||this.msg("error","最多只能选择"+t+"项！")),Number(e)<=Number(t)},min:function(e,t){if(this.msg("error")||this.msg("error","必须大于等于"+t+"！"),""==e)return!0;var r=this.get("target");return"checkbox"==r.attr("type")&&(e=0,r.each(function(t){t.prop("checked")&&e++}),this.msg("error")||this.msg("error","最小必须选择"+t+"项！")),Number(e)>=Number(t)},equal:function(t,r){return this.msg("error")||this.msg("error","值必须等于"+r+"！"),""==t?!0:e.trim(r)===e.trim(t)},"equal-field":function(t,r){if(this.msg("error")||this.msg("error","二个字段值必须相同！"),""==t)return!0;var n=this.get("field"),i=n.get("host");if(!i)return!0;var a=i.getField(r);if(!a)return!0;var u=a.get("target").val();return e.trim(u)===e.trim(t)},email:function(t){return this.msg("error")||this.msg("error","邮箱格式不合法！"),""==t?!0:/^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/.test(e.trim(t))},mobile:function(t){return this.msg("error")||this.msg("error","手机号码格式不合法！"),""==t?!0:/^0?\d{9,11}$/.test(e.trim(t))},date:function(t){return this.msg("error")||this.msg("error","日期格式不合法！"),""==t?!0:/^(?:(?!0000)[0-9]{4}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2\2(?:29))$/.test(e.trim(t))}}}),KISSY.add("cute/auth/lib/rule/ruleFactory",function(e,t,r,n,i){var a=function(){var e=this;a.superclass.constructor.call(e)};return a.rules={},e.mix(a.rules,i),e.mix(a,{register:function(t,r){e.isObject(t)?e.mix(a.rules,t):a.rules[t]=r},create:function(e,t){return new n(e,a.rules[e],t)}}),a},{requires:["node","base","cute/auth/lib/rule/rule","cute/auth/lib/rule/default"]}),KISSY.add("cute/auth/lib/msg/base",function(e,t,r,n){function i(e){var t=this;e||(e={}),i.superclass.constructor.call(t,e)}var a=r.all,u=".auth-msg";return e.extend(i,t,{render:function(){var e=this,t=e.get("target");if(!t.length)return!1;var r=e._getWrapper();e.set("wrapper",r);var n=e.get("isExist");n||r.hide();var i=e.get("host");i.on("error",function(t){var r=t.rule,n=r.msg("error"),i="error";e.show(i,n)}),i.on("success",function(t){var r=t.msg,n=t.style;r||n?(n=t.style||"success",e.show(n,r)):e.hide()})},hide:function(){var t=this,r=t.get("wrapper");e.buffer(function(){r.slideUp(t.get("speed"))},50)()},show:function(t,r){var n=this;if(!e.isString(t)||!e.isString(r))return n;var i=n.get("wrapper");e.buffer(function(){var e={style:t,msg:r};n._create(e),i.slideDown(n.get("speed"))},50)()},_create:function(e){var t=this,r=t.get("tpl"),i=t.get("wrapper"),a=new n(r).render(e);return i.html(a)},_getWrapper:function(){var e=this,t=e.get("wrapper"),r=e.get("target");if(!r.length)return e;var n=r.attr("msg-wrapper");if(n&&(t=a(n)),!t||!t.length){if(r.length>1){r=r.item(r.length-1);var i=a(r.parent());(i.hasClass("radio")||i.hasClass("checkbox"))&&(r=r.parent())}var i=a(r.parent());t=a('<div class="msg-wrapper"></div>').appendTo(i)}return t}},{ATTRS:{host:{value:""},target:{value:"",getter:function(e){return a(e)}},tpl:{value:'<p class="auth-msg auth-{{style}}">{{msg}}</p>'},wrapper:{value:"",getter:function(e){return a(e)}},isExist:{value:!1,getter:function(){var e=this,t=e.get("wrapper");return t.length?t.all(u).length:!1}},speed:{value:.3}}}),i},{requires:["base","node","xtemplate"]}),KISSY.add("cute/auth/lib/utils",function(S,DOM,undefined){var Utils={toJSON:function(cfg){cfg=cfg.replace(/'/g,'"');try{eval("cfg="+cfg)}catch(e){S.log("data-valid json is invalid")}return cfg},guid:function(){return"AUTH_"+S.guid()},getEvent:function(e){var t="blur",r=DOM.attr(e,"type")||DOM.attr(e,"data-type");switch(r){case"select":t="change";break;case"select-multiple":case"radio":t="click change";break;case"checkbox":t="click change";break;default:t="blur"}return t},getValue:function(e){var t=[],r=DOM.attr(e,"type");switch(r){case"select-multiple":S.each(e.options,function(e){e.selected&&t.push(e.value)});break;case"radio":case"checkbox":S.each(e,function(e){e.checked&&t.push(e.value)});break;default:t=DOM.val(e)}return t}};return Utils},{requires:["dom"]}),KISSY.add("cute/auth/lib/field/field",function(e,t,r,n,i,a,u,s,o,c){function l(t){var r=u.rules,n={},i=t.attr("test-rules");if(i){var a={};e.each(i.split(","),function(e){r[e]&&(a[e]=r[e])}),r=a}return e.each(r,function(e,r){t.hasAttr(r)&&(n[r]={msg:{error:t.attr(r+"-msg"),success:t.attr(r+"-success-msg")||v,warn:t.attr(r+"-warn-msg")||v},propertyValue:t.attr(r)})}),n}function g(t){var r={};if(t=h(t),!t||!t.length)return r;var n=l(t);e.isEmptyObject(n)||(r.rules=n);var i=t.attr("auth-event");return i&&(r.event=i),r}function f(t,r){var n=this;n._validateDone={},n._cache={};var i=g(t);return r=e.merge(m,r,i),n._cfg=r,e.mix(r,{target:t}),n._storage={},f.superclass.constructor.call(n,r),n._init()}var h=i.all,v="",d="data-field",m={event:"blur",style:{success:"ok",error:"error"}};return e.mix(f,{_defer:new a.Defer}),e.extend(f,r,{_init:function(){var t=this,r=t._cfg,n=t.get("target"),i=e.merge({},r.rules);t._groupTarget(),t._renderMsg(),e.each(i,function(e,r){!t._storage[r]&&u.rules[r]&&t._createRule(r,e)}),n.data(d,t);var a=n.getDOMNode();return t._targetBind(r.event||c.getEvent(a)),t},_groupTarget:function(){var t=this,r=t.get("target");if(e.inArray(r.attr("type"),["checkbox","radio"])){var n=r.getDOMNode().form,i=r.attr("name"),a=[];e.each(document.getElementsByName(i),function(e){e.form==n&&a.push(e)}),r=h(a),t.set("target",r)}return r},_targetBind:function(t){var r=this,n=r.get("target");return n.length?(n.on(t,function(){e.later(function(){r.validate()})}),r):!1},_renderMsg:function(){var e=this,t=e.get("msg");if(""==t){var r=e._cfg.msg||{};t=new o(r)}var n=e.get("target");return t.set("target",n),t.set("host",e),e.set("msg",t),t.render(),t},_createRule:function(t,r){var n=this,i=n.get("target");e.mix(r,{value:i.val(),target:i,field:n});var a=u.create(t,r);return n.add(t,a),a},add:function(t,r){var n=this,i=n._storage;return r instanceof s?i[t]=r:e.isFunction(r)&&(i[t]=new s(t,r)),n.set("rules",i),n},remove:function(e){var t=this._storage;return delete t[e],self.set("rules",t),this},rule:function(e){var t=this,r=t.get("rules");return r[e]},test:function(e){return this.validate(e)},validate:function(t){function r(e){if(m>=i.length)return g;var t=e;g=t.validate(),m++,g.then(function(){r(i[m])})}var n=this,i=[],u=n.get("rules");if(e.isString(t)){var s=t.split(",");e.each(s,function(e){u[e]&&i.push(u[e])})}else e.each(u,function(e){i.push(e)});var o=n.get("exclude");if(""!=o){var c=o.split(",");i=e.filter(i,function(t){return!e.inArray(t.get("name"),c)})}if(!n.get("hiddenTest")){var l=n.get("target");l.attr("disabled")&&(i=[])}var g,h=f._defer;if(!i.length){var v=new a.Defer,d=v.promise;return d.then(function(){h.resolve(i),n.fire("success",{rules:i})}),v.resolve(),d}n.fire("beforeTest",{rules:i});var m=0;return r(i[m]),g.then(function(){h.resolve(i),n.fire("success",{rules:i})}).fail(function(e){h.reject(e),n.fire("error",{rule:e})}),g}},{ATTRS:{target:{value:"",getter:function(e){return h(e)},setter:function(t){var r=h(t),n=this,i=n.get("rules");return e.isEmptyObject(i)||(e.each(i,function(e){e.set&&e.set("target",r)}),r.data(d,n)),r}},name:{value:""},event:{value:"",setter:function(e){var t=this;return t._targetBind(e),e}},host:{value:""},exclude:{value:""},rules:{value:{}},msg:{value:""}}}),f},{requires:["event","base","dom","node","promise","cute/auth/lib/rule/ruleFactory","cute/auth/lib/rule/rule","cute/auth/lib/msg/base","cute/auth/lib/utils"]}),KISSY.add("cute/auth/lib/index",function(e,t,r,n,i,a,u,s){var o=t.all,c="data-field",l=function(t,r){var n=this;return r||(r={}),t&&e.mix(r,{target:t}),n._storages={},n.AuthConfig=r,l.superclass.constructor.call(n,r),n};return e.extend(l,n,{render:function(){var t=this,r=t.get("target");if(!r.length)return t;var n=r.getDOMNode().elements;return n.length?(e.each(n,function(r){var n=o(r),i=n.attr("type"),a=["BUTTON"],u=r.tagName;if(e.inArray(u,a))return!0;if("submit"==i)return!0;"SELECT"==u&&n.attr("data-type","select");var s=["radio","checkbox"];return e.inArray(i,s)&&n.data(c)?!0:void t.add(r)}),r.attr("novalidate","novalidate"),t._submit(),t):t},_submit:function(){var e=this,t=e.get("submitTest");if(!t)return e;var r=e.get("target");return r.on("submit",function(t){t.preventDefault(),e.test()}),e.on("success",function(){r.getDOMNode().submit()}),e},add:function(t,r){var n,i,u=this,c="";if(t instanceof a)n=t.get("target"),i=u.getName(n),c=u._storages[i||s.guid()]=t;else{var l=u.get("autoBind");if(n=o(t),!n.length)return!1;i=u.getName(n);var g={event:l?s.getEvent(n):"",host:u,name:i};e.mix(g,r),c=u._storages[i]=new a(n,g)}return c},remove:function(t){var r=this;return t?r._storages[t]?(delete r._storages[t],e.log("删除"+t+" field"),r):void 0:r},getName:function(e){if(!e||!e.length)return"";var t,r=this,n=s.guid(),i=r.get("useId");return t=i?e.attr("id")||e.attr("name")||n:e.attr("name")||e.attr("id")||n},fieldTarget:function(e){if(!e)return!1;var t=this,r=t.field(e);return r?r.get("target"):!1},field:function(e){return this.getField(e)},getField:function(e){return this._storages[e]},register:function(e,t){return u.register(e,t),this},test:function(e){return this.validate(e)},validate:function(e){function t(r){return c>=e.length?o:(o=r.test(),c++,void o.then(function(){t(e[c])}).fail(function(r){n||t(e[c]),l.push(r.get("field"))}))}var r=this,n=r.get("stopOnError"),a=new i.Defer;if(e=r._filterFields(e),!e.length){var u=new i.Defer,s=u.promise;return s.then(function(){a.resolve(e),r.fire("success",{fields:e})}),u.resolve(),s}var o,c=0,l=[];return r.fire("beforeTest",{fields:e}),t(e[c]),o.then(function(){l.length||(a.resolve(e),r.fire("success",{fields:e}))}).fail(function(){a.reject(l),r.fire("error",{fields:l})}),a.promise},_filterFields:function(t){var r=this,n=r.get("fields");if(t){var i=t.split(",");i.length>0&&(t=e.filter(n,function(t){return e.inArray(t.get("name"),i)}))}else t=n;return e.filter(t,function(t){var r=t.get("rules");return!e.isEmptyObject(r)})}},{ATTRS:{target:{value:"",getter:function(e){return o(e)}},rules:{value:{},getter:function(){return u.rules}},fields:{value:[],getter:function(){var t=this,r=t._storages,n=[];return e.each(r,function(e){n.push(e)}),n}},useId:{value:!1},autoBind:{value:!0},stopOnError:{value:!1},submitTest:{value:!0}}}),e.mix(l,{Field:a}),l},{requires:["node","json","base","promise","cute/auth/lib/field/field","cute/auth/lib/rule/ruleFactory","cute/auth/lib/utils"]}),KISSY.add("cute/auth/index",function(e,t){return t},{requires:["cute/auth/lib/index"]});
