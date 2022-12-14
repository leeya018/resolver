import dbConnect from "utils/dbConnect";
import Todo from "@/models/Todo";
import nc from "next-connect";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

dbConnect();
const handler = nc({ attachParams: true });

handler.get(async (req, res) => {
  try {
    const todos = await Todo.find({});
    return res.status(200).json(todos);
  } catch (error) {
    res.status(500).json(error);
  }
});

handler.post(async (req, res) => {
  const foundItem = await Todo.findOne({ name: req.body.name });
  console.log(foundItem);
  if (foundItem) {
    return res.status(400).json({ message: "this todo is allready in system" });
  }
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

handler.delete(async (req, res) => {
  const { query } = req;

  console.log(query);
  res.status(200).json({ message: "data deleted" });
});

export default handler;
