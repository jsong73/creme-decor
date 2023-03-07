import React , {useState , useEffect } from "react";
import { useQuery } from "@apollo/client";
import { UPDATE_PRODUCTS , UPDATE_CART_QUANTITY, ADD_TO_CART, REMOVE_FROM_CART } from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { useStoreContext } from "../utils/GlobalState";
import { useParams , Link } from "react-router-dom"
import { idbPromise } from "../utils/helpers"
import Cart from "../components/Cart";
import Modal from "react-modal";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const Detail = () => {

  const [modalIsOpen, setIsOpen] = useState(false);
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { data } = useQuery(QUERY_PRODUCTS);

  const { products , cart} = state;

  useEffect(() => {
    if(products.length) {
      setCurrentProduct(products.find((product) => product._id === id ));
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
    }
  }, [products, data, dispatch, id]);

  const style = {
    width:600,
  } 

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if(itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", {...currentProduct, purchaseQuantity: 1 })
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise("cart", "delete", {...currentProduct });
  };


  return (
    <div>
      <Link to="/">  <h1 id="home-name" className="mt-5 text-6xl justify-center text-center drop-shadow-2xl"> Créme Decor. </h1> </Link>

       <Link to="/"> Back to Products</Link>

       <h1> {currentProduct.productName} </h1>

      <img 
        src={`/images/${currentProduct.image}`}
        alt={currentProduct.productName} 
        style={style}
      />

      <div> {currentProduct.description}</div>


      <div>
            <p> ${currentProduct.price} </p>
            <p> {currentProduct.quantity} left in stock</p>
            <button onClick= {() => {addToCart() ; openModal()}}> Add to Cart </button>
            <button 
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick= {removeFromCart}> 
            Remove from Cart
            </button>
      </div>

      <Modal
          id="modal"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="shopping cart">
      <Cart />

      </Modal>

    </div>
  );
};

export default Detail;
