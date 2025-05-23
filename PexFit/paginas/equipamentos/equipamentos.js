console.log('JS carregado');

const url = 'https://exercisedb.p.rapidapi.com/exercises/equipmentList';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'b767abbea0msh1faf0a9d60b3c43p1b646cjsn4d4cffec5a98',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
};

// Dicionário de tradução
const dicionarioEquipamentos = {
    "band": "faixa elástica",
    "barbell": "barra",
    "body weight": "peso corporal",
    "bosu ball": "bola bosu",
    "cable": "cabo",
    "dumbbell": "halter",
    "elliptical machine": "elíptico",
    "ez barbell": "barra EZ",
    "hammer": "martelo",
    "kettlebell": "kettlebell",
    "leverage machine": "máquina de alavanca",
    "medicine ball": "bola medicinal",
    "olympic barbell": "barra olímpica",
    "resistance band": "faixa de resistência",
    "roller": "rolinho",
    "rope": "corda",
    "skierg machine": "máquina skierg",
    "sled machine": "máquina de trenó",
    "smith machine": "máquina smith",
    "stability ball": "bola de estabilidade",
    "stationary bike": "bicicleta ergométrica",
    "stepmill machine": "máquina de escada",
    "tire": "pneu",
    "trap bar": "barra hexagonal",
    "upper body ergometer": "ergômetro de membros superiores",
    "weighted": "com peso",
    "wheel roller": "roda abdominal"
};

async function fetchEquipamentos() {
    try {
        const response = await fetch(url, options);
        const equipamentos = await response.json();

        const container = document.querySelector('.filiais-div');
        // Limpa os cards antigos, mantendo apenas o container vazio
        container.innerHTML = '';

        equipamentos.forEach(equipamento => {
            if (dicionarioEquipamentos[equipamento]) {
                // Cria o card no mesmo padrão do HTML existente
                const card = document.createElement('div');
                card.className = 'acad';

                const p = document.createElement('p');
                p.textContent = dicionarioEquipamentos[equipamento];

                const imgDiv = document.createElement('div');
                imgDiv.className = 'acad-img';
                const img = document.createElement('img');
                img.className = 'image';
                img.src = 'assets/img/equipamento.jpg'; // imagem padrão

                imgDiv.appendChild(img);
                card.appendChild(p);
                card.appendChild(imgDiv);

                container.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Erro ao buscar equipamentos:', error);
    }
}

fetchEquipamentos();