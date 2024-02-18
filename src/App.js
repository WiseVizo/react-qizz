// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  status: "Loading", // possible status: Loading, Ready, Error, Active, Finished
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "Ready" };
    case "dataFailed":
      return { ...state, status: "Error" };
    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    async function getQsData() {
      try {
        const res = await fetch("http://localhost:8000/questions");

        if (res.ok === true) {
          // console.log(res);
          const data = await res.json();
          dispatch({ type: "dataRecieved", payload: data });
          // console.log(data);
        }
      } catch (err) {
        dispatch({ type: "dataFailed" });
        console.error(err);
      }
    }
    getQsData();
  }, []);
  const numQs = questions.length;
  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" && <StartScreen numQs={numQs} />}
      </Main>
    </div>
  );
}

export default App;
