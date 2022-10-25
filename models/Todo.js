import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  name: String,
  solutions: [String],
});

module.exports = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
