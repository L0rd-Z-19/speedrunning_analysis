import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sql:///games.sql")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Game = Base.classes.game

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def games():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(Game.Rank, Game.Name, Game.Platform, Game.Year, Game.Genre,
    	Game.Publisher, Game.NA_Sales, Game.EU_Sales, JP_Sales, Other_Sales, Global_Sales).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_games = []
    for Rank, Name, Platform, Year, Genre, Publisher, NA_Sales,
    EU_Sales, JP_Sales, Other_Sales, Global_Sales in results:
        games_dict = {}
        games_dict["Rank"] = Rank
        games_dict["Name"] = Name
        games_dict["Platform"] = Platform
        games_dict["Year"] = Year
        games_dict["Genre"] = Genre
        games_dict["Publisher"] = Publisher
        games_dict["NA_Sales"] = NA_Sales
        games_dict["EU_Sales"] = EU_Sales
        games_dict["JP_Sales"] = JP_Sales
        games_dict["Other_Sales"] = Other_Sales
        games_dict["Global_Sales"] = Global_Sales
        all_games.append(games_dict)

    return jsonify(all_games)


if __name__ == '__main__':
    app.run(debug=True)
