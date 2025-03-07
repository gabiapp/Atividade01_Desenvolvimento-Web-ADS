const form = document.getElementById('contact-form');
e.preventDefault();
const name= docuemnt.getElementById('name').value;
const email = document.getElementById('email')
const message = document.getElementById('message').value;
console.log('nome: ${name}, E-mail${email}, mensagem: ${message}');