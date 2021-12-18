function createElement(type, props, ...children){
  props = props || {};
  props.children = children;
  
  // vtype: 组件类型
  // vtype 元素的类型 1-html元素 2-function组件 3-class组件
  let vtype;
  if(typeof type === 'string'){
    // 原生标签
    vtype = 1;
  } else if(typeof type === 'function'){
    if(type.isClassComponent){
      // class组件
      vtype = 3;
    }else{
      // 函数组件
      vtype = 2;
    }
  }

  return { vtype, type, props };
}

class Component{
  // 区分组件是class还是function
  static isClassComponent = true;
  constructor(props){
    this.props = props;
    this.state = {};
  }
  setState(){}
}

export {Component};
export default {createElement}