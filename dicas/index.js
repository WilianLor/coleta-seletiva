const adicionarDicaForm = document.getElementById("adicionarDicaForm");
const filtrarDicasForm = document.getElementById("filtrarDicasForm");

let materialFiltro;

adicionarDicaForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const dicaTextArea = document.getElementById("dica");
  const materialSelect = document.getElementById("material");

  const dicas = JSON.parse(localStorage.getItem("dicas")) || [];

  const ultimaDica = dicas[dicas.length - 1];

  dicas.push({
    id: ultimaDica ? ultimaDica.id + 1 : 1,
    dica: dicaTextArea.value,
    material: materialSelect.value,
  });

  localStorage.setItem("dicas", JSON.stringify(dicas));

  dicaTextArea.value = "";
  materialSelect.value = "";
  resetFiltro();
});

filtrarDicasForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const filtroMaterialSelect = document.getElementById("filtroMaterial");

  materialFiltro = filtroMaterialSelect.value;
  renderListaDicas(materialFiltro);
});

filtrarDicasForm.addEventListener("reset", (event) => {
  event.preventDefault();
  resetFiltro();
});

const resetFiltro = () => {
  document.getElementById("filtroMaterial").value = "";

  materialFiltro = "";
  renderListaDicas();
};

const excluirDica = (id) => {
  const dicas = JSON.parse(localStorage.getItem("dicas")) || [];

  const novasDicas = dicas.filter((dica) => dica.id !== id);

  localStorage.setItem("dicas", JSON.stringify(novasDicas));

  renderListaDicas(materialFiltro);
};

const renderListaDicas = (material = "") => {
  const dicas = JSON.parse(localStorage.getItem("dicas")) || [];

  const dicasRender = dicas.filter((dica) => {
    if (material) return dica.material === material;
    else return true;
  });

  const dicasList = document.getElementById("dicasList");

  dicasList.innerHTML = "";

  dicasRender.forEach((dica) => {
    const tr = document.createElement("tr");
    tr.classList.add(
      dica.material
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    );

    const dicaTd = document.createElement("td");
    dicaTd.innerHTML = dica.dica;
    tr.appendChild(dicaTd);

    const materialTd = document.createElement("td");
    materialTd.innerHTML = dica.material;
    tr.appendChild(materialTd);

    const acaoTd = document.createElement("td");
    acaoTd.classList.add("tdAcao");

    const excluirButton = document.createElement("button");
    excluirButton.classList.add("excluir");
    excluirButton.innerHTML = "Excluir";
    excluirButton.addEventListener("click", () => {
      excluirDica(dica.id);
    });
    acaoTd.appendChild(excluirButton);

    tr.appendChild(acaoTd);

    dicasList.appendChild(tr);
  });
};
