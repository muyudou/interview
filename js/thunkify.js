function thunkify(fn) {
    return function() {
        var args = new Array(arguments.length);
        var ctx = this;

        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
        }

        return function(done) {
            var called;
            args.push(function() {
                if (called) {
                    return;
                }
                called = true;
                done.apply(null, arguments);
            });

            try {
                fn.apply(ctx, args);
            } catch (err) {
                done(err);
            }
        }
    }
}

function run(fn) {
    var gen = fn();

    function next(err, data) {
        var result = gen.next(data);
        if (result.done) {
            return;
        }
        result.value(next);
    }
    next();
}