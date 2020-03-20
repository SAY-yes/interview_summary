> BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。

### 1、BFC的布局规则
1、内部的Box会在垂直方向，一个接一个地放置。
2、Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
3、每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4、BFC的区域不会与float box重叠。
5、计算BFC的高度时，浮动元素也参与计算。

### 2、如何创建BFC
1、float的值不是none。
2、position的值不是static或者relative。
3、display的值是inline-block、table-cell、flex、table-caption或者inline-flex
4、overflow的值不是visible

### 3、BFC的作用
1、用BFC避免margin重叠。
2、自适应两栏布局(根据规则三)
3、清楚浮动。（根据规则五解决高度塌陷问题）
