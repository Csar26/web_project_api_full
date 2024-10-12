const router = require("express").Router();
const handleError = require("../utils/handlerError");
const CardModel = require("../models/cards");

function getCards(req, res) {
  CardModel.find({})
    .populate("owner")
    .then((cards) => {
      res.send(cards);
    })
    .catch((errors) => {
      res.status(404).send({
        message: "NOT FOUND",
        errors,
      });
    });
}

function storeCards(req, res) {
  const id = req.params.id;
  const { name, link } = req.body;
  CardModel.create({ name, link, owner: req.user._id })
    .then((card) => {
      CardModel.findById(card._id)
        .populate("owner")
        .then((cardObj) => {
          res.send(cardObj);
        });
    })
    .catch((error) => handleError(error, res));
}

function deleteCards(req, res) {
  const id = req.params.id;
  CardModel.findByIdAndDelete({ _id: id, owner: req.user._id })
    .orFail()
    .then(() => {
      res.send({ status: true });
    })
    .catch((error) => handleError(error, res));
}

function addLike(req, res) {
  const id = req.params.id;

  CardModel.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((error) => handleError(error, res));
}

function removeLike(req, res) {
  const id = req.params.id;
  CardModel.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((error) => handleError(error, res));
}

module.exports = { getCards, storeCards, deleteCards, addLike, removeLike };