export default `
mutation removeUser ($filters: UserFilters!) {
  removeUser (filters: $filters) {
    id
    email
    username
  }
}
`;
