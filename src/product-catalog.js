import {
  ADULT_BELT_SIZES,
  ADULT_KIMONO_SIZES,
  AUDIENCE,
  BRAND,
  CATEGORY,
  COLOR,
  DEFAULT_WEIGHT_GSM,
  FABRIC_TYPE,
  FEMALE_KIMONO_SIZES,
  JIU_JITSU_ADULT_BELT_COLORS,
  JIU_JITSU_KIDS_BELT_COLORS,
  KARATE_KIMONO_SIZES,
  KEIKO_ADULT_KIMONO_SIZES,
  KIDS_BELT_SIZES,
  KIDS_KIMONO_SIZES,
  MODALITY,
  PRICE,
  SOUTH_TEAM_ADULT_KIMONO_SIZES,
} from './product-catalog-constants.js';

const PRODUCT_IMAGE_PLACEHOLDER = [];

function createSlug(parts) {
  return parts
    .filter(Boolean)
    .join('-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function createColorVariants(colors, priceByColor, imagesByColor = {}) {
  return colors.map(color => ({
    color,
    price: priceByColor[color] || priceByColor.default,
    images: imagesByColor[color] || PRODUCT_IMAGE_PLACEHOLDER,
  }));
}

function createKimonoProduct({
  modality = MODALITY.jiuJitsu,
  audience,
  brand,
  model,
  price,
  fabricType,
  colors,
  sizes,
  colorPrices,
}) {
  const name = `Kimono ${modality} ${audience} ${brand}${model ? ` ${model}` : ''}`;
  const priceByColor = colorPrices || Object.fromEntries(colors.map(color => [color, price]));

  return {
    slug: createSlug(['kimono', modality, audience, brand, model]),
    category: CATEGORY.kimono,
    modality,
    audience,
    brand,
    model,
    name,
    price,
    fabricType,
    weightGsm: DEFAULT_WEIGHT_GSM,
    availableColors: colors,
    availableSizes: sizes,
    description: `${name} com tecido ${fabricType.toLowerCase()} para treinos e evolução no tatame.`,
    details: [
      `Tecido ${fabricType.toLowerCase()} de ${DEFAULT_WEIGHT_GSM}gsm`,
      `Modelagem ${audience.toLowerCase()}`,
      'Disponível em cores e tamanhos variados',
    ],
    colorVariants: createColorVariants(colors, priceByColor),
  };
}

function getAdultBeltPrice(color) {
  return color === COLOR.white ? PRICE.adultBeltWhite : PRICE.adultBeltColored;
}

function getKidsBeltPrice(color) {
  if (color === COLOR.white) return PRICE.adultBeltWhite;
  if (color.includes('com')) return PRICE.kidsBeltMixed;
  return PRICE.kidsBeltSolid;
}

function createBeltProduct({ modality, audience, brand = null, color, price, sizes }) {
  const brandName = brand ? ` ${brand}` : '';
  const name = `Faixa ${modality} ${audience} ${color}${brandName}`;

  return {
    slug: createSlug(['faixa', modality, audience, color, brand]),
    category: CATEGORY.belt,
    modality,
    audience,
    brand,
    model: color,
    name,
    price,
    fabricType: null,
    weightGsm: null,
    availableColors: [color],
    availableSizes: sizes,
    description: `${name} para graduação e treino.`,
    details: [
      `Cor ${color}`,
      `Público ${audience.toLowerCase()}`,
      'Consulte disponibilidade de tamanho pelo WhatsApp',
    ],
    colorVariants: [{ color, price, images: PRODUCT_IMAGE_PLACEHOLDER }],
  };
}

const adultJiuJitsuKimonos = [
  createKimonoProduct({
    audience: AUDIENCE.adult,
    brand: BRAND.inTheGuard,
    model: 'Adulto',
    price: 'R$ 389,00',
    fabricType: FABRIC_TYPE.braided,
    colors: [COLOR.white, COLOR.blue, COLOR.black, COLOR.pink],
    sizes: [...ADULT_KIMONO_SIZES, ...FEMALE_KIMONO_SIZES],
  }),
  createKimonoProduct({
    audience: AUDIENCE.adult,
    brand: BRAND.southTeam,
    model: 'Adulto',
    price: 'R$ 350,00',
    fabricType: FABRIC_TYPE.braided,
    colors: [COLOR.white, COLOR.blue, COLOR.black],
    sizes: SOUTH_TEAM_ADULT_KIMONO_SIZES,
  }),
  createKimonoProduct({
    audience: AUDIENCE.adult,
    brand: BRAND.naja,
    model: 'Adulto',
    price: 'R$ 489,00',
    fabricType: FABRIC_TYPE.braided,
    colors: [COLOR.white, COLOR.blue, COLOR.black],
    sizes: SOUTH_TEAM_ADULT_KIMONO_SIZES,
  }),
  createKimonoProduct({
    audience: AUDIENCE.adult,
    brand: BRAND.keiko,
    model: 'Summer',
    price: 'A partir de R$ 535,00',
    fabricType: FABRIC_TYPE.braided,
    colors: [COLOR.white, COLOR.blue, COLOR.black],
    sizes: KEIKO_ADULT_KIMONO_SIZES,
    colorPrices: {
      [COLOR.white]: 'R$ 535,00',
      [COLOR.blue]: 'R$ 571,00',
      [COLOR.black]: 'R$ 571,00',
    },
  }),
  createKimonoProduct({
    audience: AUDIENCE.adult,
    brand: BRAND.keiko,
    model: 'Série Limitada',
    price: 'A partir de R$ 571,00',
    fabricType: FABRIC_TYPE.braided,
    colors: [COLOR.white, COLOR.blue, COLOR.black],
    sizes: KEIKO_ADULT_KIMONO_SIZES,
    colorPrices: {
      [COLOR.white]: 'R$ 571,00',
      [COLOR.blue]: 'R$ 606,00',
      [COLOR.black]: 'R$ 606,00',
    },
  }),
  createKimonoProduct({
    audience: AUDIENCE.adult,
    brand: BRAND.keiko,
    model: 'Ouro',
    price: 'A partir de R$ 660,00',
    fabricType: FABRIC_TYPE.braided,
    colors: [COLOR.white, COLOR.black],
    sizes: KEIKO_ADULT_KIMONO_SIZES,
    colorPrices: {
      [COLOR.white]: 'R$ 660,00',
      [COLOR.black]: 'R$ 715,00',
    },
  }),
];

const kidsJiuJitsuKimonos = [
  createKimonoProduct({
    audience: AUDIENCE.kids,
    brand: BRAND.inTheGuard,
    model: 'Infantil',
    price: 'R$ 239,00',
    fabricType: FABRIC_TYPE.braided,
    colors: [COLOR.white, COLOR.blue, COLOR.black, COLOR.pink],
    sizes: KIDS_KIMONO_SIZES,
  }),
  createKimonoProduct({
    audience: AUDIENCE.kids,
    brand: BRAND.keiko,
    model: 'Infantil',
    price: 'R$ 239,00',
    fabricType: FABRIC_TYPE.twill,
    colors: [COLOR.white],
    sizes: KIDS_KIMONO_SIZES,
  }),
  createKimonoProduct({
    audience: AUDIENCE.kids,
    brand: BRAND.haganah,
    model: 'Infantil',
    price: 'R$ 170,00',
    fabricType: FABRIC_TYPE.twill,
    colors: [COLOR.white],
    sizes: KIDS_KIMONO_SIZES,
  }),
];

const karateProducts = [
  createKimonoProduct({
    modality: MODALITY.karate,
    audience: AUDIENCE.adult,
    brand: BRAND.haganah,
    model: 'Karatê',
    price: 'R$ 450,00',
    fabricType: FABRIC_TYPE.canvas,
    colors: [COLOR.white],
    sizes: KARATE_KIMONO_SIZES,
  }),
];

const adultJiuJitsuBelts = JIU_JITSU_ADULT_BELT_COLORS.flatMap(color => [
  createBeltProduct({
    modality: MODALITY.jiuJitsu,
    audience: AUDIENCE.adult,
    color,
    price: getAdultBeltPrice(color),
    sizes: ADULT_BELT_SIZES,
  }),
  createBeltProduct({
    modality: MODALITY.jiuJitsu,
    audience: AUDIENCE.adult,
    brand: BRAND.venum,
    color,
    price: PRICE.venumBelt,
    sizes: ADULT_BELT_SIZES,
  }),
]);

const kidsJiuJitsuBelts = JIU_JITSU_KIDS_BELT_COLORS.flatMap(color => [
  createBeltProduct({
    modality: MODALITY.jiuJitsu,
    audience: AUDIENCE.kids,
    color,
    price: getKidsBeltPrice(color),
    sizes: KIDS_BELT_SIZES,
  }),
  createBeltProduct({
    modality: MODALITY.jiuJitsu,
    audience: AUDIENCE.kids,
    brand: BRAND.venum,
    color,
    price: PRICE.venumBelt,
    sizes: KIDS_BELT_SIZES,
  }),
]);

export const products = [
  ...adultJiuJitsuKimonos,
  ...kidsJiuJitsuKimonos,
  ...adultJiuJitsuBelts,
  ...kidsJiuJitsuBelts,
  ...karateProducts,
];

export function getProductBySlug(slug) {
  return products.find(product => product.slug === slug) || null;
}

export function getRelatedProducts(product, limit = 4) {
  return products
    .filter(item => item.slug !== product.slug)
    .filter(item => item.modality === product.modality)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, limit);
}

export { AUDIENCE, CATEGORY, MODALITY };
