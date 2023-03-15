const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
require('dotenv').config();
// import type defs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
        `Use GraphQL server running on port http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};
startApolloServer(typeDefs, resolvers);