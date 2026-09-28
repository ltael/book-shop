// ================================================
// 1. КАТАЛОГ: данные о книгах и вывод карточек
// ================================================

// Список книг. У каждой книги есть id, автор, название, цена,
// цвет обложки и краткое описание.
const books = [
    { id: 1, author: 'Маркус Зусак', title: 'Книжный вор', price: 699, image: 'book-thief.jpg',
    description: 'Германия, 1939 год. Девочка Лизель ворует книги, а историю её жизни рассказывает сама Смерть.' },
  { id: 2, author: 'Джейн Остен', title: 'Гордость и предубеждение', price: 789, image: 'pride.jpg',
    description: 'История Элизабет Беннет и гордого мистера Дарси, которым предстоит преодолеть собственные предубеждения.' },
  { id: 3, author: 'Александр Дюма', title: 'Граф Монте-Кристо', price: 1600, image: 'monte-cristo.jpg',
    description: 'Эдмона Дантеса несправедливо заточают в замок Иф. Спустя годы он бежит и возвращается, чтобы отомстить.' },
  { id: 4, author: 'Александр Дюма', title: 'Три мушкетёра', price: 1000, image: 'musketeers.jpg',
    description: 'Приключения юного д’Артаньяна и его друзей Атоса, Портоса и Арамиса.' },
  { id: 5, author: 'Иэн Макьюэн', title: 'Искупление', price: 799, image: 'atonement.jpg',
    description: 'Лето 1935 года. Ошибка тринадцатилетней Брайони навсегда меняет жизнь её сестры и её возлюбленного.' },
  { id: 6, author: 'Эрих Мария Ремарк', title: 'Три товарища', price: 500, image: 'three-comrades.jpg',
    description: 'Трое друзей в Германии после Первой мировой войны. Роман о дружбе и любви.' },
  { id: 7, author: 'Эмили Бронте', title: 'Грозовой перевал', price: 650, image: 'wuthering-heights.jpg',
    description: 'Страстная и мрачная история любви Хитклифа и Кэтрин на вересковых пустошах Англии.' },
  { id: 8, author: 'Стивен Кинг', title: 'Кэрри', price: 399, image: 'carrie.jpg',
    description: 'Застенчивая школьница Кэрри обнаруживает у себя способность к телекинезу.' },
  { id: 9, author: 'Альбер Камю', title: "Посторонний", price: 500, image: 'stranger.jpg',
    description: 'Мерсо равнодушен ко всему вокруг, пока одно событие не меняет его жизнь.' },
  { id: 10, author: 'Агата Кристи', title: 'Убийство на поле для гольфа', price: 399, image: 'golf.jpg',
    description: 'Эркюль Пуаро расследует загадочное убийство на юге Франции.' },
  { id: 11, author: 'Маргарет Митчелл', title: 'Унесённые ветром', price: 1600, image: 'gone-with-wind.jpg',
    description: 'Судьба своенравной Скарлетт на фоне Гражданской войны в США.' },
  { id: 12, author: 'Дэниел Киз', title: 'Цветы для Элджернона', price: 460, image: 'algernon.jpga',
    description: 'Чарли Гордон участвует в эксперименте по повышению интеллекта и ведёт дневник.' },
];

// Находим на странице блок, куда будем выводить карточки
const catalogGrid = document.getElementById('catalog-grid');

// Функция возвращает HTML-код обложки книги
function createCover(book, extraClass = '') {
  return `<img class="cover ${extraClass}" src="images/${book.image}" alt="Обложка: ${book.title}">`;
}


// Выводим все книги в каталог
function renderCatalog() {
  catalogGrid.innerHTML = books.map((book) => `
    <article class="card">
      ${createCover(book)}
      <p class="card__author">${book.author}</p>
      <h3 class="card__title">${book.title}</h3>
      <p class="card__price">${book.price} ₽</p>
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
        <p class="details__price">${book.price} ₽</p>
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


// ================================================
// 3. КОРЗИНА
// ================================================

const cartList = document.getElementById('cart-list');
const cartEmpty = document.getElementById('cart-empty');
const cartFooter = document.getElementById('cart-footer');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Корзина — это массив вида [{ id: 1, qty: 2 }, { id: 5, qty: 1 }]
// При загрузке страницы достаём её из localStorage (если там что-то есть)
let cart = loadCart();

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch (error) {
    return [];
  }
}

// Сохраняем корзину в localStorage (там можно хранить только строки,
// поэтому превращаем массив в строку через JSON.stringify)
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Добавить книгу в корзину
function addToCart(id) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.qty += 1; // книга уже есть — увеличиваем количество
  } else {
    cart.push({ id: id, qty: 1 }); // книги нет — добавляем
  }
  updateCart();
}

// Изменить количество (+1 или -1). Меньше 1 не бывает.
function changeQty(id, delta) {
  const item = cart.find((item) => item.id === id);
  item.qty = Math.max(1, item.qty + delta);
  updateCart();
}

// Удалить книгу из корзины
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

// Посчитать общую сумму
function getTotal() {
  return cart.reduce((sum, item) => sum + findBook(item.id).price * item.qty, 0);
}

// Сохранить корзину и заново нарисовать её на странице
function updateCart() {
  saveCart();
  renderCart();
}

// Нарисовать корзину
function renderCart() {
  cartList.innerHTML = cart.map((item) => {
    const book = findBook(item.id);
    return `
      <li class="cart-item">
        ${createCover(book, 'cover--small')}
        <div class="cart-item__info">
          <p class="cart-item__title">${book.title}</p>
          <p class="cart-item__author">${book.author} · ${book.price} ₽</p>
        </div>
        <div class="cart-item__qty">
          <button class="btn qty-btn" type="button" data-action="minus" data-id="${book.id}" aria-label="Уменьшить">−</button>
          <span class="cart-item__count">${item.qty}</span>
          <button class="btn qty-btn" type="button" data-action="plus" data-id="${book.id}" aria-label="Увеличить">+</button>
        </div>
        <p class="cart-item__sum">${book.price * item.qty} ₽</p>
        <button class="btn cart-item__remove" type="button" data-action="remove" data-id="${book.id}" aria-label="Удалить">×</button>
      </li>`;
  }).join('');

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalQty;       // число на иконке корзины
  cartTotal.textContent = getTotal();     // итоговая сумма
  cartEmpty.hidden = cart.length > 0;     // «Корзина пуста» — только если пусто
  cartFooter.hidden = cart.length === 0;  // итог и кнопка — только если не пусто
}

// Клик по «Добавить в корзину» (в каталоге и в окне «Подробнее»)
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action="add"]');
  if (!button) return;
  addToCart(Number(button.dataset.id));

  // Небольшая подсказка на кнопке, что книга добавлена
  button.textContent = 'Добавлено ✓';
  setTimeout(() => { button.textContent = 'Добавить в корзину'; }, 1000);
});

// Клики по кнопкам внутри корзины: −, +, ×
cartList.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === 'plus') changeQty(id, 1);
  if (button.dataset.action === 'minus') changeQty(id, -1);
  if (button.dataset.action === 'remove') removeFromCart(id);
});

// Показываем корзину сразу при загрузке страницы
renderCart();


// ================================================
// 4. ОФОРМЛЕНИЕ ЗАКАЗА
// ================================================

const checkoutBtn = document.getElementById('checkout-btn');
const orderModal = document.getElementById('order-modal');
const orderForm = document.getElementById('order-form');
const orderTotal = document.getElementById('order-total');
const successModal = document.getElementById('success-modal');
const successText = document.getElementById('success-text');

// Кнопка «Оформить заказ» открывает окно с формой
checkoutBtn.addEventListener('click', () => {
  orderTotal.textContent = getTotal();
  orderModal.showModal();
});

// Кнопка «Создать заказ». Сюда попадаем, только если все поля
// заполнены правильно (это проверяет сам браузер: атрибуты required, pattern)
orderForm.addEventListener('submit', (event) => {
  event.preventDefault(); // не перезагружать страницу

  const data = new FormData(orderForm);
  successText.textContent =
    `${data.get('firstName')} ${data.get('lastName')}, мы доставим заказ на сумму ` +
    `${getTotal()} ₽ по адресу: ${data.get('address')}. Позвоним по номеру ${data.get('phone')}.`;

  orderModal.close();
  successModal.showModal(); // показываем «Заказ создан!»

  // Очищаем форму и корзину
  orderForm.reset();
  cart = [];
  updateCart();
});
