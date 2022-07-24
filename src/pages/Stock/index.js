import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import yourBrokerAPI from '../../utils/your.broker.api';
import Header from '../../components/Header';
import moneyFormat from '../../utils/money.format';

const Stock = ({ token, match: { params: { codAtivo } } }) => {
  const [user, setUser] = useState({});
  const [stockInvested, setStockInvested] = useState({});
  const [stock, setStock] = useState({});
  const [quantity, setQuantity] = useState(0);

  const history = useHistory();

  if (!token) history.push('/');

  useEffect(() => {
    if (!user.nome) {
      yourBrokerAPI.cliente(token)
        .then(({ data }) => setUser(data));
    }
  });

  useEffect(() => {
    if (user.nome && !stockInvested.codAtivo) {
      yourBrokerAPI.investimentos(token)
        .then(({ data }) => {
          const stockInInvestments = data.find((stockI) => stockI.codAtivo === codAtivo)
            || { codAtivo, qtdeAtivo: 0 };
          setStockInvested({ codAtivo, quantity: stockInInvestments.qtdeAtivo });
        });
    }
    if (stockInvested.codAtivo && !stock.codAtivo) {
      yourBrokerAPI.ativo(codAtivo)
        .then(({ data }) => {
          setStock(data);
        });
    }
  });

  const operation = (type) => {
    yourBrokerAPI.operacao(token, { codAtivo, qtdeAtivo: Number(quantity), tipo: type })
      .then(({ error }) => {
        if (error) toast.error(error);
        else {
          const numberQuantity = Number(quantity);
          const totalValue = numberQuantity * stock.valor;
          const newSaldo = user.saldo + (type === 'venda' ? totalValue : -totalValue);
          const newStockInvested = {
            ...stockInvested,
            quantity: stockInvested.quantity
              + (type === 'venda' ? -numberQuantity : numberQuantity),
          };
          const newStock = {
            ...stock,
            qtdeAtivo: stock.qtdeAtivo
              + (type === 'venda' ? numberQuantity : -numberQuantity),
          };
          toast.success(
            `O ${type} concluída com sucesso.`,
          );
          setUser({ ...user, saldo: newSaldo });
          setStockInvested(newStockInvested);
          setStock(newStock);
        }
      });
  };

  const renderPage = () => (
    <>
      <div><Toaster /></div>
      <main className="page Stock">
        <Header
          user={ user }
          menu={ { first: 'investimentos', second: 'ativos', third: 'transacoes' } }
        />
        <h4 className="bg">
          <span className="label">qtde cliente</span>
          { stockInvested.quantity }
        </h4>
        <h4 className="bg">
          <span className="label">qtde corretora</span>
          { stock.qtdeAtivo }
        </h4>
        <h4 className="bg">
          <span className="label">valor un</span>
          { moneyFormat(stock.valor) }
        </h4>
        <div className="bg operation">
          <span className="label">{ quantity ? 'quantidade' : '' }</span>
          <input
            type="number"
            placeholder="Quantidade"
            pattern="\d+"
            value={ quantity || '' }
            onChange={ ({ target }) => setQuantity(Number(target.value)) }
            autoComplete="off"
          />
          {
            quantity ? (
              <div>
                <span className="label">{ quantity ? 'valor total' : '' }</span>
                <h4>{ moneyFormat(stock.valor * quantity) }</h4>
              </div>
            ) : <div />
          }
          <div className="operation-btns">
            <button
              type="button"
              className="button"
              onClick={ () => operation('compra') }
            >
              Comprar
            </button>
            <button
              type="button"
              className="button"
              onClick={ () => operation('venda') }
            >
              Vender
            </button>
          </div>
        </div>
      </main>
    </>
  );

  return renderPage();
};

Stock.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Stock;
