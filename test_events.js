const EventEmitter = require('events')
let emitter = new EventEmitter();
/*按照注册的顺序同步调用所有监听器
当使用 eventEmitter.on() 方法注册监听器时，监听器会在每次触发命名事件时被调用*/

// 监听器函数可以使用 setImmediate() 或 process.nextTick() 方法
// 切换到异步操作模式
emitter.on('myEvent', () => {
  setImmediate(() => {
    console.log('这个是异步发生的');
  });
});

//使用箭头函数后this不再指向 EventEmitter 实例
emitter.on('myEvent',() => {
    console.log('hi 1',this);
});
// hi 1 {}
emitter.on('myEvent',function() {
    console.log('hi 2',this);
});

emitter.emit('myEvent');
// hi 2 EventEmitter {
//   domain: null,
//   _events: { myEvent: [ [Function], [Function] ] },
//   _eventsCount: 1,
//   _maxListeners: undefined }

/*使用 eventEmitter.once() 方法时可以注册一个对于特定事件最多被调用一次的监听
器。 当事件被触发时，监听器会被注销，然后再调用。*/
emitter.once('event1',() => {
    var m = 1;
    console.log(++m);
})
emitter.emit('event1');
emitter.emit('event1');//m = 2

emitter.on('error',(err) => {
    console.error('err')
})
emitter.emit('error', new Error('whoops'));

console.log(emitter.eventNames());
console.log(emitter.getMaxListeners()); //10  默认的监听器数量10  可用emitter.setMaxListeners(n) 设置
