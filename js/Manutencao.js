$(document).ready(function () {
    const criarSolicitacaoBotao = $(".criar-solicitacao");
    const listaSolicitacoes = $(".listaSolicitacoes");
    const formNovaSolicitacao = $("#formNovaSolicitacao");
    const popupDetalhesSolicitacao = $("#popupDetalhesSolicitacao");
    const detalhesNome = $("#detalhesNome");
    const detalhesTipo = $("#detalhesTipo");
    const detalhesDepartamento = $("#detalhesDepartamento");
    const detalhesUrgencia = $("#detalhesUrgencia");
    const detalhesData = $("#detalhesData");
    const detalhesDescricao = $("#detalhesDescricao");
    const detalhesStatus = $("#detalhesStatus");
    let contadorSolicitacoes = listaSolicitacoes.find(".listaSolicitacoes").length + 1;
    
    buscarSolicitacoes();





    async function buscarSolicitacoes() {
        $.ajax({
            url: "http://127.0.0.1:1880/buscarsolicitacao",
            method: "GET",
            dataType: "json",
            success: function (data) {
                console.log("Dados das solicitações recebidos:", data);
                listaSolicitacoes.empty();
                $.each(data, function (index, solicitacao) {

                    const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
                    const novoCard = $("<div>", { class: "solicitacao" }).append(
                        $("<h3>", { class: "solicitacao-title" }).text(`ID #${solicitacao.id_solicitacao}`),
                        $("<p>").text(`Tipo: ${solicitacao.tipo}`),
                        $("<p>").text(`Departamento: ${solicitacao.departamento}`),
                        $("<p>").text(`Data: ${solicitacao.data}`),
                        $("<div>", {
                            class: "button-status-card",
                            id: `button-status-card_${statusId}`
                        }).append($("<h3>").text(solicitacao.status_solicitacao)),
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
                        }).text("Ver mais")
                    );
                    listaSolicitacoes.append(novoCard);
                    contadorSolicitacoes++;
                });
            },
            error: function (error) {
                console.error("Erro ao buscar as solicitações:", error);
                listaDeSolicitacoes.append("<p>Falha na comunicação com o banco de dados.</p>");
            },
        });
    }

}); // Fechamento correto do $(document).ready()