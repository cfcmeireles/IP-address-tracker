document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "at_ZYyq7XWNdbutrydrjzs6dAowsno34";
  const form = document.querySelector("form");
  const userInput = document.querySelector(".userInput");
  const ipResult = document.querySelector(".ipResult");
  const locationResult = document.querySelector(".locationResult");
  const timezoneResult = document.querySelector(".timezoneResult");
  const ispResult = document.querySelector(".ispResult");
  const apiCredits = `https://geo.ipify.org/service/account-balance?apiKey=${apiKey}`;

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
      console.log(data);
      ipResult.innerHTML = data.ip;
      locationResult.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
      timezoneResult.innerHTML = data.location.timezone;
      ispResult.innerHTML = data.isp;
    } catch (error) {
      console.error(error);
    }
  }
});
