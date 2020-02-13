const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, times) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  for (const time of times) {
    const date = new Date(0);
    date.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass on ${date} for ${duration} seconds!`);
  }
});

// fetchISSFlyOverTimes(
//   {
//     latitude: 43.6383,
//     longitude: -79.4301
//   },
//   (error, flyoverTimes) => {
//     if (error) {
//       console.log("Failure!", error);
//       return;
//     }
//     console.log("Flyover times:", flyoverTimes);
//   }
// );

// fetchCoordsByIP("66.207.199.230", (error, coords) => {
//   if (error) {
//     console.log("Error!", error);
//     return;
//   }
//   console.log("Returned coordinates:", coords);
// });

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });
