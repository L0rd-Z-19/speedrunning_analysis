# Dependencies
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import python.py

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/speedrun_app")

# Route to render index.html template using data from Mongo
@app.route("/")
def index():

    # Find one record of data from the mongo database
    data = mongo.db.collection.find_one()

    # Return template and data
    return render_template("index.html", speedrun=data)


# Route that will trigger the scrape function
@app.route("/python")
def scrape():

    # Run the scrape function
    run_data = python.scrape()

    # Update the Mongo database using update and upsert=True
    mongo.db.collection.update({}, run_data, upsert=True)

    # Redirect back to home page
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)