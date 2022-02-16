const url = 'https://favqs.com/api/qotd';

const quoteText = document.querySelector('.quote__text');
const quoteAuthor = document.querySelector('.quote__author');
const quoteReloadBtn = document.querySelector('.quote__reload-btn');

quoteReloadBtn.addEventListener('click', getData);

async function getData() {
  const COUNT_BG_IMAGES = 10;

  const getBackgroundImageIndex = () => {
    return Math.floor((Math.random() * COUNT_BG_IMAGES) + 1);
  }

  const img = new Image();
  img.src = `./assets/img/bg-${getBackgroundImageIndex()}.jpg`;

  const res = await fetch(url);
  const data = await res.json();

  data['img'] = img.src;

  showData(data);
}

function showData(data) {
  document.body.style.backgroundImage = `url('${data['img']}')`;
  quoteText.textContent = data.quote.body;
  quoteAuthor.textContent = data.quote.author;
}

getData();
