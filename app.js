require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./src/config/db');
const authenticateToken = require('./src/middlewares/auth.middleware');
const isAdmin = require('./src/middlewares/authenticateAdmin');

const app = express();
const port = process.env.PORT || 3000;

// 1. Conexão com o Banco
connectDB();

//Importando os arquivos de rotas 

const vendasRoutes = require('./src/routes/vendas.routes');
const ticketsRoutes = require('./src/routes/tickets.routes');
const authRoutes = require('./src/routes/auth.routes');
const usersRoutes = require('./src/routes/users.routes');

// 2. Configuração do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 3. Rotas para Páginas HTML Estáticas
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'src/views/pages/register.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'src/views/pages/login.html')));
app.get('/dashboard', authenticateToken, (req, res) => res.sendFile(path.join(__dirname, 'src/views/pages/dashboard.html')));
app.get('/ingresso', authenticateToken, (req, res) => res.sendFile(path.join(__dirname, 'src/views/pages/ingresso.html')));

// 4. Rotas da API
app.use('/auth', authRoutes);
app.use('/tickets', ticketsRoutes);
app.use('/vendas', vendasRoutes);
app.use('/users', usersRoutes);

// 5. Rotas de Admin (requer autenticação e verificação de administrador)
app.use('/admin', authenticateToken, isAdmin, require('./src/routes/admin.routes'));

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando: http://localhost:${port}`);
});