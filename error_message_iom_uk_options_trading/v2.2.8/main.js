function load_ondemand(e,i,n,r,t){var a=null;e.one(i,a=function(){e.hasClass("disabled")?e.one(i,a):require([r],function(e){n&&require(["jquery","jquery-growl"],function(e){e.growl.notice({message:n})}),t&&t(e)})})}window.requirejs.config({baseUrl:"./",paths:{jquery:"lib/jquery/dist/jquery.min","jquery-ui":"lib/jquery-ui-dist/jquery-ui.min","jquery.dialogextend":"lib/binary-com-jquery-dialogextended/jquery.dialogextend.min","jquery-growl":"lib/jquery.growl/javascripts/jquery.growl",modernizr:"lib/npm-modernizr/modernizr","color-picker":"lib/vanderlee-colorpicker/jquery.colorpicker",datatables:"lib/datatables.net/js/jquery.dataTables","datatables-jquery-ui":"lib/datatables.net-jqui/js/dataTables.jqueryui",currentPriceIndicator:"charts/indicators/highcharts_custom/currentprice","es6-promise":"lib/es6-promise/promise.min",rivets:"lib/rivets/dist/rivets.min",sightglass:"lib/sightglass/index",timepicker:"lib/binary-com-jquery-ui-timepicker/jquery.ui.timepicker",lodash:"lib/lodash/lodash.min","jquery-sparkline":"lib/jquery-sparkline/jquery.sparkline.min",moment:"lib/moment/min/moment.min","moment-locale":"lib/moment/locale",clipboard:"lib/clipboard/dist/clipboard.min",indicator_levels:"charts/indicators/level","binary-style":"lib/@binary-com/binary-style/binary","babel-runtime/regenerator":"lib/regenerator-runtime/runtime","webtrader-charts":"lib/@binary-com/webtrader-charts/dist/webtrader-charts.iife",chosen:"lib/chosen-js/chosen.jquery","highstock-release":"lib/highstock-release","jquery-ui-touch-punch":"lib/jquery-ui-touch-punch/jquery.ui.touch-punch.min"},map:{"*":{css:"lib/require-css/css.min",text:"lib/text/text.js"}},waitSeconds:0,shim:{"webtrader-charts":{exports:"WebtraderCharts",deps:["moment","jquery","highstock-release/highstock"]},"babel-runtime/regenerator":{exports:"regeneratorRuntime"},timepicker:{deps:["jquery-ui","jquery"]},"jquery.dialogextend":{deps:["jquery-ui"]},"jquery-ui":{deps:["jquery"]},"highstock-release/highstock":{deps:["jquery"],exports:"Highcharts"},"highstock-release/modules/exporting":{deps:["highstock-release/highstock"]},"highstock-release/modules/offline-exporting":{deps:["highstock-release/modules/exporting"]},"jquery-growl":{deps:["jquery"]},datatables:{deps:["jquery-ui"]},"datatables-jquery-ui":{deps:["datatables"]},currentPriceIndicator:{deps:["highstock-release/highstock"]},sightglass:{exports:"sightglass"},rivets:{deps:["sightglass"],exports:"rivets"},"highstock-release/highcharts-more":{deps:["highstock-release/highstock"]},"color-picker":{deps:["jquery","jquery-ui"]},"jquery-ui-touch-punch":{deps:["jquery","jquery-ui"]}}}),window.requirejs.onError=function(e){if("scripterror"===e.requireType)throw e;throw e},require(["modernizr"],function(){var e=window.Modernizr;e.svg&&e.websockets&&(!e.touch||!window.isSmallView())&&e.localstorage&&e.webworkers&&Object.defineProperty||window.location.assign("unsupported_browsers/unsupported_browsers.html")}),require(["websockets/binary_websockets","text!./oauth/app_id.json"]);var i18n_name=(window.local_storage.get("i18n")||{value:"en"}).value;require(["jquery","text!i18n/"+i18n_name+".json"],function(n,e){"use strict";window.setupi18nTranslation(JSON.parse(e)),require(["jquery-ui","highstock-release/highstock"]),require(["css!lib/jquery-ui-dist/jquery-ui.min.css","css!lib/jquery-ui-iconfont/jquery-ui.icon-font.css","css!lib/chosen-js/chosen.css","css!lib/jquery.growl/stylesheets/jquery.growl.css","css!lib/datatables.net-dt/css/jquery.dataTables.css","css!lib/datatables.net-jqui/css/dataTables.jqueryui.css","css!lib/vanderlee-colorpicker/jquery.colorpicker.css"]),function(){if(self===top){var i=function(n){load_ondemand(n.find("a.tradingTimes"),"click","Loading Trading Times ...".i18n(),"tradingtimes/tradingTimes",function(e){var i=n.find("a.tradingTimes");e.init(i),i.click()}),load_ondemand(n.find("a.token-management"),"click","Loading Token management ...".i18n(),"token/token",function(e){var i=n.find("a.token-management");e.init(i),i.click()}),load_ondemand(n.find("a.change-password"),"click","Loading Password dialog ...".i18n(),"password/password",function(e){var i=n.find("a.change-password");e.init(i),i.click()}),load_ondemand(n.find("a.assetIndex"),"click","Loading Asset Index ...".i18n(),"assetindex/assetIndex",function(e){var i=n.find("a.assetIndex");e.init(i),i.click()}),load_ondemand(n.find("a.portfolio"),"click","Loading portfolio ...".i18n(),"portfolio/portfolio",function(e){var i=n.find("a.portfolio");e.init(i),i.click()}),load_ondemand(n.find("a.deposit"),"click","Loading Deposit funds ...","cashier/deposit",function(e){var i=n.find("a.deposit");e.init(i),i.click()}),load_ondemand(n.find("a.withdraw"),"click","Loading Withdraw funds ...","cashier/withdraw",function(e){e=e.default||e;var i=n.find("a.withdraw");e.init(i),i.click()}),load_ondemand(n.find("a.profitTable"),"click","Loading Profit Table ...".i18n(),"profittable/profitTable",function(e){var i=n.find("a.profitTable");e.init(i),i.click()}),load_ondemand(n.find("a.statement"),"click","Loading Statement Table ...".i18n(),"statement/statement",function(e){var i=n.find("a.statement");e.init(i),i.click()}),load_ondemand(n.find("a.historical-data"),"click","Loading Download/View Data ...".i18n(),"historical-data/historical-data",function(e){var i=n.find("a.historical-data");e.init(i),i.click()}),load_ondemand(n.find("a.selfexclusion"),"click","Loading Self-Exclusion ...".i18n(),"selfexclusion/selfexclusion",function(e){var i=n.find("a.selfexclusion");e.init(i),i.click()}),load_ondemand(n.find("a.theme_custom"),"click","Loading custom theme configuration...".i18n(),"themes/custom_theme/custom_theme",function(e){var i=n.find("a.theme_custom");e.init(i),i.click()}),load_ondemand(n.find("a.copytrade"),"click","Loading Copy Trade...".i18n(),"copytrade/copytrade",function(e){var i=n.find("a.copytrade");e.init(i),i.click()})};require(["navigation/navigation","jquery-ui","css!main.css","css!binary-style"],function(e){e.init(i),n("#menu").menu(),require(["instruments/instruments","trade/tradeMenu","jquery-growl"],function(e,i){n.growl.notice({message:"Loading chart and trade menus ...".i18n()}),e.init(),i.init()}),require(["windows/windows"],function(e){var i=n("#nav-menu .windows");e.init(i),n(".sk-spinner-container").parent().hide(),n("body > .footer").show()})}),require(["selfexclusion/selfexclusion","accountstatus/accountstatus","realitycheck/realitycheck","websitestatus/websitestatus"]),require(["jquery","jquery-ui-touch-punch"],function(e){e(".ui-dialog").draggable()})}else top.location=self.location}()}),require(["jquery","jquery-growl"],function(n){["error","notice","warning"].forEach(function(e){var i=n.growl[e].bind(n.growl);n.growl[e]=function(e){e.message&&-1<e.message.indexOf("rate limit")&&(e.message+=" Please try again after 1 minute.".i18n()),e.title||(e.title=""),n('#growls .growl:contains("'+e.message+'")').remove(),i(e)}})});