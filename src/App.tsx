import React from 'react'
import Layout from './Layout'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './Pages/Home'

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <Layout>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </React.Fragment>
  )
}

export default App
