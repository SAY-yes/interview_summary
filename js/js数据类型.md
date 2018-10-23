# 了解js数据类型吗？
### 1、数据类型  
基本数据类型：
* Number    
Number类型包含整数和浮点数   
NaN:非数字类型。特点：① 涉及到的 任何关于NaN的操作，都会返回NaN   ② NaN不等于自身。    
isNaN() 函数用于检查其参数是否是非数字值。  
* Boolean  
* String    
字符串有length属性。   
字符串转换：转型函数String(),适用于任何数据类型（null,undefined 转换后为null和undefined）；toString()方法（null,defined没有toString()方法）。
* undefined 
* null    
typeof null = Object，原因在于，null类型被当做一个空对象引用。   

复杂数据类型：
* Object   
js中对象是一组属性与方法的集合。这里就要说到引用类型了，引用类型是一种数据结构，用于将数据和功能组织在一起。引用类型有时候也被称为对象定义，因为它们描述的是一类对象所具有的属性和方法。

### 2、引用类型：
* Object    
创建Object实例的两种方法：
1. 使用Object构造函数   
例如：var person = new Object();
2. 使用对象字面量方式  
例如：var person = {   
　　name : "Micheal",   
　　age : 24   
};
* Array  
数组的每一项可以用来保存任何类型的数据。   
创建数组的两种基本方式：
1. 使用Array构造函数   
例如：var color = new Array("red","blue","yellow");   
2. 使用数组字面量方式   
例如：var colors = ["red","blue","yellow"];
* Function   
每个函数都是Function类型的实例，而且都与其他引用类型一样具有属性和方法。   
创建函数的两种基本方式：
1. 使用函数声明语法定义   
例如：function sum(num1,num2){   
　　return num1 + num2;   
};   
2. 使用函数表达式定义   
例如：var sun = function (){   
　　return sum1 + sum2;   
};

### 3、数据类型的存储:   
1. 基本数据类型,即值传递，保存在栈内存，按值访问。   
2. 引用数据类型实际上是一个指针，这个指针也保存在栈中，但是这个指针指向的对象则保存在堆内存中。读写它们时需要先从栈中读取堆内存地址，然后找到保存在堆内存中的值。  

### 4、数据类型的检测:   
* typeof操作符   
一般用来检测基本数据类型，返回以下某个字符串：'undefined', 'boolean', 'number', 'string', 'object', 'function'。   
null, Array, Date, RegExp, Object都返回'object'。   
function虽然也是对象的一种，但是函数具有某些特殊属性，因此通过typeof来区分函数和其他对象是有必要的。    
例如：typeof操作符可以用来判断一个变量是否存在：   
if(typeof a != 'undefined'){ }   
而不要通过以下方式去判断a变量是否存在：      
if(a){ }   
因为如果a变量未声明会报错。  

* instanceof   
用于检测引用数据类型，可以检测到具体的类型，如果变量是引用类型的实例则返回true。   
检测数组有两种方法：   
if(value instanceof Array){ }   
if(Array.isArray(value)){ }   （推荐）

### 5、类型转换
* 强制类型转换：

    a.转为数字：

    Number(vari)   
    >*1*、如果转换的内容本身就是一个数值类型的字符串，那么将来在转换的时候会返回自己。       
    *2*、如果转换的内容本身不是一个数值类型的字符串，那么在转换的时候结果是NaN.    
    *3*、如果要转换的内容是空的字符串，那以转换的结果是0.   
    *4*、如果是其它的字符，那么将来在转换的时候结果是NaN.  

    parseInt(vari)   
    >*1*、忽略字符串前面的空格，直至找到第一个非空字符,还会将数字后面的非数字的字符串去掉。   
    *2*、如果第一个字符不是数字符号或者负号，返回NaN。   
    *3*、会将小数取整。（向下取整）

    parseFloat(vari)   
    >与parseInt一样，唯一区别是parseFloat可以保留小数。   

    b.转为字符串： 

    String(vari)   
    vari.toString()
    >undefined，null不能用toString。

    c.转boolean类型:    

    Boolean()
    >在进行boolean转换的时候所有的内容在转换以后结果都是true，除了：false、""（空字符串）、0、NaN、undefined
* 隐式类型转换：   
    a.转number:   

        var a = “123”;
        a = +a;

    加减乘除以及最余都可以让字符串隐式转换成number. 

    b.转string:    

        var a = 123;
        a = a + “”;

    c.转boolean:

        var a = 123;
        a = !!a;