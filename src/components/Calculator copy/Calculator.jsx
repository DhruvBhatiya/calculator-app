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
      case "MC": // Memory Clear
        setMemory(0);
        break;
      case "MR": // Memory Recall
        setInput(input + memory);
        break;
      case "M+": // Memory Add
        setMemory(memory + (result || 0));
        break;
      case "M-": // Memory Subtract
        setMemory(memory - (result || 0));
        break;
      case "MS": // Memory Store
        if (result !== null) {
          setMemory(result);
        } else {
          alert("No result to store in memory");
        }
        break;
      default:
        break;
    }
  };

  const handleSpecialKeys = (key) => {
    switch (key) {
      case "C": // Clear All
        setInput("");
        setResult(null);
        break;
      case "CE": // Clear End (Last Numeric Input)
        const updatedInput = input.replace(/(\d+\.?\d*)$/, "");
        setInput(updatedInput);
        break;
      case "Backspace": // Remove Last Character
        setInput(input.slice(0, -1));
        break;
      default:
        break;
    }
  };

  return (
    <div className="calculator w-[400px] mx-auto mt-24 bg-black">
      <div className="display">
        <div className="input">{input || "0"}</div>
        <div className="result">{result !== null ? `= ${result}` : ""}</div>
      </div>
      <div className="buttons11">
        <div className="memory-buttons grid grid-cols-5">
          <button onClick={() => handleMemory("MC")}>MC</button>
          <button onClick={() => handleMemory("MR")}>MR</button>
          <button onClick={() => handleMemory("M+")}>M+</button>
          <button onClick={() => handleMemory("M-")}>M-</button>
          <button onClick={() => handleMemory("MS")}>MS</button>
        </div>
        <div className="special-buttons grid grid-cols-3">
          <button onClick={() => handleSpecialKeys("CE")}>CE</button>
          <button onClick={() => handleSpecialKeys("C")}>C</button>
          <button onClick={() => handleSpecialKeys("Backspace")}>
            &#8592;
          </button>
        </div>

        {/* Numbers */}
        <div className="grid col-start-1 grid-cols-6">
          <div className="col-start-1 col-end-6">
            <div className="number-buttons grid grid-cols-3 justify-center">
              {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
                <button key={num} onClick={() => handleInput(num.toString())}>
                  {num}
                </button>
              ))}
              <button onClick={() => handleInput(".")}>.</button>
              <button onClick={calculateResult}>=</button>
            </div>
          </div>

          <div className="operation-buttons flex flex-col">
            {["/", "*", "-", "+"].map((op) => (
              <button key={op} onClick={() => handleInput(op)}>
                {op}
              </button>
            ))}
          </div>
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
