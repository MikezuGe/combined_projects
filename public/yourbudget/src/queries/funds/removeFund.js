export default `
mutation removeFund ($filters: FundFilters!) {
  removeFund (filters: $filters) {
    id
  }
}
`;
