import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { useHistory } from 'react-router-dom';
import yourBrokerAPI from '../../utils/your.broker.api';
import Header from '../../components/Header';
import List from '../../components/List';

const MAX_ITEMS = 10;

const moneyFormat = (number) => `R$ ${number.toFixed(2)}`;

const Stocks = ({ token }) => {
  const [user, setUser] = useState({});
  const [stocks, setStocks] = useState([]);
  const [pag, setPag] = useState(1);

  const history = useHistory();

  if (!token) history.push('/');

  const getAtivos = (searchOptions) => {
    yourBrokerAPI.ativos(searchOptions)
      .then(({ data }) => setStocks(data.data));
  };

  useEffect(() => {
    if (!user.nome) {
      yourBrokerAPI.cliente(token)
        .then(({ data }) => setUser(data.data));
    }
  });

  useEffect(() => {
    if (user.nome && !stocks.length) {
      getAtivos({});
    }
  });

  const renderPage = () => (
    <main className="page Stocks">
      <Header user={ user } menu={ { first: 'investimentos', second: 'transacoes' } } />
      <List
        headers={ ['ticker', 'empresa', 'qtde', 'valor'] }
        items={ stocks.map((item) => (
          {
            ...item,
            valor: moneyFormat(item.valor),
          }
        )) }
      />
      {' '}
      <div className="pag-btns">
        <button
          type="button"
          className="button"
          disabled={ pag < 2 }
          onClick={ () => {
            getAtivos({ pag: pag - 1 });
            setPag(pag - 1);
          } }
        >
          { '<<' }
        </button>
        <button
          type="button"
          className="button"
          disabled={ stocks.length !== MAX_ITEMS }
          onClick={ () => {
            getAtivos({ pag: pag + 1 });
            setPag(pag + 1);
          } }
        >
          { '>>' }
        </button>
      </div>
    </main>
  );

  return renderPage();
};

Stocks.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Stocks;
