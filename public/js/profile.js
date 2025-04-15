document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    if (result.success) {
        document.getElementById('message').textContent = "Profile updated!";
        setTimeout(() => { window.location.href = '/home'; }, 1500);
    } else {
        document.getElementById('message').textContent = "Error: " + result.message;
    }
});