import { Link, useLoaderData } from "react-router-dom";
import Product from "../../components/Product";
import "./Products.css";

const Products = () => {
  const productList = useLoaderData();

  return (
    <>
      <h1>Products</h1>
      <main className="products-container">
        {productList.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
              <Product key={product.id} product={product} />
            </Link>
          </div>
        ))}
      </main>
    </>
  );
};

export default Products;
