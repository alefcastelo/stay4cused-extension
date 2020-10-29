import React from 'react'
import Layout from './Layout'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Countdown from './Pages/Countdown'

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <Layout>
          <Switch>
            <Route path="/">
              <Countdown />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </React.Fragment>
  )
}

export default App
