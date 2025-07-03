 /*function addResultado(desc, sucesso) {
      const li = document.createElement("li");
      li.textContent = `${sucesso ? '✅' : '❌'} ${desc}`;
      li.style.color = sucesso ? 'green' : 'red';
      document.getElementById("resultados").appendChild(li);
    }

    function carregarPaginaSimulada() {
      document.body.innerHTML += `
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>Telefone</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ana Paula</td>
              <td>15/04/1987</td>
              <td>(11) 99988-7766</td>
              <td>Rua das Flores, 123</td>
            </tr>
            <tr>
              <td>Lucas Santos</td>
              <td>10/11/1990</td>
              <td>(21) 98877-6655</td>
              <td>Avenida Central, 456</td>
            </tr>
          </tbody>
        </table>
        <form>
          <input id="nome" required>
          <input id="nascimento" type="date" required>
          <input id="telefone">
          <textarea id="endereco"></textarea>
          <button type="submit" id="Cadastrar">Cadastrar</button>
          <button type="button" id="Voltar" onclick="window.location.href='dashboard.html'">Voltar</button>
        </form>
      `;
    }

    window.onload = () => {
      carregarPaginaSimulada();

      // Testes da tabela
      const linhas = document.querySelectorAll("table tbody tr");
      addResultado("Tabela de pacientes existe", linhas.length > 0);
      addResultado("Contém 2 pacientes cadastrados", linhas.length === 2);

      // Testes do formulário
      const nomeInput = document.getElementById("nome");
      const nascimentoInput = document.getElementById("nascimento");
      const telefoneInput = document.getElementById("telefone");
      const enderecoInput = document.getElementById("endereco");

      addResultado("Campo de nome existe e é obrigatório", nomeInput && nomeInput.required);
      addResultado("Campo de nascimento existe e é obrigatório", nascimentoInput && nascimentoInput.required);
      addResultado("Campo de telefone existe", !!telefoneInput);
      addResultado("Campo de endereço existe", !!enderecoInput);

      // Teste do botão Voltar
      const voltarBtn = document.getElementById("Voltar");
      const destinoVoltar = voltarBtn?.getAttribute("onclick");
      addResultado("Botão Voltar redireciona para dashboard.html", destinoVoltar?.includes("dashboard.html"));
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
      toHaveTextContent(textoEsperado) {
        if (!valor.textContent.includes(textoEsperado)) {
          throw new Error(`Texto esperado: "${textoEsperado}", mas foi: "${valor.textContent}"`);
        }
      }
    };
  }

  // TESTES

  test("Título principal deve ser 'CliniGestão - Pacientes'", () => {
    const titulo = document.querySelector("header h1");
    expect(titulo).toBeInTheDocument();
    expect(titulo.textContent).toBe("CliniGestão - Pacientes");
  });

  test("Tabela deve conter 2 pacientes cadastrados", () => {
    const linhas = document.querySelectorAll("tbody tr");
    expect(linhas.length).toBe(2);
  });

  test("Verifica se 'Ana Paula' está na tabela", () => {
    const celulas = [...document.querySelectorAll("tbody td")];
    const encontrou = celulas.some(c => c.textContent.includes("Ana Paula"));
    if (!encontrou) throw new Error("'Ana Paula' não encontrada na tabela.");
  });

  test("Campo 'Nome Completo' do formulário é obrigatório", () => {
    const campoNome = document.getElementById("nome");
    expect(campoNome).toBeInTheDocument();
    expect(campoNome.required).toBe(true);
  });

  test("Campo 'Data de Nascimento' é obrigatório", () => {
    const campoNascimento = document.getElementById("nascimento");
    expect(campoNascimento).toBeInTheDocument();
    expect(campoNascimento.required).toBe(true);
  });

  test("Botão 'Cadastrar' existe", () => {
    const botao = document.getElementById("Cadastrar");
    expect(botao).toBeInTheDocument();
  });

  test("Textarea de endereço existe", () => {
    const endereco = document.getElementById("endereco");
    expect(endereco).toBeInTheDocument();
  });

  // EXIBE RESULTADOS
  const output = document.getElementById("testes-resultados");
  if (output) {
    output.innerHTML = resultados.map(r => `<pre>${r}</pre>`).join("");
  } else {
    console.log(resultados.join("\n"));
  }
}
