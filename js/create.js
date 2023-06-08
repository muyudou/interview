/**
 * 手写Object.create: Object的静态方法，以一个现有对象作为原型，创建新的对象
 * 输入参数：一个对象
 * 1. 
 * 输出：新的对象
 * Object.create(null): 创建一个空对象，并且没有继承Object.prototype
 * 参考文章：https://zhuanlan.zhihu.com/p/559527875
 */
function create(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
}
