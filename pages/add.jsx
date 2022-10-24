import { useState } from "react";
import { addTodo, todosError } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

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
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!name) {
      dispatch(todosError("todo cannot be empty"));
      return;
    }
    dispatch(addTodo(name));
    let w = getRandWord();

    setName(w);
  };
  return (
    <div>
      <Link href="/">list</Link>

      <input
        type="text"
        value={name}
        onChange={(e) => {
          dispatch(todosError(""));
          setName(e.target.value);
        }}
      />
      <button onClick={handleClick}>add todo</button>
    </div>
  );
}
