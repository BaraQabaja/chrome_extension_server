const User = require("../models/user");
const bcrypt = require("bcrypt");


//create user function
exports.createUser = async (req, res) => {
//12 is the number of rounds of hashing. so the password hashing process is more computationally expensive and therefore more secure against brute-force attacks.
  bcrypt
    .hash(req.body.password, 12)
    .then((hashPassword) => {
      if (hashPassword) {
        const username = req.body.username;
        const password = hashPassword;
        const email=req.body.email
        //create new user with by the given data
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
        res.status(200).json({ Information: Info });
      } else res.send("something went wrong");//if no data returned by findByPk function that means that something happend in the middle
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
