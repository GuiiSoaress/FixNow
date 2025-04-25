 // Carrega as máquinas automaticamente ao abrir a página
 $(document).ready(function() {
    buscarMaquinas(); // Primeira carga
    atualizarTemperaturas(); // Inicia atualização
});


function atualizarTemperaturas() {
    setInterval(function() {
        $.get("http://127.0.0.1:1880/buscarmaquinas", function(data) {
            data.forEach(maquina => {
                const tempElement = $(`.machine[data-id="${maquina.id}"] .temperatura`);
                
                // Atualiza o valor
                tempElement.text(`${maquina.temperatura}`);
                
                // Atualiza a classe condicional
                if (maquina.temperatura > 50) {
                    tempElement.addClass('high-temp');
                } else {
                    tempElement.removeClass('high-temp');
                }
                
                // Atualiza o status (opcional)
                $(`.machine[data-id="${maquina.id}"] .status p`)
                    .text(maquina.status);
            });
        });
    }, 1000);
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
                        <div class="${definirClasseStatus(maquina.status)}">
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