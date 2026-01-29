import { renderProducts } from '../render-products.js';
import { produtosMuayThai } from '../produtos-muay-thai.js';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(produtosMuayThai, 'products');
});
