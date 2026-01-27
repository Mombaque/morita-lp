const jiuJitsuProducts = [
    {
      nome: "Faixas de Jiu-Jitsu",
      alt: "Faixas de Jiu-Jitsu de todas as cores: branca, azul, roxa, marrom, preta. Modelos para adulto e infantil.",
      descricao: "Essenciais para a jornada no jiu-jitsu, nossas faixas representam sua evolução no tatame. Trabalhamos com as melhores marcas, como In The Guard, Venum e Naja. Todas as faixas, da branca à preta, possuem costura reforçada para máxima durabilidade em treinos e competições. Disponíveis em tamanhos adulto e infantil. Compre a sua em Sorocaba na Morita Kimonos!",
      imagens: [
        'public/images/faixas/1.jpg',
      ]
    },
    {
      nome: "Kimono Infantil",
      alt: "Kimono Infantil In The Guard",
      descricao: "Prepare os futuros campeões com nossos kimonos infantis! Leves e confortáveis, oferecem total mobilidade para os pequenos atletas aprenderem e se divertirem. Feitos para durar, são ideais para o dia a dia de treinos. Disponíveis em diversas cores. Um presente que inspira disciplina e paixão pelo jiu-jitsu.",
      imagens: [
        'public/images/kimono/infantil/azul.jpeg',
        'public/images/kimono/infantil/preto.jpeg',
        'public/images/kimono/infantil/branco.jpeg',
      ]
    },
    {
      nome: `Kimono Adulto Masculino`,
      alt: "Kimono Adulto Masculino In The Guard",
      descricao: "Domine o tatame com nossos kimonos masculinos. Oferecemos modelos de alta performance das marcas mais renomadas como In The Guard, Venum, South Team e Naja. São kimonos leves e ultra resistentes, com tecido trançado que aguenta os treinos mais intensos. Aprovados para competições. Encontre o seu na Morita Kimonos em Sorocaba.",
      imagens: [
        'public/images/kimono/adulto/chumbo-masculino.png',
        'public/images/kimono/adulto/azul-masculino.jpg',
        'public/images/kimono/adulto/branco-masculino.png',
        'public/images/kimono/adulto/marinho-masculino.png',
      ]
    },
    {
      nome: "Kimono Adulto Feminino",
      alt: "Kimono Adulto Feminino In The Guard",
      descricao: "Criado para a mulher que luta, nossos kimonos femininos oferecem um caimento perfeito, aliando conforto e estilo. Com design que valoriza o corpo, você terá total liberdade de movimento para executar qualquer técnica. Trabalhamos com as melhores marcas para garantir sua performance. pronta para o próximo treino?",
      imagens: [
        'public/images/kimono/adulto/branco-feminino.png',
      ]
    },
    {
      nome: "Rashguard Masculina",
      alt: "Rashguard masculina In The Guard",
      descricao: "Eleve seu treino de grappling e no-gi com nossas rashguards masculinas. Com tecido tecnológico de alta compressão, elas garantem suporte muscular e total liberdade de movimento. A proteção UV integrada protege sua pele, enquanto o controle térmico mantém o corpo na temperatura ideal. Modelos das marcas In The Guard, Venum, e mais.",
      imagens: [
        'public/images/rashguard/masculina1.png',
        'public/images/rashguard/masculina2.png',
        'public/images/rashguard/masculina3.jpg',
        'public/images/rashguard/masculina4.jpg',
      ]
    },
    {
      nome: "Rashguard Feminina",
      alt: "Rashguard feminina In The Guard",
      descricao: "Performance e estilo se encontram em nossas rashguards femininas. Desenhadas para se ajustar perfeitamente ao corpo, oferecem o máximo de conforto e compressão. O tecido tecnológico com proteção UV é ideal para treinos de jiu-jitsu sem kimono (no-gi) ou qualquer outra atividade de alta intensidade. Garanta a sua e sinta a diferença no seu desempenho.",
      imagens: [
        'public/images/rashguard/feminina1.png',
        'public/images/rashguard/feminina2.png',
        'public/images/rashguard/feminina3.jpeg',
        'public/images/rashguard/feminina4.jpeg',
      ]
    },
  ];

  const muayThaiProducts = [
    {
      nome: "Luva de Muay Thai / Boxe",
      alt: "Luva de Boxe e Muay Thai",
      descricao: "Luvas de alta qualidade para treinos e competições de Muay Thai e Boxe. Disponível em 12oz, 14oz e 16oz.",
      imagens: [
        'public/images/muay-thai/luva-st.jpg',
      ]
    },
    {
      nome: "Shorts de Muay Thai",
      alt: "Shorts de Muay Thai",
      descricao: "Shorts com design tradicional tailandês, oferecendo máxima liberdade de movimento para chutes e joelhadas. Tecido leve e resistente.",
      imagens: [
        'public/images/muay-thai/short-amarelo.png',
        'public/images/muay-thai/short-camuflado.png',
        'public/images/muay-thai/short-rosa.png',
        'public/images/muay-thai/short-thailandia.png',
        'public/images/muay-thai/short-vermelho.png',
        'public/images/muay-thai/shorts-dragao.png',
      ]
    },
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getRandomImages(products, count) {
    let allImages = [];
    products.forEach(product => {
      allImages = allImages.concat(product.imagens);
    });
    return shuffleArray(allImages).slice(0, count);
  }

  const selectedJiuJitsuImages = getRandomImages(jiuJitsuProducts, 2);
  const selectedMuayThaiImages = getRandomImages(muayThaiProducts, 2);

  const allSelectedImages = shuffleArray([...selectedJiuJitsuImages, ...selectedMuayThaiImages]);

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("random-carousel-container");

    if (container) {
      let carouselImgsHtml = '';
      allSelectedImages.forEach((imgSrc, index) => {
        carouselImgsHtml += `<img src="${imgSrc}" class="random-carousel-img ${index === 0 ? 'active' : ''}" alt="Produto Morita Fitness">`;
      });

      container.innerHTML = `
        <div class="random-carousel">
            ${carouselImgsHtml}
            <button class="random-carousel-btn prev" onclick="navigateRandomCarousel(-1)">&#10094;</button>
            <button class="random-carousel-btn next" onclick="navigateRandomCarousel(1)">&#10095;</button>
        </div>
      `;
    }
  });

  let currentRandomImageIndex = 0;

  function navigateRandomCarousel(direction) {
    const images = document.querySelectorAll('.random-carousel-img');
    if (images.length === 0) return;

    images[currentRandomImageIndex].classList.remove('active');
    currentRandomImageIndex = (currentRandomImageIndex + direction + images.length) % images.length;
    images[currentRandomImageIndex].classList.add('active');
  }

  // Make the navigation function globally accessible
  window.navigateRandomCarousel = navigateRandomCarousel;
