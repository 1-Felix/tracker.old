import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'isomorphic-unfetch'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const url = 'http://localhost:3000'

export function withApollo(PageComponent) {
    const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
        // Only initialize apolloClient if does not exist
        const client = apolloClient || initApolloClient(apolloState);
        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        )
    };

    WithApollo.getInitialProps = async (ctx) => {
        const { AppTree } = ctx;
        // Server-Side Apollo-Client setup
        const apolloClient = (ctx.apolloClient = initApolloClient())

        let pageProps = {}
        if (PageComponent.getInitialProps) {
            pageProps = await PageComponent.getInitialProps(ctx)
        }

        // If something happens on the server
        if (typeof window === "undefined") {
            if (ctx.res && ctx.res.finished) {
                return pageProps;
            }
            try {
                const { getDataFromTree } = await import('@apollo/react-ssr')
                await getDataFromTree(
                    <AppTree
                        pageProps={{
                            ...pageProps,
                            apolloClient
                        }}
                    />
                )
            } catch (e) {
                console.error(e);
            }

            Head.rewind();
        }
        const apolloState = apolloClient.cache.extract();
        return {
            ...pageProps,
            apolloState
        }
    };


    return WithApollo;
}

const initApolloClient = (initialState = {}) => {
    const cache = new InMemoryCache().restore(initialState);
    const link = new HttpLink({
        uri: `https://www.graphqlhub.com/graphql`,
        // uri: `${url}/api/graphql`,
        fetch
    });
    const ssrMode = typeof window === 'undefined';

    const client = new ApolloClient({
        ssrMode,
        link,
        cache
    });
    return client;
}