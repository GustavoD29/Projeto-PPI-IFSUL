// Aguarda todo o conteúdo do DOM ser carregado antes de executar o código
document.addEventListener('DOMContentLoaded', function () {
  const cadastro = document.getElementById('cadastro');
  const botaoCadastro = document.getElementById('botaoCadastro');
  const fechar = document.getElementById('fechar');
  const popup = document.getElementById('cadastro-box');

  // Função que mostra o popup (adiciona a classe que o torna visível)
  const abrirPopup = () => popup.classList.add('visivel');
  
  // Função que esconde o popup (remove a classe que o torna visível)
  const fecharPopup = () => popup.classList.remove('visivel');

  // Quando clicar no botão de cadastro, exibe o popup
  botaoCadastro.addEventListener('click', abrirPopup);
  if (cadastro) cadastro.addEventListener('click', abrirPopup);
  fechar.addEventListener('click', fecharPopup);

  // Criação da imagem (logo acima do pop-up)
  const img = document.createElement('img');
  img.src = 'Mídia/Old Story ORGC Branco.png';
  img.style.marginBottom= '650px';
  img.style.width = '200px'; 

  popup.appendChild(img);
});

// ------------------------- Faz um evento na nav -------------------------
const nav = document.getElementById('item');

nav.addEventListener("mouseover", () => {
    nav.style.backdropFilter = 'blur(10px)';
    nav.style.background = '#5a2e2e';
    nav.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    nav.style.borderRadius = '30px';
    nav.style.padding = '20px';
    nav.style.transition = 'all 0.5s ease';
});

nav.addEventListener('mouseleave', () => {
    nav.style = 'none';
    nav.style.transition = 'all 0.5s ease'; 
}); 

// ------------------------- Carrossel de imagens com bolinhas -------------------------
const imagens = document.querySelectorAll('.imagem-direita img');

const bolinhas = document.querySelectorAll('.bolinha');

let atual = 0;

// Função que exibe uma imagem de acordo com o índice
function mostrarImagem(index) {
    imagens.forEach((img, i) => {
        img.classList.toggle('ativo', i === index); 
        bolinhas[i].classList.toggle('ativa', i === index); // ativa a bolinha correspondente
    });
    atual = index;
}

// Altera automaticamente a imagem a cada 3 segundos
setInterval(() => {
    let proximo = (atual + 1) % imagens.length; 
    mostrarImagem(proximo);
}, 3000);

// Quando o usuário clica em uma bolinha, muda para a imagem correspondente
bolinhas.forEach(bolinha => {
    bolinha.addEventListener('click', () => {
        const index = parseInt(bolinha.dataset.index); // pega o índice da bolinha
        mostrarImagem(index); // exibe a imagem correspondente
    });
});
