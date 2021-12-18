// type 标签
// props 属性
// children 子元素
// vtype  1 文本  2 class组建 3 函数组建

function createElement(type, props, ...children) {
  props = props ? props : {}
  props.children = children
  let vtype
  if(typeof type === 'string'){
    vtype = 1;
  }else{
    vtype = type.isClassComponent ? 2 : 3
  }
  
  return { vtype,type, props }
}
export default { createElement, Component }

export class Component{
  static isClassComponent = true;
  constructor(props){
    this.props = props;
    this.state = {}
  }
  setState(){}
} 