/**
 * 将使用多个参数的函数转化为多个使用一个参数的函数,持续返回新的函数，直到参数用完，则最后一个函数执行
 * 柯里化是一种函数转换，多元函数转换为一元函数
 * 输入：函数
 * 输出：返回一个新函数
 */
var curry = function(fn, args) {
    const len = fn.length // 代表传入函数的形参个数
    args = args || []
    return function() {
        let innerArgs = args.concat([...arguments]);
        if (args.length >= len) {
            return fn.apply(this, innerArgs);
        } else { // 到达参数个数前收集函数
            return curry.call(this, fn, innerArgs);
        }
    }
}

var curry2 = function(fn, args) {
    args = args || []
    return function() {
        let innerArgs = args.concat([...arguments]);
        if (!arguments.length) {
            return fn.apply(this, innerArgs);
        } else { // 到达参数个数前收集函数
            return curry2.call(this, fn, innerArgs);
        }
    }
}

var fn = curry(function(a, b, c) {
    console.log([a, b, c]);
});

fn("a", "b", "c") 
fn("a", "b")("c")
fn("a")("b")("c") 
fn("a")("b", "c") 

function add(a, b, c) {
    return a + b + c
}

fn = curry(add);
fn(2)(3)(4)
fn(2, 3)(4)

/**
 * 暴力实现add(1)(2)(3);
 * @param {} a 
 * @returns 
 */
function add(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        }
    }
}

/**
 * 偏函数：固定一部分参数，产生更小单元函数，即分为2次参数传递，例如bind的实现
 */

function partial(fn) {
    const args = [].slice.call(arguments, 1);
    return function () {
        const innerArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, innerArgs);
    }
}

function sum(a, b, c) {
    return a + b + c
}


var fn = partial(sum, 1);
console.log(fn(2, 3))

function sum2(...args) {
    return args.reduce((a, b) => a + b)
}

fn2 = partial(sum2, 1, 2);
console.log(fn2(3, 4, 5))