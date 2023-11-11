const API_BASE_URL = "https://654cd24677200d6ba8597d80.mockapi.io";

// GET
export async function getAllProducts() {
  const { data } = await axios.get(`${API_BASE_URL}/products`);

  return data;
}

// GET by ID
export async function getProductById(id) {
  const { data } = await axios.get(`${API_BASE_URL}/products/${id}`);

  return data;
}
