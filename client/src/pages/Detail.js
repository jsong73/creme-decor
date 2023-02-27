import React , {useState , useEffect } from "react";
import { useQuery } from "@apollo/client";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { useStoreContext } from "../utils/GlobalState";
import { useParams , Link } from "react-router-dom"

const Detail = () => {

  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { data } = useQuery(QUERY_PRODUCTS);

  const { products } = state;

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

  console.log(currentProduct)

  return (
    <div>
      
       <Link to="/"> Back to Products</Link>

       <h1> {currentProduct.productName} </h1>

      <img 
        src={`/images/${currentProduct.image}`}
        alt={currentProduct.productName} 
      />

      <div> {currentProduct.description}</div>

      <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button> Add to Cart </button>
            <button> Remove from Cart </button>
          </p>


    </div>
  );
};

export default Detail;
