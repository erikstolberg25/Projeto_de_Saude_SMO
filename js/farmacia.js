document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const tabela = document.querySelector("tbody");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const medicamento = document.getElementById("medicamento").value.trim();
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const lote = document.getElementById("lote").value.trim();
    const validade = document.getElementById("validade").value;

    if (!medicamento || !quantidade || quantidade <= 0) {
      alert("Preencha corretamente os campos obrigatórios.");
      return;
    }

    const validadeFormatada = validade ? new Date(validade + "-01").toLocaleDateString("pt-BR", {
      month: "2-digit",
      year: "numeric"
    }) : "Não informado";

    const novaLinha = document.createElement("tr");
    if (quantidade < 10) {
      novaLinha.classList.add("alert-low-stock");
    }

    novaLinha.innerHTML = `
      <td>${medicamento}</td>
      <td>${quantidade}</td>
      <td>${lote || "Não informado"}</td>
      <td>${validadeFormatada}</td>
    `;

    tabela.appendChild(novaLinha);

    form.reset();
  });
});