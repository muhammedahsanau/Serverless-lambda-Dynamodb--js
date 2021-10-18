import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import {Dynamo} from "../common/Dynamo"
import schema from "./schema";
import {table_name} from "@libs/constants";
const deleteUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  let ID = event.body.ID;
  
  const res = await Dynamo.delete(ID,table_name).catch((err) => {
    console.log("error in Dynamo delete", err);
    return null;
  });
 

  if (!res) {
    return formatJSONResponse({ message: "Failed to delete the user(${ID})" });
  }

  return formatJSONResponse({ message: res });
};

export const main = middyfy(deleteUser);