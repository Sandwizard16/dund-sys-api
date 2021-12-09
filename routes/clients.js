const router = require("express").Router();
const authMiddleWare = require("../middleware/auth");

const Client = require("../models/clients");

router.get("/", async (req, res) => {
  const clients = await Client.find().populate("salesRep", "name -_id");

  try {
    res.status(200).send(clients);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const client = await Client.findById(req.params.id).populate(
    "salesRep",
    "name -_id"
  );

  if (!client) {
    res.status(404).send(`No Client with given ID found in Database`);
    return;
  }
  try {
    res.status(200).send(client);
  } catch (err) {
    res.send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) {
    res.status(404).send(`No Client with given ID found in Database`);
    return;
  }
  try {
    client.name = req.body.name;
    client.contactNumber = req.body.contactNumber;
    client.productAmount = req.body.productAmount;
    client.salesRep = req.body.salesRep;
    const updated = await client.save();
    res.send(updated);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  const client = new Client(req.body);
  try {
    const savedClient = await client.save();
    res.status(200).send(savedClient);
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) {
    res.status(404).send(`Client with given ID not found in database`);
    return;
  }

  try {
    const deleted = await Client.findByIdAndDelete(req.params.id);
    res.send(deleted);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
