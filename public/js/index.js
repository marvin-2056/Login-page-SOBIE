document.querySelector("form").addEventListener("submit", () => {
  const name = document.querySelector('input[name="fullname"]').value;
  const email = document.querySelector('input[name="email"]').value;
  sessionStorage.setItem("regName", name);
  sessionStorage.setItem("regEmail", email);
});
