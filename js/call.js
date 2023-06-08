Function.prototype.call2 = function(context) {
    if (typeof this !== 'function') {
        throw new Error('type error');
    }
    context = context || window;
    const args = [...arguments].slice(1);
    context.fn = this;
    const res = context.fn(...args);
    delete context.fn;
    return res;
}

// 如果不使用es6方法
Function.prototype.call2 = function(context) {
    if (typeof this !== 'function') {
        throw new Error('type error');
    }
    context = context || window;
    let args = [];
    // 结果是['arguments[1]', 'arguments[2]']
    for (let i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']');
    }
    context.fn = this;
    // args自动调用toString转换为'arguments[1],arguments[2]'
    const res = eval('context.fn('+ args + ')');
    delete context.fn;
    return res;
}

Function.prototype.apply2 = function(context) {
    if (typeof this !== 'function') {
        throw new Error('type error');
    }
    context = context || window;
    context.fn = this;
    // 取第二个参数解构传进去
    const res = context.fn(...arguments[1]);
    delete context.fn;
    return res;
}

// 不使用es6版本
Function.prototype.apply2 = function(context) {
    context = context || window;
    context.fn = this;
    let result;
    if (arguments.length === 1) {
        result = context.fn();
    } else {
        resilt = eval('context.fn(' + arguments[1] + ')');
    }
    delete context.fn;
    return result;
}