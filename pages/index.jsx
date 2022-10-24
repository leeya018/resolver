import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Todo from "../components/todo";
import Filter from "../components/filter";

export default function Index() {
  const todos = useSelector((state) => state.todos);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  return (
    <div>
      <Link href="/add">add</Link>
      <Filter />
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
