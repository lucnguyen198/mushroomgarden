const express = require("express");
const path = require("path");

function requireLogin(req, res, next) {
  const loginPage = express.static(path.join(__dirname, "../home/build"));
  const gamePage = express.static(path.join(__dirname, "../game"));
  if (req.session && req.session.loggedIn) {
    gamePage(req, res, next);
  } else {
    //res.status(440).send("Session expired");
    loginPage(req, res, next);
  }
}

module.exports = {
  requireLogin
};
