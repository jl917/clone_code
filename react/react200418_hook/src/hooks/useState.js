/**
 * state: 把state存储在外面
 * initialValue 默认值
 * render 渲染
 */
let state;
export function useState(initialValue, render) {
  
  // 如果没有 _state，说明是第一次执行，把 initialValue 复制给它
  state = initialValue | state

  function setState(newState){
    state = newState
    render()
  }
  return [state,setState]
}