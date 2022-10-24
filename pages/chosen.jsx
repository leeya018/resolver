import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Chosen({}) {
  const chosen = useSelector((state) => state.chosen);
  const [index, setIndex] = useState(-1);
  const router = useRouter();
  useEffect(() => {
    if (!chosen) {
      router.push("/");
    }
  }, []);

  //   console.log(chosen);
  const { name, solutions } = chosen || {};
  return (
    <div>
      <div>{name}</div>
      <button onClick={() => setIndex((prev) => prev + 1)}>
        {`${index < 0 ? "show solution" : "show next solution"}`}
      </button>
      {/* <Solutions solutions={solutions} /> */}
      <div>
        <div>{index > -1 && index < solutions.length && solutions[index]}</div>
      </div>
    </div>
  );
}
