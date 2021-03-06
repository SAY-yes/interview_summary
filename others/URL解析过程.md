# 从URL输入到页面展现到底发生什么???
总体来说分为以下几个过程:

* DNS 解析:将域名解析成 IP 地址
* TCP 连接：TCP 三次握手
* 发送 HTTP 请求
* 服务器处理请求并返回 HTTP 报文
* 浏览器解析渲染页面
* 断开连接：TCP 四次挥手

## 一、URL 到底是啥
scheme://host.domain:port/path/filename
解释如下：   
* scheme - 定义因特网服务的类型。常见的协议有 http、https、ftp、file，其中最常见的类型是 http，而 https 则是进行加密的网络传输。
* host - 定义域主机（http 的默认主机是 www）
* domain - 定义因特网域名，比如 w3school.com.cn
* port - 定义主机上的端口号（http 的默认端口号是 80）
* path - 定义服务器上的路径（如果省略，则文档必须位于网站的根目录中）。
* filename - 定义文档/资源的名称

## 二、域名解析（DNS）
浏览器如何通过域名去查询 URL 对应的 IP 呢 ？

* 浏览器缓存：浏览器会按照一定的频率缓存 DNS 记录。    
* 操作系统缓存：如果浏览器缓存中找不到需要的 DNS 记录，那就去操作系统中找。    
* 路由缓存：路由器也有 DNS 缓存。    
* ISP 的 DNS 服务器：ISP 是互联网服务提供商(Internet Service Provider)的简称，ISP 有专门的 DNS 服务器应对 DNS 查询请求。     
* 根服务器：ISP 的 DNS 服务器还找不到的话，它就会向根服务器发出请求，进行递归查询（DNS 服务器先问根域名服务器.com 域名服务器的 IP 地址，然后再问.baidu 域名服务器，依次类推） 

<img src="../assets/DNS域名解析.jpg"/>

> 浏览器通过向 DNS 服务器发送域名，DNS 服务器查询到与域名相对应的 IP 地址，然后返回给浏览器，浏览器再将 IP 地址打在协议上，同时请求参数也会在协议搭载，然后一并发送给对应的服务器。接下来介绍向服务器发送 HTTP 请求阶段，HTTP 请求分为三个部分：TCP 三次握手、http 请求响应信息、关闭 TCP 连接。

## 三、TCP 三次握手
<img src="../assets/三次握手.jpg"/>
1、TCP 三次握手的过程如下：

* 客户端发送一个带 SYN=1，Seq=X 的数据包到服务器端口（第一次握手，由浏览器发起，告诉服务器我要发送请求了）
* 服务器发回一个带 SYN=1， ACK=X+1， Seq=Y 的响应包以示传达确认信息（第二次握手，由服务器发起，告诉浏览器我准备接受了，你赶紧发送吧）
* 客户端再回传一个带 ACK=Y+1， Seq=Z 的数据包，代表“握手结束”（第三次握手，由浏览器发送，告诉服务器，我马上就发了，准备接受吧）

2、为啥需要三次握手
谢希仁著《计算机网络》中讲“三次握手”的目的是“为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误”。

## 四、发送 HTTP 请求
TCP 三次握手结束后，开始发送 HTTP 请求报文。
请求报文由请求行（request line）、请求头（header）、请求体组成
1、请求行包含请求方法、URL、协议版本   
* 请求方法包含 8 种：GET、POST、PUT、DELETE、PATCH、HEAD、OPTIONS、TRACE。
* URL 即请求地址，由 <协议>：//<主机>：<端口>/<路径>?<参数> 组成
* 协议版本即 http 版本号

2、请求头包含请求的附加信息，由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔。

3、请求体，可以承载多个请求参数的数据，包含回车符、换行符和请求数据，并不是所有请求都具有请求数据。

## 服务器处理请求并返回 HTTP 报文
1、MVC 后台处理阶段
MVC 是一个设计模式，将应用程序分成三个核心部件：模型（model）-- 视图（view）--控制器（controller），它们各自处理自己的任务，实现输入、处理和输出的分离。
<img src="../assets/MVC后台处理.jpg"/>
* 视图（view）

它是提供给用户的操作界面，是程序的外壳。

* 模型（model）

模型主要负责数据交互。在 MVC 的三个部件中，模型拥有最多的处理任务。一个模型能为多个视图提供数据。

* 控制器（controller）

它负责根据用户从"视图层"输入的指令，选取"模型层"中的数据，然后对其进行相应的操作，产生最终结果。

2、http 响应报文
* 响应行包含：协议版本，状态码，状态码描述

	状态码规则如下：
	1xx：指示信息--表示请求已接收，继续处理。
	2xx：成功--表示请求已被成功接收、理解、接受。
	3xx：重定向--要完成请求必须进行更进一步的操作。
	4xx：客户端错误--请求有语法错误或请求无法实现。
	5xx：服务器端错误--服务器未能实现合法的请求。

* 响应头部包含响应报文的附加信息，由 名/值 对组成

* 响应主体包含回车符、换行符和响应返回数据，并不是所有响应报文都有响应数据

## 六、浏览器解析渲染页面
浏览器拿到响应文本 HTML 后，接下来介绍下浏览器渲染机制:
<img src="../assets/浏览器渲染.jpg"/>
浏览器解析渲染页面分为一下五个步骤：

* 根据 HTML 解析出 DOM 树
* 根据 CSS 解析生成 CSS 规则树
* 结合 DOM 树和 CSS 规则树，生成渲染树
* 根据渲染树计算每一个节点的信息
* 根据计算好的信息绘制页面

1、根据 HTML 解析 DOM 树

根据 HTML 的内容，将标签按照结构解析成为 DOM 树，DOM 树解析的过程是一个深度优先遍历。即先构建当前节点的所有子节点，再构建下一个兄弟节点。
在读取 HTML 文档，构建 DOM 树的过程中，若遇到 script 标签，则 DOM 树的构建会暂停，直至脚本执行完毕。

2、根据 CSS 解析生成 CSS 规则树

解析 CSS 规则树时 js 执行将暂停，直至 CSS 规则树就绪。
浏览器在 CSS 规则树生成之前不会进行渲染。

3、结合 DOM 树和 CSS 规则树，生成渲染树

DOM 树和 CSS 规则树全部准备好了以后，浏览器才会开始构建渲染树。
精简 CSS 并可以加快 CSS 规则树的构建，从而加快页面相应速度。

4、根据渲染树计算每一个节点的信息（布局）

布局：通过渲染树中渲染对象的信息，计算出每一个渲染对象的位置和尺寸
回流：在布局完成后，发现了某个部分发生了变化影响了布局，那就需要倒回去重新渲染。

5、根据计算好的信息绘制页面

绘制阶段，系统会遍历呈现树，并调用呈现器的“paint”方法，将呈现器的内容显示在屏幕上。
重绘：某个元素的背景颜色，文字颜色等，不影响元素周围或内部布局的属性，将只会引起浏览器的重绘。
回流：某个元素的尺寸发生了变化，则需重新计算渲染树，重新渲染。

## 七、断开连接
当数据传送完毕，需要断开 tcp 连接，此时发起 tcp 四次挥手。
<img src="../assets/四次挥手.jpg"/>

* 发起方向被动方发送报文，Fin、Ack、Seq，表示已经没有数据传输了。并进入 FIN_WAIT_1 状态。(第一次挥手：由浏览器发起的，发送给服务器，我请求报文发送完了，你准备关闭吧)
* 被动方发送报文，Ack、Seq，表示同意关闭请求。此时主机发起方进入 FIN_WAIT_2 状态。(第二次挥手：由服务器发起的，告诉浏览器，我请求报文接受完了，我准备关闭了，你也准备吧)
* 被动方向发起方发送报文段，Fin、Ack、Seq，请求关闭连接。并进入 LAST_ACK 状态。(第三次挥手：由服务器发起，告诉浏览器，我响应报文发送完了，你准备关闭吧)
* 发起方向被动方发送报文段，Ack、Seq。然后进入等待 TIME_WAIT 状态。被动方收到发起方的报文段以后关闭连接。发起方等待一定时间未收到回复，则正常关闭。(第四次挥手：由浏览器发起，告诉服务器，我响应报文接受完了，我准备关闭了，你也准备吧)
