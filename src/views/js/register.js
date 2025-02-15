document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    senha: document.getElementById('senha').value
  };

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      alert('Registro bem-sucedido!');
      window.location.href = '/src/views/pages/login.html';
    } else {
      throw new Error(result.message || 'Erro no registro');
    }
  } catch (error) {
    alert(`Falha: ${error.message}`);
  }
});