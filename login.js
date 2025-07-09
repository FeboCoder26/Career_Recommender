document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorMsg = document.getElementById("error-msg");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Simple hardcoded login for now
    if (email === "test@user.com" && password === "123456") {
      localStorage.setItem("user", email);
      window.location.href = "career.html";
    } else {
      errorMsg.textContent = "❌ Invalid credentials. Try test@user.com / 123456";
    }
  });
});
