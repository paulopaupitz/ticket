require('dotenv').config();
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const connectDB = require('./src/config/db');
const authenticateToken = require('./src/middlewares/auth.middleware'); // Corrigido

const app = express();
const port = process.env.PORT || 3000;

// 1. Conexão com o Banco
connectDB();

// 2. Configuração Mustache para Templates Dinâmicos
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views/templates')); // Corrigido

// 3. Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views'))); // Servir toda a pasta views

// 4. Rotas para Páginas HTML Estáticas
app.get('/', (req, res) => res.redirect('/pages/login'));

app.get('/pages/:page', (req, res) => {
  const validPages = ['login', 'register', 'dashboard', 'ingresso'];
  if (validPages.includes(req.params.page)) {
    res.sendFile(path.join(__dirname, `views/pages/${req.params.page}.html`));
  } else {
    res.status(404).send('Página não encontrada');
  }
});

// 5. Rotas para Templates Mustache (Componentes)
app.get('/templates/:name', (req, res) => {
  res.render(req.params.name); // Ex: /templates/login → views/templates/login.mustache
});

// 6. Rotas da API
app.use('/auth', require('./src/routes/auth.routes'));
app.use('/tickets', require('./src/routes/tickets.routes'));
app.use('/vendas', require('./src/routes/vendas.routes'));


app.listen(port, () => {
  console.log(`Servidor rodando: http://localhost:${port}`);
});