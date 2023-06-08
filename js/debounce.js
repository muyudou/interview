/**
 * 一段时间内连续触发事件，在最后一次触发事件后wait事件后再触发事件
 * immediate：立即触发，wait之内不能再触发，wait之后才能再次触发
 * 应用场景：
 * 1. 按钮防重
 * 2. 搜索框sug，最后输入完再请求
 * 3. input输入框，输入完再校验格式
 */
function debounce(func, wait, immediate) {
    let timer;
    let result;
    var debounced = function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, arguments);
        }, wait);
        return result;
    };
    return debounced;
}

function debounce(func, wait, immediate) {
    let timer;
    let result;
    var debounced = function () {
        if (timer) {
            clearTimeout(timer);
        }
        if (immediate) {
            if (!timer) {
                result = func.apply(this, arguments)
            }
            // timer赋值，这段时间内触发不会再次触发，wait后可以再次触发
            timer = setTimeout(function(){
                timer = null;
            }, wait)
        } else {
            timer = setTimeout(() => {
                func.apply(this, arguments);
            }, wait);
        }
        return result;
    };
    // 取消防抖，这样再次点击就可以直接执行
    debounced.cancel = function() {
        clearTimeout(timer);
        timer = null
    }
    return debounced;
}

var testDebounce = debounce(() => console.log('scroll'), 1000);
window.onscroll = testDebounce