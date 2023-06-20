function run(gen) {
    const g = gen();
    function next(data) {
        const result = g.next(data);
        if (result.done) {
            return;
        }
        result.value.then(function(data) {
            next(data);
        });
    }
    next();
}

function* foo() {
    yield 'a';
    yield 'b';
}

function* bar() {
    yield 'x'
    yield* foo()
    yield 'y'
}

for (let v of bar()) {
    console.log(v);
}

function run(gen) {
    g = gen();
    function next(res) {
        const res = g.next();
        if (res.done) {
            return;
        }
        if (typeof res.value.then === 'function') {
            res.value.then(data => next(data));
        } else {
            res.value(function(data) {
                next(data);
            })
        }
        
    }
    next();
}

function isPromise(obj) {
    return typeof obj.then === 'function';
}

function toPromise(obj) {
    if (isPromise(obj)) {
        return obj;
    }
    if (typeof obj === 'function') {
        return promisify(fn);
    }
    return obj;
}

function promisify(fn) {
    return new Promise((resolve, reject) => {
        fn(function(err, res) {
            if (err) {
                return reject(err);
            }
            resolve(res);
        })
    });
}

/**
 * 返回一个promise，捕获next执行时的错误，reject，如果done则resolve
 * 将res.value转化为promise，统一用then管理流程
 * @param {*} gen 
 * @returns 
 */
function run2(gen) {
    g = gen();
    return new Promise((resolve, reject) => {
        function next(res) {
            let res;
            try {
                res = g.next();
            } catch (err) {
                reject(err);
            }
            if (res.done) {
                resolve(res.value);
            }
            const value = toPromise(res.value);
            value.then(res => {
                next(res);
            }, err => {
                reject(err);
            });
        }
        next();
    });
}
