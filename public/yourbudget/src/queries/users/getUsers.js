export default `
query getUsers ($filters: UserFilters) {
  getUsers (filters: $filters) {
    id
    email
    username
  }
}
`;
