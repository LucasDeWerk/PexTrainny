function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
    carregarEstados();
});

async function carregarEstados() {
    try {
        const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        const estados = await response.json();

        const select = document.getElementById("estados");
        if (!select) {
            console.error("Elemento <select> não encontrado!");
            return;
        }

        select.innerHTML += estados.map(estado => `<option value="${estado.id}">${estado.nome}</option>`).join("");

        select.addEventListener("change", () => carregarCidades(select.value)); // ⬅️ Adiciona evento para carregar cidades
    } catch (error) {
        console.error("Erro ao carregar estados:", error);
    }
}

async function carregarCidades(estadoId) {
    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
        const cidades = await response.json();

        const filiais = document.querySelectorAll(".acad p");
        const imagens = document.querySelectorAll(".acad-img img");

        cidades.slice(0, 4).forEach((cidade, index) => {
            filiais[index].textContent = `Pex Trainny - ${cidade.nome}`;
            imagens[index].src = `assets/img/filial-${index + 1}.jpg`;
        });
    } catch (error) {
        console.error("Erro ao carregar cidades:", error);
    }
}

carregarEstados(); // ⬅️ Chama a função ao carregar a página


