const fs = require('fs');
const path = require('path');

// Caminho para o diretório onde o script está localizado (que é o mesmo dos arquivos de cifras)
const musicDir = __dirname;  // Diretório atual onde o script está sendo executado

// Função para varrer o diretório e gerar o JSON
function generateCifrasJson() {
  try {
    // Lê todos os arquivos no diretório atual
    const files = fs.readdirSync(musicDir);
    
    // Filtra apenas os arquivos de texto ou PDF, se for o caso
    const cifras = files
      .filter(file => file.endsWith('.txt') || file.endsWith('.pdf'))  // Filtrar por extensão
      .map((file, index) => {
        return {
          id: index + 1,
          name: path.parse(file).name,  // Nome do arquivo sem a extensão
          fileName: file,               // Nome completo do arquivo
          downloadLink: `${file}`       // Link para download
        };
      });

    // Gera o arquivo cifras.json no mesmo diretório
    fs.writeFileSync(path.join(musicDir, 'cifras.json'), JSON.stringify(cifras, null, 2));
    console.log('Arquivo cifras.json criado com sucesso!');
    
  } catch (error) {
    console.error('Erro ao gerar o arquivo cifras.json:', error);
  }
}

// Executa a função
generateCifrasJson();
