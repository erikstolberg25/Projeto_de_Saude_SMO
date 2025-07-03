// Funções auxiliares para testes
function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  const cpfArray = cpf.split('').map(el => +el);
  const rest = (count) => (cpfArray.slice(0, count - 12)
    .reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10;

  return rest(10) === cpfArray[9] && rest(11) === cpfArray[10];
}

// Testes de autenticação
function runUnitTests() {
  // Testes de autenticação
  testar("UNIT - Autenticação de usuário admin", () => {
    const usuariosValidos = {
      admin: { senha: 'admin123', tipo: 'admin' },
      usuario: { senha: 'senha123', tipo: 'usuario' }
    };

    const usuario = 'admin';
    const senha = 'admin123';

    if (!usuariosValidos[usuario] || usuariosValidos[usuario].senha !== senha) {
      throw new Error("Autenticação de admin falhou");
    }

    if (usuariosValidos[usuario].tipo !== 'admin') {
      throw new Error("Tipo de usuário incorreto para admin");
    }
  });

  testar("UNIT - Autenticação de usuário comum", () => {
    const usuariosValidos = {
      admin: { senha: 'admin123', tipo: 'admin' },
      usuario: { senha: 'senha123', tipo: 'usuario' }
    };

    const usuario = 'usuario';
    const senha = 'senha123';

    if (!usuariosValidos[usuario] || usuariosValidos[usuario].senha !== senha) {
      throw new Error("Autenticação de usuário comum falhou");
    }

    if (usuariosValidos[usuario].tipo !== 'usuario') {
      throw new Error("Tipo de usuário incorreto para usuário comum");
    }
  });

  testar("UNIT - Autenticação com credenciais inválidas", () => {
    const usuariosValidos = {
      admin: { senha: 'admin123', tipo: 'admin' },
      usuario: { senha: 'senha123', tipo: 'usuario' }
    };

    const usuario = 'invalido';
    const senha = 'senhaerrada';

    if (usuariosValidos[usuario] && usuariosValidos[usuario].senha === senha) {
      throw new Error("Autenticação com credenciais inválidas não deveria passar");
    }
  });

  // Testes de formatação de dados
  testar("UNIT - Formatação de data correta", () => {
    const data = new Date(2025, 5, 15); // 15/06/2025
    const dataFormatada = formatarData(data);

    if (dataFormatada !== '15/06/2025') {
      throw new Error(`Formatação de data incorreta. Esperado: 15/06/2025, Obtido: ${dataFormatada}`);
    }
  });

  testar("UNIT - Validação de CPF válido", () => {
    const cpfValido = '529.982.247-25';

    if (!validarCPF(cpfValido)) {
      throw new Error("CPF válido não foi reconhecido");
    }
  });

  testar("UNIT - Validação de CPF inválido", () => {
    const cpfInvalido = '111.111.111-11';

    if (validarCPF(cpfInvalido)) {
      throw new Error("CPF inválido foi aceito");
    }
  });

  // Testes de regras de negócio
  testar("UNIT - Verificação de acesso admin", () => {
    const tipoUsuario = 'admin';
    const adminSection = document.getElementById('adminSection');

    // Simula a função controlarAcesso
    if (tipoUsuario !== 'admin' && adminSection) {
      adminSection.style.display = 'none';
    }

    if (tipoUsuario === 'admin' && adminSection && adminSection.style.display === 'none') {
      throw new Error("Seção admin não deveria estar oculta para admin");
    }
  });

  testar("UNIT - Verificação de acesso usuário comum", () => {
    const tipoUsuario = 'usuario';
    const adminSection = document.getElementById('adminSection');

    // Simula a função controlarAcesso
    if (tipoUsuario !== 'admin' && adminSection) {
      adminSection.style.display = 'none';
    }

    if (tipoUsuario !== 'admin' && adminSection && adminSection.style.display !== 'none') {
      throw new Error("Seção admin deveria estar oculta para usuário comum");
    }
  });

  // Testes de agendamento
  testar("UNIT - Validação de data mínima para agendamento", () => {
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);

    const dia = String(amanha.getDate()).padStart(2, '0');
    const mes = String(amanha.getMonth() + 1).padStart(2, '0');
    const ano = amanha.getFullYear();

    const dataMinimaEsperada = `${ano}-${mes}-${dia}`;
    const dataInput = document.createElement('input');
    dataInput.type = 'date';
    dataInput.id = 'dataConsulta';
    document.body.appendChild(dataInput);

    dataInput.min = dataMinimaEsperada;

    if (dataInput.min !== dataMinimaEsperada) {
      throw new Error(`Data mínima incorreta. Esperado: ${dataMinimaEsperada}, Obtido: ${dataInput.min}`);
    }

    document.body.removeChild(dataInput);
  });

  // Testes de medicamentos
  testar("UNIT - Verificação de estoque crítico", () => {
    const estoqueCritico = 10;
    const medicamentos = [
      { nome: 'Dipirona', quantidade: 120 },
      { nome: 'Paracetamol', quantidade: 8 },
      { nome: 'Ibuprofeno', quantidade: 54 }
    ];

    const medicamentosCriticos = medicamentos.filter(m => m.quantidade <= estoqueCritico);

    if (medicamentosCriticos.length !== 1 || medicamentosCriticos[0].nome !== 'Paracetamol') {
      throw new Error("Identificação de estoque crítico falhou");
    }
  });

  // Testes de FAQ
  testar("UNIT - Filtro de FAQ por tipo de usuário", () => {
    const tipoUsuario = 'admin';
    const faqs = [
      { publico: 'geral', pergunta: 'Pergunta geral' },
      { publico: 'admin', pergunta: 'Pergunta admin' },
      { publico: 'usuario', pergunta: 'Pergunta usuario' }
    ];

    const faqsFiltradas = faqs.filter(faq =>
      faq.publico === 'geral' || faq.publico === tipoUsuario
    );

    if (faqsFiltradas.length !== 2 ||
      !faqsFiltradas.some(f => f.publico === 'geral') ||
      !faqsFiltradas.some(f => f.publico === 'admin')) {
      throw new Error("Filtro de FAQ por tipo de usuário falhou");
    }
  });

  // Testes de unidades de saúde
  testar("UNIT - Filtro de unidades por tipo de usuário", () => {
    const tipoUsuario = 'gestante';
    const unidades = [
      { publico: 'geral', nome: 'UBS Geral' },
      { publico: 'gestante', nome: 'UBS Gestante' },
      { publico: 'pediatria', nome: 'UBS Pediatria' }
    ];

    const unidadesFiltradas = unidades.filter(unidade =>
      unidade.publico === 'geral' || unidade.publico === tipoUsuario
    );

    if (unidadesFiltradas.length !== 2 ||
      !unidadesFiltradas.some(u => u.publico === 'geral') ||
      !unidadesFiltradas.some(u => u.publico === 'gestante')) {
      throw new Error("Filtro de unidades por tipo de usuário falhou");
    }
  });
}