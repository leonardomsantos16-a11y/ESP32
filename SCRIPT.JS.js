const DATABASE_URL = "https://esp32-11d28-default-rtdb.firebaseio.com/";
const DATABASE_SECRET = "pXBRUOmqlAZFr6rXlWJMKK7QtXd5m7LR2QbH1BOH";

async function setLedStatus(value) {
  const url = `${DATABASE_URL}led_status.json?auth=${DATABASE_SECRET}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    });

    if (response.ok) {
      updateUI(value);
    } else {
      console.error("Erro no Firebase:", response.statusText);
      alert("Erro de comunicação com o banco.");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro de conexão.");
  }
}

function updateUI(status) {
  const statusText = document.getElementById("status-text");
  const ledRing = document.getElementById("led-ring");

  if (status === 1) {
    statusText.innerText = "LIGADO (1)";
    statusText.style.color = "#00ff88";
    ledRing.className = "led-ring on";
  } else {
    statusText.innerText = "DESLIGADO (0)";
    statusText.style.color = "#ff3366";
    ledRing.className = "led-ring off";
  }
}

async function fetchCurrentStatus() {
  const url = `${DATABASE_URL}led_status.json?auth=${DATABASE_SECRET}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      updateUI(data);
    }
  } catch (error) {
    console.error("Erro ao carregar o estado inicial:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchCurrentStatus);