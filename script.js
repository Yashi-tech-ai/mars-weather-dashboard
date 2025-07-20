fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const cardsContainer = document.getElementById("cards");
    const sols = data.sols;

    sols.forEach(day => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>Sol ${day.sol}</h3>
        <p>Temp: ${day.temperature}°C</p>
        <p>Wind: ${day.wind} m/s</p>
        <p>Pressure: ${day.pressure} Pa</p>
      `;
      cardsContainer.appendChild(card);
    });

    const ctx = document.getElementById('weatherChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: sols.map(s => `Sol ${s.sol}`),
        datasets: [{
          label: 'Temperature (°C)',
          data: sols.map(s => s.temperature),
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
          fill: true
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: 'white',
              boxWidth: 12,
              padding: 10
            }
          }
        },
        scales: {
          x: {
            ticks: { color: 'white' }
          },
          y: {
            reverse: false,
            ticks: { color: 'white' }
          }
        }
      }
    });
  });
