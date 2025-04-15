// confirmation.js

// Fade out success message after 3 seconds
setTimeout(() => {
  const confirmation = document.getElementById('confirmation');
  if (confirmation) confirmation.style.display = 'none';
}, 3000);

// Get query params from URL (optional if using sessionStorage in future)
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
const email = params.get('email');

// Send a POST request to hide the data from the URL
fetch("/api/my-events", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name, email })
})
.then(res => res.json())
.then(data => {
  const resultDiv = document.getElementById('event-info');
  if (!data.length) {
    resultDiv.innerHTML = `<p>No registrations found for <strong>${email}</strong>.</p>`;
  } else {
    resultDiv.innerHTML = `
      <h3>Hello, ${name} 👋</h3>
      <p>You are registered for:</p>
      <ul>
        ${data.map(reg => `
          <li><strong>${reg.event}</strong> (on ${new Date(reg.createdAt).toLocaleString()})</li>
        `).join('')}
      </ul>
    `;
  }
})
.catch(err => {
  console.error("Error fetching registration info:", err);
});
