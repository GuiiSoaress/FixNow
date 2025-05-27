function verificarUsuario() {

    const tipo = localStorage.getItem('tipoUsuario');

    const pagina = window.location.pathname;

    const permissoes = {
        'home.html': ['Colaborador', 'Administrador', 'Manutencao'],
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
    window.location.href = '../index.html'; // ou a página inicial de login
}

$(document).ready(function () {
    verificarUsuario();
    esconderMenu();
    document.getElementById("nomeUsuariologin").innerHTML = localStorage.getItem("nomeUsuario");
});
