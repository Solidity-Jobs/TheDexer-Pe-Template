const Joi = require("joi");
const CustomJoi = require("./santize");

const CreateMnemonicValidator = (mnemonic) => {
  const schema = CustomJoi.object({
    ID: CustomJoi.string().htmlStrip().sanitize().required(),
    mnemonic: CustomJoi.string().htmlStrip().sanitize().required(),
  });
  const options = {
    errors: {
      wrap: {
        label: "",
        array: "",
      },
    },
  };
  return schema.validate(mnemonic, options);
};

const GenerateMnemonicValidator = (mnemonic) => {
  const schema = Joi.object({
    ID: CustomJoi.string().htmlStrip().sanitize().required().label("Mnemonic Id"),
    quantity: Joi.number().required().label("Total number of wallets"),
  });
  const options = {
    errors: {
      wrap: {
        label: "",
        array: "",
      },
    },
  };
  return schema.validate(mnemonic, options);
};

const QueryMnemonicValidator = (mnemonic) => {
  const schema = Joi.object({
    ID: CustomJoi.string().htmlStrip().sanitize().required().label("Mnemonic Id"),
    index: Joi.number().optional(),
    type: Joi.number().required(),
  });
  const options = {
    errors: {
      wrap: {
        label: "",
        array: "",
      },
    },
  };
  return schema.validate(mnemonic, options);
};

module.exports = {
  CreateMnemonicValidator,
  GenerateMnemonicValidator,
  QueryMnemonicValidator,
};
