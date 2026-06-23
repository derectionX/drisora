const API_URL = "http://127.0.0.1:8000";

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();

  console.log("API RAW:", data);

  return data.map((product: any) => ({
    id: String(product.id),
    name: product.name,
    price: product.price,
    category: product.category,
    image: product.image_url,
    visible: true,
  }));
}

export async function addProduct(product: any) {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response.json();
}

export async function deleteProduct(id: number) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  return response.json();
}

export async function updateProduct(id: number, product: any) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response.json();
}

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return response.json();
}