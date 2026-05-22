const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5001'
  : 'https://morita-api.onrender.com';

const TOTAL_STEPS = 4;

const REQUEST_STATUS = {
  idle: 'idle',
  success: 'success',
};

const BUTTON_LABELS = {
  continue: 'Continuar',
  submit: 'Enviar consulta',
  submitting: 'Enviando...',
};

const ERROR_MESSAGES = {
  required: 'Preencha as informações obrigatórias para continuar.',
  submit: 'Não foi possível enviar agora. Tente pelo WhatsApp.',
};

const FIELD = {
  modality: 'modality',
  productTypes: 'productTypes',
  productDetails: 'productDetails',
  brand: 'brand',
  size: 'size',
  color: 'color',
  heightCm: 'heightCm',
  weightKg: 'weightKg',
  age: 'age',
  customerName: 'customerName',
  customerPhone: 'customerPhone',
  notes: 'notes',
  website: 'website',
};

const DETAIL_FIELD_SEPARATOR = '::';
const PRODUCT_DETAILS_MAX_LENGTH = 500;

const MODALITY = {
  jiuJitsu: 'Jiu-Jitsu',
  muayThaiBoxe: 'Muay Thai / Boxe',
  mma: 'MMA',
  judo: 'Judô',
};

const PRODUCT_TYPE = {
  kimonoAdulto: 'Kimono Adulto',
  kimonoInfantilJudo: 'Kimono Infantil / Judô',
  faixaAdulto: 'Faixa adulto',
  faixaInfantil: 'Faixa infantil',
  rashguard: 'Rashguard',
  bermudaShorts: 'Bermuda / shorts',
  luvas: 'Luvas',
  protetorBucal: 'Protetor bucal',
  caneleira: 'Caneleira',
  outro: 'Outro',
};

const BRAND = {
  inTheGuard: 'In The Guard',
  keikoSports: 'Keiko Sports',
  southTeam: 'South Team',
  naja: 'Naja',
  haganah: 'Haganah',
  venum: 'Venum',
  ockto: 'Ockto',
  qualquerMarca: 'Qualquer marca',
};

const SIZE = {
  naoSei: 'Não sei',
};

const KIMONO_BRANDS = [BRAND.inTheGuard, BRAND.keikoSports, BRAND.southTeam, BRAND.naja, BRAND.haganah, BRAND.qualquerMarca];
const ADULT_KIMONO_SIZES = ['F2', 'F3', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6'];
const INFANTIL_JUDO_SIZES = ['M000', 'M00', 'M0', 'M1', 'M2', 'M3', 'M4'];
const CLOTHING_SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];
const UNKNOWN_SIZE_OPTION = [SIZE.naoSei];
const BELT_ICON_BASE_PATH = '../public/icons/faixas/';
const ADULT_BELT_COLORS = ['Branca', 'Azul', 'Roxa', 'Marrom', 'Preta', 'Outra'];
const JIU_JITSU_KIDS_BELT_COLORS = [
  'Branca',
  'Cinza e branca',
  'Cinza',
  'Cinza e preta',
  'Amarela e branca',
  'Amarela',
  'Amarela e preta',
  'Laranja e branca',
  'Laranja',
  'Laranja e preta',
  'Verde e branca',
  'Verde',
  'Verde e preta',
];
const JUDO_KIDS_BELT_COLORS = ['Amarela', 'Laranja', 'Verde'];

const options = {
  modalities: [MODALITY.jiuJitsu, MODALITY.muayThaiBoxe, MODALITY.mma, MODALITY.judo],
  productTypes: {
    [MODALITY.jiuJitsu]: [PRODUCT_TYPE.kimonoAdulto, PRODUCT_TYPE.kimonoInfantilJudo, PRODUCT_TYPE.faixaAdulto, PRODUCT_TYPE.faixaInfantil, PRODUCT_TYPE.rashguard, PRODUCT_TYPE.bermudaShorts],
    [MODALITY.muayThaiBoxe]: [PRODUCT_TYPE.luvas, PRODUCT_TYPE.protetorBucal, PRODUCT_TYPE.caneleira, PRODUCT_TYPE.bermudaShorts, PRODUCT_TYPE.outro],
    [MODALITY.mma]: [PRODUCT_TYPE.bermudaShorts, PRODUCT_TYPE.rashguard, PRODUCT_TYPE.luvas, PRODUCT_TYPE.outro],
    [MODALITY.judo]: [PRODUCT_TYPE.kimonoInfantilJudo, PRODUCT_TYPE.faixaAdulto, PRODUCT_TYPE.faixaInfantil, PRODUCT_TYPE.outro],
  },
  brands: {
    [PRODUCT_TYPE.kimonoAdulto]: KIMONO_BRANDS,
    [PRODUCT_TYPE.kimonoInfantilJudo]: KIMONO_BRANDS,
    [PRODUCT_TYPE.faixaAdulto]: [BRAND.inTheGuard, BRAND.southTeam, BRAND.venum, BRAND.qualquerMarca],
    [PRODUCT_TYPE.faixaInfantil]: [BRAND.inTheGuard, BRAND.qualquerMarca],
    [PRODUCT_TYPE.rashguard]: [BRAND.inTheGuard, BRAND.venum, BRAND.qualquerMarca],
    [PRODUCT_TYPE.bermudaShorts]: [BRAND.venum, BRAND.ockto, BRAND.inTheGuard, BRAND.qualquerMarca],
  },
  sizes: {
    [PRODUCT_TYPE.kimonoAdulto]: [...ADULT_KIMONO_SIZES, ...UNKNOWN_SIZE_OPTION],
    [PRODUCT_TYPE.kimonoInfantilJudo]: [...INFANTIL_JUDO_SIZES, ...UNKNOWN_SIZE_OPTION],
    [PRODUCT_TYPE.faixaAdulto]: [...ADULT_KIMONO_SIZES.slice(2), ...UNKNOWN_SIZE_OPTION],
    [PRODUCT_TYPE.faixaInfantil]: [...INFANTIL_JUDO_SIZES, ...UNKNOWN_SIZE_OPTION],
    [PRODUCT_TYPE.rashguard]: [...CLOTHING_SIZES, ...UNKNOWN_SIZE_OPTION],
    [PRODUCT_TYPE.bermudaShorts]: [...CLOTHING_SIZES, ...UNKNOWN_SIZE_OPTION],
    [PRODUCT_TYPE.luvas]: ['8oz', '10oz', '12oz', '14oz', '16oz', ...UNKNOWN_SIZE_OPTION],
  },
};

const state = {
  step: 1,
  data: {},
  status: REQUEST_STATUS.idle,
};

document.addEventListener('DOMContentLoaded', () => {
  injectRequestWidget();
  bindRequestEvents();
});

function injectRequestWidget() {
  document.body.insertAdjacentHTML('beforeend', `
    <a class="request-float" href="https://wa.me/c/5515981079332" target="_blank" rel="noopener noreferrer" aria-label="Falar com a Morita Fitness no WhatsApp" data-track-event="whatsapp_catalog_click" data-track-category="request-widget">
      <i class="fas fa-phone"></i>
      Falar no WhatsApp
    </a>
    <div class="request-modal" id="customer-request-modal" aria-hidden="true">
      <div class="request-backdrop" data-request-close></div>
      <section class="request-panel" role="dialog" aria-modal="true" aria-labelledby="request-title">
        <button class="request-close" type="button" aria-label="Fechar consulta" data-request-close>&times;</button>
        <p class="eyebrow">Consulta rápida</p>
        <h2 id="request-title">Não encontrou o produto certo?</h2>
        <p class="request-subtitle">Responda em poucos passos e confirmamos disponibilidade pelo WhatsApp.</p>
        <div class="request-progress">Passo <span id="request-step">1</span> de ${TOTAL_STEPS}</div>
        <form id="customer-request-form" class="request-form">
          <div id="request-step-content"></div>
          <div class="request-actions">
            <button class="request-secondary" type="button" data-request-back>Voltar</button>
            <button class="request-primary" type="button" data-request-next>${BUTTON_LABELS.continue}</button>
          </div>
        </form>
      </section>
    </div>
  `);
}

function bindRequestEvents() {
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const openButton = event.target.closest('[data-request-open]');
    if (!openButton) return;

    openRequestModal();
  });

  document.querySelectorAll('[data-request-close]').forEach(button => {
    button.addEventListener('click', closeRequestModal);
  });
  document.querySelector('[data-request-back]').addEventListener('click', goBack);
  document.querySelector('[data-request-next]').addEventListener('click', goNext);
}

function openRequestModal() {
  const modal = document.getElementById('customer-request-modal');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('request-modal-open');
  state.step = 1;
  state.data = {};
  state.status = REQUEST_STATUS.idle;
  document.querySelector('[data-request-next]').disabled = false;
  document.querySelector('.request-actions').style.display = 'flex';
  renderStep();
}

function closeRequestModal() {
  document.getElementById('customer-request-modal').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('request-modal-open');
}

function goBack() {
  if (state.step === 1) return;
  state.step -= 1;
  renderStep();
}

async function goNext() {
  saveCurrentStep();

  if (!isCurrentStepValid()) return;

  if (state.step < TOTAL_STEPS) {
    state.step += 1;
    renderStep();
    return;
  }

  await submitRequest();
}

function saveCurrentStep() {
  const form = document.getElementById('customer-request-form');
  const formData = new FormData(form);

  if (state.step === 1) {
    const previousModality = state.data[FIELD.modality];
    const modality = formData.get(FIELD.modality)?.toString() || '';
    state.data[FIELD.modality] = modality;

    if (previousModality && previousModality !== modality) {
      state.data[FIELD.productTypes] = [];
      state.data[FIELD.productDetails] = {};
    }

    return;
  }

  if (state.step === 2) {
    const productTypes = formData.getAll(FIELD.productTypes).map(value => value.toString());
    state.data[FIELD.productTypes] = productTypes;
    state.data[FIELD.productDetails] = Object.fromEntries(
      Object.entries(state.data[FIELD.productDetails] || {}).filter(([productType]) => productTypes.includes(productType))
    );
    return;
  }

  if (state.step === 3) {
    state.data[FIELD.productDetails] = {};
    formData.forEach((value, key) => {
      const [field, productType] = key.split(DETAIL_FIELD_SEPARATOR);
      if (!field || !productType) return;
      state.data[FIELD.productDetails][productType] = state.data[FIELD.productDetails][productType] || {};
      state.data[FIELD.productDetails][productType][field] = value.toString();
    });
    return;
  }

  formData.forEach((value, key) => {
    state.data[key] = value.toString();
  });
}

function isCurrentStepValid() {
  const requiredFields = {
    1: [FIELD.modality],
    2: [FIELD.productTypes],
    3: [],
    [TOTAL_STEPS]: [FIELD.customerName, FIELD.customerPhone],
  }[state.step];

  const missing = requiredFields.some(field => {
    const value = state.data[field];
    return Array.isArray(value) ? value.length === 0 : !value;
  });
  document.querySelector('.request-error')?.remove();

  if (missing) {
    document.getElementById('request-step-content').insertAdjacentHTML('beforeend', renderError(ERROR_MESSAGES.required));
    return false;
  }

  return true;
}

function renderStep() {
  document.getElementById('request-step').textContent = state.step;
  document.querySelector('[data-request-back]').style.visibility = state.step === 1 ? 'hidden' : 'visible';
  document.querySelector('[data-request-next]').textContent = state.step === TOTAL_STEPS ? BUTTON_LABELS.submit : BUTTON_LABELS.continue;

  const content = document.getElementById('request-step-content');
  content.innerHTML = getStepHtml();
}

function getStepHtml() {
  if (state.status === REQUEST_STATUS.success) {
    return '<div class="request-success"><strong>Pedido recebido.</strong><span>Vamos confirmar disponibilidade pelo WhatsApp.</span></div>';
  }

  if (state.step === 1) {
    return renderChoiceGroup(FIELD.modality, 'Escolha a modalidade', options.modalities);
  }

  if (state.step === 2) {
    const productTypes = options.productTypes[state.data[FIELD.modality]] || [PRODUCT_TYPE.outro];
    return renderMultiChoiceGroup(FIELD.productTypes, 'Quais produtos você procura?', productTypes);
  }

  if (state.step === 3) {
    return renderProductQuestions();
  }

  return `
    <label class="request-label">Seu nome<input name="${FIELD.customerName}" value="${state.data[FIELD.customerName] || ''}" required></label>
    <label class="request-label">WhatsApp<input name="${FIELD.customerPhone}" value="${state.data[FIELD.customerPhone] || ''}" inputmode="tel" required></label>
    <label class="request-label">Observações<textarea name="${FIELD.notes}" rows="3">${state.data[FIELD.notes] || ''}</textarea></label>
    <input class="request-honeypot" name="${FIELD.website}" tabindex="-1" autocomplete="off">
  `;
}

function renderProductQuestions() {
  const productTypes = getSelectedProductTypes();

  if (productTypes.length === 0) {
    return '<p class="request-help">Volte e selecione pelo menos um produto.</p>';
  }

  return productTypes.map(productType => renderProductQuestionGroup(productType)).join('');
}

function renderProductQuestionGroup(productType) {
  const brandOptions = options.brands[productType];
  const sizeOptions = options.sizes[productType];
  const beltColorOptions = getBeltColorOptions(productType);
  const needsBodyInfo = productType === PRODUCT_TYPE.kimonoAdulto || productType === PRODUCT_TYPE.kimonoInfantilJudo;
  const hasStructuredOptions = Boolean(brandOptions || sizeOptions || beltColorOptions || needsBodyInfo || productType === PRODUCT_TYPE.kimonoInfantilJudo);
  const details = state.data[FIELD.productDetails]?.[productType] || {};

  return `
    <section class="request-product-section">
      <h3>${productType}</h3>
      ${brandOptions ? renderDetailChoiceGroup(FIELD.brand, productType, 'Marca preferida', brandOptions, details[FIELD.brand]) : ''}
      ${sizeOptions ? renderDetailChoiceGroup(FIELD.size, productType, 'Tamanho', sizeOptions, details[FIELD.size]) : ''}
      ${beltColorOptions ? renderDetailChoiceGroup(FIELD.color, productType, 'Cor da faixa', beltColorOptions, details[FIELD.color], getBeltColorIconSrc) : ''}
      ${needsBodyInfo ? '<p class="request-help">Para kimono, altura e peso ajudam no atendimento. O tamanho ainda é selecionado por você.</p>' : ''}
      ${needsBodyInfo ? '<label class="request-label">Altura em cm<input name="' + getDetailFieldName(FIELD.heightCm, productType) + '" type="number" min="50" max="230" value="' + (details[FIELD.heightCm] || '') + '"></label>' : ''}
      ${needsBodyInfo ? '<label class="request-label">Peso em kg<input name="' + getDetailFieldName(FIELD.weightKg, productType) + '" type="number" min="10" max="250" step="0.1" value="' + (details[FIELD.weightKg] || '') + '"></label>' : ''}
      ${productType === PRODUCT_TYPE.kimonoInfantilJudo ? '<label class="request-label">Idade<input name="' + getDetailFieldName(FIELD.age, productType) + '" type="number" min="1" max="120" value="' + (details[FIELD.age] || '') + '"></label>' : ''}
      ${productType === PRODUCT_TYPE.kimonoInfantilJudo ? '<p class="request-help">Também temos opções infantis para Judô.</p>' : ''}
      ${!hasStructuredOptions ? renderProductDetailsField(productType, details[FIELD.productDetails]) : ''}
    </section>
  `;
}

function getBeltColorOptions(productType) {
  if (productType === PRODUCT_TYPE.faixaAdulto) return ADULT_BELT_COLORS;

  if (productType === PRODUCT_TYPE.faixaInfantil && state.data[FIELD.modality] === MODALITY.jiuJitsu) {
    return JIU_JITSU_KIDS_BELT_COLORS;
  }

  if (productType === PRODUCT_TYPE.faixaInfantil && state.data[FIELD.modality] === MODALITY.judo) {
    return JUDO_KIDS_BELT_COLORS;
  }

  return null;
}

function renderProductDetailsField(productType, value = '') {
  return `
    <label class="request-label">
      Detalhes do produto
      <textarea name="${getDetailFieldName(FIELD.productDetails, productType)}" rows="3" maxlength="${PRODUCT_DETAILS_MAX_LENGTH}" placeholder="Descreva o produto, tamanho, cor ou preferência">${value}</textarea>
    </label>
    <p class="request-help">Até ${PRODUCT_DETAILS_MAX_LENGTH} caracteres.</p>
  `;
}

function renderDetailChoiceGroup(field, productType, label, values, selectedValue, getIconSrc = null) {
  return renderChoiceGroup(getDetailFieldName(field, productType), label, values, selectedValue, getIconSrc);
}

function getDetailFieldName(field, productType) {
  return `${field}${DETAIL_FIELD_SEPARATOR}${productType}`;
}

function renderChoiceGroup(name, label, values, selectedValue = state.data[name], getIconSrc = null) {
  return `
    <fieldset class="request-choice-group">
      <legend>${label}</legend>
      <div class="request-choice-grid">
        ${values.map(value => {
          const iconSrc = getIconSrc?.(value);

          return `
            <label class="request-choice ${selectedValue === value ? 'selected' : ''}">
              <input type="radio" name="${name}" value="${value}" ${selectedValue === value ? 'checked' : ''}>
              <span>${iconSrc ? `<img class="request-choice-icon" src="${iconSrc}" alt="" aria-hidden="true">` : ''}${value}</span>
            </label>
          `;
        }).join('')}
      </div>
    </fieldset>
  `;
}

function getBeltColorIconSrc(value) {
  if (value === 'Outra') return '';

  const filename = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-');

  return `${BELT_ICON_BASE_PATH}${filename}.png`;
}

function renderMultiChoiceGroup(name, label, values) {
  const selectedValues = state.data[name] || [];

  return `
    <fieldset class="request-choice-group request-choice-group-multiple">
      <legend>${label}</legend>
      <p class="request-help">Selecione um ou mais produtos. Cada produto terá perguntas próprias no próximo passo.</p>
      <div class="request-choice-grid">
        ${values.map(value => `
          <label class="request-choice request-choice-multiple ${selectedValues.includes(value) ? 'selected' : ''}">
            <input type="checkbox" name="${name}" value="${value}" ${selectedValues.includes(value) ? 'checked' : ''}>
            <span>${value}</span>
          </label>
        `).join('')}
      </div>
    </fieldset>
  `;
}

async function submitRequest() {
  const button = document.querySelector('[data-request-next]');
  button.disabled = true;
  button.textContent = BUTTON_LABELS.submitting;

  try {
    const responses = await Promise.all(buildPayloads().map(payload => fetch(`${API_BASE_URL}/v1/CustomerProductRequest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })));

    if (responses.some(response => !response.ok)) throw new Error('Request failed');

    state.status = REQUEST_STATUS.success;
    state.data = {};
    document.querySelector('.request-actions').style.display = 'none';
    document.getElementById('request-step-content').innerHTML = getStepHtml();
  } catch {
    document.querySelector('.request-error')?.remove();
    document.getElementById('request-step-content').insertAdjacentHTML('beforeend', renderError(ERROR_MESSAGES.submit));
    button.disabled = false;
    button.textContent = BUTTON_LABELS.submit;
  }
}

function renderError(message) {
  return `<p class="request-error">${message}</p>`;
}

function buildPayloads() {
  // TODO: suggest kimono size from height and weight after validating the sizing table with the store.
  return getSelectedProductTypes().map(productType => {
    const details = state.data[FIELD.productDetails]?.[productType] || {};

    return {
      customerName: state.data[FIELD.customerName],
      customerPhone: state.data[FIELD.customerPhone],
      modality: state.data[FIELD.modality],
      productType,
      brand: details[FIELD.brand] || null,
      size: details[FIELD.size] || null,
      color: details[FIELD.color] || null,
      heightCm: details[FIELD.heightCm] ? Number(details[FIELD.heightCm]) : null,
      weightKg: details[FIELD.weightKg] ? Number(details[FIELD.weightKg]) : null,
      age: details[FIELD.age] ? Number(details[FIELD.age]) : null,
      notes: buildNotes(details),
      website: state.data[FIELD.website] || null,
    };
  });
}

function buildNotes(details) {
  const notes = [];
  const productDetails = details[FIELD.productDetails]?.trim();
  const customerNotes = state.data[FIELD.notes]?.trim();

  if (productDetails) notes.push(`Detalhes do produto: ${productDetails}`);
  if (customerNotes) notes.push(customerNotes);

  return notes.length > 0 ? notes.join('\n') : null;
}

function getSelectedProductTypes() {
  return Array.isArray(state.data[FIELD.productTypes]) ? state.data[FIELD.productTypes] : [];
}
