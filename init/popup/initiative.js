// select the item element
const item = document.getElementsByClassName("card");
const graveStones = document.getElementsByClassName("grave-stone");

// Handles bloodied toggle
function bloodied(e) {
  if (e.target.classList.contains("bloodied")) {
    e.target.classList.remove("bloodied");
    let graveStone = graveStones[e.target.id - 1];
    graveStone.style.backgroundColor = "transparent";
  } else {
    e.target.classList.add("bloodied");
    let graveStone = graveStones[e.target.id - 1];
    graveStone.style.backgroundColor = "white";
  }
}

// attach the dragstart event handler to all class items
for (let i = 0; i < item.length; i++) {
  let addClass = item[i];
  addClass.addEventListener("dragstart", dragStart);
  addClass.addEventListener("dblclick", bloodied);
}

// handle the dragstart
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
}

const dropzone = document.querySelectorAll(".dropzone");

dropzone.forEach((zone) => {
  zone.addEventListener("dragenter", dragEnter);
  zone.addEventListener("dragover", dragOver);
  zone.addEventListener("dragleave", dragLeave);
  zone.addEventListener("drop", drop);
});

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragLeave(e) {
  e.target.classList.remove("drag-over");
}

function drop(e) {
  e.target.classList.remove("drag-over");

  // get the draggable element
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);

  // add it to the drop target
  e.target.appendChild(draggable);

  // display the draggable element
  draggable.classList.remove("hide");
}

// Handles death toggle
const death = document.getElementsByClassName("grave-stone-div");

for (let i = 0; i < death.length; i++) {
  let addClass = death[i];
  addClass.addEventListener("click", deathToggle);
}

function deathToggle(e) {
  e.target.parentElement.remove();
}

// Handles new round
const doneList = document.getElementById("done-list");
const waitList = document.getElementById("wait-list");

let divCheckingInterval = setInterval(function () {
  if (waitList.children.length == 0) {
    newRound(doneList.children)
  }
}, 500);

function newRound(children) {
  let cards = [];
  for (let card of children) {
    cards.push(card);
  }
  for (let card of cards) {
    waitList.appendChild(card);
  }
}
