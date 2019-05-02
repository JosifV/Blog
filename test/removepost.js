const axios = require("axios");

axios
  .delete(
    "http://localhost:5000/deletepost/5cc991f5a6beaa09fc22371a/5cc99158485232241402a7dc/5cc9934075f984135cb57b0a"
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
