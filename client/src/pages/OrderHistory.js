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
    <div className="6407a031957cdbb0e04d2e6b">
          <Link to="/"> Back to Products</Link>
          { user ? (
            <>
            <h1>
            Your order history
            </h1>
            {user.orders.map((order) => (
              <div key={order._id}>
                  <h2>
                    Purchase made on {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                  </h2>

              {order.products.map(({_id, image, productName, price}, index ) => (
                <div key={index}>
                        <Link to={`/products/${_id}`}>
                          <img alt={productName} src={`/images/${image}`} style={style}/>
                          <p>{productName}</p>
                      </Link>
                      <div> ${price}</div>
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
