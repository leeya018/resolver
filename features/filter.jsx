import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChosen } from "../actions";

export default function Filter({}) {
  const [name, setName] = useState("");
  const todos = useSelector((state) => state.todos);
  // const namesAndIds = todos.map((todo) => ({id:todo._id,name:todo.name}));
  //   const [todoItems, setTodoItems] = useLocalStorage("todos");
  const router = useRouter();
  const dispatch = useDispatch();
  //   console.log(chosen);
  const updateChosenOne = (id) => {
    // const chosen = todos.filter((todo) => todo.name === nameToFind);
    // dispatch(updateChosen(chosen && chosen[0]));
    router.push(`/todos/${id}`);
  };
  return (
    <div className="">
      <div className=" flex justify-center font-semibold text-blue-500">
        {" "}
        Filter for the data :{" "}
      </div>
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
          {todos
            .filter((todo) => todo.name.includes(name))
            .map((todo, key) => (
              <li key={key} onClick={() => updateChosenOne(todo._id)}>
                {todo.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
