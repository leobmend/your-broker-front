import axios from 'axios';
import jwtDecode from 'jwt-decode';

const getCodClienteFromToken = (token) => {
  const decoded = jwtDecode(token);
  return decoded.data.codCliente;
};

const api = axios.create({
  baseURL: 'https://your-broker.herokuapp.com/',
});

const login = async ({ email, senha }) => (
  api.post('/credenciais/entrar', { email, senha })
    .then(({ data }) => ({ token: data.token }))
    .catch(({ response }) => ({ error: response.data.mensagem }))
);

const signUp = async ({ nome, email, senha }) => (
  api.post('/credenciais/cadastrar', { nome, email, senha })
    .then(({ data }) => ({ token: data.token }))
    .catch(({ response }) => ({ error: response.data.mensagem }))
);

const cliente = async (token) => (
  api.get(
    `/clientes/${getCodClienteFromToken(token)}`,
    { headers: { Authorization: `bearer ${token}` } },
  ).then(({ data }) => ({ data: data.data }))
    .catch(({ response }) => ({ error: response.data.mensagem }))
);

const investimentos = async (token) => (
  api.get(
    `/clientes/${getCodClienteFromToken(token)}/investimentos`,
    { headers: { Authorization: `bearer ${token}` } },
  ).then(({ data }) => ({ data: data.data }))
    .catch(({ response }) => ({ error: response.data.mensagem }))
);

const ativos = async ({ search = '', pag = 1 }) => (
  api.get(`/ativos?termo=${search}&pag=${pag}`)
    .then(({ data }) => ({ data: data.data }))
    .catch(({ response }) => ({ error: response.data.mensagem }))
);

const ativo = async (codAtivo) => (
  api.get(`/ativos/${codAtivo}`)
    .then(({ data }) => ({ data: data.data }))
    .catch(({ response }) => ({ error: response.data.mensagem }))
);

const transacao = async (token, { valor, tipo }) => (
  api.post(
    `/clientes/${getCodClienteFromToken(token)}/transacoes`,
    { valor, tipo },
    { headers: { Authorization: `bearer ${token}` } },
  ).then(({ data }) => ({ data: data.data }))
    .catch(({ response }) => ({ error: response.data.mensagem }))
);

const operacao = async (token, { codAtivo, qtdeAtivo, tipo }) => (
  api.post(
    `/clientes/${getCodClienteFromToken(token)}/operacoes`,
    { codAtivo, qtdeAtivo, tipo },
    { headers: { Authorization: `bearer ${token}` } },
  ).then(({ data }) => ({ data: data.data }))
    .catch(({ response }) => ({ error: response.data.mensagem }))
);

const yourBrokerAPI = {
  login,
  signUp,
  cliente,
  investimentos,
  ativos,
  ativo,
  transacao,
  operacao,
};

export default yourBrokerAPI;
