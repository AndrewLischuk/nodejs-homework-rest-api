const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
} = require("../../controllers/contacts");
const {
  postContactValidation,
  putContactValidation,
  patchFavValidation,
} = require("../../middlewares/validation");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router
  .get("/", asyncWrapper(listContacts))

  .get("/:contactId", asyncWrapper(getContactById))

  .post("/", postContactValidation, asyncWrapper(addContact))

  .delete("/:contactId", asyncWrapper(removeContact))

  .put("/:contactId", putContactValidation, asyncWrapper(updateContact))

  .patch("/:contactId/favorite", patchFavValidation, updateStatus);

module.exports = router;
