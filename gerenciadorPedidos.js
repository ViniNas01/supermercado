
async function adicionarPedido() {
    const item = document.getElementById('item').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const mensagem = document.getElementById('mensagem');

    // Validação simples no frontend
    if (!item || isNaN(quantidade) || quantidade <= 0) {
        mensagem.textContent = 'Por favor, preencha o item e uma quantidade válida.';
        return; // não envia para o servidor
    }

    try {
        const response = await fetch('http://localhost:8080/pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item: item, quantidade: quantidade })
        });

        const data = await response.json();
        mensagem.textContent = data.mensagem;

        if (response.ok) {
            document.getElementById('item').value = '';
            document.getElementById('quantidade').value = '';
        }
    } catch (error) {
        mensagem.textContent = 'Erro ao enviar o pedido.';
        console.error(error);
    }
}

async function consultarPedido() {
    const inputBusca = document.getElementById('buscaItem');
    const nomeItem = inputBusca.value.trim(); // remover espaços em branco
    const resultado = document.getElementById('resultadoBusca');

    if (nomeItem === '') {
        resultado.textContent = 'Digite um nome para buscar.';
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/pedido/${nomeItem}`);

        if (response.ok) {
            const data = await response.json();
            resultado.innerHTML = `<p><strong>Item:</strong> ${data.item} <br> <strong>Quantidade:</strong> ${data.quantidade}</p>`;
        } else {
            resultado.textContent = 'Item não encontrado.';
        }

        // Limpar input e focar novamente
        inputBusca.value = '';
        inputBusca.focus();

    } catch (error) {
        resultado.textContent = 'Erro ao buscar o item.';
        console.error(error);
    }
}

async function alterarPedido() {
    const item = document.getElementById('itemAtualizar').value;
    const quantidade = parseInt(document.getElementById('quantidadeAtualizar').value);
    const mensagem = document.getElementById('mensagemAtualizar');

    const response = await fetch(`http://localhost:8080/pedido/${item}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantidade: quantidade })
    });

    const data = await response.json();

    mensagem.textContent = data.mensagem;

    if (response.ok) {
        // limpa os campos
        document.getElementById('itemAtualizar').value = '';
        document.getElementById('quantidadeAtualizar').value = '';
    }


};


async function excluirPedido() {
    const item = document.getElementById('itemExcluir').value;
    const mensagem = document.getElementById('mensagemExcluir');

    if(item === '') {
        mensagem.textContent = 'Digite um nome para excluir.';
        return;
    }

    const response = await fetch(`http://localhost:8080/pedido/${item}`, {
        method: 'DELETE'
    });

    const data = await response.json();
    mensagem.textContent = data.mensagem;

    if (response.ok) {
        document.getElementById('itemExcluir').value = '';
    }
};

async function listarPedidos() {
    const lista = document.getElementById('listaPedidos');
    lista.innerHTML = ''; // limpa antes de exibir

    try {
        const response = await fetch('http://localhost:8080/pedido');

        if (response.ok) {
            const pedidos = await response.json();

            if (pedidos.length === 0) {
                lista.textContent = 'Nenhum pedido encontrado.';
                return;
            }

            pedidos.forEach(pedido => {
                const item = document.createElement('p');
                item.innerHTML = `<strong>Item:</strong> ${pedido.item} | <strong>Quantidade:</strong> ${pedido.quantidade}`;
                lista.appendChild(item);
            });
        } else {
            lista.textContent = 'Erro ao buscar os pedidos.';
        }
    } catch (error) {
        lista.textContent = 'Erro de conexão com o servidor.';
        console.error(error);
    }
}









