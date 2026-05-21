import { produtosJiuJitsu } from "./produtos-jiu-jitsu.js";
import { produtosMuayThai } from "./produtos-muay-thai.js";

const jiuJitsuCopy = produtosJiuJitsu.map(p => ({ ...p, imagens: [...p.imagens] }));
const muayThaiCopy = produtosMuayThai.map(p => ({ ...p, imagens: [...p.imagens] }));

const fixedFirstImage = '/images/kimono/adulto/itg-azul.jpg';

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalizeImagePath(image) {
  return image.replace(/^\.\.\/public\/images\//, '/images/').replace(/^public\/images\//, '/images/');
}

function getRandomProductsExcluding(products, count, excludeImage, categoryName, categoryUrl) {
  const allImages = products
    .flatMap(product => product.imagens.map(image => ({ image: normalizeImagePath(image), categoryName, categoryUrl })))
    .filter(product => product.image !== excludeImage);

  return shuffleArray(allImages).slice(0, count);
}

const selectedJiuJitsuProducts = getRandomProductsExcluding(jiuJitsuCopy, 4, fixedFirstImage, 'Jiu-Jitsu', 'jiu-jitsu/');
const selectedMuayThaiProducts = getRandomProductsExcluding(muayThaiCopy, 4, fixedFirstImage, 'Muay Thai', 'muay-thai/');
const randomSelectedProducts = shuffleArray([...selectedJiuJitsuProducts, ...selectedMuayThaiProducts]);

const allSelectedProducts = [
  { image: fixedFirstImage, categoryName: 'Jiu-Jitsu', categoryUrl: 'jiu-jitsu/' },
  ...randomSelectedProducts,
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById("random-carousel-container");
  if (!container) return;

  const carouselImgsHtml = allSelectedProducts.map((product, index) => `
    <a href="${product.categoryUrl}" class="random-carousel-slide ${index === 0 ? 'active' : ''}" data-track-event="category_navigation_click" data-track-category="home-carousel" data-track-selected-category="${product.categoryName.toLowerCase().replace(' ', '-')}">
      <img src="${product.image}" class="random-carousel-img" alt="Produto de ${product.categoryName} Morita Fitness">
      <span class="random-carousel-caption">
        <span>${product.categoryName}</span>
        <strong>Ver produtos</strong>
      </span>
    </a>
  `).join('');

  container.innerHTML = `
    <section class="random-products-section" aria-labelledby="random-products-title">
      <p class="eyebrow">Produtos em destaque</p>
      <h2 id="random-products-title">Um giro pelo catálogo Morita</h2>
      <div class="random-carousel">
        ${carouselImgsHtml}
        <button class="random-carousel-btn prev" type="button" onclick="navigateRandomCarousel(-1)" aria-label="Produto anterior">&#10094;</button>
        <button class="random-carousel-btn next" type="button" onclick="navigateRandomCarousel(1)" aria-label="Próximo produto">&#10095;</button>
      </div>
    </section>
  `;
});

let currentRandomImageIndex = 0;

function navigateRandomCarousel(direction) {
  const slides = document.querySelectorAll('.random-carousel-slide');
  if (!slides.length) return;

  slides[currentRandomImageIndex].classList.remove('active');
  currentRandomImageIndex = (currentRandomImageIndex + direction + slides.length) % slides.length;
  slides[currentRandomImageIndex].classList.add('active');
}

window.navigateRandomCarousel = navigateRandomCarousel;
