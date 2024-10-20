from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
from pymongo import MongoClient
from flask import Flask, jsonify


# Connect to MongoDB
client = MongoClient('mongodb+srv://manan228:a1FQQTQR2iIrqDqc@cluster0.1c2rs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')  # Replace with your MongoDB URI
db = client['test']  # Replace with your database name
collection = db['lenders']  # Replace with your collection name


class ParkingAvailability(Model):
    location: str
    available_slots: int

# Create an agent for a parking location
ParkingAgent = Agent(
    name="ParkingAgent_Location1",
    port=8000,  # Adjust the port for each agent
    seed="Unique Seed for Parking Location 1",
    endpoint=["http://127.0.0.1:8000/submit"],
)

CentralAgent_ADDRESS = "agent1q232c5vs2sr9u7yny3tct7r7ym0d3utydvkh9h2ztwtkmypj9pq3zppzwxc" 

# print("Database name:", db.name)
# print("Collection name:", collection.name)

# Fetch parking availability data from MongoDB
def get_parking_availability_from_db():
    # Query the Lender collection to get the parking data (adjust query as per your schema)
    lender_data = collection.find_one({"email": "manan@gmail.com"})  # Ensure "John Doe" exists
    print(f"Lender data retrieved: {lender_data}") 


    if lender_data and "parking" in lender_data:
        # Extract relevant parking information
        parking_info = lender_data["parking"][0]  # Assume using the first parking entry; adjust as needed
        available_slots = 10 if parking_info["available"] else 0  # Example logic for available slots
        location = parking_info["location"]
        return ParkingAvailability(location=location, available_slots=available_slots)
    else:
        return None

# Define a periodic task to communicate parking availability
@ParkingAgent.on_interval(period=30.0)  # Every 10 seconds
async def report_availability(ctx: Context):
    print(ParkingAgent.address)
    availability_info = get_parking_availability_from_db()
    if availability_info:
        print(f"Reporting availability to CentralAgent: {availability_info}")
        # Send availability information to the CentralAgent
        await ctx.send(CentralAgent_ADDRESS, availability_info)
    else:
        print("No parking data found in MongoDB or no availability.")

# Define how to handle incoming messages
@ParkingAgent.on_message(model=ParkingAvailability)
async def handle_availability(ctx: Context, sender: str, msg: ParkingAvailability):
    ctx.logger.info(f"Received availability update from {sender}: {msg.location} has {msg.available_slots} slots.")

if __name__ == "__main__":
    ParkingAgent.run()
