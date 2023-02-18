const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Order, Category } = require("../models");

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate("orders");
        },
        //find a single user
        user: async (parent, { email }) => {
            return User.findOne({ email }).populate("orders");
        },
    }
}

module.exports = resolvers;