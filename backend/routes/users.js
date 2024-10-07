const router = require('express').Router();
const {listUsers, getUser, createUser, login, newUser, updateDataUser, setProfileImage } = require('../controllers/users');
const auth = require('../middleware/auth');
const {celebrate, Joi, Segments} = require("celebrate");


router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});


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


router.use(auth);

router.get('/users', listUsers );


router.post('users', newUser);

router.get('/users/me', getUser);

router.patch("/users/me", celebrate ({
  [Segments.BODY]: Joi.object().keys({
  name: Joi.string().required(),
  about: Joi.string().required(),
  })
  }), updateDataUser);

  router.patch("/users/me/avatar", celebrate ({
    [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required(),
    })
    }), setProfileImage);




module.exports = router;