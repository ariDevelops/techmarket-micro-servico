const formulario = document.querySelector("#formValidator");
const inputEmail = document.querySelector("#formInput");
const errorMSG = document.querySelector(".errorMsg");


formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // retira o conteudo do campo de email
    const stringVal = inputEmail.value.trim();
    // Expressão regular de teste
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;





    switch (!regex.test(stringVal)) {
        case false:
            errorMSG.textContent = "Email bem sucedido!";
            errorMSG.style.color = "green";
            break;
    
        default:
            errorMSG.textContent = "Seu formulario não pode ser enviado!";
            errorMSG.style.color = "red";
            break;
    }

})