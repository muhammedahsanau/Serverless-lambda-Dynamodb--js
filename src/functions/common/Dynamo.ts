const AWS = require("aws-sdk");
// AWS.config.update({ region: "us-east-1" });

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

export const Dynamo = {
  async updateUser(user, TableName) {
    if (!user.ID || !user.email) {
      throw Error("no ID or email on the data");
    }

    const params = {
      TableName,
      Item: user,
    };
    
    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was an error inserting ID of ${user.ID} and email ${user.Email} in table ${TableName}`
      );
    }

    return user;

  },

  async getAUser(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };
    const data = await documentClient.get(params).promise();

    if (!data.Item || !data) {
      throw Error(
        `There was an error getting the user ${ID} in table ${TableName}`
      );
    }

    return data.Item;
  },

  async delete(ID: number, TableName) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const res = await documentClient.delete(params).promise();

    if (!res) {
      throw Error(
        `There was an error deleting user ${ID} in table ${TableName}`
      );
    }

    return JSON.stringify({
      Message: "user daleted successfully",
    });
  },

  async getAllUsers(TableName) {
    const params = {
      TableName,
    };

    const res = await documentClient.scan(params).promise();

    if (!res) {
      throw Error(`There was in table ${TableName}`);
    }

    return res;
  },

  async saveUser(user, TableName) {
    if (!user.ID || !user.email) {
      throw Error("no ID or email on the data");
    }

    const params = {
      TableName,
      Item: user,
    };
    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was an error inserting ID of ${user.ID} and email ${user.Email} in table ${TableName}`
      );
    }

    return user;
  },
};
