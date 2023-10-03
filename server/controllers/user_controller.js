const User = require("../models/user");

const { Op } = require("sequelize");

const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  console.log(req.body);

  console.log("done");
  bcrypt
    .hash(req.body.password, 12)
    .then((hashPassword) => {
      if (hashPassword) {
        const username = req.body.username;
        const password = hashPassword;
        const email=req.body.email
        User.create({
          email:email,
          username: username,
          password: password,
        })
          .then((result) => {
            if (result) {
              res.status(200).send("user created");
            } else res.send("not created");
          })
          .catch((err) => {
            res.status(500).send(err || "Something went wrong");
          });
      } else {
        res.send("something went wrong");
      }
    })
    .catch((err) => {
      res.status(500).send(err || "Something went wrong");
    });
};

// Personal Operations

exports.getPersonalInformations = (req, res) => {
  const userEmail = req.user.email;
  User.findByPk(userEmail)
    .then((Info) => {
      if (Info) {
        // console.log("user data sent",Info)
        res.status(200).json({ Information: Info });
      } else res.send("something went wrong");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.updateUsername = async (req, res, next) => {
  const newUsername = req.body.newUsername;
  const email=req.user.email
  User.findByPk(email)
    .then(async (user) => {
      if (user) {
        // console.log("username", user, newUsername);
        user.username = newUsername;
        await user.save(); // await to save the user changes
        res.send("username changed");
      } else {
        res.status(404).send("User not found"); // Handle the case where the user is not found
      }
    })
  
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
