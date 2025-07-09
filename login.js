document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorMsg = document.getElementById("error-msg");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // ✅ ALLOW ALL EMAILS AND PASSWORDS (INSECURE MODE)
    if (email && password) {
      localStorage.setItem("user", email); // Store the email (or dummy session)
      window.location.href = "career.html"; // Redirect to career page
    } else {
      errorMsg.textContent = "❌ Please fill both fields.";
    }
  });
});
