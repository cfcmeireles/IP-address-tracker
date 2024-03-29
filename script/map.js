document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map").locate({
    setView: true,
    maxZoom: 16,
  });

  map.on("locationfound", (e) => {
    L.marker(e.latlng).addTo(map);
  });

  map.on("locationerror", (e) => {
    console.error("Location denied or unavailable", e.message);
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
});
