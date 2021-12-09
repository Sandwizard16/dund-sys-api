const mongoose = require("mongoose");
const Employee = require("./employee");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  salesRep: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Employee,
    required: true,
  },
  productAmount: {
    type: Number,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Client", clientSchema);
