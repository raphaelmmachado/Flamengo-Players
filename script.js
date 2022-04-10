const getAllPlayers = async () => {
  const url = "https://flamengo-card.rm0909.repl.co";

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
            <div>${player.overall}</div>
            </div>
          </div>
        </div>
      </div>
      `;

    return accumulator;
  }, "");

  const wrapper = document.querySelector("[data-wrapper]");
  wrapper.innerHTML = allPlayers
};

document.addEventListener('DOMContentLoaded', getAllPlayers());