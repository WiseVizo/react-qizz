function NextQsButton({ dispatch, answer }) {
  if (answer === null) return null;

  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQs" })}>
      Next
    </button>
  );
}

export default NextQsButton;
