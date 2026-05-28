import { bindProductFilters, renderProducts } from '../render-products.js';
import { AUDIENCE, CATEGORY, MODALITY, products } from '../src/product-catalog.js';

const jiuJitsuProducts = products.filter(product => product.modality === MODALITY.jiuJitsu);

const filters = [
  { key: 'all' },
  { key: 'adult-kimonos', predicate: product => product.category === CATEGORY.kimono && product.audience === AUDIENCE.adult },
  { key: 'kids-kimonos', predicate: product => product.category === CATEGORY.kimono && product.audience === AUDIENCE.kids },
  { key: 'adult-belts', predicate: product => product.category === CATEGORY.belt && product.audience === AUDIENCE.adult },
  { key: 'kids-belts', predicate: product => product.category === CATEGORY.belt && product.audience === AUDIENCE.kids },
];

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(jiuJitsuProducts, 'products', { detailBasePath: '../produto/', preserveOrder: true });
  bindProductFilters({
    products: jiuJitsuProducts,
    filters,
    containerId: 'products',
    filterContainerId: 'product-filters',
    detailBasePath: '../produto/',
  });
});
