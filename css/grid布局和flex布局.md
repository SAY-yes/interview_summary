> Grid 布局与 Flex 布局有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。
> 
>Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。


## Grid网格布局
```
<div id="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
  <div class="item item-6">6</div>
  <div class="item item-7">7</div>
  <div class="item item-8">8</div>
  <div class="item item-9">9</div>
</div>
```
###  一、容器属性
* grid-template-columns属性定义每一列的列宽
* grid-template-rows属性定义每一行的行高
```
.container{
	display: grid;
	 <!-- 1、绝对单位 -->
	grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
	<!-- 2、百分比 -->
	grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
	<!-- 3、自动重复 -->
	grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
	<!-- 4、自动填充 -->
	grid-template-columns: repeat(auto-fill, 100px);
	grid-template-rows: repeat(auto-fill,100px);
	<!-- 5、比例关系 -->
	grid-template-columns: 1fr 2fr 1fr;
	grid-template-rows: repeat(3, 1fr);
	<!-- 6、范围 -->
	grid-template-columns: 1fr 1fr minmax(100px, 1fr);
	grid-template-rows: 1fr 1fr minmax(100px, 1fr);
	<!-- 7、不定长宽 -->
	grid-template-columns: 100px auto 100px;
	grid-template-rows: 100px auto 100px;
	<!-- 8、网格线名称 -->
	grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```
> repeat()函数：接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。
>
> auto-fill关键字：自动填充，希望每一行（或每一列）容纳尽可能多的单元格
>
> fr关键字：如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。
>
> minmax()函数：产生一个长度范围，表示长度就在这个范围之中
>
> auto关键字：表示由浏览器自己决定长度。
>
> 网格布局使用方括号，指定每一根网格线的名字。允许同一根线有多个名字，比如[fifth-line row-5]

* grid-column-gap/column-gap 属性设置列与列的间隔（列间距）
* grid-row-gap/row-gap 属性设置行与行的间隔（行间距）
* grid-gap/gap 属性是grid-column-gap和grid-row-gap的合并简写形式

* grid-template-areas属性用于定义区域
```
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}
```
> 区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end。比如，区域名为header，则起始位置的水平网格线和垂直网格线叫做header-start，终止位置的水平网格线和垂直网格线叫做header-end。
>
> 如果某些区域不需要利用，则使用"点"（.）表示。'a . c'

* grid-auto-flow 属性决定单元格的排列顺序。其值为：
◊ row，即"先行后列"，默认值。
◊ column，即"先列后行"。
◊ row dense，表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。
◊ column dense，表示"先列后行"，并且尽量填满空格。

* align-items属性设置单元格内容的垂直位置（上中下）。
* justify-items 属性，设置单元格内容的水平位置（左中右）。
* place-items属性是align-items属性和justify-items属性的合并简写形式。
◊ start：对齐单元格的起始边缘。
◊ end：对齐单元格的结束边缘。
◊ center：单元格内部居中。
◊ stretch：拉伸，占满单元格的整个宽度（默认值）。

* justify-content属性是整个内容区域在容器里面的水平位置（左中右）。
* align-content属性是整个内容区域的垂直位置（上中下）。
* place-content属性是align-content属性和justify-content属性的合并简写形式。
◊ start - 对齐容器的起始边框。
◊ end - 对齐容器的结束边框。
◊ center - 容器内部居中。
◊ stretch - 项目大小没有指定时，拉伸占据整个网格容器。
◊ space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
◊ space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
◊ space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

* grid-template属性是grid-template-columns、grid-template-rows和grid-template-areas这三个属性的合并简写形式。
* grid属性是grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow这六个属性的合并简写形式。

## 二、项目属性
* grid-column-start属性：左边框所在的垂直网格线
* grid-column-end属性：右边框所在的垂直网格线
* grid-row-start属性：上边框所在的水平网格线
* grid-row-end属性：下边框所在的水平网格线
```
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;
}
```
> 这四个属性的值，除了指定为第几个网格线，还可以指定为网格线的名字。
```
.item-1 {
  grid-column-start: header-start;
  grid-column-end: header-end;
}
```
> 这四个属性的值还可以使用span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。
```
.item-1 {
  grid-column-start: span 2;
}
```
* grid-column属性是grid-column-start和grid-column-end的合并简写形式
* grid-row属性是grid-row-start属性和grid-row-end的合并简写形式。
```
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
/* 等同于 */
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}
```
* grid-area属性指定项目放在哪一个区域。
```
.item-1 {
  grid-area: e;
}
```
> grid-area属性还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写形式，直接指定项目的位置。
```
.item-1 {
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
.item-1 {
  grid-area: 1 / 1 / 3 / 3;
}
```
* justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目。
* align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目。
◊ start：对齐单元格的起始边缘。
◊ end：对齐单元格的结束边缘。
◊ center：单元格内部居中。
◊ stretch：拉伸，占满单元格的整个宽度（默认值）。

* place-self属性是align-self属性和justify-self属性的合并简写形式。
```
.item-1 {
  place-self: <align-self> <justify-self>
}
.item-1 {
  place-self: center center
}
```
