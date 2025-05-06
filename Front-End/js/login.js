$(document).ready(function () {
    const formlogin = $("#formLogin");


    formlogin.on("submit", function (event) {
        event.preventDefault();
        const email = $("#email").val();
        const senha = $("#password").val();

        const objectLogin = {
          email: email,
          senha: senha
        };
    
        console.log("Dados da nova solicitação (simulando envio):", objectLogin);
    
        $.ajax({
          url: "http://127.0.0.1:1880/loin",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(objectLogin),
          success: function (response) {
            console.log("Dados enviados:", objectLogin)
            Swal.fire({
              title: "Sucesso!",
              text: "Bem Vindo(a)!!",
              icon: "success",
              confirmButtonText: "OK"
            }).then((result) => {
    
            });
    
          },
          error: function (error) {
            console.error("Erro ao fazer login:", error);
            Swal.fire({
              title: "Erro!",
              text: "Houve um erro ao fazer login, tente novamente!",
              icon: "error",
              confirmButtonText: "OK"
            });
          },
        });
      });
});