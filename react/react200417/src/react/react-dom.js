import { initVNode } from './vdom'
// vnode => dom
// dom => container
function render(vnode, container) {
  // 虚拟DOM转换真实DOM
  const node = initVNode(vnode)
  console.log(vnode)
  // 渲染到页面
  container.appendChild(node)
}
export default { render }