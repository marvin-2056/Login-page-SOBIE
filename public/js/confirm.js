

// Fade out the confirmation message after 3 seconds
setTimeout(() => {
    const confirmation = document.getElementById('confirmation');
    if (confirmation) confirmation.style.display = 'none';
  }, 3000);
  
  // Get query parameters
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const email = params.get('email');
  
  // Fetch registration info from backend
  fetch(`/api/my-events?email=${email}&name=${name}`)
    .then(res => res.json())
    .then(data => {
      const resultDiv = document.getElementById('result');
      if (data.length === 0) {
        resultDiv.innerHTML = `<p>No registrations found for ${email}.</p>`;
      } else {
        resultDiv.innerHTML = `<h3>You're registered for:</h3><ul>` +
          data.map(item => `<li><strong>${item.event}</strong> on ${new Date(item.createdAt).toLocaleString()}</li>`).join('') +
          `</ul>`;
      }
    });
  