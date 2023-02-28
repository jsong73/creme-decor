import React from "react";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import { idbPromise } from "../utils/helpers";

const CartItem = ({ item }) => {

    const [state, dispatch ] = useStoreContext();
    
    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });

        idbPromise("cart" , "delete", {...item });
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if(value === "0") {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });

            idbPromise("cart", "delete", {...item });
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });

            idbPromise("cart", "put", {...item, purchaseQuantity: parseInt(value)});
        }
    }

    return(
        <div>
            <img
                src={`/images/${item.image}`}
                alt={item.image}
            />

            <div> {item.name}, ${item.price}</div>

            <span> Quantity: </span>
            <input
             type="number"
             placeholder="1"
             value={item.purchaseQuantity}
             onChange={handleChange}
             />

             <div onClick={() => removeFromCart(item)}>  
             </div>


        </div>
    )
}

export default CartItem;