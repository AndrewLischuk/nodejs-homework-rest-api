const { json } = require("express");
const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");
const { postReq, putReq } = require("../../middlewares/validation");
const modelsMiddleware = require("../../middlewares/models");

const router = express.Router();

router.use(modelsMiddleware);

router
  .get("/", async (req, res, next) => {
    const contactsList = await listContacts();
    res.json(contactsList);
  })

  .get("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;
    console.log(req.params.contactId);
    const contact = await getContactById(contactId);
    contact
      ? res.json(contact)
      : res.status(404).json({ message: "not found" });
  })

  .post("/", async (req, res, next) => {
    const { error, value } = postReq.validate(req.body);
    if (!error) {
      const newContact = await addContact(value);
      return res.status(201).json(newContact);
    }
    return res.status(400).json({ message: `${error}` });
  })

  .delete("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    contact
      ? res.status(200).json({ message: "contact deleted" })
      : res.status(404).json({ message: "not found" });
  })

  .put("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;
    if (!req.body.name && !req.body.email && !req.body.phone) {
      return res.status(400).json({ message: "missing fields" });
    }
    const { error, value } = putReq.validate(req.body);
    if (error) {
      return res.status(400).json({ message: `${error}` });
    }
    const updatedContact = await updateContact(contactId, value);
    return updatedContact
      ? res.status(200).json(updatedContact)
      : res.status(404).json({ message: "not found" });
  });

module.exports = router;
