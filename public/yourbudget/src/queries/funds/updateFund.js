export default `
mutation updateFund ($filters: FundFilters!, $input: FundUpdate!) {
  updateFund (filters: $filters, input: $input) {
    id,
    name,
    amount,
    isIncome,
    date
  }
}
`;
