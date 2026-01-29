import { renderProducts } from '../render-products.js';
import { produtosJiuJitsu } from '../produtos-jiu-jitsu.js';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(produtosJiuJitsu, 'products');
});
