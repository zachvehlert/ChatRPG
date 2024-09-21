import os
from flask import Flask, request
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
from dm import system_content
from models import DMresponse
from pymongo import MongoClient
from bson.objectid import ObjectId
from pprint import pprint

# Connect to the MongoDB database
client = MongoClient('mongodb://localhost:27017/')
db = client['game']
collection = db['saved_games']

# Load env variables
load_dotenv()

# Initialize openai stuff
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

# initialize flask app
app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def index():
    return "Current routes: /get_response, /create_game"

@app.route('/get_response', methods=['GET', 'POST'])
def get_response():
    # Get the request data and jsonify it
    request_data = request.get_json()
    
    # Update the 'frontend_messages' field in the game data
    collection.update_one(
        {"_id": ObjectId(request_data['game_id'])},
        {"$push": {"frontend_messages": request_data['requested_action']}}
    )

    collection.update_one(
        {"_id": ObjectId(request_data['game_id'])},
        {"$push": {"backend_messages": {"role": "user", "content": str(request_data)}}}
    )

    # Get collection data
    game_data = collection.find_one({"_id": ObjectId(request_data['game_id'])})

    # OpenAI API call
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=game_data['backend_messages'],
        response_format=DMresponse,
    )

    # Parse the response, turn it to json, return it
    response = completion.choices[0].message.parsed
    response_obj = response.model_dump()

    # Update the 'backend_messages' field in the game data
    collection.update_one(
        {"_id": ObjectId(request_data['game_id'])},
        {"$push": {"backend_messages": {"role": "assistant", "content": str(response_obj)}}}
    )

    # Update the 'frontend_messages' field in the game data
    collection.update_one(
        {"_id": ObjectId(request_data['game_id'])},
        {"$push": {"frontend_messages": response_obj['dm_response']}}
    )

    return response.model_dump()

@app.route('/create_game', methods=['GET', 'POST'])
def create_game():
    request_data = request.get_json()
    print(request_data)

    # Construct the first message from the request data
    first_message = f'My name is: {request_data["playerName"]}. My backstory is: {request_data["playerBackstory"]}. The world lore is: {request_data["worldLore"]} My current location is: {request_data["currentLocation"]}.'
    
    # Construct the new game data
    new_game_data = { 
        'first_message' : first_message,
        'frontend_messages': [], # Array of messages (strings) to be rendered on the frontend
        'backend_messages': [system_content], # Array of message objects to be processed by ChatGPT
        'current_game_state': {
            'usable_items': request_data['starterItems'],
            'player_health': 100,
            'player_gold': 25
        }
    }

    # Insert the new game data into the database
    insert_result = collection.insert_one(new_game_data)
    
    # Get the Id of the inserted game and return it
    id = insert_result.inserted_id
    return {"game_id": str(id)}

if __name__ == '__main__':
    app.run(debug=True)