const Joi = require("joi");

const schema = Joi.object({
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

module.exports = schema;
