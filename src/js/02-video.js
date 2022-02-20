import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
// Константа для хранилища
const VIDEOPLAYER_CURRENT_TIME = 'videoplayer-current-time';
const getTime = localStorage.getItem(VIDEOPLAYER_CURRENT_TIME);

if (getTime) {
  player.setCurrentTime(Number(getTime));
}
// Метод он с колбеком, добавляем тротл с 1 секундой
player.on(
  'timeupdate',
  throttle(evt => {
    setLocalStorage(evt);
  }, 1000),
);

// Метод устанавливающий в локальное хранилище значение из timeupdate

const setLocalStorage = evt => {
  localStorage.setItem(VIDEOPLAYER_CURRENT_TIME, evt.seconds.toString());
  // Удаляем из локального хранилища значения, если видео закончится, оно должно начинаться сначала
  if (evt.seconds === evt.duration) {
    localStorage.removeItem(VIDEOPLAYER_CURRENT_TIME);
  }
};
