/** Data */

const alphabet = [0, 1];
let NFA_InitialState = "q1";
let NFA_FinalStates = ["q3"];
let NFA_states = ["q1", "q2", "q3"];

const NFA_transitions = [
  {
    currentState: "q1",
    symbol: 0,
    destination: "q1",
  },
  {
    currentState: "q1",
    symbol: 0,
    destination: "q2",
  },
  {
    currentState: "q1",
    symbol: 1,
    destination: "q3",
  },
  {
    currentState: "q2",
    symbol: 0,
    destination: "q1",
  },
  {
    currentState: "q2",
    symbol: 1,
    destination: "q2",
  },
  {
    currentState: "q3",
    symbol: 1,
    destination: "q1",
  },
  {
    currentState: "q3",
    symbol: 1,
    destination: "q2",
  },
];

var DFA_InitialState = "";
var DFA_FinalStates = [];
var DFA_transitions = [];

/** Referencing elements */

const NFA_area = document.getElementById("NFA");

/** Functions */

function getGraphDescription() {
  let text = `node [shape = doublecircle] ${[
    ...NFA_FinalStates,
  ]}\nnode [shape = circle]\n`;

  for (let transition in NFA_transitions) {
    text += `${NFA_transitions[transition].currentState} -> ${NFA_transitions[transition].destination} [label = ${NFA_transitions[transition].symbol}]\n`;
  }
  console.log(text);
  return text;
}

function displayNFA() {
  /**
   * This function will use the data in the transition arrays to get the transition code
   * in the DOT format to visualise it
   */

  const textGraph = getGraphDescription(); // this function will return a string
  // that will be used in the next line to create
  // variable sample and then pass it to function viz to be represented
  var sample = `digraph g { rankdir = "LR"\n ${textGraph} }`;
  var options = {
    format: "svg",
    // format: "png-image-element",
  };

  var image = Viz(sample, options);
  var main = document.getElementById("NFA");

  main.innerHTML = image; // SVG
}

// function convertToDFA() {
//   // Therefore for this symbol the current state goes to a dead state in the DFA and the function add this transition
//   // to the DFA transition array

//   var stateSymbol = []; // this array contains the symbols that the states are using from my language
//   for (let state in NFA_states) {
//     // loop over state array and hold a name
//     for (let transition in NFA_transitions) {
//       // for this state check in the transitions array if there are symbols in the alphabet where this
//       // state has no destination states
//       if (NFA_states[state].name === NFA_transitions[transition].currentState) {
//         stateSymbol.push(NFA_transitions[transition].symbol);
//       }

//       //the below code is to remove duplicates from the array stateSymbolArray
//     }
//     console.log("Your array is " + stateSymbol);
//     stateSymbol = getMissingElement(stateSymbol); // return which symbol does this state does not have a dead configurationstransition
//     console.log("The missing elements are " + stateSymbol);
//     DFA_transitions.push({
//       currentState: NFA_states[state].name,
//       symbol: stateSymbol,
//     });
//   }
// }

// function convertToDFA(nfa_initialState, nfa_states, nfa_transitions) {
//   var newTransitions = "";
//   DFA_InitialState = nfa_initialState;
//   //the if block will be executed if the DFA_transitions is empty
//   for (let transition in nfa_transitions) {
//     if (DFA_transitions.length == 0) {
//       //for each letter in the alphabet see the transitions
//       for (let letter in alphabet) {
//         if (
//           DFA_InitialState == nfa_transitions[transition].currentState &&
//           letter == nfa_transitions[transition].symbol
//         )
//           newTransitions += nfa_transitions[transition].destination + " ";
//         //push the {initialState, symbol and destinations to it}
//         DFA_transitions.push({
//           state: DFA_InitialState,
//           symbol: letter,
//           destination: newTransitions,
//         });
//         newTransitions = "";
//       }
//     } else {
//       console.log("else block");
//       for (let state in DFA_transitions) {
//         if (nfa_states.includes(DFA_transitions[state].destination)) {
//           /**currently working on if the destination is not included */
//           // var result = nfa_transitions.find((state, index) => {
//           //   if (state.currentState == "q2") return true;
//           // });
//         } else {
//           //split destination becuase it's a complex destination (made of more than one destination)
//           const destinations = DFA_transitions[state].destination
//             .trim()
//             .split(" ");
//           console.log("Array of destinations " + destinations);
//           //for each letter in the alphabet see the destination for each element from the destinations array
//           //over it the com is the destination of the
//           for (let letter in alphabet) {
//             console.log("At letter " + letter);
//             destinations.forEach((destination) => {
//               console.log("At destination " + destination);
//               nfa_transitions.find((state, index) => {
//                 console.log("Currently at state " + state.currentState);
//                 if (
//                   destination === state.currentState &&
//                   state.symbol == letter
//                 ) {
//                   newTransitions += state.destination;
//                   console.log("new transition " + newTransitions);
//                 }
//               });
//               DFA_transitions.push({
//                 state: destination,
//                 symbol: letter,
//                 destination: newTransitions,
//               });
//               console.log(DFA_transitions);
//               return;
//             });
//             // console.log(
//             //   "In DFA the transition under letter " +
//             //     letter +
//             //     " for this state is " +
//             //     newTransitions
//             // );
//             // newTransitions = "";
//           }
//         }
//       }
//     }
//   }
// }

function convertToDFA(nfa_InitialState, nfa_states, nfa_transitions) {
  let new_state = "";
  let temp_dfa_states = [nfa_InitialState]; //first we check if the state here is in the nfa states array

  let final_dfa_states = [];
  while (temp_dfa_states.length != 0) {
    console.log("start temp dfa " + temp_dfa_states);
    //see if the first element in temp_dfa_states is in the nfa_states
    nfa_states.forEach((state) => {
      if (state === temp_dfa_states[0]) {
        // // if yes, the state will pass through a for loop and its transitions over the same letter in the
        // // alphabet will be concatenated as the same string forming one state
        // console.log("accessed if");
        // for (var i = 0; i < alphabet.length; i++) {
        //   for (var j = 0; j < nfa_transitions.length; j++) {
        //     if (
        //       temp_dfa_states[0] == nfa_transitions[j].currentState.trim() &&
        //       alphabet[i] == nfa_transitions[j].symbol
        //     ) {
        //       new_state += nfa_transitions[j].destination + " ";
        //     }
        //   }
        //   //add to temp states
        //   if (new_state == "") {
        //     //deal with it later
        //     //create a dead state in dfa
        //     //the state that resulted in this transitions will go to this dead state in the dfa transition
        //   } else {
        //     temp_dfa_states.push(new_state.trim());
        //   }
        //   new_state = "";
        // }
      } else {
        console.log("accessed else");
        //if state not included, then this is a complex state, made of two or more states, then split the string
        //get transitions of each state and then join all the results over a single alphabet
        let complex_states = temp_dfa_states[0].split(" ");
        let complex_states_transition = {
          0: "",
          1: "",
        };
        console.log("start " + JSON.stringify(complex_states_transition));
        complex_states.forEach((state) => {
          for (let letter in alphabet) {
            for (let transition in nfa_transitions) {
              if (state == nfa_transitions[transition].currentState) {
                new_state += nfa_transitions[transition].destination;
              }
            }
            console.log(new_state);
            complex_states_transition[alphabet[letter]] += new_state;
          }
        });
        console.log("end " + JSON.stringify(complex_states_transition));
        complex_states_transition = {
          0: "",
          1: "",
        };
      }
    });
    // final_dfa_states.push();
    temp_dfa_states.shift();
  }
}
function getMissingElement(symbolsArray) {
  console.log("The input is " + symbolsArray);
  let found = [];
  language.forEach((element) => {
    found.push(symbolsArray.includes(element) === false ? element : "");
  });

  found = found.filter((symbol) => {
    return symbol !== "";
  });

  return found;
}
// displayNFA();
// getGraphDescription();
// setInterval(() => {
convertToDFA(NFA_InitialState, NFA_states, NFA_transitions);
// }, 5000);
