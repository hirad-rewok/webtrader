define(["exports","text!./workspace-menu.html","text!./workspace.html","../common/rivetsExtra","jquery","../websockets/binary_websockets","../windows/windows","../windows/tracker","jquery-growl","css!./workspace-menu.css","css!./workspace.css"],function(e,a,t,r,o,n,s,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.tileDialogs=e.events=e.addDialog=e.init=void 0;var l=w(a),c=w(t),u=w(r),v=w(o),d=w(n),p=w(s),f=w(i);function w(e){return e&&e.__esModule?e:{default:e}}var g;(g=local_storage.get("states"))&&!g.name&&(g.name="my-workspace-1",local_storage.set("states",g));var m=function(e){return JSON.parse(JSON.stringify(e))},k=function(e){return e.replace(/("|'|\&|\(|\)|\<|\>)/g,"")},h={route:"active",closeAll:function(){return(0,v.default)(".webtrader-dialog").dialog("close")},workspaces:local_storage.get("workspaces")||[],dialogs:[],update_route:function(e){return h.route=e},tileDialogs:function(){return I()},workspace:{remove:function(e){var a=h.workspaces.indexOf(e);-1!==a&&h.workspaces.splice(a,1),local_storage.set("workspaces",h.workspaces)},show:function(e){var a=e.tradeDialog&&e.tradeDialog.length;!(a=a||e.portfolio||e.statement||e.profitTable||e.deposit||e.withdraw)||d.default.is_authenticated()?(h.closeAll(),b.dialog("close"),_.delay(function(){h.current_workspace.name=e.name,local_storage.set("states",e),f.default.reopen(m(e))},500)):v.default.growl.notice({message:"Please log in to see your saved workspace.".i18n()})},perv_name:"",save_name:function(e){return h.workspace.perv_name=k(e.name)},blur:function(e){return e.blur()},rename:function(a){var e=h.workspace.perv_name,t=h.current_workspace;if((!a.name||2<=h.workspaces.filter(function(e){return e.name===a.name}).length)&&(a.name=h.workspace.perv_name),local_storage.set("workspaces",h.workspaces),t.name===e){t.name=a.name;var r=local_storage.get("states");r.name=k(a.name),local_storage.set("states",r)}}},current_workspace:{name:(local_storage.get("states")||{}).name||"workspace-1",name_perv_value:"",is_saved:function(){return-1!==_.findIndex(h.workspaces,{name:h.current_workspace.name})},save:function(){var e=h.current_workspace,a=e.name;if(!(0,e.is_saved)())return h.saveas.show();var t=local_storage.get("states");t.name=k(a);var r=_.findIndex(h.workspaces,{name:t.name});h.workspaces[r]=t,h.workspaces=m(h.workspaces),local_storage.set("workspaces",h.workspaces),v.default.growl.notice({message:"Workspace changes saved".i18n()})}},rename:{show:function(){h.current_workspace.name_perv_value=h.current_workspace.name,h.route="rename"},apply:function(){var e=h.current_workspace,a=e.name,t=e.name_perv_value;if(!a||a===t)return h.rename.cancel();if(_.find(h.workspaces,{name:a})){var r=a.match(/\d+$/),o=r?parseInt(r[0]):0;for(a=a.replace(/\d+$/,"");_.find(h.workspaces,{name:a+o});)o+=1;a+=o}var n=_.find(h.workspaces,{name:t});n&&(n.name=a,h.workspaces=h.workspaces,local_storage.set("workspaces",h.workspaces));var s=local_storage.get("states");s.name=a,local_storage.set("states",s),h.current_workspace.name=a,h.route="active"},cancel:function(){h.current_workspace.name=h.current_workspace.name_perv_value,h.route="active"}},saveas:{show:function(){"saveas"!==h.route?(h.current_workspace.name_perv_value=h.current_workspace.name,h.route="saveas"):h.route="active"},apply:function(){var e=h.current_workspace,a=e.name;e.name_perv_value;if(!a)return h.saveas.cancel();if(_.find(h.workspaces,{name:a})){var t=a.match(/\d+$/),r=t?parseInt(t[0]):0;for(a=a.replace(/\d+$/,"");_.find(h.workspaces,{name:a+r});)r+=1;a+=r}var o=local_storage.get("states");o.name=a,h.workspaces.push(o),local_storage.set("workspaces",h.workspaces),h.current_workspace.name=a,h.route="active",v.default.growl.notice({message:"Added new workspace %".i18n().replace("%","<b>"+a+"</b>")})},cancel:function(){return h.rename.cancel()}},file:{hash_code:function(e){return JSON.stringify(e).split("").reduce(function(e,a){return(e=(e<<5)-e+a.charCodeAt(0))&e},0)},open_selector:function(e){(0,v.default)(e.target).closest(".workspace-manager-dialog").find("input[type=file]").click()},upload:function(e){var a=e.target.files[0];if(e.target.value=null,a){var t=new FileReader;t.onload=function(e){var a=e.target.result,t=null;try{var r=(t=JSON.parse(a)).random;if(delete t.random,r!==h.file.hash_code(t))throw"Invalid JSON file".i18n();if("workspace-template"!==t.template_type)throw"Invalid template type.".i18n()}catch(e){return void v.default.growl.error({message:e})}if(_.find(h.workspaces,{name:t.name})){name.match(/\d+$/);v.default.growl.error({message:"Template name already exists".i18n()})}else delete t.template_type,delete t.random,h.workspaces.push(t),local_storage.set("workspaces",h.workspaces),h.workspace.show(t),v.default.growl.notice({message:"Successfully added workspace as ".i18n()+"<b>"+t.name+"</b>"})},t.readAsText(a)}},download:function(e){var a=e.name,t=_.findIndex(h.workspaces,{name:a}),r=-1!==t?h.workspaces[t]:local_storage.get("states");r.name=a,r.template_type="workspace-template",r.random=h.file.hash_code(r);var o=JSON.stringify(r);downloadFileInBrowser(r.name+".json","text/json;charset=utf-8;",o),v.default.growl.notice({message:"Downloading workspace as %1".i18n().replace("%1","<b>"+r.name+".json</b>")})}}};h.current_workspace.root=h;var b=null,y=null,x=e.init=function(e){var a={closeAll:function(){return(0,v.default)(".webtrader-dialog").dialog("close")},tileDialogs:function(){return I()},showWorkspaceManager:function(){var e;e=(0,v.default)(c.default).i18n(),b=p.default.createBlankWindow(e,{title:"Manage".i18n(),width:400,height:250,resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,draggable:!1,modal:!0,close:function(){y&&y.unbind(),y=null,b&&b.destroy(),b=null},ignoreTileAction:!0,"data-authorized":!0,create:function(){return(0,v.default)("body").css({overflow:"hidden"})},beforeClose:function(){return(0,v.default)("body").css({overflow:"inherit"})}}),y=u.default.bind(e[0],h),b.dialog("open")}},t=(0,v.default)(l.default);e.append(t),u.default.bind(t[0],a)},D=e.addDialog=function(e,a,t){var r={name:e,click:function(){b&&b.dialog("close"),a()},remove:function(){o(),t()}},o=function(){var e=h.dialogs.indexOf(r);-1!==e&&h.dialogs.splice(e,1)};return h.dialogs.push(r),o},O=e.events=(0,v.default)("<div/>"),I=function(){for(var e=(0,v.default)(".webtrader-dialog").filter(function(e,a){var t=(0,v.default)(a);return t.hasClass("ui-dialog-content")&&t.dialog("isOpen")&&!t.hasClass("ui-dialog-minimized")&&(0,v.default)(window).width()>=t.dialog("option","width")}),a=function(e,a){var t=0,r=(0,v.default)(window).width(),o=115;(0,v.default)("#msg-notification").is(":visible")&&(o=150);for(var n=0;n<e.length;){for(var s=n,i=0,l=0;n!=e.length;){var c=(0,v.default)(e[n]),u=c.dialog("option","width"),d=c.dialog("option","height");if(i=Math.max(i,d),!(l+u<=r))break;l+=u,++n}var p=l<r?r-l:0,f=l<r?(r-l)/(n-s+1):0;n!=e.length&&(t+=p),0===l&&(0,v.default)(e[n]).dialog("option","width")>r&&(++n,f=0),l=0;for(var w=s;w<n;++w){l+=f;var g=(0,v.default)(e[w]),m=g.dialog("option","width");g.dialog("option","height");a&&g.dialog("widget").animate({left:l+"px",top:o+"px"},1500,g.trigger.bind(g,"animated")),g.dialog("option","position",{my:l,at:o}),l+=m}o+=i+20}return t},t=null,r=1e6,o=0;o<100;++o){var n=a(e,!1);n<r&&(t=e.slice(),r=n)}var s=(0,v.default)(".webtrader-dialog").filter(function(e,a){var t=(0,v.default)(a);return t.hasClass("ui-dialog-content")&&t.dialog("isOpen")&&!t.hasClass("ui-dialog-minimized")&&(0,v.default)(window).width()<t.dialog("option","width")});_(s).forEach(function(e){t.push(e)}),a(t,!0),setTimeout(function(){return O.trigger("tile")},1600)};e.tileDialogs=I,e.default={init:x,addDialog:D,events:O,tileDialogs:I}});