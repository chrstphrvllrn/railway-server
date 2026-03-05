import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  console.log("Post /")
  console.log(task)
  res.json(task);
});

// READ
router.get("/", async (req, res) => {
  const tasks = await Task.find();
console.log("Get /")
console.log(tasks)
  res.json(tasks);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
console.log("Update /")
  console.log(task)
  res.json(task);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
console.log('Delete ',req.params.id)
  res.json({ message: "Deleted" });
});

export default router;