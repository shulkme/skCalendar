## skCalendar
> JS原生日历插件，无任何依赖，支持日历实时刷新、获取指定日期、日期格式化

![插件效果预览](https://github.com/shulkme/skCalendar/blob/master/skCalendar-preview.png "插件效果预览")
### 引用
1. 在<head>标签引入css样式，如需修改样式，可以自定义scss文件

```html
<link rel="stylesheet" href="[Your project path]/skCalendar.css">
```
2. 在 </body> 前引入JavaScript文件

```html
<script src="[Your project path]/skCalendar.js"></script>
```

### 构建
1. 需要一个日历容器，示例：
``` html
<div class="wrapper"></div>
``` 
2. 然后在 <script> 实例化日历
```javascript
const wrap = document.querySelect('.wrapper');
const calendar = new SkCalendar({
	wrapper:wrap
});

// or 
const calendar = new SkCalendar({
	wrapper:'.wrapper'
});
```

### 参数
|名称   |默认值   |规范   |解释   |
| ------------ | ------------ | ------------ | ------------ |
|wrapper   |null   |必选   |日历容器   |
|date   |null   |可选   |初始化日期   |
|itemFun   |function   |可选   |日期点击回调函数   |
|startDate   |0   |可选   |星期排序开头，0表示以日开始，可选范围0~6   |
|lang   |'cn'   |可选   |星期、月份语言，可选'cn'/'en'   |
|weekAbbr   |true   |可选   |星期是否缩写   |
|monthAbbr   |true   |可选   |月份是否缩写   |
|format   |'yyyy年MM月dd日'   |可选   |日期输出格式   |
|fullScreen   |true   |可选   |是否充满整个容器   |

### 属性
1. `today` 获取当前日期
```javascript
//return 
today = {
      year: xxxx,
      month: xx,
      day: xx
};

//get
console.log(calendar.today.year);
console.log(calendar.today.month);
console.log(calendar.today.day);
```
2. `selectDate` 获取当前选中的日期
```javascript
//return 
selectDate = {
      year: xxxx,
      month: xx,
      day: xx
};

//get
console.log(calendar.selectDate.year);
console.log(calendar.selectDate.month);
console.log(calendar.selectDate.day);
```
3. `weekFormatList` 获取星期格式化列表
```javascript
//return 
weekFormatList = {
          cn:[
              ['日','一','二','三','四','五','六'],
              ['日','壹','贰','叁','肆','伍','陆']
             ],
          en:[
              ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'],
              ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
             ]
      };
```
4. `weekFormatList` 获取星期格式化列表
```javascript
//return 
monthFormatList = {
          cn:[
              ['1','2','3','4','5','6','7','8','9','10','11','12'],
              ['一','二','三','四','五','六','七','八','九','十','十一','十二']
             ],
          en:[
              ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],    
['January','February','March','April','May','June','July','August','September','October','November','December']
             ]
      };
```

### 方法
1. `update` 更新日历
```javascript
const newDate = new Date();
calendar.update(newDate);

// or

calendar.update('xxxx-xx-xx');

```
2. `getDaysList` 获取视图中的日期排序表
```javascript
console,log(calendar.getDaysList);

//print
object={
	dayList: (42) [28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7],
	nextDays: 30,
	nextMonth: 9,
	nextSep: 35,
	nextYear: 2019,
	prevDays: 31,
	prevMonth: 7,
	prevSep: 4,
	prevYear: 2019,
	thisDays: 31,
	thisMonth: 8,
	thisYear: 2019
}
```
3. `prevMonth` 切换到上一个月的日历
```javascript
element.onclick=function(){
	calendar.prevMonth();
}
```
4. `nextMonth` 切换到下一个月的日历
```javascript
element.onclick=function(){
	calendar.nextMonth();
}
```
