document.getElementById('login_form').onsubmit = login;


function login (e) {
  e.preventDefault();

  const form = e.target;
  const inputValues = {};
  for (const input of form) {
    if (input.name) {
      inputValues[input.name] = input.value;
    }
  }

}