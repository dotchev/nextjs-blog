import Layout from '../components/layout'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import netlifyIdentity from 'netlify-identity-widget';


export default class extends React.Component {
  state = { user: netlifyIdentity.currentUser() };

  componentDidMount() {
    console.log('componentDidMount');
    netlifyIdentity.init()
  }

  login = () => {
    netlifyIdentity.open()
    netlifyIdentity.on('login', user => {
      this.setState({ user })
    })
  }

  logout = () => {
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      this.setState({ user: null })
    })
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>User Test</title>
        </Head>

        <article>
          <h1 className={utilStyles.headingXl}>User Test</h1>
          {JSON.stringify(this.state.user)}
          <p />
          {this.state.user ?
            <button onClick={this.logout}>Logout</button> :
            <button onClick={this.login}>Login</button>}
        </article>
      </Layout>
    )
  }

}
