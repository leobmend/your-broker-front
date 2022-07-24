const moneyFormat = (number) => {
  if (typeof number === 'number') {
    return `R$ ${number.toFixed(2)}`;
  }
  return '';
};

export default moneyFormat;
