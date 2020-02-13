const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchCoordsByIP("66.207.199.230", (error, data) => {
  if (error) {
    console.log("Error!", error);
    return;
  }
  console.log("Returned coordinates:", data);
});

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });
