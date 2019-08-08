;(function (undefined) {
  "use strict";
  var _global;
  function extend(def,opt,override) {
      for (var key in opt){
          if (opt.hasOwnProperty(key)&&(!def.hasOwnProperty(key)|| override)){
              def[key]=opt[key];
          }
      }
      return def;
  }
  function SkCalendar(opts) {
      let defaults = {
          wrapper: null,
          date : null,
          itemFun:function () {},
          onloadFun:function(){},
          startDate: 0,
          lang:'cn',
          weekAbbr:true,
          monthAbbr:true,
          format:'yyyy年MM月dd日',
          fullScreen:true
      };
      this.weekFormatList = {
          cn:[
              ['日','一','二','三','四','五','六'],
              ['日','壹','贰','叁','肆','伍','陆']
             ],
          en:[
              ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'],
              ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
             ]
      };
      this.monthFormatList = {
          cn:[
              ['1','2','3','4','5','6','7','8','9','10','11','12'],
              ['一','二','三','四','五','六','七','八','九','十','十一','十二']
             ],
          en:[
              ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
              ['January','February','March','April','May','June','July','August','September','October','November','December']
             ]
      };
      const date = new Date();
      this.today = {
          year: date.getFullYear(),
          month: date.getMonth()+1,
          day: date.getDate()
      };
      this.selectDate = {
          year: date.getFullYear(),
          month: date.getMonth()+1,
          day: date.getDate()
      };
      this.options = extend(defaults,opts,true);
      this.init();
  }
    SkCalendar.prototype = {
        constructor: this,
        init:function () {
            if (this.checkWrapper()){
                const _weekLang = this.getOptions('weekAbbr') ? this.weekFormatList[this.getOptions('lang')][0] : this.weekFormatList[this.getOptions('lang')][1];
                let _week = [];
                for (let i =0;i<_weekLang.length;i++){
                    _week.push(_weekLang[i]);
                }
                let _startDate = this.getOptions('startDate');
                if (_startDate>6){
                    _startDate = 6;
                }else if (_startDate<0){
                    _startDate = 0;
                }
                this.setOptions('startDate',_startDate);
                const _weekFormat = (_week.slice(_startDate)).concat(_week.slice(0,_startDate));
                this.build(_weekFormat);
                this.comFill();
            }
        },
        build:function (weekVal) {
            var _this = this;
            var _wrap = _this.createDOM("div","sk-calendar");
            var _header = _this.createDOM("div","sk-calendar-header");
            var _body = _this.createDOM("div","sk-calendar-body");
            var _table = _this.createDOM("table","sk-calendar-table");
            if (_this.getOptions('fullScreen')) {
                _table.classList.add('sk-calendar-full');
            }
            var _thead = _this.createDOM("thead","");
            var _row;
            var _col;
            var _day;
            _row = _this.createDOM("tr","");
            for (let i = 0;i<7;i++){
                _col=_this.createDOM("th","");
                _col.innerText=weekVal[i];
                _row.appendChild(_col);
            }
            _thead.appendChild(_row);
            _table.appendChild(_thead);
            var _tbody = _this.createDOM("tbody","");
            for (let m =0;m<6;m++){
                _row = _this.createDOM("tr","sk-calendar-table-row");
                for (let n=0;n<7;n++){
                    _col=_this.createDOM("td","");
                    _day=_this.createDOM("div","sk-calendar-day");
                    _col.appendChild(_day);
                    _row.appendChild(_col);
                }
                _tbody.appendChild(_row);
            }
            _table.appendChild(_tbody);
            _body.appendChild(_table);
            _wrap.appendChild(_header);
            _wrap.appendChild(_body);
            _this.getOptions('wrapper').appendChild(_wrap);
            const _dayItem = _this.getOptions('wrapper').querySelectorAll('.sk-calendar .sk-calendar-body .sk-calendar-table >tbody>tr>td .sk-calendar-day');
            const _callback = _this.getOptions('itemFun');
            for (let i=0;i<42;i++){
                _dayItem[i].onclick=function(e){
                    //console.log(this);
                    const _daysResult = _this.getDaysList();
                    if (_this.hasClass(this.parentNode,'sk-calendar-prev')) {
                        _this.selectDate = {
                            year:_daysResult.prevYear,
                            month:_daysResult.prevMonth,
                            day:_daysResult.dayList[i]
                        };
                        //console.log(_this.selectDate);
                        _this.update(_daysResult.prevYear+'-'+_daysResult.prevMonth+'-'+_daysResult.dayList[i]);
                    }else if (_this.hasClass(this.parentNode,'sk-calendar-next')) {
                        _this.selectDate = {
                            year:_daysResult.nextYear,
                            month:_daysResult.nextMonth,
                            day:_daysResult.dayList[i]
                        };
                        //console.log(_this.selectDate);
                        _this.update(_daysResult.nextYear+'-'+_daysResult.nextMonth+'-'+_daysResult.dayList[i]);
                    }else if (_this.hasClass(this.parentNode,'sk-calendar-current')) {
                        _this.selectDate = {
                            year:_daysResult.thisYear,
                            month:_daysResult.thisMonth,
                            day:_daysResult.dayList[i]
                        };
                        //console.log(_this.selectDate);
                    }
                    _this.selectActive();
                    _callback.call(this,e);
                    //console.log(_this.selectDate);
                };
            }
        },
        isDOM:function (obj){
            if (typeof HTMLElement === 'object'){
                return obj instanceof HTMLElement;
            }else{
                return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
            }
        },
        hasClass:function (obj,className){
            return (' ' + obj.className + ' ').indexOf(' ' + className + ' ') > -1;
        },
        checkWrapper:function () {
            let _wrapper = this.getOptions('wrapper');
            if (_wrapper) {
                if (!this.isDOM(_wrapper)){
                    _wrapper = document.querySelector(_wrapper);
                    if (_wrapper){
                        this.setOptions('wrapper',_wrapper);
                        return true;
                    } else{
                        console.log('"wrapper" is not a valid selector.');
                        return false;
                    }
                }else{
                    return true;
                }
            }else{
                console.log('"wrapper" is not a valid selector.');
                return false;
            }
        },
        getDateEl:function (date){
            if (!date) {
                return  new Date();
            }else{
                return  new Date(Date.parse(date.replace(/-/g,"/")));
            }
        },
        dateFormat:function (date){
            let _format = this.getOptions('format');
            let _date = this.getDateEl(date);
            let _month = _date.getMonth();
            const _day = _date.getDate();
            if (this.getOptions('monthAbbr')){
                _month=this.monthFormatList[this.getOptions('lang')][0][_month];
            } else{
                _month=this.monthFormatList[this.getOptions('lang')][1][_month];
            }
            if (/(y+)/.test(_format)) {
                _format = _format.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            if (/(M+)/.test(_format)) {
                _format = _format.replace(RegExp.$1, _month + "");
            }
            if (/(d+)/.test(_format)) {
                _format = _format.replace(RegExp.$1, _day + "");
            }
            return _format;
        },
        setOptions:function (key,val){
            if (this.options.hasOwnProperty(key)){
                this.options[''+key+'']=val;
                return true;
            } else {
                return false;
            }
        },
        getOptions:function (key){
            if (this.options.hasOwnProperty(key)){
                var val = this.options[''+key+''];
                if (val==='undefined'||val===null){
                    return false;
                } else {
                    return val;
                }
            }else{
                return false;
            }
        },
        createDOM:function (tagName,className) {
            var _obj = document.createElement(tagName);
            if (className!==''){
                _obj.classList.add(className);
            }
            return _obj;
        },
        getDaysList:function () {
            const date = this.getDateEl(this.getOptions('date'));
            const _startDate = this.getOptions('startDate');
            let _days = [];

            const _year = date.getFullYear();
            const _month = date.getMonth()+1;
            const _thisDays = new Date(_year,_month,0).getDate();

            const _prevYear =_month>1 ? _year : _year-1;
            const _prevMonth = _month>1 ? _month-1 : 12;
            const _prevDays = new Date(_prevYear,_prevMonth,0).getDate();

            const _nextYear = _month < 12 ? _year : _year+1;
            const _nextMonth = _month < 12 ? _month+1 : 1;
            const _nextDays = new Date(_nextYear,_nextMonth,0).getDate();

            const _date = new Date(_year,_month-1,1);
            let _complement = _date.getDay();
            //console.log(_year+','+_month);

            if (_complement>_startDate){
                _complement = _complement - _startDate;
            }else if (_complement===_startDate) {
                _complement = 0;
            }else {
                _complement = _complement + 7 - _startDate;
            }
            //console.log(_complement);

            for (let i = _complement;i>0;i--){
                _days.push(_prevDays-i+1);
            }
            for (let j =1;j<=_thisDays;j++){
                _days.push(j);
            }
            for (let k = 1;k<=(42-_thisDays-_complement);k++){
                _days.push(k);
            }

            //console.log(_result);
            return {
                prevYear: _prevYear,
                prevMonth: _prevMonth,
                prevSep: _complement,
                prevDays: _prevDays,
                thisYear: _year,
                thisMonth: _month,
                thisDays: _thisDays,
                nextYear: _nextYear,
                nextMonth: _nextMonth,
                nextSep: _complement + _thisDays,
                nextDays: _nextDays,
                dayList: _days
            };
        },
        update:function (newDate) {
            const _wrap = this.getOptions('wrapper');
            const _dayItemList = _wrap.querySelectorAll('.sk-calendar-day');
            for (let i=0;i<_dayItemList.length;i++){
                _dayItemList[i].parentNode.classList.remove("sk-calendar-prev");
                _dayItemList[i].parentNode.classList.remove("sk-calendar-current");
                _dayItemList[i].parentNode.classList.remove("sk-calendar-today");
                _dayItemList[i].parentNode.classList.remove("sk-calendar-next");
            }
            //newDate = this.getDateEl(newDate);
            this.setOptions('date',newDate);
            this.comFill();
        },
        comFill:function () {
            //const _date = this.getDateEl(this.getOptions('date'));
            const _days = this.getDaysList();
            const _wrap = this.getOptions('wrapper');
            const _dayItemList = _wrap.querySelectorAll('.sk-calendar-day');
            //console.log(dayItemList);
            let _sign = 0;
            let _dateTemp;
            for (let i=0;i<_days.prevSep;i++){
                _dayItemList[i].innerText = _days.dayList[i];
                _dateTemp = _days.prevYear+'-'+_days.prevMonth+'-'+_days.dayList[i];
                _dayItemList[i].setAttribute('title',this.dateFormat(_dateTemp));
                _dayItemList[i].parentNode.classList.add("sk-calendar-prev");
                _sign++;
            }
            for (let i=_sign;i<_days.nextSep;i++){
                _dayItemList[i].innerText = _days.dayList[i];
                _dateTemp = _days.thisYear+'-'+_days.thisMonth+'-'+_days.dayList[i];
                _dayItemList[i].setAttribute('title',this.dateFormat(_dateTemp));
                _dayItemList[i].parentNode.classList.add("sk-calendar-current");
                _sign++;
                if (_days.thisYear===this.today.year&&_days.thisMonth===this.today.month&&_days.dayList[i]===this.today.day){
                    _dayItemList[i].parentNode.classList.add("sk-calendar-today");
                }
            }
            for (let i =_sign;i<_days.dayList.length;i++){
                _dayItemList[i].innerText = _days.dayList[i];
                _dateTemp = _days.nextYear+'-'+_days.nextMonth+'-'+_days.dayList[i];
                _dayItemList[i].setAttribute('title',this.dateFormat(_dateTemp));
                _dayItemList[i].parentNode.classList.add("sk-calendar-next");
                _sign++;
            }

        },
        selectActive:function () {
            const _day = this.selectDate.day;
            const _dayItem =  this.getOptions('wrapper').querySelectorAll('.sk-calendar .sk-calendar-body .sk-calendar-table >tbody>tr .sk-calendar-current .sk-calendar-day');
            const _allItem = this.getOptions('wrapper').querySelectorAll('.sk-calendar .sk-calendar-body .sk-calendar-table >tbody>tr>td');
            let _innerText = '';
            //console.log(_item);
            for (let i=0;i<_allItem.length;i++) {
                _allItem[i].classList.remove("sk-calendar-select");
            }
            for (let i =0;i<_dayItem.length;i++){
                _innerText = typeof _dayItem[i].innerText =='string' ? _dayItem[i].innerText : _dayItem[i].textContent;
                //console.log(_innerText);
                if (_innerText == _day){
                    _dayItem[i].parentNode.classList.add('sk-calendar-select');
                    break;
                }
            }

        },
        prevMonth: function () {
            const _days = this.getDaysList();
            const _prevMonth = _days.prevYear+'-'+_days.prevMonth;
            this.update(_prevMonth);
        },
        nextMonth: function () {
            const _days = this.getDaysList();
            const _prevMonth = _days.nextYear+'-'+_days.nextMonth;
            this.update(_prevMonth);
        }

  };
  _global = (function(){ return this || (0 , eval)('this'); }());
  if (typeof module !== "undefined" && module.exports) {
      module.exports = SkCalendar;
  } else if (typeof define === "function" && define.amd) {
      define(function(){return SkCalendar;});
  } else {
      !('SkCalendar' in _global) && (_global.SkCalendar = SkCalendar);
  }

}());