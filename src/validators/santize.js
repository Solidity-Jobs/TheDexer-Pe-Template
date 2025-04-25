const sanitizeHtml = require("sanitize-html");
const Joi = require("joi");

module.exports = Joi.extend((joi) => ({
  type: "string",
  base: joi.string().trim(),
  messages: {
    "string.htmlStrip": "{{#label}} should not contain any html tags",
    "string.dd": "{{#label}} should not contain special characters",
  },
  rules: {
    htmlStrip: {
      validate(value, helpers) {
        const santiziedInput = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (santiziedInput == value) {
          return santiziedInput;
        }
        return helpers.error("string.htmlStrip");
      },
    },
    sanitize: {
      validate(value, helpers) {
        const verifyInput = /^\$/.test(value);
        if (verifyInput == true) {
          delete value;
        } else {
          return value;
        }
        return helpers.error("string.dd");
      },
    },
  },
}));
