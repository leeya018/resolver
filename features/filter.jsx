import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChosen } from "../actions";

export default function Filter({}) {
  const [name, setName] = useState("");
  const todos = useSelector((state) => state.todos);
  const router = useRouter();
  const updateChosenOne = (id) => {
    router.push(`/todos/${id}`);
  };
  return (
    <div className="">
      <div className=" flex justify-center font-semibold text-blue-500">
        {" "}
        Filter for the data :{" "}
      </div>
      <div className="">
        <input
          className="bg-red-400 w-full"
          placeholder="find question"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <h5 className="bg-purple-400 flex items-center">names : </h5>
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
