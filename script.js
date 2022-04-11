// const replitURL = "https://flamengo-card.rm0909.repl.co";


let searchBar = document.querySelector("[data-search]");
let abilityInput = document.querySelector("[data-number]");

/*I HAD TO HARDCODE HTML TEMPLATE BECAUSE STRING LITERALS WAS CAUSING REFERENCE ERROR*/
const getAllPlayers = async () => {
  const url = "http://localhost:8000";
  const response = await fetch(`${url}/get`);
  const data = await response.json();
  
  const allPlayers = data.reduce((accumulator, player) => {
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
  wrapper.innerHTML = allPlayers;
};
document.addEventListener("DOMContentLoaded", getAllPlayers);

const getPlayerByName = async (input) => {
  const url = "http://localhost:8000";
  const response = await fetch(`${url}/get`);
  const data = await response.json();

  const filterPlayersByName = data.filter((player) => {
    const name = player.name.toLowerCase();
    const known = player.alsoKnownAs ?? name;
    return name.includes(input) || known.toLowerCase().includes(input)
  });
  const playerByName = filterPlayersByName
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
  wrapper.innerHTML = playerByName;
};

searchBar.addEventListener("input", (e) => {
  const input = e.target.value.toLowerCase();
  return getPlayerByName(input);
});

const getPlayerByAbility = async (inputValue) => {
  const url = "http://localhost:8000";
  const response = await fetch(`${url}/get`);
  const data = await response.json();

  const sortByAbility = data.sort((a, b) => b.ability - a.ability);

  const filterPlayersByAbility = sortByAbility.filter((player) => {
    const inputToNumber = parseInt(inputValue);
    const abilityToNumber = player.ability;
    return abilityToNumber <= inputToNumber;
  });
  const playersByAbility = filterPlayersByAbility
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
  wrapper.innerHTML = playersByAbility;
};

abilityInput.addEventListener("input", (e) => {
  const inputValue = e.target.value;
  if (inputValue === '') return getAllPlayers()
  return getPlayerByAbility(inputValue);
});