import Solutions from "../components/solutions";
import { remove, toggle } from "../actions";

export default function Todo({ todo, dispatch }) {
  return (
    <div>
      <div
        className={`${
          todo.done ? "text-green-700 text-bold font-bold" : "text-black"
        } `}
        key={todo.id}
      >
        {todo.name}
      </div>
      <Solutions solutions={todo.solutions} />

      <button onClick={() => dispatch(toggle(todo.id))}>toggle </button>
      <button onClick={() => dispatch(remove(todo.id))}>remove </button>
    </div>
  );
}
