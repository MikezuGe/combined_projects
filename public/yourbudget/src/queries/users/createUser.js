export default `
mutation createUser ($input: UserInput!) {
  createUser (input: $input) {
    id
    email
    username
  }
}`;
