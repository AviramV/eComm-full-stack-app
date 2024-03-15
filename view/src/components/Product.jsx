import { useLoaderData } from "react-router-dom";

const Product = ({ product = useLoaderData() }) => {
  return (
    <>
      <img
        loading="lazy"
        src={product.image || "/public/imagePlaceholder.jpg"}
        alt=""
        width={"100%"}
      />
      <h2>{product.name}</h2>
      <p className="product-description">
        {product.description || "Cool product"}
      </p>
      <p className="price">${product.price}</p>
    </>
  );
};

export default Product;
