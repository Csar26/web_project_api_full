const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const validator = require("validator");


const regExpLink =
  /(?:http[s]?:\/\/.)?(?:www\.)?[-a-zA-Z0-9@%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;

  const isEmail= require('validator/lib/isEmail') ;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "incorrect email format"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",

  },
  about: {
  type: String,
  required: true,
  minlength: 2,
  maxlength: 30,
  default:"Explorer",
},
avatar:{
    type: String,
    required: true,
    default: "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate:{
      validator : function (v) {
        return regExpLink.test(v);
      },
      message: "INVALID FORMAT",
    },
},

});

userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }

          return user; // ahora user está disponible
        });
    });
};



module.exports = mongoose.model('users', userSchema);

