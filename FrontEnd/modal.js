document.addEventListener("DOMContentLoaded", function(){

    const modal = document.getElementById("modal");
    const openBtn = document.getElementById("open-modal");
    const closeBtn = document.querySelector(".close-modal");


    openBtn.addEventListener("click", function(){
        modal.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", function(){
        modal.classList.add("hidden");
    });

    modal.addEventListener("click", function(e){
        if(e.target === modal){
            modal.classList.add("hidden");
        }
    });

});
