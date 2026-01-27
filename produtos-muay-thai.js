const pathMuayThai = '../public/images/muay-thai/';

const produtos = [
    {
      nome: "Luva de Muay Thai / Boxe",
      alt: "Luva de Boxe e Muay Thai",
      descricao: "Luvas de alta qualidade para treinos e competições de Muay Thai e Boxe. Disponível em 12oz, 14oz e 16oz.",
      imagens: [
        pathMuayThai + "luva-st.jpg",
      ]
    },
    {
      nome: "Shorts de Muay Thai",
      alt: "Shorts de Muay Thai",
      descricao: "Shorts com design tradicional tailandês, oferecendo máxima liberdade de movimento para chutes e joelhadas. Tecido leve e resistente.",
      imagens: [
        pathMuayThai + "short-amarelo.png",
        pathMuayThai + "short-camuflado.png",
        pathMuayThai + "short-rosa.png",
        pathMuayThai + "short-thailandia.png",
        pathMuayThai + "short-vermelho.png",
        pathMuayThai + "shorts-dragao.png",
      ]
    },
    // {
    //   nome: "Caneleira de Muay Thai",
    //   alt: "Caneleira de Muay Thai",
    //   descricao: "Proteja suas canelas com nossas caneleiras de alta absorção. Essenciais para treinos de sparring, garantem proteção e conforto.",
    //   imagens: [
    //     // No images available for shin guards
    //   ]
    // },
  ];

const container = document.getElementById("products");

shuffle(produtos).forEach((p, index) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    const carouselId = `carousel-${index}`;

    const imagens = shuffle([...p.imagens]);

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
        <button class="prev" onclick="getImage(${index}, false)">&#10094;</button>
        <button class="next" onclick="getImage(${index}, true)">&#10095;</button>
        ` : ''}
      </div>
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
    `;

    container.appendChild(productDiv);
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getImage(prodIndex, isNext) {
    const imgs = document.querySelectorAll(`#carousel-${prodIndex} .carousel-img`);
    let current = [...imgs].findIndex(img => img.classList.contains("active"));
    imgs[current].classList.remove("active");
    let index = isNext
        ? (current + 1) % imgs.length
        : (current - 1 + imgs.length) % imgs.length;
    imgs[index].classList.add("active");
}
