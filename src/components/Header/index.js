import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import moneyFormat from '../../utils/money.format';
import './style.css';

const menuMap = {
  ativos: 'Ativos Disponíveis',
  investimentos: 'Meus Investimentos',
  transacoes: 'Depositar / Sacar',
};

const Header = ({ user, menu }) => {
  const history = useHistory();

  return (
    <>
      <div className="header">
        <h2 className="bg">
          <span className="label">cliente</span>
          { user.nome }
        </h2>
        <h3 className="bg">
          <span className="label">saldo</span>
          { moneyFormat(user.saldo) }
        </h3>
      </div>
      <div className="menu">
        <button
          type="button"
          className="button"
          onClick={ () => history.push(`/${menu.first}`) }
        >
          { menuMap[menu.first] }
        </button>
        <button
          type="button"
          className="button"
          onClick={ () => history.push(`/${menu.second}`) }
        >
          { menuMap[menu.second] }
        </button>
      </div>
    </>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    nome: PropTypes.string,
    saldo: PropTypes.number,
  }).isRequired,
  menu: PropTypes.shape({
    first: PropTypes.string,
    second: PropTypes.string,
  }).isRequired,
};

export default Header;
