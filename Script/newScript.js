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

function generateState(nfa_states) {
  console.log("in function gen state");
  var lastState = nfa_states[nfa_states.length - 1]; //this line will store in the last element in the array
  var newID = "";
  for (var character in lastState) {
    console.log("at char " + character);
    if (!isNaN(lastState[character])) {
      newID += parseInt(lastState[character]) + 1;
    }
  }
  console.log("the new Id is " + newID);
}

function convertToDFA(nfa_InitialState, nfa_states, nfa_transitions) {
  let new_state = "";
  let temp_dfa_states = [];
  temp_dfa_states.push(nfa_InitialState);
  let final_dfa_states = [];
  while (temp_dfa_states.length != 0) {
    //see if the first element in temp_dfa_states is in the nfa_states
    nfa_states.forEach((state) => {
      if (state == temp_dfa_states[0]) {
        console.log("accessed if");
        // // if yes, the state will pass through a for loop and its transitions over the same letter in the
        // // alphabet will be concatenated as the same string forming one state
        for (var i = 0; i < alphabet.length; i++) {
          for (var j = 0; j < nfa_transitions.length; j++) {
            if (
              temp_dfa_states[0] == nfa_transitions[j].currentState.trim() &&
              alphabet[i] == nfa_transitions[j].symbol
            ) {
              new_state += nfa_transitions[j].destination + " ";
            }
          }
          //add to temp states
          if (new_state == "") {
            //deal with it later
            //create a dead state in dfa
            //the state that resulted in this transitions will go to this dead state in the dfa transition
          } else {
            temp_dfa_states.push(new_state.trim());
          }
          new_state = "";
        }
      } else {
        console.log("accessed else");
        //if state not included, then this is a complex state, made of two or more states, then split the string
        //get transitions of each state and then join all the results over a single alphabet
        let complex_states = temp_dfa_states[0].split(" ");
        console.log("first element " + complex_states[0]);
        for (var j = 0; j < alphabet.length; j++) {
          for (var i = 0; i < complex_states.length; i++) {
            for (var z = 0; z < nfa_transitions.length; z++) {
              console.log(
                "working on " +
                  complex_states[i].trim() +
                  " " +
                  nfa_transitions[z].currentState
              );
              if (
                complex_states[i].trim() == nfa_transitions[z].currentState &&
                alphabet[j] == nfa_transitions[z].symbol
              ) {
                new_state += nfa_transitions[z].destination + " ";
              }
            }
          }
          console.log("new state generated " + new_state);
          //remove duplicate characters from string
          new_state = new_state
            .split(" ")
            .filter(function (item, pos, self) {
              return self.indexOf(item) == pos;
            })
            .join("");
          if (!temp_dfa_states.includes(new_state.trim()) && new_state != "") {
            temp_dfa_states.push(new_state);
          }
          new_state = "";
        }
      }
    });
    final_dfa_states.push(temp_dfa_states.shift());
    console.log(final_dfa_states);
    console.log("temp dfa " + temp_dfa_states);
  }
  console.log("Final dfa states " + JSON.stringify(final_dfa_states));

  //remove duplicate element from the array
  final_dfa_states = final_dfa_states.map((state) => {
    if (state.includes(" ")) state = state.split(" ").join("");
    return state;
  });
  final_dfa_states = final_dfa_states.filter((state, index) => {
    return final_dfa_states.indexOf(state) === index;
  });
  //loop over elements and remove white spaces if any is found
  console.log("Final dfa states " + JSON.stringify(final_dfa_states));
  //generate the getDFAText function
}

generateState(NFA_states);
// displayNFA();
// getGraphDescription();
// setInterval(() => {
convertToDFA(NFA_InitialState, NFA_states, NFA_transitions);
// }, 5000);
