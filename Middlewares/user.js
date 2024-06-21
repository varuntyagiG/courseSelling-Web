const { User } = require("../db/index");

function UserMiddleWares(req, res, next) {
  let { username, password } = req.headers;
  let res = User.findOne({
    username: username,
    password: password,
  }).then((value) => {
    if (value) {
      next();
    } else {
      alert("You are not User");
    }
  });
}

module.exports = UserMiddleWares;
