const url = 'https://exercisedb.p.rapidapi.com/exercises/targetList';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'b767abbea0msh1faf0a9d60b3c43p1b646cjsn4d4cffec5a98',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
};

// Dicionário de tradução dos grupos musculares (exemplo, adicione mais conforme necessário)
const dicionarioExercicios = {
    "abductors": "abdutores",
    "abs": "abdominais",
    "adductors": "adutores",
    "biceps": "bíceps",
    "calves": "panturrilhas",
    "cardiovascular system": "sistema cardiovascular",
    "delts": "deltoides",
    "forearms": "antebraços",
    "glutes": "glúteos",
    "hamstrings": "posterior de coxa",
    "lats": "dorsais",
    "levator scapulae": "levantador da escápula",
    "pectorals": "peitorais",
    "quads": "quadríceps",
    "serratus anterior": "serrátil anterior",
    "spine": "coluna",
    "traps": "trapézio",
    "triceps": "tríceps",
    "upper back": "parte superior das costas"
};

async function fetchExercicios() {
    try {
        const response = await fetch(url, options);
        const exercicios = await response.json();
		   console.log('Grupos musculares (inglês):', exercicios);

        const container = document.querySelector('.filiais-div');
        container.innerHTML = '';

        exercicios.forEach(exercicio => {
            if (dicionarioExercicios[exercicio]) {
                const card = document.createElement('div');
                card.className = 'acad';

                const p = document.createElement('p');
                p.textContent = dicionarioExercicios[exercicio];

                const imgDiv = document.createElement('div');
                imgDiv.className = 'acad-img';
                const img = document.createElement('img');
                img.className = 'image';
                img.src = 'assets/img/exercicio.jpg'; // imagem padrão para exercícios

                imgDiv.appendChild(img);
                card.appendChild(p);
                card.appendChild(imgDiv);

                container.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Erro ao buscar exercícios:', error);
    }
}

fetchExercicios();