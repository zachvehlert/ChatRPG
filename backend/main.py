import os
from openai import OpenAI
from dotenv import load_dotenv
from dm import system_content
from models import DMresponse

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        system_content,
        {"role": "user", "content": "I want to attack the dragon."},
    ],
    response_format=DMresponse,
)

event = completion.choices[0].message.parsed
print(event)