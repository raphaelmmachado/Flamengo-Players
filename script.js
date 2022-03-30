let teste = document.querySelector("[data-teste]");

const url = "http://localhost:8000";

const fetchApi = async () => {
  const response = await fetch(`${url}/get`);
  const data = await response.json();
};
fetchApi();
