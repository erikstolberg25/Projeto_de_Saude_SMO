

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

  function expect(recebido) {
    return {
      toBe(valorEsperado) {
        if (recebido !== valorEsperado) {
          throw new Error(`Esperado: ${valorEsperado}, Recebido: ${recebido}`);
        }
      },
      toBeInTheDocument() {
        if (!document.body.contains(recebido)) {
          throw new Error('Elemento não está presente no DOM.');
        }
      },
    };
  }

  // TESTES

  test("Exibe título da página", () => {
    const titulo = document.querySelector("h1");
    expect(titulo.textContent).toBe("CliniGestão - Farmácia");
  });

  test("Tabela tem 3 linhas de medicamentos", () => {
    const linhas = document.querySelectorAll("tbody tr");
    expect(linhas.length).toBe(3);
  });

  test("Existe alerta de estoque baixo para Paracetamol", () => {
    const alerta = document.querySelector(".alert-low-stock");
    expect(alerta).toBeInTheDocument();
  });

  test("Botão 'Registrar Entrada' existe", () => {
    const botao = document.getElementById("RegistrarEntrada");
    expect(botao).toBeInTheDocument();
  });

  test("Campo de medicamento é obrigatório", () => {
    const campo = document.getElementById("medicamento");
    expect(campo.required).toBe(true);
  });

  test("Campo quantidade tem valor mínimo 1", () => {
    const campo = document.getElementById("quantidade");
    expect(campo.min).toBe("1");
  });

  // MOSTRA OS RESULTADOS NA PÁGINA
  const output = document.getElementById("testes-resultados");
  output.innerHTML = resultados.map(linha => `<pre>${linha}</pre>`).join("");
}