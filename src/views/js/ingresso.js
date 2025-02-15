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
  container.innerHTML = `
    <h2>Detalhes do Ingresso</h2>
    <p>ID: ${ingresso._id}</p>
    <p>Nome: ${ingresso.nome}</p>
    <p>Preço: ${ingresso.preco}</p>
    <p>Quantidade: ${ingresso.quantidade}</p>
    <p>Valor Total: ${ingresso.valorTotal}</p>
  `;
}