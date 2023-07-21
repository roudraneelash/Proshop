const jwt = require("jsonwebtoken");

module.exports.generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SCR, {
    expiresIn: "1d",
  });

  //Set JWT as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: "true",
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000, //1day=millisec
  });
};
