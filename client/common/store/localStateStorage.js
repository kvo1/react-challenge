export const loadGlobalState = () => {
  try {
    const serializedState = localStorage.getItem('__rcstore');

    if (!serializedState) return undefined;

    const parseJSON = JSON.parse(serializedState);

    return parseJSON;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const saveGlobalState = (state) => {
  try {
    const cache = [];
    const serializedState = JSON.stringify(state, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) return;
        cache.push(value);
      }
      return value;
    });

    localStorage.setItem('__rcstore', serializedState);
  } catch (error) {
    console.log(error);
  }
};
