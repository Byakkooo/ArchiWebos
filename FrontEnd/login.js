document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

   
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      // si mauvais login
      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      // stocker le token
      localStorage.setItem("token", data.token);

      // redirection
      window.location.href = "index.html";

    } catch (error) {

      const errorMsg = document.createElement("p");
      errorMsg.classList.add("login-error");
      errorMsg.textContent = "E-mail ou mot de passe incorrect";

      errorMsg.style.color = "#d65353";
      errorMsg.style.marginTop = "20px";
      errorMsg.style.textAlign = "center";
      errorMsg.style.fontSize = "14px";
      errorMsg.style.fontWeight = "500";

      form.appendChild(errorMsg);
    }

  });

});
