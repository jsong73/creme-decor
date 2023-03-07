import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
     <Link to="/">  <h1 id="home-name" className="mt-10 text-6xl justify-center text-center drop-shadow-2xl"> Créme Decor. </h1> </Link>

       <CategoryMenu />
        <ProductList />
    </div>
  );
};

export default Home;
