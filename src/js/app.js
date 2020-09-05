import films from './data';

const wrapper = document.querySelector('.wrapper');
const spans = document.getElementsByTagName('span');

const fragment = new DocumentFragment();
const table = document.createElement('TABLE');
const caption = document.createElement('CAPTION');
const thead = document.createElement('THEAD');
const tbody = document.createElement('TBODY');

caption.innerText = 'Таблица 1. Фильмы и не только...';
thead.innerHTML = `
    <tr>
    <th>id<span></span></th>
    <th>title<span></span></th>
    <th>year<span></span></th>
    <th>imdb<span></span></th>
    </tr>
  `;

function getHTML() {
  let html = '';

  films.forEach((film) => {
    html += `
      <tr>
      <td>${film.id}</td>
      <td>${film.title}</td>
      <td>(${film.year})</td>
      <td>imdb: ${film.imdb.toFixed(2)}</td>
      </tr>
      `;
  });

  return html;
}

tbody.insertAdjacentHTML('afterBegin', getHTML());
table.append(caption);
table.append(thead);
table.append(tbody);
fragment.append(table);
wrapper.append(fragment);

const sortOrderList = [[1, 'id'], [0, 'id'],
  [1, 'title'], [0, 'title'],
  [1, 'year'], [0, 'year'],
  [1, 'imdb'], [0, 'imdb']];

let increment = 0;

function sortRows(orderList) {
  let max;
  let min;
  let position;
  const order = orderList[increment % 8];

  const column = Array.from(thead.querySelectorAll('th'))
    .filter((elem) => elem.innerText === order[1])[0];

  if (+order[0] === 1) {
    position = '-2px center';
    max = 1;
    min = -1;
  } else {
    position = '-18px center';
    max = -1;
    min = 1;
  }

  if (order[1] === 'id') {
    films.sort((a, b) => (+a[order[1]] > +b[order[1]] ? max : min));
  } else if (order[1] === 'title') {
    films.sort((a, b) => (a[order[1]].replace('ё', 'е') > b[order[1]].replace('ё', 'е') ? max : min));
  } else {
    films.sort((a, b) => (a[order[1]] > b[order[1]] ? max : min));
  }

  Array.from(spans).forEach((span) => {
    const elem = span;
    elem.style.backgroundPosition = '-35px center';
  });

  increment += 1;
  column.querySelector('span').style.backgroundPosition = position;

  tbody.innerText = '';
  tbody.insertAdjacentHTML('afterBegin', getHTML());
}

setInterval(() => {
  sortRows(sortOrderList);
}, 2000);
