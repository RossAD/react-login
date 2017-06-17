import React from 'react';
import { Route, Link } from 'react-router-dom'
import SignInPage from '../components/SignInPage'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
    </header>

    <main>
      <Route exact path="/" component={SignInPage} />
    </main>
  </div>
)

export default App;