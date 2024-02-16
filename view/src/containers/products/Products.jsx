import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import "./Products.css";

const Products = () => {
  const productList = useLoaderData();

  return (
    <>
      <h1>Products</h1>
      <main className="products-container">
        {productList.map((product) => (
          <div key={product.id} className="product-card">
            <img
              loading="lazy"
              src={product.image || "imagePlaceholder.jpg"}
              alt=""
              width={"100%"}
            />
            <h2>{product.name}</h2>
            <p className="product-description">
              {product.description || "Cool product"}
            </p>
            <p className="price">${product.price}</p>
          </div>
        ))}
      </main>
    </>
  );
};

export default Products;
