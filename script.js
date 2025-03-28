const API_URL = "http://127.0.0.1:1880/temperatura"; 

async function carregarDados() {
    try {
        console.log("Buscando dados da API...");

        const response = await fetch(API_URL);
        console.log("Resposta recebida:", response);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dados recebidos:", data);

        // Exibir o valor na tela
        document.getElementById("resultado").innerText = data;
    } catch (error) {
        console.error("Erro:", error);
        document.getElementById("resultado").innerText = "Erro";
    }
}


function minhaFuncao() {
    console.log("Esta função está rodando...");
    carregarDados();
}
const intervalo = setInterval(minhaFuncao, 1000);