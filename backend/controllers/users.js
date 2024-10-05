const router = require("express").Router();
const handleError = require("../utils/handlerError");
const UserInfo = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { NODE_ENV, JWT_SECRET } = process.env;

const listUsers = (req, res) => {
  UserInfo.find({}).then((user) => {
    res.send(user);
  });
};

const getUser = (req, res) => {
  UserInfo.findById(req.params, id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      UserInfo.create({
        email,
        password: hash,
      })
    )
    .then((user) => {
      res.status(404).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return UserInfo.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "some-secret-key",
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch((err) => {
      res.status(401);
      send({ message: err.message });
    });
};

const setProfileImage = (req, res) => {
  const { avatar } = req.body;
  UserInfo.findUserByCredentials(req.user._id, { avatar }, { new: true })
    .orfail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => handleError(err, res));
};

const updateDataUser = (req, res) => {
  const { name, about } = req.body;
  UserInfo.findUserByCredentials(req.user._id, { name, about }, { new: true })
    .orfail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => handleError(err, res));
};

const newUser = (req, res) => {
  const { name, about, avatar } = req.body;
  UserInfo.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => handleError(error, res));
};

module.exports = {
  listUsers,
  getUser,
  createUser,
  newUser,
  login,
  updateDataUser,
  setProfileImage,
};
