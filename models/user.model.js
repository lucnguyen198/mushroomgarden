var dbConn = require("../config/db.config");
var User = user => {
  this.address = user.address;
  this.nonce = user.nonce;
};

User.getNonce = (address, result) => {
  dbConn.query("Select * from kojuser where address=?", address, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if (res.length > 0) {
        result(null, res[0]);
      } else {
        const nonce = Math.floor(Math.random() * 1000000);
        const user = { address: address, nonce: nonce };
        dbConn.query("Insert into kojuser SET ?", user, (err, res) => {
          if (err) {
            result(err, null);
          } else {
            result(null, user);
          }
        });
      }
    }
  });
};

User.authenticate = (req, result) => {
  dbConn.query(
    "Select * from kojuser where address=?",
    req.body.address,
    (err, res) => {
      if (err) {
        console.log("err: " + err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

User.updateNonce = (address, result) => {
  const nonce = Math.floor(Math.random() * 1000000);
  const sql = `Update kojuser SET nonce = ${nonce} WHERE address ='${address}';`;
  dbConn.query(sql, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
