var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var configJson = require("../config/config");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

const config = configJson[env];

const db = {};

let sequelize;
if (true) {
  sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      dialectOption: {
        ssl: true,
        native: true,
      },
      logging: true,
      define: {
        timestamps: false
    }
    }
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
    console.log(db[model.name]);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;
