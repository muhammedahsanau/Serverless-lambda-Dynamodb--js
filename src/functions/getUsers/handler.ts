import { middyfy } from "@libs/lambda";
import { formatJSONResponse } from "@libs/apiGateway";
import { Dynamo } from "../common/Dynamo";
export const getUser = async (event) => {
  // console.log("event", event);
  var events = event;

  events = 10;
  console.log(events);

  const users = await Dynamo.getAllUsers("usersTable_a").catch((err) => {
    console.log("there is an error from dynamo", err);
    return null;
  });

  if (!users) {
    return formatJSONResponse({ message: "Failed to get all users" });
  }

  return formatJSONResponse({ message: users });
};

export const main = middyfy(getUser);
