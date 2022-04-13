const express = require("express");
const router = express.Router();
const passportConfig = require("../middelwares/passport");

const response = require("../network/responses");
const { getUsers, addUser, singIn, updateUserPassword, updateUser, removeUser } = require("./controller");

// AUTH ----------------------------
// Sing in
router.post("/auth", singIn);

// Get login state
router.get("/auth", passportConfig.isAuthenticated, (req, res) => {
  response.success(req, res, "User is logged", 200);
});

// Sign out
router.delete("/auth", passportConfig.isAuthenticated, (req, res) => {
  req.logOut();
  response.success(req, res, "User Loggout", 200);
});

// USERS ----------------------------
// Create new user
router.post("/", (req, res) => {
  let data = req.body;

  addUser(data)
    .then((val) => response.success(req, res, val, 200))
    .catch((err) => response.success(req, res, err, 500));
});

// Get users (only admins)
router.get("/", passportConfig.isAuthenticated, (req, res) => {
  let rol = req.user[0].rol;

  if (rol === 2) {
    getUsers()
      .then((val) => response.success(req, res, val, 200))
      .catch((err) => response.error(req, res, err, 500));
  } else {
    response.error(req, res, "Only admin user can get user list", 403);
  }
});

// Change password
router.patch("/", passportConfig.isAuthenticated, (req, res) => {
  let data = req.body;
  let username = req.user[0].username;
  updateUserPassword(username, data.password)
    .then((val) => response.success(req, res, 'User password updated', 200))
    .catch((err) => response.success(req, res, err, 500));
});


// Change user information
router.put("/", passportConfig.isAuthenticated, (req, res) => {
  let data = req.body;
  let username = req.user[0].username;
  updateUser(username, data)
    .then((val) => response.success(req, res, 'User info updated', 200))
    .catch((err) => response.success(req, res, err, 500));
});

// Change user information
router.delete("/", passportConfig.isAuthenticated, (req, res) => {
  let username = req.user[0].username;
  removeUser(username)
    .then((val) => response.success(req, res, 'User deactivated', 200))
    .catch((err) => response.success(req, res, err, 500));
});


module.exports = router;
