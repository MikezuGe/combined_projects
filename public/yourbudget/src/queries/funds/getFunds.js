export default `
query getFunds ($filter: FundFilter) {
  getFunds (filter: $filter) {
    id,
    name,
    amount,
    isIncome,
    date
  }
}
`;
