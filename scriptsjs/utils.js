// ===== UTILIDADES GERAIS =====

// transforma string no formato pt-BR (1.234.567,89) em número
function moedaParaNumero(valor) {
    if (typeof valor !== 'string') return NaN;
    return parseFloat(valor.replace(/\./g, '').replace(',', '.'));
}

// formata valor monetário
function formatarMoedaBR(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// formata moeda enquanto o usuário digita
function formatarMoeda(texto) {

    let digitos = texto.replace(/\D/g, '');
    if (digitos === '') return '';

    if (digitos.length > 2) {
        digitos = digitos.replace(/^0+/, '');
        if (digitos === '') digitos = '0';
    }

    let cents;
    let inteiro;

    if (digitos.length <= 2) {
        cents = digitos.padStart(2, '0');
        inteiro = '';
    } else {
        cents = digitos.slice(-2);
        inteiro = digitos.slice(0, -2);
    }

    if (inteiro) {
        inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return (inteiro ? inteiro : '') + ',' + cents;
}

// idade em meses
function calcularIdade(dataNascimento) {

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let anos = hoje.getFullYear() - nascimento.getFullYear();
    let meses = hoje.getMonth() - nascimento.getMonth();

    let totalMeses = (anos * 12) + meses;

    if (hoje.getDate() !== nascimento.getDate()) {
        if (hoje.getDate() > nascimento.getDate()) totalMeses++;
    }

    return totalMeses;
}

// idade em anos
function calcularIdadeEmAnos(dataNascimento) {
    const totalMeses = calcularIdade(dataNascimento);
    return Math.floor(totalMeses / 12);
}


function showError(inputElement, message) {

    if (!inputElement) return;

    inputElement.classList.add("input-error");
    inputElement.value = "";
    inputElement.placeholder = message;

}

function clearErrors() {
    console.log("clearErrors foi chamada");
    const campos = document.querySelectorAll(".input-error");

    campos.forEach(function (campo) {
        campo.classList.remove("input-error");
    });

}