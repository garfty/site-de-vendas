// Carrinho de compras (usando localStorage para persistência)
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para adicionar produto ao carrinho
const adicionarAoCarrinho = (produto, preco) => {
    const itemCarrinho = {
        produto,
        preco
    };

    carrinho.push(itemCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`Produto ${produto} adicionado ao carrinho!`);
};

// Adiciona eventos de clique aos botões
const botoesAdicionar = document.querySelectorAll('.adicionar');
botoesAdicionar.forEach(button => {
    button.addEventListener('click', () => {
        const produto = button.getAttribute('data-produto');
        const preco = parseFloat(button.getAttribute('data-preco'));
        adicionarAoCarrinho(produto, preco);
    });
});
