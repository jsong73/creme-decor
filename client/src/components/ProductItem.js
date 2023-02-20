import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({
    _id,
    image,
    productName,
    price
}) => {
// console.log(_id)
// console.log(image)
// console.log(productName)
// console.log(price)

const style = {
    width:500,
}

return(
    <div>
            <Link to={`products/${_id}`}>
            <img 
            alt={productName}
            src={`/images/${image}`}
            style={style}
            />
            <h1> {productName} </h1>
            </Link>

            <div>${price}</div>
    </div>
)
}
export default ProductItem;