const jwt = require("jsonwebtoken");
const config = require("../config");

exports.Auth = async (req, res, next) => {
  try {
    const hash = req.headers["x-private-signature"];
    const token = req.headers["x-private-token"];
    if (hash) {
      let decoded = jwt.verify(hash, config.AUTH_SECRET);
      if (!decoded) {
        return res.status(401).send({
          statusCode: 401,
          message: "Authorization Denied",
        });
      }
    }
    if (token) {
      jwt.verify(token, config.JWT_SECRET, async (error) => {
        if (error) {
          return res.status(401).send({
            statusCode: 401,
            message: "Authorization Denied/Invalid Token",
          });
        }
        next();
      });
    } else {
      return res.status(401).send({
        statusCode: 401,
        message: "Authorization failed/Empty token",
      });
    }
  } catch (e) {
    res.status(500).json({ statusCode: 500, error: e.message });
  }
};