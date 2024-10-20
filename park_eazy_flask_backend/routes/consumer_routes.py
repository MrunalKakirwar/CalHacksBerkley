from flask import Blueprint
from park_eazy_flask_backend.controllers.consumer_controller import search_parking_controller

consumer_bp = Blueprint('consumer_bp', __name__)

@consumer_bp.route("/search", methods=["POST"])
def search_parking_route():
    print("search came")
    return search_parking_controller()