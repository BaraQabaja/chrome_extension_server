const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//models
const User = require("../models/user");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
// create token functions
const createToken = require("../utils/createToken");

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findByPk(email)
    .then(async (user) => {
      //compare hash(login pass) to hash (db user password hash)
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.send("Incorrect email or password");
      }
      //create token with email 
      const token = createToken(user.email);
      res.status(200).json({ user: user, token });
    })
    .catch((err) => {
      res.status(500).send(err.message || "Something went wrong");
    });
};

exports.protect = async (req, res, next) => {

  //Check if token sent with req or not
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {

    res.send("please send a token to verify you");}
  if (!token) {
    return next(
      res.send("You are not login, Please login to get access this route")
    );
  }

  // 2) Verify token (no change happens, expired token)
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
       res.send("Token is invalid" );
    }
  });
  // If verification succeeds
  decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // 3) Check if user exists
  const currentUser = await User.findByPk(decoded.userId);
  if (!currentUser) {

    res.send("The user that belong to this token does no longer exist");
  }


  if (currentUser.logoutAt) {
    const logoutAt = parseInt(currentUser.logoutAt.getTime() / 1000, 10);
    if (logoutAt > decoded.iat) {

      return res.send("you recently logout. please login again ..");
    }
  }
  req.user = currentUser;
  next();
};

exports.logout = async (req, res, next) => {
  User.findByPk(req.user.email)
    .then(async (user) => {
      if (user) {
        user.logoutAt = Date.now();
        return await user.save();
      }
    })
    .then((result) => {
      if (result) {
        res.send("you logout");
      } else res.send("something went wrong, please login again");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
