// Função para atualizar a imagem e a descrição no modal ao clicar
const galleryItems = document.querySelectorAll('.gallery-item');
const modalImg = document.getElementById('modal-img');
const modalDescription = document.getElementById('modal-description');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('src');
        const imgAlt = item.getAttribute('alt');
        const imgDescription = item.getAttribute('data-description');

        // Atualiza a imagem e a descrição no modal
        modalImg.setAttribute('src', imgSrc);
        modalImg.setAttribute('alt', imgAlt);
        modalDescription.textContent = imgDescription;
    });
});



//Botão modo escuro e botão voltar ao topo
document.addEventListener('DOMContentLoaded', () => {
    // Modo Escuro
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            toggleButton.innerHTML = '<i class="bi bi-sun"></i> Claro';
        } else {
            toggleButton.innerHTML = '<i class="bi bi-moon"></i> Escuro';
        }
    });

    // Botão Voltar ao Topo
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Seleciona os elementos do DOM
const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const modalContainer = document.getElementById('modal-container');
const resultsContainer = document.getElementById('results-container');
const resultsList = document.getElementById('results-list');
const cifraContainer = document.getElementById('cifra-container');
const closeModal = document.getElementById('close-modal');

// Função para carregar o arquivo cifras.json
async function loadCifras() {
    try {
        const response = await fetch('../backend/cifras.json');  // Caminho para o arquivo JSON com as cifras
        const cifras = await response.json();
        return cifras;
    } catch (error) {
        console.error('Erro ao carregar cifras.json:', error);
        return [];
    }
}

// Função para exibir os resultados da busca no modal
function displayResults(results) {
    resultsContainer.innerHTML = '';  // Limpa os resultados anteriores
    resultsList.innerHTML = '';  // Limpa os resultados dentro do modal

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhuma cifra encontrada.</p>';
        return;
    }

    // Gera o HTML para os resultados da busca
    results.forEach(cifra => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');

        const title = document.createElement('h3');
        title.textContent = cifra.name;

        const viewButton = document.createElement('button');
        viewButton.textContent = 'Visualizar Cifra';
        viewButton.classList.add('btn', 'visualizar');
        viewButton.setAttribute('data-file', cifra.fileName);

        const downloadLink = document.createElement('a');
        downloadLink.textContent = 'Baixar Cifra';
        downloadLink.href = cifra.downloadLink;
        downloadLink.classList.add('btn', 'baixar');
        downloadLink.setAttribute('download', cifra.fileName);

        // Adiciona os elementos ao resultado
        resultDiv.appendChild(title);
        resultDiv.appendChild(viewButton);
        resultDiv.appendChild(downloadLink);

        resultsContainer.appendChild(resultDiv);

        // Evento para exibir o conteúdo da cifra ao clicar em "Visualizar"
        viewButton.addEventListener('click', async (e) => {
            const fileName = e.target.getAttribute('data-file');
            await viewCifra(fileName);
        });
    });
}

// Função para carregar e exibir o conteúdo da cifra no modal
async function viewCifra(fileName) {
    try {
        const response = await fetch(`../backend/cifras/${fileName}`);
        const content = await response.text();

        // Exibe o modal e o conteúdo da cifra
        modalContainer.style.display = 'flex';
        resultsList.style.display = 'none'; // Oculta os resultados
        cifraContainer.style.display = 'block';
        cifraContainer.innerHTML = `<pre>${content}</pre>`;
    } catch (error) {
        console.error('Erro ao carregar o arquivo de cifra:', error);
        cifraContainer.innerHTML = 'Erro ao carregar a cifra.';
    }
}

// Fechar o modal ao clicar no "X"
closeModal.addEventListener('click', () => {
    modalContainer.style.display = 'none';
    resultsList.style.display = 'block'; // Mostra os resultados novamente ao fechar o modal
    cifraContainer.style.display = 'none'; // Oculta o conteúdo da cifra
    cifraContainer.innerHTML = ''; // Limpa o conteúdo da cifra
});

// Evento de submissão do formulário de busca
form.addEventListener('submit', async (e) => {
    e.preventDefault();  // Evita que o formulário seja enviado

    const query = searchInput.value.trim().toLowerCase();  // Termo de busca
    if (query === '') {
        resultsContainer.innerHTML = '<p>Por favor, digite o nome de uma música para buscar.</p>';
        return;
    }

    const cifras = await loadCifras();  // Carrega as cifras do arquivo JSON
    const results = cifras.filter(cifra => cifra.name.toLowerCase().includes(query));  // Filtra os resultados da busca
    displayResults(results);  // Exibe os resultados na página
});

// Função para exibir o modal a cada 2 minutos
function showApoioModal() {
    var modal = new bootstrap.Modal(document.getElementById('apoioModal'));
    modal.show();
}

// Função para copiar a chave Pix
document.getElementById('copy-pix-btn').addEventListener('click', function() {
    var pixKey = document.getElementById('pix-key').textContent;
    navigator.clipboard.writeText(pixKey).then(function() {
        alert('Chave Pix copiada para a área de transferência!');
    }).catch(function(error) {
        console.error('Falha ao copiar a chave Pix:', error);
    });
});

// Exibir o modal de apoio a cada 2 minutos (120000 ms)
setInterval(showApoioModal, 120000); // 2 minutos
