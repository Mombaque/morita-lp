function shuffle(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function getImage(carouselId, isNext) {
    const imgs = document.querySelectorAll(`#${carouselId} .carousel-img`);
    if (imgs.length === 0) return;
    let current = [...imgs].findIndex(img => img.classList.contains("active"));
    if (current === -1) current = 0; 

    imgs[current].classList.remove("active");
    let index = isNext
        ? (current + 1) % imgs.length
        : (current - 1 + imgs.length) % imgs.length;
    imgs[index].classList.add("active");
}

window.getImage = getImage;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getProductName(product) {
  return product.name || product.nome;
}

function getProductDescription(product) {
  return product.description || product.descricao;
}

function getProductImages(product) {
  const firstVariantImages = product.colorVariants?.[0]?.images || [];
  return product.imagens || firstVariantImages;
}

function renderProductMeta(product) {
  if (!product.slug) return '';

  const colors = product.availableColors?.slice(0, 4).join(', ');
  const sizes = product.availableSizes?.slice(0, 6).join(', ');

  return `
    <div class="product-meta">
      <span>${escapeHtml(product.category)}</span>
      <span>${escapeHtml([product.brand, product.model].filter(Boolean).join(' · '))}</span>
    </div>
    <strong class="product-price">${escapeHtml(product.price)}</strong>
    ${colors ? `<p class="product-summary"><strong>Cores:</strong> ${escapeHtml(colors)}${product.availableColors.length > 4 ? '...' : ''}</p>` : ''}
    ${sizes ? `<p class="product-summary"><strong>Tamanhos:</strong> ${escapeHtml(sizes)}${product.availableSizes.length > 6 ? '...' : ''}</p>` : ''}
  `;
}

function renderPlaceholder(productName) {
  return `<div class="carousel-img active product-image-placeholder" role="img" aria-label="Imagem em breve para ${escapeHtml(productName)}">Imagem em breve</div>`;
}

export function renderProducts(products, containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id '${containerId}' not found.`);
    return;
  }

  container.innerHTML = '';
  const trackingCategory = container.dataset.trackCategory || 'products';

  const visibleProducts = options.preserveOrder ? products : shuffle(products);

  visibleProducts.forEach((p, index) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
      const productName = getProductName(p);
      const productDescription = getProductDescription(p);
      const productUrl = p.slug ? `${options.detailBasePath || '../produto/'}?slug=${encodeURIComponent(p.slug)}` : null;
   
      const carouselId = `carousel-${productName.replace(/[^\w-]/g, '')}-${index}`;
   
      const imagens = shuffle(getProductImages(p));
   
      let carouselImgs = "";
      if (imagens.length === 0) {
        carouselImgs = renderPlaceholder(productName);
      } else {
        imagens.forEach((img, i) => {
          carouselImgs += `
            <img src="${escapeHtml(img)}" alt="${escapeHtml(p.alt || productName)}" class="carousel-img ${i === 0 ? "active" : ""}" data-index="${i}">
          `;
        });
      }
   
      productDiv.innerHTML = `
        <div class="carousel" id="${carouselId}">
          ${carouselImgs}
          ${imagens.length > 1 ? `
          <button class="prev" onclick="getImage('${carouselId}', false)">&#10094;</button>
          <button class="next" onclick="getImage('${carouselId}', true)">&#10095;</button>
          ` : ''}
        </div>
        ${renderProductMeta(p)}
        <h3>${escapeHtml(productName)}</h3>
        <p>${escapeHtml(productDescription)}</p>
        ${productUrl ? `
          <a class="product-cta" href="${productUrl}" aria-label="Ver detalhes de ${escapeHtml(productName)}" data-track-event="product_detail_click" data-track-category="${trackingCategory}" data-track-selected-category="${escapeHtml(productName)}">
            <i class="fas fa-eye"></i>
            Ver detalhes
          </a>
        ` : `
          <button class="product-cta" type="button" aria-label="Consultar disponibilidade de ${escapeHtml(productName)}" data-request-open data-track-event="customer_product_request_open" data-track-category="${trackingCategory}" data-track-selected-category="${escapeHtml(productName)}">
            <i class="fas fa-magnifying-glass"></i>
            Consultar disponibilidade
          </button>
        `}
      `;
   
      container.appendChild(productDiv);
  });
}

export function bindProductFilters({ products, filters, containerId, filterContainerId, detailBasePath }) {
  const filterContainer = document.getElementById(filterContainerId);
  if (!filterContainer) return;

  filterContainer.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest('[data-product-filter]');
    if (!button) return;

    const filterKey = button.dataset.productFilter;
    const filter = filters.find(item => item.key === filterKey);
    const filteredProducts = filter?.predicate ? products.filter(filter.predicate) : products;

    filterContainer.querySelectorAll('[data-product-filter]').forEach(item => {
      item.classList.toggle('active', item === button);
    });

    renderProducts(filteredProducts, containerId, { detailBasePath, preserveOrder: true });
  });
}
