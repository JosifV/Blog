const axios = require("axios");

axios
  .post(
    "http://localhost:5000/log/newuser23/newpass/emailordersvladc@gmail.com"
  )
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
