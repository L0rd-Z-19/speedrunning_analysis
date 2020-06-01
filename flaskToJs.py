# Dependencies
import sqlalchemy
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template
import json

# Database Setup
rds_connection_string = "postgres:postgres@localhost:5432/game_db"
engine = create_engine(f'postgresql://{rds_connection_string}')

conn = engine.connect()

# Flask Setup
app = Flask(__name__)

# Route to homepage
@app.route("/")
def welcome():
    return render_template("index.html")

@app.route("/analysis")
def analysis():
    return render_template("analysis.html")

@app.route("/data")
def data():
    return render_template("data.html")

@app.route("/json")
def games():
    # Extract data from DB
    conn = engine.connect()
    data = pd.read_sql('SELECT * FROM games', conn)

    #Convert to dictionary
    chart_data = data.to_dict(orient='records')

    return jsonify(chart_data)

if __name__ == '__main__':
    app.run(debug=True)