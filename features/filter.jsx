import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChosen } from "../actions";

export default function Filter({}) {
  const [name, setName] = useState("");
  const todos = useSelector((state) => state.todos);
  const names = todos.map((todo) => todo.name);
  //   const [todoItems, setTodoItems] = useLocalStorage("todos");
  const router = useRouter();
  const dispatch = useDispatch();
  //   console.log(chosen);
  const updateChosenOne = (nameToFind) => {
    const chosen = todos.filter((todo) => todo.name === nameToFind);
    dispatch(updateChosen(chosen && chosen[0]));
    router.push("/chosen");
  };
  return (
    <div className="">
      <div className=" flex justify-center"> Filter for the data : </div>
      <div className="flex w-full border-blue-500">
        <input
          className="bg-red-400"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <h5 className="bg-purple-400">names : </h5>
        <ul>
          {names
            .filter((n) => n.includes(name))
            .map((n, key) => (
              <li key={key} onClick={() => updateChosenOne(n)}>
                {n}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
