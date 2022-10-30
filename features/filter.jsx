import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { todosError, updateChosen } from "../actions";

export default function Filter({}) {
  const [name, setName] = useState("");
  const [ind, setInd] = useState(0);

  // const chosen = useSelector((state) => state.chosen);
  const todos = useSelector((state) => state.todos);
  const router = useRouter();
  const dispatch = useDispatch();

  // console.log({ chosen });

  console.log({ chosen: todos[ind] });

  const handleKeyDown = (e) => {
    console.log(e.key);
    switch (e.key) {
      case "ArrowUp":
        setInd((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "ArrowDown":
        setInd((prev) => (prev < todos.length - 1 ? prev + 1 : prev));
        break;
      case "Enter":
        updateChosenOne(todos[ind]._id);
        break;

      default:
        break;
    }
  };

  const updateChosenOne = (id) => {
    router.push(`/todos/${id}`);
  };

  const handleKeyDownupdateChosenOne = (e) => {
    alert(e.key);
    if (e.key === "Enter") {
      // updateChosenOne(chosen._id);
    }
  };
  return (
    <div className="">
      <div className=" flex justify-center font-semibold text-blue-500">
        Filter for the data :
      </div>
      <div className="">
        <input
          class="form-control"
          list="datalistOptions"
          id="exampleDataList"
          placeholder="Type to search..."
          onChange={(e) => {
            dispatch(todosError(""));
            let items = todos.filter((item) => item.name === e.target.value);
            if (items.length > 0) {
              updateChosenOne(items[0]._id);
            }
            // console.log(e.target);
          }}
        />
        <datalist id="datalistOptions" onChange={(e) => console.log(e)}>
          {todos.map((todo) => (
            <option
              key={todo._id}
              value={todo.name}
              // onSelect={handleKeyDownupdateChosenOne}
            >
              {/* {todo.name} */}
            </option>
          ))}
        </datalist>
      </div>
    </div>
  );
}
