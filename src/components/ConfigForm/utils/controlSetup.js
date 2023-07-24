export function useCommonUtil(props) {
  const getKeyPath = (key, item) => {
    if (item.valuePath === false) {
      return props.valuePath;
    } else {
      return `${props.valuePath}.${key}`;
    }
  };

  return {
    getKeyPath,
  };
}
