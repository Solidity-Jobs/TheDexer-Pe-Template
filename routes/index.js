const express = require("express");
const router = express.Router();

const MnemonicRouter = require("../src/mnemonics/mnemonic");

router.use("/mnemonics", MnemonicRouter);


module.exports = router;
