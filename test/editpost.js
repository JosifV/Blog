const axios = require("axios");

const payload = {
  title: "Changed TITLE",
  body: "Changed BODY"
};
axios
  .patch(
    "http://localhost:5000/editpost/5cc9923bf5ab0d27acae4495/5cc99158485232241402a7dc",
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
