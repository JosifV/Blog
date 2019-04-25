const axios = require("axios");

const payload = {
  author: "Comment Author EDIT",
  body: "Comment Text EDIT"
};
axios
  .patch(
    "http://localhost:5000/editcomment/5cc17fe0cbcce6652cf28365/5cc17e829f8ca4542419b66f/5cc181d3e5d733229c580911",
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
