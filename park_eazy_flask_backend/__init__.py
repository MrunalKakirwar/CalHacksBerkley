from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from park_eazy_flask_backend.routes.lender_routes import lender_routes

def create_app():
    app = Flask(__name__)

    CORS(app, resources={r"/*": {"origins": "*"}})
    print("IN RUN")


    # Use the MongoDB Atlas connection string from the environment or directly
    mongo_url = os.getenv('MONGO_URL', 'mongodb+srv://kd81:Mongo123@cluster0.1c2rs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    
    # Connect to MongoDB Atlas
    client = MongoClient(mongo_url)

    #client = MongoClient('mongodb://localhost:27017/')
    app.db = client['test'] 

    

    app.register_blueprint(lender_routes)

    # @app.before_request
    # def handle_preflight():
    #     if request.method == 'OPTIONS':
    #         # Return empty response with 200 status code for preflight requests
    #         return '', 200

    return app