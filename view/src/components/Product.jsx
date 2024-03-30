import { useLoaderData, useParams } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

const Product = ({ product = useLoaderData() }) => {
  const { productId } = useParams();
  const isProductPage = productId ? true : false;

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
      {isProductPage && <AddToCartButton />}
    </>
  );
};

export default Product;
