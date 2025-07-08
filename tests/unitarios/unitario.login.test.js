 /*function addResultado(texto, sucesso) {
      const li = document.createElement("li");
      li.textContent = `${sucesso ? '✅' : '❌'} ${texto}`;
      li.style.color = sucesso ? 'green' : 'red';
      document.getElementById("resultados").appendChild(li);
    }

    function simularLogin(usuario, senha) {
      document.body.innerHTML = `
        <input id="usuario" value="${usuario}">
        <input id="senha" value="${senha}">
      `;

      let redirecionado = null;
      window.location = { href: null };
      const alertas = [];

      // mock do alert
      window.alert = (msg) => alertas.push(msg);

      // função copiada do original
      const fazerLogin = () => {
        const usuario = document.getElementById('usuario').value.trim();
        const senha = document.getElementById('senha').value.trim();

        const usuarios = {
          'admin': 'admin123',
          'joao': 'usuario123',
          'maria': 'usuario456'
        };

        if (usuarios[usuario] && usuarios[usuario] === senha) {
          const tipo = usuario === 'admin' ? 'admin' : 'usuario';
          sessionStorage.setItem('tipoUsuario', tipo);
          if (tipo === 'admin') {
            window.location.href = 'dashboard.html';
          } else {
            window.location.href = 'painel_usuario.html';
          }
        } else {
          alert('Usuário ou senha inválidos.');
        }
      };

      fazerLogin();
      return { redirecionado: window.location.href, alertas };
    }

    window.onload = () => {
      const teste1 = simularLogin('admin', 'admin123');
      addResultado("Login admin redireciona para dashboard", teste1.redirecionado === 'dashboard.html');

      const teste2 = simularLogin('joao', 'usuario123');
      addResultado("Login usuário redireciona para painel_usuario", teste2.redirecionado === 'painel_usuario.html');

      const teste3 = simularLogin('admin', 'senhaerrada');
      addResultado("Senha errada mostra alerta", teste3.alertas[0] === 'Usuário ou senha inválidos.');

      const teste4 = simularLogin('inexistente', 'qualquer');
      addResultado("Usuário inexistente mostra alerta", teste4.alertas[0] === 'Usuário ou senha inválidos.');
    };*/

    function runUnitTests() {
  const resultados = [];

  function test(descricao, fn) {
    try {
      fn();
      resultados.push(`✅ ${descricao}`);
    } catch (erro) {
      resultados.push(`❌ ${descricao}\n   ${erro.message}`);
    }
  }

  function expect(valor) {
    return {
      toBe(esperado) {
        if (valor !== esperado) {
          throw new Error(`Esperado: ${esperado}, mas recebeu: ${valor}`);
        }
      },
      toBeInTheDocument() {
        if (!document.body.contains(valor)) {
          throw new Error(`Elemento não está no DOM.`);
        }
      },
      toHavePlaceholder(textoEsperado) {
        if (!valor.placeholder || valor.placeholder !== textoEsperado) {
          throw new Error(`Esperado placeholder: "${textoEsperado}", mas foi: "${valor.placeholder}"`);
        }
      }
    };
  }

  // TESTES

  test("Título deve ser 'CliniGestão - Login'", () => {
    const titulo = document.querySelector("h2");
    expect(titulo).toBeInTheDocument();
    expect(titulo.textContent).toBe("CliniGestão - Login");
  });

  test("Campo de usuário existe e tem placeholder correto", () => {
    const campoUsuario = document.getElementById("usuario");
    expect(campoUsuario).toBeInTheDocument();
    expect(campoUsuario.placeholder).toBe("Digite seu usuário");
  });

  test("Campo de senha existe e tem placeholder correto", () => {
    const campoSenha = document.getElementById("senha");
    expect(campoSenha).toBeInTheDocument();
    expect(campoSenha.placeholder).toBe("Digite sua senha");
  });

  test("Botão de login existe e tem ID correto", () => {
    const botao = document.getElementById("fazerLogin");
    expect(botao).toBeInTheDocument();
    expect(botao.textContent).toBe("Entrar");
  });

  // EXIBE OS RESULTADOS
  const output = document.getElementById("testes-resultados");
  if (output) {
    output.innerHTML = resultados.map(r => `<pre>${r}</pre>`).join("");
  } else {
    console.log(resultados.join("\n"));
  }
}
