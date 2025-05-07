$(document).ready(function () {
    const formlogin = $("#formLogin");


    formlogin.on("submit", function (event) {
        event.preventDefault();
        const email = $(".userEmail").val();
        const senha = $(".password").val();

        const objectLogin = {
          email: email,
          senha: senha
        };
    
        console.log("Dados da nova solicitação (simulando envio):", objectLogin);
    
        $.ajax({
          url: "http://127.0.0.1:1880/login",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(objectLogin),
          success: function (response) {
            console.log("Dados enviados:", objectLogin)
            console.log(response);
            Swal.fire({
              title: "Sucesso!",
              text: "Bem Vindo (a)",
              icon: "success",
              confirmButtonText: "OK"
            });

            localStorage.setItem('usuario', response[0].email);
            localStorage.setItem('tipoUsuario', response[0].tipo_usuario);
            
            console.log(localStorage.getItem('usuario'));       // guihhsoaress@gmail.com
            console.log(localStorage.getItem('tipoUsuario')); 
            
            window.location.href="index.html"
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