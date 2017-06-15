import React from 'react';
import { Route, Link } from 'react-router-dom'
import Login from '../components/Login'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
    </header>

    <main>
      <Route exact path="/" component={Login} />
    </main>
  </div>
)

export default App;