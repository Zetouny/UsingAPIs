'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {
  return new Promise(resolve => {
    let currentPos = startPos;

    const repeat = setInterval(() => {
      console.log(currentPos, stopPos);
      if (currentPos >= stopPos) {
        clearInterval(repeat);
        resolve();
      }
      currentPos += STEP_SIZE_PX;
      img.style.left = `${currentPos}px`;
    }, STEP_INTERVAL_MS);
  });
}

function dance(img) {
  return new Promise(resolve => {
    const currentImgUrl = img.src;
    img.src = DANCING_CAT_URL;

    setTimeout(() => {
      img.src = currentImgUrl;
      resolve();
    }, DANCE_TIME_MS);
  });
}

function catWalk() {
  const img = document.querySelector('img');
  const startPos = Math.round(-img.width / 10) * 10;
  const centerPos = Math.round((window.innerWidth - img.width) / 2 / 10) * 10;
  const stopPos = window.innerWidth;

  document.body.style.overflow = 'hidden';
  img.style.left = startPos + 'px';

  const startWalking = () =>
    walk(img, startPos, centerPos)
      .then(() => dance(img))
      .then(() => walk(img, centerPos, stopPos))
      .then(startWalking);

  startWalking();
}

window.addEventListener('load', catWalk);
