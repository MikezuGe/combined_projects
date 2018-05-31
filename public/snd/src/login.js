import axios from 'axios';


import addNotice from './notice';


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
      addNotice(result.status);
      console.log(result);
    })
    .catch(err => {
      addNotice('Login failed');
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
      for (const input of form) {
        const inputResult = result[input.name];
        if (inputResult.result < 1) {
          input.nextSibling.textContent = inputResult.status;
        }
      }
    })
    .catch(err => {
      addNotice('Creating account failed');
    });
}
