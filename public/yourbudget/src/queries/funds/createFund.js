export default `
mutation createFund ($input: FundInput!) {
  createFund (input: $input) {
    id,
    name,
    amount,
    isIncome,
    date
  }
}`;
