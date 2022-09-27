const { Model, DataTypes } = require("sequelize");

module.exports = function (req, res, next) {
  console.log(req.session.userId);
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};
