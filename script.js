document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "at_ZYyq7XWNdbutrydrjzs6dAowsno34";
  const form = document.querySelector("form");
  const userInput = document.querySelector(".userInput");
  const ipResult = document.querySelector(".ipResult");
  const locationResult = document.querySelector(".locationResult");
  const timezoneResult = document.querySelector(".timezoneResult");
  const ispResult = document.querySelector(".ispResult");
  const apiCredits = `https://geo.ipify.org/service/account-balance?apiKey=${apiKey}`;
  var lat;
  var lng;

  const map = L.map("map").locate({
    setView: true,
    maxZoom: 16,
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  map.on("locationfound", (e) => {
    L.marker(e.latlng).addTo(map);
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
      lat = data.location.lat;
      lng = data.location.lng;
      changeLocation(lat, lng);
    } catch (error) {
      console.error(error);
    }
  }

  function changeLocation(lat, lng) {
    map.setView([lat, lng]);
    L.marker([lat, lng]).addTo(map);
  }
});