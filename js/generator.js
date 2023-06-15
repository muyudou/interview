function run(gen) {
    const g = gen();
    function next(data) {
        const result = g.next(data);
        if (result.done) {
            return;
        }
        result.value.then(function(data) {
            next(data);
        });
    }
    next();
}