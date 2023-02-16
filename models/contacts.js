const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  return data;
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const contact = contactList.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const contact = contactList.find((contact) => contact.id === contactId);
  if (contact) {
    const contacts = contactList.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
    return contacts;
  }
  return null;
};

const addContact = async ({ name, email, phone }) => {
  const contactList = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contactList.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactList, null, 2),
    "utf8"
  );
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contactList = await listContacts();
  const idx = contactList.findIndex(
    (contact) => contact.id === String(contactId)
  );
  if (idx === -1) {
    return null;
  }
  if (name) {
    contactList[idx].name = name;
  }

  if (email) {
    contactList[idx].email = email;
  }
  if (phone) {
    contactList[idx].phone = phone;
  }
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactList, null, 2),
    "utf8"
  );
  return contactList[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
