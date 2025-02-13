require('dotenv').config()
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const port = 3000;
const authMiddleware = require('./src/middlewares/auth.middleware');
const authRoutes = require('./src/routes/auth.routes');
const ticketsRoutes = require('./src/routes/tickets.routes');
const usersRoutes = require('./src/routes/users.routes');
const vendasRoutes = require('./src/routes/vendas.routes');
const app = express();
const connectDB = require('./src/config/db');

// Conecta ao banco de dados
connectDB();

// MIDDLEWARES
app.use(express.json());

// Configura o diretório público
app.use(express.static(path.join(__dirname, 'src/views')));


// Configurar o Mustache como template engine
app.engine('mustache', mustacheExpress());
app.set('views', __dirname + '/src/views'); // Certifique-se de que o caminho está correto
app.set('view engine', 'mustache');


// Define a rota para o formulário de registro
app.get('/register', (req, res) => {
  res.render('register', {
    titulo: 'Registro de Usuário',
    textoBotao: 'Registrar'
  });
});

// Define a rota para o formulário de login
app.get('/login', (req, res) => {
  res.render('login', {
    titulo: 'Login de Usuário',
    textoBotao: 'Entrar'
  });
});

// Rota para a página de histórico (requer autenticação que não consegui implementar)
app.get('/historico', (req, res) => {
  res.render('historico');
});

//Define a rota para a pagina de ingressos
app.get('/ingresso', (req, res) => {
  res.render('ingresso', {
    titulo: 'Detalhes do Ingresso'
  });
});



// ROUTES
app.use('/auth', authRoutes); // Adiciona a rota de autenticação
app.use('/tickets', ticketsRoutes); // Adiciona a rota de tickets
app.use('/users', usersRoutes);  // Adiciona a rota de usuários
app.use('/vendas', vendasRoutes); // Adiciona a rota de vendas


// Inicia o servidor
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
