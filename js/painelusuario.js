
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    if (tipoUsuario !== 'usuario') {
      window.location.href = 'index.html';
    }
    
    
    function toggleVacinaOptions() {
      const tipoConsulta = document.getElementById('tipoConsulta');
      const vacinaOptions = document.getElementById('vacinaOptions');
      
      if (tipoConsulta.value === 'vacina') {
        vacinaOptions.style.display = 'block';
      
        document.getElementById('medico').value = 'enfermeiro_roberto';
      } else {
        vacinaOptions.style.display = 'none';
      }
    }
    

    document.addEventListener('DOMContentLoaded', function() {
      
      const dataInput = document.getElementById('dataConsulta');
      const hoje = new Date();
      const amanha = new Date(hoje);
      amanha.setDate(hoje.getDate() + 1);
      
      const dia = String(amanha.getDate()).padStart(2, '0');
      const mes = String(amanha.getMonth() + 1).padStart(2, '0');
      const ano = amanha.getFullYear();
      
      dataInput.min = `${ano}-${mes}-${dia}`;
      
     
      const formAgendamento = document.getElementById('formAgendamento');
      formAgendamento.addEventListener('submit', function(e) {
        e.preventDefault();
        
       
        const tipoConsulta = document.getElementById('tipoConsulta').value;
        const tipoAgendamentoText = document.getElementById('tipoConsulta').options[document.getElementById('tipoConsulta').selectedIndex].text;
        const medico = document.getElementById('medico').value;
        const medicoText = document.getElementById('medico').options[document.getElementById('medico').selectedIndex].text;
        const dataConsulta = document.getElementById('dataConsulta').value;
        const horaConsulta = document.getElementById('horaConsulta').value;
        
       
        const dataFormatada = new Date(dataConsulta).toLocaleDateString('pt-BR');
        
      
        let detalhesVacina = '';
        if (tipoConsulta === 'vacina') {
          const tipoVacina = document.getElementById('tipoVacina').value;
          const tipoVacinaText = document.getElementById('tipoVacina').options[document.getElementById('tipoVacina').selectedIndex].text;
          const doseVacina = document.getElementById('doseVacina').value;
          const doseVacinaText = document.getElementById('doseVacina').options[document.getElementById('doseVacina').selectedIndex].text;
          
          detalhesVacina = '<br><strong>Vacina:</strong> ' + tipoVacinaText + ' (' + doseVacinaText + ')';
        }
        
        
        const confirmacao = document.getElementById('confirmacaoAgendamento');
        const detalhes = document.getElementById('detalhesAgendamento');
        
        detalhes.innerHTML = '<strong>Tipo:</strong> ' + tipoAgendamentoText + detalhesVacina + '<br>' +
                            '<strong>Profissional:</strong> ' + medicoText + '<br>' +
                            '<strong>Data:</strong> ' + dataFormatada + ' às ' + horaConsulta;
        
        confirmacao.style.display = 'block';
        formAgendamento.reset();
      });

    
      const unidades = [
        { nome: 'UBS Centro', endereco: 'Rua das Flores, 123', contato: '(11) 1234-5678', especialidade: 'Clínico Geral' },
        { nome: 'UBS Saúde da Família', endereco: 'Av. Principal, 456', contato: '(11) 9876-5432', especialidade: 'Diversas' },
        { nome: 'UBS Vacinação', endereco: 'Rua da Saúde, 789', contato: '(11) 5555-5555', especialidade: 'Vacinação' }
      ];

      const tbody = document.getElementById('unidades-tbody');
      unidades.forEach(unidade => {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td>' + unidade.nome + '</td>' +
                       '<td>' + unidade.endereco + '</td>' +
                       '<td>' + unidade.contato + '</td>' +
                       '<td>' + unidade.especialidade + '</td>';
        tbody.appendChild(tr);
      });

     
      const faqs = [
        { pergunta: 'Como agendar uma consulta?', resposta: 'Você pode agendar consultas diretamente neste painel, na seção "Agendamentos".' },
        { pergunta: 'Preciso levar documentos para a consulta?', resposta: 'Sim, é necessário levar documento de identificação com foto e cartão SUS.' },
        { pergunta: 'Posso tomar mais de uma vacina no mesmo dia?', resposta: 'Sim, desde que não haja contraindicação específica para alguma das vacinas.' }
      ];

      const container = document.getElementById('faq-container');
      faqs.forEach(faq => {
        const item = document.createElement('div');
        item.innerHTML = '<div style="font-weight:bold;cursor:pointer;">' + faq.pergunta + '</div>' +
                         '<div style="display:none;margin-top:5px;">' + faq.resposta + '</div>';
        
        item.querySelector('div').addEventListener('click', function() {
          const resposta = this.nextElementSibling;
          resposta.style.display = resposta.style.display === 'none' ? 'block' : 'none';
        });
        
        container.appendChild(item);
      });
    });
 