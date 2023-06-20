var obj = {
    name: 'xxx',
    func: function() {
        console.log(this.name);
    }
}

obj.func() // xxx
new obj.func() // undefined


var myObject = {
    foo: 'bar',
    func: function() {
        var self = this;
        console.log(this.foo);
        console.log(self.foo);
        // 自执行函数是由windows调用的，所以this指向windows
        (function() {
            console.log(this.foo);
            console.log(self.foo);
        }())
    }
}

myObject.func();

window.number = 2;
var obj = {
    number: 3,
    db1: (function() {
        console.log(this);
        this.number *= 4;
        return function() {
            console.log(this);
            this.number *= 5;
        }
    })()
}
var db1 = obj.db1;
db1();
obj.db1();
console.log(obj.number);
console.log(window.number);

var x = 3;
var y = 4;
var obj = {
    x: 1,
    y: 6,
    getX: function() {
        var x = 5;
        return function() {
            return this.x;
        }
    },
    getY: function() {
        var y = 7;
        return this.y;
    }
}

console.log(obj.getX())
console.log(obj.getY())

var a = 10;
var obt = {
    a: 20,
    fn: function() {
        var a = 30;
        console.log(this.a);
    }
}
obt.fn();
obt.fn.call();
(obt.fn)() // 这里和第一种顺序一样，所以也是20

function a(xx) {
    this.x = xx;
    return this;
}
var x = a(5); // undefined ????
var y = a(6);

console.log(x.x);
console.log(y.x)

function foo(something) {
    this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a);

var baz = new bar(3);
console.log(obj1.a);
console.log(baz.a);


showName()
var showName = function() {
    console.log(2)
}
showName();
function showName() {
    console.log(1)
}
showName();


showName()
function showName() {
    console.log(1)
}
showName();
var showName = function() {
    console.log(2)
}
showName();

console.log(foo);

function foo(){
    console.log("foo");
}

var foo = 1;
foo()


function a() {
    var temp = 10;
    function b() {
        console.log(temp);
    }
    b();
}
a()

function a() {
    var temp = 10;
    b();
}
function b() {
    console.log(temp);
}
a();


function foo() {
    console.log(a); // 报错
    a = 1; // 全局变量不会有变量提升
}

foo(); // ???

function bar() {
    a = 1;
    console.log(a);
}
bar(); // ???


function fun(n, o) {
    console.log(o);
    return {
        fun: function(m) {
            return fun(m, n);
        }
    }
}
var a = fun(0); a.fun(1); a.fun(2); a.fun(3);;

var b = fun(0).fun(1).fun(2).fun(3);

var c = fun(0).fun(1);  c.fun(2); c.fun(3)


var F = function() {};
Object.prototype.a = function () {console.log('a')};
Function.prototype.b = function () {console.log('b')};

var f = new F();
f.a();
f.b();
// F.__proto__ === Function.prototype
// Function.prototype.__proto__ === Object.prototype
// F既是Function的实例，也是Object的实例
F.a();
F.b();

function Parent() {
    this.a = 1;
    this.b = [1, 2, this.a];
    this.c = { demo: 5};
    this.show = function () {
        console.log(this.a, this.b, this.c.demo);
    }
}

function Child() {
    this.a = 2;
    this.change = function() {
        this.b.push(this.a);
        this.a = this.b.length;
        this.c.demo = this.a++;
    }
}

Child.prototype = new Parent();
var parent = new Parent();
var child1 = new Child();
var child2 = new Child();
child1.a = 11;
child2.a = 12;
parent.show();
child1.show();
child2.show();
child1.change();
child2.change();
parent.show();
child1.show();
child2.show();