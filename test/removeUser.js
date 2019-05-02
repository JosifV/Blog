const axios = require("axios");

axios
  .delete("http://localhost:5000/deleteuser/5ccb213accb5a220cc8e6e80")
  .then(resp => {
    console.log("/////////////////////");
    console.log(resp);
    console.log(resp.data);
    console.log("/////////////////////");
  })
  .catch(err => {
    console.log("*********************");
    console.log(err);
    console.log(err.data);
    console.log("*********************");
  });
