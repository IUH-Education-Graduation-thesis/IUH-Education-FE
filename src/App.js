import logo from './logo.svg';
import { useQuery, gql } from '@apollo/client';
import './App.css';

function App() {
  const { data: dataLogin, loading: loadingLogin } = useQuery(
    gql`
      query LOGIN($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          status
          errors {
            message
            error_fields
          }
          message
          data {
            token
          }
        }
      }
    `,
    {
      variables: {
        username: '18054321',
        password: '1234567',
      },
    }
  );

  console.log('data', dataLogin);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
