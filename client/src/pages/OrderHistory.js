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
    textAlign: "center",
    fontSize: "30px",
}

  if(!user) {
  return <div style={style}>No orders placed as of yet!</div>
  
  }

  return (
    <div>
          <Link to="/"> Back to Products</Link>
          { user ? (
            <>
            <h1>
              Order History for {user.firstName} {user.lastName}
            </h1>
            {user.orders.map((order) => (
              <div key={order._id}>
                  <h2>
                    {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                  </h2>

              {order.products.map(({_id, image, productName, price}, index ) => (
                <div key={index}>
                        <Link to={`/products/${_id}`}>
                          <img alt={productName} src={`/images/${image}`} />
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
