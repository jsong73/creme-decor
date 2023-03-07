import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_USER } from "../utils/queries";
import { Link } from "react-router-dom"

const OrderHistory = () => {
  const {data} = useQuery(QUERY_USER);
  let user;

  if(data) {
    user = data.user;
  }

  const style = {
    width:500,
  }



  return (
    <div className="justify-center text-center ">
          <Link to="/">  <h1 id="home-name" className="mt-3 text-6xl drop-shadow-2xl"> Créme Decor. </h1> </Link>
            
            <Link id="back-page" to="/"> Back to Products</Link>
            { user ? (
              <>
              
              <h1 id="order-history" className="mt-4 underline">
                Your order history
              </h1>

              
            {user.orders.map((order) => (
              <div key={order._id}>
                  <h2 className="mt-4" id="purchase-date">
                    Purchase made on {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                  </h2>

              {order.products.map(({_id, image, productName, price}, index ) => (
                <div key={index}>
                        <Link to={`/products/${_id}`}>
                          <img 
                            className="mx-auto"
                            alt={productName} 
                            src={`/images/${image}`} 
                            style={style}/>
                          <p className="mt-4 space-y-3" id="history-name">{productName}</p>
                      </Link>
                      <div id="history-price"> ${price}</div>
                </div>
              ))}

              </div>
            ))}
          
            </>
          ) : null }
      
    </div>
  );
};

export default OrderHistory;
