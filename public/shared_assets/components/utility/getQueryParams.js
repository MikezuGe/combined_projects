const getQueryParams = (search = window.location.search) => search.slice(1)
  .split('&')
  .reduce((total, current) => {
    const [ key, value, ] = current.split('=');
    total[key] = value || undefined;
    return total;
  }, {});


export default getQueryParams;
