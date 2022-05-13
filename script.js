const sortByNumberButton = document.querySelector("[data-sortByNumber]");
const sortByAgeButton = document.querySelector("[data-sortByAge]");
const sortByAbilityButton = document.querySelector("[data-sortByAbility]");
let searchBar = document.querySelector("[data-search]");

/*I HAD TO HARDCODE HTML TEMPLATE BECAUSE  WAS CAUSING REFERENCE ERROR*/
async function getAllPlayers() {
  const url = "https://flamengo-players-api.herokuapp.com"
  const response = await fetch(`${url}/get`);
  const data = await response.json();

  const sortByAbility = data.sort((a, b) => b.ability - a.ability);

  const cards = sortByAbility.reduce((accumulator, player) => {
    accumulator += `
    <div class="card">
      <img class="photo" src=${player.img}
      alt="football player">
      <div class="profile1">
      <div class="name">
          <img src='./images/fla.png' class='logo'>
         <div>${player.name}</div>
         <img class='country' src='${player.country}'></div>
        <div class="profile2">
          <div class="profile3">
          <div>Idade:</div>
          <div>${player.age}</div>
          </div>
          <div class="profile3">
          <div>Camisa:</div>
          <div>${player.number}</div>
          </div>
          <div class="profile3">
          <div>Posição:</div>
          <div>${player.position}</div>
          </div>
          <div class="profile3">
          <div>Habilidade:</div>
          <div>${player.ability}</div>
          </div>
        </div>
      </div>
    </div>
    `;

    return accumulator;
  }, "");

  const wrapper = document.querySelector("[data-wrapper]");
  wrapper.innerHTML = cards;
}
document.addEventListener("DOMContentLoaded", getAllPlayers);

async function getPlayerByName(input) {
  const url = "https://flamengo-players-api.herokuapp.com"
  const response = await fetch(`${url}/get`);
  const data = await response.json();

  const sortByAbility = data.sort((a, b) => b.ability - a.ability);

  const filterPlayersByName = sortByAbility.filter((player) => {
    //names in lowercase and ignoring accents
    const name = player.name.toLowerCase();
    const known = player.alsoKnownAs ?? name;
    // typing with or without accent will find the player
    return (
      name.includes(input) ||
      name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(input) ||
      known.toLowerCase().includes(input) ||
      known
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(input)
    );
  });

  const cards = filterPlayersByName
    .map((player) => {
      return (player = `
      <div class="card">
        <img class="photo" src=${player.img}
        alt="football player">
        <div class="profile1">
        <div class="name">
            <img src='./images/fla.png' class='logo'>
           <div>${player.name}</div>
           <img class='country' src='${player.country}'></div>
          <div class="profile2">
            <div class="profile3">
            <div>Idade:</div>
            <div>${player.age}</div>
            </div>
            <div class="profile3">
            <div>Camisa:</div>
            <div>${player.number}</div>
            </div>
            <div class="profile3">
            <div>Posição:</div>
            <div>${player.position}</div>
            </div>
            <div class="profile3">
            <div>Habilidade:</div>
            <div>${player.ability}</div>
            </div>
          </div>
        </div>
      </div>
      `);
    })
    .join("");

  const wrapper = document.querySelector("[data-wrapper]");
  wrapper.innerHTML = cards;
}
//DEBOUNCE
const updateDebounceText = debounce((input) => {
  return getPlayerByName(input);
}, 750);

searchBar.addEventListener("input", (e) => {
  const input = e.target.value.toLowerCase();
  updateDebounceText(input);
});

//make get request only when finish typing
function debounce(cb, delay = 750) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

async function sortPlayersByNumber() {
  const url = "https://flamengo-players-api.herokuapp.com"
  const response = await fetch(`${url}/get`);
  const data = await response.json();

  const sortByNumber = data.sort((a, b) => a.number - b.number);

  const cards = sortByNumber
    .map((player) => {
      return (player = `
    <div class="card">
      <img class="photo" src=${player.img}
      alt="football player">
      <div class="profile1">
      <div class="name">
          <img src='./images/fla.png' class='logo'>
         <div>${player.name}</div>
         <img class='country' src='${player.country}'></div>
        <div class="profile2">
          <div class="profile3">
          <div>Idade:</div>
          <div>${player.age}</div>
          </div>
          <div class="profile3">
          <div>Camisa:</div>
          <div>${player.number}</div>
          </div>
          <div class="profile3">
          <div>Posição:</div>
          <div>${player.position}</div>
          </div>
          <div class="profile3">
          <div>Habilidade:</div>
          <div>${player.ability}</div>
          </div>
        </div>
      </div>
    </div>
    `);
    })
    .join("");

  const wrapper = document.querySelector("[data-wrapper]");
  wrapper.innerHTML = cards;
}
async function sortPlayersByAge() {
  const url = "https://flamengo-players-api.herokuapp.com"
  const response = await fetch(`${url}/get`);
  const data = await response.json();

  const sortByAge = data.sort((a, b) => b.age - a.age);

  const cards = sortByAge
    .map((player) => {
      return (player = `
    <div class="card">
      <img class="photo" src=${player.img}
      alt="football player">
      <div class="profile1">
      <div class="name">
          <img src='./images/fla.png' class='logo'>
         <div>${player.name}</div>
         <img class='country' src='${player.country}'></div>
        <div class="profile2">
          <div class="profile3">
          <div>Idade:</div>
          <div>${player.age}</div>
          </div>
          <div class="profile3">
          <div>Camisa:</div>
          <div>${player.number}</div>
          </div>
          <div class="profile3">
          <div>Posição:</div>
          <div>${player.position}</div>
          </div>
          <div class="profile3">
          <div>Habilidade:</div>
          <div>${player.ability}</div>
          </div>
        </div>
      </div>
    </div>
    `);
    })
    .join("");

  const wrapper = document.querySelector("[data-wrapper]");
  wrapper.innerHTML = cards;
}

sortByNumberButton.addEventListener("click", sortPlayersByNumber);
sortByAgeButton.addEventListener("click", sortPlayersByAge);
sortByAbilityButton.addEventListener("click", getAllPlayers);
