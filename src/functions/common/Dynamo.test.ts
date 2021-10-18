const faker = require("faker");
import { Dynamo } from "./Dynamo";
import { data, deleteMsg, table_name } from "../../libs/constants";
// import { formatJSONResponse } from "../../libs/apiGateway";

const randomId = Math.random();

//test => Dynamo is an object
test("Dynamo is an object", () => {
  expect(typeof Dynamo).toBe("object");
});

//test => should add new item in dynamo table
test("should add new item in dynamo table", async () => {
  const randomEmail = faker.internet.email();
  let user = {
    ID: randomId,
    email: randomEmail,
  };
  let newUser = await Dynamo.saveUser(user, table_name);
  expect(typeof newUser).toBe("object");
});

//test => should update an item in dynamo table
test("should update an item in dynamo table", async () => {
  const randomEmailUpdate = faker.internet.email();

  let user = {
    ID: randomId,
    email: randomEmailUpdate,
  };
  let newUser = await Dynamo.saveUser(user, table_name);
  expect(typeof newUser).toBe("object");
});

//test => should delete an item from dynamo table
test("should delete an item from dynamo table", async () => {
  let response = await Dynamo.delete(randomId, table_name);

  expect(response).toEqual(deleteMsg);
});

//test => getAUser by ID from Dynamo table
test("should get an item from table", async () => {
  let ID = 351001110;
  let user_email = "by api muhammadahsan1021@gmail.com";
  let getUser = await Dynamo.getAUser(ID, table_name);
  expect(getUser.email).toEqual(user_email);
});

//test => getAll users from Dynamo table
test("should get all items from table", async () => {
  let recievedData = await Dynamo.getAllUsers(table_name);
  expect(recievedData.Count).toEqual(data.message.Count);
});
