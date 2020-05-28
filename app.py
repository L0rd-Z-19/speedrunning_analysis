# Dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify

# Database Setup
engine = create_engine("sql:///game_db.sql")

# Reflect existing database into new model
Base = automap_base()

# Reflect tables
Base.prepare(engine, reflect=True)

# Save reference to table
Game = Base.classes.game

# Flask Setup
app = Flask(__name__)

# Route to homepage
@app.route("/")

def games():

    # Link from Python to the DB
    session = Session(engine)

    # Query all games
    results = session.query(Game.rank, Game.name, Game.platform, Game.year, Game.genre,
    	Game.publisher, Game.na_sales, Game.eu_sales, Game.jp_sales,
    	Game.other_sales, Game.global_sales).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_games
    all_games = []
    for rank, name, platform, year, genre, publisher, na_sales, eu_sales, jp_sales, other_sales, global_sales in results:
        games_dict = {}
        games_dict["Rank"] = rank
        games_dict["Name"] = name
        games_dict["Platform"] = platform
        games_dict["Year"] = year
        games_dict["Genre"] = genre
        games_dict["Publisher"] = publisher
        games_dict["NA_Sales"] = na_sales
        games_dict["EU_Sales"] = eu_sales
        games_dict["JP_Sales"] = jp_sales
        games_dict["Other_Sales"] = other_sales
        games_dict["Global_Sales"] = global_sales
        all_games.append(games_dict)

    return jsonify(all_games)


if __name__ == '__main__':
    app.run(debug=True)
