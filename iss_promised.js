const request = require("request-promise-native");

const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function(body) {
  return request(`https://ipvigilante.com/${JSON.parse(body).ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${
      JSON.parse(body).data.latitude
    }&lon=${JSON.parse(body).data.longitude}`
  );
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
