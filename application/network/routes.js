const users = require("../components/users");

const routes = (server) => {
  server.use("/api/users", users);
};

module.exports = routes;
