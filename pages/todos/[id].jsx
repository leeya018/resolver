import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MyLink from "components/myLink";
import { basicUrl } from "@/util";

import axios from "axios";
export default function Todo({ todo }) {
  const [index, setIndex] = useState(-1);
  const router = useRouter();
  useEffect(() => {
    if (!todo) {
      router.push("/");
    }
  }, []);

  const handleEdit = () => {
    router.push(`/todos/edit/${todo._id}`);
  };
  console.log({ todo });
  const { name, solutions } = todo || {};
  return (
    <div>
      <MyLink location={"/todos"} text={"list"} />
      <button onClick={handleEdit}>Edit</button>
      <h1>chosen</h1>
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

export const getServerSideProps = async ({ params }) => {
  try {
    const res = await axios.get(`${basicUrl}/api/todos/${params.id}`);
    return { props: { todo: res.data } };
  } catch (error) {
    throw error;
  }
};
