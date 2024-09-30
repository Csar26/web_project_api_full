const router = require('express').Router();
const {listUsers, getUser, newUser} = require('../controllers/users');
const auth = require('./middleware/auth');



router.get('/users', listUsers );

router.post('users', newUser);

router.use(auth);


router.get('/users/:id', getUser);


module.exports = router;