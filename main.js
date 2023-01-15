// import { setupCounter } from './counter.js'

import { generateWorkout } from "./generator";

// setupCounter(document.querySelector('#counter'))

generateWorkout(document.querySelector("#form form"));

document.querySelector("#toggle-punch-names").addEventListener("click", (event) => {
  event.preventDefault();
  document.body.classList.toggle("show-punch-names");
  if(document.body.classList.contains("show-punch-names")) {
    event.target.innerHTML = "Hide Punch Names";
  } else {
    event.target.innerHTML = "Show Punch Names";
  }

} );  