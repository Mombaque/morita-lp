import { bindProductFilters, renderCatalogUnavailable, renderProducts } from '../render-products.js';
import { fetchPublicCatalogProducts } from '../src/public-catalog-api.js';
import { AUDIENCE, CATEGORY, MODALITY } from '../src/product-catalog-constants.js';

const filters = [
  { key: 'all' },
  { key: 'adult-kimonos', predicate: product => product.category === CATEGORY.kimono && product.audience === AUDIENCE.adult },
  { key: 'kids-kimonos', predicate: product => product.category === CATEGORY.kimono && product.audience === AUDIENCE.kids },
  { key: 'adult-belts', predicate: product => product.category === CATEGORY.belt && product.audience === AUDIENCE.adult },
  { key: 'kids-belts', predicate: product => product.category === CATEGORY.belt && product.audience === AUDIENCE.kids },
];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const jiuJitsuProducts = await fetchPublicCatalogProducts({ modality: MODALITY.jiuJitsu });
    renderProducts(jiuJitsuProducts, 'products', { detailBasePath: '../produto/', preserveOrder: true });
    bindProductFilters({
      products: jiuJitsuProducts,
      filters,
      containerId: 'products',
      filterContainerId: 'product-filters',
      detailBasePath: '../produto/',
    });
  } catch (error) {
    console.error(error);
    renderCatalogUnavailable('products');
  }
});
