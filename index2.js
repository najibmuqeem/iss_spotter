const { nextISSTimesForMyLocation } = require("./iss_promised");

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => {
//     console.log(body);
//   });

nextISSTimesForMyLocation()
  .then(times => {
    for (const time of times) {
      const date = new Date(0);
      date.setUTCSeconds(time.risetime);
      const duration = time.duration;
      console.log(`Next pass on ${date} for ${duration} seconds!`);
    }
  })
  .catch(error => {
    console.log("It didn't work:", error.message);
  });
