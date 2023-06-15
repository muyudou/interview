/**
 * 并发发起请求，顺序获取结果
 * @param {*} urls 
 */
async function logInOrder(urls) {
    const textPromises = urls.map(async item => {
        const res = await fetch(url);
        return res.text();
    });
    for (let textPromise of textPromises) {
        console.log(await textPromise);
    }
}