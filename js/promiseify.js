/**
 * original是原函数，最后一个参数是回调函数，回调函数第一个参数是错误信息，有值代表执行错误，否则执行成功
 * @param {*} original 
 * @returns 返回一个函数，该函数返回promise
 */
function promisify(original) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            args.push(function cb(err, ...value) {
                if (err) {
                    reject(err);
                } else {
                    resolve(...value);
                }
            });
            original.call(this, ...args);
        });
    };
}