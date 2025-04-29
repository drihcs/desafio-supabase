const SUPABASE_URL = 'https://qjuevskbtrycsysyzlvv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdWV2c2tidHJ5Y3N5c3l6bHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDU2OTksImV4cCI6MjA2MTUyMTY5OX0.UQharq08WsxLrhOYdjrg0nAvfeTWpfLk9rWaGMnpxzc';



async function login(email, password) {
  const { error, user } = await supabase.auth.signIn({
    email: email,
    password: password,
  });
  if (error) {
    console.error('Erro ao fazer login:', error.message);
  } else {
    console.log('Usuário logado:', user);
  }
}


const user = supabase.auth.user();
if (!user) {
  // Redirecione para a tela de login ou mostre um aviso
  console.log('Usuário não autenticado');
} else {
  buscarParcelas();
}



async function buscarParcelas() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/parcelas?select=*,locatarios(nome_locatario)&order=data_vencimento.desc`, {
    method: 'GET',
    headers: {
      apikey: SUPABASE_KEY,
      'Content-Type': 'application/json',
    }
  });

  const parcelas = await response.json();
  mostrarParcelas(parcelas);
}

function mostrarParcelas(parcelas) {
  const container = document.getElementById('cards-container');
  container.innerHTML = ''; // Limpa os cards anteriores

  parcelas.forEach(parcela => {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const pagoClass = parcela.pago ? 'paid' : 'pending';
    const pagoStatus = parcela.pago ? 'Pago' : 'Pendente';
    
    card.innerHTML = `
      <h3>${parcela.locatarios.nome_locatario}</h3>
      <p><strong>Imóvel:</strong> ${parcela.imovel}</p>
      <p><strong>Vencimento:</strong> ${parcela.data_vencimento}</p>
      <p><strong>Valor:</strong> R$ ${parcela.valor_aluguel + parcela.valor_condominio - parcela.valor_desconto}</p>
      <p><strong>Status:</strong> <span class="${pagoClass}">${pagoStatus}</span></p>
      ${parcela.pago ? `<p><strong>Pago em:</strong> ${new Date(parcela.pago_em).toLocaleString()}</p>` : ''}
      <p><strong>Observação:</strong> ${parcela.observacao || 'Nenhuma'}</p>
    `;

    container.appendChild(card);
  });
}

// Inicializa a busca de parcelas
buscarParcelas();