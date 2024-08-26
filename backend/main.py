import os
from flask import Flask, request
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
from dm import system_content
from models import DMresponse

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
    return "Current routes: /get_response"

@app.route('/get_response', methods=['GET', 'POST'])
def get_response():
    # Get the request data and jsonify it
    request_data = request.get_json()

    # OpenAI API call
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            system_content,
            {"role": "user", "content": str(request_data)},
        ],
        response_format=DMresponse,
    )

    # Parse the response, turn it to json, return it
    response = completion.choices[0].message.parsed
    return response.model_dump()

if __name__ == '__main__':
    app.run(debug=True)