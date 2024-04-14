document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "at_qvLndPjooFsveCeCi8oJT1oc8piHI";
  const form = document.querySelector("form");
  const resultTable = document.querySelector(".result-table");
  const userInput = document.querySelector(".user-input");
  const ipResult = document.querySelector(".ip-result");
  const locationResult = document.querySelector(".location-result");
  const timezoneResult = document.querySelector(".timezone-result");
  const ispResult = document.querySelector(".isp-result");
  var lat;
  var lng;
  var map;
  var icon;

  getUserLocation();

  function initializeMap(lat, lng) {
    map = L.map("map", { zoomControl: false }).setView([lat, lng], 16);
    icon = L.icon({
      iconUrl: "images/icon-location.svg",
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      map
    );
    L.marker([lat, lng], { icon: icon }).addTo(map);
  }

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
      let timeZone = moment()
        .utcOffset(data.location.timezone / 60)
        .format("z");
      timezoneResult.innerHTML = `${timeZone} ${data.location.timezone}`;
      ispResult.innerHTML = data.isp;
      lat = data.location.lat;
      lng = data.location.lng;
      changeLocation(lat, lng);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserLocation() {
    const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;
    try {
      const response = await fetch(`${apiUrl}`, {
        method: "GET",
      });
      const data = await response.json();
      ipResult.innerHTML = data.ip;
      locationResult.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
      let timeZone = moment()
        .utcOffset(data.location.timezone / 60)
        .format("z");
      timezoneResult.innerHTML = `${timeZone} ${data.location.timezone}`;
      ispResult.innerHTML = data.isp;
      lat = data.location.lat;
      lng = data.location.lng;
      initializeMap(lat, lng);
    } catch (error) {
      console.error(error);
    }
    resultTable.style.display = "grid";
  }

  function changeLocation(lat, lng) {
    map.setView([lat, lng]);
    L.marker([lat, lng], { icon: icon }).addTo(map);
  }
});
