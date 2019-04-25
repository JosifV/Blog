const axios = require("axios");

const payload = {
  author: "Comment Author",
  body: "Comment Text"
};
axios
  .post(
    "http://localhost:5000/comment/5cc17fe0cbcce6652cf28365/5cc17e829f8ca4542419b66f",
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
