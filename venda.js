
import prompt from 'prompt-sync';
const ler = prompt();

// Lista de vendas (cada venda é um objeto)
let vendas = [];
let proximoId = 1; // Usado para gerar um ID diferente para cada venda

// 🛒 Função para registrar uma nova venda
function registrarVenda() {
    console.log("\n=== 🧾 REGISTRAR VENDA ===");

    const cliente = ler("👤 Nome do cliente: ");
    const produto = ler("🍎 Produto: ");
    const quantidade = Number(ler("⚖️ Quantidade em kg: "));
    const precoPorKg = Number(ler("💲 Preço por kg (R$): "));

    if (!cliente || !produto || isNaN(quantidade) || quantidade <= 0 || isNaN(precoPorKg) || precoPorKg <= 0) {
        console.log("❌ Dados inválidos. Tente novamente.");
        return;
    }

    const valorTotal = quantidade * precoPorKg;

    const venda = {
        id: proximoId++,
        cliente,
        produto,
        quantidade,
        precoPorKg,
        valorTotal,
        data: new Date()
    };

    vendas.push(venda);
    console.log("✅ Venda registrada com sucesso!");
}

// ❌ Função para cancelar uma venda
function cancelarVenda() {
    console.log("\n=== ❌ CANCELAR VENDA ===");
    const id = Number(ler("🔢 Digite o ID da venda a ser cancelada: "));

    const index = vendas.findIndex(v => v.id === id);

    if (index === -1) {
        console.log("⚠️ Venda não encontrada.");
        return;
    }

    vendas.splice(index, 1);
    console.log("🗑️ Venda cancelada com sucesso.");
}

// 📆 Função para listar vendas do dia atual
function listarVendasDoDia() {
    console.log("\n=== 📅 VENDAS DO DIA ===");

    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.getMonth();
    const ano = hoje.getFullYear();

    let total = 0;
    let encontrou = false;

    for (const venda of vendas) {
        const data = venda.data;
        if (data.getDate() === dia && data.getMonth() === mes && data.getFullYear() === ano) {
            console.log(`🧾 ID: ${venda.id} | 👤 Cliente: ${venda.cliente} | 🍌 Produto: ${venda.produto} | ⚖️ Quantidade: ${venda.quantidade}kg | 💰 Valor: R$${venda.valorTotal.toFixed(2)}`);
            total += venda.valorTotal;
            encontrou = true;
        }
    }

    if (!encontrou) {
        console.log("🛑 Nenhuma venda registrada hoje.");
    } else {
        console.log(`📊 Total vendido hoje: R$${total.toFixed(2)}`);
    }
}

// 📅 Função para listar vendas entre duas datas
function listarVendasPorPeriodo() {
    console.log("\n=== 📆 VENDAS POR PERÍODO ===");

    const inicioTexto = ler("📅 Digite a data inicial (dd/mm/aaaa): ");
    const fimTexto = ler("📅 Digite a data final (dd/mm/aaaa): ");

    const [diaI, mesI, anoI] = inicioTexto.split('/').map(Number);
    const [diaF, mesF, anoF] = fimTexto.split('/').map(Number);

    const dataInicio = new Date(anoI, mesI - 1, diaI);
    const dataFim = new Date(anoF, mesF - 1, diaF, 23, 59, 59);

    let total = 0;
    let encontrou = false;

    for (const venda of vendas) {
        const data = venda.data;
        if (data >= dataInicio && data <= dataFim) {
            console.log(`🧾 ID: ${venda.id} | 👤 Cliente: ${venda.cliente} | 🥬 Produto: ${venda.produto} | ⚖️ Quantidade: ${venda.quantidade}kg | 💰 Valor: R$${venda.valorTotal.toFixed(2)} | 📅 Data: ${data.toLocaleDateString()}`);
            total += venda.valorTotal;
            encontrou = true;
        }
    }

    if (!encontrou) {
        console.log("🛑 Nenhuma venda registrada nesse período.");
    } else {
        console.log(`📊 Total vendido no período: R$${total.toFixed(2)}`);
    }
}

// 🧭 Função principal que mostra o menu e chama as outras funções
function menu() {
    let opcao = "";
    do {
        console.log("\n=== 🥕 SISTEMA DE VENDAS - HORTIFRUTI ===");
        console.log("1️⃣  - Registrar venda");
        console.log("2️⃣  - Cancelar venda");
        console.log("3️⃣  - Listar vendas do dia");
        console.log("4️⃣  - Listar vendas por período");
        console.log("0️⃣  - Sair");

        opcao = ler("📌 Escolha uma opção: ");

        if (opcao === "1") {
            registrarVenda();
        } else if (opcao === "2") {
            cancelarVenda();
        } else if (opcao === "3") {
            listarVendasDoDia();
        } else if (opcao === "4") {
            listarVendasPorPeriodo();
        } else if (opcao === "0") {
            console.log("👋 Saindo do sistema...");
        } else {
            console.log("⚠️ Opção inválida. Tente novamente.");
        }

    } while (opcao !== "0");
}

// 🚀 Inicia o programa chamando o menu
menu();
