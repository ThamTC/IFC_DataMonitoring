const mongoose = require("mongoose");

const DoneTaskSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  system: {
    type: String,
  },
  parameter: {
    type: String,
  },
  priority: {
    type: String,
  },
  total: {
    type: String,
  },
  userCheck: {
    type: String,
    required: true,
  },
  userDone: {
    type: String,
    required: true,
  },
  doneTime: {
    type: String,
  },
  createAt: {
    type: String,
  },
  updateAt: {
    type: String,
  },
});

const DoneTask = mongoose.model("DoneTask", DoneTaskSchema);

module.exports = DoneTask;
