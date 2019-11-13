const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.ENCRYPTION_KEY, (err, decodedToken) => {
      if (err) {
        console.log("Failed verification", err);
        res.status(401).json({ message: "Not Verified" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No Token Provided" });
  }
};
