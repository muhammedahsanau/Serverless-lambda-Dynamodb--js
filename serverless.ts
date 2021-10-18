import type { AWS } from "@serverless/typescript";

 
 
import getUsers from "@functions/getUsers";
import saveData from "@functions/saveUser";
import deleteUser from "@functions/deleteUser";
import getAUser from "@functions/getAUser";
import updateUser from "@functions/updateUser";
// import {table_name} from "@libs/constants";
const serverlessConfiguration: AWS = {
  service: "serverless-with-ts",
  frameworkVersion: "2",
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        inMemory: true,
        heapInitial: "200m",
        heapMax: "1g",
        migrate: true,
        seed: true,
        convertEmptyValues: true,
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
    },
  },
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
     "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource: "*",
      },
    ],
  },
  // import the function via paths
  functions: {getUsers,saveData,updateUser,deleteUser,getAUser},

  resources: {
    Resources: {
      usersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "usersTable_a",
          AttributeDefinitions: [
            { AttributeName: "ID", AttributeType: "N" },
         
          ],
          KeySchema: [
            { AttributeName: "ID", KeyType: "HASH" },
         
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
