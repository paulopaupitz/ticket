// Obter o ID do ingresso da URL
const urlParams = new URLSearchParams(window.location.search);
const ingressoId = urlParams.get('id');

// Obter o token JWT do localStorage
const token = localStorage.getItem('token');

// Verificar se o token existe
if (!token) {
  // Redirecionar para a página de login
  window.location.href = '/login.html';
}

// Fazer a requisição para a API para obter os detalhes do ingresso
fetch(`/vendas/${ingressoId}`, {  // Mudar a rota para /vendas/:id
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then(response => {
    if (!response.ok) {
      throw new Error('Erro ao obter detalhes do ingresso');
    }
    return response.json();
  })
.then(ingresso => {
    // Renderizar o template Mustache com os detalhes do ingresso
    const template = document.getElementById('ingresso-template').innerHTML;
    const rendered = Mustache.render(template, ingresso);
    document.getElementById('ingresso-container').innerHTML = rendered;
  })
.catch(error => {
    console.error(error);
    alert(error.message);
  });