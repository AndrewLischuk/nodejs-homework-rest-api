const { WrongParametersError } = require("../helpers/errors");
const {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
} = require("../services/contactService");

const getListContactsController = async (req, res) => {
  const { favorite } = req.query;
  const { _id: userId } = req.user;
  const contactsList = await getListContacts(userId, favorite);
  res.json(contactsList);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await getContactById(contactId, userId);
  res.json(contact);
};

const addContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const { _id: userId } = req.user;

  if (Object.keys(req.body).length === 0) {
    throw new WrongParametersError(
      `Missing fields! You need to provide at least one field to proceed`
    );
  }

  const contact = await addContact({ name, email, phone, favorite }, userId);

  return res.status(201).json(contact);
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  await removeContact(contactId, userId);
  res.status(200).json({ message: "contact deleted" });
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  if (Object.keys(req.body).length === 0) {
    throw new WrongParametersError(
      `Missing fields! You need to provide at least one field to proceed`
    );
  }
  const { name, email, phone, favorite } = req.body;

  const updatedContact = await updateContact(
    contactId,
    {
      name,
      email,
      phone,
      favorite,
    },
    userId
  );
  res.status(200).json(updatedContact);
};

const updateStatusController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id: userId } = req.user;

  if (Object.keys(req.body).length === 0) {
    throw new WrongParametersError(
      `Missing fields! You need to provide at least one field to proceed`
    );
  }

  const updatedStatus = await updateStatus(contactId, favorite, userId);
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
