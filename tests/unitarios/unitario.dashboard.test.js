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
          throw new Error(`Elemento não encontrado no DOM.`);
        }
      },
      toHaveTextContent(textoEsperado) {
        if (!valor.textContent.includes(textoEsperado)) {
          throw new Error(`Texto esperado: "${textoEsperado}", mas encontrado: "${valor.textContent}"`);
        }
      },
    };
  }

  // TESTES

  test("Título principal deve ser 'CliniGestão - Painel da Unidade'", () => {
    const titulo = document.querySelector("header h1");
    expect(titulo).toBeInTheDocument();
    expect(titulo.textContent).toBe("CliniGestão - Painel da Unidade");
  });

  test("Menu possui link para 'Agendamentos'", () => {
    const link = [...document.querySelectorAll("nav a")].find(a => a.textContent === "Agendamentos");
    expect(link).toBeInTheDocument();
  });

  test("Exibe total de agendamentos como 32", () => {
    const agendamentos = document.querySelector("section .grafico-container p strong");
    expect(agendamentos).toBeInTheDocument();
    expect(agendamentos.textContent).toBe("32");
  });


  test("Área administrativa não aparece para usuário comum", () => {
    sessionStorage.setItem("tipoUsuario", "usuario");
    const adminSection = document.getElementById("adminSection");
    if (adminSection && adminSection.style.display !== "none") {
      throw new Error("Seção administrativa visível para usuário comum.");
    }
  });

  test("Existe botão para rodar testes unitários", () => {
    const botao = document.getElementById("rodarTestesUnitBtn");
    expect(botao).toBeInTheDocument();
  });

  // EXIBE RESULTADOS NA PÁGINA
  const output = document.getElementById("testes-resultados");
  output.innerHTML = resultados.map(r => `<pre>${r}</pre>`).join("");
}
