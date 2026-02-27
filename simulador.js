
const elementos = {
    rendaMensal: document.getElementById('RendaMensal'),
    valordeAvaliacao: document.getElementById('ValordeAvaliacao'),
    valordeVenda: document.getElementById('ValordeVenda'),
    dataNascimento: document.getElementById('Idade'),
    prazoEntrega: document.getElementById('PrazoEntrega'),
    cotista: document.getElementById('cotista'),
    TxAdm: document.getElementById('TaxaAdmin'),
    totalGeral: document.getElementById('TotalGeral'),

    valorAvaliacaoResultado: document.getElementById('Valordeavaliacao'),
    valorVendaResultado: document.getElementById('ValordeVendaResultado'),
    valorFinanciado: document.getElementById('ValorFinanciado'),
    entrada: document.getElementById('Entrada'),
    ncompradores: document.getElementById('NCompradores'),

    parcelaMensal: document.getElementById('ParcelaMensal'),
    taxaDeJuros: document.getElementById('TaxadeJuros'),
    prazoYM: document.getElementById('PrazoYM'),

    MIPResultado: document.getElementById('MIP'),
    DFIResultado: document.getElementById('DFI'),
    parcelMax: document.getElementById('ParcelMax'),
    porcentagemRenda: document.getElementById('PorcentagemRenda'),
};


const taxaAdministracao = 25; // R$ fixos


function moedaParaNumero(valor) {
    return parseFloat(valor.replace(/\./g, '').replace(',', '.'));
}

// Calcula idade com base na data de nascimento
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    const mesNascimento = nascimento.getMonth();
    const diaNascimento = nascimento.getDate();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--;
    }
    return idade;
}

// Calcula DFI baseado no valor financiado
function calcularDFI(valorFinanciado) {
    const taxaDFI = 0.000071; // Ajustada para bater mais próximo do simulador Caixa
    return valorFinanciado * taxaDFI;
}

// calcula taxa MIP baseada na idade do comprador
function taxaMIP(idade) {
    if (idade <= 30) return 0.000085; // O valor que você validou
    if (idade <= 35) return 0.000123;
    if (idade <= 40) return 0.000179;
    if (idade <= 45) return 0.000268;
    if (idade <= 50) return 0.000431;
    if (idade <= 55) return 0.000798;
    if (idade <= 60) return 0.001391;
    if (idade <= 65) return 0.002528;
    if (idade <= 70) return 0.004187;
    if (idade <= 80) return 0.006155;
    return 0;
}


// Calcula MIP baseado no saldo devedor e idade do comprador
function calcularMIP(saldoDevedor, idade) {
    return saldoDevedor * taxaMIP(idade);
}

// Calcula taxa mensal de juros de acordo 'com a renda mensal e se é cotista ou não
function calcularTaxa(rendaMensal, cotista) {
    let taxaAnual;
    if (rendaMensal <= 2000) taxaAnual = cotista ? 4.25 : 4.75;
    else if (rendaMensal <= 2850) taxaAnual = cotista ? 4.50 : 5.00;
    else if (rendaMensal <= 3700) taxaAnual = cotista ? 5.00 : 5.50;
    else if (rendaMensal <= 4700) taxaAnual = cotista ? 6.50 : 7.00;
    else if (rendaMensal <= 8600) taxaAnual = cotista ? 7.66 : 8.16;
    else if (rendaMensal <= 12000) taxaAnual = cotista ? 10.00 : 10.50;
    else taxaAnual = cotista ? 10.69 : 11.19;

    return (taxaAnual / 100) / 12;
}

// Calcula prazo máximo em meses considerando a idade do comprador e o prazo de entrega do imóvel
function calcularPrazo(idadeAnos, prazoEntregaMeses) {

    // Limita prazo de entrega a no máximo 36 meses
    if (prazoEntregaMeses < 0) prazoEntregaMeses = 0;

    const idadeMaximaMeses = 80 * 12; // 80 anos e 6 meses
    const idadeAtualMeses = idadeAnos * 12;

    let prazoMaximo = idadeMaximaMeses - (idadeAtualMeses + prazoEntregaMeses);

    if (prazoMaximo > 420) prazoMaximo = 420; // limite 35 anos e 6 meses
    if (prazoMaximo < 1) prazoMaximo = 1;

    return prazoMaximo;
}
// FUNÇÃO PRINCIPAL

function atualizarParcela() {

    // PEGAR VALORES DO FORMULÁRIO

    const renda = moedaParaNumero(elementos.rendaMensal.value);
    const valordeAvaliacao = moedaParaNumero(elementos.valordeAvaliacao.value);
    const valordeVenda = moedaParaNumero(elementos.valordeVenda.value);
    const dataNascimento = elementos.dataNascimento.value;
    const prazoEntrega = parseInt(elementos.prazoEntrega.value);
    const cotista = elementos.cotista.checked;
    const ncompradores = parseInt(elementos.ncompradores.value);

    if (
        isNaN(renda) ||
        isNaN(valordeAvaliacao) ||
        isNaN(valordeVenda) ||
        !dataNascimento ||
        isNaN(prazoEntrega)
    ) {
        elementos.parcelaMensal.textContent = "Preencha todos os campos";
        return;
    }


    // VALIDAÇÃO CONTRA NEGATIVOS - não faz sentido ter valores negativos para esses campos

    if (renda < 0 || valordeAvaliacao < 0 || valordeVenda < 0 || prazoEntrega < 0 || ncompradores < 0) {
        elementos.parcelaMensal.textContent = "Valores não podem ser negativos";
        return;
    }
    if (prazoEntrega > 36) {
        elementos.parcelaMensal.textContent = "Prazo de entrega não pode ser maior que 36 meses";
        return;

    }


    // IDADE E PRAZO MÁXIMO
    const idade = calcularIdade(dataNascimento);
    const n = calcularPrazo(idade, prazoEntrega);
    if (idade < 18) {
        elementos.parcelaMensal.textContent = "Data de nascimento inválida";
        return;
    }

    // TAXA DE JUROS MENSAL

    const I = calcularTaxa(renda, cotista);


    // LOOP DE APROXIMAÇÃO de mip e dfi para garantir que a parcela mensal não ultrapasse 30% da renda
    //V = valor financiado, que começa como 80% do valor de avaliação e é ajustado iterativamente
    // Configurações Iniciais (Exemplo 2026)
    let V = valordeAvaliacao * 0.8;
    const teto = renda * 0.3;
    const taxaAdministracao = 25.00; // Taxa mensal Caixa

    // DFI: Calculado uma única vez sobre o valor total do imóvel
    let dfi = calcularDFI(valordeAvaliacao);

    let mip = calcularMIP(V, idade);
    let parcelaBase = V * ((1 + I) ** n * I) / ((1 + I) ** n - 1);
    let total = parcelaBase + dfi + mip + taxaAdministracao;

    let iter = 0;
    // O loop ajusta V até que o total caiba no teto de 30% da renda
    while ((total - teto) > 0.01 && iter < 100) {
        // 1. Descobrimos quanto de "espaço" sobra para a prestação pura (sem seguros e taxas)
        let parcelaPuraDisponivel = teto - dfi - mip - taxaAdministracao;

        // 2. Aplicamos a fórmula inversa da Price para achar o novo V (Valor Presente)
        // V = Pmt / [ ( (1+i)^n * i ) / ( (1+i)^n - 1 ) ]
        V = parcelaPuraDisponivel / (((1 + I) ** n * I) / ((1 + I) ** n - 1));

        // 3. Recalculamos o MIP (única variável que depende do novo V)
        mip = calcularMIP(V, idade);

        // 4. Atualizamos o total para a próxima validação do while
        parcelaBase = V * ((1 + I) ** n * I) / ((1 + I) ** n - 1);
        total = parcelaBase + dfi + mip + taxaAdministracao;

        iter++;
    }

    const entrada = valordeVenda - V;

    let entradaFinal;

    if (entrada < 0) {
        entradaFinal = "Compra sem entrada";
    } else {
        entradaFinal = entrada;
    }

    const PORCENTAGEM_RENDA = (total / renda) * 100;



    // ATUALIZA RESULTADOS NO LADO DIREITO

    elementos.valorAvaliacaoResultado.textContent =
        valordeAvaliacao.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    elementos.valorVendaResultado.textContent =
        valordeVenda.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    elementos.valorFinanciado.textContent =
        V.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    elementos.entrada.textContent =
        entradaFinal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    elementos.parcelaMensal.textContent =
        total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    elementos.taxaDeJuros.textContent = (I * 12 * 100).toFixed(2) + "%";

    elementos.prazoYM.textContent = `${n} meses`;
    elementos.parcelMax.textContent =
        parcelaBase.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    elementos.DFIResultado.textContent =
        dfi.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    elementos.MIPResultado.textContent =
        mip.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    elementos.TxAdm.textContent =
        taxaAdministracao.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    elementos.totalGeral.textContent =
        total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    elementos.porcentagemRenda.textContent = PORCENTAGEM_RENDA.toFixed(2) + "%";
}