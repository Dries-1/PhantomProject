document.getElementById("startBtn").addEventListener("click", async function() {
    const url = "https://raw.githubusercontent.com/JohnaaQS/ICT-projecten/main/Programma/weather_data.csv";
 
    try {
        const response = await fetch(url);
        const data = await response.text();
        const rows = data.split("\n").map(row => row.split(","));
       
        const tijd = [];
        const temperatuur = [];
        const apparaatTemp = [];
        const windsnelheid = [];
 
        // Kolomnamen matchen en data verwerken
        const headers = rows[0].map(header => header.trim());
        const tijdIndex = headers.indexOf("Tijdstip");
        const tempIndex = headers.indexOf("Temperatuur (°C)");
        const appTempIndex = headers.indexOf("Apparaat Temperatuur (°C)");
        const windIndex = headers.indexOf("Windsnelheid (m/s)");
 
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
 
            if (row.length > 1) {
                tijd.push(row[tijdIndex]);
                temperatuur.push(parseFloat(row[tempIndex]) || null);
                apparaatTemp.push(parseFloat(row[appTempIndex]) || null);
                windsnelheid.push(parseFloat(row[windIndex]) || null);
            }
        }
 
        // Temperatuur grafiek genereren
        const tempCtx = document.getElementById("tempChart").getContext("2d");
        new Chart(tempCtx, {
            type: "line",
            data: {
                labels: tijd,
                datasets: [
                    {
                        label: "Apparaat Temp (°C)",
                        data: apparaatTemp,
                        borderColor: "red",
                        fill: false
                    },
                    {
                        label: "Omgeving Temp (°C)",
                        data: temperatuur,
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
 
        // Windsnelheid grafiek genereren
        const windCtx = document.getElementById("windChart").getContext("2d");
        new Chart(windCtx, {
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
        alert("Er is een fout opgetreden bij het laden van de gegevens.");
    }
});
 
 