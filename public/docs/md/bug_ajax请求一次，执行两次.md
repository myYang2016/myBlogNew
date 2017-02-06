# bug:ajax请求一次，执行两次 #
>2017/1/19  羊锡贵

在使用ajax时，出现请求一次，但后端执行了两次的情况，而且第二次是隔了一段时间后才执行。后来看了浏览器的请求，如下![](http://i.imgur.com/s0QVjqg.png)
才发现没有返回数据，后来返回数据就不会出现了。![](http://i.imgur.com/XWswUmD.png)