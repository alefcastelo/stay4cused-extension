import React from 'react'
import Layout from './Layout'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './Pages/Home'
import Blocklist from './Pages/Blocklist'
import TabLimit from './Pages/TabLimit'

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <Layout>
          <Switch>
            <Route path="/tab-limit">
              <TabLimit />
            </Route>
            <Route path="/blocklist">
              <Blocklist />
            </Route>
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
