// ------------------------- Filtro de maios e menor -------------------------
const select  = document.getElementById('ordenar');          
const cont    = document.getElementById('container');       
const titulo  = document.getElementById('tituloProdutos');    

// Quando o usuário muda o valor do select
select.addEventListener('change', () => {
  const modo = select.value; // "menor-preco" ou "maior-preco"
  if (!modo) return;

  // Converte os cards em array para poder ordenar
  const cards = Array.from(cont.querySelectorAll('.card'));

  // Ordena os cards pelo preço (convertido em número)
  cards.sort((a, b) => {
    const pa = priceToNumber(a.querySelector('.preco').textContent);
    const pb = priceToNumber(b.querySelector('.preco').textContent);
    return modo === 'menor-preco' ? pa - pb : pb - pa;
  });

  // Coloca os cards na ordem de novo
  cards.forEach(c => cont.appendChild(c));

  // Muda o texto do título
  titulo.innerHTML = modo === 'menor-preco' ? '<i>Menor valor</i>' : '<i>Maior valor</i>';
});

// ------------------------- Carrossel dos produtos -------------------------
const carrossel = document.getElementById('container');
const prevBtn = document.getElementById('prevBtn');   // botão ←
const nextBtn = document.getElementById('nextBtn');   // botão →

const scrollAmount = 300; // distância que vai rolar ao clicar nos botões

prevBtn.addEventListener("click", () => {
  carrossel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

nextBtn.addEventListener("click", () => {
  carrossel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

// ------------------------- Botão para descrição dos produtos -------------------------
const btnDescricao = document.getElementById('descricao');
const precos = document.querySelectorAll('.preco');
const parcelas = document.querySelectorAll('.parcelas');
const botoes = document.querySelectorAll('.botao');

// Descrições para cada produto, na mesma ordem dos cards
const descricoes = [
  'Xícara de porcelana artesanal francesa com acabamento dourado.',
  'Abajur clássico pintado à mão com base em porcelana oriental.',
  'Conjunto refinado em porcelana japonesa com pinturas florais delicadas e acabamento esmaltado.',
  'Vaso em cristal boêmio lapidado, com design clássico e transparência de alta pureza.',
  'Abajur com base em porcelana oriental pintada à mão, detalhes em dourado e cúpula em linho.',
  'Clássica licoreira em cristal St. Louis, com lapidação refinada e brilho excepcional, ideal para compor bares sofisticados.',
  'Peça contemporânea em vidro fosco rosé, com textura aveludada e design minimalista.',
  'Taça de cristal âmbar com bordas finas e lapidação artesanal em tom quente e sofisticado.',
  'Escultura decorativa de papagaio em porcelana vítrea, com pintura vibrante e acabamento realista.',
  'Composição clássica em biscuit branco, representando cena romântica com riqueza de detalhes.',
  'Fruteira decorativa em opalina leitosa, com formas orgânicas e coloração suave.',
  'Peça tradicional chinesa em cloisonné esmaltado, com detalhes em metal dourado e padrões ornamentais delicados.'
];

let mostrandoPreco = true; // controle para alternar entre preço e descrição

btnDescricao.addEventListener('click', () => {
  precos.forEach((td, i) => {
    // Salva o preço original na 1ª vez
    if (!td.dataset.preco) td.dataset.preco = td.textContent.trim();

    // Alterna entre mostrar preço e mostrar descrição
    if (mostrandoPreco) {
      td.innerHTML = `<span class="descricao-formatada">${descricoes[i]}</span>`;
      btnDescricao.classList.add('ativo');
    } else {
      td.textContent = td.dataset.preco;
      btnDescricao.classList.remove('ativo');
    }
  });

  // Esconde ou mostra as parcelas
  parcelas.forEach(td => {
    td.style.display = mostrandoPreco ? 'none' : '';
  });

  // Esconde ou mostra os botões de "comprar"
  botoes.forEach(btn => {
    btn.style.display = mostrandoPreco ? 'none' : '';
  });

  // Atualiza o texto do botão
  btnDescricao.textContent = mostrandoPreco ? 'Preços dos Produtos' : 'Descrição dos Produtos';
  mostrandoPreco = !mostrandoPreco; // inverte estado
});

// ------------------------- Função que pega o termo de pesquisa da URL (?pesquisa=...) -------------------------
function getTermoDaURL() {
  const params = new URLSearchParams(window.location.search);
  return (params.get('pesquisa') || '').toLowerCase();
}

// Filtra os cards de acordo com o termo de busca
function filtrar(termo) {
  const cards = document.querySelectorAll('.card');
  const msg   = document.getElementById('msgVazia');
  let achou = false;

  cards.forEach(card => {
    const nome = card.querySelector('th').textContent.toLowerCase();
    const visivel = nome.includes(termo);

    if (visivel) {
      card.style.display = 'block';
      achou = true;
    } else {
      card.style.display = 'none';
    }
  });

  // Mostra mensagem de "não encontrado" se nenhum card aparecer, juntamente com a remoção dos botões do carrosel
  if (achou) {
    msg.style.display = 'none';
  } else {
    msg.style.display = 'block';
    document.getElementById('prevBtn').remove();
    document.getElementById('nextBtn').remove();
    msg.style.display = 'block';
  }
}

// Ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('pesquisar');
  const termoInicial = getTermoDaURL();
  filtrar(termoInicial);
  // Filtro ao digitar no campo de pesquisa
  input.addEventListener('input', () => {
    filtrar(input.value.toLowerCase());
  });
});