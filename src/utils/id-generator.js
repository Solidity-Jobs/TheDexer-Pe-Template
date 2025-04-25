const { customAlphabet } = require("nanoid");
function generateUUID(number) {
  const letter = "0123456789ABCDEFGHJKMNPQRSTVWXYZabcdefghjkmnpqrstvwxyz";
  const nanoid = customAlphabet(letter, number);
  return nanoid();
}
module.exports = { generateUUID };
