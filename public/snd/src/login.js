import axios from 'axios';


axios.defaults.baseURL = `${window.location.origin}/api/snd`;


document.getElementById('login_form').onsubmit = login;
document.getElementById('create_account_form').onsubmit = createAccount;


function login (e) {
  e.preventDefault();

  const form = e.target;
  const inputValues = {};
  for (const input of form) {
    if (input.name) {
      inputValues[input.name] = input.value;
    }
  }

  axios.post('/login', inputValues)
    .then(response => {
      const result = response.data;
      console.log(result);
    })
    .catch(err => {
      console.error('Login failed');
    });

}


function logout (e) {
  e.preventDefault();
}


function createAccount (e) {
  e.preventDefault();

  const form = e.target;
  const inputValues = {};
  for (const input of form) {
    if (input.name) {
      inputValues[input.name] = input.value;
    }
  }

  axios.post('/user', inputValues)
    .then(response => {
      const result = response.data;
      console.log(result);
    })
    .catch(err => {
      console.error('Login failed');
    });
}
