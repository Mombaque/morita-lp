import { produtosJiuJitsu } from "./produtos-jiu-jitsu.js";
import { produtosMuayThai } from "./produtos-muay-thai.js";

const jiuJitsuCopy = produtosJiuJitsu.map(p => ({ ...p, imagens: [...p.imagens] }));
const muayThaiCopy = produtosMuayThai.map(p => ({ ...p, imagens: [...p.imagens] }));

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getRandomImages(products, count) {
  const allImages = products.flatMap(product => product.imagens);
  return shuffleArray(allImages).slice(0, count);
}

const selectedJiuJitsuImages = getRandomImages(jiuJitsuCopy, 5);
const selectedMuayThaiImages = getRandomImages(muayThaiCopy, 5);
const allSelectedImages = shuffleArray([...selectedJiuJitsuImages, ...selectedMuayThaiImages]);

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById("random-carousel-container");
  if (!container) return;

  const carouselImgsHtml = allSelectedImages.map((imgSrc, index) => `
    <img src="${imgSrc}" class="random-carousel-img ${index === 0 ? 'active' : ''}" alt="Produto Morita Fitness">
  `).join('');

  container.innerHTML = `
    <div class="random-carousel">
      ${carouselImgsHtml}
      <button class="random-carousel-btn prev" onclick="navigateRandomCarousel(-1)">&#10094;</button>
      <button class="random-carousel-btn next" onclick="navigateRandomCarousel(1)">&#10095;</button>
    </div>
  `;
});

let currentRandomImageIndex = 0;

function navigateRandomCarousel(direction) {
  const images = document.querySelectorAll('.random-carousel-img');
  if (!images.length) return;

  images[currentRandomImageIndex].classList.remove('active');
  currentRandomImageIndex = (currentRandomImageIndex + direction + images.length) % images.length;
  images[currentRandomImageIndex].classList.add('active');
}

window.navigateRandomCarousel = navigateRandomCarousel;
