const authenticateToken = require('./auth.middleware');

function isAdmin(req, res, next) {
  authenticateToken(req, res, () => {
    // Verifica se o usuário autenticado é administrador
    if (!req.user || !req.user.admin) {
      return res.status(403).json({
        mensagem: "Acesso negado. Somente administradores podem acessar esta rota.",
      });
    }
    next(); // Permite o acesso se for administrador
  });
}

module.exports = isAdmin;