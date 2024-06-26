import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delay = parseInt(event.target.elements.delay.value);
    const state = event.target.elements.state.value;

    createPromise(delay, state)
      .then((delay) => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${delay}ms`
        });
        console.log(`✅ Fulfilled promise in ${delay}ms`);
      })
      .catch((delay) => {
        iziToast.error({
          message: `❌ Rejected promise in ${delay}ms`
        });
        console.log(`❌ Rejected promise in ${delay}ms`);
      });
  });

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }
});
