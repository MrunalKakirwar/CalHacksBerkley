# models/lender.py
from flask import current_app

class LenderModel:
    @staticmethod
    def create_lender(lender_data):
        lender = current_app.db.lenders.insert_one(lender_data)
        return lender

    @staticmethod
    def find_by_email(email):
        lender = current_app.db.lenders.find_one({"email": email})
        return lender

    @staticmethod
    def update_parking(email, updated_parking):
        lender = current_app.db.lenders.update_one(
            {"email": email},
            {"$set": {"parking": updated_parking}}
        )
        return lender

    @staticmethod
    def delete_parking(email, parking_id):
        lender = current_app.db.lenders.update_one(
            {"email": email},
            {"$pull": {"parking": {"id": parking_id}}}
        )
        return lender
    
    @staticmethod
    def find_all():
        lenders = list(current_app.db.lenders.find())
        print(f"Found {len(lenders)} lenders")  # Debug print
        for lender in lenders:
            print(f"Lender: {lender.get('email', 'Unknown')}")
            print(f"Parking count: {len(lender.get('parking', []))}")
        return lenders
