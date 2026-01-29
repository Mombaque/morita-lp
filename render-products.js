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

export function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id '${containerId}' not found.`);
    return;
  }

  container.innerHTML = '';

  const shuffledProducts = shuffle(products);

  shuffledProducts.forEach((p, index) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
  
      const carouselId = `carousel-${p.nome.replace(/[^\w-]/g, '')}-${index}`;
  
      const imagens = shuffle(p.imagens);
  
      let carouselImgs = "";
      if (imagens.length === 0) {
        carouselImgs = `<img src="https://via.placeholder.com/300x300.png?text=Produto+sem+imagem" alt="${p.alt}" class="carousel-img active">`;
      } else {
        imagens.forEach((img, i) => {
          carouselImgs += `
            <img src="${img}" alt="${p.alt}" class="carousel-img ${i === 0 ? "active" : ""}" data-index="${i}">
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
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
      `;
  
      container.appendChild(productDiv);
  });
}
