import * as uuid from "uuid";
import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      //attributes of the item to be created
      userId: "123", //id of author
      noteId: uuid.v1(),
      content: data.content, //parsed from request body
      attachment: data.attachment, //same
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});