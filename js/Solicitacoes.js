$(document).ready(function() {
    const criarSolicitacaoBotao = $('.criar-solicitacao');
    const popupSolicitacao = $('#popupSolicitacao');
    const listaDeSolicitacoes = $('main');
    const formNovaSolicitacao = $('#formNovaSolicitacao');
    const popupDetalhesSolicitacao = $('#popupDetalhesSolicitacao');
    const detalhesNome = $('#detalhesNome');
    const detalhesTipo = $('#detalhesTipo');
    const detalhesData = $('#detalhesData');
    const detalhesResponsavel = $('#detalhesResponsavel');
    const detalhesDescricao = $('#detalhesDescricao');
    let contadorSolicitacoes = listaDeSolicitacoes.find('.solicitacao').length + 1;

    // Função para buscar as solicitações da API (simulada por enquanto)
    function buscarSolicitacoes() {
        $.ajax({
            url: '/api/solicitacoes', // Seu futuro endpoint no Node-RED para buscar as solicitações (GET)
            method: 'GET',
            dataType: 'json', // Esperamos receber dados JSON
            success: function(data) {
                console.log('Dados das solicitações recebidos:', data);
                // Limpar a lista de solicitações atual
                listaDeSolicitacoes.empty();
                contadorSolicitacoes = 1; // Reiniciar o contador

                // Iterar sobre os dados recebidos e criar os cards das solicitações
                $.each(data, function(index, solicitacao) {
                    const novoCard = $('<div>', { class: 'solicitacao' }).append(
                        $('<h3>', { class: 'solicitacao-title' }).text(`Solicitação #${String(contadorSolicitacoes).padStart(4, '0')}`),
                        $('<p>').text(`Tipo: ${solicitacao.tipo}`),
                        $('<p>').text(`Data: ${solicitacao.data_criacao}`),
                        $('<p>').text(`Profissional Responsalvel: ${solicitacao.responsavel}`),
                        $('<div>', { class: 'button-status', id: `button-status_${solicitacao.status}` }).append( // Assumindo que sua API retorne um campo 'status'
                            $('<h3>').text(solicitacao.status_texto || solicitacao.status) // Assumindo também um campo 'status_texto' para exibição
                        ),
                        $('<a>', {
                            href: '#',
                            class: 'button-vermais',
                            'data-nome': solicitacao.nome,
                            'data-tipo': solicitacao.tipo,
                            'data-data': solicitacao.data_criacao,
                            'data-responsavel': solicitacao.responsavel,
                            'data-descricao': solicitacao.descricao
                        }).text('Ver mais')
                    );
                    listaDeSolicitacoes.append(novoCard);
                    contadorSolicitacoes++;
                });
            },
            error: function(error) {
                console.error('Erro ao buscar as solicitações:', error);
                // Aqui você pode adicionar alguma lógica para informar o usuário sobre o erro
            }
        });
    }

    // Chamar a função para buscar as solicitações quando a página carrega
    buscarSolicitacoes();

    criarSolicitacaoBotao.on('click', function() {
        popupSolicitacao.css('display', 'flex');
    });

    window.fecharPopup = function() {
        popupSolicitacao.css('display', 'none');
        formNovaSolicitacao[0].reset();
    };

    window.abrirPopupDetalhes = function(nome, tipo, data, responsavel, descricao) {
        detalhesNome.text(nome);
        detalhesTipo.text(tipo);
        detalhesData.text(data);
        detalhesResponsavel.text(responsavel);
        detalhesDescricao.text(descricao);
        popupDetalhesSolicitacao.css('display', 'flex');
    };

    window.fecharPopupDetalhes = function() {
        popupDetalhesSolicitacao.css('display', 'none');
    };

    formNovaSolicitacao.on('submit', function(event) {
        event.preventDefault();

        const nomeSolicitacao = $('#nomeSolicitacao').val();
        const tipo = $('#tipoSolicitacao').val();
        const urgencia = $('#urgenciaSolicitacao').val();
        const idMaquina  = $('#idMaquinaSolicitacao').val();
        const departamento = $('#departamentoSolicitacao').val();
        const data = $('#dataSolicitacao').val();
        const descricao = $('#descricaoSolicitacao').val();

        const novaSolicitacao = {
            nome: nomeSolicitacao,
            tipo: tipo,
            urgencia : urgencia,
            idMaquina: idMaquina,
            departamento: departamento,
            data: data,
            descricao: descricao,
            status: 'emandamento', // Status padrão ao criar
            status_texto: 'Em andamento'
        };

        // Simulação de envio para a API (você descomentará o $.ajax real depois)
        console.log('Dados da nova solicitação (simulando envio):', novaSolicitacao);
        // Após a simulação bem-sucedida (quando a API estiver pronta, isso será no 'success' do $.ajax):

         /*
        const novoCard = $('<div>', { class: 'solicitacao' }).append(
            $('<h3>', { class: 'solicitacao-title' }).text(`Solicitação #${String(contadorSolicitacoes).padStart(4, '0')}`),
            $('<p>').text(`Tipo: ${tipo}`),
            $('<p>').text(`Data: ${data}`),
            $('<p>').text(`Profissional Responsalvel: ${responsavel}`),
            $('<div>', { class: 'button-status', id: 'button-status_emandamento' }).append(
                $('<h3>').text('Em andamento')
            ),
            $('<a>', {
                href: '#',
                class: 'button-vermais',
                'data-nome': nomeSolicitacao,
                'data-tipo': tipo,
                'data-data': data,
                'data-responsavel': responsavel,
                'data-descricao': descricao
            }).text('Ver mais')
        );

        listaDeSolicitacoes.append(novoCard);
        contadorSolicitacoes++;
        fecharPopup();
        */

       
        // Chamada real para a API (descomentar quando o Node-RED estiver pronto)
        $.ajax({
            url: 'http://127.0.0.1:1880/solicitacao',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(novaSolicitacao),
            success: function(response) {
                console.log('Solicitação salva com sucesso:', response);
                // Após o sucesso, você pode chamar buscarSolicitacoes() para recarregar a lista
            },
            error: function(error) {
                console.error('Erro ao salvar a solicitação:', error);
            }
        });
    
    });

    listaDeSolicitacoes.on('click', '.button-vermais', function() {
        const nome = $(this).data('nome');
        const tipo = $(this).data('tipo');
        const data = $(this).data('data');
        const responsavel = $(this).data('responsavel');
        const descricao = $(this).data('descricao');
        abrirPopupDetalhes(nome, tipo, data, responsavel, descricao);
    });
});



function verificarTipo() {
    const tipo = document.getElementById("tipoSolicitacao").value;
    const campoIdMaquina = document.getElementById("campoIdMaquina");

    if (tipo === "Industrial") {
      campoIdMaquina.style.display = "block";
      document.getElementById("idMaquina").setAttribute("required", "required");
    } else {
      campoIdMaquina.style.display = "none";
      document.getElementById("idMaquina").removeAttribute("required");
    }
  }