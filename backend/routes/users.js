const router = require('express').Router();
const {listUsers, getUser, newUser, createUser, login, updateDataUser, setProfileImage } = require('../controllers/users');
const auth = require('./middleware/auth');
const {celebrate, Joi, Segments} = require("celebrate");


router.get('/users', listUsers );


router.get("/users/me", celebrate ({
  [Segments.BODY]: Joi.object().keys({
  name: Joi.string().required(),
  about: Joi.string().required(),
  })
  }), updateDataUser);

  router.get("/users/me/avatar", celebrate ({
    [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required(),
    })
    }), setProfileImage);



router.post("/signup", celebrate ({
  [Segments.BODY]: Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  })
  }), createUser);

  router.post("/signin", celebrate ({
    [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    })
    }), login);









router.post('users', newUser);

router.use(auth);


router.get('/users/:id', getUser);



module.exports = router;