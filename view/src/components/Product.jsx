import {
  Form,
  useLoaderData,
  useNavigation,
  useParams,
} from "react-router-dom";

const Product = ({ product = useLoaderData() }) => {
  const { productId } = useParams();
  const isProductPage = productId ? true : false;
  const navigation = useNavigation();

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
        <Form method="POST">
          <button disabled={navigation.state !== "idle"}>Add to Cart</button>
        </Form>
      )}
    </>
  );
};

export default Product;
