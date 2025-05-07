
let criaCSV = () => {
    $.ajax({
        url: "http://127.0.0.1:1880/buscarsolicitacao",
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log("Dados das solicitações recebidos:", data);
            let csvContent = "data:text/csv;charset=utf-8,";
            const header = Object.keys(data[0]).join(",");
            csvContent += header + "\r\n";

            data.forEach(function (item) {
                const row = Object.values(item).join(",");
                csvContent += row + "\r\n";
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "solicitacoes.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        error: function (error) {
            console.error("Erro ao buscar as solicitações:", error);
        }
    });
};

function verificarUsuario() {

    const tipo = localStorage.getItem('tipoUsuario');

    const pagina = window.location.pathname;

    const permissoes = {
        'index.html': ['Colaborador', 'Administrador', 'Manutencao'],
        'solicitacoes.html': ['Colaborador', 'Administrador', 'Manutencao'],
        'monitoramento.html': ['Colaborador', 'Administrador', 'Manutencao'],
        'manutencao.html': ['Administrador', 'Manutencao']
    };

    const nomePagina = pagina.split('/').pop();

    if (!permissoes[nomePagina]?.includes(tipo)) {
        alert('Acesso negado');
        window.location.href = 'home.html'; // ou página de erro
    }
}

function esconderMenu() {
    const tipo = localStorage.getItem('tipoUsuario');

    if (tipo == 'Colaborador') {
        document.getElementById('manutencao-button').style.display = 'none';
    }

}

function logout() {
    localStorage.clear(); // ou localStorage.removeItem('usuario') se quiser apagar só um
    window.location.href = 'login.html'; // ou a página inicial de login
}

$(document).ready(function () {
    verificarUsuario();
    esconderMenu();
});