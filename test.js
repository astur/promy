const promy = require('.');

function asyncTest(ok, cb){
    setTimeout(() => ok ? cb(null, ok) : cb(new Error()), 10);
}

const promyTest = promy(asyncTest);

describe('Callback way', () => {
    it('should call callback(null, result) when wrapped function does the same', (done) => {
        promyTest(true, (err, res) => {
            err ? done('false eror is raised') : done();
        });
    });
    it('should call callback(error) when wrapped function does the same', (done) => {
        promyTest(false, (err, res) => {
            err ? done() : done('eror is not catched');
        });
    });
});

describe('Promise way', () => {
    it('should resolve Promise when wrapped function calls callback(null, result)', (done) => {
        promyTest(true)
            .then((res)=>done(), (err)=>done('false eror is raised'));
    });
    it('should reject Promise when wrapped function calls callback(error)', (done) => {
        promyTest(false)
            .then((res)=>done('eror is not catched'), (err)=>done());
    });
});