$(document).ready(function () {
  const listaSolicitacoes = $("#listaSolicitacoes");
  const detalhesNome = $("#detalhesNome");
  const detalhesTipo = $("#detalhesTipo");
  const detalhesDepartamento = $("#detalhesDepartamento");
  const detalhesUrgencia = $("#detalhesUrgencia");
  const detalhesData = $("#detalhesData");
  const detalhesDescricao = $("#detalhesDescricao");
  const detalhesProfissional = $("#detalhesProfissional");
  const detalhesStatus = $("#detalhesStatus");
  const checkbox = document.getElementById('chkProfissional');


  $('.filtro-status').click(function () {
    $('.filtro-status').removeClass('active'); // remove de todos
    $(this).addClass('active'); // adiciona ao clicado
  });

  buscarSolicitacoes();
  verificarUsuario();
  esconderMenu();

  document.getElementById("nomeUsuariologin").innerHTML = localStorage.getItem("nomeUsuario");

  function buscarSolicitacoes() {
    $.ajax({
      url: "http://127.0.0.1:1880/buscarsolicitacaoeEmavaliacao",
      method: "GET",
      dataType: "json",
      success: function (data) {
        listaSolicitacoes.empty();
        console.log(data);
        $.each(data, function (index, solicitacao) {
          const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
          console.log(statusId);
          const novoCard = $("<div>", { class: "solicitacao" }).append(
            $("<span>").text(`#${solicitacao.id_solicitacao}`),
            $("<span>").text(solicitacao.tipo),
            $("<span>").text(solicitacao.departamento),
            $("<span>").text(solicitacao.data),
            $("<span>").text(solicitacao.nome),
            $("<div>", {
              class: "button-status-card",
              id: `button-status-card_${statusId}`
            }).text(solicitacao.status_solicitacao),
            $("<a>", {
              href: "#",
              class: "button-vermais",
              text: "Ver mais",
              "data-nome": solicitacao.nome,
              "data-tipo": solicitacao.tipo,
              "data-departamento": solicitacao.departamento,
              "data-urgencia": solicitacao.urgencia,
              "data-idmaquina": solicitacao.id_maquina,
              "data-data": solicitacao.data,
              "data-descricao": solicitacao.descricao,
              "data-status": solicitacao.status_solicitacao,
              "data-idsolicitacao": solicitacao.id_solicitacao,
              "data-responsavel": solicitacao.nome_responsavel
            })
          );
          

          listaSolicitacoes.append(novoCard);
        });
      },
      error: function () {
        listaSolicitacoes.html("<p>Erro ao buscar solicitações.</p>");
      }
    });
  }


  window.buscarSolicitacoesEmAvaliacao = function () {
    $.ajax({
      url: "http://127.0.0.1:1880/buscarsolicitacaoeEmavaliacao",
      method: "GET",
      dataType: "json",
      success: function (data) {
        listaSolicitacoes.empty();

        $.each(data, function (index, solicitacao) {
          const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
          console.log(statusId);
          const novoCard = $("<div>", { class: "solicitacao" }).append(
            $("<span>").text(`#${solicitacao.id_solicitacao}`),
            $("<span>").text(solicitacao.tipo),
            $("<span>").text(solicitacao.departamento),
            $("<span>").text(solicitacao.data),
            $("<span>").text(solicitacao.nome),
            $("<div>", {
              class: "button-status-card",
              id: `button-status-card_${statusId}`
            }).text(solicitacao.status_solicitacao),
            $("<a>", {
              href: "#",
              class: "button-vermais",
              text: "Ver mais",
              "data-nome": solicitacao.nome,
              "data-tipo": solicitacao.tipo,
              "data-departamento": solicitacao.departamento,
              "data-urgencia": solicitacao.urgencia,
              "data-idmaquina": solicitacao.id_maquina,
              "data-data": solicitacao.data,
              "data-descricao": solicitacao.descricao,
              "data-status": solicitacao.status_solicitacao,
              "data-idsolicitacao": solicitacao.id_solicitacao
            })
          );

          listaSolicitacoes.append(novoCard);
        });
      },
      error: function () {
        listaSolicitacoes.html("<p>Erro ao buscar solicitações.</p>");
      }
    });
  }

  window.buscarSolicitacoesEmAndamento = function () {
    $.ajax({
      url: "http://127.0.0.1:1880/buscarsolicitacaoeEmandamento",
      method: "GET",
      dataType: "json",
      success: function (data) {
        listaSolicitacoes.empty();
        console.log(data);
        $.each(data, function (index, solicitacao) {
          const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
          console.log(statusId);
          const novoCard = $("<div>", { class: "solicitacao" }).append(
            $("<span>").text(`#${solicitacao.id_solicitacao}`),
            $("<span>").text(solicitacao.tipo),
            $("<span>").text(solicitacao.departamento),
            $("<span>").text(solicitacao.data),
            $("<span>").text(solicitacao.nome),
            $("<div>", {
              class: "button-status-card",
              id: `button-status-card_${statusId}`
            }).text(solicitacao.status_solicitacao),
            $("<a>", {
              href: "#",
              class: "button-vermais",
              text: "Ver mais",
              "data-nome": solicitacao.nome,
              "data-tipo": solicitacao.tipo,
              "data-departamento": solicitacao.departamento,
              "data-urgencia": solicitacao.urgencia,
              "data-idmaquina": solicitacao.id_maquina,
              "data-data": solicitacao.data,
              "data-descricao": solicitacao.descricao,
              "data-status": solicitacao.status_solicitacao,
              "data-idsolicitacao": solicitacao.id_solicitacao,
              "data-responsavel": solicitacao.nome_responsavel
            })
          );
          
          listaSolicitacoes.append(novoCard);
        });
      },
      error: function () {
        listaSolicitacoes.html("<p>Erro ao buscar solicitações.</p>");
      }
    });
  }

  window.buscarSolicitacoesConcluido = function () {
    $.ajax({
      url: "http://127.0.0.1:1880/buscarsolicitacaoConcluido",
      method: "GET",
      dataType: "json",
      success: function (data) {
        listaSolicitacoes.empty();

        $.each(data, function (index, solicitacao) {
          const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
          console.log(statusId);
          const novoCard = $("<div>", { class: "solicitacao" }).append(
            $("<span>").text(`#${solicitacao.id_solicitacao}`),
            $("<span>").text(solicitacao.tipo),
            $("<span>").text(solicitacao.departamento),
            $("<span>").text(solicitacao.data),
            $("<span>").text(solicitacao.nome),
            $("<div>", {
              class: "button-status-card",
              id: `button-status-card_${statusId}`
            }).text(solicitacao.status_solicitacao),
            $("<a>", {
              href: "#",
              class: "button-vermais",
              text: "Ver mais",
              "data-nome": solicitacao.nome,
              "data-tipo": solicitacao.tipo,
              "data-departamento": solicitacao.departamento,
              "data-urgencia": solicitacao.urgencia,
              "data-idmaquina": solicitacao.id_maquina,
              "data-data": solicitacao.data,
              "data-descricao": solicitacao.descricao,
              "data-status": solicitacao.status_solicitacao,
              "data-idsolicitacao": solicitacao.id_solicitacao,
              "data-responsavel": solicitacao.nome_responsavel
            })
          );

          listaSolicitacoes.append(novoCard);
        });
      },
      error: function () {
        listaSolicitacoes.html("<p>Erro ao buscar solicitações.</p>");
      }
    });
  }

  window.marcarEmAndamento = function ()  {
 
  
  console.log("Entrou");

    if(checkbox.checked == true && idSolicitacaoSelecionada){
      const novaSolicitacao = {
        nome: localStorage.getItem("nomeUsuario"),
        id_solicitacao: idSolicitacaoSelecionada,
        statusAtual: statusAtual,
        mudar: true
      };

      console.log(novaSolicitacao);

    $.ajax({
      url: "http://127.0.0.1:1880/marcarEmAndamento",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(novaSolicitacao),
      success: function () {
        Swal.fire({
          title: "Sucesso!",
          text: "Solicitação marcada como Em Andamento!",
          icon: "success",
          confirmButtonText: "OK"
        })
        fecharPopupDetalhes();
        buscarSolicitacoes();
        window.location.reload();
      },
      error: function () {
        alert("Erro ao marcar como Em Andamento.");
      }
    });
    }
  
    if(checkbox.checked == false && idSolicitacaoSelecionada){
      const novaSolicitacao = {
        nome: "",
        id_solicitacao: idSolicitacaoSelecionada,
        statusAtual: statusAtual,
        mudar: false
      };  

      console.log(novaSolicitacao);

    $.ajax({
      url: "http://127.0.0.1:1880/marcarEmAndamento",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(novaSolicitacao),
      success: function () {
        alert("Solicitação marcada como Em Avaliação!");
        fecharPopupDetalhes();
        buscarSolicitacoesEmAndamento();
        
      },
      error: function () {
        alert("Erro ao marcar como Em Andamento.");
      }
    });
    }
    

}

  listaSolicitacoes.on("click", ".button-vermais", function () {
    const nome = $(this).data("nome");
    const tipo = $(this).data("tipo");
    const data = $(this).data("data");
    const departamento = $(this).data("departamento");
    const urgencia = $(this).data("urgencia");
    const descricao = $(this).data("descricao");
    const status = $(this).data("status");
    const profissional = $(this).data("responsavel");
    const id = $(this).data("idsolicitacao");
    abrirPopupDetalhes(nome, tipo, departamento, urgencia, data, descricao, status, id, profissional);
  });

  let idSolicitacaoSelecionada = null;
  let statusAtual = null;
  window.abrirPopupDetalhes = function (nome, tipo, departamento, urgencia, data, descricao, status, id, profissional) {
    const checkbox = document.getElementById('chkProfissional');
    detalhesNome.text(nome);
    detalhesTipo.text(tipo);
    detalhesDepartamento.text(departamento);
    detalhesUrgencia.text(urgencia);
    detalhesData.text(data);
    detalhesDescricao.text(descricao);
    $("#detalhesStatusContainer").text(status);
    statusAtual = status;
    idSolicitacaoSelecionada = id;
    if(status == 'Em andamento'){
      checkbox.checked = true;
      detalhesProfissional.text(profissional);
    }
    if(status == 'Em avaliacao'){
      checkbox.checked = false;
      detalhesProfissional.text("");
    }
  
    $("#popupDetalhesSolicitacao").css("display", "flex");
  };

  window.fecharPopupDetalhes = function () {
    $("#popupDetalhesSolicitacao").css("display", "none");
  };


});


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

