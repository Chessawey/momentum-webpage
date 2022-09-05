const search = document.querySelector(".search-input");
const searchLink = document.querySelector(".search-link");

search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log(search.value);
    searchLink.href = `https://www.google.com/search?q=${search.value}`;
    searchLink.click();
    search.value = "";
  }
});

const greeting = document.querySelector(".greeting");
// TIME
function displayTime() {
  const timeOnScreen = document.querySelector(".time");
  let hours = new Date().getHours();
  let timeFormat = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  if (hours <= 12) {
    timeOnScreen.textContent = `${timeFormat}`
  } else {
    timeOnScreen.textContent = `${timeFormat}`
  }

  greeting.textContent = `${localStorage.getItem("name")}`;
  if (hours < 12) {
    greeting.textContent = `Good morning, ${localStorage.getItem("name")}`;
  } else if (hours > 11 && hours < 18) {
    greeting.textContent = `Good afternoon, ${localStorage.getItem("name")}`;
  } else {
    greeting.textContent = `Good evening, ${localStorage.getItem("name")}`;
  }
}
setInterval(displayTime, 100);

const pageBG = document.querySelector("body")
let numberBG = Math.floor(Math.random() * 14)
pageBG.style.background = `url(../assets/${numberBG}.jpg`




const nameContainer = document.querySelector(".name-container");
const container = document.querySelector(".container");
const nameInput = document.querySelector(".name-input");

nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    localStorage.setItem("name", nameInput.value);
    console.log(localStorage.getItem("name"));
    if (localStorage.getItem("name") === null || undefined) {
      nameContainer.style.display = "flex";
      greeting.style.display = "none";
    } else {
      nameContainer.style.display = "none";
      greeting.style.display = "flex";
    }
  }
});

if (localStorage.getItem("name") === null || undefined) {
  nameContainer.style.display = "flex";
  greeting.style.display = "none";
} else {
  nameContainer.style.display = "none";
  greeting.style.display = "flex";
}

greeting.addEventListener("click", () => {
  localStorage.removeItem("name");
  if (localStorage.getItem("name") === null || undefined) {
    nameContainer.style.display = "flex";
    greeting.style.display = "none";
  } else {
    nameContainer.style.display = "none";
    greeting.style.display = "flex";
  }
});

const focus = document.querySelector(".focus");
const focusInput = document.querySelector(".focus-input");
const focusHeader = document.querySelector(".focus-header");
const yourFocus = document.querySelector(".your-focus");
const yourFocusText = document.querySelector(".your-focus-text");
const whatFocus = document.querySelector(".what-focus");


focusInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    localStorage.setItem("focus", focusInput.value);
    console.log(localStorage.getItem("focus"));
    ifLocal()
  }
});

ifLocal()

yourFocusText.addEventListener("click", () => {
  localStorage.removeItem("focus");
  ifLocal()
});

function ifLocal() {
  if (localStorage.getItem("focus") === null || undefined) {
    whatFocus.style.display = "flex";
    yourFocus.style.display = "none";
  } else {
    whatFocus.style.display = "none";
    yourFocus.style.display = "flex ";
    yourFocusText.textContent = localStorage.getItem("focus");
  }
}

// Quotes //

let quotes = [
  "Tomorrow is another day.",
  "Whatever you are, be a good one.",
  "Believe you can and you're halfway there.",
  "Dreams won't work unless you do.",
  "Don't give up on yourself. There's a reason why you started.",
  "Be a warrior, Not a worrier.",
  "Success is never permanent, and failure is never final.",
  "It will all make sense eventually."
]


const quoteElement = document.querySelector('#quote');
const quoteButton = document.querySelector('.add-quote button');
const quoteInput = document.querySelector('.add-quote input');
const select = document.createElement('div');

select.classList.add("select-quotes")

function showQuoteInput() {
  quoteInput.classList.toggle('hide');
}


function addQuote(event) {
  if (event.code === "Enter") {
    quotes.push(quoteInput.value);
    select.textContent = `"${quoteInput.value}"`;
    select.selectedIndex = select.children.length - 1;
    quoteInput.classList.add('hide');
  }
}


function showQuotes() {
  let randomNumber = Math.round(Math.random() * (quotes.length - 1));
  quotes.forEach(quote => {
    const option = document.createElement('option');
    select.textContent = `"${quotes[randomNumber]}"`;
  })
  select.selectedIndex = randomNumber
  quoteElement.prepend(select);

}

function quoteButtonEvent() {
  createEventListener(quoteButton, 'click', showQuoteInput);
}

function quoteInputEvent() {
  createEventListener(quoteInput, 'keyup', addQuote);
}

function createEventListener(element, event, func) {
  element.addEventListener(event, func);
}


showQuotes();
quoteButtonEvent();
quoteInputEvent();



// To do //

let todos = [];
let editedIdx = -1;

const todoInput = document.querySelector('[data-input-form]');
const saveBtn = document.querySelector('[data-save]');
const todoList = document.querySelector('[data-list]');

const createTask = (task) => {
  todos.push(task);
  localStorage.setItem("todo", JSON.stringify(todos))
}

const displayList = () => {
  todoList.innerHTML = ''
  todos.forEach((item, idx) => {
    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    editBtn.classList.add("save-btn")
    deleteBtn.classList.add('save-btn')
    newSpan.classList.add('span-list')


    newSpan.textContent = item;
    editBtn.textContent = 'Edit';
    deleteBtn.textContent = 'Delete';

    newLi.appendChild(newSpan);
    newLi.appendChild(editBtn);
    newLi.appendChild(deleteBtn);

    editBtn.addEventListener('click', () => {
      editedIdx = idx;
      todoInput.value.item
    })

    deleteBtn.addEventListener('click', () => {
      deleteTask(idx);
      displayList();
    })

    todoList.appendChild(newLi);
  })
}

const updateTask = (updatedItem, idx) => {
  todos[idx] = updatedItem;
}

const deleteTask = (idx) => {
  todos = todos.filter((_, index) => index != idx)
}

saveBtn.addEventListener('click', () => {
  if (editedIdx > -1) {
    updateTask(todoInput.value, editedIdx)
    editedIdx = -1
  } else {
    createTask(todoInput.value)
  }
  todoInput.value = ''
  displayList();
})

displayList();