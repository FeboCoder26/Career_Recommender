document.addEventListener("DOMContentLoaded", () => {
  const skillsMap = {
    science: ["Mathematics", "Critical Thinking", "Problem Solving", "Physics", "Biology"],
    commerce: ["Accounting", "Economics", "Financial Analysis", "Business Strategy", "Taxation"],
    marketing: ["SEO", "Copywriting", "Digital Ads", "Branding", "Content Marketing"],
    humanities: ["Writing", "Research", "Public Speaking", "Sociology", "Philosophy"],
    arts: ["Sketching", "Photography", "Illustration", "Animation", "Graphic Design"],
    vocational: ["Electrical Work", "Plumbing", "Welding", "Carpentry", "Mechanics"],
    bca: ["HTML", "CSS", "JavaScript", "C", "Java", "DBMS", "Problem Solving"],
    btech: ["Data Structures", "Java", "C++", "Python", "Computer Networks"]
  };

  const educationSelect = document.getElementById("education");
  const skillsBox = document.getElementById("skillsBox");
  const form = document.getElementById("careerForm");
  const resultsDiv = document.getElementById("results");

  // Update skills dynamically
  educationSelect.addEventListener("change", () => {
    const stream = educationSelect.value;
    skillsBox.innerHTML = "";

    if (skillsMap[stream]) {
      skillsMap[stream].forEach(skill => {
        const id = `skill-${skill.toLowerCase().replace(/\s+/g, "-")}`;
        skillsBox.innerHTML += `
          <label for="${id}">
            <input type="checkbox" id="${id}" value="${skill}"> ${skill}
          </label><br>
        `;
      });
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const stream = educationSelect.value;
    const interests = document.getElementById("interests").value.toLowerCase();
    const selectedSkills = Array.from(document.querySelectorAll("#skillsBox input:checked")).map(cb => cb.value);

    document.getElementById("user").innerText = name || "Guest";

    if (!stream || selectedSkills.length === 0) {
      resultsDiv.style.display = "block";
      resultsDiv.innerHTML = `<p style="color:red;">Please select a stream and at least one skill.</p>`;
      return;
    }

    // Mock career recommendations logic
    const sampleCareers = {
      science: ["Data Scientist", "Research Analyst", "Pharmacist", "AI Engineer"],
      commerce: ["Chartered Accountant", "Investment Banker", "Business Analyst"],
      marketing: ["Digital Marketer", "Content Strategist", "Brand Manager"],
      humanities: ["Psychologist", "Sociologist", "Journalist", "Teacher"],
      arts: ["Graphic Designer", "Animator", "Photographer"],
      vocational: ["Electrician", "Plumber", "Auto Technician"],
      bca: ["Frontend Developer", "Backend Developer", "QA Tester", "UI Designer"],
      btech: ["Software Engineer", "DevOps Engineer", "System Architect"]
    };

    const careers = sampleCareers[stream] || [];

    const recommendations = careers.map((career, i) => {
      const matchCount = Math.floor(Math.random() * selectedSkills.length + 1);
      const accuracy = Math.min(100, 60 + matchCount * 8); // mock % accuracy
      return {
        career,
        match: matchCount,
        accuracy: `${accuracy}%`
      };
    });

    // Render results
    resultsDiv.style.display = "block";
    resultsDiv.innerHTML = `
      <h3>Top Career Recommendations for You</h3>
      <table border="1" cellpadding="8" cellspacing="0">
        <tr>
          <th>Career Path</th>
          <th>Skill Match</th>
          <th>Estimated Accuracy</th>
        </tr>
        ${recommendations.map(r => `
          <tr>
            <td>${r.career}</td>
            <td>${r.match} skill(s)</td>
            <td>${r.accuracy}</td>
          </tr>
        `).join("")}
      </table>
    `;
  });
});
