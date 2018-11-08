define(["exports","babel-runtime/regenerator","jquery","../windows/windows","../common/rivetsExtra","lodash","text!./copytrade.html","../common/common","websockets/binary_websockets","websockets/validateToken","../instruments/instruments","css!./copytrade.css","../common/util"],function(a,b,c,d,e,f,g,h,i,j,k){"use strict";function l(a){return a&&a.__esModule?a:{"default":a}}function m(a){return function(){var b=a.apply(this,arguments);return new Promise(function(a,c){function d(e,f){try{var g=b[e](f),h=g.value}catch(i){return void c(i)}return g.done?void a(h):Promise.resolve(h).then(function(a){d("next",a)},function(a){d("throw",a)})}return d("next")})}}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var n=l(b),o=l(c),p=l(d),q=l(e),r=l(f),s=l(g),t=l(i),u=l(j),v=function(){return local_storage.get("oauth")[0].id},w=h.trade_types,x={INVALID_STAKE_LIMIT:"Min trade stake should be lower than max trade stake.".i18n(),TOKEN_ALREADY_ADDED:"Token already added".i18n(),ENTER_VALID_TOKEN:"Enter a valid trader token".i18n(),REFRESH_FAILED:"Refresh failed".i18n()},y=function(){return"copyTrade_"+v()},z=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],b=arguments[1];return b.filter(function(b){return a.includes(b.code)}).map(function(a){return a.api_code})},A=w.slice(0,2).map(function(a){return a.code}),B=function(a){return{copy_start:a,min_trade_stake:10,max_trade_stake:100,assets:r["default"].cloneDeep(G),trade_types:r["default"].cloneDeep(A)}},C=function(a,b){return{open:!1,started:!1,disableStart:!1,loginid:b,yourCopySettings:B(a)}},D=function(a){var b=a.min_trade_stake,c=a.max_trade_stake;return b>c?!1:!0},E=r["default"].debounce(function(a){var b=r["default"].cloneDeep(a);delete b.searchToken.disable,local_storage.set(y(),b)},50),F=null,G=null;k.init().then(function(a){F=r["default"].flatten(a.map(function(a){var b=a.display_name;return a.submarkets.map(function(a){return{displayName:b+" - "+a.display_name,instruments:a.instruments}})}));var b=[];a.forEach(function(a){a.submarkets.forEach(function(a){a.instruments.forEach(function(a){var c=a.symbol,d=a.display_name;b.push({code:c,name:d})})})}),K.masterAssetList=b,K.groupedAssets=F,G=b.filter(function(a){return"R_10"===a.code}).map(function(a){return a.code})});var H=function(a,b,c){t["default"].send({copytrading_statistics:1,trader_id:a}).then(function(d){if(d.copytrading_statistics){var e=r["default"].find(c.traderTokens,function(a){return a.yourCopySettings&&a.yourCopySettings.copy_start===b});e?r["default"].merge(e.traderStatistics,d.copytrading_statistics):c.traderTokens.push(r["default"].merge({traderStatistics:d.copytrading_statistics},C(b,a)))}E(c)})["catch"](function(a){o["default"].growl.error({message:a.message})})},I=null,J=null,K={masterAssetList:[],masterTradeTypeList:r["default"].cloneDeep(w),groupedAssets:[],is_loading:!0,is_virtual:!0,allowCopy:{allow_copiers:0,onAllowCopyChangeCopierCellClick:function(){return K.onChangeCopytradeSettings(0)},onAllowCopyChangeTraderCellClick:function(){return K.onChangeCopytradeSettings(1)}},onChangeCopytradeSettings:r["default"].debounce(function(a){K.is_virtual||K.allowCopy.allow_copiers!==a&&(K.is_loading=!0,t["default"].send({set_settings:1,allow_copiers:a}).then(function(){K.is_loading=!1,K.allowCopy.allow_copiers=a})["catch"](function(a){K.is_loading=!1,o["default"].growl.error({message:a.message})}))},250),onOpenChange:function(a){K.traderTokens[a].open=!K.traderTokens[a].open},onStartedChange:function(a){K.traderTokens[a].disableStart=!0;var b=!K.traderTokens[a].started;if(b){var c=local_storage.get(y());if(c){var d=c.traderTokens[a];if(d){var e={};r["default"].merge(e,K.traderTokens[a],d),K.traderTokens.splice(a,1),r["default"].defer(function(){K.traderTokens.splice(a,0,e);var b=r["default"].cloneDeep(e.yourCopySettings);b.min_trade_stake||delete b.min_trade_stake,b.max_trade_stake||delete b.max_trade_stake,(!b.assets||b.assets.length<=0)&&delete b.assets,b.trade_types=z(b.trade_types,w),t["default"].send(b).then(function(){e.disableStart=!1,e.started=!0,M("#max_trade_stake","#min_trade_stake"),E(K)})["catch"](function(a){o["default"].growl.error({message:a.message}),e.disableStart=!1,M("#max_trade_stake","#min_trade_stake"),E(K)})})}}}else t["default"].send({copy_stop:K.traderTokens[a].yourCopySettings.copy_start}).then(function(){K.traderTokens[a].disableStart=!1,K.traderTokens[a].started=!1,E(K)})["catch"](function(b){o["default"].growl.error({message:b.message}),K.traderTokens[a].disableStart=!1,E(K)})},onRemove:function(a){var b=K.traderTokens[a];K.traderTokens.splice(a,1),E(K),t["default"].send({copy_stop:b.yourCopySettings.copy_start})["catch"](function(){})},onRefresh:function(a){var b=K.traderTokens[a],c=b.loginid,d=b.yourCopySettings.copy_start;c&&d&&(b.disableRefresh=!0,H(c,d,K).then(function(){b.disableRefresh=!1,E(K)})["catch"](function(){o["default"].growl.error({message:x.REFRESH_FAILED}),b.disableRefresh=!1,E(scope)}))},onMinTradeChange:function(a,b){K.formatAndSetTradeStake(a,b,"min_trade_stake")},onMaxTradeChange:function(a,b){K.formatAndSetTradeStake(a,b,"max_trade_stake")},formatAndSetTradeStake:function(a,b,c){var d=o["default"](a.target).data("index"),e=a.target.value,f=r["default"].isNil(e)?!1:e.match(/0*(\d+\.?\d{0,2})/);b.traderTokens[d].yourCopySettings[c]=f?f[1]:""},onUpdateYourSettings:function(a){D(K.traderTokens[a].yourCopySettings)?(E(K),o["default"].growl.notice({message:"Updated successfully"})):o["default"].growl.error({message:x.INVALID_STAKE_LIMIT})},searchToken:{token:"",onTokenChange:function(a,b){return b.searchToken.token=a.target.value},disable:!1,onKeyDown:function(a,b){13===a.keyCode&&b.searchToken.addToken(a,b)},addToken:function(a,b){return b.searchToken.token?r["default"].some(K.traderTokens,function(a){return a.yourCopySettings.copy_start===b.searchToken.token})?void o["default"].growl.error({message:x.TOKEN_ALREADY_ADDED}):(b.searchToken.disable=!0,void u["default"](b.searchToken.token).then(function(a){if(!a)throw new Error("Invalid token");H(a.loginid,b.searchToken.token,b),b.searchToken.token="",b.searchToken.disable=!1,E(b)})["catch"](function(a){o["default"].growl.error({message:a.message}),b.searchToken.disable=!1,E(b)})):void o["default"].growl.error({message:x.ENTER_VALID_TOKEN})}},traderTokens:[],openTokenMgmt:function(){return o["default"]("li.account ul a.token-management").click()}},L=function(){var a=o["default"](s["default"]).i18n();J=q["default"].bind(a[0],K),I=p["default"].createBlankWindow(a,{title:"Copy Trading".i18n(),resizable:!1,collapsable:!0,minimizable:!0,maximizable:!1,modal:!1,width:600,open:function(){var a=local_storage.get(y());a&&(r["default"].merge(K,a),K.traderTokens=r["default"].cloneDeep(K.traderTokens)),K.is_loading=!0,K.is_virtual=isVirtual(),K.is_virtual?(K.is_loading=!1,K.allowCopy.allow_copiers=0):t["default"].send({get_settings:1}).then(function(a){K.is_loading=!1,K.allowCopy.allow_copiers=a.get_settings.allow_copiers})["catch"](function(a){K.is_loading=!1,o["default"].growl.error({message:a.message})}),a&&m(n["default"].mark(function b(){var c,d,e,f,g,h,i,j;return n["default"].wrap(function(b){for(;;)switch(b.prev=b.next){case 0:c=!0,d=!1,e=void 0,b.prev=3,f=a.traderTokens[Symbol.iterator]();case 5:if(c=(g=f.next()).done){b.next=20;break}return h=g.value,b.prev=7,i=h.loginid,j=h.yourCopySettings.copy_start,b.next=12,H(i,j,K);case 12:b.next=17;break;case 14:b.prev=14,b.t0=b["catch"](7);case 17:c=!0,b.next=5;break;case 20:b.next=26;break;case 22:b.prev=22,b.t1=b["catch"](3),d=!0,e=b.t1;case 26:b.prev=26,b.prev=27,!c&&f["return"]&&f["return"]();case 29:if(b.prev=29,!d){b.next=32;break}throw e;case 32:return b.finish(29);case 33:return b.finish(26);case 34:case"end":return b.stop()}},b,this,[[3,22,26,34],[7,14],[27,,29,33]])}))()},close:function(){J&&J.unbind(),I&&I.dialog("destroy").remove(),J=I=null,K.traderTokens=[]},"data-authorized":"true"}),I.track({module_id:"copyTrade",is_unique:!0,data:null}),I.dialog("open")},M=function(){for(var a=arguments.length,b=Array(a),c=0;a>c;c++)b[c]=arguments[c];if(b.length>0){var d=b.join(", ");o["default"](d).keypress(function(a){(a.which<48||a.which>57)&&8!==a.which&&46!==a.which&&a.preventDefault()})}},N=a.init=function(a){a.click(function(){I?I.moveToTop():(L(),M("#max_trade_stake","#min_trade_stake"))})};a["default"]={init:N}});