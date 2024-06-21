const { Admin } = require("../db/index");

async function AdminMiddleWares(req, res, next) {
  let username = req.headers.username;
  let password = req.headers.password;
  let adminfind = await Admin.findOne({
    username: username,
    password: password,
  });
  if (adminfind) {
    console.log(adminfind);
    next();
  } else {
    res.status(500).json({
      message: "Admin not found",
    });
  }
}

module.exports = AdminMiddleWares;
