const { json } = require("express");
const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const schema = require("../../validation/validation");

const router = express.Router();

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
    const { error, value } = schema.validate(req.body);
    if (!error) {
      const newContact = await addContact(value);
      return res.status(201).json(newContact);
    }
    return res.status(400).json({ message: `${error}` });
  })

  .delete("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;
    console.log(contactId);
    const contact = await removeContact(contactId);
    console.log(contact);
    contact
      ? res.status(200).json({ message: "contact deleted" })
      : res.status(404).json({ message: "not found" });
  })

  .put("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;

    const { error, value } = schema.validate(req.body);
    if (!error) {
      const updatedContact = await updateContact(contactId, value);
      return updatedContact
        ? res.status(200).json(updatedContact)
        : res.status(404).json({ message: "not found" });
    }
    return res.status(400).json({ message: `${error}` });
  });

module.exports = router;
