const mysql = require("mysql");

module.exports = () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    database: 'gke',
    password: "telus2022",
  });
};
