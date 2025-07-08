
  function runUnitTests() {
    testar("UNIT - Usuário existente admin", () => {
      if (!usuarioExiste("admin")) throw new Error("Usuário 'admin' deveria existir");
    });

    testar("UNIT - Usuário inexistente", () => {
      if (usuarioExiste("inexistente")) throw new Error("Usuário 'inexistente' não deveria existir");
    });

    testar("UNIT - Validação correta de admin", () => {
      if (!validarUsuario("admin", "admin123")) throw new Error("Admin deve validar com senha correta");
    });

    testar("UNIT - Falha de senha errada", () => {
      if (validarUsuario("admin", "senhaErrada")) throw new Error("Não deve validar senha incorreta");
    });

    testar("UNIT - Falha de usuário inexistente", () => {
      if (validarUsuario("inexistente", "qualquer")) throw new Error("Usuário inexistente não deve validar");
    });

    testar("UNIT - Tipo do admin é admin", () => {
      if (obterTipoUsuario("admin") !== "admin") throw new Error("Tipo esperado: admin");
    });

    testar("UNIT - Tipo do usuario é usuario", () => {
      if (obterTipoUsuario("joao") !== "usuario") throw new Error("Tipo esperado: usuario");
    });
  }