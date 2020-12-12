import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Header from './Header';

function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:id" component={Detail} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
