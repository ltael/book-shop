// ================================================
// 1. КАТАЛОГ: данные о книгах и вывод карточек
// ================================================

// Список книг. У каждой книги есть id, автор, название, цена,
// цвет обложки и краткое описание.
const books = [
  { id: 1, author: 'Douglas Crockford', title: 'JavaScript: The Good Parts', price: 30, color: '#1f9e96',
    description: 'Классическая книга о лучших и надёжных частях языка JavaScript.' },
  { id: 2, author: 'David Herman', title: 'Effective JavaScript', price: 22, color: '#2b2b2b',
    description: '68 конкретных советов, как писать на JavaScript понятно и без ошибок.' },
  { id: 3, author: 'David Flanagan', title: 'JavaScript: The Definitive Guide', price: 40, color: '#127a74',
    description: 'Большой справочник по языку: от основ до браузерных API.' },
  { id: 4, author: 'Eric Elliott', title: 'Programming JavaScript Applications', price: 19, color: '#3d7f8c',
    description: 'Как проектировать крупные и удобные в поддержке приложения на JavaScript.' },
  { id: 5, author: 'Addy Osmani', title: 'Learning JavaScript Design Patterns', price: 32, color: '#5b6b3a',
    description: 'Паттерны проектирования и как применять их в JavaScript.' },
  { id: 6, author: 'Boris Cherny', title: 'Programming TypeScript', price: 28, color: '#2f5f9e',
    description: 'Введение в TypeScript: типы, классы и настройка проекта.' },
  { id: 7, author: 'Alex Banks, Eve Porcello', title: 'Learning React', price: 25, color: '#0f8c8c',
    description: 'Современный React шаг за шагом: компоненты, хуки и состояние.' },
  { id: 8, author: 'Mike Cantelon и др.', title: 'Node.js in Action', price: 38, color: '#3a3f4b',
    description: 'Как писать серверные приложения на Node.js.' },
  { id: 9, author: 'Kyle Simpson', title: "You Don't Know JS: Up & Going", price: 15, color: '#c9a227',
    description: 'Первая книга серии о том, как на самом деле работает JavaScript.' },
  { id: 10, author: 'John Resig, Bear Bibeault', title: 'Secrets of the JavaScript Ninja', price: 35, color: '#8a4b2a',
    description: 'Продвинутые приёмы: функции, замыкания, прототипы и работа с DOM.' },
  { id: 11, author: 'Marijn Haverbeke', title: 'Eloquent JavaScript', price: 27, color: '#a8452f',
    description: 'Выразительный JavaScript: программирование с нуля на живых примерах.' },
  { id: 12, author: 'Nicholas C. Zakas', title: 'Understanding ECMAScript 6', price: 24, color: '#4a3f7a',
    description: 'Все новые возможности стандарта ES6 с понятными примерами.' },
];

// Находим на странице блок, куда будем выводить карточки
const catalogGrid = document.getElementById('catalog-grid');

// Функция возвращает HTML-код обложки книги
function createCover(book, extraClass = '') {
  return `
    <div class="cover ${extraClass}" style="background: ${book.color}">
      <span class="cover__title">${book.title}</span>
      <span class="cover__author">${book.author}</span>
    </div>`;
}

// Выводим все книги в каталог
function renderCatalog() {
  catalogGrid.innerHTML = books.map((book) => `
    <article class="card">
      ${createCover(book)}
      <p class="card__author">${book.author}</p>
      <h3 class="card__title">${book.title}</h3>
      <p class="card__price">${book.price} $</p>
      <div class="card__buttons">
        <button class="btn" type="button" data-action="details" data-id="${book.id}">Подробнее</button>
        <button class="btn btn--primary" type="button" data-action="add" data-id="${book.id}">Добавить в корзину</button>
      </div>
    </article>
  `).join('');
}

renderCatalog();

// ================================================
// 2. МОДАЛЬНОЕ ОКНО «ПОДРОБНЕЕ»
// ================================================

const bookModal = document.getElementById('book-modal');
const bookModalBody = document.getElementById('book-modal-body');

// Находим книгу в массиве по её id
function findBook(id) {
  return books.find((book) => book.id === id);
}

// Показываем окно с подробной информацией о книге
function showDetails(id) {
  const book = findBook(id);
  bookModalBody.innerHTML = `
    <div class="details">
      ${createCover(book, 'cover--small')}
      <div>
        <h2 class="details__title">${book.title}</h2>
        <p class="details__author">${book.author}</p>
        <p class="details__text">${book.description}</p>
        <p class="details__price">${book.price} $</p>
        <button class="btn btn--primary" type="button" data-action="add" data-id="${book.id}">Добавить в корзину</button>
      </div>
    </div>`;
  bookModal.showModal(); // открыть окно
}

// Один обработчик на весь каталог: смотрим, по какой кнопке кликнули
catalogGrid.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.action === 'details') {
    showDetails(Number(button.dataset.id));
  }
});

// Закрытие любого модального окна: по крестику или по клику на тёмный фон
document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.closest('[data-close]')) {
      modal.close();
    }
  });
});
