require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");

const generateToken = require("./token");
const Users = require("../models/user-model");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);
      res.status(201).json({ user: saved, token });
    })
    .catch(err => {
      console.log("Error...", err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}!`, token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      console.log("Error...", err);
      res.status(500).json(err);
    });
});

module.exports = router;
