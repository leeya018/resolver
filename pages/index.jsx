import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Todo from "../components/todo";
import Filter from "../components/filter";
import { basicUrl } from "@/util";
import useFetch from "@/hooks/useFetch";
import { initData } from "../actions";
export default function Index() {
  const todos = useSelector((state) => state.todos);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();
  const {
    success,
    data,
    loading,
    fetch: fetchTodos,
  } = useFetch(`${basicUrl}/api/todos`);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(initData(data));
    }
  }, [data]);

  return (
    <div>
      <Link href="/add">add</Link>
      {loading && <div className="text-gray-500">loading...</div>}
      {success && <div className="text-green-500">finish to load</div>}
      <Filter />
      <h1>todo list </h1>
      <div className="text-red-400">{error.todos}</div>

      <div>
        {todos &&
          todos.map((todo, key) => (
            <Todo key={key} todo={todo} dispatch={dispatch} />
          ))}
      </div>
    </div>
  );
}
