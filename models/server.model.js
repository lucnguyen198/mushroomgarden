const express = require("express");
const cors = require("cors");
const path = require("path");
// const bodyParser = require("body-parser");
// const userRoutes = require("../routes/user.route");
// const gameRoutes = require("../routes/game.route");
const session = require("express-session");
// const mysqlStore = require("express-mysql-session")(session);
// const userMiddleware = require("../middlewares/user.middleware");
//var cookieParser = require("cookie-parser");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.paths = {
      user: "/api/user",
      game: "/api/game"
    };

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    // parse request data content type application/json
    //this.app.use(bodyParser.json());
    //this.app.use(cookieParser());
    // Pick up React index.html file
    // const options = {
    //   password: process.env.DB_PASSWORD,
    //   user: process.env.DB_USER,
    //   database: process.env.DB_NAME,
    //   host: process.env.DB_HOST,
    //   createDatabaseTable: true,
    //   expiration: 20 * 60 * 1000
    // };

    // const sessionStore = new mysqlStore(options);
    // this.app.use(
    //   session({
    //     secret: process.env.SESSION_SECRET,
    //     store: sessionStore,
    //     resave: true,
    //     saveUninitialized: false,
    //     cookie: {
    //       secure: false,
    //       httpOnly: true,
    //       maxAge: 20 * 60 * 1000
    //     }
    //   })
    // );

    //this.app.use(userMiddleware.requireLogin);
    //this.app.use(express.static(path.join(__dirname, "../home/build")));
    this.app.use(express.static(path.join(__dirname, "../game")));
  }

  // Bind controllers to routes
  routes() {
    //this.app.use(this.paths.user, userRoutes);
    // this.app.use(this.paths.game, gameRoutes);
    // Catch all requests that don't match any route
    // this.app.get("*", (req, res) => {
    //   res.sendFile(path.join(__dirname, "../home/build/index.html"));
    // });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;
