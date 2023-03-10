const {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
} = require("../services/contactService");

const getListContactsController = async (req, res) => {
  const contactsList = await getListContacts();
  res.json(contactsList);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  res.json(contact);
};

const addContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const contact = await addContact({ name, email, phone, favorite });

  return res.status(201).json(contact);
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.status(200).json({ message: "contact deleted" });
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;

  const updatedContact = await updateContact(contactId, {
    name,
    email,
    phone,
    favorite,
  });
  res.status(200).json(updatedContact);
};

const updateStatusController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const updatedStatus = await updateStatus(contactId, favorite);
  res.status(200).json(updatedStatus);
};

module.exports = {
  getListContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusController,
};
