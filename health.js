async function checkServerHealth() {
  const res = await fetch("https://animal-tracking.onrender.com/healthcheck");
  const response = await res.json();
  console.log(response);
}

const interval = setInterval(() => {
  checkServerHealth();
}, 10000);
