import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
        token
        user{
            _id
        }
    }
}`

export const ADD_ORDER = gql`
mutation addOrder($products: [ID]!){
    addOrder(products: $products) {
        purchaseDate
        products {
            _id
            productName
            description
            price
            quantity
            category {
                categoryName
            }
        }
    }
}
`;