!function(e,_){"object"==typeof exports&&"undefined"!=typeof module&&"function"==typeof require?_(require("../moment")):"function"==typeof define&&define.amd?define(["../moment"],_):_(e.moment)}(this,function(e){"use strict";function _(e,_,t){var n,i;return"m"===t?_?"хвилина":"хвилину":"h"===t?_?"година":"годину":e+" "+(n=+e,i={ss:_?"секунда_секунди_секунд":"секунду_секунди_секунд",mm:_?"хвилина_хвилини_хвилин":"хвилину_хвилини_хвилин",hh:_?"година_години_годин":"годину_години_годин",dd:"день_дні_днів",MM:"місяць_місяці_місяців",yy:"рік_роки_років"}[t].split("_"),n%10==1&&n%100!=11?i[0]:2<=n%10&&n%10<=4&&(n%100<10||20<=n%100)?i[1]:i[2])}function t(e){return function(){return e+"о"+(11===this.hours()?"б":"")+"] LT"}}return e.defineLocale("uk",{months:{format:"січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"),standalone:"січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_")},monthsShort:"січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),weekdays:function(e,_){var t={nominative:"неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),accusative:"неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),genitive:"неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")};return!0===e?t.nominative.slice(1,7).concat(t.nominative.slice(0,1)):e?t[/(\[[ВвУу]\]) ?dddd/.test(_)?"accusative":/\[?(?:минулої|наступної)? ?\] ?dddd/.test(_)?"genitive":"nominative"][e.day()]:t.nominative},weekdaysShort:"нд_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY р.",LLL:"D MMMM YYYY р., HH:mm",LLLL:"dddd, D MMMM YYYY р., HH:mm"},calendar:{sameDay:t("[Сьогодні "),nextDay:t("[Завтра "),lastDay:t("[Вчора "),nextWeek:t("[У] dddd ["),lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return t("[Минулої] dddd [").call(this);case 1:case 2:case 4:return t("[Минулого] dddd [").call(this)}},sameElse:"L"},relativeTime:{future:"за %s",past:"%s тому",s:"декілька секунд",ss:_,m:_,mm:_,h:"годину",hh:_,d:"день",dd:_,M:"місяць",MM:_,y:"рік",yy:_},meridiemParse:/ночі|ранку|дня|вечора/,isPM:function(e){return/^(дня|вечора)$/.test(e)},meridiem:function(e,_,t){return e<4?"ночі":e<12?"ранку":e<17?"дня":"вечора"},dayOfMonthOrdinalParse:/\d{1,2}-(й|го)/,ordinal:function(e,_){switch(_){case"M":case"d":case"DDD":case"w":case"W":return e+"-й";case"D":return e+"-го";default:return e}},week:{dow:1,doy:7}})});