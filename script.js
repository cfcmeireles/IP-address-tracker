document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "at_ZYyq7XWNdbutrydrjzs6dAowsno34";
  const form = document.querySelector("form");
  const ipTrackerDiv = document.querySelector("#ip-tracker-app");
  const userInput = document.querySelector(".user-input");
  const resultTable = document.querySelector(".result-table");
  const ipResult = document.querySelector(".ip-result");
  const locationResult = document.querySelector(".location-result");
  const timezoneResult = document.querySelector(".timezone-result");
  const ispResult = document.querySelector(".isp-result");
  const apiCredits = `https://geo.ipify.org/service/account-balance?apiKey=${apiKey}`;
  var lat;
  var lng;

  const map = L.map("map", { zoomControl: false }).locate({
    setView: true,
    maxZoom: 16,
  });

  const icon = L.icon({
    iconUrl: "images/icon-location.svg",
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  map.on("locationfound", (e) => {
    L.marker(e.latlng, { icon: icon })
      .addTo(map)
      .bindPopup("You are here")
      .openPopup();
  });

  map.on("locationerror", (e) => {
    console.error("Location denied or unavailable", e.message);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = userInput.value;
    getResponse(inputValue);
  });

  async function getResponse(inputValue) {
    const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${inputValue}`;
    try {
      const response = await fetch(`${apiUrl}`, {
        method: "GET",
      });
      const data = await response.json();
      ipResult.innerHTML = data.ip;
      locationResult.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
      timezoneResult.innerHTML = data.location.timezone;
      ispResult.innerHTML = data.isp;
      resultTable.style.display = "flex";
      ipTrackerDiv.style.justifyContent = "flex-start";
      lat = data.location.lat;
      lng = data.location.lng;
      changeLocation(lat, lng);
    } catch (error) {
      console.error(error);
    }
  }

  function changeLocation(lat, lng) {
    map.setView([lat, lng]);
    L.marker([lat, lng], { icon: icon }).addTo(map);
  }
});
