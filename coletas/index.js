const coletas = [
    {
        id: 1,
        bairro: "Câmpus Universitáriosa",
        dia: "Segunda-feira",
        horario: "07:00 - 17:00"
    },
    {
        id: 2,
        bairro: "São Pedro",
        dia: "Terça-feira",
        horario: "07:00 - 17:00"
    },
    {
        id: 3,
        bairro: "Vila Mariana",
        dia: "Quarta-feira",
        horario: "07:00 - 17:00"
    },
    {
        id: 4,
        bairro: "Panorama",
        dia: "Quinta-feira",
        horario: "07:00 - 17:00"
    },
    {
        id: 5,
        bairro: "Semiário",
        dia: "Sexta-feira",
        horario: "07:00 - 17:00"
    },
    {
        id: 6,
        bairro: " Nova Independência",
        dia: "Sabado",
        horario: "07:00 - 12:00"
    }
];

const onLoad = () => {
    localStorage.setItem('coletas', JSON.stringify(coletas));

    const coletasListBody = document.getElementById("coletasList");

    const coletasList = JSON.parse(localStorage.getItem('coletas'));

    coletasList.forEach(coleta => {
        const tr = document.createElement('tr');
        
        const bairroTd = document.createElement('td');
        bairroTd.innerHTML = coleta.bairro;
        tr.appendChild(bairroTd)

        const diaTd = document.createElement('td');
        diaTd.innerHTML = coleta.dia;
        tr.appendChild(diaTd);

        const horarioTd = document.createElement('td');
        horarioTd.innerHTML = coleta.horario;
        tr.appendChild(horarioTd);

        coletasListBody.appendChild(tr);
    })
}
