document.addEventListener('DOMContentLoaded', () => {
    // Array para armazenar os itens do carrinho
    let carrinho = [];

    // Referências aos elementos do DOM
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalCarrinhoSpan = document.getElementById('total-carrinho');
    const contadorCarrinhoSpan = document.getElementById('contador-carrinho');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');

    // Função para atualizar a exibição do carrinho
    function atualizarCarrinho() {
        listaCarrinho.innerHTML = '';
        let total = 0;
        let contador = 0;

        if (carrinho.length === 0) {
            // Se o carrinho estiver vazio
            const li = document.createElement('li');
            li.className = 'carrinho-vazio';
            li.textContent = 'Seu carrinho está vazio. Adicione alguns produtos!';
            listaCarrinho.appendChild(li);
            finalizarCompraBtn.disabled = true;
        } else {
            // Se houver itens no carrinho
            carrinho.forEach((item, index) => {
                const li = document.createElement('li');
                
                // Formata o nome do item e o preço
                const nomeItem = item.tamanho ? `${item.nome} (${item.tamanho})` : item.nome;
                const precoFormatado = item.preco.toFixed(2).replace('.', ',');

                li.innerHTML = `
                    <span>${nomeItem}</span>
                    <span>R$ ${precoFormatado}</span>
                    <button class="remover-item" data-index="${index}">Remover</button>
                `;
                
                listaCarrinho.appendChild(li);
                total += item.preco;
                contador++;
            });
            finalizarCompraBtn.disabled = false;
        }

        // Atualiza o total e o contador
        totalCarrinhoSpan.textContent = total.toFixed(2).replace('.', ',');
        contadorCarrinhoSpan.textContent = contador;

        // Adiciona o event listener para os novos botões de remoção
        document.querySelectorAll('.remover-item').forEach(button => {
            button.addEventListener('click', removerDoCarrinho);
        });
    }

    // Função para adicionar item ao carrinho
    function adicionarAoCarrinho(event) {
        const produtoDiv = event.target.closest('.produto');
        const nome = produtoDiv.dataset.nome;
        const preco = parseFloat(produtoDiv.dataset.preco);
        
        let tamanho = null;
        
        // Verifica se há um seletor de tamanho associado ao produto
        const seletorTamanho = produtoDiv.querySelector('.seletor-tamanho');
        if (seletorTamanho) {
            tamanho = seletorTamanho.value;
        }

        // Adiciona o item (com ou sem tamanho) ao array do carrinho
        carrinho.push({ nome, preco, tamanho });
        
        // Atualiza a interface do carrinho
        atualizarCarrinho();
        alert(`${nome}${tamanho ? ' (Tamanho: ' + tamanho + ')' : ''} adicionado ao carrinho!`);
    }

    // Função para remover item do carrinho
    function removerDoCarrinho(event) {
        const index = event.target.dataset.index;
        
        // Remove o item do array pelo índice
        carrinho.splice(index, 1); 
        
        // Atualiza a interface do carrinho
        atualizarCarrinho();
    }
    
    // Função para finalizar a compra (Exemplo simples)
    function finalizarCompra() {
        if (carrinho.length > 0) {
            alert(`Compra finalizada! Total: R$ ${totalCarrinhoSpan.textContent}. Obrigado por comprar!`);
            // Limpa o carrinho após a finalização (opcional)
            carrinho = [];
            atualizarCarrinho();
        }
    }

    // Adiciona event listener aos botões "Adicionar ao Carrinho"
    document.querySelectorAll('.adicionar').forEach(button => {
        button.addEventListener('click', adicionarAoCarrinho);
    });
    
    // Adiciona event listener ao botão "Finalizar Compra"
    finalizarCompraBtn.addEventListener('click', finalizarCompra);

    // Inicializa o carrinho ao carregar a página
    atualizarCarrinho();
});
