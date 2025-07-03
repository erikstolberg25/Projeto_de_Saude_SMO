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

  test("Título principal deve ser 'CliniGestão - Agendamentos'", () => {
    const titulo = document.querySelector("header h1");
    expect(titulo).toBeInTheDocument();
    expect(titulo.textContent).toBe("CliniGestão - Agendamentos");
  });

  test("A tabela possui 3 linhas de agendamentos", () => {
    const linhas = document.querySelectorAll("tbody tr");
    expect(linhas.length).toBe(3);
  });

  test("Verifica se o paciente 'Carla Mendes' está listado", () => {
    const celulas = [...document.querySelectorAll("tbody td")];
    const encontrou = celulas.some(celula => celula.textContent === "Carla Mendes");
    if (!encontrou) throw new Error
  });
}