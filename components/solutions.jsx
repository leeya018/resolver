export default function Solutions({ solutions }) {
  return (
    <div>
      <h1>all the solutions: </h1>
      <ul>
        {solutions.map((sol) => (
          <li>{sol}</li>
        ))}
      </ul>
    </div>
  );
}
