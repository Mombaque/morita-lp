const pathKimono = 'public/images/kimono/';
const pathRashguard = 'public/images/rashguard/';

const produtos = [
    {
      nome: "Kimono Infantil",
      alt: "Kimono Infantil In The Guard",
      descricao: "Conforto e mobilidade para os pequenos atletas. Ideal para treinos e iniciação.",
      imagens: [
        pathKimono + "infantil/azul.jpeg",
        pathKimono + "infantil/preto.jpeg",
        pathKimono + "infantil/branco.jpeg",
      ]
    },
    {
      nome: `Kimono Adulto Masculino`,
      alt: "Kimono Adulto Masculino In The Guard",
      descricao: "Modelos leves, resistentes e aprovados para campeonatos. Diversos tamanhos e cores.",
      imagens: [
        pathKimono + "adulto/chumbo-masculino.png",
        pathKimono + "adulto/azul-masculino.png",
        pathKimono + "adulto/branco-masculino.png",
      ]
    },
    {
      nome: "Kimono Adulto Feminino",
      alt: "Kimono Adulto Feminino In The Guard",
      descricao: "Desenvolvido para o corpo feminino, combina conforto, durabilidade e liberdade de movimento para treinos e competições.",
      imagens: [
        pathKimono + "adulto/branco-feminino.png",
      ]
    },
    {
      nome: "Rashguard Masculina",
      alt: "Rashguard masculina In The Guard",
      descricao: "Roupas térmicas com proteção UV, tecido tecnológico e compressão ideal para o grappling.",
      imagens: [
        pathRashguard + "masculina1.png",
        pathRashguard + "masculina2.png"
      ]
    },
    {
      nome: "Rashguard Feminina",
      alt: "Rashguard feminina In The Guard",
      descricao: "Modelos ajustados ao corpo feminino, com tecido tecnológico que garante compressão, proteção UV e conforto durante o treino.",
      imagens: [
        pathRashguard + "feminina1.png",
        pathRashguard + "feminina2.png"
      ]
    },
  ];

const container = document.getElementById("products");

produtos.forEach((p, index) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    const carouselId = `carousel-${index}`;
    let carouselImgs = "";
    p.imagens.forEach((img, i) => {
      carouselImgs += `
        <img src="${img}" alt="${p.alt}" class="carousel-img ${i === 0 ? "active" : ""}" data-index="${i}">
      `;
    });

    productDiv.innerHTML = `
      <div class="carousel" id="${carouselId}">
        ${carouselImgs}
        <button class="prev" onclick="getImage(${index}, false)">&#10094;</button>
        <button class="next" onclick="getImage(${index}, true)">&#10095;</button>
      </div>
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
    `;

    container.appendChild(productDiv);
});

function getImage(prodIndex, isNext) {
    const imgs = document.querySelectorAll(`#carousel-${prodIndex} .carousel-img`);
    let current = [...imgs].findIndex(img => img.classList.contains("active"));
    imgs[current].classList.remove("active");
    let index = isNext
        ? (current + 1) % imgs.length
        : (current - 1 + imgs.length) % imgs.length;
    imgs[index].classList.add("active");
}