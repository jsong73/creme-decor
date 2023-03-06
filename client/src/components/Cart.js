import { useLazyQuery } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_CHECKOUT } from "../utils/queries";
import React , {useEffect } from "react";
import { idbPromise } from "../utils/helpers";
import { ADD_MULTIPLE_TO_CART } from "../utils/actions";
import Auth from "../utils/auth";
import { loadStripe } from "@stripe/stripe-js";
import CartItem from "../components/CartItem";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);


    useEffect(() => {
        if(data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        async function getCart () {
            const cart = await idbPromise("cart", "get");
            dispatch({type: ADD_MULTIPLE_TO_CART, products: [...cart]});
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);
    

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function handleCheckout() {
        const productIds = [];

        state.cart.forEach((item) => {
            for(let i = 0; i < item.purchaseQuantity; i++){
                productIds.push(item._id);
            }
        });

        getCheckout({
            variables: { products: productIds },
        });
    }

  return(
    <div>

    <h1>Cart</h1>

    {state.cart.length ? (
        <div>
            {state.cart.map((item) => (
                <CartItem key={item._id} item={item} />
            ))}

            <p> Subtotal: ${calculateTotal()}</p>

            {Auth.loggedIn() ? (
                <button onClick={handleCheckout}>Checkout</button>
            ) : (
                <p> Please log in to checkout </p>
            )}
            </div>
    ) : (

        <div> Nothing in your cart as of yet! </div> 
    )}


    </div>
  )}

export default Cart;