$(document).ready(function () {
    const criarSolicitacaoBotao = $(".criar-solicitacao");
    const listaDeSolicitacoes = $("main");
    const formNovaSolicitacao = $("#formNovaSolicitacao");
    const popupDetalhesSolicitacao = $("#popupDetalhesSolicitacao");
    const detalhesNome = $("#detalhesNome");
    const detalhesTipo = $("#detalhesTipo");
    const detalhesData = $("#detalhesData");
    const detalhesResponsavel = $("#detalhesResponsavel");
    const detalhesDescricao = $("#detalhesDescricao");
    let contadorSolicitacoes = listaDeSolicitacoes.find(".solicitacao").length + 1;
  
    criarSolicitacaoBotao.on("click", function () {
        console.log("A FUNÇÃO DE CLIQUE DO CRIAR SOLICITAÇÃO FOI EXECUTADA!");
        const popupSolicitacao = $("#popupSolicitacao");
        console.log("Elemento popupSolicitacao (dentro do clique):", popupSolicitacao);
        popupSolicitacao.css("display", "flex");
        if (popupSolicitacao.length > 0) {
          console.log("Elemento popupSolicitacao ATIVO!");
          
        } else {
          console.log("Elemento popupSolicitacao NÃO ENCONTRADO!");
        }
    });
  
    buscarSolicitacoes();
  
    async function buscarSolicitacoes() {
      $.ajax({
        url: "http://127.0.0.1:1880/buscarsolicitacao",
        method: "GET",
        dataType: "json",
        success: function (data) {
          console.log("Dados das solicitações recebidos:", data);
          listaDeSolicitacoes.empty();
          contadorSolicitacoes = 1;
          $.each(data, function (index, solicitacao) {
            const novoCard = $("<div>", { class: "solicitacao" }).append(
              $("<h3>", { class: "solicitacao-title" }).text(`Solicitação #${String(contadorSolicitacoes).padStart(4, "0")}`),
              $("<p>").text(`Solicitante: ${solicitacao.nome}`),
              $("<p>").text(`Tipo: ${solicitacao.tipo}`),
              $("<p>").text(`Departamento: ${solicitacao.departamento}`),
              $("<p>").text(`Data: ${solicitacao.data}`),
              $("<div>", { class: "button-status", id: `button-status_${solicitacao.statussolicitacao}` }).append($("<h3>").text(solicitacao.statussolicitacao)),
              $("<a>", {
                href: "#",
                class: "button-vermais",
                "data-nome": solicitacao.nomesolicitante,
                "data-tipo": solicitacao.tipo,
                "data-data": solicitacao.dataSolicitacao,
                "data-responsavel": solicitacao.nomesolicitante,
                "data-descricao": solicitacao.descricao,
              }).text("Ver mais")
            );
            listaDeSolicitacoes.append(novoCard);
            contadorSolicitacoes++;
          });
        },
        error: function (error) {
          console.error("Erro ao buscar as solicitações:", error);
        },
      });
    }
  
    window.fecharPopup = function () {
      $("#popupSolicitacao").css("display", "none");
      formNovaSolicitacao[0].reset();
    };
  
    window.abrirPopupDetalhes = function (nome, tipo, data, responsavel, descricao) {
      detalhesNome.text(nome);
      detalhesTipo.text(tipo);
      detalhesData.text(data);
      detalhesResponsavel.text(responsavel);
      detalhesDescricao.text(descricao);
      $("#popupDetalhesSolicitacao").css("display", "flex");
    };
  
    window.fecharPopupDetalhes = function () {
      $("#popupDetalhesSolicitacao").css("display", "none");
    };
  
    formNovaSolicitacao.on("submit", function (event) {
      event.preventDefault();
      const nomeSolicitacao = $("#nomeSolicitacao").val();
      const tipo = $("#tipoSolicitacao").val();
      const urgencia = $("#urgenciaSolicitacao").val();
      let idMaquina = $("#idMaquinaSolicitacao").val();
      idMaquina = idMaquina ? parseInt(idMaquina) : null;
      const departamento = $("#departamentoSolicitacao").val();
      const data = $("#dataSolicitacao").val();
      const descricao = $("#descricaoSolicitacao").val();

      const novaSolicitacao = {
        nome: nomeSolicitacao,
        tipo: tipo,
        urgencia: urgencia,
        idMaquina: idMaquina,
        departamento: departamento,
        data: data,
        descricao: descricao,
        status: "Em avaliacao",
      };
  
      console.log("Dados da nova solicitação (simulando envio):", novaSolicitacao);
  
      $.ajax({
        url: "http://127.0.0.1:1880/salvarsolicitacao",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(novaSolicitacao),
        success: function (response) {
          console.log("Solicitação salva com sucesso:", response);
          buscarSolicitacoes();
          $("#popupSolicitacao").css("display", "none");
          // Exibe o SweetAlert2 de sucesso
          Swal.fire({
            title: "Sucesso!",
            text: "Sua solicitação foi criada com sucesso.",
            icon: "success",
            confirmButtonText: "OK"
        }).then((result) => {
      
            if (result.isConfirmed) {
                buscarSolicitacoes(); 
            }
        });

        },
        error: function (error) {
          console.error("Erro ao salvar a solicitação:", error);
          Swal.fire({
            title: "Erro!",
            text: "Houve um erro ao salvar a solicitação.",
            icon: "error",
            confirmButtonText: "OK"
        });
        },
      });
    });
  
    listaDeSolicitacoes.on("click", ".button-vermais", function () {
      const nome = $(this).data("nome");
      const tipo = $(this).data("tipo");
      const data = $(this).data("data");
      const responsavel = $(this).data("responsavel");
      const descricao = $(this).data("descricao");
      abrirPopupDetalhes(nome, tipo, data, responsavel, descricao);
    }); // Fechamento correto do bloco .button-vermais
  }); // Fechamento correto do $(document).ready()
  
  function verificarTipo() {
    const tipo = document.getElementById("tipoSolicitacao").value;
    const campoIdMaquina = document.getElementById("campoIdMaquina");
  
    if (tipo === "Industrial") {
      campoIdMaquina.style.display = "block";
      document.getElementById("idMaquinaSolicitacao").setAttribute("required", "required");
    } else {
      campoIdMaquina.style.display = "none";
      document.getElementById("idMaquinaSolicitacao").removeAttribute("required");
    }
  }