/**
 * 取出x的then函数，如果是函数，则执行，否则直接resolve；
 * 执行时再次递归解析promise2，y
 * @param {*} promise2 
 * @param {*} x 
 * @param {*} resolve 
 * @param {*} reject 
 * @returns 
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('Error'));
    }
    let called;
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            const then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) {
                        return;
                    }
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, err => {
                    if (called) {
                        return;
                    }
                    called = true;
                    reject(err);
                })
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) {
                return;
            }
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

/**
 * 1. 包含状态值、value、reason、完成队列函数、拒绝队列函数
 * 2. resolve的操作：更新状态为fulfilled，调用成功函数队列
 * 3. reject的操作：更新状态为reject，调用失败队列
 * 4. then
 *      1. 值透传
 *      2. 返回一个新创建的promise，内部判断状态，如果是pending，则push进去，resolve则执行fulfilled队列，reject则执行reject队列
 *      3. 具体的执行函数，执行onFulfilled函数，判断它的返回值和promise2的关系，进入resolvePromise的流程
 */
class MyPromise2 {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'reject';
    constructor(executor) {
        this.status = MyPromise2.PENDING;
        this.resolveQueue = [];
        this.rejectQueue = [];
        this.value = null;
        this.reason = null;
        if (typeof executor !== 'function') {
            throw new TypeError('Promise xx');
        }
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch(err) {
            this.reject();
        }
    }
    resolve(value) {
        if (this.status !== MyPromise2.PENDING) {
            return;
        }
        this.value = value;
        this.status = MyPromise2.FULFILLED;
        this.resolveQueue.forEach(item => {
            item(this.value);
        });
    }
    reject(reason) {
        if (this.status !== MyPromise2.PENDING) {
            return;
        }
        this.reason = reason;
        this.status = MyPromise2.REJECTED;
        this.rejectQueue.forEach(item => {
            item(this.reason);
        });
    }
    // 如果pending，则push进去，否则执行
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

        const promise2 = new MyPromise2((resolve, reject) => {
            if (this.status === MyPromise2.PENDING) {
                this.resolveQueue.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    });
                });
                this.rejectQueue.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    });
                });
            } else if (this.status === MyPromise2.FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                });
            } else if (this.status === MyPromise2.REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                });
            }
        });
        return promise2;
    }
}

// 执行测试用例需要用到的代码
MyPromise2.deferred = function() {
    let defer = {};
    defer.promise = new MyPromise2((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
  }

const promise = new MyPromise2((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');
    },1000);
}).then(
    (data) => {
        console.log('success', data)
    },
    (err) => {
        console.log('faild', err)
    }
)

  
  module.exports = MyPromise2;