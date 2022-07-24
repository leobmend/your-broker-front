import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import './style.css';

import { useHistory } from 'react-router-dom';
import yourBrokerAPI from '../../utils/your.broker.api';
import myLocalStorage from '../../utils/local.storage';

const Login = ({ setToken }) => {
  const [nome, setNome] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [senha, setSenha] = useState(undefined);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const history = useHistory();

  const login = () => {
    yourBrokerAPI.login({ email, senha })
      .then(({ data, error }) => {
        if (error) toast.error(error);
        else {
          toast.success('Login realizado com sucesso');
          setToken(data.token);
          myLocalStorage.setItem('your-broker-token', data.token);
          history.push('/investimentos');
        }
      });
  };

  const signUp = () => {
    yourBrokerAPI.signUp({ nome, email, senha })
      .then(({ data, error }) => {
        if (error) toast.error(error);
        else {
          toast.success('Cadastro realizado com sucesso');
          setToken(data.token);
          myLocalStorage.setItem('your-broker-token', data.token);
          history.push('/investimentos');
        }
      });
  };

  return (
    <>
      <div><Toaster /></div>
      <main className="page Login">
        <h1 className="bg">Your Broker</h1>
        <div className="bg login-form">
          {
            isSigningUp && (
              <input
                type="text"
                placeholder="Nome"
                value={ nome }
                onChange={ ({ target }) => setNome(target.value) }
                autoComplete="off"
              />
            )
          }
          <input
            type="text"
            placeholder="E-mail"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Senha"
            value={ senha }
            onChange={ ({ target }) => setSenha(target.value) }
            autoComplete="off"
          />
          <div className="login-btns">
            {
              isSigningUp || (
                <button
                  type="button"
                  className="button"
                  onClick={ () => login() }
                >
                  Entrar
                </button>
              )
            }
            <button
              type="button"
              className="button"
              onClick={ () => {
                if (!isSigningUp) setIsSigningUp(true);
                else signUp();
              } }
            >
              Cadastrar
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
