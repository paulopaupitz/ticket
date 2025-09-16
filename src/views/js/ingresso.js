// Verificação de autenticação
if (!localStorage.getItem('token')) {
  window.location.href = '/login.html';
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const ingressoId = new URLSearchParams(window.location.search).get('id');
    const token = localStorage.getItem('token');

    const response = await fetch(`/tickets/${ingressoId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) throw new Error('Ingresso não encontrado');

    const ingresso = await response.json();
    renderIngresso(ingresso);

  } catch (error) {
    console.error('Erro:', error);
    alert(error.message);
    window.location.href = '/dashboard';
  }
});

function renderIngresso(ingresso) {
  const container = document.getElementById('ingresso-container');
  const preco = Number(ingresso.preco) || 0;
  const quantidade = Number(ingresso.quantidade) || 0;
  const valorTotal = preco * quantidade;

  const formatCurrency = (valor) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  container.innerHTML = `
    <header class="ticket-card__header">
      <h1>Detalhes do Ingresso</h1>
      <p class="ticket-card__id">ID: ${ingresso._id}</p>
    </header>
    <dl class="ticket-card__details">
      <div class="ticket-card__row">
        <dt>Nome</dt>
        <dd>${ingresso.nome}</dd>
      </div>
      <div class="ticket-card__row">
        <dt>Preço</dt>
        <dd>${formatCurrency(preco)}</dd>
      </div>
      <div class="ticket-card__row">
        <dt>Quantidade</dt>
        <dd>${quantidade}</dd>
      </div>
      <div class="ticket-card__row ticket-card__row--total">
        <dt>Total</dt>
        <dd>${formatCurrency(valorTotal)}</dd>
      </div>
    </dl>
  `;
}
