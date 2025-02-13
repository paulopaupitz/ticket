const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('Form submitted'); // Log para debug

  // Obter os valores dos campos do formulário
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  console.log('Form data:', { nome, email }); // Log para debug (não inclua a senha)

  // Criar um objeto com os dados do registro
  const registerData = { nome, email, senha };

  try {
    // Fazer a requisição de registro para a API
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    });

    console.log('Response status:', response.status); // Log para debug

    // Lidar com a resposta da API
    if (response.ok) {
      // Registro bem-sucedido
      alert('Usuário registrado com sucesso!');
      window.location.href = '/login'; // Redirecionar para a página de login
    } else {
      // Erro no registro
      const errorMessage = await response.text();
      console.error('Error message:', errorMessage); // Log para debug
      alert(`Erro ao registrar usuário: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Fetch error:', error); // Log para debug
    alert('Erro ao tentar se comunicar com o servidor');
  }
});