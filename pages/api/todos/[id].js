import dbConnect from "utils/dbConnect";
import Todo from "@/models/Todo";
import nc from "next-connect";

dbConnect();
const handler = nc({ attachParams: true });

handler.delete(async (req, res) => {
  console.log("=============================");

  const { id } = req?.query;
  try {
    console.log("delete called");
    await Todo.deleteOne({ _id: id });
    res.status(200).json({ message: "data deleted" });
  } catch (error) {
    res.status(500).json({ message: "error deleting" });
  }
});

handler.get(async (req, res) => {
  const { id } = req?.query;
  try {
    const todo = await Todo.findOne({ _id: id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json(error);
  }
});

handler.put(async (req, res) => {
  const { id } = req?.query;
  try {
    const todo = await Todo.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).json({ message: "data got updated" });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default handler;
