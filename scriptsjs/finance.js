// ===== CÁLCULOS FINANCEIROS =====

function calcularDFI(valorFinanciado) {
    const taxaDFI = 0.000071;
    return valorFinanciado * taxaDFI;
}

function taxaMIP(idade) {

    if (idade <= 30) return 0.000085;
    if (idade <= 35) return 0.000108;
    if (idade <= 40) return 0.000144;
    if (idade <= 45) return 0.000244;
    if (idade <= 50) return 0.000359;
    if (idade <= 55) return 0.000645;
    if (idade <= 60) return 0.000764;
    if (idade <= 65) return 0.001296;
    if (idade <= 70) return 0.001821;
    if (idade <= 80) return 0.006155;

    return 0;
}

function calcularMIP(saldoDevedor, idade) {
    return saldoDevedor * taxaMIP(idade);
}

function calcularTaxa(rendaMensal, cotista) {

    let taxaAnual;

    if (rendaMensal <= 2160) taxaAnual = cotista ? 4.25 : 4.75;
    else if (rendaMensal <= 2850) taxaAnual = cotista ? 4.50 : 5.00;
    else if (rendaMensal <= 3200) taxaAnual = cotista ? 4.75 : 5.25;
    else if (rendaMensal <= 3500) taxaAnual = cotista ? 5.25 : 5.50;
    else if (rendaMensal <= 4000) taxaAnual = cotista ? 5.5 : 6.0;
    else if (rendaMensal <= 5000) taxaAnual = cotista ? 6.5 : 7;
    else if (rendaMensal <= 9600) taxaAnual = cotista ? 7.66 : 8.16;
    else if (rendaMensal <= 13000) taxaAnual = cotista ? 10 : 10;
    else taxaAnual = cotista ? 10.69 : 11.19;

    return (taxaAnual / 100) / 12;
}

function calcularPrazo(idadeMeses, prazoEntregaMeses) {

    if (prazoEntregaMeses < 0) prazoEntregaMeses = 0;

    const idadeMaximaMeses = 80 * 12 + 6;

    let prazoMaximo = idadeMaximaMeses - (idadeMeses + prazoEntregaMeses);

    if (prazoMaximo > 420) prazoMaximo = 420;
    if (prazoMaximo < 0) prazoMaximo = 0;

    return prazoMaximo;
}

// fórmula PRICE
function calcularParcelaPrice(V, I, n) {
    return V * ((1 + I) ** n * I) / ((1 + I) ** n - 1);
}