from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low

class ParkingAvailability(Model):
    location: str
    available_slots: int

# Create the central agent
CentralAgent = Agent(
    name="CentralAgent",
    port=8001,
    seed="CentralAgentSecretPhrase",
    endpoint=["http://127.0.0.1:8001/submit"],
)

print(CentralAgent.address)

# Define how to handle incoming availability messages
@CentralAgent.on_message(model=ParkingAvailability)
async def handle_availability(ctx: Context, sender: str, msg: ParkingAvailability):
    ctx.logger.info(f"Received availability update: {msg.location} has {msg.available_slots} slots.")

if __name__ == "__main__":
    CentralAgent.run()
