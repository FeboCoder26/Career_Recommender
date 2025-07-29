
document.addEventListener("DOMContentLoaded", () => {
  const skillsMap = {
    science: ["Python", "Data Analysis", "Mathematics", "Problem Solving"],
    commerce: ["Accounting", "Financial Analysis", "Excel", "Taxation"],
    marketing: ["SEO", "Social Media", "Copywriting", "Digital Ads"],
    humanities: ["Writing", "Public Speaking", "Research", "Critical Thinking"],
    arts: ["Sketching", "Illustration", "Photography", "Video Editing"],
    vocational: ["Electrical Repair", "Carpentry", "Plumbing", "Automotive"],
    bca: ["HTML", "CSS", "JavaScript", "Database Basics"],
    btech: ["C/C++", "Java", "DSA", "Cloud Fundamentals"]
  };

  const eduSelect = document.getElementById("education");
  const skillsBox  = document.getElementById("skillsBox");

  eduSelect.addEventListener("change", () => {
    const stream = eduSelect.value;
    skillsBox.innerHTML = "";
    if (!stream || !skillsMap[stream]) return;

    skillsMap[stream].forEach(skill => {
      const id = `skill-${skill.replace(/\s+/g, "-")}`;
      skillsBox.insertAdjacentHTML(
        "beforeend",
        `<label for="${id}">
           <input type="checkbox" id="${id}" value="${skill}"> ${skill}
         </label>`
      );
    });
  });

  document.getElementById("careerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim() || "Candidate";
    const education = eduSelect.value;
    const interests = document.getElementById("interests").value.toLowerCase();
    const skills = [...document.querySelectorAll("#skillsBox input:checked")].map(cb => cb.value);

    const careers = await fetch("careerData.json").then(r => r.json());

    const matches = Object.values(careers)
      .map(c => {
        const hitSkills = c.skills.filter(s => skills.includes(s));
        const hitEdu = c.education.includes(education);
        const hitKw = c.keywords.some(kw => interests.includes(kw.toLowerCase()));

        const score = (hitSkills.length * 40) + (hitEdu ? 30 : 0) + (hitKw ? 30 : 0);
        return { ...c, score };
      })
      .filter(c => c.score > 0)
      .sort((a, b) => b.score - a.score);

    showResults(matches, name);
  });

  function showResults(list, userName) {
    const box = document.getElementById("results");
    box.style.display = "block";

    if (list.length === 0) {
      box.innerHTML = `<h3>No suitable match found</h3><p>Try selecting more skills or refining your interests.</p>`;
      return;
    }

    let html = `<h3>Hi ${userName}! Top career suggestions</h3>
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr>
            <th style="text-align:left">Career Path</th>
            <th style="text-align:left">Key Skills</th>
            <th style="text-align:right">Accuracy&nbsp;(%)</th>
          </tr>
        </thead><tbody>`;

    list.slice(0, 5).forEach(c => {
      const accuracy = Math.round((c.score / 100) * 100);
      html += `
        <tr>
          <td>${c.title}</td>
          <td>${c.skills.join(", ")}</td>
          <td style="text-align:right">${accuracy}</td>
        </tr>`;
    });

    html += "</tbody></table>";
    box.innerHTML = html;
  }
});
