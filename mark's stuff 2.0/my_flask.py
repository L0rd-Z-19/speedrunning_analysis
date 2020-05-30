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

    # Extract data from DB
    welcoming = "Welcome to our site! Use the route /data to access our game data."

    return welcoming

@app.route("/data")

def games():

    # Extract data from DB
    conn = engine.connect()
    data = pd.read_sql('SELECT * FROM games', conn)

    #Convert to dictionary
    chart_data = data.to_dict(orient='records')
    # chart_data = json.dumps(chart_data)
    # chart_data = json.loads(chart_data)

    return jsonify(chart_data)

if __name__ == '__main__':
    app.run(debug=True)