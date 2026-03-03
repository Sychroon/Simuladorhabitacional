function abrirModal() {
    document.getElementById("modalRenda").style.display = "flex";
}

function abrirModalAvaliacao() {
    document.getElementById("modalAvaliacao").style.display = "flex";
}

function abrirModalValorVenda() {
    document.getElementById("modalValorVenda").style.display = "flex";
}

function abrirModalDataNascimento() {
    document.getElementById("modalDataNascimento").style.display = "flex";
}

function abrirModalQuantidadeCompradores() {
    document.getElementById("modalQuantidadeCompradores").style.display = "flex";
}

function abrirModalPrazoEntrega() {
    document.getElementById("modalPrazoEntrega").style.display = "flex";
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