import { renderProducts } from '../render-products.js';
import { produtosJiuJitsu } from '../src/produtos-jiu-jitsu.js';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(produtosJiuJitsu, 'products');
});
