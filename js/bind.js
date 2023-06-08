/**
 * 返回一个新的函数
 * 函数参数接收bind的函数和调用的函数，bind函数拼接调用函数构成最后参数
 * 如果bind后的函数通过new来调用，则忽略bind绑定的context，使用原来构造函数上下文
 */
Function.prototype.bind2 = function(context) {
    const outArgs = [...arguments].slice(1);
    const func = this;
    function fBound() {
        const inArgs = [...arguments];
        return func.apply(this instanceof F ? this : context, outArgs.concat(inArgs));
    }
    function F() {}
    F.prototype = this.prototype;
    fBound.prototype = new F();
    return fBound;
}