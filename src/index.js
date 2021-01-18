//import "./styles/main.scss";
//const jsdom = require("jsdom");
//const { JSDOM } = jsdom;

import pretest from "./pretest.js";
import luhn from "./luhn.js";

const inputNum = document.getElementById("ccnumber");
const outputMsg = document.getElementById("result-msg");
const btn = document.getElementsByClassName("check-btn")[0];

//let hidden = false;

inputNum.oninput = handleInput;

function handleInput() {
  const message = !!pretest(inputNum.value);
  console.log(message);
  outputMsg.textContent = pretest(inputNum.value);
  if (message) {
    btn.style.display = "inline-block";
  }
}
console.log(inputNum.value); //?
btn.addEventListener("click", () => {
  //outputMsg.textContent = luhn(inputNum.value);
  document.getElementById("checked").innerText = luhn(inputNum.value);
});

// function displayVerified(passed) {
//   if (passed === true) {
//     const validNum = luhn(number);
//   }
// }
