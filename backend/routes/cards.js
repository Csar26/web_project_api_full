const router = require('express').Router();
const fs = require("fs/promises");
const path = require("path");
const { getCards, storeCards, deleteCards, addLike, removeLike} = require("../controllers/cards");
const { celebrate, Joi, errors, Segments } = require('celebrate');




router.get("/cards", getCards);

router.post('/cards', celebrate ({
  [Segments.BODY]: Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  link: Joi.required(),
  })
  }), storeCards);

router.delete("/cards", deleteCards);



module.exports = router