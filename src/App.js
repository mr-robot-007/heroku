import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let [oldExpression, setOldExpression] = useState("");
  let [expression, setExpression] = useState("0");
  let [prev, setPrev] = useState("ANSx`");
  let numerics = new Set("0123456789");

  let operators = new Set("+-*/.");

  let buttons = [
    "(",
    ")",
    "%",
    "AC",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  let putNumerics = function (value) {
    if (prev === "ANS") {
      setOldExpression("Ans = " + expression);
    }
    if (expression === "0" || prev === "ANS") {
      setExpression(value);
    } else {
      setExpression(expression + value);
    }
    setPrev("NUM");
  };
  let putOperators = function (value) {
    if (prev === "OP") {
      setExpression(expression.slice(0, -1) + value);
    } else {
      setExpression(expression + value);
    }
    setPrev("OP");
  };
  let putDelete = function (value) {
    setExpression("0");
    setOldExpression("Ans = " + expression);
  };

  let EvaluateAns = function () {
    let myans = eval(expression);
    setPrev("ANS");
    setOldExpression(expression + " = ");
    setExpression(myans);
    console.log(myans);
  };

  let handleKey = function (event) {
    console.log(event.key);
    if (numerics.has(event.key)) {
      putNumerics(event.key);
    } else if (operators.has(event.key)) {
      putOperators(event.key);
    } else if (event.key == "Enter") {
      EvaluateAns();
    }
  };
  return (
    <div className="App" tabIndex={0} onKeyUp={handleKey}>
      <h1
        style={{
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        Mera Sasta Calculator
      </h1>
      <div
        style={{
          width: "400px",
          background: "#ffffff",
          display: "flex",
          height :"80px",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "20px",
          borderRadius: "10px",
          overflow: "hidden",
          margin: "10px",
        }}
      >
        <h4>{oldExpression}</h4>
        <h1>{expression}</h1>
      </div>
      <div
        style={{
          width: "400px",
          background: "#ffffff",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "20px",
          margin: "20px",
          borderRadius: "10px",
          flexWrap: "wrap",
        }}
      >
        {buttons.map(function (buttonValue, idx) {
          return (
            <button
              style={{
                width: "90px",
                height: "20px",
                margin: "5px",
                borderRadius : "4px",
                justifyContent: "center",
              }}
              onClick={function () {
                if (buttonValue === "AC") {
                  putDelete();
                } else if (numerics.has(buttonValue)) {
                  putNumerics(buttonValue);
                } else if (operators.has(buttonValue)) {
                  putOperators(buttonValue);
                } else if (buttonValue === "=") {
                  EvaluateAns();
                }
              }}
            >
              {buttonValue}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
