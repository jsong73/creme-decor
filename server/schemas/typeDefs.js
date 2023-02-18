const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        orders: [Order]
    }

    type Order {
        _id: ID
        purchaseDate: String
        products: [Product]
    }

    type Product {
        _id: ID
        productName: String
        description: String
        image: String,
        quantity: Int
        categories: [Category]
    }

    type Category {
        _id: ID
        categoryName: String
    }

    type Query {
        users: [User]
        user(email: String): User
        order(orderId: ID!): Order
        products: [Product]
        product(productName: String, categoryID: ID!): Product
        categories: [Category]
        me: User
    }
 
`;

module.exports = typeDefs;