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
    <div className="6407a031957cdbb0e04d2e6b">
      <Link to="/">  <h1 id="home-name" className="mt-3 text-6xl drop-shadow-2xl"> Créme Decor. </h1> </Link>

   <div className="mt-4 mb-4">
       <Link id="back-nav" to="/"> Back to Products</Link>

       <h1 id="detail-product" className="mt-4"> {currentProduct.productName} </h1>

       </div>

      <img 
        className="mx-auto"
        src={`/images/${currentProduct.image}`}
        alt={currentProduct.productName} 
        style={style}
      />

      <div id="detail-font" className="mt-4 space-y-3">

      <div> {currentProduct.description}</div>

      <div>
            <p> ${currentProduct.price} </p>
            <p className="underline"> {currentProduct.quantity} left in stock</p>
            

            <button className="mt-4 mr-4" onClick= {() => {addToCart() ; openModal()}}> Add to Cart </button>
            
            <button 
              className="mt-4 "
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick= {removeFromCart}> 
            Remove from Cart
            </button>

      </div>
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
