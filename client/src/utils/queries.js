import { gql } from "@apollo/client";

export const QUERY_USER =gql`
{
    user{
        firstName
        lastName
        orders{
            _id
            purchaseDate
            products{
                _id
                name
                description
                price
                quantity
                image
            }
        }
    }
}
`;

export const QUERY_CATEGORIES = gql`
{
    categories {
        _id
        categoryName
    }
}
`;

export const QUERY_PRODUCTS = gql`
query getProducts($category: ID) {
    products(category: $category) {
        _id
        productName
        description
        image
        price
        quantity
        category{
            _id
        }
    }
}
`;

export const QUERY_ALL_PRODUCTS = gql`
{
    products {
        _id
        productName
        description
        image
        price
        quantity
        category{
            categoryName
        }
    }
}
`;