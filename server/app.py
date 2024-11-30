from flask import Flask
from flask import request
from interact import interact

app = Flask(__name__)


@app.route('/')
def hello():
    return '<h1>Hello, World!</h1>'


@app.route("/parse_recording", methods=["POST"])
def parse_recording():
    user_id = "testing"
    data = request.get_json()
    message = data.get("message")
    print("message", message)
    response = interact(user_id, { 'type': 'text', 'payload': message })
    return { "response": response }
