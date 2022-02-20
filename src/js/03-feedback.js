import throttle from 'lodash.throttle';

// Выбираем нашу форму
const form = document.querySelector('.feedback-form');
const emailFormEl = document.querySelector('[name="email"]');
const feedbackMessageEl = document.querySelector('[name="message"]');

// Переменная для хранилища
const FEEDBACK_FORM_STATE = 'feedback-form-state';
// Пустой обьект для добавления значений в локальное хранилище
const formData = {};

// Добавляем слушатель на форму по сабмиту
form.addEventListener('submit', onFormSubmit);
// Вызываем функцию с проверкой, если хранилище пустое, поля должны быть пустыми
// Иначе заполняем поля данными из хранилища
savedFormData();

// Добавляем слушатель на инпут формы, он сохраняет значения инпута в хранилище
// На колбек инпута кидаем тротл
form.addEventListener(
  'input',
  throttle(evt => {
    formData[evt.target.name] = evt.target.value;

    localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(formData));
  }, 500),
);

// Функция сабмит
function onFormSubmit(evt) {
  // Отключаем перезагрузку страницы при сабмите
  evt.preventDefault();
  // Делаем консоль лог при сабмите
  console.log(formData);
  // Сбрасываем значения с формы после сабмита
  evt.currentTarget.reset();
  // Удаляем значения из локального хранилища после сабмита
  localStorage.removeItem(FEEDBACK_FORM_STATE);
}

function savedFormData() {
  const savedForms = localStorage.getItem(FEEDBACK_FORM_STATE);
  const parsedSavedForms = JSON.parse(savedForms);

  if (savedForms) {
    emailFormEl.value = parsedSavedForms.email;
    feedbackMessageEl.value = parsedSavedForms.message;
  }
}
