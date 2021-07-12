import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from '../../components';
import { Home, Success } from '../../pages';

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/success" component={Success} exact />
      </Switch>
    </Router>
  )
}

export default Routes
