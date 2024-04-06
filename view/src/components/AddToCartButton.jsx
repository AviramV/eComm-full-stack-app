import { useFetcher } from "react-router-dom";

const AddToCartButton = () => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="POST">
      <button disabled={fetcher.state !== "idle"}>Add to Cart</button>
      {fetcher.data?.message && fetcher.state === "idle" && (
        <span>{fetcher.data.message}</span>
      )}
    </fetcher.Form>
  );
};

export default AddToCartButton;
