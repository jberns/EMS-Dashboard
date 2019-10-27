import React from "react";
import { withRouter } from "react-router";
import { Layout } from "antd";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import { withAuthenticator } from "aws-amplify-react";
import Amplify, { Auth, Hub } from 'aws-amplify';

import Header from './components/Header';
import aws_exports from './aws-exports';

const API_URL = "http://localhost:4000";
const cubejsApi = cubejs(
  async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  { apiUrl: `${API_URL}/cubejs-api/v1` }
);

Amplify.configure(aws_exports);

const client = new AWSAppSyncClient(
  {
    disableOffline: true,
    url: aws_exports.aws_appsync_graphqlEndpoint,
    region: aws_exports.aws_appsync_region,
    auth: {
      type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
    },
  },
  { cache: new InMemoryCache() }
);

Hub.listen('auth', (data) => {
  if (data.payload.event === 'signOut') {
    client.resetStore();
  }
});

const AppLayout = ({ location, children }) => (
  <Layout style={{ height: "100%" }}>
    <Header location={location} />
    <Layout.Content>{children}</Layout.Content>
  </Layout>
);

const App = withRouter(({ location, children }) => (
  <CubeProvider cubejsApi={cubejsApi}>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Rehydrated>
          <AppLayout location={location}>{children}</AppLayout>
        </Rehydrated>
      </ApolloHooksProvider>
    </ApolloProvider>
  </CubeProvider>
));

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"]
  }
});