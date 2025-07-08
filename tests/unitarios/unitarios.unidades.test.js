   function addResultado(descricao, sucesso) {
      const li = document.createElement("li");
      li.textContent = `${sucesso ? "✅" : "❌"} ${descricao}`;
      li.style.color = sucesso ? "green" : "red";
      document.getElementById("resultados").appendChild(li);
    }

    function simularRender(tipoUsuarioEsperado, unidadesEsperadas) {
      sessionStorage.setItem('tipoUsuario', tipoUsuarioEsperado);

      document.body.innerHTML += `<table><tbody id="unidades-tbody"></tbody></table>`;

      const unidades = [
        {
          nome: 'UBS Centro',
          endereco: 'Rua das Flores, 123',
          contato: '(11) 1234-5678',
          especialidade: 'Clínico Geral',
          publico: 'geral'
        },
        {
          nome: 'UBS Mãe Saudável',
          endereco: 'Av. Esperança, 222',
          contato: '(11) 2222-2222',
          especialidade: 'Ginecologia',
          publico: 'gestante'
        },
        {
          nome: 'UBS Infantil Leste',
          endereco: 'Rua Criança Feliz, 321',
          contato: '(11) 3333-3333',
          especialidade: 'Pediatria',
          publico: 'pediatria'
        },
        {
          nome: 'UBS Central',
          endereco: 'Av. Brasil, 1000',
          contato: '(11) 4444-4444',
          especialidade: 'Diversas',
          publico: 'geral'
        }
      ];

      const tipoUsuario = sessionStorage.getItem('tipoUsuario') || 'geral';
      const tbody = document.getElementById('unidades-tbody');

      unidades
        .filter(u => u.publico === 'geral' || u.publico === tipoUsuario)
        .forEach(u => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${u.nome}</td>
            <td>${u.endereco}</td>
            <td>${u.contato}</td>
            <td>${u.especialidade}</td>
          `;
          tbody.appendChild(tr);
        });

      const linhas = tbody.querySelectorAll('tr');
      addResultado(`Renderiza ${unidadesEsperadas} unidade(s) para tipo '${tipoUsuarioEsperado}'`, linhas.length === unidadesEsperadas);

      // Teste de colunas
      if (linhas.length > 0) {
        const colunas = linhas[0].querySelectorAll("td");
        addResultado(`Cada linha tem 4 colunas (nome, endereço, contato, especialidade)`, colunas.length === 4);
      }
    }

    window.onload = () => {
      simularRender("geral", 2);
      simularRender("gestante", 1);
      simularRender("pediatria", 1);
    };