const express = require("express");
const {
  getListContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusController,
} = require("../../controllers/contactsController");
const {
  postContactValidation,
  putContactValidation,
  patchFavValidation,
} = require("../../middlewares/validation");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router
  .get("/", asyncWrapper(getListContactsController))

  .get("/:contactId", asyncWrapper(getContactByIdController))

  .post("/", postContactValidation, asyncWrapper(addContactController))

  .delete("/:contactId", asyncWrapper(removeContactController))

  .put(
    "/:contactId",
    putContactValidation,
    asyncWrapper(updateContactController)
  )

  .patch("/:contactId/favorite", patchFavValidation, updateStatusController);

module.exports = { contactsRouter: router };
