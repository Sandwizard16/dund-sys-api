const mongoose = require("mongoose");
const Department = require("./department");
const Client = require("./clients");

const employeesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Department,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Employees", employeesSchema);
