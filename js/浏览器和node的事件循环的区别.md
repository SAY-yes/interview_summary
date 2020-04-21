node11及以后和浏览器一样，是执行完一个宏任务就会去清空微任务队列；
node11以前，则是将同级的宏任务队列执行完毕后再去清空微任务队列。
例如：1
```
console.log(1);

setTimeout(() => {
    console.log(2)
    new Promise((resolve) => {
        console.log(6);
        resolve(7);
    }).then((num) => {
        console.log(num);
    })
});

setTimeout(() => {
    console.log(3);
       new Promise((resolve) => {
        console.log(9);
        resolve(10);
    }).then((num) => {
        console.log(num);
    })
    setTimeout(()=>{
    	console.log(8);
    })
})

new Promise((resolve) => {
    console.log(4);
    resolve(5)
}).then((num) => {
    console.log(num);
    new Promise((resolve)=>{
    	console.log(11);
    	resolve(12);
    }).then((num)=>{
    	console.log(num);
    })
})
```

> node11以前的结果：
1 -> 4 -> 5 -> 11 -> 12 -> 2 -> 6 -> 3 -> 9 -> 7 -> 10 -> 8
node11及浏览器的结果：
1 -> 4 -> 5 -> 11 -> 12 -> 2 -> 6 -> 7 -> 3 -> 9 -> 10 -> 8

例如：2
```
function sleep(time) {    
	let startTime = new Date();    
	while (new Date() - startTime < time) {}    
	console.log('<--Next Loop-->');
}

setTimeout(() => {    
	console.log('timeout1');
    setTimeout(() => {        
    	console.log('timeout3');
        sleep(1000);
    });    
    new Promise((resolve) => {        
    	console.log('timeout1_promise');
        resolve();
    }).then(() => {        
    	console.log('timeout1_then');
    });
    sleep(1000);
});
     
setTimeout(() => {    
	console.log('timeout2');
    setTimeout(() => {        
    	console.log('timeout4');
        sleep(1000);
    });    
    new Promise((resolve) => {        
    	console.log('timeout2_promise');
        resolve();
    }).then(() => {       
    	console.log('timeout2_then');
    });
    sleep(1000);
});
```

> node11以前的结果：
timeout1
timeout1_promise
<--Next Loop-->
timeout2
timeout2_promise
<--Next Loop-->
timeout1_then
timeout2_then
timeout3
<--Next Loop-->
timeout4
<--Next Loop-->

> node11及浏览器的结果：
timeout1
timeout1_promise
<--Next Loop-->
timeout1_then
timeout2
timeout2_promise
<--Next Loop-->
timeout2_then
timeout3
<--Next Loop-->
timeout4
<--Next Loop-->