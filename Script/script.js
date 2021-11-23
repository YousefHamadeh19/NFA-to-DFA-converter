//Dummy array that will be converted to JSON
var dummy_states = {
  input1: {
    id: "input1",
    stateName: "q1",
    symbol: 0,
    transitTo: "q2",
  },
};

//Reference elements
var addStateBtn = document.getElementById("add-state-button");
var inputSection = document.getElementById("data-input-section");

//Event listeners
addStateBtn.addEventListener("click", function () {
  const newInput =
    `<div id="input${generateID()}">` +
    "<label>(</label>" +
    '<input type="text" placeholder="State Name" name="stateName">' +
    "<label>,</label>" +
    '<input type="text" placeholder="Symbol"  name="symbol">' +
    "<label>)</label>" +
    "<label>=</label>" +
    '<input type="text" placeholder="Transits to" name="transitTo">' +
    "</div>";
  inputSection.innerHTML += newInput;

  //when a new row is added refill all the input fields
  /**
   * jquery loops over all input tags in having ID "state"
   * then use the local storage to set attribute value to the input
   * (name in local storage == name in object/JSON file)
   */

  for (var state in dummy_states) {
    var inputData = JSON.parse(localStorage.getItem(state));
    $(`#${state} input`).each((childItem) => {
      var inputName = $(`#${state} input`)[childItem].name;
      $(`#${state} input`)[childItem].setAttribute(
        "value",
        inputData[inputName]
      );
    });
  }
});

$("input").on("input", updateArray); //listen to new input to update array

function updateArray(e) {
  //This function is adding info about new input to dummy state
  let parentId = e.target.parentElement.id;
  if (e.target.name === "stateName") {
    dummy_states[parentId] = {
      ...dummy_states[parentId],
      id: parentId,
      stateName: e.target.value,
    };
  } else if (e.target.name == "symbol") {
    dummy_states[parentId] = {
      ...dummy_states[parentId],
      id: parentId,
      symbol: e.target.value,
    };
  } else if (e.target.name === "transitsTo") {
    dummy_states[parentId] = {
      ...dummy_states[parentId],
      id: parentId,
      transitTo: e.target.value,
    };
  }
  console.log(parentId);
  // console.log(e.target.value);
}
setInterval(displayNFA, 5000);
function generateID() {
  var lastID = $("#data-input-section div").last().attr("id"); //this line will store in the variable
  //the id of the last div inside the #data-input-section
  var newID = "";
  for (var character in lastID) {
    if (!isNaN(lastID[character])) {
      newID += parseInt(lastID[character]) + 1;
    }
  }
  return newID;
}
function displayNFA() {
  /**
   * This function will use the data in the dummy_state object to get the transition code
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

  //write code to save the contents of dummy_state/JSON in the localStorage
  for (var state in dummy_states) {
    localStorage.setItem(state, JSON.stringify(dummy_states[state]));
  }
}

function getGraphDescription() {
  let text = "";
  for (let state in dummy_states) {
    transition = `${dummy_states[state].stateName} -> ${dummy_states[state].transitTo} [label = ${dummy_states[state].symbol}]`;
    text += transition + "\n";
  }

  return text;
}

/*
  Things to handel:
    1) When user adds new state the values inside the previous state(s) shouldn't be removed(solved using AJAX or cookies)
    2) 
    Things done:
    2) When user changes the symbol in or anything in the states it should be changed in the dummy_array 
    3) See comment in function 
    4) find a way to handel displaying the NFA
    5) When adding a state generate an ID for the parent div 
    
  */
