document.getElementById("user").textContent = localStorage.getItem("userName") || "Guest";

document.getElementById("careerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const education = document.getElementById("education").value;
  const interests = document.getElementById("interests").value.toLowerCase();
  const skills = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(s => s.value);

  let recommendation = "<h3>Career Suggestion</h3>";

  if (skills.includes("Coding")) {
    recommendation += "<p><strong>Software Developer</strong> - Ideal for coders.</p>";
  } else if (skills.includes("Analytics")) {
    recommendation += "<p><strong>Data Analyst</strong> - Great for data lovers.</p>";
  } else if (skills.includes("Design")) {
    recommendation += "<p><strong>UI/UX Designer</strong> - Perfect for creatives.</p>";
  } else {
    recommendation += "<p><strong>Try exploring new certifications.</strong></p>";
  }

  document.getElementById("recommendation").innerHTML = recommendation;
});
