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

        await carregarTemplate('ingressos-venda.mustache', 'venda-container', { availableTickets });
        await carregarTemplate('historico.mustache', 'historico-container', { myVendas });

    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
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