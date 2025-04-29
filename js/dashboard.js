const SUPABASE_URL = 'https://qjuevskbtrycsysyzlvv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdWV2c2tidHJ5Y3N5c3l6bHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDU2OTksImV4cCI6MjA2MTUyMTY5OX0.UQharq08WsxLrhOYdjrg0nAvfeTWpfLk9rWaGMnpxzc';

// Verifica se o usuário tem token de acesso
const accessToken = localStorage.getItem('access_token');
if (!accessToken) {
    window.location.href = 'login.html'; // Redireciona para login se não houver token
}

async function buscarParcelas() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/parcelas?select=*,locatarios(nome_locatario,imovel)&order=data_vencimento.desc`, {
            method: 'GET',
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Falha na requisição para buscar parcelas');
        }

        const parcelas = await response.json();
        mostrarParcelas(parcelas);
    } catch (error) {
        console.error('Erro ao buscar parcelas:', error);
        alert('Erro ao carregar dados. Tente novamente mais tarde.');
    }
}

function mostrarParcelas(parcelas) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; // Limpa os cards anteriores

    parcelas.forEach(parcela => {
        const card = document.createElement('div');
        card.classList.add('card');

        const pagoClass = parcela.pago ? 'paid' : 'pending';
        const statusTexto = parcela.pago ? 'Pago' : 'Pendente';
        const total = parcela.valor_aluguel + parcela.valor_condominio - parcela.valor_desconto;

        card.innerHTML = `
            <h3>${parcela.locatarios?.nome_locatario || 'Locatário Desconhecido'}</h3>
            <p><strong>Imóvel:</strong> ${parcela.locatarios?.imovel || 'N/A'}</p>
            <p><strong>Vencimento:</strong> ${parcela.data_vencimento}</p>
            <p><strong>Valor Total:</strong> R$ ${total.toFixed(2)}</p>
            <p><strong>Status:</strong> <span class="${pagoClass}">${statusTexto}</span></p>
            ${parcela.pago ? `<p><strong>Pago em:</strong> ${new Date(parcela.pago_em).toLocaleString()}</p>` : ''}
            <p><strong>Observação:</strong> ${parcela.observacao || 'Nenhuma'}</p>
        `;

        container.appendChild(card);
    });
}

// Função de logout
function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    window.location.href = 'login.html'; // Redireciona para a página de login
}

// Chama a função para buscar as parcelas assim que a página for carregada
buscarParcelas();
