document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const tabela = document.querySelector('tbody');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const nascimento = document.getElementById('nascimento').value;
    const telefone = document.getElementById('telefone').value.trim();
    const endereco = document.getElementById('endereco').value.trim();

    if (!nome || !nascimento) {
      alert('Preencha pelo menos o nome e a data de nascimento!');
      return;
    }
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
      <td>${nome}</td>
      <td>${formatarData(nascimento)}</td>
      <td>${telefone || '-'}</td>
      <td>${endereco || '-'}</td>
    `;

    tabela.appendChild(novaLinha);

    form.reset();
  });

  function formatarData(data) {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }
});
