import { middyfy } from "@libs/lambda";
import { formatJSONResponse } from "@libs/apiGateway";

import { Dynamo } from "../common/Dynamo";
import { table_name } from "@libs/constants";
export const updateUser = async (event) => {
  let user = event.body;

  const newUser = await Dynamo.updateUser(user, table_name);

  return formatJSONResponse({
    Res: newUser,
  });
};

export const main = middyfy(updateUser);
