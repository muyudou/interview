// 动态创建script标签
function addScript(src) {
    const script = document.createElement('script');
    script.url = src;
    script.type = 'text/javascript';
    document.body.appendChild(script);
}
addScript('xxx?callback=handleRes');
function handleRes(res) {
    console.log(res);
}
window.handleRes = handleRes;

// 接口返回格式
handleRes({a:1, b:1})