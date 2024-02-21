function EndScreen({ points, heighestPossiblePoints, dispatch }) {
  return (
    <>
      <p className="result">
        you have scored <strong>{points}</strong> points out of{" "}
        <strong>{heighestPossiblePoints}</strong>
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </button>
    </>
  );
}

export default EndScreen;
