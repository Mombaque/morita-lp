import { API_BASE_URL } from './api-config.js';

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    const error = new Error(`Public catalog request failed with ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function fetchPublicCatalogProducts(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  const query = params.toString();
  return fetchJson(`/v1/PublicCatalog/products${query ? `?${query}` : ''}`);
}

export async function fetchPublicCatalogProduct(slug) {
  return fetchJson(`/v1/PublicCatalog/products/${encodeURIComponent(slug)}`);
}

export async function fetchRelatedPublicCatalogProducts(slug, limit = 4) {
  return fetchJson(`/v1/PublicCatalog/products/${encodeURIComponent(slug)}/related?limit=${encodeURIComponent(limit)}`);
}
