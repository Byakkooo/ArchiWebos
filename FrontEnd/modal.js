document.addEventListener("DOMContentLoaded", function(){

    /* ================= MODALE ================= */

    const modal = document.getElementById("modal");
    const openBtn = document.querySelector("#portfolio span");
    const closeBtn = document.querySelector(".close-modal");
    const addPhotoBtn = document.getElementById("show-add-photo");

    const galleryView = document.getElementById("modal-gallery-view");
    const formView = document.getElementById("modal-form-view");
    const backArrow = document.getElementById("back-arrow");

    openBtn.addEventListener("click", function(){
        modal.classList.remove("hidden");
        displayModalWorks(window.allWorks);
    });

    closeBtn.addEventListener("click", function(){
        modal.classList.add("hidden");
    });

    modal.addEventListener("click", function(e){
        if(e.target === modal){
            modal.classList.add("hidden");
        }
    });

    addPhotoBtn.addEventListener("click", function(){
        galleryView.classList.add("hidden");
        formView.classList.remove("hidden");
    });

    backArrow.addEventListener("click", function(){
        formView.classList.add("hidden");
        galleryView.classList.remove("hidden");
    });


    /* ================= FORMULAIRE ================= */

    const form = document.getElementById("photo-form");
    const imageInput = document.getElementById("image-input");
    const preview = document.getElementById("image-preview");
    const uploadIcon = document.querySelector(".upload-icon");
    const uploadButton = document.querySelector(".upload-button");
    const uploadInfo = document.querySelector(".upload-info");

    const titleInput = document.getElementById("title");
    const categorySelect = document.getElementById("category");
    const submitBtn = document.getElementById("submit-btn");

    function checkFormValidity(){
        const image = imageInput.files.length > 0;
        const title = titleInput.value.trim() !== "";
        const category = categorySelect.value !== "";

        if(image && title && category){
            submitBtn.disabled = false;
            submitBtn.classList.add("active");
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove("active");
        }
    }

    imageInput.addEventListener("change", function(){

        checkFormValidity();

        const file = this.files[0];

        if(file){
            preview.src = URL.createObjectURL(file);
            preview.classList.remove("hidden");

            uploadIcon.style.display = "none";
            uploadButton.style.display = "none";
            uploadInfo.style.display = "none";
        }
    });

    titleInput.addEventListener("input", checkFormValidity);
    categorySelect.addEventListener("change", checkFormValidity);


    form.addEventListener("submit", async function(e){

        e.preventDefault();

        const image = imageInput.files[0];
        const title = titleInput.value.trim();
        const category = categorySelect.value;
        const token = localStorage.getItem("token");

        if(!image || !title || !category){
            alert("Merci de remplir tous les champs.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("category", category);

        try {

            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if(!response.ok){
                throw new Error("Erreur lors de l'ajout");
            }

            const newWork = await response.json();

            window.allWorks.push(newWork);
            displayWorks(window.allWorks);
            displayModalWorks(window.allWorks);

            /* RESET */

            form.reset();
            preview.classList.add("hidden");

            uploadIcon.style.display = "block";
            uploadButton.style.display = "inline-block";
            uploadInfo.style.display = "block";

            submitBtn.disabled = true;
            submitBtn.classList.remove("active");

            // Retour à la galerie
            formView.classList.add("hidden");
            galleryView.classList.remove("hidden");

        } catch(error){
            console.error("Erreur :", error);
        }

    });

});


/* ================= CATEGORIES ================= */

async function loadCategories(){

    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    const select = document.getElementById("category");

    categories.forEach(cat => {

        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;

        select.appendChild(option);
    });
}

loadCategories();


/* ================= MODAL WORKS ================= */

function displayModalWorks(works){

    const modalGallery = document.querySelector(".modal-gallery");
    modalGallery.innerHTML = "";

    works.forEach(work => {

        const figure = document.createElement("figure");

        figure.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            <i class="fa-solid fa-trash-can trash-icon" data-id="${work.id}"></i>
        `;

        modalGallery.appendChild(figure);
    });

    activateTrashButtons();
}


/* ================= DELETE ================= */

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

                    window.allWorks = window.allWorks.filter(work => work.id != id);

                    displayModalWorks(window.allWorks);
                    displayWorks(window.allWorks);
                }

            }catch(error){
                console.log("Erreur suppression :", error);
            }

        });

    });

}
