import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { updateChosen } from "../actions";

export default function Filter({}) {
  const [name, setName] = useState("");
  const [ind, setInd] = useState(0);
  const inputRef = useRef(null);

  const chosen = useSelector((state) => state.chosen);
  const todos = useSelector((state) => state.todos);
  const router = useRouter();
  const dispatch = useDispatch();

  console.log({ chosen });

  console.log({ todos });

  const moveOnItems = (e) => {
    console.log(e.key);
    if (e.key === "Up") {
      setInd((prev) => prev + 1);
    }
    if (e.key === "Down") {
      setInd((prev) => prev - 1);
    }
  };

  useEffect(() => {
    inputRef.current.addEventListener("keypress", moveOnItems);
  }, []);

  useEffect(() => {
    if (todos.length) {
      dispatch(updateChosen(todos[ind]));
    }
  }, [todos, ind]);

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
          ref={inputRef}
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
              <li
                className={`${
                  chosen && chosen?._id === todo._id && "bg-gray-300"
                }`}
                key={key}
                onClick={() => updateChosenOne(todo._id)}
              >
                {todo.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
