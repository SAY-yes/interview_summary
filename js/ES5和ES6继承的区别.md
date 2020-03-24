## 一、ES5最常见的两种继承：原型链继承、构造函数继承

1.原型链继承
```
// 定义父类
function Parent(name) {
		this.name = name;
}
Parent.prototype.getName = function() {
		return this.name;
};

// 定义子类
function Children() {
		this.age = 24;
}

// 通过Children的prototype属性和Parent进行关联继承
Children.prototype = new Parent('陈先生');

// Children.prototype.constructor === Parent.prototype.constructor = Parent

var test = new Children();

// test.constructor === Children.prototype.constructor === Parent

test.age // 24
test.getName(); // 陈先生
```

我们可以发现，整个继承过程，都是通过原型链之间的指向进行委托关联，直到最后形成了”由构造函数所构造“的结局。

2.构造函数继承

    // 定义父类
    function Parent(value) {
        this.language = ['javascript', 'react', 'node.js'];
        this.value = value;
    }
    
    // 定义子类
    function Children() {
    	Parent.apply(this, arguments);
    }

    const test = new Children(666);

    test.language // ['javascript', 'react', 'node.js']
    test.value // 666
构造继承关键在于，通过在子类的内部调用父类，即通过使用apply()或call()方法可以在将来新创建的对象上获取父类的成员和方法。

## 二、ES6的继承

    // 定义父类
    class Father {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        show() {
            console.log(`我叫:${this.name}， 今年${this.age}岁`);
        }
    };

    // 通过extends关键字实现继承
    class Son extends Father {};

    let son = new Son('陈先生', 3000);
    
    son.show(); // 我叫陈先生 今年3000岁
ES6中新增了class关键字来定义类，通过保留的关键字extends实现了继承。实际上这些关键字只是一些语法糖，底层实现还是通过原型链之间的委托关联关系实现继承。

## 三、总结：
* ES5的继承是通过prototype或构造函数机制来实现。ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上(Parent.apply(this))。
* ES6的继承机制实质上是先创建父类的实例对象this(所以必须先调用父类的super()方法)，然后再用子类的构造函数修改this。

