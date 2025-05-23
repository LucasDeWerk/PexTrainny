const url = 'https://motivation-quotes4.p.rapidapi.com/api';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'b767abbea0msh1faf0a9d60b3c43p1b646cjsn4d4cffec5a98',
        'x-rapidapi-host': 'motivation-quotes4.p.rapidapi.com'
    }
};

async function traduzirFrase(texto) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000); // 7 segundos

        const response = await fetch('https://libretranslate.de/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q: texto,
                source: 'en',
                target: 'pt',
                format: 'text'
            }),
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error('Falha na tradução: ' + response.status);
        }

        const data = await response.json();
        return data.translatedText;
    } catch (error) {
        console.error('Erro ao traduzir:', error);
        return "Erro ao traduzir a frase.";
    }
}

async function buscarFraseMotivacional() {
    document.querySelector('.frase').textContent = "Buscando...";
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        let frase = result;
        try {
            const json = JSON.parse(result);
            if (json.quote && json.author) {
                frase = `"${json.quote}"\n— ${json.author}`;
            } else if (json.quote) {
                frase = `"${json.quote}"`;
            }
        } catch (e) {
            // Se não for JSON, usa o texto puro
        }
        document.querySelector('.frase').textContent = frase;
        console.log(frase);
    } catch (error) {
        document.querySelector('.frase').textContent = "Erro ao buscar frase motivacional.";
        console.error(error);
    }
}

// Adiciona evento ao botão
document.addEventListener('DOMContentLoaded', () => {
    const botao = document.querySelector('.button');
    if (botao) {
        botao.addEventListener('click', buscarFraseMotivacional);
    }
});