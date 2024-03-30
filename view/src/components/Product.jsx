import { useFetcher, useLoaderData, useParams } from "react-router-dom";

const Product = ({ product = useLoaderData() }) => {
  const { productId } = useParams();
  const isProductPage = productId ? true : false;
  const fetcher = useFetcher();

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
      {isProductPage && (
        <fetcher.Form method="POST">
          <button disabled={fetcher.state !== "idle"}>Add to Cart</button>
        </fetcher.Form>
      )}
    </>
  );
};

export default Product;
