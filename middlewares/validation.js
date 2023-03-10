const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

const postContactValidation = (req, res, next) => {
  const postReq = Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Z][a-zA-Z0-9\s-_\.]{0,30}$/)
      .required(),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),

    phone: Joi.string()
      .length(14)
      .pattern(/^(.)+[0-9]+(.)+\s+[0-9]+(.)+[0-9]$/)
      .required(),
  });

  const validationResult = postReq.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error));
  }
  next();
};

const putContactValidation = (req, res, next) => {
  const putReq = Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Z][a-zA-Z0-9\s-_\.]{0,30}$/)
      .optional(),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .optional(),

    phone: Joi.string()
      .length(14)
      .pattern(/^(.)+[0-9]+(.)+\s+[0-9]+(.)+[0-9]$/)
      .optional(),
  });

  const validationResult = putReq.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error));
  }
  next();
};

const patchFavValidation = (req, res, next) => {
  const patchReq = Joi.object({
    favorite: Joi.boolean().optional(),
  });

  const validationResult = patchReq.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error));
  }
  next();
};

module.exports = {
  postContactValidation,
  putContactValidation,
  patchFavValidation,
};
