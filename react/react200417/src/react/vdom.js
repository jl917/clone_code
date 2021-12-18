// vtype  1 文本  2 class组建 3 函数组建
export function createVNode(vtype, type, props) {
  const vnode = { vtype, type, props }
  return vnode
}

// vdom => dom
export function initVNode(vnode) {
  const { vtype } = vnode;
  if (!vtype) {
    // 文本节点
    return document.createTextNode(vnode)
  }
  if (vtype === 1) {
    // 原声元素
    return createElement(vnode)
  }
  if (vtype === 2) {
    // class组建
    return createClassComponent(vnode)
  }
  if (vtype === 3) {
    return createFunctionComponent(vnode)
  }
}

function createElement(vnode) {
  // 根据type 创建元素
  const { type, props } = vnode;
  const node = document.createElement(type)

  // 处理属性
  const { key, children, ...rest } = props
  Object.keys(rest).forEach(k => {
    // 处理特殊属性名 className
    if (k === 'className') {
      node.setAttribute('class', rest[k])
    }
    //处理样式
    else if(k==='style' && typeof rest[k] === 'object'){
      // 样式表
      const style = Object.keys(rest[k]).map(s => `${s}:${rest[k][s]}`).join(';');
      node.setAttribute('style', style)
    }
    else if(k.startsWith('on')){
      console.log(11)
      const event = k.toLowerCase();
      node[event] = rest[k]
    }
    //其他
    else {
      node.setAttribute(k, rest[k])
    }
  })

  // 递归子元素
  children.forEach(c => {
    if(Array.isArray(c)){
      c.forEach(n => node.appendChild(initVNode(n)))
    }else{
      node.appendChild(initVNode(c))
    }
  })
  return node;
}

function createClassComponent(vnode) {
  // type是class组建声明
  const { type, props } = vnode;
  const component = new type(props);
  const vdom = component.render()
  return initVNode(vdom)
}

function createFunctionComponent(vnode) {
  const { type, props } = vnode;
  const vdom = type(props);
  return initVNode(vdom)
}