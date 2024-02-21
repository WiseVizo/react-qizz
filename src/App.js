// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextQsButton from "./NextQsButton";
import ProgressBar from "./ProgressBar";
import EndScreen from "./EndScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  status: "Loading", //* possible status: Loading, Ready, Error, Active, Finished
  index: 0, //* for identifying the current qs
  answer: null, //* for identifying the correct answer, possible value type: int
  points: 0,
  time: 150, //* in secs
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "Ready" };
    case "dataFailed":
      return { ...state, status: "Error" };
    case "Active":
      return { ...state, status: "Active" };
    case "selectAnswer":
      const qs = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === qs.correctOption
            ? state.points + qs.points
            : state.points,
      };
    case "nextQs":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return { ...state, status: "finished" };
    case "reset":
      return { ...initialState, status: "Ready", questions: state.questions };
    case "tick":
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [{ questions, status, index, answer, points, time }, dispatch] =
    useReducer(reducer, initialState);
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
  const heighestPossiblePoints = questions.reduce(
    (points, currQs) => points + currQs.points,
    0
  );
  function handleQizzStart() {
    dispatch({ type: "Active" });
  }
  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" && (
          <StartScreen numQs={numQs} handleQizzStart={handleQizzStart} />
        )}
        {status === "Active" && (
          <>
            <ProgressBar
              index={index}
              numQs={numQs}
              points={points}
              heighestPossiblePoints={heighestPossiblePoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer time={time} dispatch={dispatch} />
              <NextQsButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQs={numQs}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <EndScreen
            points={points}
            heighestPossiblePoints={heighestPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
