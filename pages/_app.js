import React from "react";
import App from "next/app";
import withApollo from "next-with-apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ThemeProvider } from "styled-components";
import { ProvideAuth } from "~/hooks/auth";
import { message } from "antd";
import { NookiesProvider, parseNookies } from "next-nookies-persist";
import MainLayout from "~/layouts/MainLayout";
import { parseServerError } from "~/helpers";

const theme = {
  colors: {
    primary: "#0070f3"
  }
};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        nookies: parseNookies(ctx), // 👈
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <NookiesProvider initialValue={pageProps.nookies}>
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={theme}>
            <ProvideAuth>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </ProvideAuth>
          </ThemeProvider>
        </ApolloProvider>
      </NookiesProvider>
    );
  }
}

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message: msg, locations, path }) => {
            //console.log(
            //  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            //);
            //console.log(client.cache);
            //console.log(client);
            const { errorMsg: parsedMsg } = parseServerError(msg);
            const errorMsg = parsedMsg ? parsedMsg : msg;
            message.error(errorMsg);
          });

        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      new HttpLink({
        uri: "http://localhost:5000/graphql", // Server URL (must be absolute)
        credentials: "omit", // Additional fetch() options like `credentials` or `headers`
        fetch
      })
    ]),
    cache: new InMemoryCache().restore(initialState || {})
  });
})(MyApp);
