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
        if (popupSolicitacao.length > 0) {
          console.log("Elemento popupSolicitacao ENCONTRADO!");
          popupSolicitacao.css("display", "flex");
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
              $("<p>").text(`Tipo: ${solicitacao.tipo}`),
              $("<p>").text(`Data: ${solicitacao.dataSolicitacao}`),
              $("<p>").text(`Profissional Responsalvel: ${solicitacao.nomesolicitante}`),
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
      const idMaquina = $("#idMaquinaSolicitacao").val();
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
        status: "emandamento",
        status_texto: "Em andamento",
      };
  
      console.log("Dados da nova solicitação (simulando envio):", novaSolicitacao);
  
      const novoCard = $("<div>", { class: "solicitacao" }).append(
        $("<h3>", { class: "solicitacao-title" }).text(`Solicitação #${String(contadorSolicitacoes).padStart(4, "0")}`),
        $("<p>").text(`Tipo: ${tipo}`),
        $("<p>").text(`Data: ${data}`),
        $("<p>").text(`Profissional Responsalvel: ${nomeSolicitacao}`), // Usando nomeSolicitacao aqui
        $("<div>", { class: "button-status", id: "button-status_emandamento" }).append($("<h3>").text("Em andamento")),
        $("<a>", {
          href: "#",
          class: "button-vermais",
          "data-nome": nomeSolicitacao,
          "data-tipo": tipo,
          "data-data": data,
          "data-responsavel": nomeSolicitacao,
          "data-descricao": descricao,
        }).text("Ver mais")
      );
  
      listaDeSolicitacoes.append(novoCard);
      contadorSolicitacoes++;
      $("#popupSolicitacao").css("display", "none");
  
      $.ajax({
        url: "http://127.0.0.1:1880/salvarsolicitacao",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(novaSolicitacao),
        success: function (response) {
          console.log("Solicitação salva com sucesso:", response);
          $("#popupSolicitacao").css("display", "none");
          // Após o sucesso, você pode chamar buscarSolicitacoes() para recarregar a lista
        },
        error: function (error) {
          console.error("Erro ao salvar a solicitação:", error);
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