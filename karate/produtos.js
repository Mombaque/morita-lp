import { renderCatalogUnavailable, renderProducts } from '../render-products.js';
import { fetchPublicCatalogProducts } from '../src/public-catalog-api.js';
import { MODALITY } from '../src/product-catalog-constants.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const karateProducts = await fetchPublicCatalogProducts({ modality: MODALITY.karate });
    renderProducts(karateProducts, 'products', { detailBasePath: '../produto/', preserveOrder: true });
  } catch (error) {
    console.error(error);
    renderCatalogUnavailable('products');
  }
});
