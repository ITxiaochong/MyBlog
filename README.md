# PLog

<h2>This is Test version for learning coding... </h2>
<br>

<h2>Modules use</h2>
&nbsp;&nbsp;&nbsp;Jquery(2015/05) + ES6(运行在服务器端)ES5(运行在客户端)<br>
+ Node(Express4.x框架 模板引擎swig ) 
+ MongoDB <br>
+ font-awesome <br>
+ Bootstrap4(未使用布局) <br>
+ ...?(I don't know)

### 一个博客小项目

### 2018-10-09 

<h3 style="color:red;">问题发现</h3>
<pre>
    <em>2018-10-09</em>
    今天的问题发现,用户放缩问题,由于当前设计使用了overflow:hidden;和
    scroll-content; js控制relative  top += 90%;的方法移动窗口滚动实现单个html
    使用当前版本,呈现多个页面的功能的效果。尤其是放大超过150%后出现页面显示缺失
    排版乱掉,如此一来文档无法呈现。
    解决方法猜想:
    使用display + setTimeout延时函数 
    使用relative+ 超大的relative + opacity
    使用z-index + display
    尽量将原有 js控制垂直top属性 --> js控制left 赋予0 属性 实现页面左右平移
    除了当前页面left = 0 其余left设为9999px等大数字 
    overflow-y允许滚动 部分页面content-right部分在盒子内部滚动
    参考之前的小项目固定字体的信息设置方案
</pre>

<h5>现在的样子:</h5>

<br>
<p>
<pre>
     public---|---css [bootsctrap/jqeryui]
              |---js  [bootstrap popper jquery]
              |---images [公共图片]
              |---font (Plog) [本地字体库]
              |---vedio/audio [暂时存放用户能够播放的背景音乐/后期使用酷我音乐api代替]
              |---...(other public files)

    views-----|---decorate---style[text/css]
              |---main---www---body---content---content0/1/2  [页面主体]
                     |     |      |---windows  [放置页面浮窗比如登录注册框]
                     |     |      |
                     |     |      |---...?(未完待续...)
                     |     |      |
                     |     |---footer          [页面尾部]
                     |     |---header          [页面头部]
                     |     |---masks           [scroll-content各个子页面的蒙层]
                     |     |---container.html  [主页面的包裹box]  
                     |       
                     |---Everify.html[注册验证呈现的页面email路由使用]
                     |---index.html  [主页main路由]
</pre>
    静态文件public 存放着 样式表和js脚本
    <br>
    views 视图文件夹 放着html模板文件 和 模板中的css 
    这些css文件写在html的 <b>&lt;style&gt;</b>标签嵌入主页 <b>index.html</b> 中
    <br>
    现在是测试版本 最终应该是通过js脚本动态生成和插入 &lt;script&gt;和&lt;style&gt;
    考虑到用户访问状态的不同,一个简单的想法便是通过模板引擎简单的完成css的加载
</p>
大二好忙啊,软考/四级/期中考试啥的。挤出点时间谢谢这个小项目,本项目只是用来试一试的小玩具,切勿当真,代码凌乱,组织乱序,变量名随意,没有将变量写在最起码的命名空间中而是直接暴露,没有加密,无缓存设置,无本地存储,更不要提优化处理。纯粹是现写出的潦草代码。
<br>
<h4>本项目计划着实现</h4>
<pre>
    (0) 随机拼图验证码/推拉验证码/汉字成语验证码 目前实现了最简单了拉条验证码但是没有写猜测人和机器的算法,<br> 基本上就是拉条的速度判断和停顿判断。考虑使用canvas从互联网上去图制作拼图验证码,这个比较有趣。<br> 汉字验证码的思路就是 nxm矩阵 点阵坐标区域标记汉字之类的方法
    (1) 基于OpenCV的刷脸登录(┭┮﹏┭┮),邮箱动态验证码登录(没有钱买手机短信就不实现手机号登录了)
    (2) QQ/微信(听说微信收费哒) 登录
    (3) 验证码的生成,解码,美化
    (4) canvas应用 画板/在线简单处理头像图片(支持拖拉上传) 图像上传,为文件上传打下基础
    (5) 文件并发的接受和恢复处理 基于Node的formidable 和 fs模块
    (6) 高等级用户的地图功能  (百度地图模块的使用)
    (7) 酷狗音乐api  
    (8) 每一位Plog用户的简单的爬虫功能 (之前就尝试爬过京东/淘宝)等几个电商网站
    (9) Echart 绘图库的尝试   [实现交互式的条形图/箱线图/散点图/饼图]
    (10) 一个基本的博客功能 富文本编辑器的使用或则markdown编辑器的使用
    (11) PLog管理员用户的管理界面
</pre>

<h4>最终的PLog的博客功能</h4>
<pre>
    \(^o^)/~ 
    用户拥有对评论、对博文、对专栏的部分操作
    管理员拥有对评论、对博文、对专栏、对用户的操作

    用户能够在线编辑文档,保存文档状态,发表文档,申请开启专栏,
    对已经发表的文档和评论进行删除和更改的操作,
    关注别人发表文章是的在线提醒(可以websocke实现)
    被别人关注 举报文章或用户  设置免密码7/10/15/30天登录

    管理员具有用户全部功能
    管理员能够更改 删除用户的文档和评论(太狠了...,考虑一下还是只能删除吧)
    如果级别达到了才可以修改,低级别管理员甚至不能查看或修改只能删除

    管理员可以注销用户 低级管理员可以申请注销用户
    高级管理员页面处理申请请求(基于websocket)
</pre>




