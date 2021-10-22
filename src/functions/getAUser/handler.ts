import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import {Dynamo} from "../common/Dynamo"
import schema from "./schema";
import {table_name} from "@libs/constants";
import { type } from "os";
const getAUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  let ID = event.body.ID;
 
 
  const user = await Dynamo.getAUser(ID,table_name).catch((err) => {
    console.log("error in Dynamo get", err);
    return null;
  });
 

  if (!user) {
    return formatJSONResponse({ message: "Failed to get the user" });
  }
  console.log("type of user::",typeof user);
  
  console.log("type of formatJSONResponse::",typeof formatJSONResponse({ message: user }));

  return formatJSONResponse({ message: user });
};

export const main = middyfy(getAUser);