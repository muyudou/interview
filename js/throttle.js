/**
 * 持续触发事件，每隔一段时间，只执行一次事件。
 * leading: 首次是否执行，trailing: 结束后是否再执行一次。
 * 两种主流的实现方式，一种是使用时间戳，一种是设置定时器。
 * 应用场景：
 * 1. 页面滚动，监听页面滑动到底部
 */
// 时间戳方式：会立即执行一次，没有触发后不执行
function throttle(func, wait) {
    let last = 0;
    return function () {
        const now = +new Date(); // 转时间戳
        if (now - last > wait) {
            func.apply(this, arguments);
            last = now;
        }
    }
}

// 定时器：刚开始不执行，wait后执行一次，最后事件停止触发wait后还会触发一次
function throttle(func, wait) {
    let timer;
    return function () {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            func.apply(this, arguments);
            timer = null;
        }, wait);
    }
}

// 想开头触发，也想结束触发
function throttle(func, wait) {
    let last = 0;
    let timer;
    return function () {
        const now = +new Date();
        // 下次触发剩余的时间
        const remain = wait - (now - last);
        // 前面都使用计时方式
        if (remain <= 0) {
            console.log('1')
            last = now;
            if (timer) {
                clearTimeout(timer);
                timer = null
            }
            return func.apply(this, arguments);
        } else if (!timer) { // 最后一次使用timer
            console.log('2')
            timer = setTimeout(() => {
                func.apply(this, arguments);
                last = +new Date(); // 更新执行时间
                timer = null;
            }, remain);
        }
    };
}

// options带2个参数
// leading：false 表示禁用第一次执行
// trailing: false 表示禁用停止触发的回调
function throttle(func, wait, options) {
    let last = 0;
    let timer;
    return function () {
        const now = +new Date();
        // 禁用第一次执行
        if (!last && !options.leading) {
            last = now;
        }
        // 下次触发剩余的时间
        const remain = wait - (now - last);
        // 前面都使用计时方式
        if (remain <= 0) {
            last = now;
            if (timer) {
                clearTimeout(timer);
                timer = null
            }
            return func.apply(this, arguments);
        } else if (!timer && !options.trailing) { // 最后一次使用timer
            timer = setTimeout(() => {
                func.apply(this, arguments);
                last = +new Date();
                timer = null;
            }, remain);
        }
    };
}

var testThrottle = throttle(() => console.log('throttle scroll'), 1000);
window.onscroll = testThrottle