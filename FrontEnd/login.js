document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Supprime ancien message d’erreur s’il existe
    const existingError = document.querySelector(".login-error");
    if (existingError) {
      existingError.remove();
    }

    // IDENTIFIANTS DE TEST (à remplacer par API plus tard)
    if (email === "admin@test.com" && password === "1234") {
      // Stockage du token
      localStorage.setItem("token", "admin-auth-token");

      // Redirection vers la page d’accueil
      window.location.href = "index.html";
    } else {
      // Création dynamique du message d’erreur
      const error = document.createElement("p");
      error.classList.add("login-error");
      error.textContent = "E-mail ou mot de passe incorrect";
      error.style.color = "#d65353";
      error.style.marginTop = "20px";
      error.style.textAlign = "center";
      error.style.fontSize = "14px";
      error.style.fontWeight = "500";

      form.appendChild(error);
    }
  });
});
