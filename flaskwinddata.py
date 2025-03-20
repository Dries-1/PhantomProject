from flask import Flask, jsonify
import pandas as pd
import requests
import io

app = Flask(__name__)

# URL van de CSV op GitHub
GITHUB_CSV_URL = "https://raw.githubusercontent.com/JohnaaQS/ICT-projecten/main/Programma/weather_data.csv"

def fetch_csv_data():
    """Haalt de CSV-data op van GitHub en zet deze om naar een JSON-formaat."""
    response = requests.get(GITHUB_CSV_URL)
    if response.status_code == 200:
        df = pd.read_csv(io.StringIO(response.text))
        return df.to_dict(orient="records")
    return []

@app.route("/api/winddata", methods=["GET"])
def get_winddata():
    """Geeft de winddata terug als JSON."""
    data = fetch_csv_data()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
