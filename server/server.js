const express = require("express");
const app = express();

const db = require("./config/connection")

const PORT = process.env.PORT || 3004;

db.once("open", () => {
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
});
});