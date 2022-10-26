import Solutions from "./solutions";
import { remove, toggle } from "../actions";
import useFetch from "@/hooks/useFetch";
import { basicUrl, methods } from "@/util";
export default function Todo({ todo, dispatch }) {
  const { success, loading, error, invoke } = useFetch();
  const removeTodo = async (id) => {
    await invoke(methods.DELETE, `${basicUrl}/api/todos/${id}`);
    dispatch(remove(id));
  };
  return (
    <div>
      {loading && <div className="text-gray-500">loading...</div>}
      {success && (
        <div className="text-green-500">data has removed from db</div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      <div
        className={`${
          todo.done ? "text-green-700 text-bold font-bold" : "text-black"
        } `}
        key={todo.id}
      >
        {todo.name}
      </div>
      <Solutions solutions={todo.solutions} />

      <button onClick={() => dispatch(toggle(todo._id))}>toggle </button>
      <button onClick={() => removeTodo(todo._id)}>remove </button>
    </div>
  );
}
