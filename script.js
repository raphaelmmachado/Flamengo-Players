const sortByNumberButton = document.querySelector("[data-sortByNumber]");
const sortByPositionButton = document.querySelector("[data-sortByPosition]");
const sortByAgeButton = document.querySelector("[data-sortByAge]");
const sortByAbilityButton = document.querySelector("[data-sortByAbility]");
const sortByValueButton = document.querySelector("[data-sortByMarketValue]");
let searchBar = document.querySelector("[data-search]");
const loadingSpinner = document.querySelector("[data-loading-spinner]");

const htmlTemplate = (
  img,
  name,
  country,
  age,
  number,
  position,
  ability,
  fullName,
  city,
  birthDate,
  leg,
  height,
  arriveIn,
  endOfContract,
  formerTeams,
  marketValueInEuros,
  fanBase
) => {
  const html = `<figure class="card">
    <div class="card-front">
      <img class="photo" src=${img}
      alt="football player">
      <div class="profile1">
      <div class="name">
          <img src='./images/fla.png' class='logo'>
         <div>${name === "Gustavo Henrique" ? "Gust. Henrique" : name}</div>
         <img class='country' src='${country}'></div>
        <div class="profile2">
          <div class="profile3">
          <div>Idade:</div>
          <div>${age}</div>
          </div>
          <div class="profile3">
          <div>Camisa:</div>
          <div>${number}</div>
          </div>
          <div class="profile3">
          <div>Posição:</div>
          <div>${
            position === "Lateral Esquerdo"
              ? "Lat. Esquerdo"
              : position && position === "Lateral Direito"
              ? "Lat. Direito"
              : position
          }</div>
          </div>
          <div class="profile3">
          <div>Habilidade:</div>
          <div>${ability}</div>
          </div>
        </div>
      </div>
      </div>

      <div class="card-back">
        <div class="backside-info">
        <p><span class="black-text">Nome Completo:</span> ${fullName}</p>
        <p><span class="black-text">Cidade:</span> ${city}</p>
        <p><span class="black-text">Nascimento:</span> ${birthDate}</p>
        <p><span class="black-text">Perna:</span> ${leg}</p>
        <p><span class="black-text">Altura:</span> ${height}</p>
        <p><span class="black-text">Chegou:</span> ${arriveIn}</p>
        <p><span class="black-text">Contrato:</span> ${endOfContract}</p>
        <p><span class="black-text">Ex-times:</span> ${formerTeams}</p>
        <p><span class="black-text">Valor:</span>  €${marketValueInEuros}</p>
        <p><span class="black-text">Popularidade:</span> ${fanBase}</p>
        </div>
      </div>

    </figure>
    `;
  return html;
};

const showSpinner = () => {
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("show");
  setTimeout(() => loadingSpinner.classList.remove("show"), 5000);
};
const hideSpinner = () => {
  loadingSpinner.classList.add("hidden");
  loadingSpinner.classList.remove("show");
};

const flipCard = () => {
  const cardsElement = document.querySelectorAll(".card");
  cardsElement.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.currentTarget.classList.toggle("flip");
    });
  });
};
// function to hide element that shows players by position
const hideCardsRow = () => {
  const cardsRow = document.querySelector("[data-cards-row]");
  cardsRow.classList.add("hidden");
};

const showCards = (cards) => {
  const wrapper = document.querySelector("[data-wrapper]");
  wrapper.classList.remove("hidden");
  wrapper.innerHTML = cards;
};
const httpRequest = async () => {
  const url = "https://flamengo-players-api.herokuapp.com";
  showSpinner();
  const response = await fetch(`${url}/get`);
  const data = await response.json();
  hideSpinner();
  return data;
};
// DEFAULT: BY ABILITY
function getAllPlayers() {
  httpRequest().then((data) => {
    const sortByAbility = data.sort((a, b) => b.ability - a.ability);
    const cards = sortByAbility.reduce((accumulator, player) => {
      const html = (accumulator += htmlTemplate(
        player.img,
        player.name,
        player.country,
        player.age,
        player.number,
        player.position,
        player.ability,
        player.fullName,
        player.city,
        player.birthDate,
        player.leg,
        player.height,
        player.arriveIn,
        player.endOfContract,
        player.formerTeams,
        player.marketValueInEuros,
        player.fanBase
      ));
      return html;
    }, "");

    hideCardsRow();
    showCards(cards);
    flipCard();
  });
}
document.addEventListener("DOMContentLoaded", getAllPlayers);

// BY NAME
function getPlayerByName(input) {
  httpRequest().then((data) => {
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
        return (player = htmlTemplate(
          player.img,
          player.name,
          player.country,
          player.age,
          player.number,
          player.position,
          player.ability,
          player.fullName,
          player.city,
          player.birthDate,
          player.leg,
          player.height,
          player.arriveIn,
          player.endOfContract,
          player.formerTeams,
          player.marketValueInEuros,
          player.fanBase
        ));
      })
      .join("");

    hideCardsRow();
    showCards(cards);
    flipCard();
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
function sortPlayersByNumber() {
  httpRequest().then((data) => {
    const sortByNumber = data.sort((a, b) => a.number - b.number);

    const cards = sortByNumber
      .map((player) => {
        return (player = htmlTemplate(
          player.img,
          player.name,
          player.country,
          player.age,
          player.number,
          player.position,
          player.ability,
          player.fullName,
          player.city,
          player.birthDate,
          player.leg,
          player.height,
          player.arriveIn,
          player.endOfContract,
          player.formerTeams,
          player.marketValueInEuros,
          player.fanBase
        ));
      })
      .join("");

    hideCardsRow();
    showCards(cards);
    flipCard();
  });
}

//BY AGE
function sortPlayersByAge() {
  httpRequest().then((data) => {
    const sortByAge = data.sort((a, b) => b.age - a.age);

    const cards = sortByAge
      .map((player) => {
        return (player = htmlTemplate(
          player.img,
          player.name,
          player.country,
          player.age,
          player.number,
          player.position,
          player.ability,
          player.fullName,
          player.city,
          player.birthDate,
          player.leg,
          player.height,
          player.arriveIn,
          player.endOfContract,
          player.formerTeams,
          player.marketValueInEuros,
          player.fanBase
        ));
      })
      .join("");

    hideCardsRow();
    showCards(cards);
    flipCard();
  });
}

// BY VALUE
function sortPlayersByMarketValue() {
  httpRequest().then((data) => {
    const sortByMarketValue = data.sort(
      (a, b) => b.marketValueInEuros - a.marketValueInEuros
    );

    const cards = sortByMarketValue
      .map((player) => {
        return (player = htmlTemplate(
          player.img,
          player.name,
          player.country,
          player.age,
          player.number,
          player.position,
          player.ability,
          player.fullName,
          player.city,
          player.birthDate,
          player.leg,
          player.height,
          player.arriveIn,
          player.endOfContract,
          player.formerTeams,
          player.marketValueInEuros,
          player.fanBase
        ));
      })
      .join("");

    hideCardsRow();
    showCards(cards);
    flipCard();
  });
}
// BY POSITION
function sortPlayersByPosition() {
  httpRequest().then((data) => {
    const manager = data.filter((player) => player.position === "Treinador");
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
//----------------------------------------------------
    const managerCard = manager.map((player) => {
      return (player = htmlTemplate(
        player.img,
        player.name,
        player.country,
        player.age,
        player.number,
        player.position,
        player.ability,
        player.fullName,
        player.city,
        player.birthDate,
        player.leg,
        player.height,
        player.arriveIn,
        player.endOfContract,
        player.formerTeams,
        player.marketValueInEuros,
        player.fanBase
      ));
    });
    //-----------------------------------------------------------------------------
    const goalKeepersCards = goalKeepers.map((player) => {
      return (player = htmlTemplate(
        player.img,
        player.name,
        player.country,
        player.age,
        player.number,
        player.position,
        player.ability,
        player.fullName,
        player.city,
        player.birthDate,
        player.leg,
        player.height,
        player.arriveIn,
        player.endOfContract,
        player.formerTeams,
        player.marketValueInEuros,
        player.fanBase
      ));
    });
    // -------------------------------------
    const defendersCards = defenders.map((player) => {
      return (player = htmlTemplate(
        player.img,
        player.name,
        player.country,
        player.age,
        player.number,
        player.position,
        player.ability,
        player.fullName,
        player.city,
        player.birthDate,
        player.leg,
        player.height,
        player.arriveIn,
        player.endOfContract,
        player.formerTeams,
        player.marketValueInEuros,
        player.fanBase
      ));
    });
    // -----------------------------------------------
    const sideBacksCards = sideBacks.map((player) => {
      return (player = htmlTemplate(
        player.img,
        player.name,
        player.country,
        player.age,
        player.number,
        player.position,
        player.ability,
        player.fullName,
        player.city,
        player.birthDate,
        player.leg,
        player.height,
        player.arriveIn,
        player.endOfContract,
        player.formerTeams,
        player.marketValueInEuros,
        player.fanBase
      ));
    });
    // ------------------------------------------------------
    const midfieldersCards = midfielders.map((player) => {
      return (player = htmlTemplate(
        player.img,
        player.name,
        player.country,
        player.age,
        player.number,
        player.position,
        player.ability,
        player.fullName,
        player.city,
        player.birthDate,
        player.leg,
        player.height,
        player.arriveIn,
        player.endOfContract,
        player.formerTeams,
        player.marketValueInEuros,
        player.fanBase
      ));
    });
    // -----------------------------------------------------------
    const attackersCards = attackers.map((player) => {
      return (player = htmlTemplate(
        player.img,
        player.name,
        player.country,
        player.age,
        player.number,
        player.position,
        player.ability,
        player.fullName,
        player.city,
        player.birthDate,
        player.leg,
        player.height,
        player.arriveIn,
        player.endOfContract,
        player.formerTeams,
        player.marketValueInEuros,
        player.fanBase
      ));
    });

    const wrapper = document.querySelector("[data-wrapper]");
    wrapper.classList.add("hidden");

    const cardsRow = document.querySelector("[data-cards-row]");
    cardsRow.classList.remove("hidden");

    let managerCardContainer = document.querySelector("[data-manager]");
    let goalKeepersContainer = document.querySelector("[data-goalkeepers]");
    let defendersContainer = document.querySelector("[data-defenders]");
    let sideBacksContainer = document.querySelector("[data-side-backs]");
    let midfieldersContainer = document.querySelector("[data-midfielders]");
    let attackersContainer = document.querySelector("[data-atacantes]");

    managerCardContainer.innerHTML = managerCard;
    goalKeepersContainer.innerHTML = goalKeepersCards;
    defendersContainer.innerHTML = defendersCards;
    sideBacksContainer.innerHTML = sideBacksCards;
    midfieldersContainer.innerHTML = midfieldersCards;
    attackersContainer.innerHTML = attackersCards;

    flipCard();
  });
}

sortByValueButton.addEventListener("click", sortPlayersByMarketValue);
sortByPositionButton.addEventListener("click", sortPlayersByPosition);
sortByNumberButton.addEventListener("click", sortPlayersByNumber);
sortByAgeButton.addEventListener("click", sortPlayersByAge);
sortByAbilityButton.addEventListener("click", getAllPlayers);
