import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import { useHistory } from 'react-router-dom';

const headersMap = {
  ticker: 'codAtivo',
  qtde: 'qtdeAtivo',
  empresa: 'empresa',
  valor: 'valor',
  total: 'total',
};

const List = ({ headers, items }) => {
  const history = useHistory();

  return (
    <div className="list">
      <div className="headers">
        {
          headers.map((header) => <p key={ header }>{ header }</p>)
        }
      </div>
      { items && items.map((item) => (
        <div
          key={ item.codAtivo }
          className="bg item"
          onClick={ () => history.push(`/ativos/${item.codAtivo}`) }
          onKeyDown={ () => {} }
          role="button"
          tabIndex={ 0 }
        >
          { headers.map((header) => <p key={ header }>{ item[headersMap[header]] }</p>)}
        </div>
      )) }
    </div>
  );
};

List.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;
