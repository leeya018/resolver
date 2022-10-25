import { useState } from "react";
import { addTodo, todosError } from "../actions";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Solutions from "../components/solutions";
import useFetch from "@/hooks/useFetch";
import { basicUrl } from "@/util";

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
  const {
    send: sendTodo,
    success,
    loading,
    resetFetch,
    error,
  } = useFetch(`${basicUrl}/api/todos`);
  console.log(`${basicUrl}/api/todos`);
  const handleClick = async () => {
    if (!name) {
      dispatch(todosError("todo cannot be empty"));
      return;
    }
    dispatch(addTodo({ name, solutions }));
    await sendTodo({ name, solutions });
    setName("");
    setSolutions([]);
    setSol("");
    // let w = getRandWord();

    // setName(w);
  };

  const addSolution = () => {
    setSolutions((prev) => [...prev, sol]);
    setSol("");
    console.log("got clitk");
  };

  const updateSolution = (e) => {
    setSol(e.target.value);
  };

  const reset = () => {
    resetFetch();
    setSol("");
    setSolutions([]);
  };
  return (
    <div>
      <Link href="/">list</Link>
      <div>
        <h2>status </h2>
        {loading && <div className="text-gray-500">loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">done has added to db</div>}
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
        }}
      />
      <div>
        <label htmlFor="">solution - </label>
        <input
          type="text"
          value={sol}
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
