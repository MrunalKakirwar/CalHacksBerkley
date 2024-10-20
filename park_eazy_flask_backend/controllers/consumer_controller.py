from flask import request, jsonify
from park_eazy_flask_backend.models.lenders import LenderModel
from datetime import datetime

def search_parking_controller():
    print("searchiiiiiii!!")
    parking_details = request.json
    print("Received parking details:", parking_details)  # Debug print

    try:
        lenders = LenderModel.find_all()  # Assuming you've implemented this method
        print(f"Found {len(lenders)} lenders")  # Debug print

        available_parkings = []
        for lender in lenders:
            print(f"Processing lender: {lender.get('email', 'Unknown')}")  # Debug print
            lender_available_parking = []
            for parking in lender.get('parking', []):
                print(f"Processing parking: {parking}")  # Debug print
                if all(key in parking for key in ['location', 'fromDate', 'toDate']) and all(key in parking_details for key in ['address', 'fromDate', 'fromTime', 'toDate', 'toTime']):
                    if (
                        parking_details['address'].lower() in parking['location'].lower() and
                        datetime.fromisoformat(f"{parking_details['fromDate']}T{parking_details['fromTime']}:00") == datetime.fromisoformat(parking['fromDate']) and
                        datetime.fromisoformat(f"{parking_details['toDate']}T{parking_details['toTime']}:00") == datetime.fromisoformat(parking['toDate'])
                    ):
                        lender_available_parking.append(parking)

            for parking in lender_available_parking:
                parking['email'] = lender.get('email', 'Unknown')
                available_parkings.append(parking)

        print(f"Found {len(available_parkings)} available parkings")  # Debug print
        return jsonify({"availableParking": available_parkings}), 200

    except Exception as e:
        print(f"An error occurred: {str(e)}")  # Debug print
        return jsonify({"error": str(e)}), 500