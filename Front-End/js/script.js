document.addEventListener('DOMContentLoaded', function() {
    const userProfile = document.getElementById('userProfile');
    const logoutPopup = document.getElementById('logoutPopup');
    const nomeUsuarioLoginElement = document.getElementById("nomeUsuariologin"); 

    if (userProfile && logoutPopup && nomeUsuarioLoginElement) { 
        userProfile.addEventListener('click', function(event) {
            event.stopPropagation(); 
            if (logoutPopup.style.display === 'block') {
                logoutPopup.style.display = 'none';
            } else {
                logoutPopup.style.display = 'block';
            }
        });

        document.addEventListener('click', function(event) {
            if (!userProfile.contains(event.target) && !logoutPopup.contains(event.target)) {
                logoutPopup.style.display = 'none';
            }
        });
        const nomeUsuarioSalvo = localStorage.getItem("nomeUsuario");
        if (nomeUsuarioSalvo) {
            nomeUsuarioLoginElement.innerHTML = nomeUsuarioSalvo;
        } else {
            nomeUsuarioLoginElement.innerHTML = "Visitante"; 
        }

    } else {
        console.error("Um ou mais elementos do header (userProfile, logoutPopup, nomeUsuariologin) não foram encontrados no DOM.");
    }

    verificarUsuario();
    esconderMenu();
});


function logout() {
    alert('Você foi desconectado!'); 
    localStorage.clear(); 
    window.location.href = 'index.html'; 
}

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

    if (!tipo) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'index.html'; 
        return; 
    }

    if (!permissoes[nomePagina]?.includes(tipo)) {
        alert('Acesso negado');
        window.location.href = 'home.html'; 
    }
}

function esconderMenu() {
    const tipo = localStorage.getItem('tipoUsuario');
    const manutencaoButton = document.getElementById('manutencao-button');
    if (tipo === 'Colaborador' && manutencaoButton) {
        manutencaoButton.style.display = 'none';
    }
}