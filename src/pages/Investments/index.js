import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import yourBrokerAPI from '../../utils/your.broker.api';

import moneyFormat from '../../utils/money.format';
import Header from '../../components/Header';
import List from '../../components/List';

const Investments = ({ token }) => {
  const [user, setUser] = useState({});
  const [investments, setInvestments] = useState([]);

  const history = useHistory();

  if (!token) history.push('/');

  useEffect(() => {
    if (!user.nome) {
      yourBrokerAPI.cliente(token)
        .then(({ data }) => setUser(data.data));
    }
  });

  useEffect(() => {
    if (user.nome && !investments.length) {
      yourBrokerAPI.investimentos(token)
        .then(({ data }) => setInvestments(data.data));
    }
  });

  const renderPage = () => (
    <main className="page Investments">
      <Header user={ user } menu={ { first: 'ativos', second: 'transacoes' } } />
      <List
        headers={ ['ticker', 'qtde', 'valor', 'total'] }
        items={ investments.map((item) => (
          {
            ...item,
            valor: moneyFormat(item.valor),
            total: moneyFormat(item.valor * item.qtdeAtivo),
          }
        )) }
      />
    </main>
  );

  return renderPage();
};

Investments.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Investments;
