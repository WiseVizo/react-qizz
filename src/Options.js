function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            index === question.correctOption && answer !== null
              ? "correct"
              : "wrong"
          }`}
          key={option}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "selectAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
