/**
 * generator: yield返回值总是undefined，但是可以用 next(参数) 给 上一次 yield 返回的值赋值
 */
function* B() {
    yield 'c'
    yield 'd'
}
function* A() {
    yield 'a'
    yield 'b'
    yield* B()
    yield* B()
    yield 'e'
}
for(let n of A()) {
    console.log(n)
}
console.log('============================')

function * foo() {
    let o=0
    yield o++
    var a = yield o++
    console.log('a ==',a)
    yield ++a
}
var fo = foo()
console.log(fo.next()) //{ value: 0, done: false }
console.log(fo.next()) //{ value: 1, done: false }
console.log(fo.next(5)) //{ value: 6, done: false }
console.log('============================')

/**
 * generator -- 异步编程
 * 一： 状态机
 * 二：ajax请求
 * 三：与promise对比
 */
var ticking = true
var clock = function() {
    if(ticking) {
        console.log('Tick!')
    }else {
        console.log('Tock!')
    }
    ticking = !ticking
}
console.log(clock())
console.log(clock())
console.log(clock())
var clock1 = function* (){
    while(true) {
        console.log('Tick!')
        yield
        console.log('Tock!')
        yield
    }
}
var clo = clock1()
clo.next()
clo.next()
clo.next()
console.log('============================')

function request(url) { //jquery
    $.get(url ,function(response){
        it.next(response)
    })
}
function* ajaxs() {
    console.log(yield request('a.html'))
    console.log(yield request('c.html'))
    console.log(yield request('d.html'))
}
var it = ajaxs()
// it.next()  //jquery语法不支持，因为没有引入jquery
console.log('============================')

function getHTMLByPromise() { //promise形式
    new Promise(function(resolve) { //jquery
        $.get('a.html',function(dataa) {
            console.log(dataa);
            resolve();
        });
    }).then(function(resolve) {
        return new Promise(function(resolve) { //jquery
            $.get('b.html',function(datab) {
                console.log(datab);
                resolve();
            });
        });
    }).then(function(resolve) {
        $.get('c.html',function(datac) { //jquery
            console.log(datac);
        });
    });
}

function getHTMLByGenerator () {
    function request(url) {
        $.get(url, function(response){
          it.next(response);
        });
    }
      
    function sleep(time) {
        setTimeout(function() {
          console.log('I\'m awake.');
          it.next();
        }, time);
    }
      
    function* ajaxs(ur) {
        console.log(yield request(ur));
        yield sleep(3000);
        console.log(yield request('b.html'));
        yield sleep(3000);
        console.log(yield request('c.html'));
    }
    var it = ajaxs('a.html');
    it.next();
}
