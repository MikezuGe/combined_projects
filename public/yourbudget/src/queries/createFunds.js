export default `
mutation createFunds ($input: FundInput!) {
  createFunds (input: $input) {
    id,
    name,
    amount,
    isIncome,
    date
  }
}`;
