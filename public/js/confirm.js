setTimeout(() => {
  const confirmation = document.getElementById('confirmation');
  if (confirmation) confirmation.style.display = 'none';
}, 3000);

const name = sessionStorage.getItem("regName");
const email = sessionStorage.getItem("regEmail");

if (!name || !email) {
  document.getElementById("event-info").innerHTML = `
    <p>Error: Name or email not found. Please register again.</p>
  `;
  throw new Error("Missing name/email in sessionStorage");
}


const eventData = {
  "Conference": {
    title: "Annual Conference",
    description: "A full-day event with guest speakers, panels, and networking.",
    date: "May 10, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "1 Harrison Plaza, Florence, AL 35632",
    coordinates: { lat: 34.8054, lng: -87.6773 }
  },
  "General Admission": {
    title: "General Admission",
    description: "You are registered without a specific event selected.",
    date: "TBA",
    time: "TBA",
    location: "Main Hall, Campus Center",
    coordinates: { lat: 34.8054, lng: -87.6773 }
  }
};

fetch("/api/my-events", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name, email })
})
.then(res => res.json())
.then(data => {
  const container = document.getElementById('event-info');
  if (!data.length) {
    container.innerHTML = `<p>No registration found.</p>`;
    return;
  }

  const eventName = data[0].event;
  const event = eventData[eventName];

  if (!event) {
    container.innerHTML = `<p>Event details not found for ${eventName}.</p>`;
    return;
  }

  container.innerHTML = `
    <h3>Hi ${name}, you're registered for:</h3>
    <p><strong>${event.title}</strong></p>
    <p>${event.description}</p>
    <p><strong>Date:</strong> ${event.date}</p>
    <p><strong>Time:</strong> ${event.time}</p>
    <p><strong>Location:</strong> ${event.location}</p>
    <div id="map"></div>
  `;

  const map = L.map('map').setView([event.coordinates.lat, event.coordinates.lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.marker([event.coordinates.lat, event.coordinates.lng]).addTo(map)
    .bindPopup(event.title)
    .openPopup();
})
.catch(err => {
  console.error("Error fetching registration info:", err);
});
