// 函数柯里化
function curry(func) {
    let args = [];
    return function () {
        args = args.concat([...arguments])
        if (args.length >= func.length) {
            let res = func.apply(this, args)
            args = []; //我认为这里每一次达到调用目的后要重置内置参数数组，这样才能同时实现下面三个clg
            return res;
        } else {
            return arguments.callee;
        }
    }

}

function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = curry(sum);

console.log((curriedSum(1, 2, 3))); // 6，仍然可以被正常调用
console.log(curriedSum(1)(2, 3)); // 6，对第一个参数的柯里化
console.log(curriedSum(1)(2)(3)); // 6，全柯里化

// 节流和防抖
// 节流
function throttle(func, delay) {
    let time = null;
    let firstTime = true;
    return function () {
        if (firstTime) {
            func.apply(this, arguments)
            firstTime = false;
        }
        if (time) {
            return;
        }
        time = setTimeout(() => {
            func.apply(this, arguments);
            time = null;
        }, delay)
    }
}
let inp = document.querySelector('input');

function output() {
    let value = inp.value;
    console.log(value);
}
inp.addEventListener('keyup', throttle(output, 1000));
// 防抖
function debounce(func, delay) {
    let time = null;
    let firstTime = true;
    return function () {
        if (firstTime) {
            func.apply(this, arguments)
            firstTime = false;
        }
        if (time) {
            clearTimeout(time);
        }
        time = setTimeout(() => {
            func.apply(this, arguments);
            time = null;
        }, delay)
    }
}
inp.addEventListener('keyup', debounce(output, 1000));
//AOP
function func() {
    console.log(2);
}

//实现func.before()以及func.after()

func.before = function (fn) {
    fn();
    this();
    return this;
}
func.after = function (fn) {
    return function(){
        fn();
    }
}
func = func.before((a = 1) => {
    console.log(a)
}).after((b=3) => {
    console.log(b);
})
func();
// 没理解切片化意义何在???????

// 手写Array.prototype.map
Array.prototype.mymap=function(fn){
    let arr=[];
    let _this=this;
    for(let i=0;i<this.length;i++){
        arr.push(fn(_this[i],i))
    }
    return arr;
}
function fn(item,index){
    return item*index;
}
let arr=[1,2,3];
console.log(arr.mymap(fn));
