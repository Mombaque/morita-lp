import { renderProducts } from '../render-products.js';
import { produtosMuayThai } from '../src/produtos-muay-thai.js';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(produtosMuayThai, 'products');
});
