$(document).ready(function () {
  const criarSolicitacaoBotao = $(".criar-solicitacao");
  const listaDeSolicitacoes = $("main");
  const formNovaSolicitacao = $("#formNovaSolicitacao");
  const popupDetalhesSolicitacao = $("#popupDetalhesSolicitacao");
  const detalhesNome = $("#detalhesNome");
  const detalhesTipo = $("#detalhesTipo");
  const detalhesDepartamento = $("#detalhesDepartamento");
  const detalhesUrgencia = $("#detalhesUrgencia");
  const detalhesData = $("#detalhesData");
  const detalhesDescricao = $("#detalhesDescricao");
  const detalhesStatus = $("#detalhesStatus");
  const nomeUsuario = $("#nomeUsuario");
  let contadorSolicitacoes = listaDeSolicitacoes.find(".solicitacao").length + 1;

  criarSolicitacaoBotao.on("click", function () {
    console.log("A FUNÇÃO DE CLIQUE DO CRIAR SOLICITAÇÃO FOI EXECUTADA!");
    const popupSolicitacao = $("#popupSolicitacao");
    console.log("Elemento popupSolicitacao (dentro do clique):", popupSolicitacao);
    popupSolicitacao.css("display", "flex");
  });

  buscarSolicitacoes();
  console.log("nome:" + localStorage.getItem("nomeUsuario"))
  document.getElementById("nomeUsuariologin").innerHTML = localStorage.getItem("nomeUsuario");

  async function buscarSolicitacoes() {
    $.ajax({
      url: "http://127.0.0.1:1880/buscarsolicitacao",
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log("Dados das solicitações recebidos:", data);
        listaDeSolicitacoes.empty();
        $.each(data, function (index, solicitacao) {

          const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
          const novoCard = $("<div>", { class: "solicitacao" }).append(
            $("<h3>", { class: "solicitacao-title" }).text(`Solicitação #${solicitacao.id_solicitacao}`),
            $("<p>").text(`Tipo: ${solicitacao.tipo}`),
            $("<p>").text(`Departamento: ${solicitacao.departamento}`),
            $("<p>").text(`Data: ${solicitacao.data}`),
            $("<div>", {
              class: "button-status-card",
              id: `button-status-card_${statusId}`  // Ex: "button-status-card_Em_avaliacao"
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
          listaDeSolicitacoes.append(novoCard);
          contadorSolicitacoes++;
        });
      },
      error: function (error) {
        console.error("Erro ao buscar as solicitações:", error);
        listaDeSolicitacoes.append("<p>Falha na comunicação com o banco de dados.</p>");
      },
    });
  }

  window.buscarSolicitacoesReload = function () {
    $.ajax({
      url: "http://127.0.0.1:1880/buscarsolicitacao",
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log("Dados das solicitações recebidos:", data);
        listaDeSolicitacoes.empty();
        $.each(data, function (index, solicitacao) {

          const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
          const novoCard = $("<div>", { class: "solicitacao" }).append(
            $("<h3>", { class: "solicitacao-title" }).text(`Solicitação #${solicitacao.id_solicitacao}`),
            $("<p>").text(`Tipo: ${solicitacao.tipo}`),
            $("<p>").text(`Departamento: ${solicitacao.departamento}`),
            $("<p>").text(`Data: ${solicitacao.data}`),
            $("<div>", {
              class: "button-status-card",
              id: `button-status-card_${statusId}`  // Ex: "button-status-card_Em_avaliacao"
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
          listaDeSolicitacoes.append(novoCard);
          contadorSolicitacoes++;
        });
      },
      error: function (error) {
        console.error("Erro ao buscar as solicitações:", error);
      },
    });
  }

  window.buscarSolicitacoesEmAvaliacao = function ()  {
    $.ajax({
      url: "http://127.0.0.1:1880/buscarsolicitacaoeEmavaliacao",
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log("Dados das solicitações recebidos:", data);
        listaDeSolicitacoes.empty();
        $.each(data, function (index, solicitacao) {
  
          const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
          const novoCard = $("<div>", { class: "solicitacao" }).append(
            $("<h3>", { class: "solicitacao-title" }).text(`Solicitação #${solicitacao.id_solicitacao}`),
            $("<p>").text(`Tipo: ${solicitacao.tipo}`),
            $("<p>").text(`Departamento: ${solicitacao.departamento}`),
            $("<p>").text(`Data: ${solicitacao.data}`),
            $("<div>", {
              class: "button-status-card",
              id: `button-status-card_${statusId}`  // Ex: "button-status-card_Em_avaliacao"
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
          listaDeSolicitacoes.append(novoCard);
          
        });
      },
      error: function (error) {
        console.error("Erro ao buscar as solicitações:", error);
      },
    });
  }

  window.buscarSolicitacoesEmandamento = function ()  {
    $.ajax({
      url: "http://127.0.0.1:1880/buscarsolicitacaoeEmandamento",
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log("Dados das solicitações recebidos:", data);
        listaDeSolicitacoes.empty();
        $.each(data, function (index, solicitacao) {
  
          const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
          const novoCard = $("<div>", { class: "solicitacao" }).append(
            $("<h3>", { class: "solicitacao-title" }).text(`Solicitação #${solicitacao.id_solicitacao}`),
            $("<p>").text(`Tipo: ${solicitacao.tipo}`),
            $("<p>").text(`Departamento: ${solicitacao.departamento}`),
            $("<p>").text(`Data: ${solicitacao.data}`),
            $("<div>", {
              class: "button-status-card",
              id: `button-status-card_${statusId}`  // Ex: "button-status-card_Em_avaliacao"
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
          listaDeSolicitacoes.append(novoCard);
          
        });
      },
      error: function (error) {
        console.error("Erro ao buscar as solicitações:", error);
      },
    });
  }

  window.buscarSolicitacoesConcluido = function ()  {
    $.ajax({
      url: "http://127.0.0.1:1880/buscarsolicitacaoconcluido",
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log("Dados das solicitações recebidos:", data);
        listaDeSolicitacoes.empty();
        $.each(data, function (index, solicitacao) {
  
          const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
          const novoCard = $("<div>", { class: "solicitacao" }).append(
            $("<h3>", { class: "solicitacao-title" }).text(`Solicitação #${solicitacao.id_solicitacao}`),
            $("<p>").text(`Tipo: ${solicitacao.tipo}`),
            $("<p>").text(`Departamento: ${solicitacao.departamento}`),
            $("<p>").text(`Data: ${solicitacao.data}`),
            $("<div>", {
              class: "button-status-card",
              id: `button-status-card_${statusId}`  // Ex: "button-status-card_Em_avaliacao"
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
          listaDeSolicitacoes.append(novoCard);
          
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
    const departamento = $(this).data("departamento");
    const urgencia = $(this).data("urgencia");
    const descricao = $(this).data("descricao");
    const status = $(this).data("status");
    abrirPopupDetalhes(nome, tipo, departamento, urgencia, data, descricao, status);
  }); 
}); 

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

