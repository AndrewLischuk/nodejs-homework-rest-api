const { json } = require("body-parser");
const { Contact } = require("../db/contactModel");

const listContacts = async (req, res) => {
  const contactsList = await Contact.find({});
  res.json(contactsList);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  contact ? res.json(contact) : res.status(404).json({ message: "not found" });
};

const addContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
  return res.status(201).json(contact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  await Contact.findByIdAndRemove(contactId);
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: { name, email, phone },
    },
    { new: true }
  );
  res.status(200).json(updatedContact);
};

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const updatedStatus = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: { favorite },
    },
    { new: true }
  );
  res.status(200).json(updatedStatus);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatus,
};
