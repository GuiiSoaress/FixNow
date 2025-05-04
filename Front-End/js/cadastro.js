const buttonCadastrar = $(".button-cadastrar");
const formCadastro = $(".cadastro");

buttonCadastrar.on("click", () => {
    formCadastro.on("submit", (event) => {
        event.preventDefault();
        const nome = $("#nome").val();
        const email = $("#email").val();
        const senha = $("#senha").val();

        const novoCadastro = {
            nome: nome,
            email: email,
            senha: senha
        };

        console.log("Dados do cadastro:", formCadastro);


        $.ajax({
            url: "http://127.0.0.1:1880/cadastrarUsuario",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(formCadastro),
            success: function (response) {
              console.log("Usuário cadastrado com sucesso!:", response);
              // Exibe o SweetAlert2 de sucesso
              Swal.fire({
                title: "Sucesso!",
                text: "Sua solicitação foi criada com sucesso.",
                icon: "success",
                confirmButtonText: "OK"
              }).then((result) => {
      
                if (result.isConfirmed) {
                  console.log("Sucesso!")
                }
              });
      
            },
            error: function (error) {
              console.error("Erro ao cadastrar o usuário:", error);
              Swal.fire({
                title: "Erro!",
                text: "Houve um erro ao cadastrar o usuário.",
                icon: "error",
                confirmButtonText: "OK"
              });
            },
          });
    })

})