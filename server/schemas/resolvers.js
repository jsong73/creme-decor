const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Order, Category } = require("../models");

const resolvers = {
    Query: {
        //finding all users
        users: async () => {
            return User.find().populate("orders");
        },
        //find a single user
        user: async (parent, { email }) => {
            return User.findOne({ email }).populate("orders");
        },
        order: async (parent, { orderId }, context) => {
            return Order.findOne({ _id: orderId }).populate("products")
        }
    }
}

module.exports = resolvers;