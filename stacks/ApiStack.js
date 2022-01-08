import * as sst from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {
  //Public reference to the API
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;

    //create the api
    this.api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
        "GET /notes": "src/list.main",
        "POST /notes": "src/create.main",
        "GET /notes/{id}": "src/get.main",
        "PUT /notes/{id}": "src/update.main",
        "DELETE /notes/{id}": "src/delete.main",
      },
    });

    //allow the api to access the table
    this.api.attachPermissions([table]);

    //show the api endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    })
  }
}