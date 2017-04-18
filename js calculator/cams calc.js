var model = {
  mainDis: document.getElementById("mainDis-content"),
  memDis: document.getElementById("memDis-content"),
  keypad: document.getElementsByClassName("keypad")[0],
  keys: document.getElementsByClassName("key"),
  mainEntry: [],
  memEntry: [],
  temp: []
};
var m = model;
//end model object

var control = {
  init: function() {
    m.keypad.addEventListener("click", c.getEntry);
document.addEventListener("keydown", c.getEntry);
    v.displayMain(m.mainEntry);
    v.displayMem(m.memEntry);
  },
  //main element interaction
  getEntry: function(e) {
    // control.checkMainLength()
    switch (e.type) {
      case "keydown":
        control.buttonPush(e.key);
        break;
      case "click":
        control.buttonPush(e.target.id);
        break;
      default:
        alert("improper input");
                  }
    
  },
  //process data
  buttonPush: function(key) {
    //sort which key was pressed
    var keysRegex = /[\d\+\/*\-\.]/g;    
    if (keysRegex.test(key)) {
      control.mainFunction(key);
      control.memFunction(key);
    };
    
    switch (true) {
      case key == "AC": 
        control.allClear();
        break;
      case key == "CE":
        control.clearEntry();
        break;
      case key == "Backspace":
        m.mainEntry.pop();
        m.memEntry.pop();
        v.displayMain(m.mainEntry);
        v.displayMem(m.memEntry);
        break;
      case key == "Enter" || key == "=":
        control.solve(key);
        break;
               }
  },
  allClear: function() {
    m.mainEntry = [];
    m.memEntry = [];
    m.functionEntry = [];
    m.mathArray = [];
    m.solution = [];
    v.displayMain(m.mainEntry);
    v.displayMem(m.memEntry);
  },
  clearEntry: function() {
    console.log(m.memEntry);
  },
  mainFunction: function(key) {
    var numRegex = /[\d\.]/g;
    var operatorRegex = /[\/*\+-]/g;
    //check to see if entry is a number or an operator
    if (numRegex.test(key)) {
      //clear numbers if an operator key has been pushed
      if (operatorRegex.test(m.mainEntry[0])) {
        m.mainEntry = [];
        v.displayMain(m.mainEntry);
      }
      m.mainEntry.push(key);
      v.displayMain(m.mainEntry);
    } else if (operatorRegex.test(key)) {
      m.mainEntry = [];
      m.mainEntry.push(key);
      v.displayMain(m.mainEntry);
    }
    
  },
  memFunction: function(key) {
    var numRegex = /[\d\.]/g;
    var operatorRegex = /[\/*\+-]/;
    var dupesRegex = /([\/*\+\-]{2,})/;
    m.memEntry.push(key);
    
    //check for single operator and consolidate entries for easier processing
    if (operatorRegex.test(key) && !operatorRegex.test(m.memEntry[m.memEntry.length-2])) {
      var tempEntry = m.memEntry.slice(0, m.memEntry.lastIndexOf(key)).join('');
      m.memEntry.splice(0, m.memEntry.lastIndexOf(key), tempEntry)
    }
    //remove duplicate operator and replace with most recently entered
    if (dupesRegex.test(m.memEntry.join(''))) {
      m.memEntry.splice(-2, 2, key)
    };
    // console.log(m.memEntry)
    v.displayMem(m.memEntry);   
  },
  
  solve: function(key) {
    var numRegex = /[\d]/g;
    //if the last entry wasn't a number alert the user
    if (!numRegex.test(m.memEntry[m.memEntry.length-1])) {
      alert("invalid last entry");
      return;
    }
    m.temp = eval(m.memEntry.join(''));
    m.mainEntry = [m.temp];
    
    m.memEntry.push("=", m.temp);   
    v.displayMain(m.mainEntry);
    v.displayMem(m.memEntry);
    console.log(m.memEntry, m.mainEntry)
    m.memEntry = [m.temp]; 
  },
  
  checkMainLength: function() {
    console.log(m.mainDis.clientWidth);
  },
 
};
var c = control;
//end controller obj

var view = {
  displayMain: function(content) {
    m.mainDis.innerHTML = content.join('');
  },
  displayMem: function(content) {
    m.memDis.innerHTML = content.join('');
  }
};
var v = view;
//end view object
//initiate app
window.focus();
c.init();