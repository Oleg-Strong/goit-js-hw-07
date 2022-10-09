import { galleryItems } from "./gallery-items.js";
// Change code below this line

// Функция которая создаёт разметку карточек изображений
function createImgCard(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

// Создаём элемент с изображением исходя из данных массива обьектов
const galleryEl = createImgCard(galleryItems);

// Родительский элемент DOM
const galleryConteiner = document.querySelector(".gallery");

// Добавляем слушателя события на родительский элемент
galleryConteiner.addEventListener("click", createModalEl);

// Добавляем в разметку элементы с изображением
galleryConteiner.insertAdjacentHTML("beforeend", galleryEl);

// Функция открытия модального окна
function createModalEl(event) {
  event.preventDefault();
  const { target } = event;
  if (!target.dataset.source) {
    return;
  }
  const instance = basicLightbox.create(
    `
		<img width="1400" height="900" src="${target.dataset.source}" alt="${target.alt}"/>
	`
  );
  instance.show();

  window.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      instance.close();
    }
  });
}
