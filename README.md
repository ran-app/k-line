# 使用说明

![图片](https://github.com/RanJun2022/k-line/blob/main/document/002.png?raw=true)
![图片](https://github.com/RanJun2022/k-line/blob/main/document/001.png?raw=true)
![图片](https://github.com/RanJun2022/k-line/blob/main/document/003.png?raw=true)
* ## 1、k线图
* ChartGraph 为class对象，使用时使用new创建对象，参数如下

参数名称 | 必须 | 参数说明
---- | ---- | ----
el | 是 | 绘制的目标节点，需要有宽度高度
url | 是 | 获取k线图数据的GET接口，需自己实现
request | 是 | 获取k线图接口参数

***服务器接口request参数如下***

参数名称 | 必须 | 参数说明
---- | ---- | ----
channel | 是 | 绘制通道，可以是某个股票或者区块链币对
period | 是 | 需要绘制的k线图数据统计时间（单位分钟），如1、5、15、30、60、240、1440
limit | 是 | k线图展示的数量
time | 否 | k线图实时刷新传入的最新时间，如果传入返回time后最新数据，否则返回旧数据，初始时不需要传入

***接口返回参数***

参数名称 | 必须 | 参数说明
---- | ---- | ----
code | 是 | 0成功、其他失败
data | 是 | k线图数组数据,格式为[[时间秒,开盘价,最高价,最低价,收盘价,数量]]
* ChartGraph方法说明
***update刷新图表、参数为request***
