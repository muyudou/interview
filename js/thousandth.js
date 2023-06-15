function thousands(num) {
    let start = 0;
    num = '' + num;
    for (let i = 0; i < num.length; i++) {
        if (num[i] === '.') {
            break;
        }
        start++;
    }
    let result = [];
    let count = 0;
    for (let i = start - 1; i >= 0; i--) {
        count++;
        result.unshift(num[i]);
        if (count % 3 === 0 && i > 0) {
            count = 0;
            result.unshift(',');
        }
    }
    for (let i = start; i < num.length; i++) {
        result.push(num[i]);
    }
    return result.join('')
}

thousands(12345678)
thousands(123456789)
thousands(123456789.123)