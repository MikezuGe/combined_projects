export default `
query getFunds ($filters: FundFilters) {
  getFunds (filters: $filters) {
    id,
    name,
    amount,
    isIncome,
    date
  }
}
`;
