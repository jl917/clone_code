import React, {Component} from './react/react'
import ReactDOM from './react/react-dom'

class Com2 extends Component{
  render(){
    return <div>class Component</div>
  }
}

const Com3 = (props) => <div {...props}>State Less Component</div>

const App  = (
  <div s="1" b="2">
    <h1 a="1" style={{color:'red'}}>React</h1>
    <span>normal</span>
    <Com2 name="class" />
    <Com3 onClick={() => console.log(111)} name="function" />
    <ul>
      {
        ['dao','lang'].map(e => <li key={e}>{e}</li>)
      }
    </ul>
  </div>
)

ReactDOM.render(
  App, 
  document.getElementById('app')
)