import React, { useState, useEffect } from "react";
import "./Calculator.css";
import { MdDelete } from "react-icons/md";
import { LuDelete } from "react-icons/lu";
import { FaDivide } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdClose } from "react-icons/md";


const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState([]);
  const [activeTab, setActiveTab] = useState("history"); // Active tab: 'history' or 'memory'
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Load memory values from localStorage on component mount
  useEffect(() => {
    const storedMemory = JSON.parse(localStorage.getItem("memory")) || [];
    setMemory(storedMemory);
  }, []);

  // Save memory values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("memory", JSON.stringify(memory));
  }, [memory]);

  
  const handleInput = (value) => {
    // Prevent typing operators when the input is empty or zero
    if (
      (input === "" || input === "0") &&
      ["+", "-", "*", "/"].includes(value)
    ) {
      return; // Do nothing
    }
  
    // Replace the initial 0 with the typed number if the input is only 0
    if (input === "0" && !["+", "-", "*", "/"].includes(value)) {
      setInput(value);
    } else {
      setInput(input + value);
    }
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
        setMemory([]);
        break;
      case "MR":
        if (memory.length > 0) {
          setInput(input + memory[memory.length - 1]); // Use the last stored memory value
        }
        break;
      case "M+":
        if (result !== null) {
          setMemory([...memory, result]);
        }
        break;
      case "M-":
        if (result !== null) {
          setMemory([...memory, -result]);
        }
        break;
      case "MS":
        if (result !== null) {
          setMemory([...memory, result]);
        }
        break;
      default:
        break;
    }
  };

  const handleSpecialKeys = (key) => {
    switch (key) {
      case "C":
        setInput("");
        setResult(null);
        break;
      case "CE":
        const updatedInput = input.replace(/(\d+\.?\d*)$/, "");
        setInput(updatedInput);
        break;
      case "Backspace":
        setInput(input.slice(0, -1));
        break;
      default:
        break;
    }
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const clearMemory = () => {
    setMemory([]);
  };

  console.log("input", input)


  return (
    <div className="calculator w-[400px] mx-auto mt-24 bg-black relative">
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
          <button onClick={() => handleSpecialKeys("Backspace")}><LuDelete className="mx-auto" /></button>
        </div>
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
                {op == '/' ? <FaDivide className="mx-auto" /> : op == '*' ? <RxCross2 className="mx-auto" /> : op == '-' ? <FaMinus className="mx-auto" /> : op == '+' ? <FaPlus className="mx-auto" /> : op}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hamburger Menu */}
      <button
        onClick={togglePanel}
        className="hamburger absolute top-4 left-4 text-black"
      >
        ☰
      </button>

      {/* Panel */}
     
{isPanelOpen && (
  <div className="panel absolute bottom-0 left-0 right-0 bg-gray-800 text-white max-h-64 overflow-y-auto p-4 shadow-lg">
    {/* Close Icon */}
   
      <MdClose className="ml-auto cursor-pointer" onClick={togglePanel}/>
   

    {/* Tabs */}
    <div className="tabs flex justify-between border-b border-gray-600 pb-1 mb-1">
      <button
        className={`tab p-1 !h-[34px] ${
          activeTab === "history"
            ? "text-white bg-slate-500"
            : "text-gray-400 hover:bg-slate-500"
        }`}
        onClick={() => setActiveTab("history")}
      >
        History
      </button>
      <button
        className={`tab p-1 !h-[34px] ${
          activeTab === "memory"
            ? "text-white bg-slate-500"
            : "text-gray-400 hover:bg-slate-500"
        }`}
        onClick={() => setActiveTab("memory")}
      >
        Memory
      </button>
    </div>

    {/* Tab Content */}
    {activeTab === "history" && (
      <div className="history-tab">
        <h3 className="text-lg font-bold mb-2">History</h3>
        {history.length > 0 ? (
          <ul>
            {history.map((entry, index) => (
              <li key={index} className="mb-1 flex justify-between items-center">
                {entry}
                <MdDelete
                  onClick={() =>
                    setHistory(history.filter((_, i) => i !== index))
                  }
                  className="cursor-pointer text-red-500"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No history available</p>
        )}
      </div>
    )}
    {activeTab === "memory" && (
      <div className="memory-tab">
        <h3 className="text-lg font-bold mb-2">Memory</h3>
        {memory.length > 0 ? (
          <ul>
            {memory.map((value, index) => (
              <li key={index} className="mb-1">
                {value}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No memory stored</p>
        )}
        {memory.length > 0 && (
          <MdDelete
            onClick={clearMemory}
            className="ml-auto cursor-pointer text-red-500 mt-2"
          />
        )}
      </div>
    )}
  </div>
)}

    </div>
  );
};

export default Calculator;
