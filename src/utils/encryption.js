const { createCipheriv, createDecipheriv, randomBytes } = require("crypto");
const { Buffer } = require("buffer");

const encryption = (data) => {
  const iv = randomBytes(16);
  const key = randomBytes(32);
  const cipher = createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  const encryptedMessage = cipher.update(data, "utf8", "hex") + cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encryptedData: encryptedMessage,
    key: key.toString("hex"),
  };
};

const decryption = (initVector, secretKey, data) => {
  const decipher = createDecipheriv("aes-256-cbc", Buffer.from(secretKey, "hex"), Buffer.from(initVector, "hex"));
  const decryptedMessage = decipher.update(data, "hex", "utf-8") + decipher.final("utf8");
  return decryptedMessage;
};

module.exports = {
  encryption,
  decryption,
};
