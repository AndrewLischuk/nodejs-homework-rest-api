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
  const { name, email, phone } = req.body;

  const contact = new Contact({ name, email, phone });
  await contact.save();
  return res.status(201).json(contact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  await Contact.findByIdAndRemove(contactId);
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  // const contactList = await listContacts();
  // const idx = contactList.findIndex(
  //   (contact) => contact.id === String(contactId)
  // );
  // if (idx === -1) {
  //   return null;
  // }
  // if (name) {
  //   contactList[idx].name = name;
  // }
  // if (email) {
  //   contactList[idx].email = email;
  // }
  // if (phone) {
  //   contactList[idx].phone = phone;
  // }
  // await fs.writeFile(
  //   contactsPath,
  //   JSON.stringify(contactList, null, 2),
  //   "utf8"
  // );
  // return contactList[idx];
  //   !!!
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });
  // !!!
  // if (!req.body.name && !req.body.email && !req.body.phone) {
  //   return res.status(400).json({ message: "missing fields" });
  // }
  // const { error, value } = putReq.validate(req.body);
  // if (error) {
  //   return res.status(400).json({ message: `${error}` });
  // }
  // !!!
  // const updatedContact = await req.db.Contacts.findOne({
  //   _id: new ObjectId(contactId),
  // });
  // // const updatedContact = await updateContact(contactId, value);
  // return updatedContact ?
  res.status(200).json(updatedContact);
  //   : res.status(404).json({ message: "not found" });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
