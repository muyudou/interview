// 题目：红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promse 实现）
function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}

function light(fn, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fn();
            resolve();
        }, time);
    });
}

// promise实现
function run() {
    return Promise.resolve()
        .then(() => light(red, 3000))
        .then(() => light(yellow, 2000))
        .then(() => light(green, 1000))
        .then(() => run());
}
run();

// await实现
async function taskRun() {
    await light(red, 3000);
    await light(yellow, 2000);
    await light(green, 1000);
    await taskRun();
}
taskRun();

function count(number) {
    return new Promise((resolove, reject) => {
        setTimeout(() => {
            console.log(number);
            resolove();
        }, 1000)
    });
}

async function run2() {
    for (let i = 1; i <= 4; i++) {
        setTimeout(() => {
            console.log(i);
        }, i * 1000);
    }
}
run2();