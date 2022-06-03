const sortByNumberButton = document.querySelector("[data-sortByNumber]");
const sortByPositionButton = document.querySelector("[data-sortByPosition]");
const sortByAgeButton = document.querySelector("[data-sortByAge]");
const sortByAbilityButton = document.querySelector("[data-sortByAbility]");
const sortByValueButton = document.querySelector("[data-sortByMarketValue]");

let searchBar = document.querySelector("[data-search]");

// DEFAULT: BY ABILITY
async function getAllPlayers() {
  const url = "https://flamengo-players-api.herokuapp.com";
  const response = await fetch(`${url}/get`);
  const data = await response.json();

  const sortByAbility = data.sort((a, b) => b.ability - a.ability);

  const cards = sortByAbility.reduce((accumulator, player) => {
    accumulator += `
    <figure class="card">
    <div class="card-front">
      <img class="photo" src=${player.img}
      alt="football player">
      <div class="profile1">
      <div class="name">
          <img src='./images/fla.png' class='logo'>
         <div>${
           player.name === "Gustavo Henrique" ? "Gust. Henrique" : player.name
         }</div>
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
          <div>${
            player.position === "Lateral Esquerdo"
              ? "Lat. Esquerdo"
              : player.position && player.position === "Lateral Direito"
              ? "Lat. Direito"
              : player.position
          }</div>
          </div>
          <div class="profile3">
          <div>Habilidade:</div>
          <div>${player.ability}</div>
          </div>
        </div>
      </div>
      </div>


      <div class="card-back">
        <div class="backside-info">
        <p><span class="black-text">Nome Completo:</span> ${player.fullName}</p>
        <p><span class="black-text">Cidade:</span> ${player.city}</p>
        <p><span class="black-text">Nascimento:</span> ${player.birthDate}</p>
        <p><span class="black-text">Perna:</span> ${player.leg}</p>
        <p><span class="black-text">Altura:</span> ${player.height}</p>
        <p><span class="black-text">Chegou:</span> ${player.arriveIn}</p>
        <p><span class="black-text">Contrato:</span> ${player.endOfContract}</p>
        <p><span class="black-text">Ex-times:</span> ${player.formerTeams}</p>
        <p><span class="black-text">Valor:</span>  €${
          player.marketValueInEuros
        }</p>
        <p><span class="black-text">Popularidade:</span> ${player.fanBase}</p>
        </div>
      </div>

    </figure>
    `;

    return accumulator;
  }, "");

  const cardsRow = document.querySelector("[data-cards-row]");
  cardsRow.classList.add("hidden");

  const wrapper = document.querySelector("[data-wrapper]");
  wrapper.classList.remove("hidden");
  wrapper.innerHTML = cards;

  //event to flip the card
  const cardsElement = document.querySelectorAll(".card");
  cardsElement.forEach((card) => {
    card.addEventListener("click", (e) => {
      console.log(e.currentTarget.classList.toggle("flip"));
    });
  });
}
document.addEventListener("DOMContentLoaded", getAllPlayers);

// BY NAME
async function getPlayerByName(input) {
  const url = "https://flamengo-players-api.herokuapp.com";
  const response = await fetch(`${url}/get`);
  const data = await response.json();

  const sortedByAbility = data.sort((a, b) => b.ability - a.ability);

  const filteredByName = sortedByAbility.filter((player) => {
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

  const cards = filteredByName
    .map((player) => {
      return (player = `
      <figure class="card">
      <div class="card-front">
        <img class="photo" src=${player.img}
        alt="football player">
        <div class="profile1">
        <div class="name">
            <img src='./images/fla.png' class='logo'>
           <div>${
             player.name === "Gustavo Henrique" ? "Gust. Henrique" : player.name
           }</div>
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
            <div>${
              player.position === "Lateral Esquerdo"
                ? "Lat. Esquerdo"
                : player.position && player.position === "Lateral Direito"
                ? "Lat. Direito"
                : player.position
            }</div>
            </div>
            <div class="profile3">
            <div>Habilidade:</div>
            <div>${player.ability}</div>
            </div>
          </div>
        </div>
        </div>
  
  
        <div class="card-back">
        <div class="backside-info">
        <p><span class="black-text">Nome Completo:</span> ${player.fullName}</p>
        <p><span class="black-text">Cidade:</span> ${player.city}</p>
        <p><span class="black-text">Nascimento:</span> ${player.birthDate}</p>
        <p><span class="black-text">Perna:</span> ${player.leg}</p>
        <p><span class="black-text">Altura:</span> ${player.height}</p>
        <p><span class="black-text">Chegou:</span> ${player.arriveIn}</p>
        <p><span class="black-text">Contrato:</span> ${player.endOfContract}</p>
        <p><span class="black-text">Ex-times:</span> ${player.formerTeams}</p>
        <br>
        <p><span class="black-text">Valor:</span>  €${
          player.marketValueInEuros
        }</p>
        <p><span class="black-text">Popularidade:</span> ${player.fanBase}</p>
        </div>
        </div>
  
      </figure>
      `);
    })
    .join("");

  const cardsRow = document.querySelector("[data-cards-row]");
  cardsRow.classList.add("hidden");

  const wrapper = document.querySelector("[data-wrapper]");
  wrapper.classList.remove("hidden");
  wrapper.innerHTML = cards;
  //event to flip the card
  const cardsElement = document.querySelectorAll(".card");
  cardsElement.forEach((card) => {
    card.addEventListener("click", (e) => {
      console.log(e.currentTarget.classList.toggle("flip"));
    });
  });
}
//DEBOUNCE
const updateDebounceText = debounce((input) => {
  return getPlayerByName(input);
}, 400);

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

//BY NUMBER
async function sortPlayersByNumber() {
  const url = "https://flamengo-players-api.herokuapp.com";
  const response = await fetch(`${url}/get`);
  const data = await response.json();

  const sortByNumber = data.sort((a, b) => a.number - b.number);

  const cards = sortByNumber
    .map((player) => {
      return (player = `
      <figure class="card">
      <div class="card-front">
        <img class="photo" src=${player.img}
        alt="football player">
        <div class="profile1">
        <div class="name">
            <img src='./images/fla.png' class='logo'>
           <div>${
             player.name === "Gustavo Henrique" ? "Gust. Henrique" : player.name
           }</div>
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
            <div>${
              player.position === "Lateral Esquerdo"
                ? "Lat. Esquerdo"
                : player.position && player.position === "Lateral Direito"
                ? "Lat. Direito"
                : player.position
            }</div>
            </div>
            <div class="profile3">
            <div>Habilidade:</div>
            <div>${player.ability}</div>
            </div>
          </div>
        </div>
        </div>
  
  
        <div class="card-back">
        <div class="backside-info">
        <p><span class="black-text">Nome Completo:</span> ${player.fullName}</p>
        <p><span class="black-text">Cidade:</span> ${player.city}</p>
        <p><span class="black-text">Nascimento:</span> ${player.birthDate}</p>
        <p><span class="black-text">Perna:</span> ${player.leg}</p>
        <p><span class="black-text">Altura:</span> ${player.height}</p>
        <p><span class="black-text">Chegou:</span> ${player.arriveIn}</p>
        <p><span class="black-text">Contrato:</span> ${player.endOfContract}</p>
        <p><span class="black-text">Ex-times:</span> ${player.formerTeams}</p>
        <br>
        <p><span class="black-text">Valor:</span>  €${
          player.marketValueInEuros
        }</p>
        <p><span class="black-text">Popularidade:</span> ${player.fanBase}</p>
        </div>
        </div>
  
      </figure>
      `);
    })
    .join("");

  const cardsRow = document.querySelector("[data-cards-row]");
  cardsRow.classList.add("hidden");

  const wrapper = document.querySelector("[data-wrapper]");
  wrapper.classList.remove("hidden");
  wrapper.innerHTML = cards;
  //event to flip the card
  const cardsElement = document.querySelectorAll(".card");
  cardsElement.forEach((card) => {
    card.addEventListener("click", (e) => {
      console.log(e.currentTarget.classList.toggle("flip"));
    });
  });
}

//BY AGE
async function sortPlayersByAge() {
  const url = "https://flamengo-players-api.herokuapp.com";
  const response = await fetch(`${url}/get`);
  const data = await response.json();

  const sortByAge = data.sort((a, b) => b.age - a.age);

  const cards = sortByAge
    .map((player) => {
      return (player = `
      <figure class="card">
      <div class="card-front">
        <img class="photo" src=${player.img}
        alt="football player">
        <div class="profile1">
        <div class="name">
            <img src='./images/fla.png' class='logo'>
           <div>${
             player.name === "Gustavo Henrique" ? "Gust. Henrique" : player.name
           }</div>
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
            <div>${
              player.position === "Lateral Esquerdo"
                ? "Lat. Esquerdo"
                : player.position && player.position === "Lateral Direito"
                ? "Lat. Direito"
                : player.position
            }</div>
            </div>
            <div class="profile3">
            <div>Habilidade:</div>
            <div>${player.ability}</div>
            </div>
          </div>
        </div>
        </div>
  
  
        <div class="card-back">
        <div class="backside-info">
        <p><span class="black-text">Nome Completo:</span> ${player.fullName}</p>
        <p><span class="black-text">Cidade:</span> ${player.city}</p>
        <p><span class="black-text">Nascimento:</span> ${player.birthDate}</p>
        <p><span class="black-text">Perna:</span> ${player.leg}</p>
        <p><span class="black-text">Altura:</span> ${player.height}</p>
        <p><span class="black-text">Chegou:</span> ${player.arriveIn}</p>
        <p><span class="black-text">Contrato:</span> ${player.endOfContract}</p>
        <p><span class="black-text">Ex-times:</span> ${player.formerTeams}</p>
        <p><span class="black-text">Valor:</span>  €${
          player.marketValueInEuros
        }</p>
        <p><span class="black-text">Popularidade:</span> ${player.fanBase}</p>
        </div>
        </div>
  
      </figure>
      `);
    })
    .join("");

    const cardsRow = document.querySelector("[data-cards-row]")
    cardsRow.classList.add("hidden")

  const wrapper = document.querySelector("[data-wrapper]");
  wrapper.classList.remove("hidden");
  wrapper.innerHTML = cards;
  //event to flip the card
  const cardsElement = document.querySelectorAll(".card");
  cardsElement.forEach((card) => {
    card.addEventListener("click", (e) => {
      console.log(e.currentTarget.classList.toggle("flip"));
    });
  });
}

// BY VALUE
async function sortPlayersByMarketValue() {
  const url = "https://flamengo-players-api.herokuapp.com";
  const response = await fetch(`${url}/get`);
  const data = await response.json();

  const sortByMarketValue = data.sort(
    (a, b) => b.marketValueInEuros - a.marketValueInEuros
  );

  const cards = sortByMarketValue
    .map((player) => {
      return (player = `
      <figure class="card">
      <div class="card-front">
        <img class="photo" src=${player.img}
        alt="football player">
        <div class="profile1">
        <div class="name">
            <img src='./images/fla.png' class='logo'>
           <div>${
             player.name === "Gustavo Henrique" ? "Gust. Henrique" : player.name
           }</div>
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
            <div>${
              player.position === "Lateral Esquerdo"
                ? "Lat. Esquerdo"
                : player.position && player.position === "Lateral Direito"
                ? "Lat. Direito"
                : player.position
            }</div>
            </div>
            <div class="profile3">
            <div>Habilidade:</div>
            <div>${player.ability}</div>
            </div>
          </div>
        </div>
        </div>
  
  
        <div class="card-back">
        <div class="backside-info">
        <p><span class="black-text">Nome Completo:</span> ${player.fullName}</p>
        <p><span class="black-text">Cidade:</span> ${player.city}</p>
        <p><span class="black-text">Nascimento:</span> ${player.birthDate}</p>
        <p><span class="black-text">Perna:</span> ${player.leg}</p>
        <p><span class="black-text">Altura:</span> ${player.height}</p>
        <p><span class="black-text">Chegou:</span> ${player.arriveIn}</p>
        <p><span class="black-text">Contrato:</span> ${player.endOfContract}</p>
        <p><span class="black-text">Ex-times:</span> ${player.formerTeams}</p>
        <p><span class="black-text">Valor:</span>  €${
          player.marketValueInEuros
        }</p>
        <p><span class="black-text">Popularidade:</span> ${player.fanBase}</p>
        </div>
        </div>
  
      </figure>
      `);
    })
    .join("");

  const wrapper = document.querySelector("[data-wrapper]");
  wrapper.classList.remove("hidden");
  wrapper.innerHTML = cards;
  //event to flip the card
  const cardsElement = document.querySelectorAll(".card");
  cardsElement.forEach((card) => {
    card.addEventListener("click", (e) => {
      console.log(e.currentTarget.classList.toggle("flip"));
    });
  });
}
// BY POSITION
async function sortPlayersByPosition() {
  const url = "https://flamengo-players-api.herokuapp.com";
  const response = await fetch(`${url}/get`);
  const data = await response.json();

  const manager = data.filter(player=> player.position === "Treinador")
  const goalKeepers = data.filter((player) => player.position === "Goleiro");
  const defenders = data.filter((player) => player.position === "Zagueiro");
  const sideBacks = data.filter(
    (player) =>
      player.position === "Lateral Direito" ||
      player.position === "Lateral Esquerdo"
  );
  const midfielders = data.filter(
    (player) =>
      player.position === "Meio-Defensivo" ||
      player.position === "Meio-Campo" ||
      player.position === "Meio-Ofensivo"
  );
  const attackers = data.filter((player) => player.position === "Atacante");

  const managerCard = manager.map(player => {
    return (player = `
    <figure class="card">
    <div class="card-front">
      <img class="photo" src=${player.img}
      alt="football player">
      <div class="profile1">
      <div class="name">
          <img src='./images/fla.png' class='logo'>
         <div>${
           player.name === "Gustavo Henrique" ? "Gust. Henrique" : player.name
         }</div>
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
          <div>${
            player.position === "Lateral Esquerdo"
              ? "Lat. Esquerdo"
              : player.position && player.position === "Lateral Direito"
              ? "Lat. Direito"
              : player.position
          }</div>
          </div>
          <div class="profile3">
          <div>Habilidade:</div>
          <div>${player.ability}</div>
          </div>
        </div>
      </div>
      </div>


      <div class="card-back">
      <div class="backside-info">
      <p><span class="black-text">Nome Completo:</span> ${player.fullName}</p>
      <p><span class="black-text">Cidade:</span> ${player.city}</p>
      <p><span class="black-text">Nascimento:</span> ${player.birthDate}</p>
      <p><span class="black-text">Perna:</span> ${player.leg}</p>
      <p><span class="black-text">Altura:</span> ${player.height}</p>
      <p><span class="black-text">Chegou:</span> ${player.arriveIn}</p>
      <p><span class="black-text">Contrato:</span> ${player.endOfContract}</p>
      <p><span class="black-text">Ex-times:</span> ${player.formerTeams}</p>
      <br>
      <p><span class="black-text">Valor:</span>  €${
        player.marketValueInEuros
      }</p>
      <p><span class="black-text">Popularidade:</span> ${player.fanBase}</p>
      </div>
      </div>

    </figure>
    `)
  })
//-----------------------------------------------------------------------------

  const goalKeepersCards = goalKeepers.map((player) => {
    return (player = `
    <figure class="card">
    <div class="card-front">
      <img class="photo" src=${player.img}
      alt="football player">
      <div class="profile1">
      <div class="name">
          <img src='./images/fla.png' class='logo'>
         <div>${
           player.name === "Gustavo Henrique" ? "Gust. Henrique" : player.name
         }</div>
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
          <div>${
            player.position === "Lateral Esquerdo"
              ? "Lat. Esquerdo"
              : player.position && player.position === "Lateral Direito"
              ? "Lat. Direito"
              : player.position
          }</div>
          </div>
          <div class="profile3">
          <div>Habilidade:</div>
          <div>${player.ability}</div>
          </div>
        </div>
      </div>
      </div>


      <div class="card-back">
      <div class="backside-info">
      <p><span class="black-text">Nome Completo:</span> ${player.fullName}</p>
      <p><span class="black-text">Cidade:</span> ${player.city}</p>
      <p><span class="black-text">Nascimento:</span> ${player.birthDate}</p>
      <p><span class="black-text">Perna:</span> ${player.leg}</p>
      <p><span class="black-text">Altura:</span> ${player.height}</p>
      <p><span class="black-text">Chegou:</span> ${player.arriveIn}</p>
      <p><span class="black-text">Contrato:</span> ${player.endOfContract}</p>
      <p><span class="black-text">Ex-times:</span> ${player.formerTeams}</p>
      <br>
      <p><span class="black-text">Valor:</span>  €${
        player.marketValueInEuros
      }</p>
      <p><span class="black-text">Popularidade:</span> ${player.fanBase}</p>
      </div>
      </div>

    </figure>
    `);
  });
  // -------------------------------------
  const defendersCards = defenders.map((player) => {
    return (player = `
    <figure class="card">
    <div class="card-front">
      <img class="photo" src=${player.img}
      alt="football player">
      <div class="profile1">
      <div class="name">
          <img src='./images/fla.png' class='logo'>
         <div>${
           player.name === "Gustavo Henrique" ? "Gust. Henrique" : player.name
         }</div>
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
          <div>${
            player.position === "Lateral Esquerdo"
              ? "Lat. Esquerdo"
              : player.position && player.position === "Lateral Direito"
              ? "Lat. Direito"
              : player.position
          }</div>
          </div>
          <div class="profile3">
          <div>Habilidade:</div>
          <div>${player.ability}</div>
          </div>
        </div>
      </div>
      </div>


      <div class="card-back">
      <div class="backside-info">
      <p><span class="black-text">Nome Completo:</span> ${player.fullName}</p>
      <p><span class="black-text">Cidade:</span> ${player.city}</p>
      <p><span class="black-text">Nascimento:</span> ${player.birthDate}</p>
      <p><span class="black-text">Perna:</span> ${player.leg}</p>
      <p><span class="black-text">Altura:</span> ${player.height}</p>
      <p><span class="black-text">Chegou:</span> ${player.arriveIn}</p>
      <p><span class="black-text">Contrato:</span> ${player.endOfContract}</p>
      <p><span class="black-text">Ex-times:</span> ${player.formerTeams}</p>
      <br>
      <p><span class="black-text">Valor:</span>  €${
        player.marketValueInEuros
      }</p>
      <p><span class="black-text">Popularidade:</span> ${player.fanBase}</p>
      </div>
      </div>

    </figure>
    `);
  });

  // -----------------------------------------------

  const sideBacksCards = sideBacks.map((player) => {
    return (player = `
    <figure class="card">
    <div class="card-front">
      <img class="photo" src=${player.img}
      alt="football player">
      <div class="profile1">
      <div class="name">
          <img src='./images/fla.png' class='logo'>
         <div>${
           player.name === "Gustavo Henrique" ? "Gust. Henrique" : player.name
         }</div>
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
          <div>${
            player.position === "Lateral Esquerdo"
              ? "Lat. Esquerdo"
              : player.position && player.position === "Lateral Direito"
              ? "Lat. Direito"
              : player.position
          }</div>
          </div>
          <div class="profile3">
          <div>Habilidade:</div>
          <div>${player.ability}</div>
          </div>
        </div>
      </div>
      </div>


      <div class="card-back">
      <div class="backside-info">
      <p><span class="black-text">Nome Completo:</span> ${player.fullName}</p>
      <p><span class="black-text">Cidade:</span> ${player.city}</p>
      <p><span class="black-text">Nascimento:</span> ${player.birthDate}</p>
      <p><span class="black-text">Perna:</span> ${player.leg}</p>
      <p><span class="black-text">Altura:</span> ${player.height}</p>
      <p><span class="black-text">Chegou:</span> ${player.arriveIn}</p>
      <p><span class="black-text">Contrato:</span> ${player.endOfContract}</p>
      <p><span class="black-text">Ex-times:</span> ${player.formerTeams}</p>
      <br>
      <p><span class="black-text">Valor:</span>  €${
        player.marketValueInEuros
      }</p>
      <p><span class="black-text">Popularidade:</span> ${player.fanBase}</p>
      </div>
      </div>

    </figure>
    `);
  });
  // ------------------------------------------------------

  const midfieldersCards = midfielders.map((player) => {
    return (player = `
    <figure class="card">
    <div class="card-front">
      <img class="photo" src=${player.img}
      alt="football player">
      <div class="profile1">
      <div class="name">
          <img src='./images/fla.png' class='logo'>
         <div>${
           player.name === "Gustavo Henrique" ? "Gust. Henrique" : player.name
         }</div>
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
          <div>${
            player.position === "Lateral Esquerdo"
              ? "Lat. Esquerdo"
              : player.position && player.position === "Lateral Direito"
              ? "Lat. Direito"
              : player.position
          }</div>
          </div>
          <div class="profile3">
          <div>Habilidade:</div>
          <div>${player.ability}</div>
          </div>
        </div>
      </div>
      </div>


      <div class="card-back">
      <div class="backside-info">
      <p><span class="black-text">Nome Completo:</span> ${player.fullName}</p>
      <p><span class="black-text">Cidade:</span> ${player.city}</p>
      <p><span class="black-text">Nascimento:</span> ${player.birthDate}</p>
      <p><span class="black-text">Perna:</span> ${player.leg}</p>
      <p><span class="black-text">Altura:</span> ${player.height}</p>
      <p><span class="black-text">Chegou:</span> ${player.arriveIn}</p>
      <p><span class="black-text">Contrato:</span> ${player.endOfContract}</p>
      <p><span class="black-text">Ex-times:</span> ${player.formerTeams}</p>
      <br>
      <p><span class="black-text">Valor:</span>  €${
        player.marketValueInEuros
      }</p>
      <p><span class="black-text">Popularidade:</span> ${player.fanBase}</p>
      </div>
      </div>

    </figure>
    `);
  });
  // -----------------------------------------------------------

  const attackersCards = attackers.map((player) => {
    return (player = `
    <figure class="card">
    <div class="card-front">
      <img class="photo" src=${player.img}
      alt="football player">
      <div class="profile1">
      <div class="name">
          <img src='./images/fla.png' class='logo'>
         <div>${
           player.name === "Gustavo Henrique" ? "Gust. Henrique" : player.name
         }</div>
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
          <div>${
            player.position === "Lateral Esquerdo"
              ? "Lat. Esquerdo"
              : player.position && player.position === "Lateral Direito"
              ? "Lat. Direito"
              : player.position
          }</div>
          </div>
          <div class="profile3">
          <div>Habilidade:</div>
          <div>${player.ability}</div>
          </div>
        </div>
      </div>
      </div>


      <div class="card-back">
      <div class="backside-info">
      <p><span class="black-text">Nome Completo:</span> ${player.fullName}</p>
      <p><span class="black-text">Cidade:</span> ${player.city}</p>
      <p><span class="black-text">Nascimento:</span> ${player.birthDate}</p>
      <p><span class="black-text">Perna:</span> ${player.leg}</p>
      <p><span class="black-text">Altura:</span> ${player.height}</p>
      <p><span class="black-text">Chegou:</span> ${player.arriveIn}</p>
      <p><span class="black-text">Contrato:</span> ${player.endOfContract}</p>
      <p><span class="black-text">Ex-times:</span> ${player.formerTeams}</p>
      <br>
      <p><span class="black-text">Valor:</span>  €${
        player.marketValueInEuros
      }</p>
      <p><span class="black-text">Popularidade:</span> ${player.fanBase}</p>
      </div>
      </div>

    </figure>
    `);
  });

  const wrapper = document.querySelector("[data-wrapper]");
  wrapper.classList.add("hidden");

  const cardsRow = document.querySelector("[data-cards-row]");
  cardsRow.classList.remove("hidden");

  let managerCardContainer = document.querySelector("[data-manager]")
  let goalKeepersContainer = document.querySelector("[data-goalkeepers]");
  let defendersContainer = document.querySelector("[data-defenders]");
  let sideBacksContainer = document.querySelector("[data-side-backs]");
  let midfieldersContainer = document.querySelector("[data-midfielders]");
  let attackersContainer = document.querySelector("[data-atacantes]");

  managerCardContainer.innerHTML = managerCard
  goalKeepersContainer.innerHTML = goalKeepersCards;
  defendersContainer.innerHTML = defendersCards;
  sideBacksContainer.innerHTML = sideBacksCards;
  midfieldersContainer.innerHTML = midfieldersCards;
  attackersContainer.innerHTML = attackersCards;

  //event to flip the card
  const cardsElement = document.querySelectorAll(".card");
  cardsElement.forEach((card) => {
    card.addEventListener("click", (e) => {
      console.log(e.currentTarget.classList.toggle("flip"));
    });
  });
}

sortByValueButton.addEventListener("click", sortPlayersByMarketValue);
sortByPositionButton.addEventListener("click", sortPlayersByPosition);
sortByNumberButton.addEventListener("click", sortPlayersByNumber);
sortByAgeButton.addEventListener("click", sortPlayersByAge);
sortByAbilityButton.addEventListener("click", getAllPlayers);
