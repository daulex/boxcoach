import { punch_names } from "./constants";

export const renderResults = (workout) => {
  const results = document.querySelector("#results");
  results.innerHTML = "";
  
  workout.forEach((set, set_index) => {
    const set_element = document.createElement("div");
    set_element.classList.add("set");
    set_element.innerHTML = `<h3>Set ${set_index + 1}</h3>`;
    set.forEach((round, round_index) => {
      const round_element = document.createElement("div");
      round_element.classList.add("round");
      round_element.innerHTML = `<h4>Round ${round_index + 1}</h4>`;
      round.forEach((punch) => {
        const punch_element = document.createElement("div");
        punch_element.classList.add("punch");
        punch_element.innerHTML = `<strong>${punch}</strong> <em>${punch_names[punch - 1]}</em>`;
        round_element.appendChild(punch_element);
      });
      set_element.appendChild(round_element);
    });
    results.appendChild(set_element);
  });
  document.body.classList.add("results-showing");
}