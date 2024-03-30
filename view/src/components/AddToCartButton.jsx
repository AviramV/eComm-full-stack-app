import { useFetcher } from "react-router-dom";

const AddToCartButton = () => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="POST">
      <button disabled={fetcher.state !== "idle"}>Add to Cart</button>
    </fetcher.Form>
  );
};

export default AddToCartButton;
