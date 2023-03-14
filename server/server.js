const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const fs = require('fs');
// import type defs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const config = require('./utils/oauth');
const passport = require('passport');
const fbAuth = require('./utils/authentication');
const { User } = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log('SerializeUser: ' + user._id);
  done(null, user._id)
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    console.log(user);
    if (!err) {
      done(null, user);
    } else {
      done(err, null)
    }
  })
});

app.get('/auth/facebook', passport.authenticate('facebook'), function (req, res) { });
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function (req, res) { res.redirect('/') });

//default value is 'development', unless it is set to something else.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
// console.log('Runtime:', process.env.NODE_ENV);
// apparently, when using modern frontend frameworks/libs like react or angular, this handler code isnt needed bc it already does this by default; we can test later
app.get("*", (req, res) => {
  res.sendFile("../client/build/index.html");
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(
        `GraphQL server running on port http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};
startApolloServer(typeDefs, resolvers);