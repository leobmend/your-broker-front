import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import yourBrokerAPI from '../../utils/your.broker.api';
import Header from '../../components/Header';

const Transactions = ({ token }) => {
  const [user, setUser] = useState({});
  const [value, setValue] = useState(0);

  const history = useHistory();

  if (!token) history.push('/');

  useEffect(() => {
    if (!user.nome) {
      yourBrokerAPI.cliente(token)
        .then(({ data }) => setUser(data));
    }
  });

  const transaction = (type) => {
    yourBrokerAPI.transacao(token, { valor: Number(value), tipo: type })
      .then(({ error }) => {
        if (error) toast.error(error);
        else {
          const newSaldo = user.saldo
            + (type === 'saque' ? -Number(value) : Number(value));
          toast.success(
            `O ${type} concluído com sucesso.`,
          );
          setUser({ ...user, saldo: newSaldo });
        }
      });
  };

  const renderPage = () => (
    <>
      <div><Toaster /></div>
      <main className="page Transactions">
        <Header user={ user } menu={ { first: 'investimentos', second: 'ativos' } } />
        <div className="bg transaction">
          <span className="label">{ value ? 'valor' : '' }</span>
          <input
            type="number"
            placeholder="Valor"
            pattern="\d+"
            value={ value || '' }
            onChange={ ({ target }) => setValue(Number(target.value)) }
            autoComplete="off"
          />
          <div className="transaction-btns">
            <button
              type="button"
              className="button"
              onClick={ () => transaction('deposito') }
            >
              Depositar
            </button>
            <button
              type="button"
              className="button"
              onClick={ () => transaction('saque') }
            >
              Sacar
            </button>
          </div>
        </div>
      </main>
    </>

  );

  return renderPage();
};

Transactions.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Transactions;
