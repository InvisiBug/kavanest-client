export const localStorageParser = (datapoint) => {
  return JSON.parse(localStorage.getItem(datapoint));
};

export const localStorageSaver = (datapoint, value) => {
  localStorage.setItem(datapoint, JSON.stringify(value));
};
