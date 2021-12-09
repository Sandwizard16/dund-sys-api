const router = require("express").Router();
const Employee = require("../models/employee");
const Department = require("../models/department");
const authMiddleWare = require("../middleware/auth");

router.get("/", async (req, res) => {
  const emp = await Employee.find().populate("department", "name id");

  try {
    res.send(emp);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const emp = await Employee.findById(req.params.id).populate(
    "department",
    "name -_id"
  );

  if (!emp) {
    res.send(`No Employees with given id found`);
    return;
  }
  try {
    res.send(emp);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  const newEmp = new Employee(req.body);
  const department = await Department.findById(req.body.department);
  if (!department) {
    res.send("Invalid department ID");
    return;
  }

  try {
    const savedEmp = await newEmp.save();
    res.status(200).send(savedEmp);
  } catch (err) {
    res.send(err.message);
  }
});

router.put("/:id", authMiddleWare, async (req, res) => {
  const emp = await Employee.findById(req.params.id);

  if (!emp) {
    res.status(404).send(`No Employees with given id found`);
    return;
  }
  try {
    emp.name = req.body.name;
    emp.salary = req.body.salary;
    emp.department = req.body.department;
    emp.contactNumber = req.body.contactNumber;
    const updated = await emp.save();
    res.send(updated);
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/:id", authMiddleWare, async (req, res) => {
  const emp = Employee.findById(req.params.id);
  if (!emp) {
    res.status(404).send(`No Employees with given id found`);
    return;
  }
  try {
    await Employee.deleteOne({ _id: req.params.id });
    res.send("deleted");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
