export default `
mutation updateFund ($id: ID!, $input: FundUpdate!) {
  updateFund (id: $id, input: $input) {
    id,
    name,
    amount,
    isIncome,
    date
  }
}
`;
