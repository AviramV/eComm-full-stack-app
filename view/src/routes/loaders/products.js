const serverURL = import.meta.env.VITE_SERVER_BASE_URL;

export async function getProducts() {
  const products = await fetch(`${serverURL}/products`);
  if (products.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No products found",
    });
  }
  return products;
}
