import React, { Component } from './kreact';
import { render } from './kreact-dom';

const users = [
  {
    name: 'dao',
    age: 20,
  },
  {
    name: 'lang',
    age: 20,
  }
]

function Compo (props) {
  return <h2>hi {props.name}</h2>
}

class Comp2 extends Component {
  render() {
    return (
      <div>
        <h2>hi {this.props.name}</h2>
      </div>
    )
  }
}

const jsx = (
  <div id="demo">
    <span style="color:red" onClick={() => console.log(123123)}>hi</span>
    <Compo name="函数组件" />
    <Comp2 name="class组件" />
    <ul>
      {
        users.map(() => <li>{users.map(u => <span>{u.name}</span>)}</li>)
      }
    </ul>
  </div>
)

console.log(jsx)

render(jsx, document.getElementById('app'))