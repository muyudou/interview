/**
 * 数组乱序
 * @param {} arr 
 * @returns 
 */
function shuffle(arr) {
    const len = arr.length;
    let count = 0;
    while (count < len) {
        const index = Math.floor(Math.random() * (len - count) + count);
        [arr[count], arr[index]] = [arr[index], arr[count]];
        count++;
    }
    return arr;
}

shuffle([1, 2, 3, 4]);

/**
 * 数组扁平化
 * 遍历当前数组，如果是数组，则递归调用，把递归返回的结果拼接在后面，否则直接push进去，返回result
 */
function flatten(arr) {
    let res = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            res = res.concat(flatten(item));
        } else {
            res.push(item);
        }
    });
    return res;
}

flatten([1, 2, [3, 4, 5, [6, 7]]])

function flatten2(arr) {
    return arr.reduce((acc, cur) => {
        if (Array.isArray(cur)) {
            acc = acc.concat(flatten2(cur));
        } else {
            acc.push(cur);
        }
        return acc;
    }, []);
}

flatten2([1, 2, [3, 4, 5, [6, 7]]])

// 借助数组的toString方法会把数组转换为逗号分隔的字符串，然后在split转化为数组
function flatten3(arr) {
    return arr.toString().split(',')
}

flatten3([1, 2, [3, 4, 5, [6, 7]]])

// 借助es6中flat，arr.flat([depth]), depth默认是1，要想展开所有，需要传入Infinity
function flatten4(arr) {
    arr.flat(Infinity);
}

/**
 * 数组去重，先排序，后使用快慢指针，i指向不重复的元素，j正常往后遍历，
 * j向后遍历直到遇到不等于i的元素，将这个元素放到i+1的位置，i++;
 * 一直如上循环，直到j遍历到最后
 */
function removeDuplicate(arr) {
    arr.sort((a, b) => a - b);
    const len = arr.length;
    let i = 0;
    for (let j = 1; i < len && j < len; j++) {
        if (arr[i] !== arr[j]) {
            arr[i+1] = arr[j];
            i++;
        }
    }
    return arr.slice(0, i + 1);
}

removeDuplicate([1, 2, 3, 4, 1, 2, 5])

// push实现：不断在最后加元素，返回最后的长度
Array.prototype.push = function () {
    for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
}

// filter
Array.prototype.filter = function(fn) {
    if (typeof fn !== 'function') {
        throw Error('error');
    }
    const res = [];
    const len = this.length;
    for (let i = 0; i < len; i++) {
        fn(this[i]) && res.push(this[i]);
    }
    return res;
}