import { useState, useRef, useEffect } from "react";
import { addTodo, todosError } from "../actions";
import { useDispatch } from "react-redux";
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
    dispatch(addTodo({ name, solutions }));
    await invoke(methods.POST, `${basicUrl}/api/todos`, { name, solutions });
    setName("");
    setSolutions([]);
    setSol("");
    setTodoItem("");
  };

  const addSolution = () => {
    setSolutions((prev) => [...prev, sol]);
    setTodoItem({ name, solutions: [...solutions, sol] });
    setSol("");
    inputRef.current.focus();
    console.log("got clitk");
  };

  const updateSolution = (e) => {
    console.log(e.target.value);
    setSol(e.target.value);
  };

  const reset = () => {
    resetFetch();
    setSol("");
  };

  const navigate = () => {
    router.push("/todos");
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
      </div>
      <h1>add item </h1>
      <label htmlFor="">name - </label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          reset();
          dispatch(todosError(""));
          setName(e.target.value);
          setTodoItem({ name: e.target.value, solutions });
        }}
      />
      <div>
        <label htmlFor="">solution - </label>
        <input
          type="text"
          ref={inputRef}
          value={sol}
          onKeyDown={addSolutionOnEnter}
          onChange={updateSolution}
          disabled={!name}
        />

        <button
          onClick={addSolution}
          disabled={!name}
          className={`${!name || !sol ? "bg-gray-400" : "bg-green-400"} `}
        >
          add solution
        </button>
      </div>
      <button onClick={handleClick}>add todo</button>
      <Solutions solutions={solutions} />
    </div>
  );
}
