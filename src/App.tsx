import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { decrement, increment, reset } from "./redux/slices/counter";
import Calculator from "./components/Calculator/Calculator";

function App() {
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <div className="App">
      <Calculator />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Count is {count}</h1>
        <div>
          <div>
            <button onClick={() => dispatch(increment())}>Increment</button>
          </div>
          <div>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
          </div>
          <div>
            <button onClick={() => dispatch(reset())}>Reset</button>
          </div>
        </div>
      </header> */}
    </div>
  );
}

export default App;
