function ProgressBar({ index, numQs, points, heighestPossiblePoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQs} value={index + Number(answer !== null)} />
      <p>
        Question<strong>{index + 1}</strong>/<strong>{numQs}</strong>
      </p>
      <p>
        Points<strong>{points}</strong>/
        <strong>{heighestPossiblePoints}</strong>
      </p>
    </header>
  );
}

export default ProgressBar;
