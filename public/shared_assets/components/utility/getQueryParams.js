const getQueryParams = search => (!search && {}) || search.slice(1)
.split('&')
.reduce((total, current) => {
  const [ key, value, ] = current.split('=');
  if (key) {
    total[key] = value || null;
  }
  return total;
}, {});


export default getQueryParams;
  