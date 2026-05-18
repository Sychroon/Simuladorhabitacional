// ===== ELEMENTOS DOM =====

const elementos = {

    rendaMensal: document.getElementById("RendaMensal"),
    valordeAvaliacao: document.getElementById("ValordeAvaliacao"),
    valordeVenda: document.getElementById("ValordeVenda"),
    dataNascimento: document.getElementById("Idade"),
    prazoEntrega: document.getElementById("PrazoEntrega"),
    cotista: document.getElementById("cotista"),
    ncompradores: document.getElementById("NCompradores"),

    parcelaMensal: document.getElementById("ParcelaMensal"),
    taxaDeJuros: document.getElementById("TaxadeJuros"),
    prazoYM: document.getElementById("PrazoYM"),

    MIPResultado: document.getElementById("MIP"),
    DFIResultado: document.getElementById("DFI"),
    parcelMax: document.getElementById("ParcelMax"),
    porcentagemRenda: document.getElementById("PorcentagemRenda"),

    valorAvaliacaoResultado: document.getElementById("Valordeavaliacao"),
    valorVendaResultado: document.getElementById("ValordeVendaResultado"),
    valorFinanciado: document.getElementById("ValorFinanciado"),
    entrada: document.getElementById("Entrada"),
    TxAdm: document.getElementById("TaxaAdmin"),
    totalGeral: document.getElementById("TotalGeral")
};

initCurrencyInputs(elementos);
initMenu();

// ===== FUNÇÃO PRINCIPAL =====

function atualizarParcela() {

    clearErrors();

    const renda = moedaParaNumero(elementos.rendaMensal.value);
    const valordeAvaliacao = moedaParaNumero(elementos.valordeAvaliacao.value);
    const valordeVenda = moedaParaNumero(elementos.valordeVenda.value);
    const dataNascimento = elementos.dataNascimento.value;
    const prazoEntrega = parseInt(elementos.prazoEntrega.value);
    const cotista = elementos.cotista.checked;
    const ncompradores = parseInt(elementos.ncompradores.value);


    // ===== VALIDAÇÕES BÁSICAS =====

    if (isNaN(renda)) {
        showError(elementos.rendaMensal, "Informe renda válida");
        return;
    }

    if (isNaN(valordeAvaliacao)) {
        showError(elementos.valordeAvaliacao, "Informe valor de avaliação");
        return;
    }

    if (isNaN(valordeVenda)) {
        showError(elementos.valordeVenda, "Informe valor de venda");
        return;
    }

    if (!dataNascimento) {
        showError(elementos.dataNascimento, "Escolha a data de nascimento");
        return;
    }

    if (isNaN(prazoEntrega)) {
        showError(elementos.prazoEntrega, "Informe prazo de entrega");
        return;
    }


    // ===== VALIDAÇÃO CONTRA NEGATIVOS =====

    if (renda < 0) {
        showError(elementos.rendaMensal, "Renda não pode ser negativa");
        return;
    }

    if (valordeAvaliacao < 0) {
        showError(elementos.valordeAvaliacao, "Valor não pode ser negativo");
        return;
    }

    if (valordeVenda < 0) {
        showError(elementos.valordeVenda, "Valor não pode ser negativo");
        return;
    }

    if (prazoEntrega < 0) {
        showError(elementos.prazoEntrega, "Prazo não pode ser negativo");
        return;
    }

    if (ncompradores <= 0) {
        showError(elementos.ncompradores, "Número inválido");
        return;
    }

    if (prazoEntrega > 36) {
        showError(elementos.prazoEntrega, "Máx 36 meses");
        return;
    }


    // ===== VALIDAÇÃO DE IDADE =====

    const idadeA = calcularIdadeEmAnos(dataNascimento);

    if (idadeA < 18) {
        showError(elementos.dataNascimento, "Idade mínima é 18 anos");
        return;
    }


    // ===== CONTINUA O CÁLCULO =====

    const idadeM = calcularIdade(dataNascimento);

    const n = calcularPrazo(idadeM, prazoEntrega);

    const I = calcularTaxa(renda, cotista);

    let V = valordeAvaliacao * 0.8;

    const teto = renda * 0.3;

    const taxaAdministracao = 25.0;

    let dfi = calcularDFI(valordeAvaliacao);

    let mip = calcularMIP(V, idadeA);

    let parcelaBase = calcularParcelaPrice(V, I, n);

    let total = parcelaBase + dfi + mip + taxaAdministracao;

    let iter = 0;

    while ((total - teto) > 0.01 && iter < 100) {

        let parcelaPuraDisponivel =
            teto - dfi - mip - taxaAdministracao;

        V =
            parcelaPuraDisponivel /
            (((1 + I) ** n * I) / ((1 + I) ** n - 1));

        mip = calcularMIP(V, idadeA);

        parcelaBase = calcularParcelaPrice(V, I, n);

        total = parcelaBase + dfi + mip + taxaAdministracao;

        iter++;
    }

    const entrada = valordeVenda - V;

    const PORCENTAGEM_RENDA = (total / renda) * 100;

    elementos.valorAvaliacaoResultado.textContent = formatarMoedaBR(valordeAvaliacao);
    elementos.valorVendaResultado.textContent = formatarMoedaBR(valordeVenda);
    elementos.valorFinanciado.textContent = formatarMoedaBR(V);
    elementos.entrada.textContent = formatarMoedaBR(entrada);
    elementos.parcelaMensal.textContent = formatarMoedaBR(total);

    elementos.taxaDeJuros.textContent = (I * 12 * 100).toFixed(2) + "%";

    elementos.prazoYM.textContent = `${n} meses`;

    elementos.parcelMax.textContent = formatarMoedaBR(parcelaBase);

    elementos.DFIResultado.textContent = formatarMoedaBR(dfi);
    elementos.MIPResultado.textContent = formatarMoedaBR(mip);
    elementos.TxAdm.textContent = formatarMoedaBR(taxaAdministracao);
    elementos.totalGeral.textContent = formatarMoedaBR(total);

    elementos.porcentagemRenda.textContent =
        PORCENTAGEM_RENDA.toFixed(2) + "%";
}