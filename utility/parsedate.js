const keyToValue = {
  'Y': (date, charAmount) => {
    const t = date.getFullYear().toString().slice(-(charAmount));
    return t;
  },
  'M': (date, charAmount) => {
    const t = (date.getMonth() + 1).toString();
    return (charAmount === 1 || t.length === 2 ? '' : '0') + t;
  },
  'D': (date, charAmount) => {
    const t = date.getDate().toString();
    return (charAmount === 1 || t.length === 2 ? '' : '0') + t;
  },
  'h': (date, charAmount) => {
    const t = date.getHours().toString();
    return (charAmount === 1 || t.length === 2 ? '' : '0') + t;
  },
  'm': (date, charAmount) => {
    const t = date.getMinutes().toString();
    return (charAmount === 1 || t.length === 2 ? '' : '0') + t;
  },
  's': (date, charAmount) => {
    const t = date.getSeconds().toString();
    return (charAmount === 1 || t.length === 2 ? '' : '0') + t;
  },
};


module.exports = parseDate = (date, format) => {
  const f = format
    .split('')
    .reduce((total, current) => {
      let t = total[total.length - 1];
      return (t && t[0] === current
        ? total[total.length - 1] += current
        : total[total.length] = current),
        total;
    }, [])
    .reduce((total, current) => {
      return (total += /[YMDhms]/.test(current) ? keyToValue[current[0]](date, current.length) : current);
    }, '');
  return f;
};
