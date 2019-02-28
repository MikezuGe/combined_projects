export default `
query login($input: LoginInput!) {
  login (input: $input) {
    token
  }
}
`;
