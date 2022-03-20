/**
 * 我们可以通过一个对象来描述dom结构
 * 今天的任务是将虚拟dom转化为真实dom
 */

 const virtualDom = {
    type: "div",
    attribute: {
      style: {
        backgroundColor: "red",
        color: "blue",
      },
      class: "root",
      id: "root",
      //可能还会有其他属性
    },
    content: "我是一个div标签", //如果是单闭合标签则值为null
    children: [
      {
        type: "p",
        attribute: {
          style: {
            marginTop: "20px",
            color: "skyblue",
          },
          class: "children",
          id: "root-children",
          //可能还会有其他属性
        },
        content: "我是一个p标签", //如果是单闭合标签则值为null
        children: [],
      },
      {
        type: "span",
        attribute: {
          style: {
            backgroundColor: "red",
            color: "blue",
          },
          class: "children",
          id: "root-children",
          //可能还会有其他属性
        },
        content: "我是一个span标签", //如果是单闭合标签则值为null
        children: [
          /*这里可能还有的 简单的说这里可能有无限个children 而且children中可能还有children需要递归 */
        ],
      },
    ], //这个元素的子元素
  };
  
  //上面是一个虚拟dom 请书写一个函数将这个虚拟dom渲染成为真实dom
//   function render(virtualDom) {
//     //your code
//     let elm=document.createElement(virtualDom.type);
//     Object.keys(virtualDom.attribute).forEach(atb=>{
//         if(virtualDom.attribute[atb].__proto__==Object.prototype){
//             Object.keys(virtualDom.attribute[atb]).forEach(value=>{
//                 elm.style[value]=virtualDom.attribute[atb][value];
//             })
//         }else{
//             elm.setAttribute(atb,virtualDom.attribute[atb]);
//         }
//     })
//     elm.innerHTML=virtualDom.content;
//     virtualDom.children.forEach(child=>{
//             elm.appendChild(render(child))
//     })
//     return elm;

//   }
//  document.querySelector('body').appendChild(render(virtualDom)) 




//上面是一个虚拟dom 请书写一个函数将这个虚拟dom渲染成为真实dom
function render(virtualDom, dom) {
  //your code
  const {
    type,
    attributes,
    content,
    children = []
  } = virtualDom;
  const tag = createElement(type, attributes, content);
  //如果dom不存在则不是第一次渲染
  if (!dom) {
    //第一次渲染添加到body当中
    document.body.append(tag);
  } else {
    dom.append(tag);
  }
  children.forEach((child) => render(child, tag));
}

//创建单个标签
function createElement(type, attributes, content) {
  const tag = document.createElement(type);
  setAttributes(tag, attributes);
  setContent(tag, content);
  return tag;
}

//设置内容
function setContent(dom, content) {
  return Reflect.set(dom, "innerText", content);
}

//工具函数utils
function forEach(obj, fn) {
  if (checkType(obj) !== "object")
    createError("forEach required first argument should be [Object]");
  Object.keys(obj).forEach((key) => {
    fn.call(obj, key, obj[key]);
  });
}

//工具函数utils
function createError(data) {
  return new Error(data);
}

//工具函数检查类型
function checkType(value) {
  const types = {
    "[object Object]": "object",
    "[object Array]": "array",
    "[object Null]": "null",
    "[object Undefined]": "undefined",
    "[object Function]": "function",
    "[object Number]": "number",
    "[object Boolean]": "boolean",
  };
  return types[Object.prototype.toString.call(value)];
}

//设置多个属性
function setAttributes(dom, attributes) {
  forEach(attributes, (key, value) => {
    if (key === "style") return setStyles(dom, value);
    setAttribute(dom, key, value);
  });
  return true;
}

//设置单个属性
function setAttribute(dom, key, value) {
  dom.setAttribute(key, value);
}

//设置样式属性
function setStyle(dom, key, value) {
  return Reflect.set(dom.style, key, value);
}

//设置多个样式
function setStyles(dom, styleObj) {
  return forEach(styleObj, (key, value) => setStyle(dom, key, value));
}

//调用render函数
render(virtualDom);
