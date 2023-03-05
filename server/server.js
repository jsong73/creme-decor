const express = require("express");
const app = express();
const db = require("./config/connection")
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const PORT = process.env.PORT || 3004;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });


db.once("open", () => {
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    });
});
};

startApolloServer(typeDefs, resolvers);