import { ApolloServer, gql } from 'apollo-server-micro'
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit'

import connectDb from '../../lib/mongoose'
import { habitsResolvers } from '../../api/habits/resolvers'
import { habitsMutations } from '../../api/habits/mutations'
import Habits from '../../api/habits/Habits.graphql'


// Describing the available API
const fakeTypeDefs = gql`
  type Query {
    sayHello: String
  }
`;

// What get's executed when the API is hit
const fakeResolvers = {
  Query: {
    sayHello: () => {
      return "Hello World";
    }
  }
};

const resolvers = mergeResolvers([
  fakeResolvers,
  habitsResolvers,
  habitsMutations
]);

const typeDefs = mergeTypeDefs([fakeTypeDefs, Habits]);

// create the server
const apolloServer = new ApolloServer({ typeDefs, resolvers });

// Config for the Route
export const config = {
  api: {
    bodyParser: false
  }
}

const server = apolloServer.createHandler({ path: "/api/graphql" });
export default connectDb(server);



// Serverless Function
// export default (req, res) => {
//   res.status(200).json({ test: "Hello World" })
// }

  // Long way
  // export default (req, res) => {
  //   res.setHeader('Content-Type', 'application(jsonn')
  //   res.statusCode = 200
  //   res.end(JSON.stringify({
  //     test: "hello"
  //   }))
  //}