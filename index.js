const url = 'https://favqs.com/api/qotd';

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  showData(data);
}

function showData(data) {
  const quoteAuthor = data.quote.author;
  const quoteText = data.quote.body;
}

getData();