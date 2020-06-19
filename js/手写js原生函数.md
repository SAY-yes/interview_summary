### 实现一个new操作符
```
function create(Con,...args){
	this.obj = {};
	Object.setPrototypeOf(this.obj,Con.prototype);
	let result = Con.apply(this.obj,args);
	return result instanceof Object ? result : this.obj
}

function Children(name) {
	this.provice = 'beijing'
	this.name = name
}
const child1 = new Children('Mark')
console.log('child1=>', child1 );
const child2 = create(Children,'Jack')
console.log('child2=>', child2);
```
### 实现一个Array.isArray
```
Array.myIsArray = function(o) { 
  return Object.prototype.toString.call(o) === '[object Array]'; 
}; 
```
### 实现一个Object.create()方法
```
Object.myCreate = function (obj) {
	var F = function() {}
	F.prototype = obj
	return new F()
}

const par = {
	name:'Jack'
}
const obj1 = Object.myCreate(par)
console.log('obj1=>', obj1);
const obj2 = Object.create(par)
console.log('obj2=>', obj2);
```
### 实现一个EventEmitter
```
class EventEmitter{
	constructor(){
		this._cache = {}
	}
	on(event,callback){
		let events = this._cache[event]||[]
		events.push(callback)
		this._cache[event] = events
		console.log('on_cache=>', this._cache);
		return this
	}
	off(event,callback){
		let events = this._cache[event]
		if(Array.isArray(events)){
			if(callback){
				let index = events.indexOf(callback)
				if(index!==-1){
					events.splice(index,1)
				}
			}else{
				events.length = 0
			}
		}
		console.log('off_cache=>', this._cache);
		return this
	}
	emit(event,data){
		let events = this._cache[event]
		events.forEach(fn => {
			fn(data)
		});
		console.log('emit_cache=>', this._cache);
		return this
	}
	once(event,callback){
		let fn = () => {
			callback.call(this)
			this.off(event,fn)
		}
		this.on(type,fn)
		console.log('once_cache=>', this._cache);
		return this
	}
}
const listener = new EventEmitter()
listener.on('message',res=>{
	console.log('res=>', res);
})
```
### 实现一个Array.prototype.reduce
```
Array.prototype.myReduice = function(callBack,initialValue){
	let total = initialValue? initialValue:this[0]
	for (let i = initialValue?0:1; i < this.length; i++) {
		const _this=this
		const element = this[i];
		total = callBack(total, element,i, _this)
	}
	return total
}

const arr = [10,20,30,40]
const reduice1 = arr.myReduice((pre,next,index,origin) => {
	console.log('reduice1=>', pre, next, index, origin );
	return pre + next
})
const reduice2 = arr.myReduice((pre, next) => pre + next,10)
console.log('result=>', reduice1, reduice2 );
```
### 实现一个call或者apply
* call
```
Function.prototype.myCall = function (context = window) {
	// 将函数设为对象的属性
	context.fn = this;  // bar
	let args = [...arguments].slice(1);
	// 执行&删除这个函数
	let result = context.fn(...args);
	delete context.fn;
	return result;
}
var foo = { value: 1 }
function bar(name, age) {
	console.log(name)
	console.log(age)
	console.log(this.value);
}
bar.myCall(foo, 'black', '18')
```
* apply
```
Function.prototype.myApply = function (context = window) {
	context.fn = this;  // bar
	console.log('this=>', this);
	console.log('arguments=>', arguments );
	let result;
	if(arguments[1]){
		result = context.fn(...arguments[1])
	}else{
		result = context.fn()
	}
	delete context.fn;
	return result;
}
var foo = { value: 1 }
function bar(name, age) {
	console.log(name)
	console.log(age)
	console.log(this.value);
}
bar.myApply(foo, ['black', '18'])
```
### 实现一个Function.prototype.bind
* 简单写法：
```
Function.prototype.mybind = function (context) {
	var self = this;
	return function () {
		return self.apply(context, arguments);
	};
};

var obj = {
	name: '前端架构师'
};
var func = function () {
	console.log(this.name);
}.mybind(obj);
func();
```
* 全面写法：
```
Function.prototype.mybind = function () {
	// 1、保存函数
	let _this = this;
	// 2、保存目标对象
	let context = arguments[0] || window;
	// 3、保存目标对象之外的参数,将其转化为数组;
	let rest = Array.prototype.slice.call(arguments, 1);
	// 4、返回一个待执行的函数
	return function F() {
		// 5、将二次传递的参数转化为数组;
		let rest2 = Array.prototype.slice.call(arguments)
		if (this instanceof F) {
			// 6、若是用new操作符调用,则直接用new 调用原函数,并用扩展运算符传递参数
			return new _this(...rest2)
		} else {
			//7、用apply调用第一步保存的函数，并绑定this，传递合并的参数数组，即context._this(rest.concat(rest2))
			_this.apply(context, rest.concat(rest2));
		}
	}
};
```
### 实现一个JS函数柯里化
```
const curry = (fn, ...arg) => {
	let all = arg || [],
		  length = fn.length;
	return (...rest) => {
		let _args = all.slice(0); //拷贝新的all，避免改动公有的all属性，导致多次调用_args.length出错
		_args.push(...rest);
		if (_args.length < length) {
			return curry.call(this, fn, ..._args);
		} else {
			return fn.apply(this, _args);
		}
	}
}

const add = function (a, b, c) {
	// console.log(a + b + c);
	return a + b + c
}
let test = curry(add)
console.log('test1=>', test(1,2,3));
console.log('test2=>', test(1, 2)(3));
console.log('test2=>', test(1)(2)(3));

```
### 手写防抖(Debouncing)和节流(Throttling)
* 防抖函数 onscroll 结束时触发一次，延迟执行
```
function debounce(func, wait) {
  let timeout;
  return function() {
    let context = this; // 指向全局
    let args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(context, args); // context.func(args)
    }, wait);
  };
}
// 使用
window.onscroll = debounce(function() {
  console.log('debounce');
}, 1000);

```
* 节流函数 onscroll 时，每隔一段时间触发一次
```
function throttle(fn, delay) {
  let prevTime = Date.now();
  return function() {
    let curTime = Date.now();
    if (curTime - prevTime > delay) {
      fn.apply(this, arguments);
      prevTime = curTime;
    }
  };
}
// 使用
window.onscroll = throttle(function() {
  console.log('throtte');
}, 1000);

```
### 手写一个JS深拷贝
```
function clone(target, map = new WeakMap()) {
  if(typeof target === 'object'){
    let cloneTarget = Array.isArray(target) ? [] : {};
    if(map.get(target)) {
      return target;
    }
    map.set(target, cloneTarget);
    for(const key in target) {
      cloneTarget[key] = clone(target[key], map)
    }
    return cloneTarget;
  } else {
    return target;
  }
}

```
