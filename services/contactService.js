const { Contact } = require("../db/contactModel");
const { WrongParametersError } = require("../helpers/errors");

const getListContacts = async (userId, reqQueryParams) => {
  const contactsList = await Contact.find({ owner: userId, ...reqQueryParams });
  return contactsList;
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, owner: userId });
  if (!contact) {
    throw new WrongParametersError(
      `Failure! Contact with id "${contactId}" not found`
    );
  }
  return contact;
};

const addContact = async ({ name, email, phone, favorite }, userId) => {
  const contact = new Contact({
    name,
    email,
    phone,
    favorite,
    owner: userId,
  });
  await contact.save();
  return contact;
};

const removeContact = async (contactId, userId) => {
  const removedContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  if (!removedContact) {
    throw new WrongParametersError(
      `Failure! Contact with id "${contactId}" not found`
    );
  }
};

const updateContact = async (
  contactId,
  { name, email, phone, favorite },
  userId
) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    {
      $set: { name, email, phone, favorite },
    },
    { new: true }
  );
  if (!updatedContact) {
    throw new WrongParametersError(
      `Failure! Contact with id "${contactId}" not found`
    );
  }
  return updatedContact;
};

const updateStatus = async (contactId, favorite, userId) => {
  const updatedStatus = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    {
      $set: { favorite },
    },
    { new: true }
  );

  if (!updatedStatus) {
    throw new WrongParametersError(
      `Failure! Contact with id "${contactId}" not found`
    );
  }

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
