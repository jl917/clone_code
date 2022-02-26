const useState = (value) => {
  const getter = () => value;
  const setter = (newValue) => {
    value = newValue;
  }
  return [getter, setter];
}

const [count, setCount] = useState(0);
console.log(count())
setCount(1)
console.log(count())

const App = () => {
  return <div>123</div>
}

export default App;
