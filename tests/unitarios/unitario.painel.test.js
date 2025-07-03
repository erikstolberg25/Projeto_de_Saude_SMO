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

  function expect(elemento) {
    return {
      toBeInTheDocument() {
        if (!document.body.contains(elemento)) {
          throw new Error("Elemento não está no DOM.");
        }
      },
      toHaveText(textoEsperado) {
        if (!elemento.textContent.includes(textoEsperado)) {
          throw new Error(`Esperava encontrar o texto "${textoEsperado}"`);
        }
      },
      toHaveMinValue(min) {
        if (elemento.min !== min) {
          throw new Error(`Esperado min="${min}", mas era "${elemento.min}"`);
        }
      }
    };
  }

  // TESTES



  test("Seção de próxima consulta está presente", () => {
    const texto = document.querySelector("main").textContent;
    if (!texto.includes("Próxima consulta:")) {
      throw new Error("Texto 'Próxima consulta:' não encontrado.");
    }
  });

  test("Formulário de agendamento está presente", () => {
    const form = document.getElementById("formAgendamento");
    expect(form).toBeInTheDocument();
  });

  test("Campo 'tipoConsulta' existe", () => {
    const campo = document.getElementById("tipoConsulta");
    expect(campo).toBeInTheDocument();
  });

  test("Campo de data de consulta tem valor mínimo definido (data futura)", () => {
    const campoData = document.getElementById("dataConsulta");
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    const dia = String(amanha.getDate()).padStart(2, '0');
    const mes = String(amanha.getMonth() + 1).padStart(2, '0');
    const ano = amanha.getFullYear();
    const esperado = `${ano}-${mes}-${dia}`;
    expect(campoData).toHaveMinValue(esperado);
  });

  test("Tabela de vacinas contém pelo menos 2 registros", () => {
    const linhas = document.querySelectorAll("section:nth-of-type(2) tbody tr");
    if (linhas.length < 2) {
      throw new Error("Menos de 2 vacinas registradas.");
    }
  });

  test("Mensagens da unidade estão visíveis", () => {
    const mensagens = document.getElementById("mensagensRecebidas");
    expect(mensagens).toBeInTheDocument();
    expect(mensagens).toHaveText("UBS Central:");
  });

  test("Tabela de Unidades de Saúde foi preenchida", () => {
    const linhas = document.querySelectorAll("#unidades-tbody tr");
    if (linhas.length === 0) {
      throw new Error("Nenhuma unidade foi carregada.");
    }
  });

  test("FAQ foi carregado dinamicamente", () => {
    const faqs = document.querySelectorAll("#faq-container > div");
    if (faqs.length === 0) {
      throw new Error("Nenhuma pergunta frequente encontrada.");
    }
  });

  // EXIBIR RESULTADOS
  const saida = document.getElementById("testes-resultados");
  if (saida) {
    saida.innerHTML = resultados.map(r => `<pre>${r}</pre>`).join("");
  } else {
    console.log(resultados.join("\n"));
  }
}
