import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Layout from '../components/Layout'
import { withApollo } from '../lib/apollo'
import List from '../components/List'
import Form from '../components/Form'

const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`

const Home = () => {
  const { data, loading, error } = useQuery(HELLO_QUERY)
  if (loading) return <div />
  return (
    <Layout>
      <div className="hero">
        <h1 className="title">Habit Tracker</h1>
        <div className="list">
          <Form />
          <List />
        </div>
      </div>
      <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin-top: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .list {
        max-width: 600px;
        margin: 0 auto;
      }
    `}</style>
    </Layout>
  )
}

export default withApollo(Home);
