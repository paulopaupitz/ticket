const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      window.location.href = '/src/views/pages/dashboard.html '; // Redirecionamento corrigido
    } else {
      const error = await response.json();
      alert(`Erro: ${error.message}`);
    }
  } catch (error) {
    console.error('Falha no login:', error);
  }
});