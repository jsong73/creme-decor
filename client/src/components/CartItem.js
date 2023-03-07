import React from "react";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import { idbPromise } from "../utils/helpers";

const CartItem = ({ item }) => {

    const style = {
        width:200,
    }
    
    const [ state, dispatch ] = useStoreContext();
    
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

    console.log(state)

    return(
        <div>
            <img
                className="mx-auto"
                src={`/images/${item.image}`}
                alt={item.image}
                style={style}
            />

            <div> {item.productName} </div>
            <p>${item.price}</p>

            <span> Qty: </span>
            <input
            className="border w-5px"
             type="number"
             placeholder="1"
             value={item.purchaseQuantity}
             onChange={handleChange}
             />

             <button onClick={() => removeFromCart(item)}> X
             </button>


        </div>
    )
}

export default CartItem;