const { ObjectId } = require("mongodb");
const prompt = require("prompt");
const { DbService } = require("../../db/index");
const { encryption } = require("../utils/encryption");
prompt.start();

const schema = {
  properties: {
    mnemonic: {
      pattern: /^[a-zA-Z ]*$/,
      message: "Mnemonic must be only letters and spaces",
      required: true,
    },
  },
};

prompt.get(schema, async (err, result) => {
  const mnemonic = await DbService.findOne({}, "mnemonics");
  const encryptions = encryption(result.mnemonic);
  let data = {
    initVector: encryptions.iv,
    mnemonic: encryptions.encryptedData,
    hash: encryptions.key,
  };
  await DbService.updateOne({ _id: ObjectId(mnemonic._id) }, data, "mnemonics");
  process.exit(0);
});
