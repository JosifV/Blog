const axios = require("axios");

axios
  .delete(
    "http://localhost:5000/deletepost/5cc17fbefae5aa227ca48de7/5cc17e829f8ca4542419b66f"
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
