var express = require("express");
const UserModel = require("../models/user.model");
const { ethers } = require("ethers");
const { balanceOf } = require("../helper/kojsm.helper.js");
const basePath = process.cwd();
const path = require("path");
const getNonce = (req, res) => {
  if (!ethers.utils.isAddress(req.params.address)) {
    res.status(400).send("Invalid address");
    return;
  }
  UserModel.getNonce(req.params.address, (err, user) => {
    if (err) {
      res.status(500).send("something went wrong");
      return;
    }
    res.status(200).send(user);
  });
};

const accessGame = (req, res) => {
  //res.setHeader("Content-Type", "text/html");
  //res.sendFile(path.join(__dirname, "../game", "/index.html"));
  express.static(path.join(__dirname, "../game"));
  //res.sendFile(path.join(__dirname, "../game/"));
};

const authenticate = (req, res) => {
  console.log("req.body.address: " + req.body.address);
  UserModel.authenticate(req, async (err, users) => {
    if (err) {
      res.status(500).send("Something went wrong");
      return;
    }
    if (users.length > 0) {
      const nonce = String(users[0].nonce);
      const signature = req.body.signature;
      const address = await ethers.utils.verifyMessage(nonce, signature);
      if (!ethers.utils.isAddress(address)) {
        res.status(400).send("Invalid address");
        return;
      }
      const result = await balanceOf(address);
      if (result.error) {
        res.status(500).send("Something went wrong");
        return;
      }
      if (address.toLowerCase() == users[0].address.toLowerCase()) {
        //update nonce
        UserModel.updateNonce(req.params.address, (err, user) => {
          if (err) {
            res.status(500).send("Something went wrong");
            return;
          }

          if (result.balance > 0) {
            req.session.loggedIn = true;
            //res.redirect("/api/game/");
            res.status(200).send("authentication success");
          } else {
            res.status(202).send("authentication success");
          }
        });
      } else {
        res.status(400).send("Something went wrong");
      }
    } else {
      res.status(400).send("Something went wrong");
    }
  });
};

module.exports = {
  getNonce,
  authenticate,
  accessGame
};
