import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MyLink from "components/myLink";
import axios from "axios";
import Solutions from "features/solutions";
import useFetch from "@/hooks/useFetch";
import { basicUrl, methods } from "@/util";
import { useDispatch } from "react-redux";
import { updateTodo, remove } from "@/actions";

export default function Edit({ todoServer }) {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState(todoServer);
  const { success, data, loading, invoke } = useFetch(`${basicUrl}/api/todos/`);
  const router = useRouter();
  useEffect(() => {
    if (!todo) {
      router.push("/");
    }
  }, []);

  const handleRemoveSolution = async (ind) => {
    let newTodo = { ...todo };
    newTodo.solutions.splice(ind, 1);
    console.log(newTodo);
    setTodo(newTodo);
    dispatch(updateTodo(newTodo));
    await invoke(methods.PUT, newTodo._id, newTodo);
  };

  const handleRemoveTodo = async () => {
    dispatch(remove(todo._id));
    await invoke(methods.DELETE, todo._id);
    router.push("/");
  };

  console.log({ todo });
  let { name, solutions } = todo || {};
  return (
    <div>
      <MyLink location={"/todos"} text={"list"} />
      <h1>Edit</h1>
      <div>
        {todo && (
          <div>
            <div>{name}</div>
            {solutions.length === 0 && (
              <button className="bg-red-400" onClick={handleRemoveTodo}>
                delete todo{" "}
              </button>
            )}
            <div>
              {solutions.map((solution, ind) => {
                return (
                  <div key={ind} className="flex gap-2">
                    <div>{solution}</div>
                    <button onClick={() => handleRemoveSolution(ind)}>
                      remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  try {
    const res = await axios.get(`${basicUrl}/api/todos/${params.id}`);
    return { props: { todoServer: res.data } };
  } catch (error) {
    throw error;
  }
};
