const faker = require("faker");
import { Dynamo } from "./Dynamo";
// const axios = require("axios");
import { data, deleteMsg, table_name } from "../../libs/constants";
// import { formatJSONResponse } from "../../libs/apiGateway";

const randomId = Math.random();
const randomEmail = faker.internet.email();
//test => Dynamo is an object
test("Dynamo is an object", () => {
  expect(typeof Dynamo).toBe("object");
});

test("Dynamo has saveUser function", () => {
  expect(typeof Dynamo.saveUser).toBe("function");
});
test("Dynamo has updateUser function", () => {
  expect(typeof Dynamo.updateUser).toBe("function");
});
test("Dynamo has getAUser function", () => {
  expect(typeof Dynamo.getAUser).toBe("function");
});
test("Dynamo has getAllUsers function", () => {
  expect(typeof Dynamo.getAllUsers).toBe("function");
});
test("Dynamo has deleteUser function", () => {
  expect(typeof Dynamo.delete).toBe("function");
});

//test => should add new item in dynamo table
test("Dynamo.saveUser should add new user in dynamo table", async () => {
  let user = {
    ID: randomId,
    email: randomEmail,
  };
  let newUser = await Dynamo.saveUser(user, table_name);
  expect(typeof newUser).toBe("object");
});

//test => should update an user in dynamo table
test("Dynamo.updateUser should update an user in dynamo table", async () => {
  let user = {
    ID: randomId,
    email: randomEmail,
  };
  try {
    let newUser = await Dynamo.updateUser(user, table_name);
    expect(typeof newUser).toBe("object");
  } catch (error) {
    console.log("error in test updatieuser", error);
  }
});

//test => getAUser by ID from Dynamo table
test("Dynamo.getAUser should get a user from dynamo table", async () => {
  let ID = randomId;
  try {
    let getUser = await Dynamo.getAUser(ID, table_name);
    expect(getUser.email).toEqual(randomEmail);
  } catch (error) {
    console.log("error in test getuser", error);
  }
});

//test => should delete an item from dynamo table
test("Dynamo.delete should delete an item from dynamo table", async () => {
  try {
    let response = await Dynamo.delete(randomId, table_name);
    expect(response).toEqual(deleteMsg);
  } catch (error) {
    console.log("error in test deleteitem", error);
  }
});

//test => getAll users from Dynamo table
test("Dynamo.getAllUsers should get all items from dynamo table", async () => {
  try {
    let recievedDataFromDynamo = await Dynamo.getAllUsers(table_name);
    expect(recievedDataFromDynamo.Count).toEqual(data.message.Count);
  } catch (error) {
    console.log("error in test getAllUsers", error);
  }
});

// let dataFromApi_count = null;
// await axios
//   .get(URIs.getAllUsers)
//   .then(function (response) {
//     // handle success
//     dataFromApi_count = response.data.message.Count;
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   });
