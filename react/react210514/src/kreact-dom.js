import { initVNode } from './kvdom'

// vnode => dom
function render (vnode, container) {
  // console.log(vnode)
  const node = initVNode(vnode)
  container.append(node);
  // container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`
}

export { render }