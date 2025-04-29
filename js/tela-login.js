const SUPABASE_URL = 'https://qjuevskbtrycsysyzlvv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdWV2c2tidHJ5Y3N5c3l6bHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDU2OTksImV4cCI6MjA2MTUyMTY5OX0.UQharq08WsxLrhOYdjrg0nAvfeTWpfLk9rWaGMnpxzc';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const erroLogin = document.getElementById('erro-login');

  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY
    },
    body: JSON.stringify({ email, password: senha })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('user_id', data.user.id);
    window.location.href = 'dashboard.html';
  } else {
    erroLogin.textContent = 'Login inválido. Verifique seus dados.';
  }
});