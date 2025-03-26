const csvUrl = "https://raw.githubusercontent.com/JohnaaQS/ICT-projecten/main/Programma/weather_data.csv";
 
async function fetchData() {

    const response = await fetch(csvUrl);

    const data = await response.text();
 
    const rows = data.split("\n").slice(1); // Eerste rij (headers) overslaan

    const tijdstip = [];

    const tempApparaat = [];

    const tempOmgeving = [];

    const windsnelheid = [];
 
    rows.forEach(row => {

        const columns = row.split(",");

        if (columns.length > 3) {  // Zorg dat er genoeg kolommen zijn

            const tijd = columns[0].trim();

            const apparaatTemp = parseFloat(columns[1].trim());

            const omgevingTemp = parseFloat(columns[2].trim());

            const wind = parseFloat(columns[3].trim());
 
            if (!isNaN(apparaatTemp) && !isNaN(omgevingTemp) && !isNaN(wind)) {

                tijdstip.push(tijd);

                tempApparaat.push(apparaatTemp);

                tempOmgeving.push(omgevingTemp);

                windsnelheid.push(wind);

            }

        }

    });
 
    return { tijdstip, tempApparaat, tempOmgeving, windsnelheid };

}
 
async function renderCharts() {

    const data = await fetchData();
 
    const ctxTemp = document.getElementById('tempChart').getContext('2d');

    new Chart(ctxTemp, {

        type: 'line',

        data: {

            labels: data.tijdstip,

            datasets: [

                {

                    label: 'Apparaat Temp (°C)',

                    data: data.tempApparaat,

                    borderColor: 'red',

                    backgroundColor: 'rgba(255, 0, 0, 0.2)',

                    fill: true

                },

                {

                    label: 'Omgeving Temp (°C)',

                    data: data.tempOmgeving,

                    borderColor: 'blue',

                    backgroundColor: 'rgba(0, 0, 255, 0.2)',

                    fill: true

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false, // Nu correct

            scales: {

                x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },

                y: { min: 0, max: 50 }

            }

        }

    });
 
    const ctxWind = document.getElementById('windChart').getContext('2d');

    new Chart(ctxWind, {

        type: 'line',

        data: {

            labels: data.tijdstip,

            datasets: [

                {

                    label: 'Windsnelheid (m/s)',

                    data: data.windsnelheid,

                    borderColor: 'purple',

                    backgroundColor: 'rgba(128, 0, 128, 0.2)',

                    fill: true

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false, // Nu correct

            scales: {

                x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },

                y: { min: 0, max: 20 }

            }

        }

    });

}
 
// Start de grafieken pas als op de knop wordt gedrukt

document.getElementById("startBtn").addEventListener("click", renderCharts);

 