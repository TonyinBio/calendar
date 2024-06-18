const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config()

const db = require("./app/models")
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
db.sequelize.sync()

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

demoRouter = require("./app/routes/demo.routes.js")
eventRouter = require("./app/routes/event.routes.js")
demoRouter(app)
eventRouter(app)

const filePath = path.join(__dirname, "./frontend/build")
console.log(path.resolve(filePath))

const filePathTwo = path.join(__dirname, "./frontend/build/index.html")
console.log(path.resolve(filePathTwo))

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;