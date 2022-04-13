const passport = require("passport");
const { getUserByUser } = require("../components/controller");
const LocalStrategy = require("passport-local").Strategy;
const response = require("../network/responses");

passport.serializeUser((usuario, done) => {
  done(null, usuario.username);
});

passport.deserializeUser((username, done) => {
  getUserByUser(`username = '${username}'`)
    .then((usuario) => {
      done(false, usuario);
    })
    .catch((err) => {
      done(err, {});
    });
});

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    (username, password, done) => {
      getUserByUser(`username = '${username}'`)
        .then((usuario) => {
          if (usuario == "") {
            return done(null, false, {
              message: `Not found  '${username}' user`,
            });
          } else {
            if (usuario[0].password == password) {
              return done(null, usuario);
            } else {
              return done(null, false, {
                message: `The password is not valid`,
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  )
);

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return response.error(
    req,
    res,
    "You must loggin to access to this resource",
    401,
    "You must loggin to access to this resource"
  );
};
