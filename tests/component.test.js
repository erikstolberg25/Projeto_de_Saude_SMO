function runComponentTests() {
  // Testes de componentes de formulário
  testar("COMPONENT - Formulário de login deve estar presente", () => {
    const form = document.getElementById("loginForm");
    if (!form) throw new Error("Formulário de login não encontrado");
  });

  testar("COMPONENT - Campos do formulário de login devem ser obrigatórios", () => {
    const usuario = document.getElementById("usuario");
    const senha = document.getElementById("senha");

    if (!usuario || !usuario.required) throw new Error("Campo usuário não é obrigatório");
    if (!senha || !senha.required) throw new Error("Campo senha não é obrigatório");
  });

  testar("COMPONENT - Formulário de agendamento deve ter campos necessários", () => {
    const form = document.getElementById("formAgendamento");
    if (!form) throw new Error("Formulário de agendamento não encontrado");

    const tipoConsulta = document.getElementById("tipoConsulta");
    const medico = document.getElementById("medico");
    const dataConsulta = document.getElementById("dataConsulta");
    const horaConsulta = document.getElementById("horaConsulta");

    if (!tipoConsulta || !tipoConsulta.required) throw new Error("Campo tipo de consulta não é obrigatório");
    if (!medico || !medico.required) throw new Error("Campo médico não é obrigatório");
    if (!dataConsulta || !dataConsulta.required) throw new Error("Campo data não é obrigatório");
    if (!horaConsulta || !horaConsulta.required) throw new Error("Campo hora não é obrigatório");
  });

  testar("COMPONENT - Seção de vacinas deve aparecer apenas quando selecionado", () => {
    // Simula a seleção de tipo de consulta
    const tipoConsulta = document.createElement("select");
    tipoConsulta.id = "tipoConsulta";
    document.body.appendChild(tipoConsulta);

    const vacinaOptions = document.createElement("div");
    vacinaOptions.id = "vacinaOptions";
    vacinaOptions.style.display = "none";
    document.body.appendChild(vacinaOptions);

    // Adiciona opções ao select
    const opcaoVacina = document.createElement("option");
    opcaoVacina.value = "vacina";
    opcaoVacina.textContent = "Vacinação";
    tipoConsulta.appendChild(opcaoVacina);

    // Simula a mudança de seleção
    tipoConsulta.value = "vacina";
    const event = new Event("change");
    tipoConsulta.dispatchEvent(event);

    // Verifica se a seção de vacinas está visível
    if (vacinaOptions.style.display !== "block") {
      throw new Error("Seção de vacinas não apareceu quando selecionado");
    }

    // Limpa
    document.body.removeChild(tipoConsulta);
    document.body.removeChild(vacinaOptions);
  });

  // Testes de tabelas
  testar("COMPONENT - Tabela de agendamentos deve conter colunas corretas", () => {
    const tables = document.getElementsByTagName("table");
    if (tables.length === 0) throw new Error("Nenhuma tabela encontrada");

    const primeiraTabela = tables[0];
    const headers = primeiraTabela.getElementsByTagName("th");
    const headersText = Array.from(headers).map(h => h.textContent.trim());

    const colunasEsperadas = ["Paciente", "Especialidade", "Data", "Horário", "Status"];

    if (headersText.length < colunasEsperadas.length) {
      throw new Error(`Número de colunas incorreto. Esperado: ${colunasEsperadas.length}, Obtido: ${headersText.length}`);
    }

    for (let i = 0; i < colunasEsperadas.length; i++) {
      if (!headersText.includes(colunasEsperadas[i])) {
        throw new Error(`Coluna "${colunasEsperadas[i]}" não encontrada na tabela`);
      }
    }
  });

  testar("COMPONENT - Tabela de medicamentos deve destacar estoque crítico", () => {
    const tables = document.getElementsByTagName("table");
    if (tables.length < 2) throw new Error("Tabela de medicamentos não encontrada");

    // Supondo que a segunda tabela é a de medicamentos
    const tabelaMedicamentos = tables[1];
    const linhas = tabelaMedicamentos.getElementsByTagName("tr");

    let encontrouCritico = false;
    for (let i = 0; i < linhas.length; i++) {
      if (linhas[i].classList.contains("alert-low-stock")) {
        encontrouCritico = true;
        break;
      }
    }

    if (!encontrouCritico) {
      throw new Error("Nenhum medicamento com estoque crítico destacado");
    }
  });

  // Testes de navegação
  testar("COMPONENT - Menu lateral deve conter links principais", () => {
    const nav = document.querySelector('nav[aria-label="Menu principal"]');
    if (!nav) throw new Error("Menu lateral não encontrado");

    const links = nav.getElementsByTagName("a");
    const linksText = Array.from(links).map(l => l.textContent.trim());

    const linksEsperados = ["Agendamentos", "Vacinas", "Medicamentos", "Pacientes", "Relatórios"];

    for (let i = 0; i < linksEsperados.length; i++) {
      if (!linksText.includes(linksEsperados[i])) {
        throw new Error(`Link "${linksEsperados[i]}" não encontrado no menu`);
      }
    }
  });

  testar("COMPONENT - Botão voltar deve redirecionar para dashboard", () => {
    const botoesVoltar = document.querySelectorAll('button[id="Voltar"]');
    if (botoesVoltar.length === 0) throw new Error("Nenhum botão Voltar encontrado");

    const primeiroBotao = botoesVoltar[0];
    const onClick = primeiroBotao.getAttribute("onclick");

    if (!onClick || !onClick.includes("dashboard.html")) {
      throw new Error("Botão Voltar não redireciona para dashboard");
    }
  });

  // Testes de responsividade
  testar("COMPONENT - Header deve esconder ao rolar a página", () => {
    const header = document.querySelector("header");
    if (!header) throw new Error("Header não encontrado");

    // Simula o evento de scroll
    window.scrollY = 100;
    const event = new Event("scroll");
    window.dispatchEvent(event);

    if (!header.classList.contains("hidden")) {
      throw new Error("Header não escondeu ao rolar a página");
    }

    // Volta ao normal
    window.scrollY = 0;
    window.dispatchEvent(event);
  });
}