const { json } = require("express");
const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("../../models/contacts");

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
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
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
    res.json({ message: "put req" });
  });

module.exports = router;
