const pathKimono = 'public/images/kimono/';
const pathRashguard = 'public/images/rashguard/';
const pathFaixas = 'public/images/faixas/';

const produtos = [
    {
      nome: "Faixas de Jiu-Jitsu",
      alt: "Faixas jiu-jitsu",
      descricao: "Todas as cores e tamanhos! Modelos para adultos e crianças, com costura reforçada.",
      imagens: [
        pathFaixas + "1.jpg",
      ]
    },
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
        pathRashguard + "feminina2.png",
        pathRashguard + "feminina3.jpeg",
        pathRashguard + "feminina4.jpeg",
      ]
    },
  ];

const container = document.getElementById("products");

shuffle(produtos).forEach((p, index) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    const carouselId = `carousel-${index}`;

    const imagens = shuffle([...p.imagens]);

    let carouselImgs = "";
    imagens.forEach((img, i) => {
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