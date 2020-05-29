# Dependencies
import sqlalchemy
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
import json

# Database Setup
rds_connection_string = "postgres:postgres@localhost:5432/game_db"
engine = create_engine(f'postgresql://{rds_connection_string}')

conn = engine.connect()

# Flask Setup
app = Flask(__name__)

# Route to homepage
@app.route("/")

def games():

    # Extract data from DB
    conn = engine.connect()
    data = pd.read_sql('SELECT * FROM games', conn)

    #Convert to dictionary
    games_dict = {}

    col_0 = data['rank'].to_dict()
    col_1 = data['name'].to_dict()
    col_2 = data['platform'].to_dict()
    col_3 = data['year'].to_dict()
    col_4 = data['genre'].to_dict()
    col_5 = data['publisher'].to_dict()
    col_6 = data['na_sales'].to_dict()
    col_7 = data['eu_sales'].to_dict()
    col_8 = data['jp_sales'].to_dict()
    col_9 = data['other_sales'].to_dict()
    col_10 = data['global_sales'].to_dict()

    
    games_dict['rank'] = col_0
    games_dict['name'] = col_1
    games_dict['platform'] = col_2
    games_dict['year'] = col_3
    games_dict['genre'] = col_4
    games_dict['publisher'] = col_5
    games_dict['na_sales'] = col_6
    games_dict['eu_sales'] = col_7
    games_dict['jp_sales'] = col_8
    games_dict['other_sales'] = col_9
    games_dict['global_sales'] = col_10

    return games_dict


if __name__ == '__main__':
    app.run(debug=True)