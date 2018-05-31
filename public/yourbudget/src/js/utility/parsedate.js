
const parseDate = (date, format) => {
  const char = format.charAt(format.search(/[^YMDhms]/));
  const f = format
    .split(/[-./: ]/)
    .reduce((total, current) => {
      if (current.search(new RegExp(`[^${current.charAt(0)}]`)) !== -1) throw new Error(`Invalid format: ${current} ${format}`);
      switch (current.slice(-1)) {
        case 'Y': {
          const t = date.getFullYear().toString().slice(-(current.length));
          return (total += t) + char;
        }
        case 'M': {
          const t = (date.getMonth() + 1).toString();
          return (total += (current.length === 2 && t.length < 2 ? '0' : '') + t + char);
        }
        case 'D': {
          const t = date.getDate().toString();
          return (total += (current.length === 2 && t.length < 2 ? '0' : '') + t + char);
        }
        case 'h': {
          const t = date.getHours().toString();
          return (total += (current.length === 2 && t.length < 2 ? ' 0' : ' ') + t + ':');
        }
        case 'm': {
          const t = date.getMinutes().toString();
          return (total += (current.length === 2 && t.length < 2 ? '0' : '') + t + ':');
        }
        case 's': {
          const t = date.getSeconds().toString();
          return (total += (current.length === 2 && t.length < 2 ? '0' : '') + t + ':');
        }
      }
    }, '');
  return (/[-./: ]/.test(f.slice(-1)) ? f.slice(0, -1) : f).trim();
};


export default parseDate;
