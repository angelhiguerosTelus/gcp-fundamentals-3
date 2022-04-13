// Passport
const passport = require("passport");
const response = require("../network/responses");

// BD
const dbconnection = require("../configs/bd");
const connection = dbconnection();

const getUsers = async () => {
  return new Promise((resolve, reject) => {
    let sql = "select * from users";
    connection.query(sql, (err, res) => {
      if (err) reject(err);

      resolve(res);
    });
  });
};

const getUserByUser = async (filter = "1") => {
  return new Promise((resolve, reject) => {
    let sql = `select * from users where ${filter}`;
    connection.query(sql, (err, res) => {
      if (err) reject(err);

      resolve(res);
    });
  });
};

const singIn = (req, res, next) => {
  passport.authenticate("local", (err, usuario, info) => {
    if (err) {
      next(err);
    }
    if (!usuario) {
      return response.error(
        req,
        res,
        "The email or password is not valid",
        401,
        "The email or password is not valid"
      );
    }
    req.logIn(usuario[0], (err) => {
      if (err) {
        next(err);
      }
      response.success(req, res, usuario[0], 200);
    });
  })(req, res, next);
};

const addUser = ({ username, name, password, rol }) => {
  return new Promise((resolve, reject) => {
    let sql = `insert into users (username, name, password, rol) values ('${username}', '${name}', '${password}', ${rol})`;
    connection.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const updateUserPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE users SET password = '${password}' WHERE username = '${username}'`;
    connection.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const updateUser = (user, { username, name, password, rol }) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE users SET username = '${username}', name = '${name}', rol = '${rol}' WHERE username = '${user}'`;
    connection.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const removeUser = (username) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM users WHERE username ='${username}'`;
    connection.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

module.exports = {
  getUsers,
  getUserByUser,
  addUser,
  singIn,
  updateUserPassword,
  updateUser,
  removeUser
};
