
let criaCSV = () => {
    $.ajax({
        url: "http://127.0.0.1:1880/buscarsolicitacao",
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log("Dados das solicitações recebidos:", data);
            let csvContent = "data:text/csv;charset=utf-8,";
            const header = Object.keys(data[0]).join(",");
            csvContent += header + "\r\n";

            data.forEach(function (item) {
                const row = Object.values(item).join(",");
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
        error: function (error) {
            console.error("Erro ao buscar as solicitações:", error);
        }
    });
};
