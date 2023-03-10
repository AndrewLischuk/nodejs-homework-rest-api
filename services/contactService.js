const { Contact } = require("../db/contactModel");
const { WrongParametersError } = require("../helpers/errors");

const getListContacts = async () => {
  const contactsList = await Contact.find({});
  return contactsList;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new WrongParametersError(
      `Failure! Contact with id "${contactId}" not found`
    );
  }
  return contact;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
  return contact;
};

const removeContact = async (contactId) => {
  await Contact.findByIdAndRemove(contactId);
};

const updateContact = async (contactId, { name, email, phone, favorite }) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: { name, email, phone, favorite },
    },
    { new: true }
  );
  return updatedContact;
};

const updateStatus = async (contactId, favorite) => {
  // if (Object.keys(req.body).length === 0) {
  //   return res.status(400).json({ message: "missing field favorite" });
  // }

  const updatedStatus = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: { favorite },
    },
    { new: true }
  );
  return updatedStatus;
};

module.exports = {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
};
