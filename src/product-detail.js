import { getProductBySlug, getRelatedProducts } from './product-catalog.js';

const WHATSAPP_PHONE = '5515981079332';

const state = {
  product: null,
  selectedVariant: null,
  selectedSize: null,
  imageIndex: 0,
};

document.addEventListener('DOMContentLoaded', () => {
  const slug = new URLSearchParams(window.location.search).get('slug');
  const product = getProductBySlug(slug);

  if (!product) {
    renderNotFound();
    return;
  }

  state.product = product;
  state.selectedVariant = product.colorVariants[0] || null;
  state.selectedSize = product.availableSizes[0] || null;
  renderProductDetail();
  bindProductDetailEvents();
});

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderNotFound() {
  document.getElementById('product-detail-root').innerHTML = `
    <section class="product-not-found">
      <p class="eyebrow">Produto não encontrado</p>
      <h1>Não encontramos esse produto.</h1>
      <p>Confira o catálogo de Jiu-Jitsu ou fale com a Morita pelo WhatsApp.</p>
      <div class="hero-actions">
        <a class="button request-hero-cta" href="../jiu-jitsu/">Voltar para Jiu-Jitsu</a>
        <a class="button whatsapp primary-cta" href="https://wa.me/c/${WHATSAPP_PHONE}" target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
      </div>
    </section>
  `;
}

function renderProductDetail() {
  const product = state.product;
  const relatedProducts = getRelatedProducts(product);

  document.title = `${product.name} | Morita Fitness`;
  document.getElementById('product-detail-root').innerHTML = `
    <nav class="breadcrumb" aria-label="Caminho do produto">
      <a href="../">Início</a>
      <span>/</span>
      <a href="${getModalityUrl(product)}">${escapeHtml(product.modality)}</a>
      <span>/</span>
      <span>${escapeHtml(product.name)}</span>
    </nav>

    <section class="product-detail-layout">
      <div class="product-detail-gallery">
        ${renderCarousel()}
      </div>

      <article class="product-detail-info">
        <p class="eyebrow">${escapeHtml(product.modality)} / ${escapeHtml(product.category)}</p>
        <h1>${escapeHtml(product.name)}</h1>
        <strong id="product-detail-price" class="detail-price">${escapeHtml(getSelectedPrice())}</strong>

        <dl class="product-specs">
          <div><dt>Marca</dt><dd>${escapeHtml(product.brand || 'Consultar')}</dd></div>
          <div><dt>Modelo</dt><dd>${escapeHtml(product.model || 'Consultar')}</dd></div>
          <div><dt>Público</dt><dd>${escapeHtml(product.audience)}</dd></div>
          <div><dt>Tecido</dt><dd>${escapeHtml(product.fabricType || 'Consultar')}</dd></div>
          <div><dt>Gramatura</dt><dd>${product.weightGsm ? `${escapeHtml(product.weightGsm)}gsm` : 'Consultar'}</dd></div>
        </dl>

        ${renderColorSelector()}
        ${renderSizeSelector()}

        <p class="product-detail-description">${escapeHtml(product.description)}</p>
        <ul class="product-detail-list">
          ${product.details.map(detail => `<li>${escapeHtml(detail)}</li>`).join('')}
        </ul>

        <div class="product-detail-actions">
          <a id="product-whatsapp-cta" class="button whatsapp primary-cta" href="${getWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" data-track-event="whatsapp_product_click" data-track-category="product-detail" data-track-selected-category="${escapeHtml(product.name)}">
            <i class="fas fa-phone"></i>
            Consultar no WhatsApp
          </a>
          <button class="button request-hero-cta" type="button" data-request-open data-track-event="customer_product_request_open" data-track-category="product-detail" data-track-selected-category="${escapeHtml(product.name)}">
            <i class="fas fa-magnifying-glass"></i>
            Encontrar meu tamanho
          </button>
        </div>
      </article>
    </section>

    <section class="related-products" aria-labelledby="related-products-title">
      <p class="eyebrow">Continue olhando</p>
      <h2 id="related-products-title">Produtos relacionados</h2>
      <div class="related-products-grid">
        ${relatedProducts.map(renderRelatedProduct).join('')}
      </div>
    </section>
  `;
}

function renderCarousel() {
  const images = getSelectedImages();

  if (images.length === 0) {
    return `
      <div class="detail-carousel">
        <div class="detail-image-placeholder">Imagem em breve</div>
      </div>
    `;
  }

  return `
    <div class="detail-carousel">
      ${images.map((image, index) => `
        <img src="${escapeHtml(image)}" alt="${escapeHtml(state.product.name)}" class="detail-carousel-img ${index === state.imageIndex ? 'active' : ''}">
      `).join('')}
      ${images.length > 1 ? `
        <button class="detail-carousel-btn prev" type="button" data-carousel-direction="-1" aria-label="Imagem anterior">&#10094;</button>
        <button class="detail-carousel-btn next" type="button" data-carousel-direction="1" aria-label="Próxima imagem">&#10095;</button>
      ` : ''}
    </div>
  `;
}

function renderColorSelector() {
  if (state.product.availableColors.length === 0) return '';

  return `
    <section class="detail-selector" aria-label="Cores disponíveis">
      <h2>Cores disponíveis</h2>
      <div class="detail-choice-row">
        ${state.product.availableColors.map(color => `
          <button class="detail-choice ${state.selectedVariant?.color === color ? 'active' : ''}" type="button" data-color="${escapeHtml(color)}">${escapeHtml(color)}</button>
        `).join('')}
      </div>
    </section>
  `;
}

function renderSizeSelector() {
  if (state.product.availableSizes.length === 0) return '';

  return `
    <section class="detail-selector" aria-label="Tamanhos disponíveis">
      <h2>Tamanhos disponíveis</h2>
      <div class="detail-choice-row">
        ${state.product.availableSizes.map(size => `
          <button class="detail-choice ${state.selectedSize === size ? 'active' : ''}" type="button" data-size="${escapeHtml(size)}">${escapeHtml(size)}</button>
        `).join('')}
      </div>
    </section>
  `;
}

function renderRelatedProduct(product) {
  const image = product.colorVariants?.find(variant => variant.images.length > 0)?.images[0];

  return `
    <a class="related-product-card" href="../produto/?slug=${encodeURIComponent(product.slug)}" data-track-event="related_product_click" data-track-category="product-detail" data-track-selected-category="${escapeHtml(product.name)}">
      ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(product.name)}">` : '<div class="related-product-placeholder">Imagem em breve</div>'}
      <span>${escapeHtml(product.category)}</span>
      <strong>${escapeHtml(product.name)}</strong>
      <em>${escapeHtml(product.price)}</em>
    </a>
  `;
}

function bindProductDetailEvents() {
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const colorButton = event.target.closest('[data-color]');
    if (colorButton) {
      selectColor(colorButton.dataset.color);
      return;
    }

    const sizeButton = event.target.closest('[data-size]');
    if (sizeButton) {
      selectSize(sizeButton.dataset.size);
      return;
    }

    const carouselButton = event.target.closest('[data-carousel-direction]');
    if (carouselButton) {
      navigateCarousel(Number(carouselButton.dataset.carouselDirection));
    }
  });
}

function selectColor(color) {
  state.selectedVariant = state.product.colorVariants.find(variant => variant.color === color) || state.product.colorVariants[0];
  state.imageIndex = 0;
  document.querySelector('.product-detail-gallery').innerHTML = renderCarousel();
  document.getElementById('product-detail-price').textContent = getSelectedPrice();
  document.getElementById('product-whatsapp-cta').href = getWhatsAppUrl();
  updateChoiceState('[data-color]', color);
}

function selectSize(size) {
  state.selectedSize = size;
  document.getElementById('product-whatsapp-cta').href = getWhatsAppUrl();
  updateChoiceState('[data-size]', size);
}

function navigateCarousel(direction) {
  const images = getSelectedImages();
  if (images.length === 0) return;

  state.imageIndex = (state.imageIndex + direction + images.length) % images.length;
  document.querySelector('.product-detail-gallery').innerHTML = renderCarousel();
}

function updateChoiceState(selector, selectedValue) {
  document.querySelectorAll(selector).forEach(button => {
    button.classList.toggle('active', button.dataset.color === selectedValue || button.dataset.size === selectedValue);
  });
}

function getSelectedImages() {
  return state.selectedVariant?.images || [];
}

function getSelectedPrice() {
  return state.selectedVariant?.price || state.product.price;
}

function getWhatsAppUrl() {
  const product = state.product;
  const message = [
    `Olá! Tenho interesse no produto ${product.name}.`,
    state.selectedVariant?.color ? `Cor: ${state.selectedVariant.color}.` : '',
    state.selectedSize ? `Tamanho: ${state.selectedSize}.` : '',
    `Preço exibido: ${getSelectedPrice()}.`,
  ].filter(Boolean).join(' ');

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function getModalityUrl(product) {
  if (product.modality === 'Karatê') return '../karate/';
  if (product.modality === 'Jiu-Jitsu') return '../jiu-jitsu/';
  return '../';
}
