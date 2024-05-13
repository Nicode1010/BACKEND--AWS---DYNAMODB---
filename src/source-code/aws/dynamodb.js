/*const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");

const { AWS_REGION, SURVEY_TABLE } = require("../utils/constants");

const dynamodbClient = new DynamoDB({ region: AWS_REGION });
const dynamodb = DynamoDBDocument.from(dynamodbClient);

const getUserData = async (id) => {
  try {
    const params = {
      TableName: SURVEY_TABLE,
      Key: {
        id,
      },
    };
    console.info({ msg: "PARAMS", params });

    const { Item } = await dynamodb.get(params);

    return Item;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createUser = async (id, email, password) => {
  try {
    const params = {
      TableName: SURVEY_TABLE,
      Item: {
        id,
        email,
        password,
        nombre: "",
        apellido: "",
        surveys: [],
      },
    };
    console.info({ msg: "PARAMS", params });

    await dynamodb.put(params);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const verifyUser = async (id) => {
  try {
    const params = {
      TableName: SURVEY_TABLE,
      Key: {
        id,
      },
      UpdateExpression: "set verified = :v",
      ExpressionAttributeValues: {
        ":v": true,
      },
    };
    console.info({ msg: "PARAMS", params });

    await dynamodb.update(params);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUserData = async (id, data) => {
  try {
    const params = {
      TableName: SURVEY_TABLE,
      Key: {
        id,
      },
      UpdateExpression: `set 
        nombre = :nm, 
        apellido = :ap
      `,
      ExpressionAttributeValues: {
        ":nm": data.nombre,
        ":ap": data.apellido,
      },
    };
    console.info({ msg: "PARAMS", params });

    await dynamodb.update(params);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getUserData,
  createUser,
  verifyUser,
  updateUserData,
};*/
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const { 
  DynamoDBDocument, 
  GetCommand,
  PutCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const { AWS_REGION, DYNAMODB_TABLE } = require("../utils/constants");

const dynamodbClient = new DynamoDB({ region: AWS_REGION });
const dynamodb = DynamoDBDocument.from(dynamodbClient);

const getDynamoDBItem = async (key) => {
  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      id
    },
  };
  console.info("GET PARAMS", params);

  try {
    const command = new GetCommand(params);
    const response = await dynamodb.send(command);

    if (response.Item) {
      return response.Item;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const putDynamoDBItem = async (item) => {
  const params = {
    TableName: DYNAMODB_TABLE,
    Item: item,
  };
  console.info("PUT PARAMS", params);

  try {
    const command = new PutCommand(params);
    await dynamodb.send(command);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const deleteDynamoDBItem = async (key) => {
  const params = {
    TableName: DYNAMODB_TABLE,
    Key: key,
  };
  console.info("DELETE PARAMS", params);

  try {
    const command = new DeleteCommand(params);
    await dynamodb.send(command);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getDynamoDBItem,
  putDynamoDBItem,
  deleteDynamoDBItem,
};
