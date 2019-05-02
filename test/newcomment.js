const axios = require("axios");

const payload = {
  author: "Comment Author",
  body: "Comment Text"
};
axios
  .post(
    "http://localhost:5000/comment/5cc991f5a6beaa09fc22371a/5cc99158485232241402a7dc",
    payload
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
