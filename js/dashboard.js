const SUPABASE_URL = 'https://qjuevskbtrycsysyzlvv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdWV2c2tidHJ5Y3N5c3l6bHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDU2OTksImV4cCI6MjA2MTUyMTY5OX0.UQharq08WsxLrhOYdjrg0nAvfeTWpfLk9rWaGMnpxzc'
const accessToken = localStorage.getItem('access_token');

// Redireciona se não estiver logado
if (!accessToken) {
  window.location.href = 'login.html';
}

async function buscarParcelas() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/parcelas?select=*,locatarios(nome_locatario,imovel)&order=data_vencimento.desc`, {
    method: 'GET',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });

  const parcelas = await response.json();
  mostrarParcelas(parcelas);
}

buscarParcelas();
