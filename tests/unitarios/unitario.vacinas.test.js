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

  function expect(el) {
    return {
      toBeInTheDocument() {
        if (!document.body.contains(el)) {
          throw new Error("Elemento não encontrado no DOM.");
        }
      },
      toHaveText(texto) {
        if (!el.textContent.includes(texto)) {
          throw new Error(`Texto "${texto}" não encontrado.`);
        }
      }
    };
  }

  // TESTES

  test("Título principal é exibido", () => {
    const titulo = document.querySelector("header h1");
    expect(titulo).toBeInTheDocument();
    expect(titulo).toHaveText("CliniGestão - Unidades de Saúde");
  });

  test("Tabela de unidades está presente", () => {
    const tabela = document.querySelector("table");
    expect(tabela).toBeInTheDocument();
  });

  test("Cabeçalho da tabela contém colunas esperadas", () => {
    const colunas = Array.from(document.querySelectorAll("thead th")).map(th => th.textContent.trim());
    const esperado = ["Nome", "Endereço", "Contato", "Especialidade"];
    esperado.forEach(coluna => {
      if (!colunas.includes(coluna)) {
        throw new Error(`Coluna "${coluna}" não encontrada.`);
      }
    });
  });

  test("Tabela possui ao menos 2 unidades renderizadas", () => {
    const linhas = document.querySelectorAll("tbody tr");
    if (linhas.length < 2) {
      throw new Error("Menos de 2 unidades exibidas.");
    }
  });

  // EXIBIR RESULTADOS
  const divResultado = document.getElementById("testes-resultados");
  if (divResultado) {
    divResultado.innerHTML = resultados.map(r => `<pre>${r}</pre>`).join("");
  } else {
    console.log(resultados.join("\n"));
  }
}
