document.getElementById("startBtn").addEventListener("click", async function() {

    const url = "https://raw.githubusercontent.com/JohnaaQS/ICT-projecten/main/Programma/weather_data.csv";

    try {

        const response = await fetch(url);

        const data = await response.text();

        const rows = data.split("\n").map(row => row.split(","));

        const tijd = [];

        const tempApparaat = [];

        const tempOmgeving = [];

        const windsnelheid = [];

        for (let i = 1; i < rows.length; i++) {

            if (rows[i].length > 3) {

                tijd.push(rows[i][0]);

                tempApparaat.push(parseFloat(rows[i][1]) || 0);

                tempOmgeving.push(parseFloat(rows[i][2]) || 0);

                windsnelheid.push(parseFloat(rows[i][3]) || 0);

            }

        }
 
        const ctxTemp = document.getElementById("tempChart").getContext("2d");

        new Chart(ctxTemp, {

            type: "line",

            data: {

                labels: tijd,

                datasets: [

                    {

                        label: "Apparaat Temp (°C)",

                        data: tempApparaat,

                        borderColor: "red",

                        fill: false

                    },

                    {

                        label: "Omgeving Temp (°C)",

                        data: tempOmgeving,

                        borderColor: "blue",

                        fill: false

                    }

                ]

            },

            options: {

                responsive: true,

                scales: {

                    y: { min: 0, max: 50 }

                }

            }

        });
 
        const ctxWind = document.getElementById("windChart").getContext("2d");

        new Chart(ctxWind, {

            type: "line",

            data: {

                labels: tijd,

                datasets: [

                    {

                        label: "Windsnelheid (m/s)",

                        data: windsnelheid,

                        borderColor: "purple",

                        fill: false

                    }

                ]

            },

            options: {

                responsive: true,

                scales: {

                    y: { min: 0, max: 20 }

                }

            }

        });

    } catch (error) {

        console.error("Fout bij ophalen van CSV:", error);

    }

});

 