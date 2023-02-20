import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({
    _id,
    image,
    productName,
    price,
    quantity
}) => {
console.log(_id)
console.log(image)
console.log(productName)
console.log(price)
console.log(quantity)

return(
    <div>
            <Link to={`products/${_id}`}>
            <img 
            alt={productName}
            src={`/images/${image}`}
            />
            <h1> {productName} </h1>
            </Link>

            <div>{quantity}</div>
            <div>${price}</div>
    </div>
)
}
export default ProductItem;