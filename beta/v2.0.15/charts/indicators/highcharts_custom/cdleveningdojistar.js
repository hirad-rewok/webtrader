define(["indicator_base","highstock"],function(a){function b(b,c){var d=c,f=c-1,g=c-2,h=c-3,i=a.extractPriceForAppliedTO(a.OPEN,b,h),j=a.extractPriceForAppliedTO(a.CLOSE,b,h),k=a.extractPriceForAppliedTO(a.OPEN,b,g),l=a.extractPriceForAppliedTO(a.CLOSE,b,g),m=a.extractPriceForAppliedTO(a.OPEN,b,f),n=a.extractPriceForAppliedTO(a.CLOSE,b,f),o=a.extractPriceForAppliedTO(a.LOW,b,f),p=a.extractPriceForAppliedTO(a.HIGH,b,f),q=a.extractPriceForAppliedTO(a.OPEN,b,d),r=a.extractPriceForAppliedTO(a.CLOSE,b,d),s=j>i,t=l>k,u=q>r,v=Math.abs(q-r),w=Math.abs(k-l),x=Math.abs(o-p),y=m===n||.1*x>=Math.abs(m-n),z=!1,A=s&&t&&w>e&&y&&Math.min(m,n)>l&&u&&v>e&&q<Math.min(m,n)&&r>k&&l>r;return{isBullishContinuation:z,isBearishContinuation:A}}var c={},d={},e=0;return{init:function(){!function(a,f,g){function h(a,e){{var f=this;f.chart}for(var h in d)if(d[h]&&d[h].options&&d[h].options.data&&d[h].options.data.length>0&&c[h].parentSeriesID==f.options.id){var i=f.options.data,j=g.findIndexInDataForTime(i,a);if(j>=1){var k=b(i,j),l=null;k.isBearishContinuation&&(l={x:i[j].x||i[j][0],title:'<span style="color : red">EDS</span>',text:"Evening Doji Star : Bear"});for(var m=-1,n=d[h].data.length-1;n>=0;n--)if((d[h].data[n].x||d[h].data[n][0])==(i[j].x||i[j][0])){m=n;break}l?(e&&m>=0&&d[h].data[m].remove(),d[h].addPoint(l)):m>=0&&d[h].data[m].remove()}}}a&&!a.Series.prototype.addCDLEVENINGDOJISTAR&&(a.Series.prototype.addCDLEVENINGDOJISTAR=function(a){var h=this.options.id;a=f.extend({parentSeriesID:h},a);var i="_"+(new Date).getTime(),j=this.options.data||[];if(j&&j.length>0){e=g.getCandleMediumHeight(j);for(var k=[],l=3;l<j.length;l++){var m=b(j,l);m.isBearishContinuation&&k.push({x:j[l].x||j[l][0],title:'<span style="color : red">EDS</span>',text:"Evening Doji Star : Bear"})}var n=this.chart;c[i]=a;d[i]=n.addSeries({id:i,name:"CDLEVENINGDOJISTAR",data:k,type:"flags",onSeries:h,shape:"flag",turboThreshold:0},!1,!1),f(d[i]).data({isIndicator:!0,indicatorID:"cdleveningdojistar",parentSeriesID:a.parentSeriesID}),n.redraw()}return i},a.Series.prototype.removeCDLEVENINGDOJISTAR=function(a){var b=this.chart;c[a]=null,b.get(a).remove(!1),d[a]=null,b.redraw()},a.Series.prototype.preRemovalCheckCDLEVENINGDOJISTAR=function(a){return{isMainIndicator:!0,isValidUniqueID:null!=c[a]}},a.wrap(a.Series.prototype,"addPoint",function(a,b,d,e,f){a.call(this,b,d,e,f),g.checkCurrentSeriesHasIndicator(c,this.options.id)&&h.call(this,b[0])}),a.wrap(a.Point.prototype,"update",function(a,b,d,e){a.call(this,b,d,e),g.checkCurrentSeriesHasIndicator(c,this.series.options.id)&&h.call(this.series,this.x,!0)}))}(Highcharts,jQuery,a)}}});