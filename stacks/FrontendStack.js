import * as sst from "@serverless-stack/resources";

export default class FrontendStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { api, auth, bucket } = props;

    const site = new sst.ReactStaticSite(this, "ReactSite", {
      customDomain:
        scope.stage === "prod"
        ? {
          domainName: "temporarystratum.com",
          domainAlias: "www.temporarystratum.com",
        }
        : undefined,
      path: "frontend",
      environment: {
        REACT_APP_API_URL: api.customDomainUrl || api.url,
        REACT_APP_REGION: scope.region,
        REACT_APP_BUCKET: bucket.bucketName,
        REACT_APP_USER_POOL_ID: auth.cognitoUserPool.userPoolId,
        REACT_APP_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
        REACT_APP_USER_POOL_CLIENT_ID:
          auth.cognitoUserPoolClient.userPoolClientId,
      },
    });

    this.addOutputs({
      SiteUrl: site.customDomainUrl || site.url,
    });
  }
}