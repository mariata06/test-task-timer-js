const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    if (this.timeout) {
      clearTimeout(timeout);
    };
    const startTime = Date.now();
    let totalTime = 0;
    let drift = 0
    let stop = false;

    const round = (seconds) => {
      if (!stop) {
        timeout = setTimeout(() => {
          if (seconds < 1) {
            stop = true;
            clearTimeout(timeout);
          };

          h = Math.floor(seconds / 3600);
          m = Math.floor((seconds - h * 3600) / 60);
          s = seconds % 60;
      
          timerEl.textContent = `${zeroAdder(h)}:${zeroAdder(m)}:${zeroAdder(s)}`;

          totalTime += 1000;
          let elapsedTime = Date.now() - startTime;
          drift = elapsedTime - totalTime;
          // console.log(drift);

          seconds -= 1;
          round(seconds);
        }, 1000 - drift);
      };
    };
    round(seconds);
  };
};

function zeroAdder(n) {
  return n < 10 ? `0${n}` : `${n}`;
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (el) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  el.target.value = el.target.value.replace(/\D/g,"");
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
