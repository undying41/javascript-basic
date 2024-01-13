"use strict";

let habbits = [];
const HABBIT_KEY = "HABBIT_KEY";

/* page */

const page = {
  menu: document.querySelector(".menu__list"),
  header: {
    h1: document.querySelector(".h1"),
    progressPercent: document.querySelector(".progress__percent"),
    progressCoverBar: document.querySelector(".progress__cover-bar"),
  },
  content: {
    daysContainer: document.getElementById("days"),
    nextDay: document.querySelector(".habbit__day"),
  },
};

/* utils  */

function loadData() {
  const habbitsString = localStorage.getItem(HABBIT_KEY);
  const habbitArray = JSON.parse(habbitsString);
  if (Array.isArray(habbitArray)) {
    habbits = habbitArray;
  }
}

function saveData() {
  localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

/* render */
function renderMenu(activeHabbit) {
  for (const habbit of habbits) {
    const existed = document.querySelector(`[menu-habbit-id="${habbit.id}"]`);
    if (!existed) {
      const element = document.createElement("button");
      element.setAttribute("menu-habbit-id", habbit.id);
      element.classList.add("menu__item");
      element.addEventListener("click", () => render(habbit.id));
      element.innerHTML = `<img src="./images/${habbit.icon}.svg" alt="${habbit.name}"/>`;

      if (activeHabbit.id === habbit.id) {
        element.classList.add("menu__item_active");
      }
      page.menu.appendChild(element);
      continue;
    }

    if (activeHabbit.id === habbit.id) {
      existed.classList.add("menu__item_active");
    } else {
      existed.classList.remove("menu__item_active");
    }
  }
}

function renderHead(activeHabbit) {
  page.header.h1.innerText = activeHabbit.name;
  const progress =
    activeHabbit.days.length / activeHabbit.target > 1
      ? 100
      : (activeHabbit.days.length / activeHabbit.target) * 100;

  page.header.progressPercent.innerText = progress.toFixed(0) + "%";
  page.header.progressCoverBar.setAttribute("style", `width: ${progress}%`);
}

function renderContent(activeHabbit) {
  page.content.daysContainer.innerHTML = "";
  for (const index in activeHabbit.days) {
    const element = document.createElement("div");
    element.classList.add("habbit");
    element.innerHTML = `<div class="habbit__day">Dzień ${
      Number(index) + 1
    }</div>
    <div class="habbit__comment">${activeHabbit.days[index].comment}</div>
    <button class="habbit__delete">
      <img src="./images/delete.svg" alt="Delete" />
    </button>`;
    page.content.daysContainer.appendChild(element);
  }
  page.content.nextDay.innerHTML = `Dzień ${activeHabbit.days.length + 1}`;
}

function render(activeHabbitId) {
  if (!activeHabbitId) {
    return;
  }
  const activeHabbit = habbits.find((habbit) => habbit.id === activeHabbitId);
  renderMenu(activeHabbit);
  renderHead(activeHabbit);
  renderContent(activeHabbit);
}

/* init */
(() => {
  loadData();
  render(habbits[0].id);
})();
