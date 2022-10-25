import dbConnect from "utils/dbConnect";
import Todo from "@/models/Todo";
import nc from "next-connect";

dbConnect();
const handler = nc({ attachParams: true });

handler.delete(async (req, res) => {
  const { query } = req;

  console.log(query);
  res.status(200).json({ message: "data deleted" });

  // try {
  //   console.log("delete called");
  //   await Todo.deleteOne({_id:id});
  //   res.status(200).json({ message: "data deleted" });
  // } catch (error) {
  //   res.status(500).json({ message: "error deleting" });
  // }
});
