// Obter o token JWT do localStorage
const token = localStorage.getItem('token');

// Verificar se o token existe
if (!token) {
  // Redirecionar para a página de login
  window.location.href = '/login.html';
}

// Fazer a requisição para a API para obter o histórico de compras
fetch('/vendas', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then(response => {
    if (!response.ok) {
      throw new Error('Erro ao obter histórico de compras');
    }
    return response.json();
  })
.then(ingressos => {
    // Renderizar o template Mustache com o histórico de compras
    const template = document.getElementById('historico-template').innerHTML;
    const rendered = Mustache.render(template, { ingressos });
    document.getElementById('historico-container').innerHTML = rendered;
  })
.catch(error => {
    console.error(error);
    alert(error.message);
  });