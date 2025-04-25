const { DbService } = require("../../db");

async function deleteMnemonic() {
  const mnemonic = await DbService.deleteAll({}, "mnemonics");
  console.info("mnemonic", mnemonic);
  process.exit(1);
}

deleteMnemonic();
