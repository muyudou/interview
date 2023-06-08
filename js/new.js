/**
 * 参数：第一个是构造函数，其余为参数
 * 1. 创建一个空对象
 * 2. 赋值原型对象：对象的__proto__指向构造函数
 * 3. 赋值实例属性：执行构造函数，以新建对象作为context
 * 4. 如果函数执行返回的是引用类型，则直接返回这个对象，否则返回新创建的对象
 */

function myNew() {
    // 取出第一个参数，就是构造函数
    const constructor = Array.prototype.shift.call(arguments);
    if (typeof constructor !== 'function') {
        throw new Error('not function');
    }
    const o = new Object;
    // 原型指向构造函数原型
    o.__proto__ = constructor.prototype;
    // 改变构造函数的this，使它指向新创建的对象，o可以访问到构造函数的属性。apply参数是数组,call是一个一个的
    const res = constructor.apply(o, arguments);
    return typeof res === 'object' ? res : o;
}
