const axios = require("axios");

axios
  .post(
    "http://localhost:5000/create/title/author45/cathegory/axaxa/5cc99158485232241402a7dc"
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
