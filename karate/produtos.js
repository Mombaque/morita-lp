import { renderProducts } from '../render-products.js';
import { MODALITY, products } from '../src/product-catalog.js';

const karateProducts = products.filter(product => product.modality === MODALITY.karate);

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(karateProducts, 'products', { detailBasePath: '../produto/', preserveOrder: true });
});
