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

(function(){
    // y没有var是全局变量，var定义后是局部变量
    var x = y = 1;
})();
var z;


var friendName = 'World';
(function() {
    if (typeof friendName === 'undefined') {
        // 这里会变量提升
        var friendName = 'Jack';
        console.log('Goodbye ' + friendName);
    } else {
        console.log('Hello ' + friendName);
    }
})();

function fn1() {
    console.log('fn1');
}
var fn2;
fn1();
fn2();
fn2 = function() {
    console.log('fn2');
}
fn2();

function a() {
    var temp = 10
    function b() {
        console.log(temp)
    }
    b();
}
a();

function a() {
    var temp = 10;
    b();
}
function b() {
    console.log(temp);
}
a();