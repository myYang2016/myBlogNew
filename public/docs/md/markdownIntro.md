## markdown要点总结 
>使用markdown主要是为了写自己的博客方便，而不用去写html代码，而且也能提高效率。在学习的过程中，主要是参照[作者编写的文档][1]来学习的。 ——2017/1/10   羊锡贵
[1]:http://daringfireball.net/projects/markdown/syntax
####1. 使用编辑器markdownpad
[官网下载地址][2]  
[2]:http://markdownpad.com/
#####破解码：  

Email address :  
Soar360@live.com  

License key：
GBPduHjWfJU1mZqcPM3BikjYKF6xKhlKIys3i1MU2eJHqWGImDHzWdD6xhMNLGVpbP2M5SN6bnxn2kSE8qHqNY5QaaRxmO3YSMHxlv2EYpjdwLcPwfeTG7kUdnhKE0vVy4RidP6Y2wZ0q74f47fzsZo45JE2hfQBFi2O9Jldjp1mW8HUpTtLA2a5/sQytXJUQl/QKO0jUQY4pa5CCx20sV1ClOTZtAGngSOJtIOFXK599sBr5aIEFyH0K7H4BoNMiiDMnxt1rD8Vb/ikJdhGMMQr0R4B+L3nWU97eaVPTRKfWGDE8/eAgKzpGwrQQoDh+nzX1xoVQ8NAuH+s4UcSeQ==

####2. 段落
用空行分开，空行类型没有限定，只要是段落间的空行；另外段落中不能出现空白或制表符
####3. 加入行
在markdown中直接用回车键跳行是没有效果的，必须在要跳行的句子结尾输入两个及以上的空格，并回车，就可以跳行。
####4.标题样式
标题样式可以在标题下方加入符号‘-’或‘=’，如  

    This is an H1  
    =============  
    This is an H2  
    ------------  

效果如下：
This is an H1  
=============  
This is an H2  
------------  

同时也可以直接通过添加‘#’来添加，如  

    ####4.标题样式
####5. 添加email-style

这个可以是文章开头的简介部分,主要通过在字段前面加‘>’号来实现，如  

	>这是一篇文章的简介不封  
	
效果如下：
>这是一篇文章的简介不封  

也可以多行显示，但只在第一行标符号‘>’
####6、 列表
列表分为有序列表和无序列表，无序列表在每列前加符号‘*’，也可以是‘+’和‘_’，三种选择一种即可，如

	* first
	* two
	* three

效果如下：  

* first
* two
* three

☞星号后面必须有空格  

有序列表直接在前面加数字，数字没有严格要求，即可以任意数字，如  

	5. first
	2. second
	1. three
	
效果如下：  

5. first
2. second
1. three

####7、代码段
代码段主要在需要书写代码的上方空一行，再在代码段每行前加一个tab或者4个空格。效果相当于`<pre><code></code></pre>`，如果要单独使用`<code></code>`，则可以使用反引号‘`’包围，如

	`<div>代码部分</div>`

效果，`<div>代码部分</div>`，反引号也可以一边两个。
####8、水平分割线
相当于html中的hr标签，可以使用符号‘-’、‘*’，‘_’，用三个及以上来实现，如  

	____
	***
	---

效果如下：
____
***
---

####9、链接
链接实现后为html的a标签，写法如下

	[title](http://baidu.com)
效果为，[title](http://baidu.com)，由此可以看出title部分为a标签的文本部分，后边括号为地址。也可以通过引用的方式去实现，如

	This is [an example][id] reference-style link.  
	[id]: http://example.com/  "Optional Title Here" 
效果为：
This is [an example][id] reference-style link.  
[id]: http://example.com/  "Optional Title Here"

①其中"Optional Title Here" 相当于a标签的title，且方式可以用双引号，单引号，小括号。  
②也可以写到下一行，并前面加tab或空格。  
③地址也可以用尖括号<>包围。id不区分大小写，可以是字母、数字、空格、标点符号。  
④id可以为空，此时可以用前面的中括号里的内容充当id，如 

	I get 10 times more traffic from [Google][] than from
	[Yahoo][] or [MSN][].
	
	  [google]: http://google.com/        "Google"
	  [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
	  [msn]:    http://search.msn.com/    "MSN Search"
####10、重点语句
主要表示需要重点突出的字段，用‘*’或者‘_’，单个相当于html标签em，双个则相当于strong，如：

	**emText**
	*strongText*
效果如，
**emText**
*strongText*
####11、图片
图片的格式和a标签相识，只是需要在前面加个感叹号，如

	![imgTest](public/img/head.jpg)
其中imgTest为img的alt，而小括号里面为src。也可以使用引用的方式，和a标签一样。


