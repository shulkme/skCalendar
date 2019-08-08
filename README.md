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


