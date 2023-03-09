const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");
const {
  postContactValidation,
  putContactValidation,
} = require("../../middlewares/validation");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router
  .get("/", asyncWrapper(listContacts))

  .get("/:contactId", asyncWrapper(getContactById))

  .post("/", postContactValidation, asyncWrapper(addContact))

  .delete("/:contactId", asyncWrapper(removeContact))

  .put("/:contactId", putContactValidation, asyncWrapper(updateContact));

module.exports = router;
