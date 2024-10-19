# routes/lender_routes.py
# from flask import Blueprint
# #from .controllers import lender_routes
# from park_eazy_flask_backend.controllers.lenders import add_parking, get_all_parking, update_parking, delete_parking


# lender_routes = Blueprint('lender_routes', __name__)

# lender_routes.route("/add-parking/<lender_id>", methods=["POST"])(add_parking)
# lender_routes.route("/get-all-parking/<lender_id>", methods=["GET"])(get_all_parking)
# lender_routes.route("/update-parking/<lender_id>", methods=["PUT"])(update_parking)
# lender_routes.route("/delete-parking/<lender_id>", methods=["DELETE"])(delete_parking)


from flask import Blueprint
from park_eazy_flask_backend.controllers.lenders import add_parking, get_all_parking, update_parking, delete_parking

lender_routes = Blueprint('lender_routes', __name__, url_prefix='/lender')

@lender_routes.route("/add-parking/<lender_id>", methods=["POST"])
def add_parking_route(lender_id):
    return add_parking(lender_id)

@lender_routes.route("/get-all-parking/<lender_id>", methods=["GET"])
def get_all_parking_route(lender_id):
    return get_all_parking(lender_id)

@lender_routes.route("/update-parking/<lender_id>", methods=["PUT"])
def update_parking_route(lender_id):
    return update_parking(lender_id)

@lender_routes.route("/delete-parking/<lender_id>", methods=["DELETE"])
def delete_parking_route(lender_id):
    return delete_parking(lender_id)