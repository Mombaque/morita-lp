const pathKimono = 'public/images/kimono/';
const pathRashguard = 'public/images/rashguard/';
const pathFaixas = 'public/images/faixas/';

const produtos = [
    {
      nome: "Faixas de Jiu-Jitsu",
      alt: "Faixas de Jiu-Jitsu de todas as cores: branca, azul, roxa, marrom, preta. Modelos para adulto e infantil.",
      descricao: "Essenciais para a jornada no jiu-jitsu, nossas faixas representam sua evolução no tatame. Trabalhamos com as melhores marcas, como In The Guard, Venum e Naja. Todas as faixas, da branca à preta, possuem costura reforçada para máxima durabilidade em treinos e competições. Disponíveis em tamanhos adulto e infantil. Compre a sua em Sorocaba na Morita Kimonos!",
      imagens: [
        pathFaixas + "1.jpg",
      ]
    },
    {
      nome: "Kimono Infantil",
      alt: "Kimono Infantil In The Guard",
      descricao: "Prepare os futuros campeões com nossos kimonos infantis! Leves e confortáveis, oferecem total mobilidade para os pequenos atletas aprenderem e se divertirem. Feitos para durar, são ideais para o dia a dia de treinos. Disponíveis em diversas cores. Um presente que inspira disciplina e paixão pelo jiu-jitsu.",
      imagens: [
        pathKimono + "infantil/azul.jpeg",
        pathKimono + "infantil/preto.jpeg",
        pathKimono + "infantil/branco.jpeg",
      ]
    },
    {
      nome: `Kimono Adulto Masculino`,
      alt: "Kimono Adulto Masculino In The Guard",
      descricao: "Domine o tatame com nossos kimonos masculinos. Oferecemos modelos de alta performance das marcas mais renomadas como In The Guard, Venum, South Team e Naja. São kimonos leves e ultra resistentes, com tecido trançado que aguenta os treinos mais intensos. Aprovados para competições. Encontre o seu na Morita Kimonos em Sorocaba.",
      imagens: [
        pathKimono + "adulto/chumbo-masculino.png",
        pathKimono + "adulto/azul-masculino.jpg",
        pathKimono + "adulto/branco-masculino.png",
        pathKimono + "adulto/marinho-masculino.png",
      ]
    },
    {
      nome: "Kimono Adulto Feminino",
      alt: "Kimono Adulto Feminino In The Guard",
      descricao: "Criado para a mulher que luta, nossos kimonos femininos oferecem um caimento perfeito, aliando conforto e estilo. Com design que valoriza o corpo, você terá total liberdade de movimento para executar qualquer técnica. Trabalhamos com as melhores marcas para garantir sua performance. pronta para o próximo treino?",
      imagens: [
        pathKimono + "adulto/branco-feminino.png",
      ]
    },
    {
      nome: "Rashguard Masculina",
      alt: "Rashguard masculina In The Guard",
      descricao: "Eleve seu treino de grappling e no-gi com nossas rashguards masculinas. Com tecido tecnológico de alta compressão, elas garantem suporte muscular e total liberdade de movimento. A proteção UV integrada protege sua pele, enquanto o controle térmico mantém o corpo na temperatura ideal. Modelos das marcas In The Guard, Venum, e mais.",
      imagens: [
        pathRashguard + "masculina1.png",
        pathRashguard + "masculina2.png",
        pathRashguard + "masculina3.jpg",
        pathRashguard + "masculina4.jpg",
      ]
    },
    {
      nome: "Rashguard Feminina",
      alt: "Rashguard feminina In The Guard",
      descricao: "Performance e estilo se encontram em nossas rashguards femininas. Desenhadas para se ajustar perfeitamente ao corpo, oferecem o máximo de conforto e compressão. O tecido tecnológico com proteção UV é ideal para treinos de jiu-jitsu sem kimono (no-gi) ou qualquer outra atividade de alta intensidade. Garanta a sua e sinta a diferença no seu desempenho.",
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