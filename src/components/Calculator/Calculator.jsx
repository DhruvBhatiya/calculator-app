import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(0);

  const handleInput = (value) => {
    setInput(input + value);
  };

  const calculateResult = () => {
    try {
      const res = eval(input); // Avoid eval in production; use a math library instead
      setResult(res);
      setHistory([...history, `${input} = ${res}`]);
      setInput("");
    } catch (error) {
      alert("Invalid calculation");
    }
  };

  const handleMemory = (operation) => {
    switch (operation) {
      case "MC":
        setMemory(0);
        break;
      case "MR":
        setInput(input + memory);
        break;
      case "M+":
        setMemory(memory + (result || 0));
        break;
      case "M-":
        setMemory(memory - (result || 0));
        break;
      default:
        break;
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input || "0"}</div>
        <div className="result">{result !== null ? `= ${result}` : ""}</div>
      </div>
      <div className="buttons">
        <div className="memory-buttons">
          <button onClick={() => handleMemory("MC")}>MC</button>
          <button onClick={() => handleMemory("MR")}>MR</button>
          <button onClick={() => handleMemory("M+")}>M+</button>
          <button onClick={() => handleMemory("M-")}>M-</button>
        </div>
        <div className="number-buttons">
          {[...Array(10).keys()].map((num) => (
            <button key={num} onClick={() => handleInput(num.toString())}>
              {num}
            </button>
          ))}
          <button onClick={() => handleInput(".")}>.</button>
        </div>
        <div className="operation-buttons">
          {["+", "-", "*", "/"].map((op) => (
            <button key={op} onClick={() => handleInput(op)}>
              {op}
            </button>
          ))}
          <button onClick={() => setInput("")}>C</button>
          <button onClick={calculateResult}>=</button>
        </div>
      </div>
      <div className="history">
        <h3>History</h3>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
