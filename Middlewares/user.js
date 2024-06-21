const { User } = require("../db/index");

function UserMiddleWares(req, res, next) {
  let { username, password } = req.headers;
  let ans = User.findOne({
    username: username,
    password: password,
  }).then((value) => {
    if (value) {
      next();
    } else {
      res.json({
        message: "User not found",
      });
    }
  });
}

module.exports = UserMiddleWares;
