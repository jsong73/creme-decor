import React, {useEffect} from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_PRODUCTS } from "../utils/queries"
import { UPDATE_PRODUCTS } from "../utils/actions";
import ProductItem from "../components/ProductItem"

function ProductList() {
    const [state, dispatch] = useStoreContext();
    const { currentCategory } = state;

    const { data } = useQuery(QUERY_PRODUCTS);

    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });
        }
    }, [data, dispatch]);

    function filterProducts() {
        if(!currentCategory){
            return state.products;
        }

        return state.products.filter(
            (product) => product.category._id === currentCategory
        );
    }

    return(
        <div>
            <div>
                {filterProducts().map((product) => (
                    <ProductItem 
                    key={product._id}
                    _id={product._id}
                    image={product.image}
                    productName={product.productName}
                    price={product.price}
                    quantity={product.quantity}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductList;