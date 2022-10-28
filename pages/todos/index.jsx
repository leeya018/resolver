import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todo from "@/features/todo";
import Filter from "@/features/filter";
import { basicUrl, methods } from "@/util";
import useFetch from "@/hooks/useFetch";
import { initData } from "@/actions";
import MyLink from "components/myLink";
import Link from "next/link";

export default function Index() {
  const todos = useSelector((state) => state.todos);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();
  const { success, data, loading, invoke } = useFetch();
  const [displayList, setDisplayList] = useState(false);
  useEffect(() => {
    invoke(methods.GET, `${basicUrl}/api/todos`);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(initData(data));
    }
  }, [data]);

  return (
    <div className="flex justify-center text-lg">
      {/* <div className="text-green-500 ">hdenhersnt</div>
      <div className="text-yellow-500 ">hdenhersnt</div>
      <div className="text-orange-300 bg-blue-500 ">hdenhersnt</div>
      <div className="text-purple-800 ">hdenhersnt</div>
      <div className="text-green-500 ">hdenhersnt</div> */}
      <div className="w-[50vh] mt-20 ">
        <MyLink location={"/add"} text={"add"} />
        {loading && (
          <div className="text-gray-500 flex justify-center">loading...</div>
        )}
        {success && (
          <div className="text-green-500 flex justify-center">
            finish to load
          </div>
        )}
        <Filter />
        <h1>Resolver </h1>
        <div className="text-red-400 flex justify-center">{error.todos}</div>

        <div>
          <button onClick={() => setDisplayList((prev) => !prev)}>
            {displayList ? "hide" : "show"}
          </button>
          <div>
            {displayList &&
              todos &&
              todos.map((todo, key) => (
                <Todo key={key} todo={todo} dispatch={dispatch} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
