"use_strict";
const express = require("express");
const { DbService } = require("../../db");
const router = express.Router();
const { Wallet } = require("ethers");
const { Auth } = require("../../auth/auth");
const {
  GenerateMnemonicValidator,
  QueryMnemonicValidator,
} = require("../validators/mnemonic.validator");
const { encryption, decryption } = require("../utils/encryption");


router.get("/generate", async (req, res, next) => {
  try {
    const { error, value } = GenerateMnemonicValidator(req.query);
    if (error) {
      return res.status(400).send({
        statusCode: 400,
        message: error.details[0].message,
      });
    }

    let wallets = [];
    let findMnemonic = await DbService.findOne({ ID: value.ID }, "mnemonics");
    let decryptMnemonic = decryption(findMnemonic.initVector, findMnemonic.hash, findMnemonic.mnemonic);
    let numberOfWallets = Number(value.quantity);
    for (let i = 0; i < numberOfWallets; i++) {
      let walletMnemonic = Wallet.fromMnemonic(decryptMnemonic, `m/44'/60'/0'/0/${i}`);
      let wallet = await walletMnemonic.getAddress();
      wallets.push(wallet);
    }
    res.status(200).json({ statusCode: 200, message: "wallets generated", data: wallets });
  } catch (e) {
    console.log(e);
    res.status(500).json({ statusCode: 500, error: e.message });
  }
});

router.get("/", Auth, async (req, res, next) => {
  try {
    const { error, value } = QueryMnemonicValidator(req.query);
    if (error) {
      return res.status(400).send({
        statusCode: 400,
        message: error.details[0].message,
      });
    }

    let mnemonic = await DbService.findOne({ ID: value.ID }, "mnemonics");
    if (!mnemonic) return res.status(404).send({ statusCode: 404, message: "menmonic not found" });
    res.status(200).send(mnemonic);
  } catch (e) {
    console.log(e);
    res.status(500).json({ statusCode: 500, error: e.message });
  }
});

router.get("/filter", Auth, async (req, res, next) => {
  try {
    const { error, value } = QueryMnemonicValidator(req.query);
    if (error) {
      return res.status(400).send({
        statusCode: 400,
        message: error.details[0].message,
      });
    }
    let data;
    let findMnemonic = await DbService.findOne({ ID: value.ID }, "mnemonics");
    let decryptMnemonic = decryption(findMnemonic.initVector, findMnemonic.hash, findMnemonic.mnemonic);
    let walletMnemonic = Wallet.fromMnemonic(decryptMnemonic, `m/44'/60'/0'/0/${Number(value.index)}`);
    if (value.type == 1) {
      let wallet = await walletMnemonic.getAddress();
      data = { address: wallet, index: value.index };
    }
    if (value.type == 2) {
      let wallet = walletMnemonic.privateKey;
      const encryptionData = encryption(wallet);
      let params = {
        key: encryptionData.encryptedData,
        hash: encryptionData.key,
        initVector: encryptionData.iv,
      };
      data = params;
    }
    res.status(200).json({ statusCode: 200, data });
  } catch (e) {
    res.status(500).json({ statusCode: 500, error: e.message });
  }
});

module.exports = router;
