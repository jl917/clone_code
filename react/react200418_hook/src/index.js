import React from 'react'
import ReactDOM from 'react-dom'
import {useState,useEffect} from './hooks'

const App = () => {
  console.log(123)
  const [count,setCount] = useState(0,render);
  const [age,setAge] = useState(0,render);

  // useEffect(() => {
  //   console.log(111)
  // },[])
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count+1)}>+++</button>

      <h1>{age}</h1>
      <button onClick={() => setAge(age+1)}>+++</button>
    </div>
  )
}

function render(){
  ReactDOM.render(
    <App />, 
    document.getElementById('app')
  )
}
render()