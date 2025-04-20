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
        document.getElementById("resultado").innerText = data.temperatura;
        document.getElementById("nome-maquina").innerText = data.nome;
        document.getElementById("identificador").innerText = data.id;
        document.getElementById("tempo").innerText = data.tempo_funcionamento;
        if(data.status != 0){
            mostra_oculta();
        }
    } catch (error) {
        console.error("Erro:", error);
        document.getElementById("resultado").innerText = "Erro";
    }
}


const intervalo = setInterval(carregarDados, 1000);

function mostra_oculta(){

    var ativa = document.getElementById("status-active");
    var inativa = document.getElementById("status-inactive");

    ativa.style.display === "block";
    inativa.style.display = "none";


}
