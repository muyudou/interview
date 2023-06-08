var number = 1;
var string = '';
var boolean = true;
var und = undefined;
var nu = null;
var sym = Symbol('a');
var obj = {a: 1};
var array = [1, 2, 3];
var date = new Date();
var error = new Error();
var reg = /a/g;
var func = function a() {};

function checkType() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(Object.prototype.toString.call(arguments[i]));
    }
}
checkType(number, string, boolean, und, nu, sym, obj, array, date, error, reg, func);

function getToStringType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
/**
 * object、function用toString，其余用typeof
 * @param {} obj 
 */
function type(obj) {
    return typeof obj === 'object' || typeof obj === 'function' ?
        getToStringType(obj) || 'object' : typeof obj;
}

// 判断函数
function isFunction(obj) {
    return type(obj) === 'function';
}

function isArray(obj) {
    return type(obj) === 'array'
}