function bigNumberAdd(a, b) {
    a = '' + a;
    b = '' + b;
    let i = a.length - 1;
    let j = b.length - 1;
    let result = [];
    let addOne = false;
    while (i >= 0 || j >= 0) {
        const valI = i >= 0 ? +a[i] : 0;
        const valJ = j >= 0 ? +b[j] : 0;
        const sum = valI + valJ + (addOne ? 1 : 0);
        let val = sum % 10;
        if (sum >= 10) {
            addOne = true;
        } else {
            addOne = false;
        }
        result.unshift(val);
        i--;
        j--;
    }
    if (addOne) {
        result.unshift(1);
    }
    return result.join('');
}
bigNumberAdd(11111, 11111);