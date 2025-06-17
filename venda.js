
import prompt from 'prompt-sync'
const ler = prompt();  
        
let vendas = [];


function registrarVenda() {
    const id = vendas.length + 1;
    const produto = ler("Nome do produto: ");
    const quantidade = Number(ler("Quantidade: "));
    const preco = Number(ler("Preço unitário: "));
    const data = new Date();

    const venda = {
        id,
        produto,
        quantidade,
        preco,
        total: quantidade * preco,
        data
    };

    vendas.push(venda);
    console.log("✅ Venda registrada com sucesso!");
}

function cancelarVenda() {
    const id = Number(ler("Digite o ID da venda que deseja cancelar: "));
    const index = vendas.findIndex(v => v.id === id);

    if (index !== -1) {
        vendas.splice(index, 1);
        console.log("Venda cancelada com sucesso!");
    } else {
        console.log("Venda não encontrada.");
    }
}


function listarVendasDoDia() {
    const hoje = new Date().toISOString().slice(0, 10);

    const vendasHoje = vendas.filter(v =>
        v.data.toISOString().slice(0, 10) === hoje
    );

    if (vendasHoje.length === 0) {
        console.log("📭 Nenhuma venda realizada hoje.");
        return;
    }

    console.log("Vendas de hoje:");
    vendasHoje.forEach(v => {
        console.log(`ID: ${v.id} | Produto: ${v.produto} | Total: R$ ${v.total.toFixed(2)} | Data: ${v.data.toLocaleString()}`);
    });
}

function listarVendasPorPeriodo() {
    const inicio = new Date(ler("Data inicial (AAAA-MM-DD): "));
    const fim = new Date(ler("Data final (AAAA-MM-DD): "));

    const vendasPeriodo = vendas.filter(v =>
        v.data >= inicio && v.data <= fim
    );

    if (vendasPeriodo.length === 0) {
        console.log(" Nenhuma venda encontrada no período.");
        return;
    }

    console.log("Vendas no período:");
    vendasPeriodo.forEach(v => {
        console.log(`ID: ${v.id} | Produto: ${v.produto} | Total: R$ ${v.total.toFixed(2)} | Data: ${v.data.toLocaleString()}`);
    });
}

function menu() {
    let opcao;

    do {
        console.log("\n=== LOJA DA VIVI - SISTEMA DE VENDAS ===");
        console.log("1. Registrar venda");
        console.log("2. Cancelar venda");
        console.log("3. Listar vendas do dia");
        console.log("4. Listar vendas de um período");
        console.log("0. Sair");
        opcao = ler("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                registrarVenda();
                break;
            case "2":
                cancelarVenda();
                break;
            case "3":
                listarVendasDoDia();
                break;
            case "4":
                listarVendasPorPeriodo();
                break;
            case "0":
                console.log("Saindo do sistema...");
                break;
            default:
                console.log("Opção inválida.");
        }

    } while (opcao !== "0");
}

menu();