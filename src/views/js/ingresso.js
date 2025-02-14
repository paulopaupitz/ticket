// Verificação de autenticação
if (!localStorage.getItem('token')) {
    window.location.href = '/login.html';
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const ingressoId = new URLSearchParams(window.location.search).get('id');
      const token = localStorage.getItem('token');
  
      // Endpoint corrigido para /tickets
      const response = await fetch(`/tickets/${ingressoId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (!response.ok) throw new Error('Ingresso não encontrado');
      
      const ingresso = await response.json();
      const template = document.getElementById('ingresso-template').innerHTML;
      document.getElementById('ingresso-container').innerHTML = 
        Mustache.render(template, ingresso);
  
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message);
      window.location.href = '/dashboard';
    }
  });