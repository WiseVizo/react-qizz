function EndScreen({ points, heighestPossiblePoints }) {
  return (
    <p className="result">
      you have scored <strong>{points}</strong> points out of{" "}
      <strong>{heighestPossiblePoints}</strong>
    </p>
  );
}

export default EndScreen;
