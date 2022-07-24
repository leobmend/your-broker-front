import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Stocks from './pages/Stocks';
import Investments from './pages/Investments';

import Login from './pages/Login';

import myLocalStorage from './utils/local.storage';
import Transactions from './pages/Transactions';
import Stock from './pages/Stock';

export default function App() {
  const [token, setToken] = useState(myLocalStorage.getItem('your-broker-token'));

  return (
    <div className="App">
      <Switch>
        <Route exact path="/"><Login setToken={ setToken } /></Route>
        <Route path="/investimentos"><Investments token={ token } /></Route>
        <Route exact path="/ativos"><Stocks token={ token } /></Route>
        <Route
          path="/ativos/:codAtivo"
          render={ (props) => <Stock { ...props } token={ token } /> }
        />
        <Route path="/transacoes"><Transactions token={ token } /></Route>
      </Switch>
    </div>
  );
}
