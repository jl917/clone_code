/**
 * _deps: 记录useEffect上一次的依赖
 * callback 接收函数
 * depArray 监听数据参数
 */
let _deps;
export function useEffect(callback, depArray) {
  // 空值时每次刷新都更新
  const hasNoDeps = !depArray

  // 数据变化时每次都更新
  const hasChangeDeps = _deps
    ? !depArray.every((e, i) => e === _deps[i]) // 全部相同返回 false
    : true

  if (hasNoDeps || hasChangeDeps) {
    _deps = depArray
    callback()
  }
}