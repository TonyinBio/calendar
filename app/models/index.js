const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:fhDTTKRBL0RgaEKFeCfb@containers-us-west-73.railway.app:6572/railway", {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectModule: require("mysql2"),
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.demos = require("./demo.model.js")(sequelize, Sequelize)
db.events = require("./event.model.js")(sequelize, Sequelize)

// ** WILL EVENTUALLY NEED TABLE OF PARTNERS
db.demos.hasMany(db.events, {as: "events"})
db.events.belongsTo(db.demos, {
    foreignKey: "demoId",
    as: "demo"
})

module.exports = db