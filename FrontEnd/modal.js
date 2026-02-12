document.addEventListener("DOMContentLoaded", function(){

    const modal = document.getElementById("modal");
    const openBtn = document.querySelector("#portfolio span"); // bouton modifier
    const closeBtn = document.querySelector(".close-modal");
    const modalGallery = document.querySelector(".modal-gallery");
    const addPhotoBtn = document.querySelector("#show-add-photo");


    // OUVRIR
    openBtn.addEventListener("click", function(){

        modal.classList.remove("hidden");

        displayModalWorks(window.allWorks);
    });


    // FERMER CROIX
    closeBtn.addEventListener("click", function(){
        modal.classList.add("hidden");
    });


    // FERMER OVERLAY
    modal.addEventListener("click", function(e){
        if(e.target === modal){
            modal.classList.add("hidden");
        }
    });


    // BOUTON AJOUTER PHOTO
    addPhotoBtn.addEventListener("click", function(){
        alert("On va bientôt afficher le formulaire 😄");
    });

});



/* ===============================
   AFFICHER LES WORKS DANS LE MODAL
=================================*/

function displayModalWorks(works){

    const modalGallery = document.querySelector(".modal-gallery");

    modalGallery.innerHTML = "";

    works.forEach(work => {

        const figure = document.createElement("figure");
        figure.style.position = "relative";

        figure.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            
            <i class="fa-solid fa-trash-can trash-icon"
               data-id="${work.id}">
            </i>
        `;

        modalGallery.appendChild(figure);
    });

    activateTrashButtons();
}



/* ===============================
   ACTIVER LES POUBELLES
=================================*/

function activateTrashButtons(){

    const trashIcons = document.querySelectorAll(".trash-icon");

    trashIcons.forEach(icon => {

        icon.addEventListener("click", async function(){

            const id = this.dataset.id;
            const token = localStorage.getItem("token");

            try{

                const response = await fetch(`http://localhost:5678/api/works/${id}`,{
                    method:"DELETE",
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                });

                if(response.ok){

                    // supprime de allWorks
                    window.allWorks = window.allWorks.filter(work => work.id != id);

                    // refresh modal
                    displayModalWorks(window.allWorks);

                    // refresh galerie principale
                    displayWorks(window.allWorks);
                }

            }catch(error){
                console.log("Erreur suppression :", error);
            }

        });

    });

}


