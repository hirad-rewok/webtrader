define(["indicator_base","highstock"],function(a){function b(b,c){var d=c,f=c-1,g=c-2,h=a.extractPriceForAppliedTO(a.OPEN,b,d),i=a.extractPriceForAppliedTO(a.CLOSE,b,d),j=a.extractPriceForAppliedTO(a.OPEN,b,f),k=a.extractPriceForAppliedTO(a.CLOSE,b,f),l=a.extractPriceForAppliedTO(a.LOW,b,f),m=a.extractPriceForAppliedTO(a.HIGH,b,f),n=a.extractPriceForAppliedTO(a.OPEN,b,g),o=a.extractPriceForAppliedTO(a.CLOSE,b,g),p=n>o,q=o>n,r=k>j,s=j>k,t=i>h,u=h>i,v=Math.abs(k-j),w=q&&r&&v>e&&u&&h>m&&i>=m&&m+.1*v>=i,x=p&&s&&v>e&&t&&l>h&&l>=i&&i>=l-.1*v;return{isBullishContinuation:w,isBearishContinuation:x}}var c={},d={},e=0;return{init:function(){!function(a,f,g){function h(a,e){{var f=this;f.chart}for(var h in d)if(d[h]&&d[h].options&&d[h].options.data&&d[h].options.data.length>0&&c[h].parentSeriesID==f.options.id){var i=f.options.data,j=g.findIndexInDataForTime(i,a);if(j>=1){var k=b(i,j),l=null;k.isBullishContinuation?l={x:i[j].x||i[j][0],title:'<span style="color : blue">ON</span>',text:"On-Neck : Bull"}:k.isBearishContinuation&&(l={x:i[j].x||i[j][0],title:'<span style="color : red">ON</span>',text:"On-Neck : Bear"});for(var m=-1,n=d[h].data.length-1;n>=0;n--)if((d[h].data[n].x||d[h].data[n][0])==(i[j].x||i[j][0])){m=n;break}l?(e&&m>=0&&d[h].data[m].remove(),d[h].addPoint(l)):m>=0&&d[h].data[m].remove()}}}a&&!a.Series.prototype.addCDLONNECK&&(a.Series.prototype.addCDLONNECK=function(a){var h=this.options.id;a=f.extend({parentSeriesID:h},a);var i="_"+(new Date).getTime(),j=this.options.data||[];if(j&&j.length>0){e=g.getCandleMediumHeight(j);for(var k=[],l=2;l<j.length;l++){var m=b(j,l);m.isBullishContinuation&&k.push({x:j[l].x||j[l][0],title:'<span style="color : blue">ON</span>',text:"On-Neck : Bull"}),m.isBearishContinuation&&k.push({x:j[l].x||j[l][0],title:'<span style="color : red">ON</span>',text:"On-Neck : Bear"})}var n=this.chart;c[i]=a;d[i]=n.addSeries({id:i,name:"CDLONNECK",data:k,type:"flags",onSeries:h,shape:"flag",turboThreshold:0},!1,!1),f(d[i]).data({isIndicator:!0,indicatorID:"cdlonneck",parentSeriesID:a.parentSeriesID}),n.redraw()}return i},a.Series.prototype.removeCDLONNECK=function(a){var b=this.chart;c[a]=null,b.get(a).remove(!1),d[a]=null,b.redraw()},a.Series.prototype.preRemovalCheckCDLONNECK=function(a){return{isMainIndicator:!0,isValidUniqueID:null!=c[a]}},a.wrap(a.Series.prototype,"addPoint",function(a,b,d,e,f){a.call(this,b,d,e,f),g.checkCurrentSeriesHasIndicator(c,this.options.id)&&h.call(this,b[0])}),a.wrap(a.Point.prototype,"update",function(a,b,d,e){a.call(this,b,d,e),g.checkCurrentSeriesHasIndicator(c,this.series.options.id)&&h.call(this.series,this.x,!0)}))}(Highcharts,jQuery,a)}}});