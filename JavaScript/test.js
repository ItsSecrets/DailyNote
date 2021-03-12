/**
 * call、apply、bind 的区别
 */

let testCallApplyBind = function () {
    var name = "windowsName";
    var a = {
        name: "Cherry",
        fn : function (params1, params2) {
            console.log(`${this.name}  ${params1}  ${params2}`);      // undefined
        }
    }
    var b = {
        name: "CherryB",
    }
    console.log("-------- bind ---------");
    //作用：创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
    a.fn.bind(b, "params1", "params2")();

    console.log("-------- call ---------");
    //作用：可以指定函数内部this的指向，传入多个参数，然后再调用该函数。
    a.fn.call(b, "params1", "params2");

    console.log("-------- apply ---------");
    // apply() 方法调用一个函数, 其具有一个指定的this值，以及作为一个数组（或类似数组的对象）提供的参数
    a.fn.apply(b, ["params12", "params22"]);
}
// testCallApplyBind()

/**
 * == 、===与object.is的区别
 * es5比较两个值是否相等：相等运算符（==）和严格相等运算符（===）。
 *   缺点:
 *    ==:自动转换数据类型，
 *   ===: NaN不等于自身，以及+0等于-0。
 *   es6新的方法Object.is来比较两个值严格相等，它与严格比较运算符（===）基本一致，不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
 */
let testCompare = function () {
    console.log(`"" == false: `, "" == false);
    console.log(`Object.is('xixi','xixi'): `, Object.is('xixi','xixi'));
    console.log(`Object.is({}, {}): `, Object.is({}, {}));
    console.log(`+0 === -0: `, +0 === -0);
    console.log(`NaN === NaN: `, NaN === NaN);
    console.log(`Object.is(+0, -0): `, Object.is(+0, -0));
    console.log(`Object.is(NaN, NaN): `, Object.is(NaN, NaN));
}

// testCompare();

/**
 * Promise
 */
let testPromise = function () {
    // let p1 =Promise.resolve(123);
    let p1 =Promise.resolve({name:'xixi',age:'xxxx'});

    p1.then(result => {
        console.log(result);
    });
}

// testPromise()

/**
 * async/await
 */
let testAwaitAsync = function () {
    function sleep(wait) {
        return new Promise((res,rej) => {
            console.log(`cur wait t: ${wait}`);
            setTimeout(() => {
                res(wait);
            },wait);
        });
    }
    async function demo() {
        let result01 = await sleep(100);
        //上一个await执行之后才会执行下一句
        let result02 = await sleep(result01 + 100);
        let result03 = await sleep(result02 + 100);
        // console.log(result03);
        return result03;
    }
    demo().then(result => {
        console.log(`result: ${result}`);
    });
}
// testAwaitAsync()

/**
 * 原型、原型链
 */
let testPrototype = function () {
    function Person() {
    }
    var person = new Person();
    console.log(`Person.__proto__ == Function.prototype: ${Person.__proto__ == Function.prototype}`) // true
    console.log(`Function.prototype.__proto__ == Object.prototype: ${Function.prototype.__proto__ == Object.prototype}`) // true
    console.log(`person.__proto__ == Person.prototype: ${person.__proto__ == Person.prototype}`) // true
    console.log(`Person.prototype.constructor == Person: ${Person.prototype.constructor == Person}`) // true
    // 顺便学习一个ES5的方法,可以获得对象的原型
    console.log(`Object.getPrototypeOf(person) === Person.prototype: ${Object.getPrototypeOf(person) === Person.prototype}`) // true
    console.log(`Person.prototype.__proto__ === Object.prototype: ${Person.prototype.__proto__ === Object.prototype}`) // true
    console.log(`Object.prototype.__proto__ === null: ${Object.prototype.__proto__ === null}`) // true
}
// testPrototype()

/**
 * 事件循环
 */
let  testEventLoop = function () {
    //请写出输出内容
    async function async1() {
        console.log('async1 start');
        await async2();
        console.log('async1 end');
    }
    async function async2() {
        console.log('async2');
    }

    console.log('script start');

    setTimeout(function() {
        console.log('setTimeout');
    }, 0)

    async1();

    new Promise(function(resolve) {
        console.log('promise1');
        resolve();
    }).then(function() {
        console.log('promise2');
    });
    console.log('script end');
}

// testEventLoop()

let tests上下文 = function () {

    function foo() {
        console.log(a);
        var a = 1;
    }
    foo(); // undefined  var 会变量提升

    function foo1() {
        console.log(a);
        a = 1;
    }
    // foo1(); // ReferenceError: a is not defined

    function bar() {
        a = 1;
        console.log(a);
    }
    bar();  // 1

    console.log(foo2); //[Function: foo2]  var foo2 = 1的变量提升不起作用，函数变量提升优先
    foo2();   // foo2
    function foo2() {
        console.log("foo2");
    }
    var foo2 = 1
}

// tests上下文();