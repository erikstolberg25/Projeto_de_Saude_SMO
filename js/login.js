document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const usuario = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value.trim();

  // Usuários simulados
  const usuariosValidos = {
    admin: { senha: 'admin123', tipo: 'admin' },
    usuario: { senha: 'senha123', tipo: 'usuario' },
    joao:   { senha: 'usuario123', tipo: 'usuario' },
    maria:  { senha: 'usuario456', tipo: 'usuario' }
  };

  if (usuariosValidos[usuario] && usuariosValidos[usuario].senha === senha) {
    const tipo = usuariosValidos[usuario].tipo;
    sessionStorage.setItem('tipoUsuario', tipo);

    if (tipo === 'admin') {
      window.location.href = 'dashboard.html';
    } else {
      window.location.href = 'painel_usuario.html';
    }
  } else {
    const erro = document.getElementById('loginErro');
    if (erro) {
      erro.style.display = 'block';
    } else {
      alert('Usuário ou senha inválidos.');
    }
  }
});