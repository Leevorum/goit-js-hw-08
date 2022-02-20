// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
// 1)Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
const galleryDivElem = document.querySelector('.gallery');
console.log(galleryDivElem);
// делаем рендер галереии
function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
            <div class="gallery__item">
                <a class="gallery__link" href="#${original}">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </div>`;
    })
    .join('');
}
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryDivElem.insertAdjacentHTML('beforeend', galleryMarkup);

//Делегирование на div.gallery
galleryDivElem.addEventListener('click', onImgClick);

const instance = basicLightbox.create(`<img class="gallery__image">`, {
  onShow: () => {
    window.addEventListener('keydown', onEscClick);
  },

  onClose: () => {
    window.removeEventListener('keydown', onEscClick);
  },
});

function onImgClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  instance.element().querySelector('.gallery__image').src = evt.target.dataset.source;

  instance.show();
}

function onEscClick(evt) {
  if (evt.key === 'Escape') {
    instance.close();
    return;
  }
}
// Модальное окно
// Создаем функцию, при клике создает модальное окно
// суперзамудреное решение)
// function imageOnClick(evt) {
//   //Предотвращение перехода по ссылке
//   evt.preventDefault();
//   // Открытие модалки только по картинке
//   if (evt.target.nodeName !== "IMG") {
//     return;
//   }
//   // Создаем с помощью библиотеки модалку с нашей большой картинкой
//   const instance = basicLightbox.create(`
//     <img src="${evt.target.dataset.source}" width="800" height="600">
// `);
//   instance.show();
//   // Функция закрытия модалки по ESC
//   function closeModalEsc(evt) {
//     //   Лог для проверки что Listener снят
//     console.log(evt);
//     // При нажатии на ESC передаем функцию библиотеки, с анонимной функцией удаления листенера
//     if (evt.code === "Escape") instance.close(() => window.removeEventListener("keydown", closeModalEsc));
//   }
//   // При создании модалки добавляем листенер
//   window.addEventListener("keydown", closeModalEsc);
// }
