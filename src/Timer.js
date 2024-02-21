import { useEffect } from "react";

function Timer({ time, dispatch }) {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return <div className="timer">{time} sec left</div>;
}

export default Timer;
