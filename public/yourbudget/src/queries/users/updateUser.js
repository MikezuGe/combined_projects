export default `
mutation updateUser ($filters: UserFilters!, $input: UserUpdate!) {
  updateUser (filters: $filters, input: $input) {
    id
    email
    username
  }
}
`;
