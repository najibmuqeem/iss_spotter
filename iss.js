const request = require("request");

const fetchMyIP = function(callback) {
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    const ip = JSON.parse(body).ip;
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, {
      latitude: JSON.parse(body).data.latitude,
      longitude: JSON.parse(body).data.longitude
    });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      callback(null, JSON.parse(body).response);
    }
  );
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, nextTimes) => {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, nextTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
