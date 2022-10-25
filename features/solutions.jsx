export default function Solutions({ solutions }) {
  return (
    <div>
      <h3 className="font-bold text-xl">solutions: </h3>
      <ul>
        {solutions.map((sol, key) => (
          <li key={key}>{sol}</li>
        ))}
      </ul>
    </div>
  );
}
