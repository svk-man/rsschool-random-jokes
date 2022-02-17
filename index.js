const COUNT_BG_IMAGES = 10;
const preloadedBgImages = [];

function preloadBgImages() {
  for (i = 0; i < COUNT_BG_IMAGES; i++){
    preloadedBgImages[i] = new Image();
    preloadedBgImages[i].src = `./assets/img/bg-${i + 1}.jpg`;
  }
}

preloadBgImages();

const URLS = {
  'en': 'https://favqs.com/api/qotd',
  'ru': './assets/quotes.json',
}

let lang = 'en';
let url = URLS[lang];

const langSwitcher = document.querySelector('.lang-switcher');
const quoteText = document.querySelector('.quote__text');
const quoteAuthor = document.querySelector('.quote__author');
const quoteReloadBtn = document.querySelector('.quote__reload-btn');

langSwitcher.addEventListener('click', changeLanguage);
quoteReloadBtn.addEventListener('click', getData);

async function getData() {
  const res = await fetch(url);
  const data = await res.json();

  const getBgImageIndex = () => getRandomInt(0, COUNT_BG_IMAGES);
  data['img'] = preloadedBgImages[getBgImageIndex()].src;

  showData(data);
}

function showData(data) {
  document.body.style.backgroundImage = `url('${data['img']}')`;
  if (lang === 'en') {
    quoteText.textContent = trim(data.quote.body, 200);
    quoteAuthor.textContent = data.quote.author;
  } else {
    const getQuotesCount = () => data.length;
    const getQuoteIndex = () => getRandomInt(0, getQuotesCount());
    const quoteIndex = getQuoteIndex();

    quoteText.textContent = data[quoteIndex].text;
    quoteAuthor.textContent = data[quoteIndex].author;
  }
}

function changeLanguage(event) {
  const langSwitcherBtn = event.target;
  const isLangSwitcherBtn = langSwitcherBtn.classList.contains('lang-switcher__btn');
  if (isLangSwitcherBtn) {
    const _lang = langSwitcherBtn.dataset.lang;
    lang = _lang;
    url = URLS[lang];
    getData();
  }
}

function trim(text, maxLength) {
  if (text.length >= maxLength) {
    return text.slice(0, maxLength - 1) + '...';
  }

  return text;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

getData();
