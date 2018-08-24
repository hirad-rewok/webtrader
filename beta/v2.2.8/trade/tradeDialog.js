define(["exports","babel-runtime/regenerator","lodash","jquery","moment","windows/windows","common/rivetsExtra","websockets/binary_websockets","charts/chartingRequestMap","text!trade/tradeDialog.html","help/help","./lookback","css!trade/tradeDialog.css","timepicker","jquery-ui","common/util"],function(a,b,c,d,e,f,g,h,i,j,k,l){"use strict";function m(a){return a&&a.__esModule?a:{"default":a}}function n(a){return function(){var b=a.apply(this,arguments);return new Promise(function(a,c){function d(e,f){try{var g=b[e](f),h=g.value}catch(i){return void c(i)}return g.done?void a(h):Promise.resolve(h).then(function(a){d("next",a)},function(a){d("throw",a)})}return d("next")})}}function o(a){return v["default"](a).filter({contract_category:"callput",barrier_category:"euro_atm",barriers:0,sentiment:"up"}).each(G("contract_display","rise")),v["default"](a).filter({contract_category:"callput",barrier_category:"euro_atm",barriers:0,sentiment:"down"}).each(G("contract_display","fall")),v["default"](a).filter(["contract_category","endsinout"]).each(G("contract_category_display","In/Out")),v["default"](a).filter(["contract_category","staysinout"]).each(G("contract_category_display","In/Out")),v["default"](a).filter(["contract_category","digits"]).each(G("barriers",0)),v["default"](a).filter({contract_type:"EXPIRYMISS"}).each(G("contract_display","ends outside")),v["default"](a).filter({contract_type:"EXPIRYRANGE"}).each(G("contract_display","ends between")),v["default"](a).filter({contract_type:"RANGE"}).each(G("contract_display","stays between")),v["default"](a).filter({contract_type:"UPORDOWN"}).each(G("contract_display","goes outside")),v["default"](a).filter({contract_type:"ONETOUCH"}).each(G("contract_display","touch")),v["default"](a).filter({contract_type:"NOTOUCH"}).each(G("contract_display","no touch")),a=v["default"].sortBy(a,function(a){var b=v["default"].find({"Up/Down":1,"Touch/No Touch":2,"In/Out":3,Digits:4,Asians:5,Spreads:6},function(b,c){return c.i18n()==a.contract_category_display||c==a.contract_category_display?b:void 0});return 4===b&&(b={odd:4,even:4.5}[a.contract_display]||3.5),b})}function p(a,b){return A["default"].cached.send({trading_times:a}).then(function(a){var c={open:"--",close:"--"};return a.trading_times.markets.forEach(function(a){a.submarkets.forEach(function(a){a.symbols.forEach(function(a){a.symbol===b&&(c={open:a.times.open[0],close:a.times.close[0]})})})}),c})["catch"](function(a){return{open:"--",close:"--"}})}function q(a){return{name:a.template.name,categories_value:a.categories.value,categoriy_displays_selected:a.category_displays.selected,date_start_value:a.date_start.value,digits_value:a.digits.value,duration_value:a.duration.value,duration_count_value:a.duration_count.value,duration_unit_value:a.duration_unit.value,expiry_value_hour:a.date_expiry.value_hour,expiry_value_date:a.date_expiry.value_date,expiry_value:a.date_expiry.value,barriers_barrier_count:a.barriers.barrier_count,barriers_barrier:a.barriers.barrier,barriers_high_barrier:a.barriers.high_barrier,barriers_low_barrier:a.barriers.low_barrier,basis_value:a.basis.value,currency_value:a.currency.value,basis_amount:a.basis.amount,spreads_amount_per_point:a.spreads.amount_per_point,spreads_stop_type:a.spreads.stop_type,spreads_stop_loss:a.spreads.stop_loss,spreads_stop_profit:a.spreads.stop_profit}}function r(a,b){a.template.name=b.name;var c=function(a){w["default"].growl.warning({message:a||"Template applied partially.".i18n()})};return v["default"].find(a.categories.array,b.categories_value)?(a.categories.selected=b.categories_value.contract_category,void v["default"].defer(function(){return v["default"].find(a.category_displays.array,function(a){return a.name===b.categoriy_displays_selected.name&&a.sentiment===b.categoriy_displays_selected.sentiment})?(a.category_displays.selected=b.categoriy_displays_selected,void v["default"].defer(function(){a.date_start.visible&&v["default"].defer(function(){a.date_start.value="now"!==b.date_start_value&&v["default"].some(a.date_start.array,{value:1*b.date_start_value})?1*b.date_start_value:"now"}),a.digits.visible&&(a.digits.value=b.digits_value),"spreads"!==a.categories.value.contract_category&&(a.duration.value=b.duration_value,"Duration"===a.duration.value&&v["default"].defer(function(){a.duration_unit.value=b.duration_unit_value,v["default"].defer(function(){a.duration_count.value=b.duration_count_value})}),"End Time"===a.duration.value&&v["default"].defer(function(){a.date_expiry.value_date=b.expiry_value_date;var c=!x["default"].utc(a.date_expiry.value_date).isAfter(x["default"].utc(),"day");c&&v["default"].defer(function(){a.date_expiry.value_hour=b.expiry_value_hour})})),a.barriers.barrier_count=b.barriers_barrier_count,1===a.barriers.barrier_count&&v["default"].defer(function(){a.barriers.barrier=b.barriers_barrier}),2===a.barriers.barrier_count&&v["default"].defer(function(){a.barriers.high_barrier=b.barriers_high_barrier,a.barriers.low_barrier=b.barriers_low_barrier}),"spreads"!==a.categories.value.contract_category&&v["default"].defer(function(){a.basis.value=b.basis_value,a.currency.value=b.currency_value,a.basis.amount=b.basis_amount}),"spreads"===a.categories.value.contract_category&&(a.currency.value=b.currency_value,a.spreads.amount_per_point=b.spreads_amount_per_point,a.spreads.stop_type=b.spreads_stop_type,a.spreads.stop_loss=b.spreads_stop_loss,a.spreads.stop_profit=b.spreads_stop_profit)})):void c()})):void w["default"].growl.error({message:"Template is not applicable.".i18n()})}function s(a,b,c,d,e){function f(a,b){var c=a.barriers,d=c.barrier,e=c.high_barrier,f=c.low_barrier,g=c.barrier_count;return 2===+g?(b.barrier=e,void(b.barrier2=f)):void(d&&(b.barrier=d))}function g(a){a.barriers.is_offset_barrier=h(a.barriers.barrier),a.barriers.is_offset_low_barrier=h(a.barriers.low_barrier),a.barriers.is_offset_high_barrier=h(a.barriers.high_barrier)}function h(a){return a&&(a.startsWith("+")||a.startsWith("-"))?!0:!1}var i={duration:{array:["Duration","End Time"],value:"Duration"},duration_unit:{array:[""],ranges:[{min:1,max:365}],value:""},duration_count:{value:1,min:1,max:365},date_start:{value:"now",array:[{text:"Now",value:"now"}],visible:!1},date_expiry:{value_date:x["default"].utc().format("YYYY-MM-DD"),value_hour:x["default"].utc().format("HH:mm"),value:0,today_times:{open:"--",close:"--",disabled:!1},onHourShow:function(a){var b=i.date_expiry.today_times;if("--"===b.open)return!0;var c=x["default"].utc(),d=x["default"](b.close,"HH:mm:ss").hour(),e=x["default"](b.open,"HH:mm:ss").hour();return c.hour()>=e&&c.hour()<=d&&(e=c.hour()),a>=e&&d>=a||d>=a&&e>=d||a>=e&&e>=d},onMinuteShow:function(a,b){var c=i.date_expiry.today_times;if("--"===c.open)return!0;var d=x["default"].utc(),e=x["default"](c.close,"HH:mm:ss").hour(),f=x["default"](c.close,"HH:mm:ss").minute(),g=x["default"](c.open,"HH:mm:ss").hour(),h=x["default"](c.open,"HH:mm:ss").minute();return d.hour()>=g&&d.hour()<=e&&(g=d.hour(),h=d.minute()),g===a?b>=h:e===a?f>=b:a>g&&e>a||e>a||a>g}},categories:{array:[],value:"",paddingTop:function(){var a={asian:"26px",callput:"8px",digits:"14px",endsinout:"4px",staysinout:"4px",touchnotouch:"12px",lookback:"26px",callputequal:"8px"};return a[i.categories.value.contract_category]||"3px"}},category_displays:{array:[],selected:""},barriers:{is_offset_barrier:!1,is_offset_low_barrier:!1,is_offset_high_barrier:!1,barrier_count:0,barrier:"",perv_barrier:"",was_perv_barrier_daily:!1,high_barrier:"",perv_high_barrier:"",was_perv_high_barrier_daily:!1,low_barrier:"",perv_low_barrier:"",was_perv_low_barrier_daily:!1,barrier_live:function(){return 1*this.barrier+1*i.tick.quote},high_barrier_live:function(){return 1*this.high_barrier+1*i.tick.quote},low_barrier_live:function(){return 1*this.low_barrier+1*i.tick.quote}},digits:{array:["0","1","2","3","4","5","6","7","8","9"],value:"0",visible:!1,text:"Last Digit Prediction".i18n()},currency:{array:["USD"],value:"USD",decimals:0},basis:{array:["Payout","Stake"],value:"payout",amount:8===currencyFractionalDigits()?.1:10,limit:null},spreads:{amount_per_point:1,stop_type:"point",stop_loss:(v["default"].find(a,"stop_loss")||{stop_loss:10}).stop_loss,stop_profit:(v["default"].find(a,"stop_profit")||{stop_profit:10}).stop_profit,spread:0,spot:"0.0",spot_time:"0",deposit_:function(){return"point"===this.stop_type?this.stop_loss*this.amount_per_point:this.stop_loss}},tick:{epoch:"0",quote:e,perv_quote:"0",down:function(){var a=1*this.quote<1*this.perv_quote;return a}},ticks:{array:[],loading:!0},proposal:{symbol:d.symbol,symbol_name:d.display_name,last_promise:null,id:"",ask_price:"0.0",date_start:0,display_value:"0.0",message:"Loading ...".i18n(),payout:0,spot:"0.0",spot_time:"0",multiplier:"0",error:"",loading:!0,netprofit_:function(){var a=i.category_displays.selected.contract_type;return E["default"].isLookback(a)?!1:formatPrice(this.payout-this.ask_price||0,i.currency.value)},payout_:function(){var a=i.category_displays.selected.contract_type;return E["default"].isLookback(a)?E["default"].formula(a,formatPrice(+i.basis.amount||0,i.currency.value,3)):formatPrice(+this.payout||0,i.currency.value)},return_:function(){var a=i.category_displays.selected.contract_type;return!E["default"].isLookback(a)&&this.payout&&this.ask_price?((this.payout-this.ask_price)/this.ask_price*100).toFixed(1)+"%":!1}},purchase:{loading:!1},tooltips:{barrier:{my:"left-215 top+10",at:"left bottom",collision:"flipfit"},barrier_p:{my:"left-5 top+10",at:"left bottom",collision:"flipfit"}},template:{name:"",visible:!1},openHelp:function(){w["default"].growl.notice({message:"Loading help text for ".i18n()+i.categories.value.contract_category_display}),D["default"].showSpecificContent(i.categories.value.contract_category_display)}},j=function(){A["default"].is_authenticated()&&A["default"].send({payout_currencies:1}).then(function(a){i.currency.value=a.payout_currencies[0],i.currency.array=a.payout_currencies})["catch"](function(a){})};i.template.hide=function(a){0===w["default"](a.target).closest(".trade-template-manager").length&&(i.template.visible=!1)},i.template.toggle=function(){i.template.visible=!i.template.visible},i.barriers.root=i,i.date_expiry.update_times=function(){p(i.date_expiry.value_date,i.proposal.symbol).then(function(a){var b=i.date_expiry;b.today_times.open=a.open,b.today_times.close=a.close;var c=v["default"](i.duration_unit.ranges).filter(["type","minutes"]).head();b.today_times.disabled=!c;var d=c?x["default"].utc().add(c.min+1,"m").format("HH:mm"):"00:00";b.value_hour=d>b.value_hour?d:b.value_hour})},i.categories.update=function(){i.categories.value=v["default"].find(i.categories.array,{contract_category:i.categories.selected});var b=i.categories.value.contract_category,c=function(a){return-1!==["staysinout","endsinout"].indexOf(a)},d=c(b)?function(a){return c(a.contract_category)}:function(a){return a.contract_category==b},e=function(a){return/^lookback$/.test(a.toLowerCase())};i.category_displays.array=[],v["default"](a).filter(d).map("contract_display").uniq().value().forEach(function(b){var c={};c.name=b;var d=v["default"].find(a,{contract_display:b});d&&(c.sentiment=d.sentiment,c.contract_type=d.contract_type),i.category_displays.array.push(c)}),e(b)?(i.basis.array=["Multiplier"],i.basis.value="multiplier",v["default"].defer(function(){i.currency.decimals=3})):(i.basis.array=["Payout","Stake"],i.basis.value="payout",v["default"].defer(function(){i.currency.decimals=currencyFractionalDigits()})),i.category_displays.selected=v["default"].head(i.category_displays.array)},i.category_displays.onclick=function(a){i.category_displays.selected={},i.category_displays.selected.name=w["default"](a.target).attr("data-name"),i.category_displays.selected.sentiment=w["default"](a.target).attr("data-sentiment"),i.category_displays.selected.contract_type=w["default"](a.target).attr("data-contract_type")},i.date_start.update=function(){var b=v["default"](a).filter({contract_category_display:i.categories.value.contract_category_display,contract_display:i.category_displays.selected.name,start_type:"forward"}).head(),c=v["default"](a).filter({contract_category_display:i.categories.value.contract_category_display,contract_display:i.category_displays.selected.name,start_type:"spot"}).head();if(!b)return void v["default"].assign(i.date_start,{visible:!1,array:[],value:"now"});b=b.forward_starting_options;var d=(i.date_start,[]);c&&(d=[{text:"Now",value:"now"}]);for(var e=((new Date).getTime()+3e5)/1e3,f=0;f<b.length;f++)for(var g=b[f],h=300,j=Math.ceil(Math.max(e,g.open)/h)*h,k=j;k<g.close;k+=h){var l=new Date(1e3*k),m=("00"+l.getUTCHours()).slice(-2)+":"+("00"+l.getUTCMinutes()).slice(-2)+" "+["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][l.getUTCDay()];d.push({text:m,value:k})}var n={value:d[0].value,array:d,visible:!0};v["default"].some(d,{value:1*i.date_start.value})&&(n.value=i.date_start.value),v["default"].assign(i.date_start,n)},i.date_expiry.update=function(a){var b=i.date_expiry,c=!x["default"].utc(b.value_date).isAfter(x["default"].utc(),"day");c?(a!==b.value_hour&&b.update_times(),b.value=x["default"].utc(b.value_date+" "+b.value_hour).unix(),i.barriers.update(),H(b.value,i.proposal.onchange)):(b.today_times.disabled=!0,p(b.value_date,i.proposal.symbol).then(function(a){var c="--"!==a.close?a.close:"00:00:00";b.value_hour=x["default"](c,"HH:mm:ss").format("HH:mm"),b.value=x["default"].utc(b.value_date+" "+c).unix(),i.barriers.update(),H(b.value,i.proposal.onchange)}))},i.duration.update=function(){var a=i.categories.value.contract_category;v["default"](["callput","endsinout","staysinout","touchnotouch","lookback"]).includes(a)?2!==i.duration.array.length&&(i.duration.array=["Duration","End Time"]):(i.duration.value="Duration",1!==i.duration.array.length&&(i.duration.array=["Duration"]))},i.duration_unit.update=function(){var b="now"!==i.date_start.value?"forward":"spot",c=v["default"](a).filter({contract_category_display:i.categories.value.contract_category_display,contract_display:i.category_displays.selected.name,start_type:b}).map(function(a){return{min:a.min_contract_duration+"",max:a.max_contract_duration+"",type:a.expiry_type}}).value(),d=[],e=[];v["default"].each(c,function(a){if(v["default"](["tick","daily"]).includes(a.type))return d.push({tick:"ticks",daily:"days"}[a.type]),void e.push({min:0|a.min.replace("d","").replace("t",""),max:0|a.max.replace("d","").replace("t",""),type:{tick:"ticks",daily:"days"}[a.type]});var b=a.min.replace("s","").replace("m","").replace("h",""),c=a.max.replace("s","").replace("m","").replace("h","").replace("d",""),f=v["default"](a.min).last(),g=v["default"](a.max).last();b*={s:1,m:60,h:3600}[f],c*={s:1,m:60,h:3600,d:86400}[g],"s"===f&&(d.push("seconds"),e.push({min:b,max:c,type:"seconds"})),v["default"](["s","m"]).includes(f)&&c>=60&&(d.push("minutes"),e.push({min:Math.max(b/60,1),max:c/60,type:"minutes"})),v["default"](["s","m","h"]).includes(f)&&c>=3600&&(d.push("hours"),e.push({min:Math.max(b/3600,1),max:c/3600,type:"hours"}))});var f={ticks:0,seconds:1,minutes:2,hours:3,days:4};return d.sort(function(a,b){return f[a]-f[b]}),e.sort(function(a,b){return f[a.type]-f[b.type]}),d.length?(i.duration_unit.ranges=e,v["default"].includes(d,i.duration_unit.value)?i.duration_count.update(!0):i.duration_unit.value=v["default"].head(d),"lookback"===i.categories.selected&&(d=d.filter(function(a){return"minutes"===a})),i.duration_unit.array=d,i.barriers.update(),void i.date_expiry.update_times()):void i.barriers.update()},i.duration_count.update=function(a){var b=v["default"](i.duration_unit.ranges).filter({type:i.duration_unit.value}).head();b&&(i.duration_count.min=b.min,i.duration_count.max=b.max,a!==!0?i.duration_count.value=b.min:(i.duration_count.value<b.min||i.duration_count.value>b.max)&&(i.duration_count.value=b.min))},i.digits.update=function(){var a=i.category_displays.selected.sentiment;if("digits"!==i.categories.value.contract_category||"odd"===a||"even"===a)return void(i.digits.visible=!1);var b={match:["0","1","2","3","4","5","6","7","8","9"],differ:["0","1","2","3","4","5","6","7","8","9"],under:["1","2","3","4","5","6","7","8","9"],over:["0","1","2","3","4","5","6","7","8"]}[a],c={match:"Last Digit Prediction".i18n(),differ:"Last Digit Prediction".i18n(),under:"Last Digit is Under".i18n(),over:"Last Digit is Over".i18n()}[a];v["default"].includes(b,i.digits.value)||(i.digits.value=b[0]),i.digits.array=b,i.digits.text=c,i.digits.visible=!0},i.barriers.update=function(){var b=i.duration_unit.value,c=v["default"](["seconds","minutes","hours"]).includes(b)?"intraday":"days"===b?"daily":"tick",d=v["default"](a).filter({contract_category_display:i.categories.value.contract_category_display,contract_display:i.category_displays.selected.name,expiry_type:c}).filter(function(a){return a.barriers>=1}).head();if(i.barriers.barrier_count=d?d.barriers:0,d){var e=function(a,b,d,e,f){var g="daily"===c&&"End Time"!==i.duration.value||"End Time"===i.duration.value&&x["default"].utc(i.date_expiry.value_date).isAfter(x["default"].utc(),"day");if(g)e&&(b=a),a=(e?a:0)||d,e=!0;else{var h=(1*d>=0?f:"")+1*d;e&&/^[+-]/.test(b)?a=b:/^[+-]/.test(a)||(a=h),b=a,e=!1}return{barrier:a,perv_barrier:b,was_perv_barrier_daily:e}};if(d.barrier){var f=e(i.barriers.barrier,i.barriers.perv_barrier,d.barrier,i.barriers.was_perv_barrier_daily,"+");i.barriers.barrier=f.barrier,i.barriers.perv_barrier=f.perv_barrier,i.barriers.was_perv_barrier_daily=f.was_perv_barrier_daily}if(d.high_barrier){var f=e(i.barriers.high_barrier,i.barriers.perv_high_barrier,d.high_barrier,i.barriers.was_perv_high_barrier_daily,"+");i.barriers.high_barrier=f.barrier,i.barriers.perv_high_barrier=f.perv_barrier,i.barriers.was_perv_high_barrier_daily=f.was_perv_barrier_daily}if(d.low_barrier){var f=e(i.barriers.low_barrier,i.barriers.perv_low_barrier,d.low_barrier,i.barriers.was_perv_low_barrier_daily,"-");i.barriers.low_barrier=f.barrier,i.barriers.perv_low_barrier=f.perv_barrier,i.barriers.was_perv_low_barrier_daily=f.was_perv_barrier_daily}}},i.basis.update_limit=function(){var b=i.basis,c=v["default"](a).filter({contract_category_display:i.categories.value.contract_category_display,contract_display:i.category_displays.selected.name}).head();c=c&&c.payout_limit||null,b.limit=c?1*c:null,b.limit&&(b.amount=Math.min(b.amount,b.limit))},i.proposal.onchange=function(){var b=function(){var a=n(u["default"].mark(function b(a,c,d){var e,f;return u["default"].wrap(function(b){for(;;)switch(b.prev=b.next){case 0:e=void 0,f=0;case 2:if(!(c>f)){b.next=22;break}return b.prev=3,b.next=6,A["default"].send(a);case 6:return e=b.sent,i.proposal.error="",i.proposal.id=e.proposal&&e.proposal.id,b.abrupt("break",22);case 12:if(b.prev=12,b.t0=b["catch"](3),i.proposal.error=b.t0.message,i.proposal.message="",i.proposal.loading=!1,!d||d===b.t0.code){b.next=19;break}return b.abrupt("break",22);case 19:f++,b.next=2;break;case 22:return b.abrupt("return",e);case 23:case"end":return b.stop()}},b,this,[[3,12]])}));return function(){return a.apply(this,arguments)}}(),d=i.duration_unit.value,e=v["default"](["seconds","minutes","hours"]).includes(d)?"intraday":"days"===d?"daily":"tick";"spreads"===i.categories.value.contract_category&&(e="intraday");var h=v["default"](a).filter({contract_category_display:i.categories.value.contract_category_display,contract_display:i.category_displays.selected.name,expiry_type:e}).head(),j={proposal:1,subscribe:1,contract_type:h.contract_type,currency:i.currency.value,symbol:i.proposal.symbol};if("spreads"!==i.categories.value.contract_category){var k=v["default"].isNil(i.basis.amount)?!1:i.basis.amount.toString().match(/0*(\d+\.?\d*)/);k&&k.input!==k[1]&&(i.basis.amount=k[1]),j.amount=i.basis.amount,j.basis=i.basis.value}else j.amount_per_point=i.spreads.amount_per_point,j.stop_type=i.spreads.stop_type,j.stop_loss=i.spreads.stop_loss,j.stop_profit=i.spreads.stop_profit;f(i,j),g(i),"digits"===i.categories.value.contract_category&&(j.barrier=i.digits.value+""),"now"!==i.date_start.value&&(j.date_start=1*i.date_start.value),"Duration"===i.duration.value?(j.duration_unit=v["default"](i.duration_unit.value).head(),j.duration=1*i.duration_count.value):j.date_expiry=i.date_expiry.value,i.proposal.loading=!0,i.proposal.last_promise&&i.proposal.last_promise.then(function(a){var b=a&&a.proposal&&a.proposal.id;b&&A["default"].send({forget:b})});var l=b(j,2,"AlreadySubscribed");i.proposal.last_promise=l,i.proposal.id="",c.update_track(c.get_template())},i.purchase.onclick=n(u["default"].mark(function l(){var a,c,e,f,g,h,j,k;return u["default"].wrap(function(l){for(;;)switch(l.prev=l.next){case 0:if(a=["digits","callput","callputequal","asian","touchnotouch"],i.purchase.loading=!0,c=function(a){a.appendTo(b),b.find(".trade-fields").css({left:"400px"}),b.find(".trade-conf").css({left:"0"})},e=function(a){b.find(".trade-fields").css({left:"0"}),b.find(".trade-conf").css({left:"-400px"}),i.purchase.loading=!1,a.remove(),i.proposal.onchange()},f={amount:i.basis.amount,currency:i.currency.value,symbol:i.proposal.symbol,symbol_name:i.proposal.symbol_name,category:i.categories.value,category_display:i.category_displays.selected,duration_unit:i.duration_unit.value,pip:d.pip},f.show_tick_chart=!1,v["default"](a).includes(f.category.contract_category)&&"Duration"===i.duration.value&&"ticks"===f.duration_unit&&(f.digits_value=i.digits.value,f.tick_count=1*i.duration_count.value,"digits"!==f.category.contract_category&&("asian"!==f.category.contract_category&&(f.tick_count+=1),"callput"!==f.category.contract_category||v["default"](["rise","fall"]).includes(f.category_display.name)||(f.barrier=i.barriers.barrier),f.show_tick_chart=!0)),A["default"].is_authenticated()){l.next=11;break}return w["default"].growl.warning({message:"Please log in".i18n()}),i.purchase.loading=!1,l.abrupt("return");case 11:return l.prev=11,l.next=14,require(["trade/tradeConf"]);case 14:return g=l.sent,h=F(g,1),j=h[0],l.next=19,A["default"].send({buy:i.proposal.id,price:1*i.proposal.ask_price});case 19:k=l.sent,f.contract_id=k.buy.contract_id,f.transaction_id=k.buy.transaction_id,(f.show_tick_chart||"digits"===f.category.contract_category)&&A["default"].proposal_open_contract.subscribe(f.contract_id),j.init(k,f,c,e,d),l.next=32;break;case 26:l.prev=26,l.t0=l["catch"](11),i.purchase.loading=!1,w["default"].growl.error({message:l.t0.message}),"InvalidToken"===l.t0.code?A["default"].invalidate():i.proposal.onchange();case 32:case"end":return l.stop()}},l,this,[[11,26]])})),v["default"](a).map("contract_category_display").uniq().value().filter(function(a){return!/reset|high\/low|spread/.test(a.toLowerCase())}).forEach(function(b){var c={};c.contract_category_display=b;var d=v["default"].find(a,{contract_category_display:b});d&&(c.contract_category=d.contract_category,i.categories.array.push(c))}),i.categories.value=v["default"](i.categories.array).head(),i.categories.selected=i.categories.value.contract_category;var k=!1;return A["default"].events.on("tick",function(a){a.tick&&a.tick.symbol==i.proposal.symbol&&(k=!0,i.tick.perv_quote=i.tick.quote,i.tick.epoch=a.tick.epoch,i.tick.quote=a.tick.quote,i.ticks.loading=!1,i.ticks.array.length>25&&i.ticks.array.shift(),i.ticks.array.push(a.tick))}),A["default"].events.on("proposal",function(a){v["default"].defer(function(){if(a.proposal&&a.proposal.id===i.proposal.id){if(a.error)return i.proposal.error=a.error.message,void(i.proposal.message="");if(!i.purchase.loading){var b=a.proposal;i.proposal.ask_price=b.ask_price,i.proposal.date_start=b.date_start,i.proposal.multiplier=b.multiplier||"0",i.proposal.display_value=b.display_value,i.proposal.message=b.longcode,i.proposal.payout=b.payout,i.proposal.spot=b.spot,i.proposal.spot_time=b.spot_time,i.spreads.spread=b.spread||0,i.spreads.spot=b.spot||"0.0",i.spreads.spot_time=b.spot_time||"0",i.proposal.loading=!1,!k&&b.spot&&(i.tick.epoch=b.spot_time,i.tick.quote=b.spot)}}})}),A["default"].events.on("set_account_currency",j),j(),i}function t(a,b,c,d){var e=w["default"](C["default"]).i18n(),f=o(b.available),g=y["default"].createBlankWindow(e,{title:a.display_name,resizable:!1,collapsable:!1,minimizable:!0,maximizable:!1,width:400,"data-authorized":"false",isTrackerInitiated:d,relativePosition:!0,close:function(){k.proposal.last_promise&&k.proposal.last_promise.then(function(a){var b=a&&a.proposal&&a.proposal.id;b&&A["default"].send({forget:b})}),B["default"].unregister(i),l.unbind(),g.destroy()}}),h=g.track({module_id:"tradeDialog",is_unique:!1,data:{symbol:a,template:c||{}}}),i=B["default"].keyFor(a.symbol,0),j=v["default"](f).map("min_contract_duration").some(function(a){return/^\d+$/.test(a)||"t"===v["default"].last(a)});B["default"][i]?B["default"].subscribe(i):B["default"].register({symbol:a.symbol,subscribe:1,granularity:0,style:"ticks"})["catch"](function(a){j&&(w["default"].growl.error({message:a.message}),v["default"].delay(function(){g.dialog("close")},2e3))});var k=s(f,e,g,a,b.spot);j||(k.ticks.loading=!1);var l=z["default"].bind(e[0],k);return k.categories.update(),g.dialog("open"),g.update_track=function(b){h({symbol:a,template:b})},g.get_template=q.bind(void 0,k),g.set_template=r.bind(void 0,k),c&&void 0!==c.name&&g.set_template(c),g.hide_template_menu=function(){k.template.visible=!1},require(["trade/tradeTemplateManager"],function(a){a.init(e.find(".trade-template-manager-root"),g)}),w["default"]("#duration-input").keypress(function(a){(a.which<48||a.which>57)&&8!==a.which&&a.preventDefault()}),g}Object.defineProperty(a,"__esModule",{value:!0}),a.init=t;var u=m(b),v=m(c),w=m(d),x=m(e),y=m(f),z=m(g),A=m(h),B=m(i),C=m(j),D=m(k),E=m(l),F=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();require(["trade/tradeConf"]);var G=function(a,b){return function(c){return c[a]=b,c}},H=z["default"].formatters.debounce;a["default"]={init:t}});