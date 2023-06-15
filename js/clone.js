function shallowCopy(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = obj[key];
        }
    }
    return result;
}


// 要处理循环引用
function deepCopy(obj) {
    const map = new Map();
    const clone = (obj) => {
        if (!obj || typeof obj !== 'object') {
            return;
        }
        if (map.has(obj)) {
            return map.get(obj);
        }
        let result = Array.isArray(obj) ? [] : {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const val = obj[key];
                if (typeof val === 'object') {
                    result[key] = deepCopy(val);
                } else {
                    result[key] = obj[key];
                }
            }
        }
        map.set(obj, result);
        return result;
    }
    return clone(obj);
}

var obj1 = {a: obj1, b:2, c: [1, 2], d: {a: 1, b: 1}};
deepCopy(obj1);


a = {a:1, b:2, c: [1, 2], d: {a: 1, b: 1}}
shallowCopy(a)
deepCopy(a);

function myAssign(target, ...source) {
    if (target === null) {
        throw new TypeError('not null or undefined');
    }
    source.forEach(obj => {
        if (!obj) {
            return;       
        }
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
                target[key] = obj[key];
            }
        }
    });
    return target;
}

/**
 * 1. target为空，直接返回
 * 2. source 为空要跳过,source中的属性为undefined要跳过
 * 3. 如果是深拷贝，要判断类型递归
 * 4. 注意循环引用，如果val等于了target，则出现了循环引用，跳过参数
 * @param {*} deep 
 * @param {*} target 
 * @param  {...any} source 
 */
function extend(target, ...source) {
    if (typeof target !== 'object') {
        return;
    }
    source.forEach(obj => {
        if (!obj) {
            return;
        }
        for (let key in obj) {
            const sourceVal = obj[key];
            if (sourceVal === undefined) {
                return;
            }
            if (typeof sourceVal !== 'object') {
                target[key] = sourceVal;
            } else {
                // 循环引用：好使吗？
                if (sourceVal === target[key]) {
                    continue;
                }
                target[key] = Array.isArray(sourceVal) ? [] : {};
                target[key] = extend(target[key], sourceVal);
            }
        }
    });
    return target;
}

var obj1 = {}
var obj2 = {a: obj1};
obj1.a = obj2;


var obj1 = {
    a: 1,
    b: { b1: 1, b2: 2 }
};

var obj2 = {
    b: { b1: 3, b3: 4 },
    c: 3
};

var obj3 = {
    d: 4
}

extend(true, obj1, obj2, obj3);
console.log(obj1);