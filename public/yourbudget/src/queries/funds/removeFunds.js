export default `
mutation removeFunds ($ids: [ID]!) {
  removeFunds (ids: $ids) {
    id
  }
}
`;