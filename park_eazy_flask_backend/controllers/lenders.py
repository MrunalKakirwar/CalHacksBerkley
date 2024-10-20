# controllers/lender_controller.py
from flask import jsonify, request
from park_eazy_flask_backend.models.lenders import LenderModel
import uuid
from bson import json_util
import json
from datetime import datetime

# Add a new parking spot
def add_parking(lender_id):
    try:
        parking_details = request.json
        lender = LenderModel.find_by_email(lender_id)
        print("add ", lender);
        if not lender:
            return jsonify({"status": "Lender not found"}), 404

        # Add the new parking details to the lender's parking list
        if 'parking' not in lender:
            lender['parking'] = []
        
        # Generate a unique ID for the new parking spot
        parking_details['id'] = str(uuid.uuid4())
        
        # Convert date strings to datetime objects
        if 'fromDate' in parking_details:
            parking_details['fromDate'] = datetime.fromisoformat(parking_details['fromDate'].rstrip('Z'))
        if 'toDate' in parking_details:
            parking_details['toDate'] = datetime.fromisoformat(parking_details['toDate'].rstrip('Z'))
        
        lender['parking'].append(parking_details)
        
        # Save the updated lender information to the database
        LenderModel.update_parking(lender_id, lender['parking'])

        # Convert ObjectId to string for JSON serialization
        lender['_id'] = str(lender['_id'])
        for parking in lender['parking']:
            if '_id' in parking:
                parking['_id'] = str(parking['_id'])

        return jsonify({"status": "Parking created successfully", "lender": lender}), 201
    except Exception as e:
        return jsonify({"status": "Error creating parking", "error": str(e)}), 500

# Get all parking spots
def get_all_parking(lender_id):
    print("get all parking data",lender_id);
    try:
        lender = LenderModel.find_by_email(lender_id)
        print("get all lender data",lender);
        
        if not lender:
            return jsonify({"status": "Lender not found"}), 404
        
        parking_list = lender.get('parking', [])
        formatted_parking = []
        for parking in parking_list:
            formatted_parking.append({
                "location": parking.get('location'),
                "price": parking.get('price'),
                "id": parking.get('id'),
                "available": parking.get('available'),
                "fromDate": parking.get('fromDate').isoformat() + "Z" if isinstance(parking.get('fromDate'), datetime) else None,
                "toDate": parking.get('toDate').isoformat() + "Z" if isinstance(parking.get('toDate'), datetime) else None,
                "_id": str(parking.get('_id')),
                "rating": parking.get('rating'),
                "parkingName": parking.get('parkingName')
            })

        return json.loads(json_util.dumps(formatted_parking)), 200
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"status": "Error fetching parking", "error": str(e)}), 500

# Update a parking spot
def update_parking(lender_id):
    try:
        updated_parking_details = request.json
        parking_id = updated_parking_details.get('id')

        lender = LenderModel.find_by_email(lender_id)
        
        if not lender:
            return jsonify({"status": "Lender not found"}), 404

        updated_parking = [
            updated_parking_details if p['id'] == parking_id else p
            for p in lender['parking']
        ]

        LenderModel.update_parking(lender_id, updated_parking)

        return jsonify({"status": "Parking updated successfully", "updatedParkingDetails": updated_parking_details}), 200
    except Exception as e:
        return jsonify({"status": "Error updating parking", "error": str(e)}), 500

# Delete a parking spot
def delete_parking(lender_id):
    try:
        parking_id = request.args.get('parkingId')

        lender = LenderModel.find_by_email(lender_id)
        
        if not lender:
            return jsonify({"status": "Lender not found"}), 404

        LenderModel.delete_parking(lender_id, parking_id)

        return jsonify({"status": "Parking deleted successfully"}), 200
    except Exception as e:
        return jsonify({"status": "Error deleting parking", "error": str(e)}), 500
