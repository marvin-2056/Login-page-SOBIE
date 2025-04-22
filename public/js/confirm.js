setTimeout(() => {
  const confirmation = document.getElementById('confirmation');
  if (confirmation) confirmation.style.display = 'none';
}, 3000);

const name = sessionStorage.getItem("regName");
const email = sessionStorage.getItem("regEmail");

if (!name || !email) {
  document.getElementById("event-list-title").textContent = "Error: Name or email not found.";
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
  const title = document.getElementById("event-list-title");
  const list = document.getElementById("event-list");

  if (!data.length) {
    title.textContent = "No registrations found.";
    return;
  }

  title.textContent = `Hello ${name}, here are your registered events:`;
  list.innerHTML = "";

  // Show all events
  data.forEach(reg => {
    const item = document.createElement("li");
    item.textContent = `${reg.event} - ${reg.school} - Student: ${reg.student}, First Time: ${reg.firstTime}`;
    list.appendChild(item);
  });

  // Show details for the most recent event
  const latest = data[0];
  const event = eventData[latest.event];

  if (!event) {
    document.getElementById("event-title").textContent = `Event details not found for ${latest.event}.`;
    return;
  }

  document.getElementById("event-title").textContent = event.title;
  document.getElementById("event-description").textContent = event.description;
  document.getElementById("event-date").textContent = `Date: ${event.date}`;
  document.getElementById("event-time").textContent = `Time: ${event.time}`;
  document.getElementById("event-location").textContent = `Location: ${event.location}`;

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
