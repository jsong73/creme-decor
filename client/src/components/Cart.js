import { useLazyQuery } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState"
import { QUERY_CHECKOUT } from "../utils/queries";

const Cart = () => {
    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    
}