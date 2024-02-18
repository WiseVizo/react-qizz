function StartScreen({ numQs }) {
  return (
    <div className="start">
      <h2>Welcome to the React Qizz!</h2>
      <h3>{numQs} questions to test your React mastery</h3>
      <button className="btn btn-ui">Let's start</button>
    </div>
  );
}

export default StartScreen;
