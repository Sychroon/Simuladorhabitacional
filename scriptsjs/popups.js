function abrirModalInfoGeral() {
    document.getElementById("modalInfoGeral").style.display = "flex";
}




function abrirModalInfo() {
    document.getElementById("modalInfo").style.display = "flex";
}
function abrirModalCheck() {
    document.getElementById("modalCheck").style.display = "flex";
}


function fecharModal() {
    const modais = document.querySelectorAll(".modal");
    modais.forEach(modal => {
        modal.style.display = "none";
    });
}