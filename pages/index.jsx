import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { remove, toggle } from "../actions";

export default function Index() {
  const todos = useSelector((state) => state.todos);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  return (
    <div>
      <Link href="/add">add</Link>
      <h1>todo list </h1>
      <div className="text-red-400">{error.todos}</div>

      <div>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}

const Todo = ({ todo, dispatch }) => {
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
      <button onClick={() => dispatch(toggle(todo.id))}>toggle </button>
      <button onClick={() => dispatch(remove(todo.id))}>remove </button>
    </div>
  );
};
