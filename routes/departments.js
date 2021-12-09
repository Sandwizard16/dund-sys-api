const router = require("express").Router();
const authMiddleWare = require("../middleware/auth");
const adminMiddlwWare = require("../middleware/admin");

const Department = require("../models/department");
const Joi = require("joi");

router.get("/", async (req, res) => {
  const deps = await Department.find();
  try {
    res.send(deps);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const dep = await Department.find({ _id: req.params.id }).select({ name: 1 });
  if (dep.length) {
    res.send(`No departments with given id found`);
    return;
  }
  try {
    res.send(dep);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", [authMiddleWare, adminMiddlwWare], async (req, res) => {
  const newDep = new Department({
    name: req.body.name,
  });
  try {
    const savedDep = await newDep.save();
    res.status(200).send(savedDep);
  } catch (err) {
    res.send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const dep = await Department.findById(req.params.id);
  if (!dep) {
    res.status(404).send(`No departments with given id found`);
    return;
  }
  try {
    dep.name = req.body.name;
    const updated = await dep.save();
    res.send(updated);
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/:id", [authMiddleWare, adminMiddlwWare], async (req, res) => {
  const dep = Department.findById(req.params.id);
  if (!dep) {
    res.status(404).send(`No departments with given id found`);
    return;
  }
  try {
    await dep.delete;
    res.send("deleted");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
