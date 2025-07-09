document.getElementById("resumeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const education = document.getElementById("education").value;
  const skills = document.getElementById("skills").value;

  const suggestion = `
    <h3>Hi ${name}, here are some resume tips:</h3>
    <ul>
      <li><strong>Education:</strong> Highlight your ${education} background.</li>
      <li><strong>Skills:</strong> ${skills}</li>
      <li><strong>Projects:</strong> Add this career recommender app to your resume!</li>
      <li><strong>Objective:</strong> Align your objective with your top skill: ${skills.split(',')[0].trim()}</li>
    </ul>
  `;

  document.getElementById("suggestions").innerHTML = suggestion;
});
