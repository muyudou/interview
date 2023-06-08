function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left);
    const rightProto = right.prototype;
    while (proto) {
        if (proto === rightProto) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}