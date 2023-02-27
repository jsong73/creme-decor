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
        price: Float
        category: Category
    }

    type Category {
        _id: ID
        categoryName: String
    }

    type Checkout {
        session: ID
      }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        user: User
        order(_id: ID!): Order
        products(category: ID, productName: String): [Product]
        product(_id: ID!): Product
        categories: [Category]
        checkout(products: [ID]!): Checkout
    }

    type Mutation {
        addUser(
            firstName: String!
            lastName: String!
            email: String!
            password: String!
        ): Auth

        updateUser(
            firstName: String
            lastName: String
            email: String
            password: String
        ): User
        
        login(email: String!, password: String!): Auth
        
        addOrder(products: [ID]!
        ): Order

        updateProduct(_id: ID!, quantity: Int!
        ): Product

    }
 
`;

module.exports = typeDefs;