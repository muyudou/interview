class MyPromise {
    static PENDING = 'pending';
    static RESOLVED = 'resolved';
    static REJECTED = 'rejected';

    constructor(executor) {
        this.status = MyPromise.PENDING;
        this.value = null; // resolve的值
        this.reason = null; // reject的值
        this.resolvedQueue = [];
        this.rejectedQueue = [];

        const resolve = value => {
            this.value = value;
            this.status = MyPromise.RESOLVED;
            this.resolvedQueue && this.resolvedQueue.forEach(item => item(this.value));
        }

        const reject = reason => {
            this.reason = reason;
            this.status = MyPromise.REJECTED;
            this.rejectedQueue && this.rejectedQueue.forEach(item => item(this.reason));
        }
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
    then(onFulFilled, onRejected) {
        const promise2 =  new Promise((resolve, reject) => {
            onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : value => value;
            onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
            if (this.status === MyPromise.RESOLVED) {
                onFulFilled(this.value); 
                this.resolvePromise(promise2, this.value, resolve, reject);
            }

            if (this.status === MyPromise.REJECTED) {
                onRejected(this.reason);
                this.resolvePromise(promise2, this.reason, resolve, reject);
            }

            if (this.status === MyPromise.PENDING) {
                this.resolvedQueue.push((data) => {
                    const res = onFulFilled(data);
                    this.resolvePromise(promise2, this.value, resolve, reject);
                });
                this.rejectedQueue.push((data) => {
                    const err = onRejected(data);
                    this.resolvePromise(promise2, this.reason, resolve, reject);
                });
            }
        });
        return promise2;
    }

    resolvePromise(promise2, x, resolve, reject) {
        if (x instanceof MyPromise) {
            if (x.status === MyPromise.PENDING) {
                x.then(y => {
                    return this.resolvePromise(promise2, y, resolve, reject);
                }, err => reject(err))
            } else {
                x.then(resolve, reject);
            }
        } else {
            resolve(x);
        }
    }
}

const p1 = new MyPromise((resolved, rejected) => {
    resolved('resolved');  
  });
  
  p1.then((res) => {
    console.log(res);
    return 'then1';
  })
  .then((res) => {
    console.log(res);
    return 'then2';
  })
  .then((res) => {
    console.log(res);
    return 'then3';
  })
