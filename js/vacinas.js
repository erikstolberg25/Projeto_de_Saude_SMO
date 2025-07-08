   document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("form-vacina");
      const tabela = document.querySelector("tbody");

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const paciente = document.getElementById("paciente").value.trim();
        const vacina = document.getElementById("vacina").value;
        const data = document.getElementById("data").value;
        const status = document.getElementById("status").value;

        if (!paciente || !vacina || !data || !status) {
          alert("Preencha todos os campos para registrar a vacina.");
          return;
        }

        const novaLinha = document.createElement("tr");

        novaLinha.innerHTML = `
          <td>${paciente}</td>
          <td>${vacina}</td>
          <td>${data.split('-').reverse().join('/')}</td>
          <td>${status}</td>
        `;

        tabela.appendChild(novaLinha);
        form.reset();
      });
    });