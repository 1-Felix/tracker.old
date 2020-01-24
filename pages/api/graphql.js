import { ApolloServer, gql } from 'apollo-server-micro'
import connectDb from '../../lib/mongoose'


// Describing the available API
const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;

// What get's executed when the API is hit
const resolvers = {
  Query: {
    sayHello: () => {
      return "Hello World";
    }
  }
};

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