async function carregarTemplate(templateName, containerId, data) {
    const response = await fetch(`/views/${templateName}`);
    const template = await response.text();
    const rendered = Mustache.render(template, data);
    document.getElementById(containerId).innerHTML = rendered;
}

async function carregarDados() {
    try {
        const [ticketsRes, vendasRes] = await Promise.all([
            fetch('/tickets'),
            fetch('/vendas', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
        ]);

        const availableTickets = await ticketsRes.json();
        const myVendas = await vendasRes.json();

        renderIngressos(availableTickets);
        renderHistorico(myVendas);

    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

function renderIngressos(tickets) {
    const container = document.getElementById('venda-container');
    container.innerHTML = '';

    if (tickets.length === 0) {
        container.innerHTML = '<p class="sem-ingressos">Nenhum ingresso disponível no momento</p>';
        return;
    }

    tickets.forEach(ticket => {
        const card = document.createElement('div');
        card.className = 'ingresso-card';
        card.innerHTML = `
            <h3>${ticket.nome}</h3>
            <p>Preço Unitário: R$ ${ticket.preco}</p>
            <p>Disponíveis: ${ticket.quantidade}</p>
            <div class="compra-form">
                <input type="number" id="quantidade-${ticket._id}" min="1" max="${ticket.quantidade}" value="1" class="quantidade-input">
                <button class="btn-comprar" onclick="comprarIngresso('${ticket._id}')" ${ticket.quantidade === 0 ? 'disabled' : ''}>
                    ${ticket.quantidade === 0 ? 'Esgotado' : 'Comprar'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderHistorico(vendas) {
    const container = document.getElementById('historico-container');
    container.innerHTML = '';

    if (vendas.length === 0) {
        container.innerHTML = '<p class="sem-compras">Nenhuma compra registrada</p>';
        return;
    }

    vendas.forEach(venda => {
        const item = document.createElement('div');
        item.className = 'venda-item';
        item.innerHTML = `
            <h3>${venda.ticket.nome}</h3>
            <p>Quantidade: ${venda.quantidade}</p>
            <p>Total: R$ ${venda.valorTotal}</p>
            <p class="data-compra">${new Date(venda.dataVenda).toLocaleString()}</p>
        `;
        container.appendChild(item);
    });
}

async function comprarIngresso(ticketId) {
    try {
        const quantidade = parseInt(document.getElementById(`quantidade-${ticketId}`).value, 10);
        
        if (!quantidade || quantidade < 1) {
            return alert('Quantidade inválida');
        }

        const resposta = await fetch('/vendas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                ticketId,
                quantidade
            })
        });

        const resultado = await resposta.json();
        
        if (resposta.ok) {
            alert('Compra realizada com sucesso!');
            carregarDados(); // Atualiza a interface sem recarregar
        } else {
            alert(`Erro: ${resultado.message}`);
        }
    } catch (error) {
        console.error('Erro na compra:', error);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', carregarDados);