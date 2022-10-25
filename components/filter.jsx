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
    <div>
      <h4> Filter for the data : </h4>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          //   dispatch(todosError(""));
          setName(e.target.value);
        }}
      />
      <div>
        <h5>names : </h5>
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
