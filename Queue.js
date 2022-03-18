class MyQueue {
    constructor() {
        this.param = null;
        this.queueArr = [];
    }
    register(fn) {
        this.queueArr.push(fn);
    }
    next(param) {
        this.queueArr.shift();
        this.apply(param);
    }
    apply(param) {
        this.param = param;
        this.queueArr[0].apply(this, [this.param, this.next.bind(this)]);
    }
}
class YuQueue {
    constructor() {
        this._stack=[];
    }
    register=(fn)=>this._stack.push(fn);
    apply=(arg)=>this._stack.shift()(arg,this.apply);
}

const queue = new YuQueue();
queue.register((arg, next) => {
    console.log(111);
    console.log(arg);
    next(666);
    console.log(222);
});
queue.register((arg, next) => {
    console.log(333);
    console.log(arg);
    next(777);
    console.log(444);
});
queue.register((arg, next) => {
    console.log(arg);
});
queue.apply(555)