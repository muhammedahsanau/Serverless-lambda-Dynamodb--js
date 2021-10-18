const axios = require("axios");

let data_count ;
async function get() {
     await axios
    .get("http://localhost:3000/dev/getUsers")
    .then(function (response) {
      // handle success
      data_count = response.data.message.Count
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
      
      
    });
    // data = JSON.stringify(data)
    // 
    console.log("data is ::"+ data_count);
    
};

get();