/**
 * call、apply、bind 的区别
 */

 
const { log } = require("console");

// Function.prototype.bind1 = function (con) {
//     let thatFunc = this;
//     let args = Array.prototype.slice.call(arguments, 1);
//     return function () {
//         let bindArgs = Array.prototype.slice.call(arguments);
//         return thatFunc.apply(con, args.concat(bindArgs));
//     }
// }

Function.prototype.bind1 = function (con) {
    let thatFunc = this;
    let args = Array.prototype.slice.call(arguments, 1);

    let fNOP = function () { }
    fNOP.prototype = this.prototype;

    let fBound = function () {
        let bindArgs = Array.prototype.slice.call(arguments);
        return thatFunc.apply(this instanceof fNOP ? this : con, args.concat(bindArgs));
    }

    fBound.prototype = new fNOP();
    return fBound;
}



Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}

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

    var c = {
        name: "CherryC",
    }
    console.log("-------- bind1 ---------");
    //作用：创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
    a.fn.bind1(c, "params1", "params2")();

    console.log("-------- bind2 ---------");
    //作用：创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
    a.fn.bind1(c, "params1", "params2")();
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


/**
 * 局限性就是
 * [1,2,2,2,3,4,5,6]
 * @param {*} arr 
 * @param {*} val 
 */
let binarySearch = function (arr, val) {
    if (!arr || !val) {
        return
    }

    let left = 0;
    let right = arr.length-1;   //注意
    let mid;

    while (left <= right) {     //注意
        mid = Math.floor((left+right)/2);
        if (arr[mid] == val) {
            return mid;
        }else if (arr[mid] < val) {  
            left = mid+1;       //注意
        }else if (arr[mid] > val) {
            right = mid-1;      //注意
        }
    }

    return -1;
}

// let arr = [1,2,3,4,5,6,7,8,9,10]
let arr = [1,2,2,2,3,4,5,6]
// console.log(binarySearch(arr, 2));

function ListNode(x){
    this.val = x;
    this.next = null;
}
let listArr = []
for (let index = 0; index < 5; index++) {
    let node = new ListNode(index);
    listArr.push(node);
}
for (let index = 0; index < listArr.length; index++) {
    const element = listArr[index];
    element.next = listArr[index+1];
}
pHead = listArr[0];
function logList(pHead) {
    while (pHead) {
        log(pHead.val)
        pHead = pHead.next;
    }
}
/**
 * https://www.cnblogs.com/yorkyang/p/10876604.html
 * 判断是否为循环列表
 * 快慢指针法， 快的总能追上慢的
 * @param {*} params 
 */
function testLoopList(params) {
    let slow = head;
    let fast = head;
    //判断fast.next是否存在是为了防止fast.next.next不报空指针
    while(slow && fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if(slow === fast) return true
    }
    return false;
}

/**
 * 翻转列表
 * 反转一个节点的时候，把一个节点的后驱改为指向它前驱就可以了。
 * 这里需要注意的点就是，当你把当前节点的后驱指向前驱的时候，这个时候链表会被截断，也就是说后面的节点和当前节点分开了，所以我们需要一个变量来保存当前节点的后驱，以访丢失。
 * @param {*} params 
 */
function reverseList(head) {
    let pre = null;
    let next = null;
    logList(head)
    while (head) {
        next = head.next;
        head.next = pre;
        pre = head;
        head = next;
    }

    return pre;
}
// logList(reverseList(pHead))
/**
 * 找出环的入口点（起点） 
 * 当fast按照每次2步，slow每次一步的方式走，发现fastPtr和slowPtr重合，确定了单向链表有环路。
 * 接下来，让slowPrt回到链表的头部，然后slowPtr和fastPtr各自从自己的位置（fastPtr从两个指针相遇的位置position出发）沿着链表出发，
 * 每次步长1，那么当fastPtr和slowPtr再次相遇的时候，就是环路的入口了。
 * @param {*} params 
 */
function findEntryList(params) {
    if(!head) return null;
    let slow = head, fast = head;
    while(fast.next && fast.next.next){
        fast = fast.next.next;
        slow = slow.next;
        if(fast == slow){
            slow = head;
            while(fast != slow){
                 slow = slow.next;
                 fast = fast.next;
            }
            return slow;
        }
    }
    return null;
}

/**
 * 找出环的长度
 * 从相遇点开始slow和fast继续按照原来的方式向前走slow = slow -> next; fast = fast -> next -> next；直到二者再次项目，此时经过的步数就是环上节点的个数 。
 * fast和slow没一次操作都会使得两者之间的距离较少1。我们可以把两者相遇的时候看做两者之间的距离正好是整个环的长度r。
 * 因此，当再次相遇的时候所经过的步数正好是环上节点的数目
 * @param {*} params 
 */
function findLoopLength(params) {
    
}

/**
  *  合并有序数组
  * @param l1 ListNode类 
  * @param l2 ListNode类 
  * @return ListNode类
  * pHead 只作为赋值变量
  */
function mergeTwoLists( l1 ,  l2 ) {
    if(l1 == null && l2 != null) return l2;
    if(l1 != null && l2 == null) return l1;
    if(l1 == null && l2 == null) return null;
    let pHead = new ListNode(-1);
    let pre = pHead;
    while(l1 && l2){
        if(l1.val > l2.val){
            pHead.next = l2;
            l2 = l2.next;
        }else{
            pHead.next = l1;
            l1 = l1.next;
        }
        pHead = pHead.next;
    }
    if(l1){
        pHead.next = l1;
    }else if(l2){
        pHead.next = l2;
    }
    return pre.next;
}

/**
 *  合并两个有序数组
 * @param A int整型一维数组 
 * @param B int整型一维数组 
 * @return void
 */
function insert(arr, val){
    let insert = false
   for(let i = 0; i<arr.length; i++){
       if(val <= arr[i]){
           arr.splice(i,0,val);
           insert = true;
           break;
       }
   }
   if(!insert){
       arr.splice(arr.length,0,val);
   }
}

function merge( A, m, B, n ) {
    if(m == 0){
        A.push(...B);
    
    }else{
        for(let i = 0; i < n; i++){
            insert(A, B[i]);
        }
    }
    log(A)
}
merge([1], 1, [2], 1)

