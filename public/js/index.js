const form = document.getElementById('lookupForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('lookupEmail').value;
  const res = await fetch(`/api/my-events?email=${email}`);
  const events = await res.json();

  const list = document.getElementById('eventList');
  list.innerHTML = '';
  events.forEach(event => {
    const li = document.createElement('li');
    li.textContent = `${event.fullname} registered for ${event.event}`;
    list.appendChild(li);
  });
});