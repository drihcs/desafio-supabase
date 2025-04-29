document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();

  // Resetar estilos
  emailInput.style.borderColor = '#A5D6A7';
  senhaInput.style.borderColor = '#A5D6A7';

  if (!email || !senha) {
    alert('Por favor, preencha todos os campos.');

    if (!email) emailInput.style.borderColor = 'red';
    if (!senha) senhaInput.style.borderColor = 'red';

    return;
  }

  alert('Login simulado com sucesso! (não é um sistema real)');
});

// Botões sociais
document.querySelector('.facebook').addEventListener('click', function() {
  alert('Login com Facebook ainda não implementado.');
});

document.querySelector('.google').addEventListener('click', function() {
  alert('Login com Google ainda não implementado.');
});