   document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const tabela = document.querySelector('tbody');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const especialidade = document.getElementById('especialidade').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    if (!nome || !especialidade || !data || !hora) {
      alert('Preencha todos os campos!');
      return;
    }
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
      <td>${nome}</td>
      <td>${especialidade}</td>
      <td>${data.split('-').reverse().join('/')}</td>
      <td>${hora}</td>
      <td>Pendente</td>
    `;
    tabela.appendChild(novaLinha);
    form.reset();
  });
});