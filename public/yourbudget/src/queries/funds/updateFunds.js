export default `
mutation updateFunds ($id: ID!, $input: FundUpdate!) {
  updateFunds (id: $id, input: $input) {
    id,
    name,
    amount,
    isIncome,
    date
  }
}
`;