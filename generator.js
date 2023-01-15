import { fields, left_arm, right_arm } from "./constants";
import { renderResults } from "./renderResults";

export function generateWorkout(element) {
  element.addEventListener("submit", processFormSubmit);
}

function processFormSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());
  
  renderResults(generateRounds(value));
}



const generateRound = (values, increase_by = 0) => {

  let punches_internal = values.punches;
  let combination = [];

  const no_doubles = values.hasOwnProperty("no_doubles") && values.no_doubles === "on";
  const alternate_arm = values.hasOwnProperty("alternate_arm") && values.alternate_arm === "on";

  if(increase_by){
    punches_internal = parseInt(values.punches) + increase_by;
  }

  for(let i = 0; i < punches_internal; i++) {
    let newNumber = Math.floor(Math.random() * 6) + 1;
    if(i !== 0){
      if(alternate_arm) {
        // next punch must use different arm from previous punch
        if(left_arm.includes(newNumber) && left_arm.includes(combination[i-1])) {
          newNumber = right_arm[Math.floor(Math.random() * 3)];
        } else if(right_arm.includes(newNumber) && right_arm.includes(combination[i-1])) {
          newNumber = left_arm[Math.floor(Math.random() * 3)];
        }
      }else{
        if(no_doubles && newNumber === combination[i-1]) {
          newNumber = newNumber === 6 ? 1 : newNumber + 1;
        }
      }
    }
    combination.push(newNumber);
  }

  return combination;
};


const generateReps = (values, increase = 0) => {
  let combination;
  let  reps = [];

  const number_of_reps = values.hasOwnProperty("rounds") ? values.rounds : 1;
  const each_round_increases_punches = values.hasOwnProperty("increase_punches") && values.increase_punches === "on";

  for(let i = 0; i < number_of_reps; i++) {
    if(each_round_increases_punches) {
      combination = generateRound(values, increase);
    }else{
      combination = generateRound(values);
    }
    reps.push(combination);
  }
  return reps;
};

const generateRounds = (values) => {
  let rounds = [];
  const increase_punches = values.hasOwnProperty("increase_punches") && values.increase_punches === "on";
  const number_of_rounds = values.hasOwnProperty("sets") ? values.sets : 1;

  for(let i = 0; i < number_of_rounds; i++) {
    rounds.push(generateReps(values, increase_punches ? i : 0));
  }
  return rounds;
};