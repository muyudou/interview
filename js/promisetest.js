const { endianness } = require("os");
const { start } = require("repl");

Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log)


Promise.resolve('1')
    .finally(() => {
        console.log('finally1');
        throw new Error('我是finally中抛出的异常')
    })
    .then(res => console.log('finally后面的then函数', res))
    .catch(err => console.log('捕获错误', err))


/**
 * 
 * 1. Promise.race: 返回第一个成功或者失败的promise的值，但其他的promise也会继续执行完
 * 2. all/race如果有抛出异常的任务，则最先抛出的错误会被then的第二个参数或者catch捕获，但是其他的异步请求还会继续执行完，只是不会捕获。
*/
function runAsync(x) {
    const p = new Promise(r => setTimeout(() => {r(x),console.log(x)}, 1000))
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
    .then(res => console.log('result:', res))
    .catch(err => console.log(err));

// 这里注意async2也会执行，阻塞的事await后面代码，await后面的语句相当于new Promise里的内容，await后面的相当于promise.then里的
async function async1() {
    console.log("async1 start");
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2');
}
async1();
console.log('start');


