import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const port = 8080;

let pedido = [];

// Rotas para adicionar e visualizar pedidos
app.route('/pedido')
    .post((req, res) => {
        const item = req.body.item;
        const quantidade = req.body.quantidade;

        if (!item || quantidade <= 0 || isNaN(quantidade)) {
            res.status(400).json({ erro: 'Precisa enviar item e quantidade.' });
            return;
        }

        pedido.push({ item, quantidade});

        res.status(201).json({ mensagem: 'Item Adicionado!'});
    })
    .get((req, res) => {
        if (pedido.length === 0) {
            res.status(200).json({ mensagem: 'Pedido Vazio.' });
            return;
        }
        res.json(pedido);
    });

// Rota para deletar    
app.delete('/pedido/:item', (req, res) => {
    const nomeItem = req.params.item.toLowerCase();
    const index = pedido.findIndex(p => p.item.toLowerCase() === nomeItem);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Item não encontrado.' });
    }

    pedido.splice(index, 1);
    res.status(200).json({ mensagem: 'Pedido excluído com sucesso.' });
});

// rota para alterar um pedido
app.put('/pedido/:item', (req,res) => {
    const nomeItem = req.params.item;
    const novaQuantidade = req.body.quantidade;

    const pedidos = pedido.find(p => p.item.toLowerCase() === nomeItem.toLowerCase());

    if (!pedidos) {
        return res.status(404).json({ mensagem: 'Item não encontrado.' });
    }

    if (!novaQuantidade || novaQuantidade < 1) {
        return res.status(400).json({ mensagem: 'Quantidade inválida.' });
    }

    pedido.quantidade = novaQuantidade;
    res.status(200).json({ mensagem: 'Pedido atualizado com sucesso.', pedido });
    
});

//Rota para Consulta especifica
app.get('/pedido/:item', (req, res) => {

    const nomeItem = req.params.item.toLowerCase();
    const pedidos = pedido.find(p => p.item.toLowerCase() === nomeItem);

    if (pedidos) {
        res.json(pedidos);
    } else {
        res.status(404).json({ mensagem: 'Item não encontrado' });
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});