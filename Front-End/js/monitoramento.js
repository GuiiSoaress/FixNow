// Carrega as máquinas automaticamente ao abrir a página
$(document).ready(function() {
    buscarMaquinas(); // Primeira carga
    atualizarTemperaturas(); // Inicia atualização
    buscarSolicitacoesIndustriais();
});

const popupDetalhesSolicitacao = $("#popupDetalhesSolicitacao");
const detalhesNome = $("#detalhesNome");
const detalhesTipo = $("#detalhesTipo");
const detalhesDepartamento = $("#detalhesDepartamento");
const detalhesUrgencia = $("#detalhesUrgencia");
const detalhesData = $("#detalhesData");
const detalhesDescricao = $("#detalhesDescricao");
const detalhesStatus = $("#detalhesStatus");

function atualizarTemperaturas() {
    setInterval(function() {
        $.get("http://127.0.0.1:1880/buscarmaquinas", function(data) {
            data.forEach(maquina => {
                const tempElement = $(`.machine[data-id="${maquina.id}"] .temperatura`);
                const statusElement = $(`.machine[data-id="${maquina.id}"] .status p`);
                
                // Atualiza a temperatura
                tempElement.text(`${maquina.temperatura}`);
                
                // Atualiza a classe condicional da temperatura
                if (maquina.temperatura > 50) {
                    tempElement.addClass('high-temp');
                } else {
                    tempElement.removeClass('high-temp');
                }
                
                // Verifica se o status da máquina mudou e atualiza imediatamente
                const statusAtual = statusElement.text();
                const novoStatus = maquina.status;

                if (statusAtual !== novoStatus) {
                    // Atualiza o status na página
                    statusElement.text(novoStatus);

                    // Atualiza a classe do status
                    $(`.machine[data-id="${maquina.id}"] .status`).attr('class', `status ${definirClasseStatus(novoStatus)}`);
                }
            });
        });
    }, 1000); // Atualiza a cada 1 segundo
}

window.buscarMaquinas = function () {
    console.log("Iniciando requisição para buscar máquinas...");
  
    $.ajax({
        url: "http://127.0.0.1:1880/buscarmaquinas",
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log("Dados recebidos:", data);
            const container = $("#lista-maquinas");
            container.empty(); // Limpa o container

            if (!data || data.length === 0) {
                container.append("<p>Nenhuma máquina encontrada.</p>");
                return;
            }

            // Renderiza cada máquina corretamente
            data.forEach(maquina => {
                const statusClass = definirClasseStatus(maquina.status);
                const tempClass = maquina.temperatura > 50 ? 'high-temp' : '';

                const card = `
                <div class="machine" data-id="${maquina.id}">
                    <div class="identificador">ID: ${maquina.id}</div>
                    <div class="nome-maquina">${maquina.nome}</div>
                    <div class="blocks">
                        <div class="info-bloc">
                            <i class="fas fa-thermometer-half" style="color: #e74c3c;"></i>
                            <div class="temperatura ${tempClass}">${maquina.temperatura || 'N/A'}</div>
                        </div>
                        <div class="status ${statusClass}">
                            <p>${maquina.status}</p>
                        </div>
                    </div>
                </div>
                `;
                container.append(card);
            });
        },
        error: function (err) {
            console.error("Erro:", err);
            $("#lista-maquinas").html("<p>Erro ao carregar máquinas</p>");
        }
    });
};
  
function definirClasseStatus(status) {
    switch (status) {
      case "ativo":
        return "status-active";
      case "inativo":
        return "status-inactive";
      case "manutenção":
        return "status-maintenance";
      default:
        return "";
    }
}








window.buscarSolicitacoesIndustriais = function () {
    var listaDeSolicitacoes = $('#listaDeSolicitacoes');
    
    $.ajax({
        url: "http://127.0.0.1:1880/buscarsolicitacaoIndustrial",
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log("Dados das solicitações recebidos:", data);
            listaDeSolicitacoes.empty();
            
            const gridContainer = $('<div>', { class: 'solicitacoes-grid' });
            const coluna1 = $('<div>', { class: 'solicitacao-coluna' });
            const coluna2 = $('<div>', { class: 'solicitacao-coluna' });
            
            $.each(data, function (index, solicitacao) {
                const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
                const novoCard = $("<div>", { class: "bloco-solicitacao" }).append(
                    $("<h3>", { class: "solicitacao-title" }).text(`Solicitação #${solicitacao.id_solicitacao}`),
                    $("<div>", {
                        class: "button-status-card",
                        id: `button-status-card_${statusId}`
                    }).text(solicitacao.status_solicitacao),
                    $("<a>", {
                        href: "#",
                        class: "button-vermais",
                        "data-nome": solicitacao.nome,
                        "data-tipo": solicitacao.tipo,
                        "data-departamento": solicitacao.departamento,
                        "data-urgencia": solicitacao.urgencia,
                        "data-idmaquina": solicitacao.id_maquina,
                        "data-data": solicitacao.data,
                        "data-descricao": solicitacao.descricao,
                        "data-status": solicitacao.status_solicitacao
                    }).text("Ver Solicitação")
                );
                
                // Adiciona o evento de clique ao botão
                novoCard.find('.button-vermais').click(function() {
                    abrirPopupDetalhes(
                        $(this).data('nome'),
                        $(this).data('tipo'),
                        $(this).data('departamento'),
                        $(this).data('urgencia'),
                        $(this).data('data'),
                        $(this).data('descricao'),
                        $(this).data('status')
                    );
                });
                
                if (index % 2 === 0) {
                    coluna1.append(novoCard);
                } else {
                    coluna2.append(novoCard);
                }
            });
            
            gridContainer.append(coluna1, coluna2);
            listaDeSolicitacoes.append(gridContainer);
        },
        error: function (error) {
            console.error("Erro ao buscar as solicitações:", error);
        },
    });
};




window.abrirPopupDetalhes = function (nome, tipo, departamento, urgencia, data, descricao, status) {
    detalhesNome.text(nome);
    detalhesTipo.text(tipo);
    detalhesDepartamento.text(departamento);
    detalhesUrgencia.text(urgencia);
    detalhesData.text(data);
    detalhesDescricao.text(descricao);
    $("#detalhesStatusContainer ").text(status);

    $("#popupDetalhesSolicitacao").css("display", "flex");
  };

  window.fecharPopupDetalhes = function () {
    $("#popupDetalhesSolicitacao").css("display", "none");
  };