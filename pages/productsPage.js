import { PRODUCT_URL } from "../api/api";

export function productsPage() {
  const container = document.getElementById('app');
  const header = '<div class="container mx-auto py-8"><h1 h1 class="text-4xl font-bold text-center text-gray-800 mb-8" > Our Products</h1 ><div id="products-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"></div></div>';
  container.appendChild(header);
}

async function fetchProducts() {
  try {
    const response = await axios.get(PRODUCT_URL);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow-lg p-6';

  const img = document.createElement('img');
  img.src = product.imgUrl;
  img.alt = product.name;
  img.className = 'w-full h-48 object-cover rounded-t-lg';

  const name = document.createElement('h2');
  name.textContent = product.name;
  name.className = 'mt-4 text-xl font-semibold text-gray-800';

  const price = document.createElement('p');
  price.textContent = `Price: $${(product.price / 100).toFixed(2)}`;
  price.className = 'mt-2 text-gray-600';

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(price);

  return card;
}

async function displayProducts() {
  const productsContainer = document.getElementById('products-container');
  const products = await fetchProducts();

  // biome-ignore lint/complexity/noForEach: <explanation>
  products.forEach(product => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
}