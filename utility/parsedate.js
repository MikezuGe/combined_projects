const parsers = {
  'Y': (date, charAmount) => date.getFullYear().toString().slice(-(charAmount)),
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


const keyToValue = (date, chars) => /\w/.test(chars)
  ? parsers[chars[0]](date, chars.length)
  : chars;

/**
 * 
 * @param {Date} [date=Date] - JS date object of desired date
 * @param {string} format - String to extract from given date.
 * E.g. 'ss:mm:hh DD.MM.YYYY' would return date in format 11:11:11 11.11.1971
 * Allowed characters: s m h D M Y /:.-
 * @returns {string} - Formatted date string
 */
const parseDate = (date, format) => {
  return format.match(/([smhDM])\1?|YYYY|YY|[/:.-\s]/gi)
    .reduce((total, current) => (total += keyToValue(date, current), total), '');
};


module.exports = parseDate;
