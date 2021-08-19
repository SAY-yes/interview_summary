// const {EventEmitter} = require('events')

class EventEmitter {
  constructor(){
    this.handles = {}
  }
  on(eventName,callback){
    if (!this.handles[eventName]){
      this.handles[eventName] = [];
    }
    this.handles[eventName].push(callback)
  }
  emit(eventName,...args){
    if (this.handles[eventName]){
      this.handles[eventName].forEach(cb => {
        cb(...args)
      });
    }
  }
}

const event = new EventEmitter()

event.on('start',(...res)=>{
  console.log('start事件触发：',res);
})
event.emit('start',1,3)
event.emit('start', 2,4)
