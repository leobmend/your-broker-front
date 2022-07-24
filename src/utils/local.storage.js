const getItem = (key) => (
  JSON.parse(localStorage.getItem(key))
);

const setItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const myLocalStorage = {
  getItem,
  setItem,
};

export default myLocalStorage;
