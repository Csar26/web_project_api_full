const router = require('express').Router();
const fs = require("fs/promises");
const path = require("path");
const { getCards, storeCards, deleteCards, addLike, removeLike} = require("../controllers/cards");
const { celebrate, Joi, errors, Segments } = require('celebrate');
const validator = require("validator")

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}


router.get("/cards", getCards);

router.post('/cards', celebrate ({
  [Segments.BODY]: Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required().custom(validateURL),
  })
  }), storeCards);

router.delete("/cards", deleteCards);



module.exports = router