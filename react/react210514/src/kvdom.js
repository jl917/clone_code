// diff
// vdom => real dom
export function initVNode (vnode) {
  const { vtype } = vnode;
  if (!vtype) {
    // textNode
    return document.createTextNode(vnode);
  }
  if(vtype === 1){
    // 原生元素
    return createElement(vnode);
  }
  if(vtype === 2){
    // 函数组件
    return createFunctionComponent(vnode);
  }
  if(vtype === 3){
    // class 组件
    return createClassComponent(vnode);
  }
}

function createElement(vnode){
  const {type, props} = vnode;
  const node = document.createElement(type);
  // 处理属性
  const {key, children, ...rest} = props;
  Object.keys(rest).forEach(k => {
    // 处理特别属性名 className, htmlFor
    if( k === 'className'){
      node.setAttribute('class', rest[k])
    }else if (k === 'htmlFor'){
      node.setAttribute('for', rest[k])
    }else if (k === 'style' && typeof rest[k] === 'object'){
      // fontSize 没解决
      const style = Object.keys(rest[k])
        .map(s => `${s}:${rest[k][s]}`)
        .join(';')
      node.setAttribute('style', style)
    }else if (k.startsWith('on')){
      const event = k.toLowerCase();
      node[event] = rest[k];
    }
    else{
      node.setAttribute(k, rest[k])
    }
  })
  children.forEach(c => {
    if(Array.isArray(c)){
      c.forEach(n => node.appendChild(initVNode(n)))
    }else{
      node.appendChild(initVNode(c));
    }
  })
  return node;
}

function createClassComponent(vnode){
  // type is class
  const {type, props} = vnode;
  const component = new type(props);
  const vdom = component.render();
  return initVNode(vdom);
}

function createFunctionComponent(vnode){
  // type is function
  const {type, props} = vnode;
  const vdom = type(props);
  return initVNode(vdom);
}
