const prompt = require("prompt");
const { DbService } = require("../../db/index");
const { encryption } = require("../utils/encryption");
const { generateUUID } = require("../utils/id-generator");

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
  const encryptedData = encryption(result.mnemonic);
  let data = {
    ID: generateUUID(20),
    initVector: encryptedData.iv,
    mnemonic: encryptedData.encryptedData,
    hash: encryptedData.key,
  };
  let findMnemonic = await DbService.findOne({ ID: data.ID }, "mnemonics");
  if (findMnemonic) console.log("err", "ID exists");
  await DbService.insert(data, "mnemonics");
  console.info(`MnemonicId:`, data.ID);
  process.exit(0);
});
