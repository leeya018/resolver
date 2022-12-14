import { useState, useEffect, useRef } from "react";
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
  const inputRef = useRef(null);

  const [todo, setTodo] = useState(todoServer);
  const [solution, setSolution] = useState("");
  const { error, success, data, loading, invoke } = useFetch();
  const router = useRouter();
  useEffect(() => {
    if (!todo) {
      router.push("/");
    }
  }, []);
  const addSolutionOnEnter = (e) => {
    if (e.key === "Enter") {
      handleAddSolution();
    }
  };

  const handleRemoveSolution = async (ind) => {
    let newTodo = { ...todo };
    newTodo.solutions.splice(ind, 1);
    console.log(newTodo);
    setTodo(newTodo);
    dispatch(updateTodo(newTodo));
    await invoke(methods.PUT, `${basicUrl}/api/todos/${newTodo._id}`, newTodo);
  };

  const handleRemoveTodo = async () => {
    dispatch(remove(todo._id));
    await invoke(methods.DELETE, `${basicUrl}/api/todos/${todo._id}`);
    router.push("/");
  };

  const handleAddSolution = async () => {
    console.log("handleAddSolution");
    let newTodo = { ...todo, solutions: [...todo.solutions, solution] };
    setSolution("");
    setTodo(newTodo);
    dispatch(updateTodo(newTodo));
    await invoke(methods.PUT, newTodo._id, newTodo);
    inputRef.current.focus();
  };

  const navigate = () => {
    router.push("/todos");
  };
  console.log({ todo });
  let { name, solutions } = todo || {};
  return (
    <div>
      <div className="text-purple-500" onClick={navigate}>
        list
      </div>
      <h1>Edit</h1>
      <div>
        {todo && (
          <div>
            <div>{name}</div>
            <div>
              <input
                className="form-control"
                type="text"
                placeholder="add solution"
                ref={inputRef}
                onKeyDown={addSolutionOnEnter}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
              />

              <button
                className="btn btn-primary"
                disabled={!name || !solution}
                onClick={handleAddSolution}
                // className={solution && "bg-green-500"}
              >
                add solution
              </button>
            </div>

            <div>
              {solutions.map((solution, ind) => {
                return (
                  <div key={ind} className="flex gap-2">
                    <p className="flex flex-center items-center ">{solution}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveSolution(ind)}
                    >
                      remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {error && <div className="text-red-400">{erro}</div>}
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
