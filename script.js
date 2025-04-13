// script.js
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Evita el envío automático

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const captchaChecked = document.getElementById('captcha').checked;

  if (!name || !email || !message) {
    alert('Por favor completa todos los campos.');
    return;
  }

  if (!captchaChecked) {
    alert('Por favor confirma que no eres un robot.');
    return;
  }

  alert('Formulario enviado correctamente!');
  // Aquí podrías enviar los datos al backend si tuvieras uno.
  document.getElementById('contactForm').reset();
});
