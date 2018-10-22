export default `
query Funds($filter: FundFilter) {
  funds(filter: $filter) {
    id,
    name,
    amount,
    date,
    isIncome
  }
}
`;