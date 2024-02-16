import { useReducer, useState } from "react";

function reducer(state, action) {
  console.log(state, action);
  if (action.type === "incriment")
    return { ...state, count: state.count + state.step };
  if (action.type === "decriment")
    return { ...state, count: state.count - state.step };
  if (action.type === "keyboardInput") {
    if (!action.payload) return { ...state };
    return { ...state, count: action.payload };
  }
  if (action.type === "reset") return { ...state, count: 0, step: 1 };
  if (action.type === "stepInput") return { ...state, step: action.payload };
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date(); //"june 21 2027"
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({ type: "decriment", payload: -1 });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "incriment" });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "keyboardInput", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "stepInput", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    dispatch({ type: "reset" });
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
