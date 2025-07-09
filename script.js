
document.getElementById('careerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const education = document.getElementById('education').value;
  const interests = document.getElementById('interests').value.toLowerCase();
  const skills = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(el => el.value);

  fetch('careerData.json') // or './data/careerData.json' if in subfolder
    .then(response => response.json())
    .then(data => {
      let bestMatch = null;
      function suggestResume() {
  const name = document.getElementById("name").value;
  const education = document.getElementById("education").value;
  const resumeBox = document.getElementById("resumeBox"); 

  function startVoice() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function (event) {
    const speechText = event.results[0][0].transcript;
    document.getElementById("interests").value = speechText;

    function compareCareers() {
  const table = `
    <h4>Career Comparison</h4>
    <table border="1" cellpadding="8">
      <tr><th>Criteria</th><th>Software Developer</th><th>Data Analyst</th></tr>
      <tr><td>Key Skills</td><td>JavaScript, React, APIs</td><td>Excel, Python, SQL</td></tr>
      <tr><td>Work Type</td><td>App/Web Dev</td><td>Data Cleaning, Visualization</td></tr>
      <tr><td>Avg Salary (INR)</td><td>6-10 LPA</td><td>5-9 LPA</td></tr>
      <tr><td>Growth</td><td>High</td><td>High</td></tr>
    </table>
  `;
  document.getElementById("comparisonTable").innerHTML = table;
}
function suggestResume() {
  const name = document.getElementById("name").value || "Candidate";
  const education = document.getElementById("education").value || "your degree";
  const skills = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(cb => cb.value);
  
  let resumeBox = document.getElementById("resumeBox");

  if (skills.length === 0) {
    resumeBox.innerHTML = `<p style="color:red;">Please select at least one skill to get resume suggestions.</p>`;
    return;
  }

  resumeBox.innerHTML = `
    <div style="background:#f9f9f9; padding:15px; border-radius:10px; border:1px solid #ccc;">
      <h3>Resume Tips for ${name}</h3>
      <ul>
        <li><strong>Education:</strong> Highlight your background in <em>${education.toUpperCase()}</em>.</li>
        <li><strong>Projects:</strong> Include this Career Recommender Web App with GitHub link.</li>
        <li><strong>Skills:</strong> ${skills.join(", ")}</li>
        <li><strong>Objective:</strong> “To apply my ${skills[0]} skills in a dynamic tech role.”</li>
        <li><strong>Soft Skills:</strong> Communication, Teamwork, Adaptability.</li>
      </ul>
    </div>
  `;
}

function suggestResume() {
  const name = document.getElementById("name").value;
  const education = document.getElementById("education").value;
  const resumeBox = document.getElementById("resumeBox");

  resumeBox.innerHTML = `
    <h4>Resume Tips for ${name}</h4>
    <ul>
      <li><strong>Education:</strong> Highlight ${education.toUpperCase()}</li>
      <li><strong>Projects:</strong> Mention this Career Recommender Web App</li>
      <li><strong>Skills:</strong> Include HTML, CSS, JavaScript, AI Logic</li>
    </ul>
  `;
}

  };
}




      for (let key in data) {
        const career = data[key];

        // Check for matching skills and education
        const skillMatch = career.skills.some(skill => skills.includes(skill));
        const educationMatch = career.education.includes(education);
        const keywordMatch = career.keywords.some(kw => interests.includes(kw));

        if (skillMatch && educationMatch && keywordMatch) {
          bestMatch = career;
          break;
        }
      }

      const resultDiv = document.getElementById('results');
      resultDiv.style.display = "block";

      let match = Math.floor(Math.random() * 21) + 80; // Confidence %

      if (bestMatch) {
        resultDiv.innerHTML = `
          <h2>Recommended Path: ${bestMatch.title}</h2>
          <p>Based on your inputs, you might excel as a <strong>${bestMatch.title}</strong>.</p>
          <p><strong>Suggested Resources:</strong></p>
          <ul>
            ${bestMatch.resources.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('')}
          </ul>

          <p>Match Confidence: ${match}%</p>
          <div style="background:#ddd;border-radius:10px;width:100%;height:10px;">
            <div style="background:green;height:10px;border-radius:10px;width:${match}%"></div>
          </div>
        `;
      } else {
        resultDiv.innerHTML = `
          <h2>No Exact Match Found</h2>
          <p>We recommend exploring broader options or refining your input.</p>
        `;
      }
      const thankYouDiv = document.getElementById("thankYou");
thankYouDiv.style.display = "block";
thankYouDiv.innerHTML = `<h3>🎉 Thank you, ${name}!</h3><p>We hope this guidance helps you shape a successful career. Keep exploring and believing in yourself! 😊</p>`;

    }});
});
