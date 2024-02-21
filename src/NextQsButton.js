function NextQsButton({ dispatch, answer, numQs, index }) {
  if (answer === null) return null;
  if (index < numQs - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQs" })}
      >
        Next
      </button>
    );
  }
  if (index === numQs - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
  }
}

export default NextQsButton;
