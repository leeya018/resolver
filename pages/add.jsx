import { useState, useRef, useEffect } from "react";
import { addTodo, todosError } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Solutions from "../features/solutions";
import useFetch from "@/hooks/useFetch";
import useLocalStorage from "@/hooks/useLocalStorage";
import { basicUrl, methods } from "@/util";
import MyLink from "components/myLink";
import { useRouter } from "next/router";

const getRandWord = () => {
  const abc = ["A", "B", "C", "Y", "Z"];
  const len = Math.floor((Math.random() + 1) * 5);
  let word = "";
  for (let i = 0; i < len; i++) {
    const ind = Math.floor(Math.random() * abc.length);
    word += abc[ind];
  }
  return word;
};
export default function Add({}) {
  const [name, setName] = useState("");
  const [sol, setSol] = useState("");
  const [solutions, setSolutions] = useState([]);
  const dispatch = useDispatch();
  const [todoItem, setTodoItem] = useLocalStorage("todo");
  const router = useRouter();
  const errorDis = useSelector((state) => state.error);
  const todos = useSelector((state) => state.todos);

  const inputRef = useRef(null);
  const { invoke, success, loading, resetFetch, error } = useFetch();

  useEffect(() => {
    if (todoItem) {
      setName(todoItem.name);
      setSolutions(todoItem.solutions);
    }
  }, []);

  const addSolutionOnEnter = (e) => {
    if (e.key === "Enter") {
      addSolution();
    }
  };

  const handleClick = async () => {
    if (!name) {
      dispatch(todosError("todo cannot be empty"));
      return;
    }
    if (!solutions.length) {
      dispatch(todosError("you have to have at least one solution"));
      return;
    }
    dispatch(todosError(""));

    dispatch(addTodo({ name, solutions }));
    await invoke(methods.POST, `${basicUrl}/api/todos`, { name, solutions });
    setName("");
    setSolutions([]);
    setSol("");
    setTodoItem("");
  };

  const addSolution = () => {
    if (!sol) {
      dispatch(todosError("you have to fill a solution  "));
      return;
    }
    setSolutions((prev) => [...prev, sol]);
    setTodoItem({ name, solutions: [...solutions, sol] });
    setSol("");
    inputRef.current.focus();
    console.log("got clitk");
  };

  const updateSolution = (e) => {
    console.log(e.target.value);
    dispatch(todosError(""));

    setSol(e.target.value);
  };

  const reset = () => {
    resetFetch();
    setSol("");
  };

  const navigate = () => {
    router.push("/todos");
  };

  const checkIfNameExists = (name) => {
    return todos.filter((todo) => todo.name === name).length > 0;
  };
  return (
    <div>
      <div className="text-purple-500" onClick={navigate}>
        list
      </div>
      <div>
        <h2>status </h2>
        {loading && <div className="text-gray-500">loading...</div>}
        {success && <div className="text-green-500">done has added to db</div>}
        {error && <div className="text-red-500">{error}</div>}
        {errorDis && <div className="text-red-500">{errorDis.todos}</div>}
      </div>
      <h1>add item </h1>
      <label htmlFor="">name - </label>
      <input
        className="form-control"
        type="text"
        value={name}
        onChange={(e) => {
          reset();
          dispatch(todosError(""));
          setName(e.target.value);
          if (checkIfNameExists(e.target.value)) {
            dispatch(todosError("todo is already in the database"));
          } else {
            dispatch(todosError(""));
          }

          setTodoItem({ name: e.target.value, solutions });
        }}
      />
      <div>
        <label htmlFor="">solution - </label>
        <input
          className="form-control"
          type="text"
          ref={inputRef}
          value={sol}
          onKeyDown={addSolutionOnEnter}
          onChange={updateSolution}
          disabled={!name}
        />

        <button
          className="btn btn-primary"
          onClick={addSolution}
          // disabled={!name}
          disabled={!name || !sol}
          // className={`${!name || !sol ? "bg-gray-400" : "bg-green-400"} `}
        >
          add solution
        </button>
      </div>
      {solutions.length > 0 && (
        <button className="btn btn-success" onClick={handleClick}>
          add todo
        </button>
      )}
      <Solutions solutions={solutions} />
    </div>
  );
}
