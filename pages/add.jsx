import { useState } from "react";
import { addTodo, todosError } from "../actions";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Solutions from "../components/solutions";

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

  console.log(solutions);
  const handleClick = () => {
    if (!name) {
      dispatch(todosError("todo cannot be empty"));
      return;
    }
    dispatch(addTodo({ name, solutions }));
    // let w = getRandWord();

    // setName(w);
  };

  const addSolution = () => {
    setSolutions((prev) => [...prev, sol]);
    setSol("");
  };
  return (
    <div>
      <Link href="/">list</Link>
      <h1>add item </h1>
      <label htmlFor="">name - </label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          dispatch(todosError(""));
          setName(e.target.value);
        }}
      />
      <div>
        <label htmlFor="">solution - </label>
        <input
          type="text"
          value={sol}
          onChange={(e) => setSol(e.target.value)}
        />
        <button onClick={addSolution}>add solution</button>
      </div>
      <button onClick={handleClick}>add todo</button>
      <Solutions solutions={solutions} />
    </div>
  );
}
