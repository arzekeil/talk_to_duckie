from flask import Flask, request
from flask_cors import CORS
from voiceflow import interact, set_timer_end
import uuid

app = Flask(__name__)
CORS(app)

user_id = str(uuid.uuid4())


@app.route('/')
def hello():
    return '<h1>Hello, World!</h1>'


@app.route("/parse_response", methods=["POST"])
def parse_recording():
    data = request.get_json()
    message = data.get("userText", '')
    print("message", message)
    response = interact(user_id, { 'type': 'text', 'payload': message })
    return { "response": response }


@app.route("/start", methods=["POST"])
def start():
    response = interact(user_id, { 'type': 'launch' })
    return { "response": response }


@app.route("/timer_end", methods=["POST"])
def timer_end():
    response = set_timer_end(user_id)
    return { "response": response }


if __name__ == '__main__':
    app.run(debug=True, port=5000)
