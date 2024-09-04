
const decreaseButton = document.querySelector('.decrease');
const increaseButton = document.querySelector('.increase');
const quantityDisplay   
 = document.querySelector('.quantity');

let quantity = 1; // Initial quantity

decreaseButton.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    quantityDisplay.textContent = quantity;
  }
});

increaseButton.addEventListener('click', () => {
  quantity++;
  quantityDisplay.textContent = quantity;
});