function runComponentTests() {

  testar("COMPONENT - Verificar se o input Nome do Paciente esta recebendo valores.", () => {
    const nome = document.getElementById("nome");
    if (!nome) throw new Error("Inputs não aceitaram valores corretamente.");
  })

  testar("COMPONENT - Verificar se o input Data esta recebendo valores.", () => {
    const data = document.getElementById("data");
    if (!data) throw new Error("Inputs não aceitaram valores corretamente.");
  })

  testar("COMPONENT - Verificar se o input Horário esta recebendo valores.", () => {
    const hora = document.getElementById("hora");
    if (!hora) throw new Error("Inputs não aceitaram valores corretamente.");
  })

  testar("COMPONENT - Verificar se a seleção Especialidade existe.", () => {
    const especialidade = document.getElementById("especialidade");
    if (!especialidade) throw new Error("Seleção Especialidade não existente.");
  })

  testar("COMPONENT - Verificar se o Botão Agendar existe.", () => {
    const Agendar = document.getElementById("Agendar");
    if (!Agendar) throw new Error("Botão Agendar não existente.");
  })

  testar("COMPONENT - Verificar se o Botão Voltar existe.", () => {
    const Voltar = document.getElementById("Voltar");
    if (!Voltar) throw new Error("Botão voltar não existente.");
  })

  testar("COMPONENT - Verificar se o input Paciente esta recebendo valores.", () => {
    const paciente = document.getElementById("paciente");
    if (!paciente) throw new Error("Inputs não aceitaram valores corretamente.");
  })

  testar("COMPONENT - Verificar se o input Vacina esta recebendo valores.", () => {
    const vacina = document.getElementById("vacina");
    if (!vacina) throw new Error("Inputs não aceitaram valores corretamente.");
  })

  testar("COMPONENT - Verificar se a seleção Status existe.", () => {
    const status = document.getElementById("status");
    if (!status) throw new Error("Seleção Status não existente.");
  })

  testar("COMPONENT - Verificar se o Botão Registrar existe.", () => {
    const Registrar = document.getElementById("Registrar");
    if (!Registrar) throw new Error("Botão Registrar não existente.");
  })

  testar("COMPONENT - Verificar se o input Medicamento esta recebendo valores.", () => {
    const medicamento = document.getElementById("medicamento");
    if (!medicamento) throw new Error("Inputs não aceitaram valores corretamente.");
  })

  testar("COMPONENT - Input Quantidade deve receber valore corretamente.", () => {
    const quantidade = document.getElementById("quantidade");
    if (!quantidade) throw new Error("Inputs não aceitaram valores corretamente");
  });

  testar("COMPONENT - Verificar se o input Lote esta recebendo valores.", () => {
    const lote = document.getElementById("lote");
    if (!lote) throw new Error("Inputs não aceitaram valores corretamente.");
  })

  testar("COMPONENT - Verificar se o input Validade esta recebendo valores.", () => {
    const validade = document.getElementById("validade");
    if (!validade) throw new Error("Inputs não aceitaram valores corretamente.");
  })

  testar("COMPONENT - Verificar se o Botão Registrar Entrada existe.", () => {
    const registrarentrada = document.getElementById("registrarentrada");
    if (!registrarentrada) throw new Error("Botão Registrar Entrada não existente.");
  })

  testar("COMPONENT - Verificar se o input Data de Nascimento esta recebendo valores.", () => {
    const nascimento = document.getElementById("nome");
    if (!nascimento) throw new Error("Inputs não aceitaram valores corretamente.");
  })

  testar("COMPONENT - Verificar se o input Telefone do Paciente esta recebendo valores.", () => {
    const telefone = document.getElementById("telefone");
    if (!telefone) throw new Error("Inputs não aceitaram valores corretamente.");
  })

  testar("COMPONENT - Verificar se o input Endereço do Paciente esta recebendo valores.", () => {
    const endereco = document.getElementById("endereco");
    if (!endereco) throw new Error("Inputs não aceitaram valores corretamente.");
  })

  testar("COMPONENT - Verificar se o Botão Cadastrar existe.", () => {
    const Cadastrar = document.getElementById("Cadastrar");
    if (!Cadastrar) throw new Error("Botão Registrar Entrada não existente.");
  })

  testar("COMPONENT - Verificar se o Botão Entrar existe.", () => {
    const Entrar = document.getElementById("Entrar");
    if (!Entrar) throw new Error("Botão Registrar Entrada não existente.");
  })

  testar("COMPONENT - Verificar se o input Usuário esta recebendo valores.", () => {
    const usuario = document.getElementById("usuario");
    if (!usuario) throw new Error("Inputs não aceitaram valores corretamente.");
  })

  testar("COMPONENT - Verificar se o input Senha esta recebendo valores.", () => {
    const senha = document.getElementById("senha");
    if (!senha) throw new Error("Inputs não aceitaram valores corretamente.");
  })


}

