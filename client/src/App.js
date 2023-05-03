import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import Home from './pages/home/Home';
import Signup from "./pages/signup/Signup";


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        {/* where the body will go */}
        {/* <div> */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/login' />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/profile' />
          <Route path='/profile/:id' />
          <Route path='/projects' />
          <Route path='/projects/:id' /> 
          <Route path='/projects/:tag' />
          <Route path='/projects/:name' />
        </Routes>
        {/* </div> */}
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
