const fetchApi = async () => {
  const url = "http://localhost:8000";

  const response = await fetch(`${url}/get`);
  const data = await response.json();
  console.log("fetch", data);

  const card = data.reduce((accumulator, player) => {
    accumulator += `
      <div class="card">
        <img class="photo" src=${player.img}
        alt="football player">
        <div class="profile1">
        <div class="name">${player.name}</div>
          <div class="profile2">
            <div class="profile3">
            <div>Idade</div>
            <div>${player.age}</div>
            </div>
            <div class="profile3">
            <div>Camisa</div>
            <div>${player.number}</div>
            </div>
            <div class="profile3">
            <div>Posição</div>
            <div>${player.position}</div>
            </div>
            <div class="profile3">
            <div>Habilidade</div>
            <div>${player.overall}</div>
            </div>
          </div>
        </div>
      </div>
      `;

    return accumulator;
  }, "");

  const wrapper = document.querySelector("[data-wrapper]");
  wrapper.innerHTML = card
};
fetchApi();
