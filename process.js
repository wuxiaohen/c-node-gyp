//process  执行doSomething的时候不会等somethingComplicated执行完成才返回，
//而是会立刻调用callback
function somethingComplicated() {
	setTimeout(function () {
		console.log('doing');
	}, 1000);
}

function doSomething(callback) {
	somethingComplicated();
	process.nextTick(callback);
}

console.log('before doing');

doSomething(function () {
	console.log('done');
});
//before doing
//done
//doing


//Node.js 中执行 js 代码的过程是单线程的. 只有当前代码都执行完, 
//才会切入事件循环, 然后从事件队列中 pop 出下一个回调函数开始执
//行代码. 所以实现一个 sleep 函数, 只要通过一个死循环就可以阻塞整个 js 的执行流程.
function sleep(ms) {
  var start = Date.now(), expire = start + ms;
  while (Date.now() < expire) ;
  return;
}; sleep(2000);