import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu"

const Home = () => {
  return (
    <div>
      <h1>Creme Decor</h1>

       <CategoryMenu />
        <ProductList />
    </div>
  );
};

export default Home;
