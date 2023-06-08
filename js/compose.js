// 初级版
var compose = function(f, g) {
    return function(x) {
        return f(g(x));
    }
}

// 遍历版本
var compose = function(...args) {
    let start = args.length - 1;
    return function () {
        let i = start;
        while (i >= 0) {
            let result = args[i].apply(this, arguments)
            return result;
        }
    }
}

// 传入一系列函数，从右向左执行，前一个函数的结果是下一个函数的参数，返回最后的结果
var compose = function(...fns) {
    return function (...args) {
        const first = fns.pop();
        const firstResult = first.apply(this, args);
        return fns.reduceRight((result, next) => next.call(this, result), firstResult)
    };
}

var trim = (str) => String.prototype.trim.call(str)
var limit = (str) => String.prototype.substr.call(str,0,11)
var numberic = (str) => String(str).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")

var format = compose(numberic,limit,trim)

console.log(format(10000)) // 10,000
console.log(format(123000000)) // 123,000,000
console.log(format(' 123456789000000 ')) // 12,345,678,900

function middleware(...funcs) {
    return funcs.reverse().reduce((result, next) => arg => Promise.resolve(next.call(this, arg, result)), Promise.resolve(() => {}))
}

function middleware(...funcs) {
    return funcs.reverse().reduce((result, next) => {
        return async (arg) => {
            await next.call(this, arg, result)
        }
    }, async () => {})
}

function middleware(...funcs) {
    return (input) => {
        let result = arg => arg;
        for (let next of funcs.reverse()) {
            result = ((next, result) => async (arg) => await next(arg, result))(next, result)
            result = (function(next, result) {
                return async function(arg) {
                    await next(arg, result);
                }
            })(next, result);
        }
        return result(input);
    }
}