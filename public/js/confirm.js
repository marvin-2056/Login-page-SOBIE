setTimeout(() => {
  const confirmation = document.getElementById('confirmation');
  if (confirmation) confirmation.style.display = 'none';
}, 3000);

const name = sessionStorage.getItem("regName");
const email = sessionStorage.getItem("regEmail");

if (!name || !email) {
  document.getElementById("event-list-title").textContent = "⚠️ Please register again — session expired.";
  throw new Error("Missing sessionStorage data");
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
  if (!data.length) {
    document.getElementById("event-list-title").textContent = "No registration found.";
    return;
  }

  // Show list of registered events
  document.getElementById("event-list-title").textContent = `Hi ${name}, you're registered for:`;
  const ul = document.getElementById("event-list");
  data.forEach(reg => {
    const li = document.createElement("li");
    li.textContent = reg.event;
    ul.appendChild(li);
  });

  // Get the most recent registration
  const latest = data[data.length - 1];
  const event = eventData[latest.event];

  if (!event) {
    document.getElementById("event-title").textContent = `Event details not found for ${latest.event}.`;
    return;
  }

  // Fill event detail section
  document.getElementById("event-title").textContent = event.title;
  document.getElementById("event-description").textContent = event.description;
  document.getElementById("event-date").textContent = `Date: ${event.date}`;
  document.getElementById("event-time").textContent = `Time: ${event.time}`;
  document.getElementById("event-location").textContent = `Location: ${event.location}`;

  // Show Leaflet map
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
  document.getElementById("event-list-title").textContent = "Something went wrong.";
});
