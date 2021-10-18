const axios = require("axios");
import { URIs } from "../../libs/constants";
import { data } from "../../libs/constants";


test("compare the number of items with the ", async () => {
  let data_count = null;
  await axios
    .get(URIs.getAllUsers)
    .then(function (response) {
      // handle success
      data_count = response.data.message.Count;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  expect(data_count).toEqual(data.message.Count);
});

// test("should save a new user to the dynamodb database", async () => {
// let res = null;
// const ID: number = 351254616
//   await axios.post(URIs.saveUser, {
//         ID:  351254616,
//         lastName: 'data from the  exios'
//       })
//       .then(function (response) {
//         res = response
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//       expect(res.ID).toEqual(ID);
// });
