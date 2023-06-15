/**
 * 构造一个数组，0-30，如果删除元素，则置为0，记录剩余孩子个数，如果剩余1个了就返回。
 * @param {*} sum 
 * @param {*} delNum 
 * @returns 
 */
function childCount(sum, delNum) {
    let count = 0;
    let arr = new Array(sum).fill(1);
    let leftNum = sum;
    while (leftNum > 0) {
        console.log(leftNum, arr);
        for (let i = 0; i < sum; i++) {
            if (arr[i]) {
                count++;
                if (leftNum === 1) {
                    return i+1;
                }
                if (count === delNum) {
                    arr[i] = 0;
                    count = 0;
                    leftNum--;
                }
            } 
        }
    }
}
childCount(30, 3);