import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {
  //public refrence to the bucket
  bucket;
  
  //public reference to the table
  table;

  constructor(scope, id, props) {
    super(scope, id, props);

    //create an s3 bucket
    this.bucket = new sst.Bucket(this, "Uploads");

    //create the DynamoDB table
    this.table = new sst.Table(this, "Notes", {
      fields: {
        userId: sst.TableFieldType.STRING,
        noteId: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
    });
  }
}