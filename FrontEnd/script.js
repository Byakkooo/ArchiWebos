const gallery = document.querySelector(".gallery");

// Création dynamique du conteneur des filtres
const filtersContainer = document.createElement("div");
filtersContainer.classList.add("filters");

// Insertion du conteneur juste au-dessus de la galerie
gallery.parentNode.insertBefore(filtersContainer, gallery);

let allWorks = [];

// Récupération des projets
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(works => {
    allWorks = works;
    displayWorks(allWorks);
    fetchCategories();
  })
  .catch(error => {
    console.error("Erreur fetch projects :", error);
  });

// Fonction pour afficher les projets
function displayWorks(works) {
  gallery.innerHTML = "";
  works.forEach(work => {
    const figure = document.createElement("figure");
    figure.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}">
      <figcaption>${work.title}</figcaption>
    `;
    gallery.appendChild(figure);
  });
}

// Récupération des catégories
function fetchCategories() {
  fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => {
      createFilters(categories);
    })
    .catch(error => console.error("Erreur fetch categories :", error));
}

// Création des boutons de filtre
function createFilters(categories) {
  // Bouton Tous
  const allBtn = document.createElement("button");
  allBtn.textContent = "Tous";
  allBtn.classList.add("filter-btn", "active"); // actif par défaut
  allBtn.addEventListener("click", () => {
    displayWorks(allWorks);
    setActiveButton(allBtn);
  });
  filtersContainer.appendChild(allBtn);

  // Boutons pour chaque catégorie
  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.classList.add("filter-btn");

    btn.addEventListener("click", () => {
      const filteredWorks = allWorks.filter(work => work.categoryId === category.id);
      displayWorks(filteredWorks);
      setActiveButton(btn);
    });

    filtersContainer.appendChild(btn);
  });
}

// Mettre en surbrillance le bouton actif
function setActiveButton(activeBtn) {
  const buttons = filtersContainer.querySelectorAll("button");
  buttons.forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}
