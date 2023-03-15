const billInput = document.getElementById("bill-input");
const tipButtons = document.querySelectorAll("#tips");
const customTipInput = document.querySelector(".tip-custom");
const numPeopleInput = document.getElementById("number-people");
const tipAmountOutput = document.getElementById("tip-amount");
const totalAmountOutput = document.getElementById("total-amount");
const resetButton = document.querySelector(".reset");
const errorMessage = document.querySelector(".error-msg");

let billAmount = 0;
let tipPercent = 0;
let numPeople = 1;

billInput.addEventListener("input", function () {
  billAmount = parseFloat(billInput.value);
  calculateTip();
});

billInput.addEventListener("click", function () {
  billInput.classList.add("valid");
});

tipButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    tipPercent = parseInt(button.textContent);
    customTipInput.value = "";
    calculateTip();
  });
});

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipButtons.forEach((otherButton) => {
      otherButton.classList.remove("selected");
    });
    button.classList.toggle("selected");
  });
});

customTipInput.addEventListener("input", function () {
  tipPercent = parseFloat(customTipInput.value);

  calculateTip();
});

customTipInput.addEventListener("click", function () {
  customTipInput.classList.add("valid-tip");
});
numPeopleInput.addEventListener("input", function () {
  numPeople = parseInt(numPeopleInput.value);

  if (numPeople === 0) {
    numPeopleInput.classList.add("error");
    numPeopleInput.classList.remove("valid");
    errorMessage.classList.add("error-popped");
  } else {
    errorMessage.classList.remove("error-popped");
    numPeopleInput.classList.remove("error");
    numPeopleInput.classList.add("valid");
    calculateTip();
  }
});

resetButton.addEventListener("click", function () {
  billAmount = 0;
  tipPercent = 0;
  numPeople = 1;
  billInput.value = "";
  customTipInput.value = "";
  numPeopleInput.value = "";
  tipAmountOutput.textContent = "$0.00";
  totalAmountOutput.textContent = "$0.00";
});

function calculateTip() {
  let tipAmount = (billAmount * tipPercent) / 100;
  let totalAmount = billAmount + tipAmount;
  let tipAmountPerPerson = tipAmount / numPeople;
  let totalAmountPerPerson = totalAmount / numPeople;

  if (isNaN(tipAmountPerPerson)) {
    tipAmountPerPerson = 0;
  }

  if (isNaN(totalAmountPerPerson)) {
    totalAmountPerPerson = 0;
  }

  tipAmountOutput.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
  totalAmountOutput.textContent = `$${totalAmountPerPerson.toFixed(2)}`;
}


