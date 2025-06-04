$(document).ready(function () {
  const listaSolicitacoes = $("#listaSolicitacoes");
  const detalhesNome = $("#detalhesNome");
  const detalhesTipo = $("#detalhesTipo");
  const detalhesDepartamento = $("#detalhesDepartamento");
  const detalhesUrgencia = $("#detalhesUrgencia");
  const detalhesData = $("#detalhesData");
  const detalhesDescricao = $("#detalhesDescricao");
  const detalhesProfissional = $("#detalhesProfissional");
  const detalhesStatus = $("#detalhesStatus"); // Esta variável não está sendo usada, pode remover se quiser
  const chkProfissional = document.getElementById('chkProfissional');
  const chkConcluido = document.getElementById('chkConcluido');
  const concluidoCheckboxContainer = $("#concluidoCheckboxContainer");
  const buttonExport = document.getElementById("button-export");

  // Variáveis globais para armazenar detalhes da solicitação selecionada
  let idSolicitacaoSelecionada = null;
  let statusAtual = null; // Armazena o status original da solicitação ao abrir o popup

  // Adiciona event listeners para as checkboxes
  if (chkProfissional) { // Verifica se o elemento existe antes de adicionar o listener
      chkProfissional.addEventListener('change', window.handleStatusChange);
  }
  if (chkConcluido) { // Verifica se o elemento existe antes de adicionar o listener
      chkConcluido.addEventListener('change', window.handleStatusChange);
  }


  $('.filtro-status').click(function () {
      $('.filtro-status').removeClass('active'); // remove de todos
      $(this).addClass('active'); // adiciona ao clicado
  });

  buscarSolicitacoes(); // Inicia com a busca de solicitações "Em avaliação"
  verificarUsuario();
  esconderMenu();

  document.getElementById("nomeUsuariologin").innerHTML = localStorage.getItem("nomeUsuario");

  // Funções de busca de solicitações (Mantidas como estão, assumindo que funcionam)
  function buscarSolicitacoes() {
      $.ajax({
          url: "http://127.0.0.1:1880/buscarsolicitacaoeEmavaliacao",
          method: "GET",
          dataType: "json",
          success: function (data) {
              listaSolicitacoes.empty();
              console.log("Dados de solicitações (Em Avaliação) recebidos:", data);
              $.each(data, function (index, solicitacao) {
                  const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
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
          error: function (jqXHR, textStatus, errorThrown) {
              console.error("Erro ao buscar solicitações Em Avaliação:", textStatus, errorThrown, jqXHR);
              listaSolicitacoes.html("<p>Erro ao buscar solicitações em avaliação.</p>");
          }
      });
  }

  // Funções para filtros de status (Mantidas como estão)
  window.buscarSolicitacoesEmAvaliacao = function () {
      $.ajax({
          url: "http://127.0.0.1:1880/buscarsolicitacaoeEmavaliacao",
          method: "GET",
          dataType: "json",
          success: function (data) {
              listaSolicitacoes.empty();
              console.log("Dados de solicitações (Em Avaliação) recebidos por filtro:", data);
              $.each(data, function (index, solicitacao) {
                  const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
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
          error: function (jqXHR, textStatus, errorThrown) {
              console.error("Erro ao buscar solicitações Em Avaliação por filtro:", textStatus, errorThrown, jqXHR);
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
              console.log("Dados de solicitações (Em Andamento) recebidos por filtro:", data);
              $.each(data, function (index, solicitacao) {
                  const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
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
          error: function (jqXHR, textStatus, errorThrown) {
              console.error("Erro ao buscar solicitações Em Andamento por filtro:", textStatus, errorThrown, jqXHR);
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
              console.log("Dados de solicitações (Concluído) recebidos por filtro:", data);
              $.each(data, function (index, solicitacao) {
                  const statusId = solicitacao.status_solicitacao.replace(/\s/g, "_");
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
          error: function (jqXHR, textStatus, errorThrown) {
              console.error("Erro ao buscar solicitações Concluído por filtro:", textStatus, errorThrown, jqXHR);
              listaSolicitacoes.html("<p>Erro ao buscar solicitações.</p>");
          }
      });
  }

  window.handleStatusChange = function () {
      console.log("--- handleStatusChange INICIADO ---");
      console.log("chkProfissional.checked:", chkProfissional.checked);
      console.log("chkConcluido.checked:", chkConcluido.checked);
      console.log("statusAtual (ao entrar no handleStatusChange):", statusAtual);
      console.log("idSolicitacaoSelecionada:", idSolicitacaoSelecionada);

      if (chkProfissional.checked) {
          console.log("handleStatusChange: chkProfissional marcada. Chamando marcarEmAndamento(true)");
          chkConcluido.checked = false;
          chkConcluido.disabled = false; 
          marcarEmAndamento(true);
      }
      else if (!chkProfissional.checked && statusAtual === 'Em andamento') {
          console.log("handleStatusChange: chkProfissional desmarcada E status era 'Em andamento'. Chamando marcarEmAndamento(false)");
          marcarEmAndamento(false);
          chkConcluido.checked = false;
          chkConcluido.disabled = false;
      }

      if (chkConcluido.checked && statusAtual !== 'Concluido') {
          console.log("handleStatusChange: chkConcluido marcada E status NÃO era 'Concluido'. Chamando marcarComoConcluido(true)");
          marcarComoConcluido(true); 
          chkProfissional.disabled = true;
          chkProfissional.checked = true; 
      }
      else if (!chkConcluido.checked && statusAtual === 'Concluido') {
          console.log("handleStatusChange: chkConcluido desmarcada E status era 'Concluido'. Chamando marcarComoConcluido(false)");
          marcarComoConcluido(false); 
          chkProfissional.disabled = false;
          chkProfissional.checked = false;
      }
      console.log("--- handleStatusChange FINALIZADO ---");
  };

   window.marcarComoConcluido = function (shouldMark) {
      if (!idSolicitacaoSelecionada) {
          console.error("marcarComoConcluido: ID da solicitação não selecionado.");
          Swal.fire({
              title: "Erro!",
              text: "ID da solicitação não selecionado para marcar status.",
              icon: "error",
              confirmButtonText: "OK"
          });
          return;
      }

      const novoStatus = shouldMark ? "Em avaliacao" : "Concluido" ;
      const nomeResponsavel = shouldMark ? (detalhesProfissional.text() || localStorage.getItem("nomeUsuario")) : null;

      console.log(`marcarComoConcluido: Enviando para Node-RED -> ID: ${idSolicitacaoSelecionada}, Status: '${novoStatus}', Responsável: '${nomeResponsavel}'`);

      const solicitacaoData = {
        status_solicitacao: novoStatus,
        nome_responsavel: nomeResponsavel,
        id_solicitacao: idSolicitacaoSelecionada
      };

      $.ajax({
          url: "http://127.0.0.1:1880/marcarStatusSolicitacao",
          method: "PUT",
          contentType: "application/json",
          data: JSON.stringify(solicitacaoData),
          success: function () {
              console.log(`marcarComoConcluido: Sucesso ao mudar status para ${novoStatus}`);
              Swal.fire({
                  title: "Sucesso!",
                  text: `Solicitação marcada como ${novoStatus}!`,
                  icon: "success",
                  confirmButtonText: "OK"
              });
              fecharPopupDetalhes();
              buscarSolicitacoes();
          },
          error: function (jqXHR, textStatus, errorThrown) {
              console.error(`marcarComoConcluido: Erro ao mudar status para ${novoStatus}.`, jqXHR.responseText, textStatus, errorThrown);
              Swal.fire({
                  title: "Erro!",
                  text: `Erro ao marcar como ${novoStatus}. Detalhes: ${jqXHR.responseText || errorThrown}`,
                  icon: "error",
                  confirmButtonText: "OK"
              });
          }
      });
  };


  window.marcarEmAndamento = function (shouldMark) {
      if (!idSolicitacaoSelecionada) {
          console.error("marcarEmAndamento: ID da solicitação não selecionado.");
          Swal.fire({
              title: "Erro!",
              text: "ID da solicitação não selecionado para marcar status.",
              icon: "error",
              confirmButtonText: "OK"
          });
          return;
      }

      const nomeResponsavel = shouldMark ? localStorage.getItem("nomeUsuario") : null;
      const novoStatus = shouldMark ? "Em andamento" : "Em avaliacao";

      console.log(`marcarEmAndamento: Enviando para Node-RED -> ID: ${idSolicitacaoSelecionada}, Status: '${novoStatus}', Responsável: '${nomeResponsavel}'`);

      const solicitacaoData = {
          id_solicitacao: idSolicitacaoSelecionada,
          nome_responsavel: nomeResponsavel,
          status_solicitacao: novoStatus
      };

      $.ajax({
          url: "http://127.0.0.1:1880/marcarStatusSolicitacao",
          method: "PUT",
          contentType: "application/json",
          data: JSON.stringify(solicitacaoData),
          success: function () {
              console.log(`marcarEmAndamento: Sucesso ao mudar status para ${novoStatus}`);
              Swal.fire({
                  title: "Sucesso!",
                  text: `Solicitação marcada como ${novoStatus}!`,
                  icon: "success",
                  confirmButtonText: "OK"
              });
              fecharPopupDetalhes();
              buscarSolicitacoes();
          },
          error: function (jqXHR, textStatus, errorThrown) {
              console.error(`marcarEmAndamento: Erro ao mudar status para ${novoStatus}.`, jqXHR.responseText, textStatus, errorThrown);
              Swal.fire({
                  title: "Erro!",
                  text: `Erro ao marcar como ${novoStatus}. Detalhes: ${jqXHR.responseText || errorThrown}`,
                  icon: "error",
                  confirmButtonText: "OK"
              });
          }
      });
  };



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

  window.abrirPopupDetalhes = function (nome, tipo, departamento, urgencia, data, descricao, status, id, profissional) {
      console.log("--- abrirPopupDetalhes INICIADO ---");
      console.log("Status da solicitação ao abrir:", status);
      console.log("Profissional associado:", profissional);


      detalhesNome.text(nome);
      detalhesTipo.text(tipo);
      detalhesDepartamento.text(departamento);
      detalhesUrgencia.text(urgencia);
      detalhesData.text(data);
      detalhesDescricao.text(descricao);
      $("#detalhesStatusContainer").text(status);
      statusAtual = status; 
      idSolicitacaoSelecionada = id;

      chkProfissional.checked = false;
      chkConcluido.checked = false;
      chkProfissional.disabled = false; 
      chkConcluido.disabled = false;   
      concluidoCheckboxContainer.hide(); 

      detalhesProfissional.text(""); 

      if (status === 'Em avaliacao') {
          console.log("abrirPopupDetalhes: Status 'Em avaliacao'. Configurando UI.");
      } else if (status === 'Em andamento') {
          chkProfissional.checked = true;
          detalhesProfissional.text(profissional);
          concluidoCheckboxContainer.show(); 
          console.log("abrirPopupDetalhes: Status 'Em andamento'. Configurando UI.");
      } else if (status === 'Concluido') {
          chkConcluido.checked = true; 
          detalhesProfissional.text(profissional);
          concluidoCheckboxContainer.show(); 
          chkProfissional.disabled = true;
          console.log("abrirPopupDetalhes: Status 'Concluido'. Configurando UI.");
      }

      $("#popupDetalhesSolicitacao").css("display", "flex");
      console.log("--- abrirPopupDetalhes FINALIZADO ---");
  };

  window.fecharPopupDetalhes = function () {
      $("#popupDetalhesSolicitacao").css("display", "none");
      chkProfissional.disabled = false;
      chkConcluido.disabled = false;
      console.log("Popup fechado. Checkboxes reabilitadas.");
  };

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
          window.location.href = 'home.html';
      }
  }

  function esconderMenu() {
      const tipo = localStorage.getItem('tipoUsuario');
      if (tipo === 'Colaborador') {
          document.getElementById('manutencao-button').style.display = 'none';
      }
  }

  function logout() {
      localStorage.clear();
      window.location.href = '../index.html';
  }

  buttonExport.addEventListener("click", () => {
            $.ajax({
                url: "http://127.0.0.1:1880/buscarsolicitacao",
                method: "GET",
                dataType: "json",
                success: function (data) {
                    console.log("Dados das solicitações recebidos para CSV:", data);
                    if (data.length === 0) {
                        alert("Não há dados para exportar.");
                        return;
                    }
                    let csvContent = "data:text/csv;charset=utf-8,";
                    const header = Object.keys(data[0]).join(",");
                    csvContent += header + "\r\n";

                    data.forEach(function (item) {
                        const row = Object.values(item).map(value => {
                            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                                return `"${value.replace(/"/g, '""')}"`;
                            }
                            return value;
                        }).join(",");
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
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Erro ao buscar as solicitações para CSV:", textStatus, errorThrown, jqXHR);
                    alert("Erro ao gerar CSV. Verifique o console para mais detalhes.");
                }
            });
 });
});
     