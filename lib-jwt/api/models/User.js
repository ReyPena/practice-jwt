var bcrypt = require("bcryptjs")
 , mongoose = require("mongoose");

// user model
var UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

// remove the password from the response
UserSchema.methods.toJSON = function () {
  var user = this.toObject();
  delete user.password;
  return user;
};

exports.model = mongoose.model("User", UserSchema);

// User schema pre save event definition
UserSchema.pre("save", function (next) {
  var user = this;

  // check if the password have been modify

  if (!user.isModified("password")) return next();

  // add the salt to the password using bcrypt library

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});
