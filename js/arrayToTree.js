const getChildren = (array, pid) => {
    const children = array.filter(item => item.pid === pid);
    return children;
};

function arrayToTree(array, pid) {
    const nodes = array.filter(item => item.pid === pid);
    for (let i = 0; i < nodes.length; i++) {
        const item = nodes[i];
        item.children = arrayToTree(array, item.id);
    }
    return nodes;
}

function arrayToTree2(array) {
    let result = [];
    if (!Array.isArray(array)) {
        return result;
    }
    const map = {};
    array.forEach(item => map[item.id] = item);

    array.forEach(item => {
        const parent = map[item.pid];
        if (parent) {
            if (!parent.children) {
                parent.children = [item];
            } else {
                parent.children.push(item)
            }
        } else {
            result.push(item);
        }
    })
    return result;
}
var arr = [
    { 'id': '29', 'pid': '0', 'name': '总裁办' },
    { 'id': '2c', 'pid': '0', 'name': '财务部' },
    { 'id': '2d', 'pid': '2c', 'name': '财务核算部' },
    { 'id': '2f', 'pid': '2c', 'name': '薪资管理部' },
    { 'id': 'd2', 'pid': '0', 'name': '技术部' },
    { 'id': 'd3', 'pid': 'd2', 'name': 'Java研发部' }
  ]

arrayToTree(arr, '0');
arrayToTree2(arr);