module.exports = {
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from client
  },
  serialize(value) {
    return value.getTime(); // value to client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // ast value is always in string format
    }
    return null;
  }
};
