// career.js
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
  const skillsBox = document.getElementById("skillsBox");

  // Populate skills dynamically when a stream is selected
  eduSelect.addEventListener("change", () => {
    const stream = eduSelect.value;
    skillsBox.innerHTML = "";

    if (skillsMap[stream]) {
      skillsMap[stream].forEach(skill => {
        const id = `skill-${skill.replace(/\s+/g, "-").toLowerCase()}`;
        skillsBox.insertAdjacentHTML(
          "beforeend",
          `<label for="${id}" style="display:inline-block; margin:5px 10px;">
            <input type="checkbox" id="${id}" value="${skill}"> ${skill}
          </label>`
        );
      });
    }
  });

  // Handle form submission
  document.getElementById("careerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim() || "Guest";
    document.getElementById("user").innerText = name;

    const education = eduSelect.value;
    const interests = document.getElementById("interests").value.toLowerCase();
    const selectedSkills = [...document.querySelectorAll("#skillsBox input:checked")]
      .map(cb => cb.value);

    if (!education || selectedSkills.length === 0) {
      document.getElementById("results").innerHTML = `
        <p style="color:red;">Please select a stream and at least one skill.</p>`;
      document.getElementById("results").style.display = "block";
      return;
    }

    try {
      const careers = await fetch("careerData.json").then(res => res.json());

      const matched = Object.values(careers)
        .map(career => {
          const skillMatch = career.skills.filter(skill => selectedSkills.includes(skill));
          const eduMatch = career.education.includes(education);
          const interestMatch = career.keywords.some(kw => interests.includes(kw));
          const score = skillMatch.length * 40 + (eduMatch ? 30 : 0) + (interestMatch ? 30 : 0);
          return { ...career, score };
        })
        .filter(c => c.score > 0)
        .sort((a, b) => b.score - a.score);

      showResults(matched, name);
    } catch (err) {
      document.getElementById("results").innerHTML = `
        <p style="color:red;">Error loading career data. Please check your JSON file or file path.</p>`;
      document.getElementById("results").style.display = "block";
    }
  });

  function showResults(list, userName) {
    const resultsBox = document.getElementById("results");
    resultsBox.style.display = "block";

    if (list.length === 0) {
      resultsBox.innerHTML = `<h3>No suitable match found</h3>
        <p>Try selecting more skills or interests, or explore certifications in new areas.</p>`;
      return;
    }

    let html = `<h3>Hi ${userName}! Here are your top career recommendations:</h3>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Career Path</th>
            <th>Key Skills</th>
            <th>Accuracy (%)</th>
          </tr>
        </thead><tbody>`;

    list.slice(0, 5).forEach(career => {
      html += `
        <tr>
          <td>${career.title}</td>
          <td>${career.skills.join(", ")}</td>
          <td style="text-align:center">${Math.min(100, career.score)}%</td>
        </tr>`;
    });

    html += `</tbody></table>`;
    resultsBox.innerHTML = html;
  }
});
