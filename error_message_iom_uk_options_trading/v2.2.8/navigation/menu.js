define(["exports","jquery","../common/util","jquery-growl"],function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.refreshMenu=e.extractChartableMarkets=e.extractFilteredMarkets=void 0;var n,m=(n=t)&&n.__esModule?n:{default:n};var r={trade:".trade a",instruments:".instruments a",assetIndex:".assetIndex",tradingTimes:".tradingTimes"},a=function(){return"Trading options isn’t possible in your country.".i18n()},i=e.extractFilteredMarkets=function(e,r){return e.trading_times.markets.map(function(e){var t={name:e.name,display_name:e.name};return t.submarkets=e.submarkets.map(function(e){var t={name:e.name,display_name:e.name},n=e.symbols;return r&&r.filter&&(n=n.filter(r.filter)),t.instruments=n.map(function(e){return{symbol:e.symbol,display_name:e.name,delay_amount:e.delay_amount||0,events:e.events,times:e.times,settlement:e.settlement,feed_license:e.feed_license||"realtime"}}),t}).filter(function(e){return 0<e.instruments.length}),t})},s=e.extractChartableMarkets=function(e){return i(e,{filter:function(e){return"chartonly"!==e.feed_license}})||[]},l=e.refreshMenu=function(s,e,l){0==e.length?(Object.values(r).map(function(e){return(0,m.default)(e).addClass("disabled")}),m.default.growl.error({message:a()})):Object.values(r).map(function(e){return(0,m.default)(e).removeClass("disabled")});var t="<ul>"+e.map(function(e){return"<li><div>"+e.display_name+"</div><ul>"+e.submarkets.map(function(e){return"<li><div>"+e.display_name+"</div><ul>"+e.instruments.map(function(e){return"<li symbol='"+e.symbol+"' pip='"+e.pip+"'><div>"+e.display_name+"</div></li>"}).join("")+"</ul></li>"}).join("")+"</ul></li>"}).join("")+"</ul>",u=(0,m.default)(t);s.find("> ul").menu("destroy").remove(),s.append(u),u.find("li[symbol]").on("click",function(e,t){var n=(0,m.default)(e.target).text(),r=(0,m.default)(e.target).closest("li"),a=r.attr("symbol"),i=r.attr("pip");u.detach(),s.append(u),l(a,n,i)}),u.menu({position:{collision:"fit"}})};e.default={extractChartableMarkets:s,extractFilteredMarkets:i,refreshMenu:l}});